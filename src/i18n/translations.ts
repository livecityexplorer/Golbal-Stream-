import { SupportedLanguage, LanguageInfo } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
];

export interface TranslationSchema {
  nav: {
    matchdayLineups: string;
    channels: string;
    channelsCount: string;
    vod: string;
    pricing: string;
    setupGuide: string;
    freeTrial: string;
    speedTest: string;
    support: string;
    currency: string;
    language: string;
    selectLanguage: string;
    live: string;
    top10: string;
    vip: string;
  };
  ticker: {
    topNotice: string;
    liveNodes: string;
    instantActivation: string;
    bitrate: string;
    sportsLive: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    freeTrialBtn: string;
    explorePlansBtn: string;
    antiFreeze: string;
    ultraHd60fps: string;
    instantSetup: string;
    liveMatchdayHub: string;
    confirmedLineups: string;
    liveBroadcasts: string;
    allLeagues: string;
    timeUk: string;
    timeUs: string;
    watchLive: string;
    noBuffering: string;
  };
  fixtures: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    allCategory: string;
    allMatchdays: string;
    todayUpcoming: string;
    liveNow: string;
    channels: string;
    venue: string;
    lineupConfirmed: string;
    switchTimezone: string;
    syncDaily: string;
    syncButton: string;
    syncSuccess: string;
    crystal4k: string;
    watchLive: string;
    viewAll: string;
    showLess: string;
    expandAll: string;
  };
  pricing: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    simultaneousScreens: string;
    device: string;
    devices: string;
    screen: string;
    standard: string;
    adultChannels: string;
    includeAdult: string;
    free: string;
    perMonth: string;
    instantActivation: string;
    justPerMonth: string;
    activateTrialBtn: string;
    selectPlanBtn: string;
    cryptoCheckout: string;
    instantDelivery: string;
    moneyBack: string;
    highSpeedNodes: string;
    selectConnections: string;
    devicesCount: string;
    adultOptional: string;
    adultDesc: string;
    noContract: string;
    popular: string;
    bestValue: string;
    saveUpTo: string;
    getStartedBtn: string;
    month: string;
    months: string;
    year: string;
    years: string;
    trial24h: string;
    featuresIncluded: string;
    instantActivationTitle: string;
  };
  channels: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    searchPlaceholder: string;
    allChannels: string;
    catchup7days: string;
    epgGuide: string;
    fps60: string;
    showingChannels: string;
    totalChannels: string;
  };
  vod: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    searchPlaceholder: string;
    allCinema: string;
    tmdbMovies: string;
    tmdbSeries: string;
    ukBoxsets: string;
    usHits: string;
    sportsReplays: string;
    imdbScore: string;
    audioTracks: string;
    watchTrailer: string;
    quality4k: string;
  };
  features: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    item1Badge: string;
    item1Title: string;
    item1Desc: string;
    item2Badge: string;
    item2Title: string;
    item2Desc: string;
    item2Tested: string;
    item3Title: string;
    item3Desc: string;
    item4Title: string;
    item4Desc: string;
    antiFreezeTitle: string;
    antiFreezeDesc: string;
    ultraHdTitle: string;
    ultraHdDesc: string;
    devicesTitle: string;
    devicesDesc: string;
    instantTitle: string;
    instantDesc: string;
    catchupTitle: string;
    catchupDesc: string;
    supportTitle: string;
    supportDesc: string;
  };
  reviews: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    verifiedReviews: string;
    outOf5: string;
    basedOn: string;
    basedOnHighlight: string;
    allReviews: string;
    sportsCategory: string;
    broadbandCategory: string;
    devicesCategory: string;
    vodCategory: string;
    verified: string;
    excellent: string;
    activeSubscribers: string;
    serverUptime: string;
    instantDelivery: string;
    verifiedScore: string;
  };
  faq: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    stillHaveQuestions: string;
    stillHaveQuestionsDesc: string;
    chatWhatsapp: string;
    needHelp: string;
    contactSupport: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  footer: {
    brandDescription: string;
    tvPackages: string;
    deviceSetup: string;
    speedTest: string;
    supportHelp: string;
    discordVip: string;
    vpnFaqs: string;
    trialPass: string;
    allRightsReserved: string;
    acceptedPayments: string;
    tagline: string;
    sportsHeader: string;
    devicesHeader: string;
    legalHeader: string;
    disclaimer: string;
    rights: string;
    serverStatus: string;
    setupGuide: string;
    themeExporter: string;
    selectLanguage: string;
    cookiePreferences?: string;
  };
  deviceModal: {
    title: string;
    subtitle: string;
    selectDevice: string;
    recommendedApp: string;
    difficulty: string;
    estTime: string;
    stepsTitle: string;
    downloaderCode: string;
    proTip: string;
    needHelp: string;
    close: string;
  };
  speedModal: {
    title: string;
    subtitle: string;
    startTest: string;
    testing: string;
    downloadSpeed: string;
    latency: string;
    jitter: string;
    verdictTitle: string;
    verdictUltra: string;
    verdictGood: string;
    verdictFair: string;
    close: string;
  };
  checkoutModal: {
    title: string;
    subtitle: string;
    orderSummary: string;
    planLabel: string;
    connectionsLabel: string;
    adultChannelsLabel: string;
    included: string;
    totalDue: string;
    paymentMethod: string;
    cryptoPayment: string;
    cryptoDesc: string;
    whatsappOrder: string;
    whatsappDesc: string;
    instantActivationPromise: string;
    back: string;
    proceedToPayment: string;
  };
  salesNotice: {
    verifiedSubscriber: string;
    justActivated: string;
    ago: string;
  };
  cookieConsent: {
    badge: string;
    title: string;
    description: string;
    gdprBadge: string;
    ccpaBadge: string;
    globalBadge: string;
    acceptAll: string;
    rejectNonEssential: string;
    customize: string;
    savePreferences: string;
    settingsTitle: string;
    settingsSubtitle: string;
    strictlyNecessaryTitle: string;
    strictlyNecessaryDesc: string;
    strictlyNecessaryBadge: string;
    localizationTitle: string;
    localizationDesc: string;
    analyticsTitle: string;
    analyticsDesc: string;
    doNotSellTitle: string;
    doNotSellDesc: string;
    privacyNote: string;
    close: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationSchema> = {
  en: {
    nav: {
      matchdayLineups: 'Matchday Lineups',
      channels: 'Channels',
      channelsCount: '18,500+',
      vod: '4K Cinema & VOD',
      pricing: 'Subscription Passes',
      setupGuide: 'Setup Guide',
      freeTrial: 'Get Free 24h',
      speedTest: 'Speed Test',
      support: '24/7 Support',
      currency: 'Currency',
      language: 'Language',
      selectLanguage: 'Language / Region',
      live: 'LIVE',
      top10: 'TOP 10',
      vip: 'VIP',
    },
    ticker: {
      topNotice: '⚡ 10Gbps High-Speed Stream Servers Active • 2026 Fixtures & Schedules Auto-Synced Daily',
      liveNodes: 'Tier-1 10Gbps Peering Active',
      instantActivation: 'Automated Instant WhatsApp Delivery in < 10s',
      bitrate: 'True 4K UHD 60FPS Bitrate (25+ Mbps)',
      sportsLive: 'Premier League • Champions League • F1 • UFC • Boxing • NFL • NBA',
    },
    hero: {
      badge: 'Best 4K IPTV • UK, USA, Canada & Europe • 18,500+ Channels',
      titleStart: 'Best 4K IPTV:',
      titleHighlight: 'UK, USA, Canada & Europe',
      titleEnd: 'in 4K UHD',
      description: 'Stream Premier League 4K, NFL, NBA, NHL, Sky Sports, TNT, TSN, Peacock & 18,500+ global channels with 65,000+ movies & Anti-Freeze v9.8. Instant 10s activation.',
      freeTrialBtn: 'Claim Free 24h VIP Pass',
      explorePlansBtn: 'Explore All Passes',
      antiFreeze: 'Anti-Freeze v9.8',
      ultraHd60fps: '4K UHD 60FPS',
      instantSetup: 'Instant 10s Setup',
      liveMatchdayHub: 'Live Matchday Hub',
      confirmedLineups: 'Official Lineups Confirmed',
      liveBroadcasts: 'Satellite Broadcast Channels',
      allLeagues: 'All Major Leagues',
      timeUk: 'UK (BST)',
      timeUs: 'US (ET)',
      watchLive: 'Watch Live Stream',
      noBuffering: 'Zero ISP Throttling',
    },
    fixtures: {
      badge: 'OFFICIAL MATCHDAY CENTRE',
      titleStart: 'Live 4K Sports',
      titleHighlight: 'Fixtures & TV Channels',
      subtitle: 'Real-time lineups, kick-off schedules, and verified 4K UHD satellite channels for UK, European & US sports.',
      allCategory: 'All Matches',
      allMatchdays: 'All Matchdays',
      todayUpcoming: 'Upcoming Matchdays',
      liveNow: 'LIVE ON AIR',
      channels: 'Broadcast Channels',
      venue: 'Stadium / Venue',
      lineupConfirmed: 'Official Lineups Confirmed',
      switchTimezone: 'Switch Timezone',
      syncDaily: 'Auto-Synced with Official Feeds',
      syncButton: 'Sync Lineups & Times',
      syncSuccess: 'Matchday schedules & official lineups refreshed successfully.',
      crystal4k: 'Broadcast in 4K UHD 60FPS',
      watchLive: 'Watch Live Now',
      viewAll: 'View All Matchday Fixtures',
      showLess: 'Show Less Fixtures',
      expandAll: 'Expand All {count} Scheduled Fixtures',
    },
    pricing: {
      badge: 'CLEAR & TRANSPARENT PRICING',
      titleStart: 'Choose Your',
      titleHighlight: 'VIP Streaming Pass',
      subtitle: 'Access over 18,500 live channels, 65,000 4K movies & boxsets, and all sports matches in 60FPS without contracts.',
      simultaneousScreens: 'Simultaneous Screens',
      device: 'Connection',
      devices: 'Connections',
      screen: 'Screen',
      standard: 'Standard',
      adultChannels: 'Adult 18+ Section',
      includeAdult: 'Include PIN-Protected 18+ Channels & VOD',
      free: 'FREE',
      perMonth: 'mo',
      instantActivation: 'Instant Automated 10-Sec Setup',
      justPerMonth: 'Just {price} / month',
      activateTrialBtn: 'Activate Free Trial',
      selectPlanBtn: 'Select {name}',
      cryptoCheckout: 'Crypto & Card Accepted',
      instantDelivery: 'Instant WhatsApp Delivery',
      moneyBack: '7-Day Money-Back Guarantee',
      highSpeedNodes: '10Gbps Tier-1 Servers',
      selectConnections: 'Select Number of Simultaneous Screens',
      devicesCount: 'Devices',
      adultOptional: 'Include Adult 18+ VIP Section',
      adultDesc: 'PIN-protected adult live channels & VOD (can be toggled anytime)',
      noContract: 'No Long-Term Contracts or Hidden Fees',
      popular: 'Most Popular',
      bestValue: 'Best Value',
      saveUpTo: 'Save up to',
      getStartedBtn: 'Order & Activate Instantly',
      month: 'Month',
      months: 'Months',
      year: 'Year',
      years: 'Years',
      trial24h: 'Free 24-Hour VIP Trial',
      featuresIncluded: 'All Features Included:',
      instantActivationTitle: 'Automated Instant Delivery of Login Credentials',
    },
    channels: {
      badge: 'FULL SATELLITE BOUQUET',
      title: 'Explore 18,500+ Live Channels',
      titleHighlight: 'In Crystal 4K & FHD',
      subtitle: 'Browse through our extensive library of live channels organized by country and category.',
      searchPlaceholder: 'Search channels by name, country (e.g. Sky Sports, BBC, NBC)...',
      allChannels: 'All Channels',
      catchup7days: '7-Day Catch-Up TV',
      epgGuide: 'Full TV Guide (EPG)',
      fps60: '60FPS Feeds',
      showingChannels: 'Showing Channels',
      totalChannels: 'Total Live Channels',
    },
    vod: {
      badge: 'CINEMA ON DEMAND',
      title: '65,000+ Movies & TV Boxsets',
      titleHighlight: 'Updated Daily in 4K',
      subtitle: 'Unlimited streaming of the latest cinema releases, binge-worthy series, and classic movies with multi-language subtitles.',
      searchPlaceholder: 'Search movies, series, actors or genres...',
      allCinema: 'All Cinema & Series',
      tmdbMovies: '4K Cinema Blockbusters',
      tmdbSeries: 'Complete TV Boxsets',
      ukBoxsets: 'UK Drama & BBC iPlayer Hits',
      usHits: 'HBO & US Streaming Exclusives',
      sportsReplays: 'Full Match Sports Replays',
      imdbScore: 'IMDb',
      audioTracks: 'Dolby 5.1 & Multi-Audio',
      watchTrailer: 'Watch Trailer',
      quality4k: '4K Ultra HD',
    },
    features: {
      badge: 'GLOBAL 10GBPS CDN • DEDICATED STREAMING NODES',
      titleStart: 'High-Speed Infrastructure Across',
      titleHighlight: 'UK, USA & Canada',
      subtitle: 'High-capacity dedicated peering across London, Manchester, New York, Chicago, and Toronto with zero ISP throttling or buffering.',
      item1Badge: 'Automated Daily WP-Cron Sync',
      item1Title: 'Real-Time Premier League, EFL & US Sports Schedule',
      item1Desc: 'When you deploy this theme to WordPress, the built-in background syndication cron keeps your Premier League fixtures, EFL Championship games, European league matches, and NFL/NBA schedules updated automatically every day with zero manual input.',
      item2Badge: 'Proprietary Anti-Throttling',
      item2Title: 'Anti-Freeze v9.8 & 99.99% Uptime',
      item2Desc: 'Dynamic load-balanced Tier-1 UK & North American nodes prevent weekend 3pm blackout throttling from Virgin Media, BT, Sky, Comcast, Spectrum, and Rogers without needing a VPN.',
      item2Tested: 'Tested on Virgin Media Gig1, BT Fibre 900 & Rogers Canada',
      item3Title: 'True 4K UHD 60FPS & HDR',
      item3Desc: 'Crystal clear high bitrate feeds with high dynamic range and 50/60 frames per second on all Sky Sports, TNT Sports, NBC Peacock, TSN, and Sportsnet channels.',
      item4Title: 'Instant Automated 10-Second Delivery',
      item4Desc: 'Receive your M3U Playlist, Xtream Codes API username/password, and step-by-step FireStick/Smart TV guides immediately upon checkout.',
      antiFreezeTitle: 'Anti-Freeze v9.8 Technology',
      antiFreezeDesc: 'Continuous bitrate balancing that circumvents ISP bandwidth throttling during peak sports matches.',
      ultraHdTitle: 'True 4K UHD 60FPS Streams',
      ultraHdDesc: 'Experience matches and movies with uncompressed high frame rates and HDR color grading.',
      devicesTitle: 'Universal Device Compatibility',
      devicesDesc: 'Works seamlessly on FireStick, Smart TVs, Android boxes, Apple TV, iPhone, and Windows/Mac.',
      instantTitle: 'Instant WhatsApp & Email Setup',
      instantDesc: 'Automated provisioning system delivers credentials in under 10 seconds post-confirmation.',
      catchupTitle: '7-Day Replay & Catch-Up TV',
      catchupDesc: 'Never miss a moment with automated 7-day cloud recording across all premier channels.',
      supportTitle: '24/7 Dedicated Support',
      supportDesc: 'Our technical team is available round the clock via WhatsApp, Telegram, and Email.',
    },
    reviews: {
      badge: 'TRUSTPILOT 4.9 / 5.0 VERIFIED RATING',
      titleStart: 'Trusted by Over',
      titleHighlight: '10,500+ UK Streamers',
      subtitle: 'Genuine verified subscriber feedback testing 4K Premier League matchdays, Sky Cinema, and 60FPS sports on Virgin Media, BT, Sky, and Community Fibre.',
      verifiedReviews: 'Verified Reviews',
      outOf5: 'out of 5.0',
      basedOn: 'Based on',
      basedOnHighlight: '1,480+ verified subscriber reviews across the UK & Europe',
      allReviews: 'All Reviews',
      sportsCategory: 'Premier League & 4K Sports',
      broadbandCategory: 'Virgin Media & BT Fibre',
      devicesCategory: 'FireStick & Smart TV',
      vodCategory: 'Sky Cinema & 4K VOD',
      verified: 'Verified',
      excellent: 'Excellent',
      activeSubscribers: 'Active UK Subscribers',
      serverUptime: 'London Server Uptime',
      instantDelivery: 'Instant WhatsApp Delivery',
      verifiedScore: 'Trustpilot Verified Score',
    },
    faq: {
      badge: 'UK STREAMING KNOWLEDGE BASE',
      titleStart: 'Got Questions? We’ve Got',
      titleHighlight: 'Answers',
      subtitle: 'Everything you need to know about 4K Premier League football, UK broadband compatibility, and automated daily schedule syncs.',
      stillHaveQuestions: 'Still have questions before ordering?',
      stillHaveQuestionsDesc: 'Our UK technical support engineers are available on WhatsApp 24/7 to help you with instant trials, channel questions, and setup.',
      chatWhatsapp: 'Chat on WhatsApp',
      needHelp: 'Need additional assistance?',
      contactSupport: 'Contact our 24/7 technical team on WhatsApp for immediate setup support.',
      items: [
        {
          q: 'Do I need a VPN to watch 3pm Premier League matches in the UK?',
          a: 'No! Our proprietary Anti-Freeze v9.8 technology uses dynamic IP routing and multi-CDN failover, meaning UK ISPs like Virgin Media, BT, Sky, and EE cannot detect or throttle your streaming stream during 3pm blackout windows.'
        },
        {
          q: 'How fast does my broadband need to be for 4K UHD 60FPS streaming?',
          a: 'For 4K Ultra HD 60FPS feeds, we recommend a minimum download speed of 25–30 Mbps. For Standard HD/FHD feeds, 10–15 Mbps is plenty.'
        },
        {
          q: 'How quickly do I receive my credentials after ordering?',
          a: 'Delivery is 100% automated and takes less than 10 seconds. Your M3U URL, Xtream Codes credentials, and step-by-step setup guide are immediately displayed on screen and sent to your WhatsApp/Email.'
        },
        {
          q: 'Can I use one subscription on multiple devices?',
          a: 'Yes! When choosing your pass on our pricing calculator, you can select between 1 to 5 simultaneous device connections.'
        }
      ]
    },
    footer: {
      brandDescription: 'Providing high-availability IPTV streaming with UK, USA & Canadian 10Gbps servers, 18,500+ live channels, and 65,000+ VOD blockbusters.',
      tvPackages: 'UK TV Packages',
      deviceSetup: 'Device Setup & Tools',
      speedTest: 'UK Speed & Ping Test',
      supportHelp: 'UK Support & Help',
      discordVip: 'Discord VIP Community',
      vpnFaqs: 'UK ISP & VPN FAQs',
      trialPass: '24-Hour Trial Pass (Free)',
      allRightsReserved: 'All rights reserved. Optimized for high-speed UK broadband streaming.',
      acceptedPayments: 'Accepted UK Payments: Visa • Mastercard • Apple Pay • Google Pay • Revolut • Crypto',
      tagline: 'Premium 4K Sports & Cinema IPTV Streaming Provider',
      sportsHeader: 'Sports Channels',
      devicesHeader: 'Supported Devices',
      legalHeader: 'Support & Legal',
      disclaimer: 'Disclaimer: All trademarks, logos and brand names are the property of their respective owners.',
      rights: 'All rights reserved.',
      serverStatus: '10Gbps Servers Operational (99.99% Uptime)',
      setupGuide: 'Installation Guide',
      themeExporter: 'WordPress Theme Export',
      selectLanguage: 'Language / Region',
      cookiePreferences: 'Cookie & Privacy Preferences',
    },
    deviceModal: {
      title: 'Easy Setup Guides for All Devices',
      subtitle: 'Follow our step-by-step tutorials to get up and running in under 2 minutes.',
      selectDevice: 'Select Your Device',
      recommendedApp: 'Recommended Application',
      difficulty: 'Setup Difficulty',
      estTime: 'Estimated Time',
      stepsTitle: 'Installation Instructions',
      downloaderCode: 'Downloader Shortcode',
      proTip: 'PRO TIP',
      needHelp: 'Need help setting up? Contact our support team 24/7 on WhatsApp.',
      close: 'Close Guide',
    },
    speedModal: {
      title: 'Broadband Speed & Latency Test',
      subtitle: 'Test your connection directly against our dedicated London & European 10Gbps streaming nodes.',
      startTest: 'Run Connection Speed Test',
      testing: 'Testing Connection...',
      downloadSpeed: 'Download Speed',
      latency: 'Latency (Ping)',
      jitter: 'Jitter',
      verdictTitle: 'Streaming Readiness Verdict',
      verdictUltra: 'EXCELLENT: Ready for 4K UHD 60FPS HDR streams on multiple screens simultaneously.',
      verdictGood: 'GOOD: Perfectly suited for smooth Full HD 1080p 60FPS sports streaming.',
      verdictFair: 'FAIR: Suitable for Standard HD streaming. Consider a wired Ethernet connection for 4K.',
      close: 'Close Speed Test',
    },
    checkoutModal: {
      title: 'Activate Your VIP Streaming Pass',
      subtitle: 'Instant automated provisioning in under 10 seconds.',
      orderSummary: 'Order Summary',
      planLabel: 'Subscription Plan',
      connectionsLabel: 'Simultaneous Screens',
      adultChannelsLabel: 'Adult 18+ Channels',
      included: 'Included (PIN Protected)',
      totalDue: 'Total Amount Due',
      paymentMethod: 'Select Payment Method',
      cryptoPayment: 'Pay with Crypto (Bitcoin, USDT, ETH, SOL)',
      cryptoDesc: 'Instant automated activation with zero transaction delays.',
      whatsappOrder: 'Order & Pay via WhatsApp Support',
      whatsappDesc: 'Instant WhatsApp chat with our UK team for bank transfer, card or PayPal.',
      instantActivationPromise: '✓ 100% Automated Instant Delivery • Anti-Freeze v9.8 Guarantee • 7-Day Refund Policy',
      back: 'Back to Plans',
      proceedToPayment: 'Complete Order & Get Credentials',
    },
    salesNotice: {
      verifiedSubscriber: 'Verified Subscriber in',
      justActivated: 'just activated a',
      ago: 'ago',
    },
    cookieConsent: {
      badge: 'GDPR / CCPA Privacy & Localization Preferences',
      title: 'Cookie & Localization Preferences',
      description: 'We use essential cookies and local storage to remember your chosen language, regional currency, device timezone, and streaming node configuration.',
      gdprBadge: 'GDPR Compliant (UK/EU)',
      ccpaBadge: 'CCPA Compliant (USA)',
      globalBadge: 'Privacy Protected',
      acceptAll: 'Accept All Preferences',
      rejectNonEssential: 'Essential Only',
      customize: 'Customize Choices',
      savePreferences: 'Save Preferences',
      settingsTitle: 'Privacy & Cookie Settings',
      settingsSubtitle: 'Control your localization, regional currency, and performance preferences in accordance with GDPR & CCPA standards.',
      strictlyNecessaryTitle: 'Strictly Necessary (Always Active)',
      strictlyNecessaryDesc: 'Required for core website security, video stream token routing, load balancing, and anti-freeze connection authentication.',
      strictlyNecessaryBadge: 'Always Active',
      localizationTitle: 'Localization & Region Preferences',
      localizationDesc: 'Saves your preferred language, automatic device locale detection, currency (GBP/USD/EUR/CAD), and timezone display settings.',
      analyticsTitle: 'Streaming Speed & Performance Cache',
      analyticsDesc: 'Stores speed test latency metrics and channel search cache locally to accelerate page loading and server node selection.',
      doNotSellTitle: 'Do Not Sell or Share My Information',
      doNotSellDesc: 'In compliance with CCPA, we never sell, rent, or broker your personal information, viewing habits, or device telemetry to third parties.',
      privacyNote: 'Your choices take effect immediately and can be updated anytime from the footer.',
      close: 'Close',
    },
  },

  fr: {
    nav: {
      matchdayLineups: 'Matchs & Compositions',
      channels: 'Chaînes TV',
      channelsCount: '18 500+',
      vod: 'Cinéma 4K & Séries',
      pricing: 'Abonnements',
      setupGuide: 'Guide d\'Installation',
      freeTrial: 'Essai 24h Gratuit',
      speedTest: 'Test de Débit',
      support: 'Support 24/7',
      currency: 'Devise',
      language: 'Langue',
      selectLanguage: 'Langue / Région',
      live: 'DIRECT',
      top10: 'TOP 10',
      vip: 'VIP',
    },
    ticker: {
      topNotice: '⚡ Serveurs 10Gbps Haute Vitesse Actifs • Matchs et Grilles 2026 Synchronisés Quotidiennement',
      liveNodes: 'Nœuds Fibre 10Gbps Tier-1 Actifs',
      instantActivation: 'Livraison Automatique Instantanée par WhatsApp en 10s',
      bitrate: 'Vrai Bitrate 4K UHD 60FPS (25+ Mbps)',
      sportsLive: 'Ligue des Champions • Ligue 1 • Premier League • Formule 1 • UFC • NBA',
    },
    hero: {
      badge: 'Streaming Ultra HD en France, Belgique, Suisse et Monde • 18 500+ Chaînes en Direct',
      titleStart: 'Streaming',
      titleHighlight: 'Sport 4K en Direct & Cinéma',
      titleEnd: 'de Nouvelle Génération',
      description: 'Regardez tous les matchs de Ligue des Champions, Ligue 1, Premier League, Formule 1 et vos films en 4K 60FPS fluide avec la technologie Anti-Freeze v9.8.',
      freeTrialBtn: 'Obtenir un Pass VIP 24h Gratuit',
      explorePlansBtn: 'Voir les Abonnements',
      antiFreeze: 'Anti-Freeze v9.8',
      ultraHd60fps: '4K UHD 60FPS',
      instantSetup: 'Configuration en 10s',
      liveMatchdayHub: 'Centre des Matchs en Direct',
      confirmedLineups: 'Compositions Officielles',
      liveBroadcasts: 'Chaînes Diffuseurs Satellites',
      allLeagues: 'Tous les Grands Championnats',
      timeUk: 'Heure UK (BST)',
      timeUs: 'Heure US (ET)',
      watchLive: 'Regarder en Direct',
      noBuffering: 'Zéro Coupure FAI',
    },
    fixtures: {
      badge: 'CENTRE OFFICIEL DES MATCHS',
      titleStart: 'Matchs en Direct 4K',
      titleHighlight: 'Horaires & Chaînes TV',
      subtitle: 'Compositions d’équipes en temps réel, horaires des coups d’envoi et canaux satellites 4K UHD vérifiés.',
      allCategory: 'Tous les Matchs',
      allMatchdays: 'Tous les Matchs',
      todayUpcoming: 'Matchs à Venir',
      liveNow: 'EN DIRECT',
      channels: 'Chaînes Diffuseurs',
      venue: 'Stade / Lieu',
      lineupConfirmed: 'Compositions Officielles Confirmées',
      switchTimezone: 'Changer le fuseau',
      syncDaily: 'Synchronisé avec les flux officiels',
      syncButton: 'Actualiser les Matchs',
      syncSuccess: 'Horaires et compositions officielles actualisés.',
      crystal4k: 'Diffusion en 4K UHD 60FPS',
      watchLive: 'Regarder le Direct',
      viewAll: 'Voir Tous les Matchs',
      showLess: 'Réduire la liste',
      expandAll: 'Dérouler les {count} Matchs Programmés',
    },
    pricing: {
      badge: 'TARIFS CLAIRS ET TRANSPARENTS',
      titleStart: 'Choisissez Votre',
      titleHighlight: 'Pass Streaming VIP',
      subtitle: 'Accédez à plus de 18 500 chaînes en direct, 65 000 films et séries en 4K et tous les matchs sportifs en 60FPS sans engagement.',
      simultaneousScreens: 'Écrans Simultanés',
      device: 'Appareil',
      devices: 'Appareils',
      screen: 'Écran',
      standard: 'Standard',
      adultChannels: 'Section Adultes 18+',
      includeAdult: 'Inclure Chaînes & VOD Adultes avec Code PIN',
      free: 'GRATUIT',
      perMonth: '/mois',
      instantActivation: 'Activation Automatisée en 10s',
      justPerMonth: 'Seulement {price} / mois',
      activateTrialBtn: 'Activer l\'Essai Gratuit',
      selectPlanBtn: 'Choisir {name}',
      cryptoCheckout: 'Paiement Crypto & Carte',
      instantDelivery: 'Livraison WhatsApp Instantanée',
      moneyBack: 'Garantie Satisfait ou Remboursé 7 Jours',
      highSpeedNodes: 'Serveurs 10Gbps Tier-1',
      selectConnections: 'Sélectionnez le Nombre d\'Écrans Simultanés',
      devicesCount: 'Appareils',
      adultOptional: 'Inclure la Section VIP Adulte 18+',
      adultDesc: 'Chaînes et VOD adultes protégées par code PIN (activable à tout moment)',
      noContract: 'Sans Engagement ni Frais Cachés',
      popular: 'Plus Populaire',
      bestValue: 'Meilleure Offre',
      saveUpTo: 'Économisez jusqu\'à',
      getStartedBtn: 'Commander et Activer Immédiatement',
      month: 'Mois',
      months: 'Mois',
      year: 'An',
      years: 'Ans',
      trial24h: 'Essai Gratuit VIP 24 Heures',
      featuresIncluded: 'Toutes les Fonctionnalités Incluses :',
      instantActivationTitle: 'Livraison Automatique Immédiate des Identifiants',
    },
    channels: {
      badge: 'BOUQUET SATELLITE COMPLET',
      title: 'Explorez 18 500+ Chaînes en Direct',
      titleHighlight: 'En 4K et Full HD Réel',
      subtitle: 'Parcourez notre catalogue complet de chaînes françaises, internationales et sportives.',
      searchPlaceholder: 'Rechercher une chaîne (ex: Canal+, BeIN, RMC Sport, TF1)...',
      allChannels: 'Toutes les Chaînes',
      catchup7days: 'Replay 7 Jours',
      epgGuide: 'Guide TV Complet (EPG)',
      fps60: 'Flux 60 Images/Sec',
      showingChannels: 'Chaînes Affichées',
      totalChannels: 'Total Chaînes en Direct',
    },
    vod: {
      badge: 'CINÉMA ET SÉRIES À LA DEMANDE',
      title: '65 000+ Films et Séries Complètes',
      titleHighlight: 'Mis à Jour Quotidiennement en 4K',
      subtitle: 'Accès illimité aux dernières sorties cinéma, séries cultes et documentaires avec audio multilingue.',
      searchPlaceholder: 'Rechercher un film, une série, un acteur ou un genre...',
      allCinema: 'Tout le Cinéma & Séries',
      tmdbMovies: 'Films Box-Office 4K',
      tmdbSeries: 'Séries Intégrales',
      ukBoxsets: 'Séries Françaises & Européennes',
      usHits: 'Exclusivités HBO, Netflix & US',
      sportsReplays: 'Replays Complets des Matchs',
      imdbScore: 'Note IMDb',
      audioTracks: 'Dolby 5.1 & VF/VOSTFR',
      watchTrailer: 'Bande-Annonce',
      quality4k: '4K Ultra HD',
    },
    features: {
      badge: 'CDN 10GBPS MONDIAL • SERVEURS DÉDIÉS AU STREAMING',
      titleStart: 'Infrastructure Haute Vitesse en',
      titleHighlight: 'France, UK & Europe',
      subtitle: 'Nœuds de diffusion dédiés à Paris, Francfort et Londres avec zéro bridage opérateur ni buffering.',
      item1Badge: 'Synchronisation WP-Cron Automatique',
      item1Title: 'Calendrier Ligue 1, Ligue des Champions & Sports US en Direct',
      item1Desc: 'La synchronisation automatique met à jour chaque jour les affiches de Ligue 1, Ligue des Champions, Premier League et NBA sans intervention manuelle.',
      item2Badge: 'Système Anti-Bridage FAI',
      item2Title: 'Anti-Freeze v9.8 & 99,99% de Disponibilité',
      item2Desc: 'Équilibrage dynamique de charge empêchant les bridages le week-end sur Orange, SFR, Bouygues et Free.',
      item2Tested: 'Testé sur Fibre Orange Livebox, Freebox Pop et SFR Fibre',
      item3Title: 'Véritable 4K UHD 60FPS & HDR',
      item3Desc: 'Images ultra nettes à 60 images par seconde sur toutes les chaînes sportives Canal+, beIN Sports et RMC Sport.',
      item4Title: 'Livraison Automatisée en 10 Secondes',
      item4Desc: 'Recevez votre lien M3U et vos codes Xtream par WhatsApp et e-mail immédiatement après votre commande.',
      antiFreezeTitle: 'Technologie Anti-Freeze v9.8',
      antiFreezeDesc: 'Ajustement dynamique du débit pour contourner le bridage des fournisseurs d\'accès.',
      ultraHdTitle: 'Flux Vraie 4K UHD 60FPS',
      ultraHdDesc: 'Profitez d\'une fluidité parfaite et de couleurs HDR exceptionnelles.',
      devicesTitle: 'Compatibilité Tous Appareils',
      devicesDesc: 'Fonctionne sur FireStick, Smart TV Samsung/LG, boîtiers Android, Apple TV et PC.',
      instantTitle: 'Livraison WhatsApp Instantanée',
      instantDesc: 'Identifiants livrés automatiquement en moins de 10 secondes.',
      catchupTitle: 'Replay TV 7 Jours',
      catchupDesc: 'Ne manquez aucun événement grâce à l\'enregistrement cloud automatique 7 jours.',
      supportTitle: 'Support Dédié 24h/24 et 7j/7',
      supportDesc: 'Assistance technique francophone disponible en permanence sur WhatsApp.',
    },
    reviews: {
      badge: 'NOTE VÉRIFIÉE TRUSTPILOT 4.9 / 5.0',
      titleStart: 'Recommandé par Plus de',
      titleHighlight: '10 500+ Utilisateurs',
      subtitle: 'Retours d\'abonnés vérifiés testant le streaming 4K sur la Ligue 1, la Ligue des Champions et le cinéma.',
      verifiedReviews: 'Avis Vérifiés',
      outOf5: 'sur 5.0',
      basedOn: 'Basé sur',
      basedOnHighlight: '1 480+ avis d\'abonnés vérifiés en France et en Europe',
      allReviews: 'Tous les Avis',
      sportsCategory: 'Ligue 1 & Sports 4K',
      broadbandCategory: 'Fibre & Connexion FAI',
      devicesCategory: 'FireStick & Smart TV',
      vodCategory: 'Cinéma & VOD 4K',
      verified: 'Vérifié',
      excellent: 'Excellent',
      activeSubscribers: 'Abonnés Actifs',
      serverUptime: 'Disponibilité Serveurs',
      instantDelivery: 'Livraison Immédiate',
      verifiedScore: 'Note Trustpilot Vérifiée',
    },
    faq: {
      badge: 'CENTRE D\'AIDE STREAMING',
      titleStart: 'Vous avez des questions ? Voici les',
      titleHighlight: 'Réponses',
      subtitle: 'Tout ce que vous devez savoir sur le streaming 4K, la compatibilité avec votre box Internet et l\'activation.',
      stillHaveQuestions: 'Vous avez encore des questions ?',
      stillHaveQuestionsDesc: 'Notre support technique francophone est à votre écoute sur WhatsApp 24/7 pour toute question.',
      chatWhatsapp: 'Discuter sur WhatsApp',
      needHelp: 'Besoin d\'une assistance personnalisée ?',
      contactSupport: 'Contactez nos techniciens sur WhatsApp pour une aide instantanée.',
      items: [
        {
          q: 'Ai-je besoin d\'un VPN pour regarder les matchs en France ?',
          a: 'Non ! Notre protocole Anti-Freeze v9.8 intègre un routage multi-CDN qui évite les blocages et bridages des FAI français (Orange, SFR, Bouygues, Free) sans nécessiter de VPN.'
        },
        {
          q: 'Quel débit Internet est recommandé pour la 4K 60FPS ?',
          a: 'Une connexion d\'au moins 25 à 30 Mbps est recommandée pour la 4K 60FPS. Pour le Full HD 1080p, 10 à 15 Mbps suffisent amplement.'
        },
        {
          q: 'En combien de temps reçois-je mes identifiants ?',
          a: 'L\'activation est instantanée et automatisée en moins de 10 secondes après confirmation.'
        },
        {
          q: 'Puis-je utiliser mon compte sur plusieurs écrans ?',
          a: 'Oui ! Vous pouvez choisir de 1 à 5 écrans simultanés directement dans notre configurateur.'
        }
      ]
    },
    footer: {
      brandDescription: 'Service de streaming haute disponibilité avec serveurs 10Gbps, 18 500+ chaînes en direct et 65 000+ films et séries en 4K.',
      tvPackages: 'Bouquets TV',
      deviceSetup: 'Guides & Outils',
      speedTest: 'Test de Débit & Latence',
      supportHelp: 'Aide & Assistance',
      discordVip: 'Communauté VIP Discord',
      vpnFaqs: 'FAQ Opérateurs & Connexion',
      trialPass: 'Pass Essai 24h (Gratuit)',
      allRightsReserved: 'Tous droits réservés. Optimisé pour les connexions Fibre haut débit.',
      acceptedPayments: 'Paiements acceptés : Carte Bancaire • Apple Pay • Google Pay • Revolut • Crypto',
      tagline: 'Fournisseur d\'IPTV Streaming 4K Sport & Cinéma Haute Vitesse',
      sportsHeader: 'Chaînes de Sport',
      devicesHeader: 'Appareils Compatibles',
      legalHeader: 'Support & Légal',
      disclaimer: 'Mentions légales : Toutes les marques et logos cités appartiennent à leurs propriétaires respectifs.',
      rights: 'Tous droits réservés.',
      serverStatus: 'Serveurs 10Gbps Opérationnels (Disponibilité 99.99%)',
      setupGuide: 'Guide d\'Installation',
      themeExporter: 'Export Thème WordPress',
      selectLanguage: 'Langue / Région',
      cookiePreferences: 'Préférences Cookies & Confidentialité',
    },
    deviceModal: {
      title: 'Guides de Configuration Facile',
      subtitle: 'Suivez nos tutoriels pas à pas pour configurer votre appareil en moins de 2 minutes.',
      selectDevice: 'Sélectionnez Votre Appareil',
      recommendedApp: 'Application Recommandée',
      difficulty: 'Difficulté',
      estTime: 'Temps Estimé',
      stepsTitle: 'Instructions d\'Installation',
      downloaderCode: 'Code Court Downloader',
      proTip: 'CONSEIL PRO',
      needHelp: 'Besoin d\'aide ? Notre support WhatsApp est disponible 24/7.',
      close: 'Fermer le Guide',
    },
    speedModal: {
      title: 'Test de Débit & Latence Fibre',
      subtitle: 'Mesurez votre connexion directement vers nos serveurs 10Gbps dédiés.',
      startTest: 'Lancer le Test de Vitesse',
      testing: 'Test en cours...',
      downloadSpeed: 'Débit Descendant',
      latency: 'Latence (Ping)',
      jitter: 'Gigue',
      verdictTitle: 'Résultat du Test de Streaming',
      verdictUltra: 'EXCELLENT : Parfait pour le streaming 4K UHD 60FPS HDR sur plusieurs écrans en simultané.',
      verdictGood: 'BON : Idéal pour un streaming fluide en Full HD 1080p 60FPS.',
      verdictFair: 'MOYEN : Adapté au streaming standard. Préférez une connexion filaire pour la 4K.',
      close: 'Fermer le Test',
    },
    checkoutModal: {
      title: 'Activez Votre Pass VIP',
      subtitle: 'Mise en service automatisée en moins de 10 secondes.',
      orderSummary: 'Récapitulatif de la Commande',
      planLabel: 'Formule Choisie',
      connectionsLabel: 'Écrans Simultanés',
      adultChannelsLabel: 'Section Adultes 18+',
      included: 'Inclus (Protégé par PIN)',
      totalDue: 'Montant Total',
      paymentMethod: 'Mode de Paiement',
      cryptoPayment: 'Paiement en Cryptomonnaie (BTC, USDT, ETH)',
      cryptoDesc: 'Activation instantanée et sécurisée sans délai bancaire.',
      whatsappOrder: 'Paiement & Support par WhatsApp',
      whatsappDesc: 'Échangez avec nos conseillers pour régler par Carte, Virement ou PayPal.',
      instantActivationPromise: '✓ Livraison Automatique Instantanée • Garantie Anti-Freeze v9.8 • Remboursement 7 Jours',
      back: 'Retour aux Offres',
      proceedToPayment: 'Valider et Recevoir mes Accès',
    },
    salesNotice: {
      verifiedSubscriber: 'Abonné vérifié à',
      justActivated: 'vient d\'activer un pass',
      ago: '',
    },
    cookieConsent: {
      badge: 'Confidentialité RGPD & Préférences de Localisation',
      title: 'Gestion des Cookies et Préférences',
      description: 'Nous utilisons des cookies essentiels et le stockage local pour mémoriser votre langue, votre devise régionale, le fuseau horaire et les paramètres de streaming.',
      gdprBadge: 'Conforme RGPD (UE / France)',
      ccpaBadge: 'Conforme CCPA',
      globalBadge: 'Vie Privée Protégée',
      acceptAll: 'Tout Accepter',
      rejectNonEssential: 'Essentiels Uniquement',
      customize: 'Personnaliser',
      savePreferences: 'Enregistrer mes Choix',
      settingsTitle: 'Préférences de Confidentialité & Cookies',
      settingsSubtitle: 'Gérez la mémorisation de votre langue, devise et données de performance conformément aux normes du RGPD et du CCPA.',
      strictlyNecessaryTitle: 'Strictement Nécessaires (Toujours Actifs)',
      strictlyNecessaryDesc: 'Indispensables à la sécurité, au routage des flux vidéo, à l\'authentification anti-coupure et au fonctionnement du site.',
      strictlyNecessaryBadge: 'Toujours Actif',
      localizationTitle: 'Préférences de Localisation & Langue',
      localizationDesc: 'Mémorise votre langue préférée, la détection automatique de l\'appareil, la devise (EUR/GBP/USD/CAD) et le fuseau horaire.',
      analyticsTitle: 'Performances & Cache du Test de Débit',
      analyticsDesc: 'Conserve localement les mesures de débit et l\'historique de recherche pour accélérer le chargement des chaînes et des flux.',
      doNotSellTitle: 'Ne Pas Vendre ou Partager mes Données',
      doNotSellDesc: 'Conformément au CCPA et au RGPD, nous ne vendons, ne louons et ne transmettons aucune donnée personnelle ou habitude de visionnage.',
      privacyNote: 'Vos choix s\'appliquent immédiatement et sont modifiables à tout moment en bas de page.',
      close: 'Fermer',
    },
  },

  de: {
    nav: {
      matchdayLineups: 'Spiele & Aufstellungen',
      channels: 'TV-Sender',
      channelsCount: '18.500+',
      vod: '4K Kino & Serien',
      pricing: 'Tarife & Preise',
      setupGuide: 'Installations-Guide',
      freeTrial: '24h Gratis-Test',
      speedTest: 'Speed-Test',
      support: '24/7 Support',
      currency: 'Währung',
      language: 'Sprache',
      selectLanguage: 'Sprache / Region',
      live: 'LIVE',
      top10: 'TOP 10',
      vip: 'VIP',
    },
    ticker: {
      topNotice: '⚡ 10Gbps High-Speed Server Aktiv • Bundesliga, CL & Spiele 2026 Täglich Synchronisiert',
      liveNodes: 'Tier-1 10Gbps Glasfaser-Knoten Aktiv',
      instantActivation: 'Automatisierte WhatsApp-Lieferung in < 10s',
      bitrate: 'Echtes 4K UHD 60FPS Bitrate (25+ Mbps)',
      sportsLive: 'Bundesliga • Champions League • Premier League • Formel 1 • NFL • NBA',
    },
    hero: {
      badge: 'Ultra HD Streaming in Deutschland, Österreich & Schweiz • 18.500+ Live-Sender',
      titleStart: 'Next-Gen',
      titleHighlight: '4K Live-Sport & Filme',
      titleEnd: 'Streaming-Pässe',
      description: 'Streamen Sie jedes Bundesliga-Spiel, Champions League, Formel 1 und 4K Blockbuster ohne Ruckeln dank Anti-Freeze v9.8 Technologie.',
      freeTrialBtn: 'Gratis 24h VIP-Pass anfordern',
      explorePlansBtn: 'Alle Tarife ansehen',
      antiFreeze: 'Anti-Freeze v9.8',
      ultraHd60fps: '4K UHD 60FPS',
      instantSetup: 'In 10s eingerichtet',
      liveMatchdayHub: 'Live Spieltag-Zentrum',
      confirmedLineups: 'Offizielle Aufstellungen',
      liveBroadcasts: 'Satelliten-Sender',
      allLeagues: 'Alle Top-Ligen',
      timeUk: 'Zeit UK (BST)',
      timeUs: 'Zeit US (ET)',
      watchLive: 'Live Ansehen',
      noBuffering: 'Keine Provider-Drosselung',
    },
    fixtures: {
      badge: 'OFFIZIELLES SPIELTAG-ZENTRUM',
      titleStart: 'Live 4K Sport',
      titleHighlight: 'Spiele & TV-Sender',
      subtitle: 'Echtzeit-Aufstellungen, Anstoßzeiten und verifizierte 4K UHD Satellitenkanäle für deutsche und internationale Ligen.',
      allCategory: 'Alle Spiele',
      allMatchdays: 'Alle Spieltage',
      todayUpcoming: 'Kommende Spiele',
      liveNow: 'JETZT LIVE',
      channels: 'Übertragende Sender',
      venue: 'Stadion / Austragungsort',
      lineupConfirmed: 'Offizielle Aufstellungen Bestätigt',
      switchTimezone: 'Zeitzone Ändern',
      syncDaily: 'Mit offiziellen Datenfeeds synchronisiert',
      syncButton: 'Spiele Aktualisieren',
      syncSuccess: 'Spielplan und Aufstellungen erfolgreich aktualisiert.',
      crystal4k: 'Übertragung in 4K UHD 60FPS',
      watchLive: 'Jetzt Live Schauen',
      viewAll: 'Alle Spiele Anzeigen',
      showLess: 'Weniger Anzeigen',
      expandAll: 'Alle {count} Spiele Ausklappen',
    },
    pricing: {
      badge: 'KLARE & TRANSPARENTE PREISE',
      titleStart: 'Wählen Sie Ihren',
      titleHighlight: 'VIP Streaming-Pass',
      subtitle: 'Zugriff auf über 18.500 Live-Sender, 65.000 Filme & Serien in 4K und alle Sport-Events in 60FPS ohne Vertragslaufzeit.',
      simultaneousScreens: 'Gleichzeitige Bildschirme',
      device: 'Gerät',
      devices: 'Geräte',
      screen: 'Bildschirm',
      standard: 'Standard',
      adultChannels: 'Erwachsenen 18+ Bereich',
      includeAdult: 'PIN-geschützte 18+ Sender & VOD aktivieren',
      free: 'KOSTENLOS',
      perMonth: '/Monat',
      instantActivation: 'Sofortige 10s Freischaltung',
      justPerMonth: 'Nur {price} / Monat',
      activateTrialBtn: 'Gratis-Test Starten',
      selectPlanBtn: '{name} Wählen',
      cryptoCheckout: 'Krypto & Kartenzahlung',
      instantDelivery: 'Sofortige WhatsApp-Lieferung',
      moneyBack: '7-Tage-Geld-zurück-Garantie',
      highSpeedNodes: '10Gbps Tier-1 Server',
      selectConnections: 'Wählen Sie die Anzahl der Geräte',
      devicesCount: 'Geräte',
      adultOptional: 'Erwachsenen 18+ Bereich inkludieren',
      adultDesc: 'PIN-geschützte Inhalte für Erwachsene (jederzeit zuschaltbar)',
      noContract: 'Keine versteckten Gebühren oder Verträge',
      popular: 'Am Beliebtesten',
      bestValue: 'Bester Sparpreis',
      saveUpTo: 'Sparen Sie bis zu',
      getStartedBtn: 'Jetzt Bestellen & Freischalten',
      month: 'Monat',
      months: 'Monate',
      year: 'Jahr',
      years: 'Jahre',
      trial24h: 'Kostenloser 24h VIP-Test',
      featuresIncluded: 'Alle Funktionen Enthalten:',
      instantActivationTitle: 'Automatisierte Sofortbereitstellung Ihrer Zugangsdaten',
    },
    channels: {
      badge: 'VOLLES SATELLITEN-PAKET',
      title: 'Über 18.500 Live-Sender Entdecken',
      titleHighlight: 'In Kristallklarem 4K & FHD',
      subtitle: 'Durchsuchen Sie unsere riesige Mediathek aus deutschen, europäischen und weltweiten Sendern.',
      searchPlaceholder: 'Sender suchen (z.B. Sky Sport, DAZN, ARD, ZDF)...',
      allChannels: 'Alle Sender',
      catchup7days: '7 Tage Replay-Funktion',
      epgGuide: 'Vollständiger EPG Programmführer',
      fps60: 'Flüssige 60FPS Streams',
      showingChannels: 'Angezeigte Sender',
      totalChannels: 'Gesamte Live-Sender',
    },
    vod: {
      badge: 'KINO AUF ABRUF',
      title: '65.000+ Filme & Komplette Serien',
      titleHighlight: 'Täglich in 4K Aktualisiert',
      subtitle: 'Unbegrenztes Streaming der neuesten Kinohits, Blockbuster und Klassiker mit deutschem Ton.',
      searchPlaceholder: 'Filme, Serien, Schauspieler suchen...',
      allCinema: 'Alle Filme & Serien',
      tmdbMovies: '4K Kinofilme & Blockbuster',
      tmdbSeries: 'Komplette Serien-Boxsets',
      ukBoxsets: 'Deutsche TV & Mediathek Hits',
      usHits: 'HBO & US Streaming Premieren',
      sportsReplays: 'Komplette Sport-Wiederholungen',
      imdbScore: 'IMDb Note',
      audioTracks: 'Dolby 5.1 & Deutscher Ton',
      watchTrailer: 'Trailer Ansehen',
      quality4k: '4K Ultra HD',
    },
    features: {
      badge: 'GLOBALES 10GBPS CDN • DEDIZIERTE STREAMING-KNOTEN',
      titleStart: 'High-Speed Infrastruktur in',
      titleHighlight: 'Deutschland, UK & Europa',
      subtitle: 'Dedizierte Server in Frankfurt, London und Amsterdam ohne Provider-Drosselung oder Ladezeiten.',
      item1Badge: 'Automatischer WP-Cron Sync',
      item1Title: 'Echtzeit Bundesliga, Champions League & US-Sport Spielplan',
      item1Desc: 'Der automatische Hintergrund-Dienst hält Bundesliga-, Champions League- und NFL-Spielpläne täglich aktuell.',
      item2Badge: 'Anti-Drossel-Technologie',
      item2Title: 'Anti-Freeze v9.8 & 99,99% Uptime',
      item2Desc: 'Dynamischer Lastausgleich verhindert Drosselungen bei Telekom, Vodafone, O2 und 1&1.',
      item2Tested: 'Getestet auf Telekom Glasfaser, Vodafone Gigabit & 1&1',
      item3Title: 'Echtes 4K UHD 60FPS & HDR',
      item3Desc: 'Gestochen scharfe Streams mit hoher Bitrate und 60 Bildern pro Sekunde bei Sky Sport, DAZN und Eurosport.',
      item4Title: 'Sofortige 10-Sekunden Bereitstellung',
      item4Desc: 'Erhalten Sie M3U-Playlist und Xtream Codes Zugangsdaten sofort nach der Bestellung per WhatsApp.',
      antiFreezeTitle: 'Anti-Freeze v9.8 Technologie',
      antiFreezeDesc: 'Intelligente Bitraten-Regulierung verhindert Ruckeln bei Top-Spielen.',
      ultraHdTitle: 'Echte 4K UHD 60FPS Streams',
      ultraHdDesc: 'Erleben Sie Sport in flüssigen 60 Bildern pro Sekunde und brillanten Farben.',
      devicesTitle: 'Universelle Geräteunterstützung',
      devicesDesc: 'Kompatibel mit Amazon FireStick, Samsung/LG Smart TVs, Android Boxen und Apple TV.',
      instantTitle: 'Blitzschnelle WhatsApp-Einrichtung',
      instantDesc: 'Zugangsdaten werden in unter 10 Sekunden automatisch übermittelt.',
      catchupTitle: '7 Tage Replay & Mediathek',
      catchupDesc: 'Verpassen Sie kein Tor mit der automatischen 7-Tage-Aufzeichnung.',
      supportTitle: '24/7 Kompetenter Support',
      supportDesc: 'Unser Support-Team ist rund um die Uhr per WhatsApp und Telegram erreichbar.',
    },
    reviews: {
      badge: 'TRUSTPILOT 4.9 / 5.0 VERIFIZIERT',
      titleStart: 'Geschätzt von Über',
      titleHighlight: '10.500+ Kunden',
      subtitle: 'Echte verifizierte Abonnenten-Bewertungen auf Telekom, Vodafone und Glasfaser-Verbindungen.',
      verifiedReviews: 'Verifizierte Bewertungen',
      outOf5: 'von 5.0',
      basedOn: 'Basierend auf',
      basedOnHighlight: '1.480+ verifizierten Kundenstimmen in Deutschland und Europa',
      allReviews: 'Alle Bewertungen',
      sportsCategory: 'Bundesliga & 4K Sport',
      broadbandCategory: 'Telekom & Glasfaser',
      devicesCategory: 'FireStick & Smart TV',
      vodCategory: 'Sky Cinema & 4K VOD',
      verified: 'Verifiziert',
      excellent: 'Hervorragend',
      activeSubscribers: 'Aktive Abonnenten',
      serverUptime: 'Server Verfügbarkeit',
      instantDelivery: 'Sofortige Lieferung',
      verifiedScore: 'Trustpilot Bewertung',
    },
    faq: {
      badge: 'STREAMING WISSENSDATENBANK',
      titleStart: 'Fragen? Wir haben die',
      titleHighlight: 'Antworten',
      subtitle: 'Alles Wichtige zu 4K Fußball, Internetanbietern in Deutschland und schneller Aktivierung.',
      stillHaveQuestions: 'Haben Sie noch Fragen vor der Bestellung?',
      stillHaveQuestionsDesc: 'Unser technischer WhatsApp-Support steht Ihnen 24/7 für Fragen zur Verfügung.',
      chatWhatsapp: 'Auf WhatsApp schreiben',
      needHelp: 'Benötigen Sie weitere Unterstützung?',
      contactSupport: 'Kontaktieren Sie unser Support-Team auf WhatsApp für Soforthilfe.',
      items: [
        {
          q: 'Benötige ich ein VPN für Bundesliga und Champions League?',
          a: 'Nein! Dank unserer Anti-Freeze v9.8 Technologie mit dynamischem Routing ist kein VPN erforderlich. Deutsche Provider wie Telekom oder Vodafone drosseln Ihren Stream nicht.'
        },
        {
          q: 'Welche Internetgeschwindigkeit benötige ich für 4K 60FPS?',
          a: 'Für 4K UHD 60FPS empfehlen wir mindestens 25–30 Mbit/s. Für Full HD reichen 10–15 Mbit/s aus.'
        },
        {
          q: 'Wie schnell erhalte ich meine Zugangsdaten?',
          a: 'Die Bereitstellung erfolgt vollautomatisch in unter 10 Sekunden direkt auf dem Bildschirm und per WhatsApp.'
        },
        {
          q: 'Kann ich das Abonnement auf mehreren Geräten nutzen?',
          a: 'Ja! Sie können in unserem Tarif-Rechner flexibel zwischen 1 und 5 gleichzeitigen Bildschirmen wählen.'
        }
      ]
    },
    footer: {
      brandDescription: 'Zuverlässiges Streaming mit 10Gbps Servern, 18.500+ Live-Sendern und 65.000+ Filmen und Serien in echtem 4K.',
      tvPackages: 'TV-Pakete',
      deviceSetup: 'Geräte-Einrichtung',
      speedTest: 'Speed- & Ping-Test',
      supportHelp: 'Support & Hilfe',
      discordVip: 'Discord VIP Community',
      vpnFaqs: 'Provider & VPN FAQs',
      trialPass: '24h Test-Pass (Kostenlos)',
      allRightsReserved: 'Alle Rechte vorbehalten. Optimiert für schnelle Glasfaser-Verbindungen.',
      acceptedPayments: 'Akzeptierte Zahlungsarten: Kreditkarte • Apple Pay • Google Pay • Revolut • Krypto',
      tagline: 'Premium 4K Sport & Cinema IPTV Streaming Provider',
      sportsHeader: 'Sport-Sender',
      devicesHeader: 'Unterstützte Geräte',
      legalHeader: 'Support & Rechtliches',
      disclaimer: 'Haftungsausschluss: Alle genannten Markennamen und Logos sind Eigentum der jeweiligen Rechteinhaber.',
      rights: 'Alle Rechte vorbehalten.',
      serverStatus: '10Gbps Server Online (99.99% Uptime)',
      setupGuide: 'Installations-Anleitung',
      themeExporter: 'WordPress Theme Export',
      selectLanguage: 'Sprache / Region',
      cookiePreferences: 'Cookie- & Datenschutz-Einstellungen',
    },
    deviceModal: {
      title: 'Einfache Installations-Anleitungen',
      subtitle: 'Folgen Sie unseren Schritt-für-Schritt Anleitungen und starten Sie in unter 2 Minuten.',
      selectDevice: 'Wählen Sie Ihr Gerät',
      recommendedApp: 'Empfohlene App',
      difficulty: 'Schwierigkeit',
      estTime: 'Geschätzte Dauer',
      stepsTitle: 'Installationsschritte',
      downloaderCode: 'Downloader Zahlencode',
      proTip: 'PROFI-TIPP',
      needHelp: 'Hilfe benötigt? Unser WhatsApp Support hilft 24/7.',
      close: 'Anleitung Schließen',
    },
    speedModal: {
      title: 'Glasfaser Speed & Latenz Test',
      subtitle: 'Testen Sie Ihre Verbindungsgeschwindigkeit direkt zu unseren 10Gbps Streaming-Knoten.',
      startTest: 'Speed-Test Starten',
      testing: 'Test wird durchgeführt...',
      downloadSpeed: 'Download-Geschwindigkeit',
      latency: 'Latenz (Ping)',
      jitter: 'Jitter',
      verdictTitle: 'Streaming-Eignung',
      verdictUltra: 'EXZELLENT: Perfekt geeignet für 4K UHD 60FPS HDR Streams auf mehreren Bildschirmen.',
      verdictGood: 'GUT: Bestens geeignet für ruckelfreies Full HD 1080p 60FPS Streaming.',
      verdictFair: 'AUSREICHEND: Für Standard HD Streams geeignet. Für 4K empfehlen wir LAN-Kabel.',
      close: 'Test Schließen',
    },
    checkoutModal: {
      title: 'VIP Streaming-Pass Freischalten',
      subtitle: 'Automatisierte Sofortbereitstellung in unter 10 Sekunden.',
      orderSummary: 'Bestellübersicht',
      planLabel: 'Gewählter Tarif',
      connectionsLabel: 'Gleichzeitige Bildschirme',
      adultChannelsLabel: 'Erwachsenen 18+ Sender',
      included: 'Inklusive (PIN-geschützt)',
      totalDue: 'Gesamtbetrag',
      paymentMethod: 'Zahlungsart Wählen',
      cryptoPayment: 'Krypto-Zahlung (Bitcoin, USDT, ETH)',
      cryptoDesc: 'Sofortige Aktivierung ohne Banklaufzeiten.',
      whatsappOrder: 'Bestellung via WhatsApp Support',
      whatsappDesc: 'Persönliche Abwicklung für Banküberweisung, Karte oder PayPal.',
      instantActivationPromise: '✓ 100% Sofortige Aktivierung • Anti-Freeze v9.8 Garantie • 7 Tage Geld-zurück',
      back: 'Zurück zu den Tarifen',
      proceedToPayment: 'Bestellen & Zugangsdaten Erhalten',
    },
    salesNotice: {
      verifiedSubscriber: 'Kunde in',
      justActivated: 'hat soeben aktiviert:',
      ago: '',
    },
    cookieConsent: {
      badge: 'DSGVO / CCPA Datenschutz & Spracheinstellungen',
      title: 'Cookie- & Lokalisierungs-Einstellungen',
      description: 'Wir verwenden essenzielle Cookies und lokalen Speicher, um Ihre bevorzugte Sprache, Währung, Geräteeinstellungen und Streaming-Server zu speichern.',
      gdprBadge: 'DSGVO-konform (EU / DE)',
      ccpaBadge: 'CCPA-konform (USA)',
      globalBadge: 'Datenschutz Gewährleistet',
      acceptAll: 'Alle Akzeptieren',
      rejectNonEssential: 'Nur Notwendige',
      customize: 'Einstellungen Anpassen',
      savePreferences: 'Auswahl Speichern',
      settingsTitle: 'Datenschutz- & Cookie-Einstellungen',
      settingsSubtitle: 'Verwalten Sie Ihre Einstellungen für Sprache, Währung und Streaming-Performance im Einklang mit DSGVO- und CCPA-Richtlinien.',
      strictlyNecessaryTitle: 'Technisch Notwendig (Immer Aktiv)',
      strictlyNecessaryDesc: 'Erforderlich für Sicherheit, Stream-Token-Authentifizierung, Anti-Freeze-Lastverteilung und Grundfunktionen.',
      strictlyNecessaryBadge: 'Immer Aktiv',
      localizationTitle: 'Lokalisierungs- & Sprachpräferenzen',
      localizationDesc: 'Speichert Ihre Sprachauswahl, Geräteerkennung, Währung (EUR/GBP/USD/CAD) und Zeitzonenanpassung.',
      analyticsTitle: 'Performance & Speedtest-Cache',
      analyticsDesc: 'Speichert Latenzwerte des Speedtests und Suchverlauf lokal für blitzschnelle Ladezeiten und optimale Serverwahl.',
      doNotSellTitle: 'Keine Weitergabe oder Verkauf von Daten',
      doNotSellDesc: 'Gemäß DSGVO und CCPA verkaufen oder teilen wir keinerlei persönliche Daten oder Sehgewohnheiten mit Dritten.',
      privacyNote: 'Ihre Auswahl wird sofort wirksam und kann jederzeit in der Fußzeile angepasst werden.',
      close: 'Schließen',
    },
  },

  es: {
    nav: {
      matchdayLineups: 'Partidos y Alineaciones',
      channels: 'Canales de TV',
      channelsCount: '18.500+',
      vod: 'Cine 4K y Series',
      pricing: 'Planes y Precios',
      setupGuide: 'Guía de Instalación',
      freeTrial: 'Prueba 24h Gratis',
      speedTest: 'Test de Velocidad',
      support: 'Soporte 24/7',
      currency: 'Moneda',
      language: 'Idioma',
      selectLanguage: 'Idioma / Región',
      live: 'EN DIRECTO',
      top10: 'TOP 10',
      vip: 'VIP',
    },
    ticker: {
      topNotice: '⚡ Servidores 10Gbps de Alta Velocidad Activos • Partidos y Programación 2026 Sincronizados a Diario',
      liveNodes: 'Nodos de Fibra 10Gbps Tier-1 Activos',
      instantActivation: 'Entrega Automatizada Instantánea por WhatsApp en 10s',
      bitrate: 'Bitrate Real 4K UHD 60FPS (25+ Mbps)',
      sportsLive: 'Fútbol Europeo • Champions League • Premier League • Fórmula 1 • NFL • NBA',
    },
    hero: {
      badge: 'Streaming Ultra HD en España, América Latina y Europa • 18.500+ Canales en Vivo',
      titleStart: 'Streaming',
      titleHighlight: 'Deportes 4K en Vivo y Cine',
      titleEnd: 'de Nueva Generación',
      description: 'Disfrute de cada partido de fútbol europeo, Champions League, Premier League, Serie A, Fórmula 1, NFL y NBA en 4K 60FPS fluido. Activación inmediata y sin cortes de conexión.',
      freeTrialBtn: 'Obtener Pase VIP 24h Gratis',
      explorePlansBtn: 'Ver Planes y Precios',
      antiFreeze: 'Anti-Freeze v9.8',
      ultraHd60fps: '4K UHD 60FPS',
      instantSetup: 'Configuración en 10s',
      liveMatchdayHub: 'Centro de Partidos en Directo',
      confirmedLineups: 'Alineaciones Oficiales',
      liveBroadcasts: 'Canales Emisores Satélite',
      allLeagues: 'Todas las Grandes Ligas',
      timeUk: 'Hora UK (BST)',
      timeUs: 'Hora US (ET)',
      watchLive: 'Ver en Vivo',
      noBuffering: 'Cero Cortes del Proveedor',
    },
    fixtures: {
      badge: 'CENTRO OFICIAL DE PARTIDOS',
      titleStart: 'Deportes en Vivo 4K',
      titleHighlight: 'Horarios y Canales de TV',
      subtitle: 'Alineaciones en tiempo real, horarios de inicio y canales satelitales 4K UHD verificados de las principales ligas.',
      allCategory: 'Todos los Partidos',
      allMatchdays: 'Todos los Partidos',
      todayUpcoming: 'Próximos Encuentros',
      liveNow: 'EN DIRECTO',
      channels: 'Canales Emisores',
      venue: 'Estadio / Sede',
      lineupConfirmed: 'Alineaciones Oficiales Confirmadas',
      switchTimezone: 'Cambiar Zona Horaria',
      syncDaily: 'Sincronizado con fuentes oficiales',
      syncButton: 'Actualizar Partidos',
      syncSuccess: 'Horarios y alineaciones actualizados con éxito.',
      crystal4k: 'Emisión en 4K UHD 60FPS',
      watchLive: 'Ver Ahora en Vivo',
      viewAll: 'Ver Todos los Partidos',
      showLess: 'Mostrar Menos',
      expandAll: 'Desplegar los {count} Partidos Programados',
    },
    pricing: {
      badge: 'TARIFAS CLARAS Y TRANSPARENTES',
      titleStart: 'Elija su Pase',
      titleHighlight: 'VIP Streaming 4K',
      subtitle: 'Acceso a más de 18.500 canales premium en vivo, 65.000 películas y series en 4K y todos los eventos deportivos en 60FPS.',
      simultaneousScreens: 'Pantallas Simultáneas',
      device: 'Dispositivo',
      devices: 'Dispositivos',
      screen: 'Pantalla',
      standard: 'Estándar',
      adultChannels: 'Sección Adultos 18+',
      includeAdult: 'Incluir Canales y VOD para Adultos con PIN',
      free: 'GRATIS',
      perMonth: '/mes',
      instantActivation: 'Activación Automática en 10s',
      justPerMonth: 'Solo {price} / mes',
      activateTrialBtn: 'Activar Prueba Gratis',
      selectPlanBtn: 'Elegir {name}',
      cryptoCheckout: 'Pago con Tarjeta y Cripto',
      instantDelivery: 'Entrega Instantánea por WhatsApp',
      moneyBack: 'Garantía de Devolución de 7 Días',
      highSpeedNodes: 'Servidores 10Gbps Tier-1',
      selectConnections: 'Seleccione el Número de Pantallas Simultáneas',
      devicesCount: 'Dispositivos',
      adultOptional: 'Incluir Sección VIP Adultos 18+',
      adultDesc: 'Canales y VOD adultos protegidos con PIN (activable cuando desee)',
      noContract: 'Sin Contratos ni Comisiones Ocultas',
      popular: 'Más Popular',
      bestValue: 'Mejor Oferta',
      saveUpTo: 'Ahorre hasta un',
      getStartedBtn: 'Comprar y Activar al Instante',
      month: 'Mes',
      months: 'Meses',
      year: 'Año',
      years: 'Años',
      trial24h: 'Prueba Gratuita VIP 24 Horas',
      featuresIncluded: 'Todas las Características Incluidas:',
      instantActivationTitle: 'Entrega Automatizada Inmediata de Credenciales',
    },
    channels: {
      badge: 'PARRILLA SATELITAL COMPLETA',
      title: 'Explore 18.500+ Canales en Vivo',
      titleHighlight: 'En Auténtico 4K y Full HD',
      subtitle: 'Navegue por nuestra completa biblioteca de canales en español, internacionales y de deportes.',
      searchPlaceholder: 'Buscar canal (ej. M+ Deportes, DAZN, ESPN, Fox)...',
      allChannels: 'Todos los Canales',
      catchup7days: 'Replay de 7 Días',
      epgGuide: 'Guía de Programación (EPG)',
      fps60: 'Emisiones Fluidas 60FPS',
      showingChannels: 'Canales Visibles',
      totalChannels: 'Canales en Directo',
    },
    vod: {
      badge: 'CINE Y SERIES A LA CARTA',
      title: '65.000+ Películas y Series Completas',
      titleHighlight: 'Actualizadas Diariamente en 4K',
      subtitle: 'Acceso ilimitado a los últimos estrenos de taquilla, series completas y documentales con audio en castellano y latino.',
      searchPlaceholder: 'Buscar películas, series, actores o géneros...',
      allCinema: 'Todo el Cine y Series',
      tmdbMovies: 'Taquillazos de Cine 4K',
      tmdbSeries: 'Series Completas',
      ukBoxsets: 'Series Españolas y Europeas',
      usHits: 'Estrenos HBO, Netflix y USA',
      sportsReplays: 'Repeticiones de Partidos Completos',
      imdbScore: 'Nota IMDb',
      audioTracks: 'Dolby 5.1 y Audio Español/VOSE',
      watchTrailer: 'Ver Tráiler',
      quality4k: '4K Ultra HD',
    },
    features: {
      badge: 'CDN GLOBAL 10GBPS • SERVIDORES DEDICADOS',
      titleStart: 'Infraestructura de Alta Velocidad en',
      titleHighlight: 'España, Europa y América',
      subtitle: 'Nodos dedicados de transmisión en Madrid, Londres y Miami sin bloqueos de operadora ni cortes.',
      item1Badge: 'Sincronización Automática WP-Cron',
      item1Title: 'Calendario de Fútbol Europeo, Champions y Deportes US en Tiempo Real',
      item1Desc: 'La sincronización automática actualiza a diario los horarios de torneos europeos, Champions League, Fórmula 1 y NBA sin intervención manual.',
      item2Badge: 'Tecnología Anti-Bloqueo de Operador',
      item2Title: 'Anti-Freeze v9.8 y 99.99% de Disponibilidad',
      item2Desc: 'Balanceo dinámico que evita los bloqueos de fin de semana en Movistar, Vodafone, Orange, Digi y operadores de fibra.',
      item2Tested: 'Probado en Fibra Movistar 1Gb, Orange y Digi',
      item3Title: 'Verdadero 4K UHD 60FPS y HDR',
      item3Desc: 'Imágenes ultranítidas a 60 fotogramas por segundo en todos los canales de deportes, DAZN y ESPN.',
      item4Title: 'Entrega Automática en 10 Segundos',
      item4Desc: 'Reciba su enlace M3U y claves Xtream por WhatsApp y correo electrónico al instante.',
      antiFreezeTitle: 'Tecnología Anti-Freeze v9.8',
      antiFreezeDesc: 'Regulación dinámica de bitrate que elimina cortes durante los partidos más concurridos.',
      ultraHdTitle: 'Emisiones en 4K UHD 60FPS Real',
      ultraHdDesc: 'Disfrute de la máxima fluidez a 60 imágenes por segundo con colores HDR.',
      devicesTitle: 'Compatibilidad con Todos los Dispositivos',
      devicesDesc: 'Compatible con FireStick, Smart TV Samsung/LG, cajas Android, Apple TV y PC.',
      instantTitle: 'Configuración Inmediata por WhatsApp',
      instantDesc: 'Datos de acceso generados y enviados automáticamente en menos de 10 segundos.',
      catchupTitle: 'Grabación y Replay de 7 Días',
      catchupDesc: 'Vuelva a ver cualquier evento gracias a la grabación automática en la nube de 7 días.',
      supportTitle: 'Soporte Técnico Experto 24/7',
      supportDesc: 'Equipo de atención al cliente disponible siempre a través de WhatsApp y Telegram.',
    },
    reviews: {
      badge: 'VALORACIÓN TRUSTPILOT 4.9 / 5.0 VERIFICADA',
      titleStart: 'Recomendado por Más de',
      titleHighlight: '10.500+ Clientes',
      subtitle: 'Comentarios reales de suscriptores verificados que disfrutan del mejor fútbol en 4K y cine.',
      verifiedReviews: 'Reseñas Verificadas',
      outOf5: 'de 5.0',
      basedOn: 'Basado en',
      basedOnHighlight: '1.480+ valoraciones de suscriptores verificados en España y Europa',
      allReviews: 'Todas las Reseñas',
      sportsCategory: 'Fútbol Europeo y Deportes 4K',
      broadbandCategory: 'Fibra y Operadores',
      devicesCategory: 'FireStick y Smart TV',
      vodCategory: 'Cine y VOD 4K',
      verified: 'Verificado',
      excellent: 'Excelente',
      activeSubscribers: 'Suscriptores Activos',
      serverUptime: 'Disponibilidad Servidores',
      instantDelivery: 'Entrega Inmediata',
      verifiedScore: 'Puntuación Trustpilot',
    },
    faq: {
      badge: 'PREGUNTAS FRECUENTES',
      titleStart: '¿Tiene Dudas? Aquí Están las',
      titleHighlight: 'Respuestas',
      subtitle: 'Todo lo que necesita saber sobre el fútbol 4K, compatibilidad con su operador y activación.',
      stillHaveQuestions: '¿Tiene preguntas antes de contratar?',
      stillHaveQuestionsDesc: 'Nuestro soporte técnico en español está disponible en WhatsApp 24/7 para ayudarle.',
      chatWhatsapp: 'Hablar por WhatsApp',
      needHelp: '¿Necesita ayuda personalizada?',
      contactSupport: 'Contacte con nuestro equipo técnico por WhatsApp para asistencia al momento.',
      items: [
        {
          q: '¿Necesito una VPN para ver los partidos en España?',
          a: '¡No! Gracias a nuestra tecnología Anti-Freeze v9.8 y enrutamiento dinámico multi-CDN, su operador (Movistar, Vodafone, Orange, Digi) no puede bloquear ni ralentizar la señal.'
        },
        {
          q: '¿Qué velocidad de conexión necesito para 4K 60FPS?',
          a: 'Se recomiendan al menos 25 a 30 Mbps para canales 4K UHD 60FPS. Para Full HD 1080p, con 10 a 15 Mbps es suficiente.'
        },
        {
          q: '¿Cuánto tardan en enviarme los datos de acceso?',
          a: 'La entrega es totalmente automática e instantánea en menos de 10 segundos tras la confirmación.'
        },
        {
          q: '¿Puedo ver el servicio en varios televisores a la vez?',
          a: '¡Sí! Puede seleccionar de 1 a 5 conexiones simultáneas desde nuestro selector de planes.'
        }
      ]
    },
    footer: {
      brandDescription: 'Servicio de streaming de alta calidad con servidores 10Gbps, 18.500+ canales en directo y 65.000+ películas y series en 4K.',
      tvPackages: 'Paquetes de TV',
      deviceSetup: 'Guías y Dispositivos',
      speedTest: 'Test de Velocidad y Ping',
      supportHelp: 'Soporte y Ayuda',
      discordVip: 'Comunidad VIP Discord',
      vpnFaqs: 'Preguntas Frecuentes Operadores',
      trialPass: 'Pase de Prueba 24h (Gratis)',
      allRightsReserved: 'Todos los derechos reservados. Optimizado para conexiones de fibra óptica de alta velocidad.',
      acceptedPayments: 'Pagos Aceptados: Tarjeta • Apple Pay • Google Pay • Revolut • Criptomonedas',
      tagline: 'Proveedor de IPTV Streaming 4K Deportes y Cine',
      sportsHeader: 'Canales de Deportes',
      devicesHeader: 'Dispositivos Compatibles',
      legalHeader: 'Soporte y Legal',
      disclaimer: 'Aviso legal: Todas las marcas comerciales y logotipos son propiedad de sus respectivos dueños.',
      rights: 'Todos los derechos reservados.',
      serverStatus: 'Servidores 10Gbps Operativos (99.99% Disponibilidad)',
      setupGuide: 'Guía de Instalación',
      themeExporter: 'Exportar Tema WordPress',
      selectLanguage: 'Idioma / Región',
      cookiePreferences: 'Preferencias de Cookies y Privacidad',
    },
    deviceModal: {
      title: 'Guías de Configuración Fácil',
      subtitle: 'Siga nuestros tutoriales paso a paso y empiece a disfrutar en menos de 2 minutos.',
      selectDevice: 'Seleccione su Dispositivo',
      recommendedApp: 'Aplicación Recomendada',
      difficulty: 'Dificultad',
      estTime: 'Tiempo Estimado',
      stepsTitle: 'Instrucciones de Instalación',
      downloaderCode: 'Código Downloader',
      proTip: 'CONSEJO PRO',
      needHelp: '¿Necesita ayuda? Nuestro soporte en WhatsApp está disponible 24/7.',
      close: 'Cerrar Guía',
    },
    speedModal: {
      title: 'Test de Velocidad y Latencia de Fibra',
      subtitle: 'Compruebe el rendimiento de su conexión hacia nuestros nodos de streaming 10Gbps.',
      startTest: 'Iniciar Test de Velocidad',
      testing: 'Comprobando conexión...',
      downloadSpeed: 'Velocidad de Descarga',
      latency: 'Latencia (Ping)',
      jitter: 'Jitter',
      verdictTitle: 'Diagnóstico de Conexión',
      verdictUltra: 'EXCELENTE: Perfecto para streaming 4K UHD 60FPS HDR en múltiples pantallas a la vez.',
      verdictGood: 'BUENO: Ideal para una reproducción Full HD 1080p 60FPS fluida y sin cortes.',
      verdictFair: 'ACEPTABLE: Adecuado para calidad estándar. Se recomienda cable de red para 4K.',
      close: 'Cerrar Test',
    },
    checkoutModal: {
      title: 'Active su Pase Streaming VIP',
      subtitle: 'Entrega automatizada en menos de 10 segundos.',
      orderSummary: 'Resumen del Pedido',
      planLabel: 'Plan Seleccionado',
      connectionsLabel: 'Pantallas Simultáneas',
      adultChannelsLabel: 'Sección Adultos 18+',
      included: 'Incluido (Protegido por PIN)',
      totalDue: 'Importe Total',
      paymentMethod: 'Método de Pago',
      cryptoPayment: 'Pago en Criptomonedas (BTC, USDT, ETH)',
      cryptoDesc: 'Activación instantánea sin intermediarios bancarios.',
      whatsappOrder: 'Pago y Atención por WhatsApp',
      whatsappDesc: 'Atención personalizada para pago por Tarjeta, Transferencia o PayPal.',
      instantActivationPromise: '✓ Activación Instantánea 100% • Garantía Anti-Freeze v9.8 • Devolución en 7 Días',
      back: 'Volver a los Planes',
      proceedToPayment: 'Completar Pedido y Recibir Accesos',
    },
    salesNotice: {
      verifiedSubscriber: 'Suscriptor verificado en',
      justActivated: 'acaba de activar un pase',
      ago: '',
    },
    cookieConsent: {
      badge: 'Privacidad RGPD / CCPA y Preferencias Regionales',
      title: 'Preferencias de Cookies y Localización',
      description: 'Utilizamos cookies esenciales y almacenamiento local para recordar su idioma seleccionado, moneda regional, zona horaria y nodos de streaming.',
      gdprBadge: 'Conforme con RGPD (UE / España)',
      ccpaBadge: 'Conforme con CCPA (EE. UU.)',
      globalBadge: 'Privacidad Garantizada',
      acceptAll: 'Aceptar Todas',
      rejectNonEssential: 'Solo Esenciales',
      customize: 'Personalizar Opciones',
      savePreferences: 'Guardar Preferencias',
      settingsTitle: 'Configuración de Privacidad y Cookies',
      settingsSubtitle: 'Gestione el almacenamiento de su idioma, moneda y rendimiento conforme a las normativas RGPD y CCPA.',
      strictlyNecessaryTitle: 'Estrictamente Necesarias (Siempre Activas)',
      strictlyNecessaryDesc: 'Requeridas para la seguridad del sitio, enrutamiento seguro de vídeo, equilibrio de carga y tecnología Anti-Freeze.',
      strictlyNecessaryBadge: 'Siempre Activo',
      localizationTitle: 'Preferencias de Idioma y Localización',
      localizationDesc: 'Guarda su idioma preferido, detección automática del dispositivo, divisa (EUR/GBP/USD/CAD) y huso horario.',
      analyticsTitle: 'Rendimiento y Caché del Test de Velocidad',
      analyticsDesc: 'Almacena localmente las métricas del test de velocidad y búsquedas de canales para acelerar la carga de la página.',
      doNotSellTitle: 'No Vender ni Compartir mi Información',
      doNotSellDesc: 'Cumpliendo estrictamente con RGPD y CCPA, nunca vendemos ni compartimos sus datos personales ni historial de visualización.',
      privacyNote: 'Sus preferencias se aplican al instante y pueden modificarse en cualquier momento desde el pie de página.',
      close: 'Cerrar',
    },
  },

  it: {
    nav: {
      matchdayLineups: 'Partite e Formazioni',
      channels: 'Canali TV',
      channelsCount: '18.500+',
      vod: 'Cinema 4K e Serie',
      pricing: 'Abbonamenti',
      setupGuide: 'Guida Installazione',
      freeTrial: 'Prova 24h Gratis',
      speedTest: 'Test di Velocità',
      support: 'Supporto 24/7',
      currency: 'Valuta',
      language: 'Lingua',
      selectLanguage: 'Lingua / Regione',
      live: 'IN DIRETTA',
      top10: 'TOP 10',
      vip: 'VIP',
    },
    ticker: {
      topNotice: '⚡ Server 10Gbps ad Alta Velocità Attivi • Partite e Palinsesto 2026 Sincronizzati Quotidianamente',
      liveNodes: 'Nodi in Fibra 10Gbps Tier-1 Attivi',
      instantActivation: 'Attivazione Automatica Istantanea su WhatsApp in 10s',
      bitrate: 'Bitrate Reale 4K UHD 60FPS (25+ Mbps)',
      sportsLive: 'Serie A • Champions League • Premier League • Formula 1 • MotoGP • NBA',
    },
    hero: {
      badge: 'Streaming Ultra HD in Italia, Europa e Mondo • 18.500+ Canali in Diretta',
      titleStart: 'Streaming',
      titleHighlight: 'Sport in Diretta 4K e Cinema',
      titleEnd: 'di Nuova Generazione',
      description: 'Guarda tutte le partite di Serie A, Champions League, Premier League, tornei europei, Formula 1, MotoGP e NBA in 4K 60FPS fluido. Attivazione immediata senza blocchi dell’operatore.',
      freeTrialBtn: 'Ottieni il Pass VIP 24h Gratis',
      explorePlansBtn: 'Scopri gli Abbonamenti',
      antiFreeze: 'Anti-Freeze v9.8',
      ultraHd60fps: '4K UHD 60FPS',
      instantSetup: 'Attivazione in 10s',
      liveMatchdayHub: 'Centro Partite in Diretta',
      confirmedLineups: 'Formazioni Ufficiali',
      liveBroadcasts: 'Canali Satellitari Diffusori',
      allLeagues: 'Tutti i Principali Campionati',
      timeUk: 'Ora UK (BST)',
      timeUs: 'Ora US (ET)',
      watchLive: 'Guarda in Diretta',
      noBuffering: 'Zero Blocchi Operatore',
    },
    fixtures: {
      badge: 'CENTRO PARTITE UFFICIALE',
      titleStart: 'Sport in Diretta 4K',
      titleHighlight: 'Partite e Canali TV',
      subtitle: 'Formazioni in tempo reale, orari di inizio e canali satellitari 4K UHD verificati per tutti i campionati.',
      allCategory: 'Tutte le Partite',
      allMatchdays: 'Tutte le Partite',
      todayUpcoming: 'Prossime Partite',
      liveNow: 'IN DIRETTA ORA',
      channels: 'Canali di Trasmissione',
      venue: 'Stadio / Luogo',
      lineupConfirmed: 'Formazioni Ufficiali Confermate',
      switchTimezone: 'Cambia Fuso Orario',
      syncDaily: 'Sincronizzato con i feed ufficiali',
      syncButton: 'Aggiorna Partite',
      syncSuccess: 'Calendario e formazioni aggiornati con successo.',
      crystal4k: 'Trasmesso in 4K UHD 60FPS',
      watchLive: 'Guarda Ora in Diretta',
      viewAll: 'Vedi Tutte le Partite',
      showLess: 'Mostra Meno',
      expandAll: 'Espandi Tutte le {count} Partite in Programma',
    },
    pricing: {
      badge: 'TARIFFE TRASPARENTI',
      titleStart: 'Scegli il Tuo',
      titleHighlight: 'Pass Streaming VIP',
      subtitle: 'Accedi a oltre 18.500 canali TV live, 65.000 film e serie in 4K e tutto lo sport in 60FPS senza alcun buffering.',
      simultaneousScreens: 'Schermi Simultanei',
      device: 'Dispositivo',
      devices: 'Dispositivi',
      screen: 'Schermo',
      standard: 'Standard',
      adultChannels: 'Sezione Adulti 18+',
      includeAdult: 'Includi Canali e VOD Adulti con Codice PIN',
      free: 'GRATIS',
      perMonth: '/mese',
      instantActivation: 'Attivazione Automatica in 10s',
      justPerMonth: 'Solo {price} / mese',
      activateTrialBtn: 'Attiva Prova Gratuita',
      selectPlanBtn: 'Scegli {name}',
      cryptoCheckout: 'Pagamento Carta e Criptovalute',
      instantDelivery: 'Consegna Istantanea su WhatsApp',
      moneyBack: 'Garanzia Soddisfatti o Rimborsati 7 Giorni',
      highSpeedNodes: 'Server 10Gbps Tier-1',
      selectConnections: 'Seleziona il Numero di Schermi Contemporanei',
      devicesCount: 'Dispositivi',
      adultOptional: 'Includi la Sezione VIP Adulti 18+',
      adultDesc: 'Canali e VOD per adulti protetti da PIN (attivabile in qualsiasi momento)',
      noContract: 'Nessun Contratto a Lungo Termine o Costi Nascosti',
      popular: 'Più Popolare',
      bestValue: 'Miglior Offerta Risparmio',
      saveUpTo: 'Risparmia fino al',
      getStartedBtn: 'Ordina e Attiva Subito',
      month: 'Mese',
      months: 'Mesi',
      year: 'Anno',
      years: 'Anni',
      trial24h: 'Prova Gratuita VIP 24 Ore',
      featuresIncluded: 'Tutte le Funzionalità Incluse:',
      instantActivationTitle: 'Consegna Automatica Immediata delle Credenziali',
    },
    channels: {
      badge: 'BOUQUET SATELLITARE COMPLETO',
      title: 'Esplora Oltre 18.500 Canali Live',
      titleHighlight: 'In 4K e Full HD Reale',
      subtitle: 'Scopri la nostra selezione di canali italiani, europei e internazionali.',
      searchPlaceholder: 'Cerca un canale (es. Sky Sport, DAZN, RAI, Mediaset)...',
      allChannels: 'Tutti i Canali',
      catchup7days: 'Replay 7 Giorni',
      epgGuide: 'Guida TV Completa (EPG)',
      fps60: 'Streaming Fluido a 60FPS',
      showingChannels: 'Canali Visualizzati',
      totalChannels: 'Canali Totali Live',
    },
    vod: {
      badge: 'CINEMA E SERIE ON DEMAND',
      title: '65.000+ Film e Serie TV Complete',
      titleHighlight: 'Aggiornati Quotidianamente in 4K',
      subtitle: 'Accesso illimitato alle ultime uscite cinematografiche, serie cult e documentari con audio italiano.',
      searchPlaceholder: 'Cerca film, serie, attori o generi...',
      allCinema: 'Tutto il Cinema e Serie',
      tmdbMovies: 'Film Blockbuster 4K',
      tmdbSeries: 'Cofanetti Serie TV Completi',
      ukBoxsets: 'Serie Italiane ed Europee',
      usHits: 'Esclusive HBO, Netflix e USA',
      sportsReplays: 'Replay Integrali degli Eventi Sportivi',
      imdbScore: 'Voto IMDb',
      audioTracks: 'Dolby 5.1 e Audio Italiano/Originale',
      watchTrailer: 'Guarda il Trailer',
      quality4k: '4K Ultra HD',
    },
    features: {
      badge: 'CDN GLOBALE 10GBPS • NODI DEDICATI ALLO STREAMING',
      titleStart: 'Infrastruttura ad Alta Velocità in',
      titleHighlight: 'Italia, UK ed Europa',
      subtitle: 'Server dedicati a Milano, Roma e Francoforte con zero throttling dell’operatore e senza buffering.',
      item1Badge: 'Sincronizzazione Automatica WP-Cron',
      item1Title: 'Calendario Serie A, Champions League e Sport USA in Tempo Reale',
      item1Desc: 'La sincronizzazione automatica aggiorna ogni giorno gli orari di Serie A, Champions League, Formula 1 e NBA senza interventi manuali.',
      item2Badge: 'Tecnologia Anti-Blocco Operatore',
      item2Title: 'Anti-Freeze v9.8 e 99.99% di Uptime',
      item2Desc: 'Bilanciamento dinamico che evita i rallentamenti su TIM, Vodafone, WindTre, Fastweb e Iliad durante i match di punta.',
      item2Tested: 'Testato su Fibra TIM 1Gb, Vodafone e Fastweb',
      item3Title: 'Vero 4K UHD 60FPS e HDR',
      item3Desc: 'Immagini nitide a 60 fotogrammi al secondo su tutti i canali Sky Sport, DAZN ed Eurosport.',
      item4Title: 'Consegna Automatica in 10 Secondi',
      item4Desc: 'Ricevi la tua playlist M3U e i codici Xtream via WhatsApp ed email subito dopo la conferma.',
      antiFreezeTitle: 'Tecnologia Anti-Freeze v9.8',
      antiFreezeDesc: 'Regolazione dinamica del bitrate per azzerare il buffering durante le partite più seguite.',
      ultraHdTitle: 'Flussi in Vero 4K UHD 60FPS',
      ultraHdDesc: 'Goditi una fluidità impeccabile a 60 fotogrammi al secondo con colori HDR.',
      devicesTitle: 'Compatibile con Tutti i Dispositivi',
      devicesDesc: 'Funziona su FireStick, Smart TV Samsung/LG, box Android, Apple TV e PC.',
      instantTitle: 'Attivazione Immediata via WhatsApp',
      instantDesc: 'Credenziali inviate in automatico in meno di 10 secondi.',
      catchupTitle: 'Replay TV a 7 Giorni',
      catchupDesc: 'Non perdere nessun momento grazie alla registrazione cloud per 7 giorni.',
      supportTitle: 'Supporto Clienti Dedicato 24/7',
      supportDesc: 'Assistenza tecnica sempre attiva su WhatsApp e Telegram.',
    },
    reviews: {
      badge: 'VALUTAZIONE TRUSTPILOT 4.9 / 5.0',
      titleStart: 'Scelto da Oltre',
      titleHighlight: '10.500+ Utenti',
      subtitle: 'Feedback autentici di abbonati verificati che guardano la Serie A e il grande cinema in 4K.',
      verifiedReviews: 'Recensioni Verificate',
      outOf5: 'su 5.0',
      basedOn: 'Basato su',
      basedOnHighlight: '1.480+ recensioni verificate in Italia e in Europa',
      allReviews: 'Tutte le Recensioni',
      sportsCategory: 'Serie A e Sport 4K',
      broadbandCategory: 'Fibra e Connessione',
      devicesCategory: 'FireStick e Smart TV',
      vodCategory: 'Cinema e VOD 4K',
      verified: 'Verificato',
      excellent: 'Eccellente',
      activeSubscribers: 'Abbonati Attivi',
      serverUptime: 'Disponibilità Server',
      instantDelivery: 'Consegna Immediata',
      verifiedScore: 'Punteggio Trustpilot',
    },
    faq: {
      badge: 'GUIDA STREAMING E FAQ',
      titleStart: 'Hai Domande? Ecco le Nostre',
      titleHighlight: 'Risposte',
      subtitle: 'Tutto quello che c\'è da sapere su Serie A in 4K, compatibilità con la fibra e attivazione rapida.',
      stillHaveQuestions: 'Hai ancora domande prima di abbonarti?',
      stillHaveQuestionsDesc: 'Il nostro supporto tecnico in italiano è attivo su WhatsApp 24/7 per assisterti.',
      chatWhatsapp: 'Contattaci su WhatsApp',
      needHelp: 'Hai bisogno di supporto dedicato?',
      contactSupport: 'Scrivici su WhatsApp per ricevere supporto immediato nella configurazione.',
      items: [
        {
          q: 'È necessaria una VPN per vedere le partite in Italia?',
          a: 'No! La nostra tecnologia Anti-Freeze v9.8 con routing multi-CDN impedisce ai provider italiani (TIM, Vodafone, WindTre, Fastweb, Iliad) di limitare la tua connessione durante le dirette.'
        },
        {
          q: 'Quale velocità di connessione è raccomandata per il 4K 60FPS?',
          a: 'Consigliamo almeno 25-30 Mbps per lo streaming in 4K 60FPS. Per l\'HD/FHD a 1080p, 10-15 Mbps sono sufficienti.'
        },
        {
          q: 'In quanto tempo ricevo i dati di accesso?',
          a: 'La consegna è automatica e immediata in meno di 10 secondi su schermo e WhatsApp.'
        },
        {
          q: 'Posso guardare su più dispositivi contemporaneamente?',
          a: 'Sì! Nel nostro calcolatore di prezzi puoi scegliere da 1 a 5 schermi contemporanei.'
        }
      ]
    },
    footer: {
      brandDescription: 'Servizio di streaming ad alta affidabilità con server 10Gbps, 18.500+ canali live e 65.000+ film e serie in 4K.',
      tvPackages: 'Pacchetti TV',
      deviceSetup: 'Guide e Configurazione',
      speedTest: 'Test di Velocità e Ping',
      supportHelp: 'Supporto e Assistenza',
      discordVip: 'Community VIP Discord',
      vpnFaqs: 'FAQ Connessione e Operatori',
      trialPass: 'Pass di Prova 24h (Gratis)',
      allRightsReserved: 'Tutti i diritti riservati. Ottimizzato per connessioni Fibra ad alta velocità.',
      acceptedPayments: 'Pagamenti accettati: Carte di Credito • Apple Pay • Google Pay • Revolut • Criptovalute',
      tagline: 'Fornitore di IPTV Streaming 4K Sport e Cinema',
      sportsHeader: 'Canali Sportivi',
      devicesHeader: 'Dispositivi Supportati',
      legalHeader: 'Supporto e Note Legali',
      disclaimer: 'Disclaimer: Tutti i marchi e i loghi appartengono ai rispettivi proprietari.',
      rights: 'Tutti i diritti riservati.',
      serverStatus: 'Server 10Gbps Operativi (99.99% Uptime)',
      setupGuide: 'Guida all\'Installazione',
      themeExporter: 'Esporta Tema WordPress',
      selectLanguage: 'Lingua / Regione',
      cookiePreferences: 'Preferenze Cookie e Privacy',
    },
    deviceModal: {
      title: 'Guide di Configurazione Semplice',
      subtitle: 'Segui le nostre guide passo dopo passo e inizia a guardare in meno di 2 minuti.',
      selectDevice: 'Seleziona il Tuo Dispositivo',
      recommendedApp: 'Applicazione Consigliata',
      difficulty: 'Difficoltà',
      estTime: 'Tempo Stimato',
      stepsTitle: 'Istruzioni di Installazione',
      downloaderCode: 'Codice Downloader',
      proTip: 'CONSIGLIO PRO',
      needHelp: 'Serve aiuto? Il nostro supporto WhatsApp è attivo 24/7.',
      close: 'Chiudi Guida',
    },
    speedModal: {
      title: 'Test di Velocità e Latenza Fibra',
      subtitle: 'Verifica la tua connessione direttamente verso i nostri nodi di streaming a 10Gbps.',
      startTest: 'Avvia Test di Velocità',
      testing: 'Test in corso...',
      downloadSpeed: 'Velocità di Download',
      latency: 'Latenza (Ping)',
      jitter: 'Jitter',
      verdictTitle: 'Esito Test Streaming',
      verdictUltra: 'ECCELLENTE: Ideale per lo streaming 4K UHD 60FPS HDR su più schermi contemporaneamente.',
      verdictGood: 'BUONO: Perfetto per uno streaming Full HD 1080p a 60FPS fluido e senza interruzioni.',
      verdictFair: 'SUFFICIENTE: Adatto per risoluzioni standard. Si raccomanda cavo Ethernet per il 4K.',
      close: 'Chiudi Test',
    },
    checkoutModal: {
      title: 'Attiva il Tuo Pass Streaming VIP',
      subtitle: 'Attivazione automatica in meno di 10 secondi.',
      orderSummary: 'Riepilogo Ordine',
      planLabel: 'Piano Scelto',
      connectionsLabel: 'Schermi Simultanei',
      adultChannelsLabel: 'Sezione Adulti 18+',
      included: 'Incluso (Protetto da PIN)',
      totalDue: 'Totale Dovuto',
      paymentMethod: 'Metodo di Pagamento',
      cryptoPayment: 'Pagamento in Criptovalute (BTC, USDT, ETH)',
      cryptoDesc: 'Attivazione immediata senza attese bancarie.',
      whatsappOrder: 'Assistenza e Ordine su WhatsApp',
      whatsappDesc: 'Assistenza diretta per pagamenti con Carta, Bonifico o PayPal.',
      instantActivationPromise: '✓ Attivazione Istantanea 100% • Garanzia Anti-Freeze v9.8 • Rimborso in 7 Giorni',
      back: 'Torna ai Piani',
      proceedToPayment: 'Completa l\'Ordine e Ricevi le Credenziali',
    },
    salesNotice: {
      verifiedSubscriber: 'Abbonato verificato a',
      justActivated: 'ha appena attivato un pass',
      ago: '',
    },
    cookieConsent: {
      badge: 'Privacy GDPR / CCPA e Preferenze di Localizzazione',
      title: 'Preferenze Cookie e Localizzazione',
      description: 'Utilizziamo cookie essenziali e archiviazione locale per memorizzare la lingua scelta, la valuta regionale, il fuso orario e la configurazione streaming.',
      gdprBadge: 'Conforme GDPR (UE / Italia)',
      ccpaBadge: 'Conforme CCPA',
      globalBadge: 'Privacy Protetta',
      acceptAll: 'Accetta Tutte',
      rejectNonEssential: 'Solo Essenziali',
      customize: 'Personalizza',
      savePreferences: 'Salva Preferenze',
      settingsTitle: 'Impostazioni Privacy e Cookie',
      settingsSubtitle: 'Gestisci le preferenze per lingua, valuta e prestazioni di streaming in conformità con gli standard GDPR e CCPA.',
      strictlyNecessaryTitle: 'Strettamente Necessari (Sempre Attivi)',
      strictlyNecessaryDesc: 'Necessari per la sicurezza, l\'autenticazione dei token di streaming video, il bilanciamento del carico e il sistema Anti-Freeze.',
      strictlyNecessaryBadge: 'Sempre Attivo',
      localizationTitle: 'Preferenze di Localizzazione e Lingua',
      localizationDesc: 'Memorizza la lingua preferita, il rilevamento automatico del dispositivo, la valuta (EUR/GBP/USD/CAD) e il fuso orario.',
      analyticsTitle: 'Prestazioni e Cache Test di Velocità',
      analyticsDesc: 'Conserva localmente i parametri di latenza e la cronologia di ricerca canali per accelerare il caricamento delle pagine.',
      doNotSellTitle: 'Non Vendere né Condividere i Miei Dati',
      doNotSellDesc: 'In conformità con GDPR e CCPA, non vendiamo né cediamo a terzi dati personali o abitudini di visione.',
      privacyNote: 'Le tue scelte hanno effetto immediato e possono essere modificate in qualsiasi momento dal piè di pagina.',
      close: 'Chiudi',
    },
  },
};
