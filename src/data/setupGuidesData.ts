import { DetailedSetupGuide, DeviceCategoryType, DownloaderCodeItem, RemoteShortcut } from '../types';
import iconFirestick from '../assets/images/icon_firestick_1787476358147.jpg';
import iconAndroidTv from '../assets/images/icon_android_tv_1787476370749.jpg';
import iconSmartTv from '../assets/images/icon_smart_tv_1787476382793.jpg';
import iconAppleTv from '../assets/images/icon_apple_tv_1787476424752.jpg';
import iconFormulerMag from '../assets/images/icon_formuler_mag_1787476437549.jpg';
import iconPcWeb from '../assets/images/icon_pc_web_1787476451743.jpg';
import iconTivimate from '../assets/images/icon_tivimate_1787476396203.jpg';
import iconSmarters from '../assets/images/icon_smarters_1787476408474.jpg';

export {
  iconFirestick,
  iconAndroidTv,
  iconSmartTv,
  iconAppleTv,
  iconFormulerMag,
  iconPcWeb,
  iconTivimate,
  iconSmarters
};

export interface DeviceCategoryMeta {
  id: DeviceCategoryType;
  name: string;
  shortName: string;
  tagline: string;
  iconName: string;
  imageUrl: string;
  badge: string;
  devices: string[];
  recommendedPlayerSlug: string;
}

export interface IspOptimizationGuide {
  ispName: string;
  routerModel: string;
  blockingFeature: string;
  howToDisable: string;
  recommendedDns: string;
  impactLevel: 'High' | 'Medium' | 'Critical';
}

export const UK_ISP_OPTIMIZATIONS: IspOptimizationGuide[] = [
  {
    ispName: 'BT Broadband & EE',
    routerModel: 'BT Smart Hub 2 / EE Smart Hub Plus',
    blockingFeature: 'BT Web Protect & Parental Controls',
    howToDisable: 'Log in to My BT account > Settings > Broadband > Web Protect > Turn OFF. Also change DNS to 1.1.1.1.',
    recommendedDns: '1.1.1.1 (Cloudflare) / 8.8.8.8 (Google)',
    impactLevel: 'High'
  },
  {
    ispName: 'Sky Broadband',
    routerModel: 'Sky Hub / Sky Max Hub',
    blockingFeature: 'Sky Broadband Shield (Age Rating 18)',
    howToDisable: 'Log in to Sky.com > Broadband & Talk > Broadband Shield > Select "18" or "Disabled" entirely.',
    recommendedDns: '1.1.1.1 / 1.0.0.1',
    impactLevel: 'Critical'
  },
  {
    ispName: 'Virgin Media',
    routerModel: 'Hub 3, Hub 4 & Hub 5 (Gig1)',
    blockingFeature: 'Web Safe (Virus Safe & Child Safe)',
    howToDisable: 'Log in to My Virgin Media > Account Settings > Online Security > Web Safe > Disable both Virus Safe & Child Safe.',
    recommendedDns: '8.8.8.8 / 1.1.1.1',
    impactLevel: 'High'
  },
  {
    ispName: 'TalkTalk',
    routerModel: 'Wi-Fi Hub / Amazon eero 6',
    blockingFeature: 'HomeSafe (Scam Protection & Kids Safe)',
    howToDisable: 'Log in to TalkTalk My Account > Security Settings > HomeSafe > Turn OFF Scam Protection & Kids Safe.',
    recommendedDns: '1.1.1.1 / 8.8.4.4',
    impactLevel: 'High'
  },
  {
    ispName: 'Vodafone',
    routerModel: 'Vodafone Wi-Fi Hub / Ultra Hub',
    blockingFeature: 'Secure Net Filter',
    howToDisable: 'Log in to My Vodafone App > Services > Secure Net > Toggle to Deactivate.',
    recommendedDns: '1.1.1.1 / 8.8.8.8',
    impactLevel: 'Medium'
  }
];

export const DOWNLOADER_SHORTCODES_VAULT: DownloaderCodeItem[] = [
  {
    code: '272483',
    name: 'TiviMate IPTV Player Pro',
    device: 'FireStick / Android TV',
    version: 'v5.1.0 Premium',
    badge: '#1 Rated UI',
    directUrl: 'https://tivimate.com/apk',
    category: 'EPG Kings',
    iconUrl: iconTivimate
  },
  {
    code: '80198',
    name: 'IPTV Smarters Pro',
    device: 'Fire TV / Android',
    version: 'v4.0.2 Official',
    badge: 'Worldwide Favorite',
    directUrl: 'https://www.iptvsmarters.com/smarters.apk',
    category: 'Classic',
    iconUrl: iconSmarters
  },
  {
    code: '82375',
    name: 'iMPlayer TV IPTV',
    device: 'FireStick / Google TV / Android',
    version: 'v3.5.2 Pro',
    badge: 'Multi-Screen Beast',
    directUrl: 'https://implayer.tv/d',
    category: 'EPG Kings',
    iconUrl: iconTivimate
  },
  {
    code: '537992',
    name: 'XCIPTV Player',
    device: 'Fire TV / Android Box',
    version: 'v702 OTT Edition',
    badge: 'VOD & Series',
    directUrl: 'https://xciptv.com',
    category: 'Classic',
    iconUrl: iconAndroidTv
  },
  {
    code: '28907',
    name: 'OTT Navigator IPTV',
    device: 'Android TV & Fire TV',
    version: 'v1.7.1.4 Pro',
    badge: 'Advanced Codecs',
    directUrl: 'https://ottnavigator.com',
    category: 'Tools',
    iconUrl: iconAndroidTv
  },
  {
    code: '834339',
    name: 'IBO Player Pro 4K',
    device: 'Fire TV & Android',
    version: 'v4.2 Pro 4K',
    badge: 'Fast Zapping',
    directUrl: 'https://iboplayer.pro',
    category: 'Classic',
    iconUrl: iconSmartTv
  },
  {
    code: '852157',
    name: 'Smart One IPTV',
    device: 'Fire TV & Android TV',
    version: 'v2.8.4',
    badge: 'Portal Engine',
    directUrl: 'https://smartone-iptv.com',
    category: 'Tools',
    iconUrl: iconSmartTv
  }
];

export const DEVICE_CATEGORIES: DeviceCategoryMeta[] = [
  {
    id: 'firestick',
    name: 'Amazon FireStick & Fire TV',
    shortName: 'FireStick',
    tagline: 'FireStick 4K Max, Fire TV Cube & Smart TVs',
    iconName: 'Flame',
    imageUrl: iconFirestick,
    badge: 'Most Popular',
    devices: ['FireStick 4K Max (Gen 2)', 'FireStick 4K', 'Fire TV Cube', 'Fire TV 4K Select', 'Fire TV Smart TVs'],
    recommendedPlayerSlug: 'firestick-tivimate',
  },
  {
    id: 'android-tv',
    name: 'Android TV, Google TV & Shield',
    shortName: 'Android TV',
    tagline: 'Nvidia Shield, Chromecast, Xiaomi & Sony',
    iconName: 'Smartphone',
    imageUrl: iconAndroidTv,
    badge: '4K 60FPS',
    devices: ['Nvidia Shield TV Pro', 'Chromecast with Google TV (4K)', 'Sony Bravia Google TV', 'Xiaomi Mi Box S 4K', 'Mecool / Strong Boxes'],
    recommendedPlayerSlug: 'android-tv-tivimate',
  },
  {
    id: 'apple',
    name: 'Apple TV 4K, iPhone & iPad',
    shortName: 'Apple iOS & TV',
    tagline: 'Apple TV 4K (2024-2026), iPhone & iPad',
    iconName: 'Apple',
    imageUrl: iconAppleTv,
    badge: 'Dolby Vision',
    devices: ['Apple TV 4K (Wi-Fi + Ethernet)', 'iPhone 16 / 15 / 14 Pro', 'iPad Pro M4 / Air', 'MacBook & iMac (M1/M2/M3)'],
    recommendedPlayerSlug: 'apple-tv-iptvx',
  },
  {
    id: 'smart-tv',
    name: 'Smart TV (Samsung & LG webOS)',
    shortName: 'Smart TV',
    tagline: 'Samsung Tizen, LG webOS, Hisense & Philips',
    iconName: 'Tv',
    imageUrl: iconSmartTv,
    badge: 'No Box Needed',
    devices: ['Samsung QLED & Neo QLED (Tizen)', 'LG OLED & QNED (webOS)', 'Hisense VIDAA OS', 'Philips Titan / Ambilight', 'Panasonic Smart TV'],
    recommendedPlayerSlug: 'smart-tv-ibo-player',
  },
  {
    id: 'formuler-mag',
    name: 'Formuler (MOL3) & MAG Boxes',
    shortName: 'Formuler & MAG',
    tagline: 'Formuler Z11 Pro Max, MAG 524 & Enigma2',
    iconName: 'Cpu',
    imageUrl: iconFormulerMag,
    badge: 'Hardware Portal',
    devices: ['Formuler Z11 Pro Max (MOL3)', 'Formuler Z10 Pro / Z8', 'MAG 524 / 424 / 322 (Infomir)', 'Zgemma / Vu+ Enigma2'],
    recommendedPlayerSlug: 'formuler-mytvonline3',
  },
  {
    id: 'pc-web',
    name: 'Windows PC, Mac & Web Player',
    shortName: 'PC & Web Browser',
    tagline: 'Instant Browser Streaming, Windows & MacOS',
    iconName: 'Laptop',
    imageUrl: iconPcWeb,
    badge: 'Instant Play',
    devices: ['Windows 11 / 10 PC & Laptop', 'Apple MacOS (M-series & Intel)', 'Google Chrome / Edge / Safari', 'Linux Ubuntu / Fedora'],
    recommendedPlayerSlug: 'webtv-browser-player',
  },
];

export const ALL_SETUP_GUIDES: DetailedSetupGuide[] = [
  // 1. FireStick - TiviMate 4K
  {
    id: 'guide-firestick-tivimate',
    slug: 'firestick-tivimate',
    title: 'How to Setup TiviMate IPTV Player on Amazon FireStick (4K & EPG)',
    shortTitle: 'TiviMate 4K',
    deviceCategory: 'firestick',
    deviceCategoryLabel: 'Amazon FireStick & Fire TV',
    playerName: 'TiviMate IPTV Player',
    playerType: 'Cable-Style EPG Player',
    icon: 'Tv',
    appLogo: iconTivimate,
    difficulty: 'Easy',
    timeEstimate: '3 Mins',
    rating: 5.0,
    verifiedDate: 'August 2026',
    badge: 'Pro User Favorite',
    popular: true,
    downloaderCode: '272483',
    appUrl: 'https://tivimate.com/apk',
    summary: 'TiviMate is widely regarded as the undisputed king of IPTV players for FireStick and Android. Features a premium cable TV guide layout, multi-screen quad-view (watch 4 live matches simultaneously), instant channel switching, and scheduled DVR recording.',
    targetKeywords: [
      'tivimate firestick setup',
      'tivimate premium apk',
      'downloader code 272483 tivimate',
      'how to unlock tivimate premium features with xtream codes',
      'how to install tivimate fire tv',
      'tivimate xtream codes api setup',
      'tivimate premium 4k iptv'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Downloader on FireStick',
        description: 'Launch the Downloader app from your FireStick home screen. Ensure Developer Options > Install Unknown Apps is enabled for Downloader.',
      },
      {
        stepNumber: 2,
        title: 'Enter TiviMate Downloader Code: 272483',
        description: 'Type official shortcode 272483 (or mirror code 278077 / direct URL: https://tivimate.com/apk) into Downloader and click Go.',
        codeOrValue: '272483',
        actionUrl: 'https://tivimate.com/apk',
        tip: 'The official TiviMate installation package will download directly.',
      },
      {
        stepNumber: 3,
        title: 'Install and Launch TiviMate',
        description: 'Click "Install" and then click "Open" once the setup finishes.',
      },
      {
        stepNumber: 4,
        title: 'Add Playlist via Xtream Codes API',
        description: 'Click "Add Playlist" > Select "Xtream Codes". Enter your Server URL (e.g. http://uk-premium.streamdns.me:8080), Username, and Password.',
        tip: 'Enable "Include VOD" toggle switch before pressing Next.',
      },
      {
        stepNumber: 5,
        title: 'Name Your Playlist & Finish',
        description: 'Set playlist name to "StreamUK VIP 4K". Click "Done". TiviMate will index all channels and display the gorgeous 7-day TV guide.',
      },
    ],
    recommendedSettings: [
      {
        setting: 'Audio Passthrough',
        value: 'Pass-through (Auto)',
        explanation: 'Enables genuine 5.1 Dolby Digital surround sound to your soundbar or home cinema receiver.',
      },
      {
        setting: 'Channel Change Animation',
        value: 'None / Instant',
        explanation: 'Reduces channel zapping delay to under 0.3 seconds.',
      },
      {
        setting: 'EPG Update on App Start',
        value: 'Enabled',
        explanation: 'Ensures live match schedules are always accurate whenever you turn on your TV.',
      },
    ],
    faqs: [
      {
        q: 'How to unlock TiviMate Premium features with Xtream Codes?',
        a: 'To unlock TiviMate Premium: 1) First add your StreamUK line via Xtream Codes API (enter Server URL: http://uk-premium.streamdns.me:8080 along with your issued username & password). 2) Open TiviMate Settings > Unlock Premium. 3) Log in using your TiviMate account credentials (activated via the TiviMate Companion app on Google Play or via tivimate.com). 4) Once unlocked, all premium features—including 7-day TV catch-up, multi-view (watch up to 9 live sports streams at once), DVR recording to USB/NAS, custom group sorting, and automatic EPG refresh—will activate instantly with your StreamUK stream line!',
      },
      {
        q: 'How do I use Multi-View on TiviMate to watch multiple matches?',
        a: 'While watching any live channel (e.g. Sky Sports Main Event), press and hold the Select / OK button on your FireStick remote, then choose "Multi-view" > "Add Screen". You can add up to 4 concurrent match feeds!',
      },
      {
        q: 'Can I record live TV with TiviMate on FireStick?',
        a: 'Yes, TiviMate supports custom USB storage and SMB network drive recording for live TV and scheduled sporting events.',
      },
    ],
    pros: [
      'Ultra-fast Sky/Virgin-style EPG grid layout',
      'Multi-View quad screen (watch 4 live games at once)',
      'Custom channel reordering, favorites management, and category hiding',
      'Catch-up TV integration with auto-scroll timeline',
    ],
  },

  // 3. FireStick - IPTV Smarters Pro
  {
    id: 'guide-firestick-smarters-pro',
    slug: 'firestick-smarters-pro',
    title: 'How to Install IPTV Smarters Pro 2026 on Amazon FireStick',
    shortTitle: 'IPTV Smarters Pro',
    deviceCategory: 'firestick',
    deviceCategoryLabel: 'Amazon FireStick & Fire TV',
    playerName: 'IPTV Smarters Pro 2026',
    playerType: 'Universal Cross-Platform Player',
    icon: 'Flame',
    appLogo: iconSmarters,
    difficulty: 'Easy',
    timeEstimate: '2 Mins',
    rating: 4.8,
    verifiedDate: 'August 2026',
    badge: 'Popular Classic',
    downloaderCode: '80198',
    appUrl: 'https://www.iptvsmarters.com/smarters.apk',
    summary: 'The world-famous IPTV Smarters Pro delivers a modern, touch & remote-friendly interface for Live TV, Movies, Series, Catch Up, and Radio with built-in parental controls and external player support.',
    targetKeywords: [
      'iptv smarters pro firestick',
      'downloader code iptv smarters fire tv',
      'how to login iptv smarters xtream codes',
      'smarters pro apk download 2026'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Downloader on FireStick',
        description: 'Launch Downloader. In the URL field, enter the quick code 80198.',
        codeOrValue: '80198',
      },
      {
        stepNumber: 2,
        title: 'Install IPTV Smarters Pro',
        description: 'Wait for the download to complete and click Install. Then click Open.',
      },
      {
        stepNumber: 3,
        title: 'Select "Login with Xtream Codes API"',
        description: 'Choose "Login with Xtream Codes API" (or "Add New User").',
      },
      {
        stepNumber: 4,
        title: 'Enter Login Details',
        description: 'Enter Any Name (e.g. StreamUK), your Username, Password, and Server URL from your activation message.',
      },
      {
        stepNumber: 5,
        title: 'Click "Add User" & Start Streaming',
        description: 'Click "Add User". The app will download Live Channels, VOD Movies, and Series categories in under 10 seconds.',
      },
    ],
    pros: [
      'Clean 4-tile dashboard (Live TV, Movies, Series, Catch Up)',
      'Multi-user profile support for family members',
      'Parental control lock with 4-digit PIN for Adult channels',
      'Subtitles and multi-audio language track switching',
    ],
  },

  // 4. FireStick - iMPlayer
  {
    id: 'guide-firestick-implayer',
    slug: 'firestick-implayer',
    title: 'How to Install iMPlayer on Amazon FireStick (DVR & Cloud Sync)',
    shortTitle: 'iMPlayer 4K',
    deviceCategory: 'firestick',
    deviceCategoryLabel: 'Amazon FireStick & Fire TV',
    playerName: 'iMPlayer IPTV',
    playerType: 'Premium Cloud DVR Player',
    icon: 'Radio',
    appLogo: iconTivimate,
    difficulty: 'Easy',
    timeEstimate: '3 Mins',
    rating: 4.8,
    verifiedDate: 'August 2026',
    downloaderCode: '82375',
    appUrl: 'https://implayer.tv/d',
    summary: 'iMPlayer offers a stunning Android TV / Fire TV interface inspired by modern cable set-top boxes, featuring cloud playlist management, multi-screen streaming, and advanced channel grouping.',
    targetKeywords: [
      'implayer firestick setup',
      'downloader code 82375 implayer',
      'how to setup implayer xtream codes'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Download via Official Code 82375',
        description: 'Open Downloader on FireStick, type official code 82375 (or URL implayer.tv/d), and click Go to download and install iMPlayer.',
        codeOrValue: '82375',
      },
      {
        stepNumber: 2,
        title: 'Select Xtream Codes API',
        description: 'Open iMPlayer, select "Add Playlist", and choose "Xtream Codes".',
      },
      {
        stepNumber: 3,
        title: 'Enter StreamUK Credentials',
        description: 'Type Server URL, Username, and Password, then click Connect.',
      },
    ],
    pros: [
      'Modern dark-glass user interface',
      'Advanced cloud sync management dashboard',
      'Picture-in-picture (PiP) background playback',
    ],
  },

  // 5. Android TV & Nvidia Shield - TiviMate
  {
    id: 'guide-android-tv-tivimate',
    slug: 'android-tv-tivimate',
    title: 'How to Setup TiviMate on Android TV, Google TV & Nvidia Shield',
    shortTitle: 'TiviMate Android TV',
    deviceCategory: 'android-tv',
    deviceCategoryLabel: 'Android TV & Google TV',
    playerName: 'TiviMate IPTV Player',
    playerType: 'Google Play & Sideload',
    icon: 'Smartphone',
    appLogo: iconTivimate,
    difficulty: 'Easy',
    timeEstimate: '2 Mins',
    rating: 5.0,
    verifiedDate: 'August 2026',
    badge: 'Best on Shield & Google TV',
    popular: true,
    appUrl: 'https://play.google.com/store/apps/details?id=ar.tvplayer.tv',
    summary: 'Directly available on the official Google Play Store for Nvidia Shield TV Pro, Chromecast with Google TV, Xiaomi Mi Box, and Sony Bravia TVs. Install in 1 click and connect your StreamUK VIP playlist.',
    targetKeywords: [
      'tivimate android tv setup',
      'nvidia shield iptv setup',
      'chromecast google tv tivimate',
      'best iptv player nvidia shield 4k'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Google Play Store on your Android TV',
        description: 'Navigate to the Google Play Store on your Nvidia Shield, Chromecast with Google TV, or Sony TV.',
      },
      {
        stepNumber: 2,
        title: 'Search & Install "TiviMate IPTV Player"',
        description: 'Search for "TiviMate" and click Install directly from the official Google Play Store.',
        actionUrl: 'https://play.google.com/store/apps/details?id=ar.tvplayer.tv',
      },
      {
        stepNumber: 3,
        title: 'Launch App & Add Playlist',
        description: 'Open TiviMate, select "Add Playlist", and click "Xtream Codes".',
      },
      {
        stepNumber: 4,
        title: 'Enter Server URL, Username & Password',
        description: 'Input your Server URL, Username, and Password. Ensure "Include VOD" is checked.',
      },
      {
        stepNumber: 5,
        title: 'Click Done to Enjoy 4K TV & EPG',
        description: 'Enjoy instant channel zapping, 4K HDR playback, and full 7-day TV guide.',
      },
    ],
    recommendedSettings: [
      {
        setting: 'Video Decoder',
        value: 'Hardware (HW+)',
        explanation: 'Enables full utilization of Nvidia Tegra X1+ AI upscaling on Shield TV Pro.',
      },
      {
        setting: 'Auto Frame Rate (AFR)',
        value: 'Match Content Frame Rate (50Hz / 60Hz / 24Hz)',
        explanation: 'Eliminates judder and matches exact UK 50Hz and US 60Hz broadcast standards.',
      },
    ],
    pros: [
      'Official Google Play Store installation with auto-updates',
      'Full integration with Google Assistant voice search',
      'Hardware-accelerated AI 4K upscaling support',
    ],
  },

  // 5. Apple TV 4K - IPTVX
  {
    id: 'guide-apple-tv-iptvx',
    slug: 'apple-tv-iptvx',
    title: 'How to Setup IPTVX on Apple TV 4K (Native Apple UX & Dolby Vision)',
    shortTitle: 'IPTVX Apple TV',
    deviceCategory: 'apple',
    deviceCategoryLabel: 'Apple TV 4K & iOS',
    playerName: 'IPTVX 4K HDR',
    playerType: 'Official Apple App Store',
    icon: 'Tv',
    appLogo: iconAppleTv,
    difficulty: 'Quick',
    timeEstimate: '2 Mins',
    rating: 5.0,
    verifiedDate: 'August 2026',
    badge: 'Apple Design Award Winner',
    popular: true,
    appUrl: 'https://apps.apple.com/app/iptvx/id1451470092',
    summary: 'IPTVX brings the gorgeous, buttery-smooth Apple TV user experience to IPTV. Features native iCloud playlist synchronization across Apple TV 4K, iPhone, iPad, and Mac with full Dolby Vision, HDR10+, and Apple TV Remote gesture navigation.',
    targetKeywords: [
      'apple tv 4k iptv setup',
      'iptvx setup apple tv',
      'best iptv player apple tv 4k',
      'how to watch iptv on apple tv 2026'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open the Apple TV App Store',
        description: 'Turn on your Apple TV 4K and open the App Store icon.',
      },
      {
        stepNumber: 2,
        title: 'Search & Download "IPTVX"',
        description: 'Search for "IPTVX" in the App Store and click "Get" to download the app.',
        actionUrl: 'https://apps.apple.com/app/iptvx/id1451470092',
      },
      {
        stepNumber: 3,
        title: 'Add Xtream API Service',
        description: 'Launch IPTVX, click "Add Playlist" (+) and select "Xtream Codes API".',
      },
      {
        stepNumber: 4,
        title: 'Enter Connection Details',
        description: 'Input your Server URL (e.g. http://uk-premium.streamdns.me:8080), Username, and Password.',
      },
      {
        stepNumber: 5,
        title: 'Save & Enjoy Cinema-Grade TV',
        description: 'Click Save. IPTVX will download all channel logos, high-resolution movie posters, and full EPG guides with iCloud synchronization.',
      },
    ],
    recommendedSettings: [
      {
        setting: 'Video Engine',
        value: 'Native AVPlayer / Metal',
        explanation: 'Provides zero-latency hardware decoding for 4K 60FPS sports and HDR10+ color depth.',
      },
      {
        setting: 'iCloud Sync',
        value: 'Enabled',
        explanation: 'Automatically synchronizes your favorites, watch history, and playlists across all your Apple devices.',
      },
    ],
    pros: [
      'Stunning Apple TV "Top Shelf" home screen integration',
      'Native tvOS swipe gesture navigation with Apple Siri Remote',
      'Instant iCloud sync with iPhone, iPad, and Mac',
      'Full Dolby Vision and Dolby Atmos audio passthrough',
    ],
  },

  // 8. Apple iOS - Smarters Player Lite
  {
    id: 'guide-apple-ios-smarters-lite',
    slug: 'apple-ios-smarters-lite',
    title: 'How to Setup Smarters Player Lite on iPhone, iPad & Mac',
    shortTitle: 'Smarters Lite iOS',
    deviceCategory: 'apple',
    deviceCategoryLabel: 'Apple TV 4K & iOS',
    playerName: 'Smarters Player Lite',
    playerType: 'Official Apple App Store',
    icon: 'Smartphone',
    appLogo: iconSmarters,
    difficulty: 'Quick',
    timeEstimate: '2 Mins',
    rating: 4.8,
    verifiedDate: 'August 2026',
    badge: '100% Free App Store',
    popular: true,
    appUrl: 'https://apps.apple.com/app/smarters-player-lite/id1628995509',
    summary: 'The most popular free player on the Apple iOS App Store. Optimized for iPhone 15/16 Pro, iPad Pro, and Apple Silicon Macs with Picture-in-Picture and background playback.',
    targetKeywords: [
      'smarters player lite iphone setup',
      'how to watch iptv on ipad',
      'ios iptv setup app store'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Apple App Store on iPhone / iPad',
        description: 'Open the App Store and search for "Smarters Player Lite".',
        actionUrl: 'https://apps.apple.com/app/smarters-player-lite/id1628995509',
      },
      {
        stepNumber: 2,
        title: 'Install & Open the App',
        description: 'Click Get / Install, then launch Smarters Player Lite.',
      },
      {
        stepNumber: 3,
        title: 'Choose "Login with Xtream Codes API"',
        description: 'Accept the Terms and tap "Login with Xtream Codes API".',
      },
      {
        stepNumber: 4,
        title: 'Fill in Your Login Details',
        description: 'Enter Any Name (StreamUK), your Username, Password, and Server URL.',
      },
      {
        stepNumber: 5,
        title: 'Tap "Add User"',
        description: 'Your Live TV channels, movies, and TV series will load in seconds.',
      },
    ],
    pros: [
      'Free download from official Apple App Store (no sideloading required)',
      'Picture-in-Picture (PiP) allows streaming while texting or browsing',
      'AirPlay 2 support to beam 4K video directly to your living room TV',
    ],
  },

  // 9. Apple TV 4K - iMPlayer (tvOS)
  {
    id: 'guide-apple-tv-implayer',
    slug: 'apple-tv-implayer',
    title: 'How to Setup iMPlayer on Apple TV 4K (tvOS) - Cloud Sync & Multi-Screen',
    shortTitle: 'iMPlayer Apple TV',
    deviceCategory: 'apple',
    deviceCategoryLabel: 'Apple TV 4K & iOS',
    playerName: 'iMPlayer IPTV (tvOS)',
    playerType: 'Official Apple App Store & TestFlight',
    icon: 'Radio',
    appLogo: iconAppleTv,
    difficulty: 'Easy',
    timeEstimate: '2 Mins',
    rating: 4.9,
    verifiedDate: 'August 2026',
    badge: 'Cloud Sync & Multi-Screen',
    popular: true,
    appUrl: 'https://apps.apple.com/app/implayer-tv/id1661668853',
    summary: 'iMPlayer for Apple TV (tvOS) delivers the ultimate modern cable set-top box interface to your living room. Featuring multi-screen sports view (watch up to 4 live Premier League matches simultaneously), cloud playlist sync via dashboard.implayer.tv, full Siri remote navigation, and hardware-accelerated 4K 60FPS streams.',
    targetKeywords: [
      'implayer apple tv setup',
      'implayer tvos download',
      'how to install implayer on apple tv 4k',
      'apple tv iptv multi-screen player',
      'implayer dashboard sync apple tv'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Apple TV App Store',
        description: 'Turn on your Apple TV 4K, launch the App Store (or TestFlight on tvOS), and search for "iMPlayer IPTV".',
        actionUrl: 'https://apps.apple.com/app/implayer-tv/id1661668853',
        tip: 'Ensure your Apple TV is updated to tvOS 16, 17, or 18 for native AVPlayer hardware acceleration.'
      },
      {
        stepNumber: 2,
        title: 'Install & Launch iMPlayer',
        description: 'Click "Get" or "Install", then open iMPlayer on your Apple TV.',
      },
      {
        stepNumber: 3,
        title: 'Choose "Add Playlist" > "Xtream Codes"',
        description: 'Select "Add Playlist" from the home menu and choose "Xtream Codes API". (You can also manage playlists online via https://dashboard.implayer.tv).',
      },
      {
        stepNumber: 4,
        title: 'Enter StreamUK VIP Credentials',
        description: 'Enter Playlist Name (StreamUK), Server URL (http://uk-premium.streamdns.me:8080), Username, and Password received in your instant activation email.',
      },
      {
        stepNumber: 5,
        title: 'Connect & Enjoy 4K Multi-Screen Sports',
        description: 'Click Connect. Your 24,000+ live channels, 7-day TV guide, and 4K VOD cinema will load instantly. Long-press on any live sports channel to open Multi-Screen quad view!',
      },
    ],
    recommendedSettings: [
      {
        setting: 'Hardware Video Acceleration',
        value: 'Native AVPlayer / Metal',
        explanation: 'Provides zero-latency 60FPS sports playback on Sky Sports 4K UHD, TNT Sports Ultimate, and Premier League with no frame drops.',
      },
      {
        setting: 'Multi-Screen Layout',
        value: '2x2 Quad or 1x3 Side-by-Side',
        explanation: 'Allows simultaneous 4-channel viewing with instant audio focus switching via Siri Remote touch clicks.',
      },
      {
        setting: 'Cloud Sync Dashboard',
        value: 'Connected (dashboard.implayer.tv)',
        explanation: 'Synchronizes your custom channel groups, locked PINs, and favorite lists between Apple TV, iPhone, and Mac.',
      },
    ],
    faqs: [
      {
        q: 'Can I watch 4 live football games at once on Apple TV 4K with iMPlayer?',
        a: 'Yes! iMPlayer’s native multi-screen player allows streaming up to 4 simultaneous live 60FPS feeds on Apple TV 4K. Simply press and hold the center button on your Siri Remote to add another channel to the grid.',
      },
      {
        q: 'How do I synchronize my favorites with my iPhone or Mac?',
        a: 'Create a free account at https://dashboard.implayer.tv, link your Apple TV and iPhone Device IDs, and all your custom categories and favorite channels will sync in real-time over the cloud.',
      },
    ],
    pros: [
      'Multi-screen Quad-view for live 3pm Premier League & Champions League matches',
      'Universal Cloud Sync across Apple TV, iPhone, iPad, and Mac via web dashboard',
      'Siri Remote touch swipe zapping and instant 7-day catchup timeline',
      'Native 4K 60FPS playback with Dolby Digital 5.1 & Atmos audio support',
    ],
  },

  // 10. Apple iOS & Mac - iMPlayer (iOS, iPadOS & macOS)
  {
    id: 'guide-apple-ios-implayer',
    slug: 'apple-ios-implayer',
    title: 'How to Setup iMPlayer on iPhone, iPad & Mac (Apple Silicon M-Series)',
    shortTitle: 'iMPlayer iOS & Mac',
    deviceCategory: 'apple',
    deviceCategoryLabel: 'Apple TV 4K, iOS & Mac',
    playerName: 'iMPlayer IPTV (iOS & macOS)',
    playerType: 'Official Apple App Store',
    icon: 'Smartphone',
    appLogo: iconAppleTv,
    difficulty: 'Quick',
    timeEstimate: '2 Mins',
    rating: 4.9,
    verifiedDate: 'August 2026',
    badge: 'Touch, PiP & Mac Native',
    popular: true,
    appUrl: 'https://apps.apple.com/app/implayer-tv/id1661668853',
    summary: 'Experience the full power of iMPlayer on iPhone, iPad, and Mac (Apple Silicon M1/M2/M3/M4). Featuring Picture-in-Picture (PiP) background streaming, touch gesture volume and brightness controls, AirPlay 2 4K casting, and universal cloud playlist management.',
    targetKeywords: [
      'implayer iphone setup',
      'implayer ipad download',
      'implayer macos apple silicon',
      'how to install implayer on ios',
      'best iptv app for iphone 2026'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Apple App Store on iPhone, iPad or Mac',
        description: 'Open the App Store on your iPhone, iPad, or Mac. Search for "iMPlayer IPTV" and tap "Get" to download.',
        actionUrl: 'https://apps.apple.com/app/implayer-tv/id1661668853',
      },
      {
        stepNumber: 2,
        title: 'Launch iMPlayer & Tap "Add Playlist"',
        description: 'Open iMPlayer and select "Add Playlist" from the start screen, then choose "Xtream Codes API".',
      },
      {
        stepNumber: 3,
        title: 'Enter StreamUK VIP Credentials',
        description: 'Input Playlist Name (StreamUK), Server URL (http://uk-premium.streamdns.me:8080), Username, and Password.',
      },
      {
        stepNumber: 4,
        title: 'Connect & Enjoy Picture-in-Picture Streaming',
        description: 'Tap "Connect". Your live TV channels and on-demand movies will load in seconds. Swipe up to multitask while your stream continues in a floating Picture-in-Picture window.',
      },
    ],
    recommendedSettings: [
      {
        setting: 'Auto Picture-in-Picture (PiP)',
        value: 'Enabled',
        explanation: 'Allows uninterrupted live sports audio/video in a floating window while browsing WhatsApp, Safari, or social media.',
      },
      {
        setting: 'AirPlay 2 Casting',
        value: 'Ready (4K 60FPS)',
        explanation: 'One-tap casting from your iPhone or iPad directly to any Apple TV or AirPlay 2 smart television.',
      },
      {
        setting: 'Cloud Management',
        value: 'Linked (dashboard.implayer.tv)',
        explanation: 'Synchronizes your custom channel order and favorites across iPhone, iPad, Mac, and Apple TV.',
      },
    ],
    faqs: [
      {
        q: 'Does iMPlayer run natively on Apple Silicon Macs (M1/M2/M3/M4)?',
        a: 'Yes! iMPlayer is fully optimized for Apple Silicon macOS. You can resize the playback window, use keyboard shortcuts, and stream 4K 60FPS sports directly on your MacBook or iMac.',
      },
      {
        q: 'Does iMPlayer support Picture-in-Picture while texting or browsing?',
        a: 'Yes! Simply swipe up on your iPhone or iPad screen and the stream smoothly continues in a resizable floating window anywhere on your screen.',
      },
    ],
    pros: [
      'Official Apple App Store download (no sideloading or expired certificates)',
      'Floating Picture-in-Picture (PiP) allows streaming while multitasking',
      'AirPlay 2 support to beam 4K video directly to any smart TV',
      'Universal Cloud Sync across iPhone, iPad, Mac, and Apple TV',
    ],
  },

  // 9. Smart TV - IBO Player Pro
  {
    id: 'guide-smart-tv-ibo-player',
    slug: 'smart-tv-ibo-player',
    title: 'How to Setup IBO Player Pro on Samsung & LG Smart TV',
    shortTitle: 'IBO Player 4K',
    deviceCategory: 'smart-tv',
    deviceCategoryLabel: 'Smart TV (Samsung & LG)',
    playerName: 'IBO Player Pro 4K',
    playerType: 'Samsung Smart Hub & LG Content Store',
    icon: 'Tv',
    appLogo: iconSmartTv,
    difficulty: 'Easy',
    timeEstimate: '3 Mins',
    rating: 4.9,
    verifiedDate: 'August 2026',
    badge: 'Best for LG OLED & Samsung',
    popular: true,
    appUrl: 'https://iboplayer.com',
    summary: 'IBO Player Pro is the top-rated IPTV application available directly in the Samsung Tizen Smart Hub and LG webOS Content Store. Requires zero extra boxes or cables — stream 4K 60FPS TV directly using your TV remote.',
    targetKeywords: [
      'ibo player setup samsung tv',
      'ibo player lg webos setup',
      'how to install iptv on samsung smart tv without firestick',
      'how to upload m3u to iboplayer.com'
    ],
    loginType: 'mac_portal',
    sampleConfig: {
      portalUrl: 'https://iboplayer.com/device/login',
      macFormat: '00:1A:79:XX:XX:XX',
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Install IBO Player from TV App Store',
        description: 'Open the "LG Content Store" on LG TVs or "Apps / Smart Hub" on Samsung TVs. Search for "IBO Player" and install it.',
      },
      {
        stepNumber: 2,
        title: 'Open IBO Player and Note Device ID & Device Key',
        description: 'Open the app on your TV. On the screen, you will see your unique "Device MAC Address" and "Device Key" (e.g. MAC: 00:1a:79:... & Key: 123456).',
        tip: 'Take a quick photo of your TV screen with your phone.',
      },
      {
        stepNumber: 3,
        title: 'Visit the IBO Player Web Portal on Phone / PC',
        description: 'On your phone or computer, open your browser and go to: https://iboplayer.com/device/login',
        actionUrl: 'https://iboplayer.com/device/login',
      },
      {
        stepNumber: 4,
        title: 'Enter Device MAC & Key, then Click Login',
        description: 'Type your Device MAC and Device Key shown on your TV screen, then click Login.',
      },
      {
        stepNumber: 5,
        title: 'Add Xtream Playlist & Reload TV App',
        description: 'Click "Add XC Playlist". Enter Playlist Name: StreamUK 4K, Server URL, Username, and Password. Click Save. Now restart IBO Player on your Smart TV to stream!',
      },
    ],
    recommendedSettings: [
      {
        setting: 'Player Engine',
        value: 'Internal Hardware Player',
        explanation: 'Enables native 4K 60FPS hardware acceleration on LG α9 AI processors and Samsung Neo Quantum CPUs.',
      },
      {
        setting: 'Aspect Ratio',
        value: 'Original / 16:9',
        explanation: 'Maintains broadcast perfection on all ultra-wide sports feeds.',
      },
    ],
    faqs: [
      {
        q: 'Do I need an external FireStick or Android box for my Samsung or LG TV?',
        a: 'No! With IBO Player Pro, your Samsung or LG Smart TV connects directly over Wi-Fi/Ethernet with full 4K HDR playback and TV remote control.',
      },
    ],
    pros: [
      'Zero external hardware or dongles needed',
      'Operate everything using your original Samsung / LG Magic Remote',
      'Ultra-crisp 4K HDR10 on OLED and QLED panels',
    ],
  },

  // 10. Smart TV - SET IPTV
  {
    id: 'guide-smart-tv-set-iptv',
    slug: 'smart-tv-set-iptv',
    title: 'How to Setup SET IPTV on Samsung & LG Smart TV',
    shortTitle: 'SET IPTV',
    deviceCategory: 'smart-tv',
    deviceCategoryLabel: 'Smart TV (Samsung & LG)',
    playerName: 'SET IPTV Player',
    playerType: 'Portal Upload App',
    icon: 'Tv',
    appLogo: iconSmartTv,
    difficulty: 'Easy',
    timeEstimate: '3 Mins',
    rating: 4.7,
    verifiedDate: 'August 2026',
    appUrl: 'https://cms.manage-setiptv.com/set.app',
    summary: 'A fast, lightweight portal player available on Samsung Tizen and LG webOS app stores. Upload your M3U playlist link or Xtream details via the online management portal.',
    targetKeywords: [
      'set iptv samsung setup',
      'set iptv lg webos',
      'how to upload playlist to set iptv portal'
    ],
    loginType: 'm3u_url',
    sampleConfig: {
      portalUrl: 'https://cms.manage-setiptv.com/set.app',
      macFormat: '7C:64:56:XX:XX:XX',
      m3uFormat: 'http://uk-premium.streamdns.me:8080/get.php?username=stream_user9482&password=xxxx&type=m3u_plus&output=ts',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Install SET IPTV from your TV App Store',
        description: 'Search for "SET IPTV" in Samsung Apps or LG Content Store and install it.',
      },
      {
        stepNumber: 2,
        title: 'Find TV MAC Address',
        description: 'Open SET IPTV to see your TV MAC Address displayed on screen.',
      },
      {
        stepNumber: 3,
        title: 'Open Web Portal & Upload Playlist',
        description: 'Go to https://cms.manage-setiptv.com/set.app on your phone or PC. Enter your TV MAC and paste your M3U Plus URL, then click Send.',
        actionUrl: 'https://cms.manage-setiptv.com/set.app',
      },
      {
        stepNumber: 4,
        title: 'Restart App on Smart TV',
        description: 'Press the Red button on your remote to reload the playlist and start watching.',
      },
    ],
    pros: [
      'Simple web-based remote upload',
      'High compatibility with older Samsung & LG smart TV models',
    ],
  },

  // 11. Formuler - MyTVOnline 3 (MOL3)
  {
    id: 'guide-formuler-mytvonline3',
    slug: 'formuler-mytvonline3',
    title: 'How to Setup Formuler MyTVOnline 3 (MOL3 & MOL2) on Z11 Pro Max',
    shortTitle: 'Formuler MOL3',
    deviceCategory: 'formuler-mag',
    deviceCategoryLabel: 'Formuler & MAG Boxes',
    playerName: 'MyTVOnline 3 (MOL3)',
    playerType: 'Proprietary Hardware OS',
    icon: 'Cpu',
    appLogo: iconFormulerMag,
    difficulty: 'Easy',
    timeEstimate: '2 Mins',
    rating: 5.0,
    verifiedDate: 'August 2026',
    badge: 'Ultimate Hardware Experience',
    popular: true,
    summary: 'MyTVOnline 3 (MOL3) exclusively on Formuler Z11 Pro Max and Z-Series boxes is renowned by enthusiasts worldwide as the pinnacle IPTV hardware experience. Features ultra-responsive channel switching, PiP, universal group management, and multi-portal aggregation.',
    targetKeywords: [
      'formuler z11 pro max setup iptv',
      'mytvonline3 mol3 setup guide',
      'formuler xtream api setup',
      'how to setup formuler z10 mol2'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      portalUrl: 'http://uk-premium.streamdns.me:8080/c',
      macFormat: '00:1E:B8:XX:XX:XX',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Launch MyTVOnline 3 on your Formuler Box',
        description: 'Turn on your Formuler Z11 Pro Max / Z10 and open the built-in MyTVOnline 3 (or MOL2) app.',
      },
      {
        stepNumber: 2,
        title: 'Click "Add Content Source" / "Add Portal"',
        description: 'Navigate to Connections > Content Manager > Add Content Source > Select "Xtream Codes API" (or Stalker Portal if using MAC activation).',
      },
      {
        stepNumber: 3,
        title: 'Enter Connection Details',
        description: 'Nickname: StreamUK 4K, Server URL: http://uk-premium.streamdns.me:8080, Username, and Password.',
      },
      {
        stepNumber: 4,
        title: 'Connect & Enjoy MOL3 Features',
        description: 'Click Connect. Enjoy Formuler’s industry-leading GTV-BT1 Bluetooth remote shortcut keys, recording, and catch-up TV.',
      },
    ],
    recommendedSettings: [
      {
        setting: 'EPG Mode',
        value: 'UTC / UK Timezone Match',
        explanation: 'Synchronizes full 7-day TV schedule with zero hour offset for UK, US, and EU broadcasters.',
      },
      {
        setting: 'Buffer Time',
        value: 'Normal (3s)',
        explanation: 'Optimal for real-time live sports stability on gigabit fibre connections.',
      },
    ],
    pros: [
      'Hardware-integrated Bluetooth remote with dedicated Guide and VOD buttons',
      'Simultaneous multi-screen and background recording to USB/SSD',
      'Universal search across 24,000+ live channels and 120,000+ movies',
    ],
  },

  // 12. MAG Box - Infomir Stalker Portal
  {
    id: 'guide-mag-box-stalker',
    slug: 'mag-box-stalker',
    title: 'How to Setup MAG Box (254 / 322 / 424 / 524) with Stalker Portal',
    shortTitle: 'MAG Stalker Box',
    deviceCategory: 'formuler-mag',
    deviceCategoryLabel: 'Formuler & MAG Boxes',
    playerName: 'MAG Infomir Embedded Linux',
    playerType: 'Hardware MAC Stalker Middleware',
    icon: 'Radio',
    appLogo: iconFormulerMag,
    difficulty: 'Easy',
    timeEstimate: '2 Mins',
    rating: 4.8,
    verifiedDate: 'August 2026',
    summary: 'Step-by-step setup guide for MAG 254, 256, 322, 424, and MAG 524 Linux set-top boxes using your device MAC address (00:1A:79:...) and custom Stalker portal URL.',
    targetKeywords: [
      'mag 254 setup iptv portal',
      'mag 524 portal url setup',
      'how to setup stalker portal mag box'
    ],
    loginType: 'mac_portal',
    sampleConfig: {
      portalUrl: 'http://uk-premium.streamdns.me:8080/c',
      macFormat: '00:1A:79:XX:XX:XX',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Locate your MAG MAC Address',
        description: 'Look at the barcode label underneath your MAG box to find the MAC address starting with 00:1A:79:... (Provide this when ordering your StreamUK activation).',
      },
      {
        stepNumber: 2,
        title: 'Open Inner Portal Settings',
        description: 'Power on your MAG box. If loading a portal, click "Settings" or unplug the Ethernet cable to enter Inner Portal > Go to Settings > System Settings.',
      },
      {
        stepNumber: 3,
        title: 'Enter Servers > Portals',
        description: 'Navigate to "Servers" > "Portals". Set Portal 1 Name: "StreamUK 4K".',
      },
      {
        stepNumber: 4,
        title: 'Enter Portal 1 URL',
        description: 'Type Portal 1 URL: http://uk-premium.streamdns.me:8080/c and click Save (or press OK on remote).',
        codeOrValue: 'http://uk-premium.streamdns.me:8080/c',
      },
      {
        stepNumber: 5,
        title: 'Restart Portal',
        description: 'Go back to System Settings and click "Restart Portal". Your MAG box will load the full TV portal automatically.',
      },
    ],
    pros: [
      'Classic set-top box interface with dedicated numeric channel keys',
      'Zero Android bloatware or background app interference',
    ],
  },

  // 13. PC & Mac - IPTV Smarters Pro Desktop
  {
    id: 'guide-windows-mac-smarters',
    slug: 'windows-mac-smarters',
    title: 'How to Setup IPTV Smarters Pro on Windows 11/10 PC & Apple Mac',
    shortTitle: 'PC & Mac Desktop',
    deviceCategory: 'pc-web',
    deviceCategoryLabel: 'Windows PC, Mac & Web Player',
    playerName: 'IPTV Smarters Pro Desktop',
    playerType: 'Native Windows (.exe) & Mac (.dmg)',
    icon: 'Laptop',
    appLogo: iconPcWeb,
    difficulty: 'Easy',
    timeEstimate: '2 Mins',
    rating: 4.9,
    verifiedDate: 'August 2026',
    appUrl: 'https://www.iptvsmarters.com/#downloads',
    summary: 'Stream all live 4K sports and cinema on your Windows PC, laptop, or Apple Mac with multi-window playback, recording, and customizable screen ratios.',
    targetKeywords: [
      'iptv smarters windows 11 download',
      'iptv smarters pro mac dmg setup',
      'how to watch iptv on laptop pc'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Download IPTV Smarters Desktop Installer',
        description: 'Download the official Windows (.exe) or Mac (.dmg) installer directly from the Smarters website.',
        actionUrl: 'https://www.iptvsmarters.com/#downloads',
      },
      {
        stepNumber: 2,
        title: 'Install & Run the Program',
        description: 'Follow on-screen installation prompts and launch IPTV Smarters on your computer.',
      },
      {
        stepNumber: 3,
        title: 'Enter Xtream Codes Login',
        description: 'Select "Login with Xtream Codes API", type your credentials, and click Add User.',
      },
    ],
    pros: [
      'Multi-monitor full-screen support (watch sports on monitor 2 while working on monitor 1)',
      'Hardware decoding for Intel, AMD, and Apple Silicon M1/M2/M3/M4 chips',
    ],
  },

  // 14. Web Player - Instant Browser Play
  {
    id: 'guide-webtv-browser-player',
    slug: 'webtv-browser-player',
    title: 'How to Watch StreamUK Instantly via Web Browser (Zero Install)',
    shortTitle: 'Web Browser TV',
    deviceCategory: 'pc-web',
    deviceCategoryLabel: 'Windows PC, Mac & Web Player',
    playerName: 'StreamUK WebTV Online Player',
    playerType: 'Web Browser (Chrome / Edge / Safari)',
    icon: 'Laptop',
    appLogo: iconPcWeb,
    difficulty: 'Quick',
    timeEstimate: '30 Secs',
    rating: 5.0,
    verifiedDate: 'August 2026',
    badge: 'Fastest Setup (30 Secs)',
    popular: true,
    appUrl: 'https://webtv.iptvsmarters.com',
    summary: 'Zero installation required! Open Google Chrome, Microsoft Edge, Safari, or Firefox on any device, type your credentials, and start streaming live 4K channels and movies instantly in your browser tab.',
    targetKeywords: [
      'webtv iptv player browser',
      'watch iptv in google chrome',
      'globalstreamhub online web player',
      'no install iptv web browser'
    ],
    loginType: 'webtv',
    sampleConfig: {
      serverUrl: 'https://webtv.iptvsmarters.com',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open WebTV Player in Any Browser',
        description: 'Navigate to https://webtv.iptvsmarters.com (or http://uk-premium.streamdns.me:8080/webplayer) on your laptop, phone, or tablet.',
        actionUrl: 'https://webtv.iptvsmarters.com',
      },
      {
        stepNumber: 2,
        title: 'Enter Username & Password',
        description: 'Type your Username and Password received on WhatsApp/Email upon instant activation.',
      },
      {
        stepNumber: 3,
        title: 'Click Sign In & Stream',
        description: 'Your complete live TV lineup and on-demand movies will load immediately in your browser.',
      },
    ],
    faqs: [
      {
        q: 'Does WebTV require installing any browser extension or plugin?',
        a: 'No! It is a 100% native HTML5 Web player running directly in standard browsers with hardware video decoding.'
      },
      {
        q: 'Can I cast WebTV from my laptop to a Chromecast or Smart TV?',
        a: 'Yes, click the Google Cast icon in the Chrome browser tab or use AirPlay on Safari to cast effortlessly.'
      }
    ],
    pros: [
      'Works on literally any device with a browser (PC, Chromebook, Tesla Screen, iPad)',
      'No files or apps to download or configure',
      'Instant access in under 30 seconds',
    ],
  },

  // 15. FireStick - XCIPTV Player
  {
    id: 'guide-firestick-xciptv',
    slug: 'firestick-xciptv',
    title: 'How to Install XCIPTV Player on Amazon FireStick & Fire TV',
    shortTitle: 'XCIPTV FireStick',
    deviceCategory: 'firestick',
    deviceCategoryLabel: 'Amazon FireStick & Fire TV',
    playerName: 'XCIPTV Player Pro',
    playerType: 'ExoPlayer & VLC Dual Core APK',
    icon: 'Flame',
    appLogo: iconFirestick,
    difficulty: 'Easy',
    timeEstimate: '2 Mins',
    rating: 4.8,
    verifiedDate: 'August 2026',
    badge: 'Dual Player Engine',
    popular: false,
    downloaderCode: '537992',
    appUrl: 'https://xciptv.com',
    summary: 'XCIPTV features a sleek media-center style UI with built-in dual player engines (ExoPlayer and VLC Player) for maximum video codec compatibility on Fire TV devices.',
    targetKeywords: [
      'xciptv firestick setup',
      'downloader code 537992 xciptv',
      'how to setup xciptv xtream codes',
      'xciptv 4k fire tv'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Downloader on FireStick',
        description: 'Launch Downloader from your FireStick home screen.',
      },
      {
        stepNumber: 2,
        title: 'Enter XCIPTV Shortcode: 537992',
        description: 'Type official shortcode 537992 (or mirror code 36009) into Downloader and click Go to download XCIPTV.',
        codeOrValue: '537992',
      },
      {
        stepNumber: 3,
        title: 'Install and Open XCIPTV',
        description: 'Click Install when prompted, then click Open.',
      },
      {
        stepNumber: 4,
        title: 'Enter Xtream Server Details',
        description: 'Enter Server URL: http://uk-premium.streamdns.me:8080, your Username, and Password.',
      },
      {
        stepNumber: 5,
        title: 'Sign In and Enjoy 4K TV',
        description: 'Click Sign In. The app will sync your channels and VOD library in seconds.',
      },
    ],
    faqs: [
      {
        q: 'Which player engine is best in XCIPTV?',
        a: 'ExoPlayer is recommended for live sports 60FPS streams; VLC Player is great for older foreign movie audio tracks.'
      }
    ],
    pros: [
      'Dual video player architecture (ExoPlayer + VLC)',
      'Built-in backup backup EPG sync options',
      'Customizable home screen shortcuts',
    ],
  },

  // 16. Android TV - IPTV Smarters Pro
  {
    id: 'guide-android-tv-smarters-pro',
    slug: 'android-tv-smarters-pro',
    title: 'How to Setup IPTV Smarters Pro on Android TV & Google TV',
    shortTitle: 'Smarters Android TV',
    deviceCategory: 'android-tv',
    deviceCategoryLabel: 'Android TV, Google TV & Shield',
    playerName: 'IPTV Smarters Pro 2026',
    playerType: 'Official Android TV App',
    icon: 'Smartphone',
    appLogo: iconSmarters,
    difficulty: 'Easy',
    timeEstimate: '2 Mins',
    rating: 4.9,
    verifiedDate: 'August 2026',
    badge: 'Universal Favorite',
    popular: true,
    downloaderCode: '80198',
    appUrl: 'https://www.iptvsmarters.com/smarters.apk',
    summary: 'Install IPTV Smarters Pro on any Android TV or Google TV device (Sony, Philips, TCL, Nvidia Shield, Mecool) to stream 24,000+ live 4K channels and movies.',
    targetKeywords: [
      'iptv smarters android tv setup',
      'google tv smarters pro apk',
      'nvidia shield iptv smarters',
      'smarters pro xtream codes android'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Download via Google Play or Downloader',
        description: 'Search for "IPTV Smarters" in the Google Play Store on your TV, or use Downloader with shortcode 80198.',
        codeOrValue: '80198',
      },
      {
        stepNumber: 2,
        title: 'Open App & Select Xtream Codes API',
        description: 'Choose "Login with Xtream Codes API" on the welcome screen.',
      },
      {
        stepNumber: 3,
        title: 'Enter Your Credentials',
        description: 'Name: StreamUK, Server URL: http://uk-premium.streamdns.me:8080, Username, and Password.',
      },
      {
        stepNumber: 4,
        title: 'Add User & Start Watching',
        description: 'Click "Add User" to download your live channel guide and 4K VOD catalog.',
      },
    ],
    faqs: [
      {
        q: 'Does Smarters Pro support parental PIN control on Android TV?',
        a: 'Yes, you can set a custom 4-digit PIN in Settings to lock Adult or specific channel categories.'
      }
    ],
    pros: [
      'Simple, intuitive tile interface for family use',
      'Integrated Catch-Up TV player with timeline',
      'Multiple user profiles on one device',
    ],
  },

  // 17. Android TV - OTT Navigator
  {
    id: 'guide-android-tv-ott-navigator',
    slug: 'android-tv-ott-navigator',
    title: 'How to Setup OTT Navigator IPTV on Android TV & Shield TV',
    shortTitle: 'OTT Navigator 4K',
    deviceCategory: 'android-tv',
    deviceCategoryLabel: 'Android TV, Google TV & Shield',
    playerName: 'OTT Navigator IPTV Pro',
    playerType: 'Advanced Power-User Player',
    icon: 'Smartphone',
    appLogo: iconAndroidTv,
    difficulty: 'Medium',
    timeEstimate: '3 Mins',
    rating: 4.9,
    verifiedDate: 'August 2026',
    badge: 'Best Power-User Player',
    appUrl: 'https://play.google.com/store/apps/details?id=studio.scillarium.ottnavigator',
    summary: 'OTT Navigator is the ultimate customizable IPTV player for Android TV power users. Features advanced picture-in-picture, timeline studio view, custom codec filters, and multi-provider merging.',
    targetKeywords: [
      'ott navigator android tv setup',
      'ott navigator iptv google play',
      'best power user iptv player android tv'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Install from Google Play Store',
        description: 'Open Google Play Store on your Android TV and install "OTT Navigator IPTV".',
        actionUrl: 'https://play.google.com/store/apps/details?id=studio.scillarium.ottnavigator',
      },
      {
        stepNumber: 2,
        title: 'Configure Provider',
        description: 'Go to Settings > Provider > Add Provider > Select "Xtream Codes".',
      },
      {
        stepNumber: 3,
        title: 'Enter StreamUK Line',
        description: 'Type Server URL, Username, and Password, then click Apply.',
      },
      {
        stepNumber: 4,
        title: 'Select Studio EPG View',
        description: 'Choose your preferred UI theme (Studio layout gives a stunning modern Sky/BBC grid).',
      },
    ],
    pros: [
      'Deepest customization of any Android player',
      'Dynamic Picture-in-Picture window while browsing',
      'Advanced audio equalizer and video sharpening shaders',
    ],
  },

  // 18. Smart TV - Smart One IPTV
  {
    id: 'guide-smart-tv-smart-one',
    slug: 'smart-tv-smart-one',
    title: 'How to Setup Smart One IPTV on Samsung Tizen & LG webOS Smart TV',
    shortTitle: 'Smart One IPTV',
    deviceCategory: 'smart-tv',
    deviceCategoryLabel: 'Smart TV (Samsung & LG)',
    playerName: 'Smart One IPTV Player',
    playerType: 'Smart TV App Store',
    icon: 'Tv',
    appLogo: iconSmartTv,
    difficulty: 'Easy',
    timeEstimate: '3 Mins',
    rating: 4.8,
    verifiedDate: 'August 2026',
    badge: 'Samsung & LG Certified',
    appUrl: 'https://smartone-iptv.com/plugin/smart_one/main_generate',
    summary: 'Smart One IPTV is a top-rated dedicated application for Samsung (Tizen OS) and LG (webOS) Smart TVs with simple web portal MAC playlist generation and 4K HDR playback.',
    targetKeywords: [
      'smart one iptv samsung setup',
      'smart one iptv lg webos',
      'upload playlist smart one iptv',
      'samsung smart tv iptv app without firestick'
    ],
    loginType: 'mac_portal',
    sampleConfig: {
      portalUrl: 'https://smartone-iptv.com/plugin/smart_one/main_generate',
      macFormat: '74:E5:43:XX:XX:XX',
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Install Smart One IPTV on TV',
        description: 'Search "Smart One IPTV" in Samsung Apps or LG Content Store and install it.',
      },
      {
        stepNumber: 2,
        title: 'Note Your TV MAC Address & Key ID',
        description: 'Open the app to find your Device MAC Address and ID displayed on screen.',
      },
      {
        stepNumber: 3,
        title: 'Upload Playlist on Smart One Portal',
        description: 'Visit https://smartone-iptv.com/plugin/smart_one/main_generate on phone/PC. Enter MAC address and select Xtream Codes API (or M3U).',
        actionUrl: 'https://smartone-iptv.com/plugin/smart_one/main_generate',
      },
      {
        stepNumber: 4,
        title: 'Enter StreamUK Credentials & Click Generate',
        description: 'Input Server URL, Username, and Password, then click "Generate Smart Key".',
      },
      {
        stepNumber: 5,
        title: 'Reload TV App',
        description: 'Press the Reload button on your Smart TV to access 24,000+ live 4K channels.',
      },
    ],
    faqs: [
      {
        q: 'Does Smart One IPTV work with the LG Magic Remote cursor?',
        a: 'Yes, full pointer/air-mouse navigation and scroll-wheel channel browsing are supported on all LG webOS models.'
      }
    ],
    pros: [
      'Native Samsung Tizen & LG webOS store installation',
      'Full Magic Remote pointer and scroll wheel support',
      'Fast channel loading with 4K UHD HDR10 support',
    ],
  },

  // 19. Apple - Snapp IPTV 4K
  {
    id: 'guide-apple-tv-snapp-uhd',
    slug: 'apple-tv-snapp-uhd',
    title: 'How to Setup Snapp IPTV 4K on Apple TV, iPhone & iPad',
    shortTitle: 'Snapp 4K Apple TV',
    deviceCategory: 'apple',
    deviceCategoryLabel: 'Apple TV 4K & iOS',
    playerName: 'Snapp IPTV 4K Player',
    playerType: 'Official Apple App Store',
    icon: 'Tv',
    appLogo: iconAppleTv,
    difficulty: 'Quick',
    timeEstimate: '2 Mins',
    rating: 4.8,
    verifiedDate: 'August 2026',
    badge: 'tvOS 17/18 Ready',
    appUrl: 'https://apps.apple.com/app/snapp-iptv/id1584988771',
    summary: 'A sleek, lightweight Apple TV player with fast channel switching, full Siri Remote touch navigation, and clean EPG display for Apple ecosystems.',
    targetKeywords: [
      'snapp iptv apple tv',
      'apple tv 4k iptv player app store',
      'best free iptv app for apple tv 2026'
    ],
    loginType: 'xtream_codes',
    sampleConfig: {
      serverUrl: 'http://uk-premium.streamdns.me:8080',
      username: 'stream_user9482',
      password: '••••••••••••',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Open Apple TV App Store',
        description: 'Search for "Snapp IPTV" in the App Store on your Apple TV 4K or iPhone.',
        actionUrl: 'https://apps.apple.com/app/snapp-iptv/id1584988771',
      },
      {
        stepNumber: 2,
        title: 'Install & Launch the App',
        description: 'Download and open Snapp IPTV.',
      },
      {
        stepNumber: 3,
        title: 'Select Xtream Codes Login',
        description: 'Enter Server URL, Username, and Password.',
      },
      {
        stepNumber: 4,
        title: 'Save & Stream',
        description: 'Click Save to start watching 4K 60FPS sports and cinema.',
      },
    ],
    pros: [
      'Smooth tvOS gesture remote navigation',
      'Fast channel zapping with minimal buffer',
      'Dolby Digital 5.1 audio passthrough',
    ],
  },

  // 20. PC & Mac - VLC Media Player
  {
    id: 'guide-vlc-media-player',
    slug: 'vlc-media-player',
    title: 'How to Stream IPTV on PC & Mac with VLC Media Player',
    shortTitle: 'VLC Media Player',
    deviceCategory: 'pc-web',
    deviceCategoryLabel: 'Windows PC, Mac & Web Player',
    playerName: 'VLC Media Player',
    playerType: 'Open Source Media Player',
    icon: 'Laptop',
    appLogo: iconPcWeb,
    difficulty: 'Quick',
    timeEstimate: '1 Min',
    rating: 4.7,
    verifiedDate: 'August 2026',
    badge: '100% Free & Open Source',
    appUrl: 'https://www.videolan.org/vlc/',
    summary: 'The iconic open-source media player allows direct network streaming of M3U Plus playlists on Windows, Mac, and Linux with zero proprietary software required.',
    targetKeywords: [
      'vlc media player iptv setup',
      'how to stream m3u in vlc',
      'vlc open network stream iptv pc mac'
    ],
    loginType: 'm3u_url',
    sampleConfig: {
      m3uFormat: 'http://uk-premium.streamdns.me:8080/get.php?username=stream_user9482&password=xxxx&type=m3u_plus&output=ts',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Install VLC Media Player',
        description: 'Download and install VLC from the official website (videolan.org).',
        actionUrl: 'https://www.videolan.org/vlc/',
      },
      {
        stepNumber: 2,
        title: 'Open Network Stream (Ctrl+N / Cmd+N)',
        description: 'In VLC, click Media (or File on Mac) > "Open Network Stream".',
      },
      {
        stepNumber: 3,
        title: 'Paste Your StreamUK M3U Plus Link',
        description: 'Paste your personal M3U URL provided in your StreamUK activation email/WhatsApp.',
      },
      {
        stepNumber: 4,
        title: 'Click Play & Press Ctrl+L for Channel List',
        description: 'Click Play. Press Ctrl+L (or Cmd+Option+P on Mac) to view the full channel playlist sidebar.',
      },
    ],
    pros: [
      '100% free with zero ads or tracking',
      'Plays virtually every video and audio format on earth',
      'Extremely lightweight on laptop battery life',
    ],
  },
];
