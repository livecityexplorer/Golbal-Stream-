const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://globalstreamhub.net';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function unescapeJsString(str = '') {
  return str
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, ' ')
    .replace(/\\`/g, '`')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdownAndHtml(str = '') {
  return String(str)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractJsField(block, fieldName) {
  const backtickMatch = block.match(new RegExp(`${fieldName}:\\s*\`([\\s\\S]*?)\`\\s*(?:,|\\n)`));
  if (backtickMatch) return unescapeJsString(backtickMatch[1]);
  const singleMatch = block.match(new RegExp(`${fieldName}:\\s*'((?:\\\\'|[^'])*)'`));
  if (singleMatch) return unescapeJsString(singleMatch[1]);
  const doubleMatch = block.match(new RegExp(`${fieldName}:\\s*"((?:\\\\"|[^"])*)"`));
  if (doubleMatch) return unescapeJsString(doubleMatch[1]);
  return '';
}

function loadBlogContentMap() {
  const map = {};
  try {
    const src = fs.readFileSync(path.resolve('src/data/blogData.ts'), 'utf8');
    const blocks = src.split(/\n  \{\s*\n\s*id:/).slice(1);
    for (const block of blocks) {
      const slug = extractJsField(block, 'slug');
      const title = extractJsField(block, 'title');
      const excerpt = extractJsField(block, 'excerpt');
      const contentRaw = extractJsField(block, 'content');
      const cleanText = stripMarkdownAndHtml(contentRaw);
      const summaryParagraphs = cleanText.slice(0, 950);
      if (slug) {
        map[slug] = {
          slug,
          title,
          excerpt,
          summaryParagraphs: summaryParagraphs ? `${summaryParagraphs}...` : excerpt
        };
      }
    }
  } catch (err) {
    console.warn('Warning reading blogData.ts:', err.message);
  }
  return map;
}

function loadSetupContentMap() {
  const map = {};
  try {
    const sources = [
      fs.readFileSync(path.resolve('src/data/setupGuidesData.ts'), 'utf8'),
      fs.readFileSync(path.resolve('src/data/cbrTvData.ts'), 'utf8')
    ];
    for (const src of sources) {
      const slugMatches = [...src.matchAll(/slug:\s*'([^']+)'/g)];
      for (const m of slugMatches) {
        const slug = m[1];
        const idx = m.index;
        const slice = src.slice(Math.max(0, idx - 120), Math.min(src.length, idx + 3200));
        const title = extractJsField(slice, 'title');
        const summary = extractJsField(slice, 'summary');
        const downloaderCode = extractJsField(slice, 'downloaderCode');
        const stepTitles = [...slice.matchAll(/title:\s*'((?:\\'|[^'])+)'/g)]
          .map(x => unescapeJsString(x[1]))
          .filter(t => t !== title)
          .slice(0, 5);
        if (slug && title && !map[slug]) {
          map[slug] = { slug, title, summary, downloaderCode, stepTitles };
        }
      }
    }
  } catch (err) {
    console.warn('Warning reading setup data:', err.message);
  }
  return map;
}

// Legacy non-canonical alias URLs -> clean canonical consolidation (no noindex / meta-refresh errors on static hosts)
const LEGACY_ALIAS_REDIRECTS = {
  '/uk-best-iptv': '/ukbestiptv/',
  '/usa-best-iptv': '/usabestiptv/',
  '/europe-most-stable-iptv': '/europemoststableiptv/',
  '/arabic-best-iptv': '/arabicbestiptv/',
  '/middle-east-iptv': '/arabicbestiptv/',
  '/blog/champions-league-2026-predictions-knockout-draw-4k-uhd-stream-guide': '/blog/who-will-win-uefa-champions-league-2026-2027-predictions-streaming-guide/',
  '/blog/el-clasico-real-madrid-barcelona-tactics-prediction-4k-streaming-guide': '/blog/la-liga-el-clasico-2026-2027-title-race-real-madrid-barcelona-streaming-guide/',
  '/blog/serie-a-scudetto-race-inter-juventus-napoli-predictions-4k-streaming-guide': '/blog/serie-a-scudetto-race-inter-napoli-juventus-2026-2027-streaming-guide/',
  '/blog/der-klassiker-bayern-munich-borussia-dortmund-tactics-4k-streaming-guide': '/blog/bundesliga-title-race-bayern-leverkusen-dortmund-2026-2027-streaming-guide/',
  '/blog/premier-league-top-four-race-aston-villa-newcastle-chelsea-tottenham-predictions': '/blog/premier-league-top-four-race-amorim-man-united-alonso-chelsea-streaming-guide/'
};

// Regional routes sharing bidirectional hreflang cluster with sitemap.xml
const REGIONAL_HREFLANG_ROUTES = new Set([
  '/uk-iptv',
  '/usa-iptv',
  '/canada-iptv',
  '/ireland-iptv',
  '/germany-iptv',
  '/france-iptv',
  '/spain-iptv',
  '/italy-iptv',
  '/netherlands-iptv',
  '/europe-iptv'
]);

// Rich targeted SEO metadata for flagship, regional, setup hub, and conversion routes
const ROUTE_METADATA = {
  '/ukbestiptv': {
    title: 'Why We Are the Best UK IPTV Subscription in 2026/27: CBR TV App & 4K Streaming',
    description: 'Discover why thousands of British households rate GlobalStreamHub as the #1 UK IPTV subscription. CBR TV app (Downloader: 2130837), Anti-ISP proxy layer & 380 EPL games in 4K.',
    keywords: 'ukbestiptv, best iptv uk, best uk iptv subscription, cbr tv app, cbr tv downloader 2130837, anti freeze iptv uk, premier league 4k'
  },
  '/blog/ukbestiptv': {
    title: 'UK IPTV Speed & Anti-ISP Throttling Benchmark 2026/27: Virgin Media, BT & Sky Lab Report',
    h1: 'UK IPTV Speed & Anti-ISP Throttling Benchmark 2026/27: Virgin Media, BT & Sky Lab Report',
    description: 'Independent 2026/27 UK engineering benchmark comparing Equinix LD4/LD8 routing, Virgin Media Web Safe vs BT Smart Hub 2 DPI throttling, CBR TV (Downloader 2130837) packet loss, and 3pm Premier League 4K UHD bitrates.',
    keywords: 'uk iptv speed benchmark, virgin media iptv throttling fix, bt smart hub 2 iptv latency, cbr tv downloader 2130837 benchmark'
  },
  '/usabestiptv': {
    title: 'Why We Are the Best USA IPTV Subscription in 2026/27: CBR TV App, NFL RedZone & 4K',
    description: 'Discover why over 42,000 Americans rate GlobalStreamHub as the #1 USA IPTV subscription. CBR TV app (Downloader: 2130837), Anti-ISP proxy, NFL RedZone, Peacock 4K & zero blackouts.',
    keywords: 'usabestiptv, best iptv usa, best usa iptv subscription, cbr tv app, nfl sunday ticket iptv, nfl redzone 4k, peacock 4k stream, downloader code 2130837'
  },
  '/blog/usabestiptv': {
    title: 'USA IPTV Review & Cord-Cutting Cost Audit 2026/27: NFL RedZone, NBA & Comcast/AT&T Latency',
    h1: 'USA IPTV Review & Cord-Cutting Cost Audit 2026/27: NFL RedZone, NBA & Comcast/AT&T Latency',
    description: 'Complete 2026/27 USA streaming cost breakdown and ISP latency audit. Compare YouTube TV + NFL Sunday Ticket ($820+/yr) against GlobalStreamHub CBR TV (Downloader 2130837) across Xfinity, AT&T Fiber & Verizon Fios nodes.',
    keywords: 'usa iptv review 2026, youtube tv vs iptv cost audit, nfl redzone 4k latency test, comcast xfinity iptv buffering fix, usabestiptv benchmark'
  },
  '/europemoststableiptv': {
    title: 'Why We Are the Most Stable European IPTV Subscription in 2026/27: CBR TV App & 4K Streaming • GlobalStreamHub',
    description: 'Discover why European streamers choose GlobalStreamHub as the most stable European IPTV subscription. CBR TV app (Downloader: 2130837), Frankfurt & Amsterdam edge nodes, UCL 4K, Sky Sport, Canal+, Movistar & zero buffering.',
    keywords: 'europemoststableiptv, europe most stable iptv, best european iptv, iptv europe, cbr tv app, downloader code 2130837, champions league 4k iptv, sky sport bundesliga 4k, canal plus 4k, movistar laliga 4k, anti freeze iptv europe'
  },
  '/blog/europemoststableiptv': {
    title: 'European IPTV Stability & Edge Relay Report 2026/27: Frankfurt DE-CIX & Amsterdam AMS-IX Uptime',
    h1: 'European IPTV Stability & Edge Relay Report 2026/27: Frankfurt DE-CIX & Amsterdam AMS-IX Uptime',
    description: 'Multi-country European technical audit across Germany, France, Spain, Italy & the Netherlands. See real DE-CIX Frankfurt & AMS-IX Amsterdam telemetry on Sky Bundesliga UHD, Canal+ 4K, Movistar LaLiga, and DAZN Italia.',
    keywords: 'europe most stable iptv benchmark, frankfurt amsterdam iptv cdn latency, sky bundesliga 4k iptv test, canal plus movistar 4k uptime'
  },
  '/arabicbestiptv': {
    title: 'Why We Are the Best Arabic & Middle East IPTV in 2026/27: CBR TV App, beIN Sports 4K & Shahid VIP • GlobalStreamHub',
    description: 'Discover why thousands across Saudi Arabia, UAE, Qatar, Kuwait, Egypt & the diaspora choose GlobalStreamHub. CBR TV app (Downloader: 2130837), Anti-ISP proxy, beIN Sports 4K, SSC Saudi League & Shahid VIP.',
    keywords: 'arabicbestiptv, best arabic iptv, middle east iptv, اشتراك iptv, bein sports 4k iptv, ssc sports saudi league, shahid vip iptv, osn iptv, cbr tv app, downloader code 2130837, anti freeze iptv arabic'
  },
  '/blog/arabicbestiptv': {
    title: 'Middle East & Diaspora Arabic IPTV Network Guide 2026/27: beIN 4K, SSC & MBC Bitrate Audit',
    h1: 'Middle East & Diaspora Arabic IPTV Network Guide 2026/27: beIN 4K, SSC & MBC Bitrate Audit',
    description: 'Technical network audit for viewers in Saudi Arabia, UAE, Qatar, Kuwait, Egypt, and Arab expats in Europe & North America. Full benchmarks for beIN SPORTS 4K, SSC Saudi Pro League, Shahid VIP & CBR TV code 2130837.',
    keywords: 'arabicbestiptv network benchmark, bein sports 4k bitrate iptv, ssc saudi pro league live stream, arabic iptv usa uk europe expats'
  },
  '/uk-iptv': {
    title: 'Best UK IPTV Subscription 2026: 4K Premier League, Sky Sports & 3pm Blackout • GlobalStreamHub',
    description: 'Watch all 380 Premier League matches, Sky Sports 4K UHD, TNT Sports Ultimate and 100+ UK regional BBC/ITV channels with Anti-Freeze v9.8. Instant 24h free trial.',
    keywords: 'ukbestiptv, ukmoststableiptv, best iptv uk, buy iptv uk, premier league 4k iptv, sky sports 4k iptv, 3pm blackout stream uk'
  },
  '/usa-iptv': {
    title: 'Best USA IPTV Subscription 2026: NFL Sunday Ticket, Peacock 4K, ESPN+ & NBA • GlobalStreamHub',
    description: 'America\'s top-rated IPTV service: NFL RedZone commercial-free, NBC Peacock 4K, ESPN+, Fox Sports, HBO Max & 18,500+ live channels with zero buffering. 24h free pass.',
    keywords: 'usabestiptv, bestiptvusa, usa iptv, best usa iptv, nfl sunday ticket iptv, espn plus iptv, peacock sports stream'
  },
  '/canada-iptv': {
    title: 'Best Canada IPTV 2026: TSN 1-5 4K, Sportsnet & NHL Zero Blackout • GlobalStreamHub',
    description: 'Complete Canadian cable package: TSN 1-5 in 4K UHD, Sportsnet ONE, Crave 4K, TVA Sports, RDS and 100% regional NHL blackout bypass. Instant test trial.',
    keywords: 'canada iptv, best canada iptv, tsn 4k iptv, sportsnet iptv, nhl blackout free iptv canada'
  },
  '/ireland-iptv': {
    title: 'Best Ireland IPTV 2026: RTÉ One, Virgin Media IE & GAA GO 4K Live • GlobalStreamHub',
    description: 'Stream Irish TV anywhere: RTÉ One & RTÉ2 HD, Virgin Media 1-4, TG4, GAA Championship football & hurling in 60FPS. Premier League 3pm matches included.',
    keywords: 'ireland iptv, best irish iptv, rte one 4k, gaa go iptv, virgin media ireland live stream'
  },
  '/germany-iptv': {
    title: 'Bestes IPTV Deutschland 2026: Sky Bundesliga 4K, DAZN & Formel 1 • GlobalStreamHub',
    description: 'Deutsches Premium IPTV: Sky Sport Bundesliga UHD, DAZN 1 & 2 Bar, MagentaTV, RTL UHD, Formel 1 live ohne Unterbrechung. 24h VIP Gratis-Test.',
    keywords: 'iptv deutschland, sky bundesliga 4k iptv, dazn stream deutschland, bester iptv anbieter'
  },
  '/france-iptv': {
    title: 'Meilleur Abonnement IPTV France 2026: Canal+ 4K, beIN Sports & Ligue 1 • GlobalStreamHub',
    description: 'Tous les bouquets français en 4K UHD 60FPS: Canal+, beIN Sports 1-10, RMC Sport, TF1 4K, M6 et Ligue 1 McDonald\'s sans coupure. Essai gratuit 24h.',
    keywords: 'meilleur iptv france, abonnement iptv 4k, canal plus 4k streaming, bein sports france iptv'
  },
  '/spain-iptv': {
    title: 'Mejor IPTV España 2026: Movistar+ 4K, DAZN LaLiga, F1 & MotoGP • GlobalStreamHub',
    description: 'Fútbol español en directo en 4K UHD: El Clásico, Movistar+ LaLiga UHD, DAZN F1, MotoGP, canales TDT España en alta definición. Prueba 24h gratis.',
    keywords: 'mejor iptv espana, movistar laliga 4k, dazn f1 directo, canales espana iptv sin cortes'
  },
  '/italy-iptv': {
    title: 'Miglior IPTV Italia 2026: Sky Sport Serie A 4K, DAZN & Champions League • GlobalStreamHub',
    description: 'Tutta la Serie A TIM in 4K UHD 60FPS, Sky Sport Italia, DAZN 1 & 2, Formula 1 e cinema on-demand senza blocchi né buffering. Test gratuito 24 ore.',
    keywords: 'miglior iptv italia, sky sport serie a 4k, dazn italia streaming, iptv stabile zero buffering'
  },
  '/netherlands-iptv': {
    title: 'Beste IPTV Nederland 2026: Ziggo Sport 4K, Viaplay F1 & Eredivisie • GlobalStreamHub',
    description: 'Kijk alle Eredivisie wedstrijden, Ziggo Sport Total 4K, Viaplay Max Verstappen F1 en 18.500+ zenders in haarscherpe 4K kwaliteit. Gratis 24-uurs test.',
    keywords: 'beste iptv nederland, ziggo sport 4k, viaplay f1 iptv, eredivisie live stream'
  },
  '/europe-iptv': {
    title: 'Best European IPTV Subscription 2026: All EU Channels in 4K UHD • GlobalStreamHub',
    description: 'The definitive European streaming service: 18,500+ live European channels, multi-language sports commentary (EN, DE, FR, ES, IT), Anti-Freeze v9.8.',
    keywords: 'europe iptv, european channels 4k, pan european iptv, champions league 4k uhd'
  },
  '/setup': {
    title: 'IPTV Setup Guides & Tutorials: FireStick, Smart TV, Apple TV & PC • GlobalStreamHub',
    description: 'Easy 2-minute step-by-step setup guides for Amazon FireStick 4K Max, CBR TV App (Code: 2130837), TiviMate, Smart TV, Apple TV and Android.',
    keywords: 'iptv setup guide, firestick iptv tutorial, tivimate setup, cbr tv downloader code 2130837'
  },
  '/setup/cbr-tv': {
    title: 'CBR TV App Official Setup Guide: FireStick Downloader Code 2130837 • GlobalStreamHub',
    description: 'Install CBR TV on Amazon FireStick, Android TV, Google TV & Shield. Use Downloader shortcode 2130837 with integrated Anti-ISP secure proxy layer and 4K/8K player.',
    keywords: 'cbr tv app, cbr tv downloader code 2130837, cbr tv setup, cbr tv firestick, cbr tv proxy layer'
  },
  '/setup/cbr-tv-desktop': {
    title: 'CBR TV Native Desktop App: Windows PC, Mac Apple Silicon & Linux • GlobalStreamHub',
    description: 'Download the official CBR TV desktop client for Windows 10/11, macOS (M1/M2/M3/M4 Apple Silicon & Intel), and Linux (.deb / AppImage). 4K/8K playback & proxy bypass.',
    keywords: 'cbr tv windows, cbr tv mac, cbr tv desktop app, cbr tv linux deb, iptv pc player 4k'
  },
  '/setup/firestick': {
    title: 'Amazon FireStick 4K IPTV Setup: CBR TV, Downloader & TiviMate Guide • GlobalStreamHub',
    description: 'Complete 2026 guide to setting up IPTV on Amazon FireStick 4K, 4K Max, and Fire TV Cube. Official CBR TV Downloader code 2130837, TiviMate, and anti-buffering tweaks.',
    keywords: 'firestick iptv setup, firestick 4k max iptv, downloader code 2130837, tivimate firestick'
  },
  '/setup/tivimate': {
    title: 'TiviMate IPTV Player Setup Guide: Xtream Codes & EPG Tutorial • GlobalStreamHub',
    description: 'Step-by-step tutorial to configure TiviMate Premium IPTV Player with Xtream Codes API credentials, 7-day TV guide, and multi-screen sports view.',
    keywords: 'tivimate setup, tivimate xtream codes, tivimate epg guide, tivimate premium buffer fix'
  },
  '/setup/smarters': {
    title: 'IPTV Smarters Pro Setup Guide: FireStick, iOS, Android & Smart TV • GlobalStreamHub',
    description: 'How to install and activate IPTV Smarters Pro and Smarters Player Lite. Server URL, username, password login instructions for all devices.',
    keywords: 'iptv smarters pro login, smarters player lite setup, iptv smarters firestick code'
  },
  '/setup/smart-tv': {
    title: 'Smart TV IPTV Setup Guide: Samsung Tizen & LG webOS Tutorials • GlobalStreamHub',
    description: 'How to install and activate IPTV on Samsung Smart TV (Tizen) and LG Smart TV (webOS) using IBO Player, Nanomid, SmartOne, and SET IPTV.',
    keywords: 'samsung smart tv iptv, lg webos iptv app, ibo player activation, smartone iptv'
  },
  '/setup/apple-tv': {
    title: 'Apple TV 4K & iOS IPTV Setup Guide: IPTVX & iMPlayer • GlobalStreamHub',
    description: 'Stream IPTV in fluid 4K 60FPS on Apple TV 4K, iPhone, and iPad using IPTVX, iMPlayer, and Smarters Lite with iCloud sync and Siri remote optimization.',
    keywords: 'apple tv 4k iptv, iptvx setup, implayer apple tv, ios iptv app 4k'
  },
  '/setup/android': {
    title: 'Android TV & Google TV IPTV Setup: NVIDIA Shield & Chromecast • GlobalStreamHub',
    description: 'Setup tutorial for NVIDIA Shield TV Pro, Chromecast with Google TV, Xiaomi TV Box, and Sony Bravia Android TVs with hardware 4K acceleration.',
    keywords: 'android tv iptv, nvidia shield iptv setup, chromecast google tv iptv'
  },
  '/setup/pc-web': {
    title: 'PC & Web Browser 4K IPTV Player: CBR TV Desktop, Windows & Mac • GlobalStreamHub',
    description: 'Watch 18,500+ channels on any Windows PC, macOS Apple Silicon, or Linux computer using our official CBR TV desktop client or WebTV browser player.',
    keywords: 'webtv iptv player, cbr tv desktop, watch iptv in browser, vlc iptv playlist, pc iptv 4k'
  },
  '/setup/formuler-mag': {
    title: 'Formuler (MOL3) & MAG Box IPTV Setup Guide: Stalker Portal • GlobalStreamHub',
    description: 'Connect your Formuler Z11 Pro Max (MyTVOnline 3) and MAG 254/322/524 set-top boxes with MAC address registration and high-speed portal servers.',
    keywords: 'formuler mytvonline3 setup, mag box stalker portal, formuler z11 iptv'
  },
  '/free-trial': {
    title: 'IPTV Free Trial: Instant 24-Hour VIP Test Pass (No Credit Card) • GlobalStreamHub',
    description: 'Claim your 100% free 24-hour VIP test pass with instant automated delivery in under 10 seconds. Full access to 18,500+ channels and 65,000+ VODs.',
    keywords: 'iptv free trial, iptv 24h free trial, free iptv test, instant iptv trial, best iptv free trial no credit card'
  },
  '/pricing': {
    title: 'IPTV Pricing & Subscription Plans: 1, 3, 6 & 12 Month 4K Passes • GlobalStreamHub',
    description: 'Transparent pricing for high-performance 4K IPTV: £11.99/month or £59.99/year. 18,500+ channels, 65,000+ VODs, Anti-Freeze v9.8, instant activation.',
    keywords: 'iptv pricing, cheap iptv subscription, buy iptv 12 months, buy 4k iptv pass'
  },
  '/channels': {
    title: '18,500+ Live Channels List: UK, USA, Canada, Sports & Global • GlobalStreamHub',
    description: 'Browse the complete 2026 channel catalog: Sky Sports 4K, TNT Sports, NBC Peacock, TSN, Sportsnet, international channels from 80+ countries.',
    keywords: 'iptv channel list, uk live channels, sports iptv channels, sky sports channel line up'
  },
  '/sports': {
    title: 'Live Sports Schedule & Fixtures: Premier League, Champions League, UFC & F1 in 4K',
    description: 'Real-time updated sports matchday schedule: kickoff times, broadcast channels, and 4K UHD streams for Premier League, UEFA Champions League, and UFC.',
    keywords: 'live sports schedule iptv, premier league fixtures 4k, live matchday stream, champions league kickoff times'
  },
  '/speed-test': {
    title: 'IPTV Streaming Speed Test & Network Diagnostics Tool • GlobalStreamHub',
    description: 'Test your broadband download speed, jitter, and ping directly to our London, Frankfurt, and New York streaming CDN clusters for 4K streaming readiness.',
    keywords: 'iptv speed test, broadband speed test streaming, 4k streaming speed check'
  },
  '/faq': {
    title: 'Frequently Asked Questions (FAQ) & Knowledge Base • GlobalStreamHub VIP',
    description: 'Find instant answers to common questions about IPTV setup, ISP block bypassing, payment options, device compatibility, and subscription management.',
    keywords: 'iptv faq, iptv questions, how does iptv work, iptv customer support'
  },
  '/blog': {
    title: 'IPTV Knowledge Base, Streaming Guides & Analysis • GlobalStreamHub VIP',
    description: 'Expert IPTV tutorials, device setup walkthroughs, live sports 4K streaming guides, and anti-buffering masterclasses from the GlobalStreamHub engineering team.',
    keywords: 'iptv blog, iptv guides, best iptv setup tutorials, 4k streaming guides'
  }
};

// All 84 canonical subpages matching public/sitemap.xml 1:1
const CANONICAL_ROUTES = [
  '/blog',
  '/ukbestiptv',
  '/blog/ukbestiptv',
  '/usabestiptv',
  '/blog/usabestiptv',
  '/europemoststableiptv',
  '/blog/europemoststableiptv',
  '/arabicbestiptv',
  '/blog/arabicbestiptv',
  '/uk-iptv',
  '/usa-iptv',
  '/canada-iptv',
  '/ireland-iptv',
  '/germany-iptv',
  '/france-iptv',
  '/spain-iptv',
  '/italy-iptv',
  '/netherlands-iptv',
  '/europe-iptv',
  '/setup',
  '/setup/cbr-tv',
  '/setup/cbr-tv-desktop',
  '/setup/firestick',
  '/setup/tivimate',
  '/setup/smarters',
  '/setup/smart-tv',
  '/setup/apple-tv',
  '/setup/android',
  '/setup/pc-web',
  '/setup/formuler-mag',
  '/setup/firestick-tivimate',
  '/setup/firestick-smarters-pro',
  '/setup/firestick-implayer',
  '/setup/firestick-xciptv',
  '/setup/android-tv-tivimate',
  '/setup/android-tv-smarters-pro',
  '/setup/android-tv-ott-navigator',
  '/setup/apple-tv-iptvx',
  '/setup/apple-tv-implayer',
  '/setup/apple-tv-snapp-uhd',
  '/setup/apple-ios-smarters-lite',
  '/setup/apple-ios-implayer',
  '/setup/smart-tv-ibo-player',
  '/setup/smart-tv-set-iptv',
  '/setup/smart-tv-smart-one',
  '/setup/formuler-mytvonline3',
  '/setup/mag-box-stalker',
  '/setup/windows-mac-smarters',
  '/setup/webtv-browser-player',
  '/setup/vlc-media-player',
  '/blog/who-will-win-premier-league-title-race-prediction-4k-streaming-guide',
  '/blog/who-will-win-uefa-champions-league-2026-2027-predictions-streaming-guide',
  '/blog/la-liga-el-clasico-2026-2027-title-race-real-madrid-barcelona-streaming-guide',
  '/blog/serie-a-scudetto-race-inter-napoli-juventus-2026-2027-streaming-guide',
  '/blog/bundesliga-title-race-bayern-leverkusen-dortmund-2026-2027-streaming-guide',
  '/blog/premier-league-top-four-race-amorim-man-united-alonso-chelsea-streaming-guide',
  '/blog/how-to-watch-premier-league-3pm-blackout-4k-uhd',
  '/blog/ultimate-amazon-firestick-4k-iptv-setup-guide-2026',
  '/blog/how-to-fix-iptv-buffering-isp-throttling-virgin-bt-sky',
  '/blog/how-to-set-up-tivimate-premium-xtream-codes-android-tv',
  '/blog/how-to-watch-sky-sports-plus-tnt-sports-efl-championship-4k',
  '/blog/ultimate-guide-streaming-ppv-boxing-ufc-events-4k',
  '/blog/how-to-watch-formula-1-f1-grand-prix-live-4k-uhd',
  '/blog/august-2026-channel-expansion-45-new-4k-hdr-feeds',
  '/blog/usa-canada-sports-streaming-nfl-nhl-nba-mlb-guide',
  '/blog/nfl-sunday-ticket-redzone-4k-streaming-guide-no-blackouts',
  '/blog/2026-4k-uhd-cinema-vod-movies-boxsets-release-schedule',
  '/blog/best-iptv-player-apps-apple-tv-4k-iphone-ipad-guide',
  '/blog/setup-guide-iptv-smarters-samsung-tizen-lg-webos',
  '/blog/top-5-best-streaming-devices-iptv-services-2026',
  '/blog/iptv-vs-traditional-cable-tv-cost-breakdown-cord-cutting-2026',
  '/blog/formuler-z11-pro-max-mag-box-setup-mytvonline3-guide',
  '/blog/how-to-spot-iptv-scams-and-fake-free-trials-in-2026',
  '/blog/iptv-vs-real-debrid-stremio-live-sports-comparison-2026',
  '/blog/how-to-disable-virgin-media-bt-sky-broadband-isp-blocks-iptv',
  '/blog/best-iptv-players-firestick-tivimate-implayer-smarters-xciptv-comparison',
  '/blog/best-iptv-service-uk-expats-watch-uk-tv-spain-cyprus-abroad',
  '/blog/how-to-watch-uefa-champions-league-live-stream-4k-uhd-uk',
  '/free-trial',
  '/pricing',
  '/channels',
  '/sports',
  '/speed-test',
  '/faq'
];

function buildAliasCanonicalHtml(targetCanonicalUrl, readableTitle) {
  const safeUrl = escapeHtml(targetCanonicalUrl);
  const safeTitle = escapeHtml(readableTitle);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${safeUrl}" />
    <title>${safeTitle} • GlobalStreamHub 4K VIP</title>
  </head>
  <body style="background:#060814;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;padding:2rem;">
    <main style="max-width:720px;margin:0 auto;">
      <h1>${safeTitle}</h1>
      <p>View the full updated guide at the canonical page: <a href="${safeUrl}" style="color:#38bdf8;">${safeUrl}</a>.</p>
    </main>
  </body>
</html>
`;
}

function buildStaticSemanticHtml({ h1, description, canonicalUrl, breadcrumbs, extraParagraph, stepTitles }) {
  const breadcrumbLinks = breadcrumbs
    .map((b, i) => `<a href="${escapeHtml(b.item)}" style="color:#38bdf8;text-decoration:none;">${escapeHtml(b.name)}</a>${i < breadcrumbs.length - 1 ? ' <span style="color:#64748b;">/</span> ' : ''}`)
    .join('');

  const stepsHtml = stepTitles && stepTitles.length > 0
    ? `<ol style="padding-left:1.25rem;margin:1rem 0;color:#cbd5e1;">${stepTitles.map(s => `<li style="margin-bottom:0.4rem;">${escapeHtml(s)}</li>`).join('')}</ol>`
    : '';

  const extraHtml = extraParagraph
    ? `<p style="color:#cbd5e1;margin-top:0.75rem;line-height:1.65;">${escapeHtml(extraParagraph)}</p>`
    : '';

  return `<main style="min-height:100vh;width:100%;background-color:#060814;color:#f8fafc;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:2.5rem 1.5rem;box-sizing:border-box;">
        <div style="max-width:920px;margin:0 auto;">
          <nav aria-label="Breadcrumb" style="font-size:13px;color:#94a3b8;margin-bottom:1.25rem;">${breadcrumbLinks}</nav>
          <h1 style="font-size:clamp(1.75rem,3vw,2.5rem);font-weight:800;line-height:1.2;margin:0 0 1rem 0;color:#ffffff;">${escapeHtml(h1)}</h1>
          <p style="font-size:1.05rem;line-height:1.65;color:#cbd5e1;margin:0 0 1rem 0;">${escapeHtml(description)}</p>
          ${extraHtml}
          ${stepsHtml}
          <div style="margin-top:1.75rem;padding:1rem 1.25rem;border:1px solid rgba(56,189,248,0.25);border-radius:12px;background:rgba(15,23,42,0.65);font-size:14px;color:#94a3b8;">
            Official CBR TV App Downloader Code: <strong style="color:#38bdf8;">2130837</strong> • TiviMate Code: <strong style="color:#38bdf8;">289018</strong> • Canonical URL: <a href="${escapeHtml(canonicalUrl)}" style="color:#38bdf8;">${escapeHtml(canonicalUrl)}</a>
          </div>
          <nav aria-label="Primary Navigation" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:1.5rem;font-size:14px;">
            <a href="/" style="color:#38bdf8;text-decoration:none;">Home</a>
            <a href="/free-trial/" style="color:#38bdf8;text-decoration:none;">24h Free Trial</a>
            <a href="/pricing/" style="color:#38bdf8;text-decoration:none;">Pricing Plans</a>
            <a href="/setup/" style="color:#38bdf8;text-decoration:none;">Device Setup Hub</a>
            <a href="/blog/" style="color:#38bdf8;text-decoration:none;">Streaming Guides</a>
            <a href="/channels/" style="color:#38bdf8;text-decoration:none;">18,500+ Channels</a>
            <a href="/sports/" style="color:#38bdf8;text-decoration:none;">Live Sports</a>
          </nav>
        </div>
      </main>`;
}

async function generateStaticRoutes() {
  console.log('🚀 Generating Pre-Rendered Static Route HTML for GitHub Pages, Apache & SEO...');
  const distDir = path.resolve('dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found. Please run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const blogMap = loadBlogContentMap();
  const setupMap = loadSetupContentMap();
  console.log(`📚 Extracted ${Object.keys(blogMap).length} blog articles & ${Object.keys(setupMap).length} setup guides for static pre-rendering.`);

  let generatedCount = 0;
  let redirectCount = 0;

  // 1. Write canonical subpage HTML files (matching sitemap.xml)
  for (const route of CANONICAL_ROUTES) {
    const cleanRoute = route.replace(/^\/+/, '');
    const targetDir = path.join(distDir, cleanRoute);
    const targetFile = path.join(targetDir, 'index.html');
    fs.mkdirSync(targetDir, { recursive: true });

    const normalizedRoute = route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;
    const canonicalUrl = `${DOMAIN}${normalizedRoute}`;
    const pathParts = cleanRoute.split('/').filter(Boolean);
    const slug = pathParts[pathParts.length - 1] || '';

    const BENCHMARK_BLOG_SLUGS = {
      '/blog/ukbestiptv': 'blog-ukbestiptv-benchmark',
      '/blog/usabestiptv': 'blog-usabestiptv-benchmark',
      '/blog/europemoststableiptv': 'blog-europemoststableiptv-benchmark',
      '/blog/arabicbestiptv': 'blog-arabicbestiptv-benchmark'
    };
    const blogEntry = blogMap[BENCHMARK_BLOG_SLUGS[route] || slug];
    const setupEntry = pathParts[0] === 'setup' ? setupMap[slug] : null;
    const explicitMeta = ROUTE_METADATA[route];

    let meta;
    if (explicitMeta) {
      meta = {
        ...explicitMeta,
        extraParagraph: blogEntry?.summaryParagraphs || setupEntry?.summary || '',
        stepTitles: setupEntry?.stepTitles || []
      };
    } else if (blogEntry) {
      meta = {
        title: `${blogEntry.title} • GlobalStreamHub`,
        h1: blogEntry.title,
        description: blogEntry.excerpt || blogEntry.summaryParagraphs.slice(0, 155),
        keywords: `${slug.replace(/-/g, ' ')}, 4k iptv, cbr tv 2130837, globalstreamhub`,
        extraParagraph: blogEntry.summaryParagraphs,
        stepTitles: []
      };
    } else if (setupEntry) {
      meta = {
        title: `${setupEntry.title} • GlobalStreamHub`,
        h1: setupEntry.title,
        description: setupEntry.summary || `Complete 2026 step-by-step setup tutorial for ${setupEntry.title}. Downloader code 2130837 (CBR TV).`,
        keywords: `${slug.replace(/-/g, ' ')}, iptv setup guide, downloader code 2130837, globalstreamhub`,
        extraParagraph: setupEntry.summary,
        stepTitles: setupEntry.stepTitles || []
      };
    } else {
      const readable = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      meta = {
        title: `${readable} • GlobalStreamHub VIP 4K`,
        h1: readable,
        description: `Official streaming guide and access for ${readable}. Stream in 4K UHD 60FPS with 24h instant free trial.`,
        keywords: 'best iptv uk, 4k iptv subscription, cbr tv 2130837, globalstreamhub',
        extraParagraph: '',
        stepTitles: []
      };
    }

    const cleanH1 = meta.h1 || meta.title.split('•')[0].trim();
    const safeTitle = escapeHtml(meta.title);
    const safeDesc = escapeHtml(meta.description);
    const safeKeywords = escapeHtml(meta.keywords);
    const safeCanonical = escapeHtml(canonicalUrl);

    let customHtml = templateHtml
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
      .replace(/<meta name="title" content="[^"]*"\s*\/>/i, `<meta name="title" content="${safeTitle}" />`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${safeDesc}" />`)
      .replace(/<meta name="keywords" content="[^"]*"\s*\/>/i, `<meta name="keywords" content="${safeKeywords}" />`)
      .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${safeCanonical}" />`)
      .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${safeTitle}" />`)
      .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${safeDesc}" />`)
      .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${safeCanonical}" />`)
      .replace(/<meta property="twitter:title" content="[^"]*"\s*\/>/i, `<meta property="twitter:title" content="${safeTitle}" />`)
      .replace(/<meta property="twitter:description" content="[^"]*"\s*\/>/i, `<meta property="twitter:description" content="${safeDesc}" />`)
      .replace(/<meta property="twitter:url" content="[^"]*"\s*\/>/i, `<meta property="twitter:url" content="${safeCanonical}" />`);

    // Remove homepage international hreflang cluster on non-regional pages to prevent cross-page hreflang confusion
    if (!REGIONAL_HREFLANG_ROUTES.has(route)) {
      customHtml = customHtml.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/>/gi, '');
    }

    if (!customHtml.includes('<base href="/"')) {
      customHtml = customHtml.replace('<head>', '<head>\n    <base href="/" />');
    }

    customHtml = customHtml
      .replace(/(href|src)="\.\/assets\//g, '$1="/assets/')
      .replace(/(href|src)="assets\//g, '$1="/assets/');

    // Strip homepage JSON-LD so subpages don't carry duplicate homepage FAQPage / BreadcrumbList schemas
    customHtml = customHtml.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

    // Build page-specific BreadcrumbList & WebPage/Article schema
    const breadcrumbItems = [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` }
    ];

    if (pathParts[0] === 'setup') {
      breadcrumbItems.push({ "@type": "ListItem", "position": 2, "name": "Setup Guides", "item": `${DOMAIN}/setup/` });
      if (pathParts.length > 1) {
        breadcrumbItems.push({ "@type": "ListItem", "position": 3, "name": cleanH1, "item": canonicalUrl });
      }
    } else if (pathParts[0] === 'blog') {
      breadcrumbItems.push({ "@type": "ListItem", "position": 2, "name": "Knowledge Base & Guides", "item": `${DOMAIN}/blog/` });
      if (pathParts.length > 1) {
        breadcrumbItems.push({ "@type": "ListItem", "position": 3, "name": cleanH1, "item": canonicalUrl });
      }
    } else {
      breadcrumbItems.push({ "@type": "ListItem", "position": 2, "name": cleanH1, "item": canonicalUrl });
    }

    const isArticle = (pathParts[0] === 'blog' && pathParts.length > 1) || ['/ukbestiptv', '/usabestiptv', '/europemoststableiptv', '/arabicbestiptv'].includes(route);
    const graphNodes = [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": meta.title,
        "description": meta.description,
        "isPartOf": { "@id": `${DOMAIN}/#website` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": breadcrumbItems
      }
    ];

    if (isArticle) {
      graphNodes.push({
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        "headline": cleanH1,
        "description": meta.description,
        "mainEntityOfPage": canonicalUrl,
        "author": { "@type": "Organization", "name": "GlobalStreamHub Editorial & Engineering Team" },
        "publisher": { "@type": "Organization", "name": "GlobalStreamHub VIP", "url": `${DOMAIN}/` }
      });
    }

    const pageSchemaScript = `\n    <script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": graphNodes }, null, 2)}\n    </script>`;
    customHtml = customHtml.replace('</head>', `${pageSchemaScript}\n  </head>`);

    // Inject unique pre-rendered semantic HTML into both <noscript> and initial #root shell
    const staticBodyHtml = buildStaticSemanticHtml({
      h1: cleanH1,
      description: meta.description,
      canonicalUrl,
      breadcrumbs: breadcrumbItems,
      extraParagraph: meta.extraParagraph,
      stepTitles: meta.stepTitles
    });

    customHtml = customHtml.replace(
      /<noscript>[\s\S]*?<\/noscript>/i,
      `<noscript>\n      ${staticBodyHtml}\n    </noscript>`
    );

    customHtml = customHtml.replace(
      /<div id="root"[^>]*>[\s\S]*?(?=<\/body>)/i,
      `<div id="root" class="w-full max-w-full overflow-x-hidden min-h-screen bg-[#060814] text-slate-100">\n      ${staticBodyHtml}\n    </div>\n  `
    );

    fs.writeFileSync(targetFile, customHtml, 'utf-8');

    const cleanFile = path.join(distDir, `${cleanRoute}.html`);
    fs.mkdirSync(path.dirname(cleanFile), { recursive: true });
    fs.writeFileSync(cleanFile, customHtml, 'utf-8');

    generatedCount++;
  }

  // 2. Write clean canonical-consolidated HTML for the remaining 10 legacy draft/alias routes (no noindex/meta-refresh errors)
  for (const [aliasRoute, targetCanonicalPath] of Object.entries(LEGACY_ALIAS_REDIRECTS)) {
    const cleanAlias = aliasRoute.replace(/^\/+/, '');
    const targetCanonicalUrl = `${DOMAIN}${targetCanonicalPath}`;
    const readableTitle = cleanAlias.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const aliasHtml = buildAliasCanonicalHtml(targetCanonicalUrl, readableTitle);

    const aliasDir = path.join(distDir, cleanAlias);
    fs.mkdirSync(aliasDir, { recursive: true });
    fs.writeFileSync(path.join(aliasDir, 'index.html'), aliasHtml, 'utf-8');

    const aliasHtmlFile = path.join(distDir, `${cleanAlias}.html`);
    fs.mkdirSync(path.dirname(aliasHtmlFile), { recursive: true });
    fs.writeFileSync(aliasHtmlFile, aliasHtml, 'utf-8');

    redirectCount++;
  }

  console.log(`✅ Generated ${generatedCount} unique canonical static HTML pages (matching sitemap.xml 1:1)!`);
  console.log(`🔗 Generated ${redirectCount} canonical-consolidated HTML pages for legacy aliases!`);
}

generateStaticRoutes().catch(console.error);
