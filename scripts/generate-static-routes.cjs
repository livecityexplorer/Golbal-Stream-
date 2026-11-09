const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://globalstreamhub.net';

// Defined routes with custom targeted SEO metadata for high search rankings
const ROUTE_METADATA = {
  '/ukbestiptv': {
    title: 'Why We Are the Best UK IPTV Subscription in 2026/27: CBR TV App & 4K Streaming',
    description: 'Discover why thousands of British households rate GlobalStreamHub as the #1 UK IPTV subscription. CBR TV app (Downloader: 2130837), Anti-ISP proxy layer & 380 EPL games in 4K.',
    keywords: 'ukbestiptv, best iptv uk, best uk iptv subscription, cbr tv app, cbr tv downloader 2130837, anti freeze iptv uk, premier league 4k'
  },
  '/blog/ukbestiptv': {
    title: 'Why We Are the Best UK IPTV Subscription in 2026/27: CBR TV App & 4K Streaming',
    description: 'Discover why thousands of British households rate GlobalStreamHub as the #1 UK IPTV subscription. CBR TV app (Downloader: 2130837), Anti-ISP proxy layer & 380 EPL games in 4K.',
    keywords: 'ukbestiptv, best iptv uk, best uk iptv subscription, cbr tv app, cbr tv downloader 2130837, anti freeze iptv uk, premier league 4k'
  },
  '/usabestiptv': {
    title: 'Why We Are the Best USA IPTV Subscription in 2026/27: CBR TV App, NFL RedZone & 4K',
    description: 'Discover why over 42,000 Americans rate GlobalStreamHub as the #1 USA IPTV subscription. CBR TV app (Downloader: 2130837), Anti-ISP proxy, NFL RedZone, Peacock 4K & zero blackouts.',
    keywords: 'usabestiptv, best iptv usa, best usa iptv subscription, cbr tv app, nfl sunday ticket iptv, nfl redzone 4k, peacock 4k stream, downloader code 2130837'
  },
  '/blog/usabestiptv': {
    title: 'Why We Are the Best USA IPTV Subscription in 2026/27: CBR TV App, NFL RedZone & 4K',
    description: 'Discover why over 42,000 Americans rate GlobalStreamHub as the #1 USA IPTV subscription. CBR TV app (Downloader: 2130837), Anti-ISP proxy, NFL RedZone, Peacock 4K & zero blackouts.',
    keywords: 'usabestiptv, best iptv usa, best usa iptv subscription, cbr tv app, nfl sunday ticket iptv, nfl redzone 4k, peacock 4k stream, downloader code 2130837'
  },
  '/europemoststableiptv': {
    title: 'Why We Are the Most Stable European IPTV Subscription in 2026/27: CBR TV App & 4K Streaming • GlobalStreamHub',
    description: 'Discover why European streamers choose GlobalStreamHub as the most stable European IPTV subscription. CBR TV app (Downloader: 2130837), Frankfurt & Amsterdam edge nodes, UCL 4K, Sky Sport, Canal+, Movistar & zero buffering.',
    keywords: 'europemoststableiptv, europe most stable iptv, best european iptv, iptv europe, cbr tv app, downloader code 2130837, champions league 4k iptv, sky sport bundesliga 4k, canal plus 4k, movistar laliga 4k, anti freeze iptv europe'
  },
  '/europe-most-stable-iptv': {
    title: 'Why We Are the Most Stable European IPTV Subscription in 2026/27: CBR TV App & 4K Streaming • GlobalStreamHub',
    description: 'Discover why European streamers choose GlobalStreamHub as the most stable European IPTV subscription. CBR TV app (Downloader: 2130837), Frankfurt & Amsterdam edge nodes, UCL 4K, Sky Sport, Canal+, Movistar & zero buffering.',
    keywords: 'europemoststableiptv, europe most stable iptv, best european iptv, iptv europe, cbr tv app, downloader code 2130837, champions league 4k iptv, sky sport bundesliga 4k, canal plus 4k, movistar laliga 4k, anti freeze iptv europe'
  },
  '/blog/europemoststableiptv': {
    title: 'Why We Are the Most Stable European IPTV Subscription in 2026/27: CBR TV App & 4K Streaming • GlobalStreamHub',
    description: 'Discover why European streamers choose GlobalStreamHub as the most stable European IPTV subscription. CBR TV app (Downloader: 2130837), Frankfurt & Amsterdam edge nodes, UCL 4K, Sky Sport, Canal+, Movistar & zero buffering.',
    keywords: 'europemoststableiptv, europe most stable iptv, best european iptv, iptv europe, cbr tv app, downloader code 2130837, champions league 4k iptv, sky sport bundesliga 4k, canal plus 4k, movistar laliga 4k, anti freeze iptv europe'
  },
  '/arabicbestiptv': {
    title: 'Why We Are the Best Arabic & Middle East IPTV in 2026/27: CBR TV App, beIN Sports 4K & Shahid VIP • GlobalStreamHub',
    description: 'Discover why thousands across Saudi Arabia, UAE, Qatar, Kuwait, Egypt & the diaspora choose GlobalStreamHub. CBR TV app (Downloader: 2130837), Anti-ISP proxy, beIN Sports 4K, SSC Saudi League & Shahid VIP.',
    keywords: 'arabicbestiptv, best arabic iptv, middle east iptv, اشتراك iptv, bein sports 4k iptv, ssc sports saudi league, shahid vip iptv, osn iptv, cbr tv app, downloader code 2130837, anti freeze iptv arabic'
  },
  '/arabic-best-iptv': {
    title: 'Why We Are the Best Arabic & Middle East IPTV in 2026/27: CBR TV App, beIN Sports 4K & Shahid VIP • GlobalStreamHub',
    description: 'Discover why thousands across Saudi Arabia, UAE, Qatar, Kuwait, Egypt & the diaspora choose GlobalStreamHub. CBR TV app (Downloader: 2130837), Anti-ISP proxy, beIN Sports 4K, SSC Saudi League & Shahid VIP.',
    keywords: 'arabicbestiptv, best arabic iptv, middle east iptv, اشتراك iptv, bein sports 4k iptv, ssc sports saudi league, shahid vip iptv, osn iptv, cbr tv app, downloader code 2130837, anti freeze iptv arabic'
  },
  '/middle-east-iptv': {
    title: 'Why We Are the Best Arabic & Middle East IPTV in 2026/27: CBR TV App, beIN Sports 4K & Shahid VIP • GlobalStreamHub',
    description: 'Discover why thousands across Saudi Arabia, UAE, Qatar, Kuwait, Egypt & the diaspora choose GlobalStreamHub. CBR TV app (Downloader: 2130837), Anti-ISP proxy, beIN Sports 4K, SSC Saudi League & Shahid VIP.',
    keywords: 'arabicbestiptv, best arabic iptv, middle east iptv, اشتراك iptv, bein sports 4k iptv, ssc sports saudi league, shahid vip iptv, osn iptv, cbr tv app, downloader code 2130837, anti freeze iptv arabic'
  },
  '/blog/arabicbestiptv': {
    title: 'Why We Are the Best Arabic & Middle East IPTV in 2026/27: CBR TV App, beIN Sports 4K & Shahid VIP • GlobalStreamHub',
    description: 'Discover why thousands across Saudi Arabia, UAE, Qatar, Kuwait, Egypt & the diaspora choose GlobalStreamHub. CBR TV app (Downloader: 2130837), Anti-ISP proxy, beIN Sports 4K, SSC Saudi League & Shahid VIP.',
    keywords: 'arabicbestiptv, best arabic iptv, middle east iptv, اشتراك iptv, bein sports 4k iptv, ssc sports saudi league, shahid vip iptv, osn iptv, cbr tv app, downloader code 2130837, anti freeze iptv arabic'
  },
  // Regional Hubs
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

  // Setup Guides & Hardware
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
    title: 'Amazon FireStick 4K IPTV Setup: Downloader & TiviMate Guide • GlobalStreamHub',
    description: 'Complete 2026 guide to setting up IPTV on Amazon FireStick 4K, 4K Max, and Fire TV Cube. Includes Downloader codes, settings, and anti-buffering buffer tweaks.',
    keywords: 'firestick iptv setup, firestick 4k max iptv, downloader code iptv, tivimate firestick'
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
    title: 'PC & Web Browser 4K IPTV Player: Windows, Mac & WebTV • GlobalStreamHub',
    description: 'Watch 18,500+ channels on any Windows PC or Mac directly in Google Chrome, Microsoft Edge, Safari, or VLC Player without installing heavy software.',
    keywords: 'webtv iptv player, watch iptv in browser, vlc iptv playlist, pc iptv 4k'
  },
  '/setup/formuler-mag': {
    title: 'Formuler (MOL3) & MAG Box IPTV Setup Guide: Stalker Portal • GlobalStreamHub',
    description: 'Connect your Formuler Z11 Pro Max (MyTVOnline 3) and MAG 254/322/524 set-top boxes with MAC address registration and high-speed portal servers.',
    keywords: 'formuler mytvonline3 setup, mag box stalker portal, formuler z11 iptv'
  },

  // Blog & Analysis Guides
  '/blog/who-will-win-premier-league-title-race-prediction-4k-streaming-guide': {
    title: 'Who Will Win the Premier League in 2026/27? Title Race Analysis & 4K Streaming Guide',
    description: 'Statistical and tactical breakdown of Arsenal, Man City, and Liverpool title race. Supercomputer probabilities, xG metrics, and how to watch all 380 games in 4K.',
    keywords: 'who will win the premier league, premier league title race 2026, arsenal vs man city 4k, epl live stream'
  },
  '/blog/who-will-win-uefa-champions-league-2026-2027-predictions-streaming-guide': {
    title: 'Who Will Win UEFA Champions League in 2026/27? Swiss Phase Breakdown & 4K Guide',
    description: 'Dissecting Real Madrid under Mourinho, Man City under Maresca, Arsenal, and Bayern. 36-team Swiss system simulation and uncompressed 4K 60FPS streaming instructions.',
    keywords: 'who will win champions league, ucl 2026 predictions, real madrid mourinho ucl, tnt sports 4k streaming'
  },
  '/blog/la-liga-el-clasico-2026-2027-title-race-real-madrid-barcelona-streaming-guide': {
    title: 'La Liga 2026/27 & El Clásico War: Flick\'s Barcelona vs Mourinho\'s Real Madrid 4K Guide',
    description: 'Exhaustive tactical breakdown of Spanish football\'s greatest war: Barcelona\'s high line vs Madrid\'s transition speed with Mbappé & Vinícius. 4K 60FPS viewing guide.',
    keywords: 'el clasico live 4k, la liga 2026 title race, real madrid vs barcelona streaming, movistar laliga 4k'
  },
  '/blog/serie-a-scudetto-race-inter-napoli-juventus-2026-2027-streaming-guide': {
    title: 'Who Will Win Serie A in 2026/27? Scudetto Race Analysis: Inter vs Napoli vs Juventus 4K',
    description: 'Rigorous tactical evaluation of Italian Serie A. Simone Inzaghi\'s Inter vs Antonio Conte\'s Napoli and Thiago Motta\'s Juventus. 4K live streaming guide.',
    keywords: 'serie a scudetto race 2026, inter vs napoli live, juventus 4k stream, dazn italia 4k'
  },
  '/blog/bundesliga-title-race-bayern-leverkusen-dortmund-2026-2027-streaming-guide': {
    title: 'Bundesliga 2026/27 Title Race & Der Klassiker: Kompany\'s Bayern vs Leverkusen & Dortmund 4K',
    description: 'Data-driven analysis of Vincent Kompany\'s 3-goals-per-game Bayern Munich, Harry Kane\'s golden boot run, and how to stream all Bundesliga games buffer-free.',
    keywords: 'bundesliga 2026 title race, bayern munich vs dortmund live, der klassiker 4k, sky sport bundesliga uhd'
  },
  '/blog/premier-league-top-four-race-amorim-man-united-alonso-chelsea-streaming-guide': {
    title: 'Premier League Top-Four War 2026/27: Amorim\'s Man United vs Alonso\'s Chelsea in 4K',
    description: 'Battle for Champions League football: Ruben Amorim\'s 3-4-2-1 transformation at Manchester United, Xabi Alonso\'s Chelsea, and Spurs. Stream 3pm matches in 4K.',
    keywords: 'premier league top four race, ruben amorim manchester united, xabi alonso chelsea, 3pm blackout 4k stream'
  },
  '/blog/how-to-watch-premier-league-3pm-blackout-4k-uhd': {
    title: 'How to Watch Premier League 3pm Saturday Blackout Matches in 4K UHD 60FPS',
    description: 'Complete legal guide to watching every Saturday 3pm Premier League match in the UK without regional broadcast blackouts using authorized 4K international feeds.',
    keywords: 'how to watch 3pm blackout, premier league saturday 3pm stream, 3pm blackout iptv, epl live uk'
  },
  '/blog/ultimate-amazon-firestick-4k-iptv-setup-guide-2026': {
    title: 'Ultimate Amazon FireStick 4K IPTV Setup Guide 2026: Downloader & Apps',
    description: 'The definitive FireStick setup tutorial: install Downloader, enable unknown sources, configure CBR TV & TiviMate, and optimize Wi-Fi for zero buffer 4K streams.',
    keywords: 'amazon firestick iptv setup, firestick 4k max guide, downloader codes 2026, tivimate firestick'
  },
  '/blog/how-to-fix-iptv-buffering-isp-throttling-virgin-bt-sky': {
    title: 'How to Fix IPTV Buffering & Bypass ISP Throttling (Virgin Media, BT, Sky Broadband)',
    description: 'Proven technical fixes for IPTV buffering during live football matches. How to disable Virgin Media Web Safe, BT Web Protect, and Sky Broadband Shield easily.',
    keywords: 'fix iptv buffering, virgin media iptv throttling, bt broadband iptv fix, sky broadband shield iptv'
  },
  '/blog/how-to-set-up-tivimate-premium-xtream-codes-android-tv': {
    title: 'How to Set Up TiviMate Premium with Xtream Codes API on Android TV & FireStick',
    description: 'Master TiviMate IPTV player: enter server URL, username, password, configure 7-day EPG guides, record live TV, and enable multi-view sports screens.',
    keywords: 'how to set up tivimate, tivimate xtream codes, tivimate premium guide, best iptv player android tv'
  },
  '/blog/how-to-watch-sky-sports-plus-tnt-sports-efl-championship-4k': {
    title: 'How to Watch Sky Sports+, TNT Sports & EFL Championship in 4K UHD',
    description: 'Access all Sky Sports+ red button bonus feeds, TNT Sports Ultimate 4K, and every single EFL Championship match without costly multi-contract subscriptions.',
    keywords: 'watch sky sports plus 4k, tnt sports ultimate iptv, efl championship live stream 4k'
  },
  '/blog/ultimate-guide-streaming-ppv-boxing-ufc-events-4k': {
    title: 'Ultimate Guide to Streaming Live PPV Boxing & UFC Events in 4K UHD 60FPS',
    description: 'Stream every numbered UFC Main Card, world title boxing PPVs, WWE Network PLEs, and DAZN fights in 60FPS high-definition with zero pay-per-view fees.',
    keywords: 'watch ufc live stream 4k, ppv boxing iptv, wwe network ple stream, free ufc ppv stream'
  },
  '/blog/how-to-watch-formula-1-f1-grand-prix-live-4k-uhd': {
    title: 'How to Watch Formula 1 Grand Prix Live in 4K UHD 60FPS with F1 TV Commentary',
    description: 'Complete guide to watching every Formula 1 practice, qualifying, Sprint, and Grand Prix in native 4K 50/60FPS with Sky Sports F1 and official F1 TV audio.',
    keywords: 'watch f1 live 4k, formula 1 uhd stream, sky sports f1 iptv, grand prix live stream'
  },
  '/blog/usa-canada-sports-streaming-nfl-nhl-nba-mlb-guide': {
    title: 'USA & Canada Sports Streaming Guide: NFL, NHL, NBA, MLB in 4K UHD',
    description: 'Stream all major North American league sports without regional blackout restrictions: NFL RedZone, NHL Center Ice, NBA League Pass, MLB Extra Innings.',
    keywords: 'nfl streams 4k, nhl blackout bypass, nba league pass iptv, tsn sportsnet stream'
  },
  '/blog/nfl-sunday-ticket-redzone-4k-streaming-guide-no-blackouts': {
    title: 'NFL Sunday Ticket & RedZone 4K Streaming Guide: Watch Every Game Without Blackouts',
    description: 'How to stream all out-of-market NFL games every Sunday afternoon with Scott Hanson\'s commercial-free 7-hour RedZone channel in crisp 4K 60FPS.',
    keywords: 'nfl sunday ticket iptv, nfl redzone stream 4k, watch nfl without youtube tv, out of market nfl games'
  },
  '/blog/2026-4k-uhd-cinema-vod-movies-boxsets-release-schedule': {
    title: '2026 4K UHD Cinema VOD & Boxsets Release Schedule: 65,000+ Movies On-Demand',
    description: 'Explore the daily updated on-demand catalog of 65,000+ theatrical 4K HDR movies, HBO Max boxsets, Netflix originals, and BBC series with Dolby Atmos sound.',
    keywords: 'cinema vod iptv, 4k movies on demand, latest boxsets iptv, netflix hbo vod 4k'
  },
  '/blog/how-to-watch-uefa-champions-league-live-stream-4k-uhd-uk': {
    title: 'How to Watch UEFA Champions League Live Stream in 4K UHD in the UK',
    description: 'Stream every UEFA Champions League, Europa League, and Conference League fixture in native 4K UHD 60FPS with TNT Sports Ultimate and CBS Golazo feeds.',
    keywords: 'watch champions league live uk, tnt sports ultimate 4k, ucl live stream free, champions league iptv'
  },

  // Action & Conversion Pages
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

// Additional routes from sitemap to guarantee 100% coverage
const ALL_SITEMAP_ROUTES = [
  '/blog',
  '/ukbestiptv',
  '/blog/ukbestiptv',
  '/usabestiptv',
  '/blog/usabestiptv',
  '/europemoststableiptv',
  '/europe-most-stable-iptv',
  '/blog/europemoststableiptv',
  '/arabicbestiptv',
  '/arabic-best-iptv',
  '/middle-east-iptv',
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
  '/faq',
  // Legacy crawler aliases to guarantee 200 OK + canonical consolidation
  '/blog/champions-league-2026-predictions-knockout-draw-4k-uhd-stream-guide',
  '/blog/el-clasico-real-madrid-barcelona-tactics-prediction-4k-streaming-guide',
  '/blog/serie-a-scudetto-race-inter-juventus-napoli-predictions-4k-streaming-guide',
  '/blog/der-klassiker-bayern-munich-borussia-dortmund-tactics-4k-streaming-guide',
  '/blog/premier-league-top-four-race-aston-villa-newcastle-chelsea-tottenham-predictions'
];

async function generateStaticRoutes() {
  console.log('🚀 Generating Pre-Rendered Static Route HTML for GitHub Pages & SEO...');
  const distDir = path.resolve('dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found. Please run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  let generatedCount = 0;

  for (const route of ALL_SITEMAP_ROUTES) {
    // Normal clean route path (without leading slash for relative folder path)
    const cleanRoute = route.replace(/^\/+/, '');
    const targetDir = path.join(distDir, cleanRoute);
    const targetFile = path.join(targetDir, 'index.html');

    // Create route folder
    fs.mkdirSync(targetDir, { recursive: true });

    // Lookup custom metadata or create intelligent fallback
    const meta = ROUTE_METADATA[route] || {
      title: `${cleanRoute.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} • GlobalStreamHub VIP 4K`,
      description: `Official setup guide and streaming access for ${cleanRoute.split('/').pop().replace(/-/g, ' ')}. Stream in 4K UHD 60FPS with 24h instant trial pass.`,
      keywords: 'best iptv uk, 4k iptv subscription, globalstreamhub'
    };

    const normalizedRoute = route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;
    
    // Canonical URL consolidation for flagship articles and legacy blog routes
    let canonicalRoute = normalizedRoute;
    if (['/blog/ukbestiptv/', '/uk-best-iptv/'].includes(normalizedRoute)) {
      canonicalRoute = '/ukbestiptv/';
    } else if (['/blog/usabestiptv/', '/usa-best-iptv/'].includes(normalizedRoute)) {
      canonicalRoute = '/usabestiptv/';
    } else if (['/blog/europemoststableiptv/', '/europe-most-stable-iptv/'].includes(normalizedRoute)) {
      canonicalRoute = '/europemoststableiptv/';
    } else if (['/blog/arabicbestiptv/', '/arabic-best-iptv/', '/middle-east-iptv/'].includes(normalizedRoute)) {
      canonicalRoute = '/arabicbestiptv/';
    } else if (normalizedRoute === '/blog/champions-league-2026-predictions-knockout-draw-4k-uhd-stream-guide/') {
      canonicalRoute = '/blog/who-will-win-uefa-champions-league-2026-2027-predictions-streaming-guide/';
    } else if (normalizedRoute === '/blog/el-clasico-real-madrid-barcelona-tactics-prediction-4k-streaming-guide/') {
      canonicalRoute = '/blog/la-liga-el-clasico-2026-2027-title-race-real-madrid-barcelona-streaming-guide/';
    } else if (normalizedRoute === '/blog/serie-a-scudetto-race-inter-juventus-napoli-predictions-4k-streaming-guide/') {
      canonicalRoute = '/blog/serie-a-scudetto-race-inter-napoli-juventus-2026-2027-streaming-guide/';
    } else if (normalizedRoute === '/blog/der-klassiker-bayern-munich-borussia-dortmund-tactics-4k-streaming-guide/') {
      canonicalRoute = '/blog/bundesliga-title-race-bayern-leverkusen-dortmund-2026-2027-streaming-guide/';
    } else if (normalizedRoute === '/blog/premier-league-top-four-race-aston-villa-newcastle-chelsea-tottenham-predictions/') {
      canonicalRoute = '/blog/premier-league-top-four-race-amorim-man-united-alonso-chelsea-streaming-guide/';
    }
    const canonicalUrl = `${DOMAIN}${canonicalRoute}`;

    // Inject route-specific SEO tags into template HTML
    let customHtml = templateHtml
      // Replace Title
      .replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`)
      .replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${meta.title}" />`)
      // Replace Description
      .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${meta.description}" />`)
      // Replace Canonical
      .replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
      // Replace OpenGraph
      .replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${meta.title}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${meta.description}" />`)
      .replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
      // Replace Twitter Card
      .replace(/<meta property="twitter:title" content=".*?" \/>/i, `<meta property="twitter:title" content="${meta.title}" />`)
      .replace(/<meta property="twitter:description" content=".*?" \/>/i, `<meta property="twitter:description" content="${meta.description}" />`)
      .replace(/<meta property="twitter:url" content=".*?" \/>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);

    // Ensure <base href="/" /> is present in head so relative URLs resolve to root domain
    if (!customHtml.includes('<base href="/"')) {
      customHtml = customHtml.replace('<head>', '<head>\n    <base href="/" />');
    }

    // Guarantee all asset script/stylesheet/image links are absolute (/assets/...)
    customHtml = customHtml
      .replace(/(href|src)="\.\/assets\//g, '$1="/assets/')
      .replace(/(href|src)="assets\//g, '$1="/assets/');

    // Construct BreadcrumbList Schema for Google Search mobile rich snippets
    const pathParts = cleanRoute.split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${DOMAIN}/`
      }
    ];

    if (pathParts[0] === 'setup') {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Setup Guides",
        "item": `${DOMAIN}/setup/`
      });
      if (pathParts.length > 1) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 3,
          "name": meta.title.split('•')[0].split('|')[0].split(':')[0].trim(),
          "item": canonicalUrl
        });
      }
    } else if (pathParts[0] === 'blog') {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Knowledge Base & Guides",
        "item": `${DOMAIN}/blog/`
      });
      if (pathParts.length > 1) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 3,
          "name": meta.title.split('•')[0].split('|')[0].split(':')[0].trim(),
          "item": canonicalUrl
        });
      }
    } else {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": meta.title.split('•')[0].split('|')[0].split(':')[0].trim(),
        "item": canonicalUrl
      });
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };

    const breadcrumbScriptTag = `\n    <script type="application/ld+json">\n${JSON.stringify(breadcrumbSchema, null, 2)}\n    </script>`;
    customHtml = customHtml.replace('</head>', `${breadcrumbScriptTag}\n  </head>`);

    fs.writeFileSync(targetFile, customHtml, 'utf-8');

    // Also write clean standalone HTML file (e.g. dist/ukbestiptv.html) for zero-redirect Apache/Nginx direct serving
    const cleanFile = path.join(distDir, `${cleanRoute}.html`);
    const cleanParentDir = path.dirname(cleanFile);
    fs.mkdirSync(cleanParentDir, { recursive: true });
    fs.writeFileSync(cleanFile, customHtml, 'utf-8');

    generatedCount++;
  }

  console.log(`✅ Successfully generated ${generatedCount} static route HTML files inside dist/!`);
  console.log(`🌟 Every subpage will now return HTTP 200 OK directly on GitHub Pages!`);
}

generateStaticRoutes().catch(console.error);
