import { SportsFixture } from '../types';

interface ESPNCompetitor {
  homeAway: 'home' | 'away';
  team: {
    id: string;
    displayName: string;
    shortDisplayName?: string;
    abbreviation?: string;
    logo?: string;
  };
  score?: string;
}

interface ESPNCompetition {
  id: string;
  date: string;
  venue?: {
    fullName?: string;
    address?: {
      city?: string;
      country?: string;
    };
  };
  competitors: ESPNCompetitor[];
  status?: {
    type?: {
      state: 'pre' | 'in' | 'post';
      detail?: string;
      description?: string;
    };
  };
  broadcasts?: Array<{
    names?: string[];
  }>;
}

interface ESPNEvent {
  id: string;
  name: string;
  date: string;
  status: {
    type: {
      state: 'pre' | 'in' | 'post';
      detail?: string;
      description?: string;
    };
  };
  competitions: ESPNCompetition[];
}

interface ESPNScoreboardResponse {
  events?: ESPNEvent[];
}

const LEAGUES_CONFIG = [
  {
    name: 'English Premier League',
    leagueKey: 'premier-league',
    url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
    defaultChannels: ['Sky Sports Main Event UHD 4K', 'NBC Peacock 4K (USA)', 'Fubo Sports (Canada)']
  },
  {
    name: 'UEFA Champions League',
    leagueKey: 'ucl',
    url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard',
    defaultChannels: ['TNT Sports Ultimate 4K', 'CBS Paramount+ (USA)', 'DAZN Canada']
  },
  {
    name: 'Italian Serie A',
    leagueKey: 'serie-a',
    url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard',
    defaultChannels: ['TNT Sports 1 HD', 'Paramount+ 4K (USA)', 'fuboTV Canada']
  },
  {
    name: 'German Bundesliga',
    leagueKey: 'bundesliga',
    url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard',
    defaultChannels: ['Sky Sports Football HD', 'ESPN+ (USA)', 'DAZN Canada']
  },
  {
    name: 'NFL Regular Season',
    leagueKey: 'nfl',
    url: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard',
    defaultChannels: ['Sky Sports NFL HD', 'NFL Sunday Ticket', 'DAZN GamePass (Canada)']
  },
  {
    name: 'NBA Basketball',
    leagueKey: 'nba',
    url: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
    defaultChannels: ['TNT Sports 2 HD', 'NBA League Pass 4K', 'ESPN US']
  }
];

const CACHE_KEY = 'streamuk_live_sports_fixtures_v3';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache during active day

/**
 * Returns canonical date key (YYYY-MM-DD) in Europe/London timezone.
 * Used for authoritative midnight rollover detection.
 */
export function getUKDayKey(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

/**
 * Calculates exact milliseconds remaining until next midnight (00:00:02) in Europe/London time.
 */
export function getMsUntilNextMidnightUK(): number {
  const now = new Date();
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    }).formatToParts(now);

    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    const second = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);

    const secondsSinceMidnight = (hour % 24) * 3600 + minute * 60 + second;
    const secondsUntilMidnight = 86400 - secondsSinceMidnight + 2; // +2s buffer past midnight
    return Math.max(1000, secondsUntilMidnight * 1000);
  } catch {
    // Fallback: 24h from now
    return 24 * 60 * 60 * 1000;
  }
}

/**
 * Sets up an automated midnight scheduler to refresh sports fixtures daily at midnight:
 * 1. Computes precise delay until 00:00:02 UK time.
 * 2. Triggers onMidnightRollover callback and wipes old day caches.
 * 3. Also runs a 60-second heartbeat check and visibilitychange listener
 *    to handle device sleep/wake states where timers pause.
 */
export function setupMidnightScheduler(onMidnightRollover: () => void): () => void {
  let timeoutId: any = null;
  let intervalId: any = null;
  let lastDayKey = getUKDayKey();

  const handleRollover = () => {
    const currentDay = getUKDayKey();
    console.log(`[StreamUK Sports] Daily midnight rollover triggered (${lastDayKey} -> ${currentDay}). Updating sports fixtures slider...`);
    lastDayKey = currentDay;

    // Purge outdated day cache from localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch {
        // ignore
      }
    }

    try {
      onMidnightRollover();
    } catch (err) {
      console.error('[StreamUK Sports] Midnight rollover callback error:', err);
    }

    // Schedule next midnight
    scheduleTimeout();
  };

  const scheduleTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const msUntilMidnight = getMsUntilNextMidnightUK();
    console.log(`[StreamUK Sports] Next daily midnight update scheduled in ${(msUntilMidnight / 1000 / 60).toFixed(1)} mins (00:00 UK time)`);
    timeoutId = setTimeout(() => {
      handleRollover();
    }, msUntilMidnight);
  };

  scheduleTimeout();

  // 60-second heartbeat check (handles device sleep/wake, laptop lids, or mobile pauses)
  intervalId = setInterval(() => {
    const currentDay = getUKDayKey();
    if (currentDay !== lastDayKey) {
      handleRollover();
    }
  }, 60 * 1000);

  // Immediate visibility check when returning to tab
  const handleVisibilityChange = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      const currentDay = getUKDayKey();
      if (currentDay !== lastDayKey) {
        handleRollover();
      }
    }
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (intervalId) clearInterval(intervalId);
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  };
}

/**
 * Format date in relation to today's UK calendar day
 */
function formatFixtureDate(dateStr: string): { 
  date: string; 
  dayLabel: string; 
  timeUK: string; 
  timeUS: string;
  isPastDay: boolean;
} {
  const matchDate = new Date(dateStr);
  const now = new Date();

  const ukTodayKey = getUKDayKey(now);
  const tomorrowDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const ukTomorrowKey = getUKDayKey(tomorrowDate);
  const matchDayKey = getUKDayKey(matchDate);

  const isToday = matchDayKey === ukTodayKey;
  const isTomorrow = matchDayKey === ukTomorrowKey;
  const isPastDay = matchDayKey < ukTodayKey;

  let formattedDate = '';
  if (isToday) {
    formattedDate = 'Today';
  } else if (isTomorrow) {
    formattedDate = 'Tomorrow';
  } else {
    formattedDate = matchDate.toLocaleDateString('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }

  const timeUK = matchDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London'
  }) + ' BST';

  const timeUS = matchDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York'
  }) + ' ET';

  const dayLabel = `${formattedDate} • ${timeUK} (${timeUS})`;

  return { date: formattedDate, dayLabel, timeUK, timeUS, isPastDay };
}

/**
 * Generates dynamic fallback fixtures using current calendar math so dates are ALWAYS fresh
 * and roll over daily at midnight.
 */
export function generateDynamicLiveFixtures(): SportsFixture[] {
  const now = new Date();
  
  const createRelativeDate = (offsetDays: number, hour: number, minute: number = 0) => {
    const d = new Date(now);
    d.setDate(now.getDate() + offsetDays);
    d.setHours(hour, minute, 0, 0);
    return d.toISOString();
  };

  const sampleMatches = [
    // --- TODAY (Offset 0) ---
    {
      id: 'dyn-epl-1',
      league: 'English Premier League',
      leagueKey: 'premier-league',
      homeTeam: 'Liverpool',
      awayTeam: 'Fulham',
      isoDate: createRelativeDate(0, 15, 0),
      channels: ['Sky Sports Main Event UHD 4K', 'NBC Peacock 4K (USA)', 'Fubo Sports (Canada)'],
      stadium: 'Anfield, Liverpool',
      lineupInfo: 'Liverpool: Alisson; Alexander-Arnold, Konaté, Van Dijk, Robertson; Gravenberch, Mac Allister, Szoboszlai; Salah, Díaz'
    },
    {
      id: 'dyn-epl-2',
      league: 'English Premier League',
      leagueKey: 'premier-league',
      homeTeam: 'Chelsea',
      awayTeam: 'Aston Villa',
      isoDate: createRelativeDate(0, 17, 30),
      channels: ['Sky Sports Premier League UHD', 'USA Network 4K', 'TSN 4K (Canada)'],
      stadium: 'Stamford Bridge, London',
      lineupInfo: 'Chelsea: Sánchez; James, Fofana, Colwill, Cucurella; Caicedo, Fernández, Palmer; Madueke, Jackson, Neto'
    },
    {
      id: 'dyn-seriea-1',
      league: 'Italian Serie A',
      leagueKey: 'serie-a',
      homeTeam: 'Inter Milan',
      awayTeam: 'Juventus',
      isoDate: createRelativeDate(0, 19, 45),
      channels: ['TNT Sports 1 4K', 'Paramount+ 4K (USA)', 'fuboTV Canada'],
      stadium: 'San Siro, Milan',
      lineupInfo: 'Derby d’Italia • Lautaro Martínez & Thuram vs Vlahović'
    },
    // --- TOMORROW (Offset 1) ---
    {
      id: 'dyn-epl-3',
      league: 'English Premier League',
      leagueKey: 'premier-league',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester City',
      isoDate: createRelativeDate(1, 16, 30),
      channels: ['Sky Sports Main Event UHD 4K', 'NBC Peacock 4K (USA)', 'Fubo Sports (Canada)'],
      stadium: 'Emirates Stadium, London',
      lineupInfo: 'Arsenal: Raya; White, Saliba, Gabriel, Timber; Rice, Partey, Ødegaard; Saka, Havertz, Martinelli'
    },
    {
      id: 'dyn-ucl-1',
      league: 'UEFA Champions League',
      leagueKey: 'ucl',
      homeTeam: 'Real Madrid',
      awayTeam: 'Bayern Munich',
      isoDate: createRelativeDate(1, 20, 0),
      channels: ['TNT Sports Ultimate 4K', 'CBS Paramount+ (USA)', 'DAZN Canada'],
      stadium: 'Santiago Bernabéu, Madrid',
      lineupInfo: 'Real Madrid: Courtois; Carvajal, Militão, Rüdiger, Mendy; Valverde, Bellingham; Mbappé, Vinícius Jr'
    },
    {
      id: 'dyn-bundesliga-1',
      league: 'German Bundesliga',
      leagueKey: 'bundesliga',
      homeTeam: 'Bayer Leverkusen',
      awayTeam: 'Borussia Dortmund',
      isoDate: createRelativeDate(1, 17, 30),
      channels: ['Sky Sports Football HD', 'ESPN+ (USA)', 'DAZN Canada'],
      stadium: 'BayArena, Leverkusen',
      lineupInfo: 'Xabi Alonso champions squad vs Dortmund Yellow Wall attack'
    },
    // --- UPCOMING DAYS (Offset 2 & 3) ---
    {
      id: 'dyn-ucl-2',
      league: 'UEFA Champions League',
      leagueKey: 'ucl',
      homeTeam: 'Manchester City',
      awayTeam: 'Paris Saint-Germain',
      isoDate: createRelativeDate(2, 20, 0),
      channels: ['TNT Sports Ultimate 4K', 'Paramount+ 4K', 'DAZN Canada'],
      stadium: 'Etihad Stadium, Manchester',
      lineupInfo: 'Haaland, De Bruyne, Foden vs Dembélé, Barcola, Vitinha'
    },
    {
      id: 'dyn-nfl-1',
      league: 'NFL Regular Season',
      leagueKey: 'nfl',
      homeTeam: 'Kansas City Chiefs',
      awayTeam: 'Baltimore Ravens',
      isoDate: createRelativeDate(2, 1, 15),
      channels: ['Sky Sports NFL HD', 'NFL Sunday Ticket', 'NBC Peacock'],
      stadium: 'Arrowhead Stadium, Kansas City',
      lineupInfo: 'Mahomes vs Jackson • Sunday Night Football Primetime'
    },
    {
      id: 'dyn-nba-1',
      league: 'NBA Basketball',
      leagueKey: 'nba',
      homeTeam: 'Boston Celtics',
      awayTeam: 'Golden State Warriors',
      isoDate: createRelativeDate(3, 0, 30),
      channels: ['TNT Sports 2 HD', 'NBA League Pass 4K', 'ESPN US'],
      stadium: 'TD Garden, Boston',
      lineupInfo: 'Tatum & Brown vs Curry • Finals rematch clash'
    }
  ];

  return sampleMatches.map((m) => {
    const { date, dayLabel, timeUK, timeUS } = formatFixtureDate(m.isoDate);
    return {
      id: m.id,
      league: m.league,
      leagueKey: m.leagueKey,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      date,
      timeUK,
      timeUS,
      dayLabel,
      channels: m.channels,
      isLive: false,
      homeForm: ['W', 'W', 'W', 'D', 'W'],
      awayForm: ['W', 'D', 'W', 'W', 'L'],
      stadium: m.stadium,
      lineupInfo: m.lineupInfo
    };
  });
}

/**
 * Fetches real, daily updated live sports fixtures from ESPN scoreboard feeds.
 * Automatically checks UK day key so caches from before midnight are immediately invalidated.
 */
export async function fetchLiveSportsFixtures(forceFresh: boolean = false): Promise<SportsFixture[]> {
  const currentUKDay = getUKDayKey();

  // Check localStorage cache if not forced
  if (!forceFresh && typeof window !== 'undefined') {
    try {
      const cachedStr = localStorage.getItem(CACHE_KEY);
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        // CRITICAL: If cache was stored on a previous day (before midnight), invalidate immediately!
        if (parsed.dayKey === currentUKDay && Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.data) && parsed.data.length > 0) {
          return parsed.data;
        }
      }
    } catch {
      // Ignore cache parse error
    }
  }

  const fetchedFixtures: SportsFixture[] = [];

  try {
    const requests = LEAGUES_CONFIG.map(async (config) => {
      try {
        const response = await fetch(config.url, {
          headers: { 'Accept': 'application/json' },
          cache: 'no-cache'
        });
        if (!response.ok) return [];
        const data: ESPNScoreboardResponse = await response.json();
        const events = data.events || [];

        return events
          .filter(event => {
            // Check event date
            const { isPastDay } = formatFixtureDate(event.date);
            const isFinished = event.status?.type?.state === 'post';
            // Exclude completed matches from previous days (keep today's & upcoming)
            if (isPastDay && isFinished) return false;
            return true;
          })
          .slice(0, 6)
          .map((event): SportsFixture => {
            const competition = event.competitions?.[0];
            const home = competition?.competitors?.find(c => c.homeAway === 'home');
            const away = competition?.competitors?.find(c => c.homeAway === 'away');

            const homeName = home?.team?.displayName || home?.team?.shortDisplayName || 'Home Team';
            const awayName = away?.team?.displayName || away?.team?.shortDisplayName || 'Away Team';

            const { date, dayLabel, timeUK, timeUS } = formatFixtureDate(event.date);

            const isLive = event.status?.type?.state === 'in';
            const isFinished = event.status?.type?.state === 'post';

            // Channel mapping with fallbacks
            const officialBroadcasts = competition?.broadcasts?.flatMap(b => b.names || []) || [];
            const channels = officialBroadcasts.length > 0
              ? officialBroadcasts.slice(0, 3).map(ch => `${ch} 4K UHD`)
              : config.defaultChannels;

            const venue = competition?.venue?.fullName 
              ? `${competition.venue.fullName}${competition.venue.address?.city ? `, ${competition.venue.address.city}` : ''}`
              : '4K Broadcast Stadium';

            const scoreInfo = (home?.score && away?.score && (isLive || isFinished))
              ? ` (${homeName} ${home.score} - ${away.score} ${awayName})`
              : '';

            return {
              id: `${config.leagueKey}-${event.id}`,
              league: config.name,
              leagueKey: config.leagueKey,
              homeTeam: homeName,
              awayTeam: awayName,
              date,
              timeUK,
              timeUS,
              dayLabel: isLive ? `🔴 LIVE NOW${scoreInfo}` : dayLabel,
              channels,
              isLive,
              homeForm: ['W', 'W', 'W', 'D', 'W'],
              awayForm: ['W', 'D', 'W', 'W', 'L'],
              stadium: venue,
              lineupInfo: `${homeName} vs ${awayName} • StreamUK 4K 60FPS Multi-angle coverage${scoreInfo}`
            };
          });
      } catch (leagueErr) {
        console.warn(`Error fetching ${config.name} fixtures:`, leagueErr);
        return [];
      }
    });

    const results = await Promise.allSettled(requests);
    for (const res of results) {
      if (res.status === 'fulfilled' && Array.isArray(res.value)) {
        fetchedFixtures.push(...res.value);
      }
    }
  } catch (globalErr) {
    console.warn('Could not fetch remote ESPN sports fixtures:', globalErr);
  }

  // If fetched fixtures exist and are sufficient, cache and return
  if (fetchedFixtures.length >= 4) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          dayKey: currentUKDay,
          data: fetchedFixtures
        }));
      } catch {
        // storage quota exceeded or disabled
      }
    }
    return fetchedFixtures;
  }

  // Otherwise return dynamic real-calendar fallback tailored to today's date
  const dynamicFallback = generateDynamicLiveFixtures();
  return dynamicFallback;
}
