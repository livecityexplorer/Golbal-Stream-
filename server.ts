import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";

// Interface for normalized fixture data
export interface SportsFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  leagueKey: string;
  date: string;
  timeUK: string;
  timeUS: string;
  dayLabel: string;
  channels: string[];
  isLive: boolean;
  homeForm?: string[];
  awayForm?: string[];
  stadium?: string;
  venue?: string;
  lineupInfo?: string;
}

// In-memory cache for API responses with daily midnight invalidation
interface CacheEntry {
  data: SportsFixture[];
  timestamp: number;
  dayKey: string;
}
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour
const cache = new Map<string, CacheEntry>();

function getUKDateKey(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

async function fetchESPN(url: string, leagueName: string, leagueKey: string): Promise<SportsFixture[]> {
  try {
    // Append date range to only get today and future matches
    const d = new Date();
    const today = d.toISOString().split('T')[0].replace(/-/g, '');
    
    // Look ahead 30 days
    const futureDate = new Date();
    futureDate.setDate(d.getDate() + 30);
    const future = futureDate.toISOString().split('T')[0].replace(/-/g, '');
    
    const separator = url.includes('?') ? '&' : '?';
    const finalUrl = `${url}${separator}dates=${today}-${future}`;

    const response = await fetch(finalUrl);
    if (!response.ok) return [];
    
    const data = await response.json();
    const events = data.events || [];
    
    return events.map((event: any): SportsFixture | null => {
      try {
        const date = new Date(event.date);
        
        // ESPN scoreboard format usually has competitors[0] (home) and competitors[1] (away)
        const homeTeamObj = event.competitions[0].competitors.find((c: any) => c.homeAway === 'home') || event.competitions[0].competitors[0];
        const awayTeamObj = event.competitions[0].competitors.find((c: any) => c.homeAway === 'away') || event.competitions[0].competitors[1];
        
        const homeTeam = homeTeamObj.team.shortDisplayName || homeTeamObj.team.name;
        const awayTeam = awayTeamObj.team.shortDisplayName || awayTeamObj.team.name;
        
        return {
          id: event.id,
          homeTeam,
          awayTeam,
          league: leagueName,
          leagueKey: leagueKey,
          date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
          timeUK: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }) + ' GMT',
          timeUS: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' }) + ' ET',
          dayLabel: 'Upcoming',
          channels: ['Sky Sports Main Event', 'BT Sport 1', 'NBC Sports'],
          isLive: false,
          homeForm: ['W', 'W', 'D', 'L', 'W'],
          awayForm: ['L', 'D', 'W', 'W', 'W'],
          stadium: 'Main Stadium',
          venue: 'Main Stadium',
          lineupInfo: 'Confirmed 1hr before kick-off'
        };
      } catch (err) {
        return null;
      }
    }).filter(Boolean);
  } catch (err) {
    console.error(`Error fetching ${leagueName}:`, err);
    return [];
  }
}

async function getLocalizedFixtures(countryCode: string): Promise<SportsFixture[]> {
  const isUSorCA = ['US', 'CA'].includes(countryCode);
  const cacheKey = isUSorCA ? 'US' : 'EU';
  const currentDayKey = getUKDateKey();

  const cached = cache.get(cacheKey);
  if (cached && cached.dayKey === currentDayKey && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
    return cached.data;
  }

  let fixtures: SportsFixture[] = [];
  
  if (isUSorCA) {
    // Fetch NFL and NBA for US
    const [nfl, nba] = await Promise.all([
      fetchESPN('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard', 'NFL', 'nfl'),
      fetchESPN('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard', 'NBA', 'nba')
    ]);
    fixtures = [...nfl, ...nba];
  } else {
    // Fetch Premier League, Champions League, Serie A, Bundesliga, Ligue 1 for Europe / Rest of World
    const [epl, ucl, serieA, bundesliga, ligue1] = await Promise.all([
      fetchESPN('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard', 'Premier League', 'premier-league'),
      fetchESPN('https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard', 'Champions League', 'ucl'),
      fetchESPN('https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard', 'Serie A', 'serie-a'),
      fetchESPN('https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard', 'Bundesliga', 'bundesliga'),
      fetchESPN('https://site.api.espn.com/apis/site/v2/sports/soccer/fra.1/scoreboard', 'Ligue 1', 'ligue-1')
    ]);
    fixtures = [...epl, ...ucl, ...serieA, ...bundesliga, ...ligue1];
  }
  
  // Sort by date (nearest first)
  fixtures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  fixtures = fixtures.slice(0, 30);

  cache.set(cacheKey, {
    data: fixtures,
    timestamp: Date.now(),
    dayKey: currentDayKey
  });

  return fixtures;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/fixtures", async (req, res) => {
    try {
      // Determine user location from IP
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      let countryCode = 'GB'; // Default to UK
      
      try {
        // Use ip-api.com to get country from IP (free, no auth)
        // In local development, the IP might be ::1, so we default to GB.
        if (ip && typeof ip === 'string' && !ip.includes('127.0.0.1') && !ip.includes('::1')) {
          const actualIp = ip.split(',')[0].trim();
          const geoRes = await fetch(`http://ip-api.com/json/${actualIp}`);
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (geoData && geoData.countryCode) {
              countryCode = geoData.countryCode;
            }
          }
        }
      } catch (err) {
        console.error("GeoIP lookup failed, defaulting to GB");
      }

      const fixtures = await getLocalizedFixtures(countryCode);
      res.json(fixtures);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch fixtures" });
    }
  });

  // Deploy Route for 1-Click Automated Namecheap Deployment
  app.post("/api/deploy", async (req, res) => {
    try {
      const { exec } = await import("child_process");
      exec("npm run deploy", (error, stdout, stderr) => {
        if (error) {
          console.error("Deploy failed:", error, stderr);
          return res.status(500).json({ success: false, error: error.message, logs: stderr || stdout });
        }
        console.log("Deploy succeeded:", stdout);
        return res.json({ success: true, logs: stdout });
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || "Deployment error" });
    }
  });

  // NOWPayments Secure Invoice Creation Endpoint
  app.post("/api/checkout/nowpayments", async (req, res) => {
    try {
      const { price_amount, price_currency, order_description, customer_email } = req.body;
      const apiKey = process.env.NOWPAYMENTS_API_KEY;

      // Handle Sandbox Fallback if API key is not configured yet
      if (!apiKey || apiKey === "MY_NOWPAYMENTS_API_KEY") {
        console.warn("⚠️ NOWPAYMENTS_API_KEY is not set in environment variables. Returning a simulated sandbox checkout URL.");
        
        // Generate a clean test checkout invoice URL
        const mockInvoiceId = `test_${Math.random().toString(36).substring(2, 10)}`;
        return res.json({
          success: true,
          is_sandbox: true,
          id: mockInvoiceId,
          invoice_url: `https://nowpayments.io/payment?iid=${mockInvoiceId}`
        });
      }

      console.log(`🌐 Creating NOWPayments Invoice for ${price_amount} ${price_currency} (${customer_email})`);

      const response = await fetch("https://api.nowpayments.io/v1/invoice", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          price_amount: Number(price_amount),
          price_currency: price_currency,
          order_description: order_description || "IPTV Subscription",
          customer_email: customer_email,
          success_url: req.headers.origin ? `${req.headers.origin}?payment=success` : "https://streamuk.vip?payment=success",
          cancel_url: req.headers.origin ? `${req.headers.origin}?payment=cancel` : "https://streamuk.vip?payment=cancel"
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ NOWPayments API Error Response:", errorText);
        return res.status(response.status).json({ success: false, error: errorText });
      }

      const data = await response.json();
      console.log("✅ NOWPayments Invoice Created Successfully:", data.id);
      
      return res.json({
        success: true,
        is_sandbox: false,
        id: data.id,
        invoice_url: data.invoice_url
      });
    } catch (err: any) {
      console.error("❌ Error creating NOWPayments invoice:", err);
      return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
