import { AppScreenshotItem, AppSettingSection, DetailedSetupGuide, RemoteShortcut } from '../types';

// WebP screenshots extracted directly from the official guide
import img01 from '../assets/images/cbr/cbr_01_screenshot_for_live_tv_guide.webp';
import img02 from '../assets/images/cbr/cbr_02_screenshot_for_full_screen_wit.webp';
import img03 from '../assets/images/cbr/cbr_03_screenshot_for_full_screen_wit.webp';
import img04 from '../assets/images/cbr/cbr_04_screenshot_for_pause_and_rewin.webp';
import img05 from '../assets/images/cbr/cbr_05_screenshot_for_watch_an_earlie.webp';
import img06 from '../assets/images/cbr/cbr_06_screenshot_for_watch_an_earlie.webp';
import img07 from '../assets/images/cbr/cbr_07_screenshot_for_multiview_and_c.webp';
import img08 from '../assets/images/cbr/cbr_08_screenshot_for_multiview_and_c.webp';
import img09 from '../assets/images/cbr/cbr_09_screenshot_for_multiview_from_.webp';
import img10 from '../assets/images/cbr/cbr_10_screenshot_for_movies_for_tier.webp';
import img11 from '../assets/images/cbr/cbr_11_screenshot_for_movies_for_tier.webp';
import img12 from '../assets/images/cbr/cbr_12_screenshot_for_movie_playback_.webp';
import img13 from '../assets/images/cbr/cbr_13_screenshot_for_tv_shows_for_ti.webp';
import img14 from '../assets/images/cbr/cbr_14_screenshot_for_tv_shows_for_ti.webp';
import img15 from '../assets/images/cbr/cbr_15_screenshot_for_choose_a_season.webp';
import img16 from '../assets/images/cbr/cbr_16_screenshot_for_find_games_in_s.webp';
import img17 from '../assets/images/cbr/cbr_17_screenshot_for_event_details_a.webp';
import img18 from '../assets/images/cbr/cbr_18_screenshot_for_event_details_a.webp';
import img19 from '../assets/images/cbr/cbr_19_screenshot_for_general_setting.webp';
import img20 from '../assets/images/cbr/cbr_20_screenshot_for_playlist_settin.webp';
import img21 from '../assets/images/cbr/cbr_21_screenshot_for_customize_an_in.webp';
import img22 from '../assets/images/cbr/cbr_22_screenshot_for_reorder_or_hide.webp';
import img23 from '../assets/images/cbr/cbr_23_screenshot_for_reorder_or_hide.webp';
import img24 from '../assets/images/cbr/cbr_24_screenshot_for_reorder_channel.webp';
import img25 from '../assets/images/cbr/cbr_25_screenshot_for_reorder_channel.webp';
import img26 from '../assets/images/cbr/cbr_26_screenshot_for_epg_settings.webp';
import img27 from '../assets/images/cbr/cbr_27_screenshot_for_vod_settings_fo.webp';
import img28 from '../assets/images/cbr/cbr_28_screenshot_for_sports_hub_sett.webp';
import img29 from '../assets/images/cbr/cbr_29_screenshot_for_recording_setti.webp';
import img30 from '../assets/images/cbr/cbr_30_screenshot_for_link_the_device.webp';
import img31 from '../assets/images/cbr/cbr_31_screenshot_for_turn_on_parenta.webp';
import img32 from '../assets/images/cbr/cbr_32_screenshot_for_turn_on_parenta.webp';

export {
  img01, img02, img03, img04, img05, img06,
  img07, img08, img09, img10, img11, img12,
  img13, img14, img15, img16, img17, img18,
  img19, img20, img21, img22, img23, img24,
  img25, img26, img27, img28, img29, img30,
  img31, img32
};

export const CBR_TV_SCREENSHOTS: AppScreenshotItem[] = [
  // 1. Live TV & EPG
  {
    id: 'cbr-live-tv-grid',
    title: 'Live TV Interactive EPG Grid',
    caption: 'Selected program preview, title, timings, live progress bar, and metadata appear directly above the channel grid.',
    imageUrl: img01,
    category: 'Live TV',
    tag: 'Live Grid'
  },
  {
    id: 'cbr-fullscreen-info-overlay',
    title: 'Full-Screen Information & Quick History',
    caption: 'Press OK during full-screen Live TV to open the channel information banner and recent channel switching row.',
    imageUrl: img02,
    category: 'Live TV',
    tag: 'Fullscreen Overlay'
  },
  {
    id: 'cbr-fullscreen-actions',
    title: 'Action Row & History Bar',
    caption: 'Press Down to access MultiView, Closed Captions (CC), Favorite toggle, and playback controls. History tiles auto-compact.',
    imageUrl: img03,
    category: 'Live TV',
    tag: 'Action Controls'
  },
  {
    id: 'cbr-pause-rewind-timeshift',
    title: 'Live Timeshift Buffer & Scrubbing',
    caption: 'Timeshift adds an interactive timeline with -10s, +10s, -30s, +30s jump buttons and instant "Jump to Live" button.',
    imageUrl: img04,
    category: 'Live TV',
    tag: 'Timeshift'
  },
  {
    id: 'cbr-catchup-guide-navigation',
    title: '7-Day Catchup Replay from Guide',
    caption: 'Move Left in the guide on channels bearing the circular catchup icon to browse and instantly replay past programs.',
    imageUrl: img05,
    category: 'Live TV',
    tag: 'Catchup Guide'
  },
  {
    id: 'cbr-catchup-overlay',
    title: 'Catchup Playback Timeline Overlay',
    caption: 'Detailed program timeline with previous/next episode navigation and fast scrub controls powered by provider cloud archives.',
    imageUrl: img06,
    category: 'Live TV',
    tag: 'Catchup Player'
  },

  // 2. MultiView & Sports Hub
  {
    id: 'cbr-multiview-options',
    title: 'MultiView Dual Mode Channel Picker',
    caption: 'MultiView offers two distinct modes: select via standard TV Guide categories or pick directly from live fixtures in Sports Hub.',
    imageUrl: img07,
    category: 'MultiView & Sports',
    tag: 'MultiView Mode'
  },
  {
    id: 'cbr-multiview-tv-guide',
    title: 'MultiView Selection via TV Guide',
    caption: 'Categories on the left, live channels on the right. Side-by-side or quad 4-way split layouts with active audio border.',
    imageUrl: img08,
    category: 'MultiView & Sports',
    tag: 'Split Screen'
  },
  {
    id: 'cbr-multiview-sports-picker',
    title: 'Instant Sports Hub Live Fixture Picker',
    caption: 'Compact live match selector with glowing red LIVE badges. Browse by sport and league to add games to MultiView.',
    imageUrl: img09,
    category: 'MultiView & Sports',
    tag: 'Live Sports MultiView'
  },
  {
    id: 'cbr-sports-hub-grid',
    title: 'Sports Hub Complete Schedule & Matches',
    caption: 'Dedicated sports hub organized by sport and tournament (Premier League, Champions League, NFL, F1, NBA, UFC, Tennis).',
    imageUrl: img16,
    category: 'MultiView & Sports',
    tag: 'Sports Hub'
  },
  {
    id: 'cbr-sports-event-details',
    title: 'Fixture Details, Kickoff Times & Venues',
    caption: 'Comprehensive event cards showing team form, stadium venue, preview notes, and a direct "View Broadcasts" button.',
    imageUrl: img17,
    category: 'MultiView & Sports',
    tag: 'Match Details'
  },
  {
    id: 'cbr-sports-broadcast-choices',
    title: 'Multiple Broadcast Feeds per Match',
    caption: 'Choose between 4K UHD, Sky Sports, TNT, USA Network, TSN, or international commentary feeds for any single sporting fixture.',
    imageUrl: img18,
    category: 'MultiView & Sports',
    tag: 'Multi Feeds'
  },
  {
    id: 'cbr-sports-hub-settings',
    title: 'Sports Hub Customization Settings',
    caption: 'Toggle Sports Hub, reorder favorite sports/leagues to the top, hide unused tournaments, and set default MultiView landing.',
    imageUrl: img28,
    category: 'MultiView & Sports',
    tag: 'Sports Settings'
  },

  // 3. VOD & Series
  {
    id: 'cbr-movies-catalogue',
    title: '4K Cinema Movies Library',
    caption: 'Browse extensive 4K & HDR cinema catalog with smart categories, search, watchlist, recent history, and alphabetical A-Z rail.',
    imageUrl: img10,
    category: 'VOD & Series',
    tag: 'Movies VOD'
  },
  {
    id: 'cbr-movies-poster-options',
    title: 'Movie Poster Quick Options Menu',
    caption: 'Long press OK on any poster to instantly Add to Watchlist, Resume, Play from Beginning, or Mark as Watched.',
    imageUrl: img11,
    category: 'VOD & Series',
    tag: 'Movie Menu'
  },
  {
    id: 'cbr-movie-playback-controls',
    title: 'Cinema Player & Subtitle Audio Selector',
    caption: 'Full-featured media player with dual audio tracks, multi-language subtitles (CC), resume buffer, and high-precision timeline.',
    imageUrl: img12,
    category: 'VOD & Series',
    tag: 'Cinema Player'
  },
  {
    id: 'cbr-tv-shows-catalogue',
    title: 'TV Boxsets & Series Library',
    caption: 'Complete TV series catalog with Netflix, HBO, Apple TV+, Disney+, and BBC series grouped with full season metadata.',
    imageUrl: img13,
    category: 'VOD & Series',
    tag: 'Series VOD'
  },
  {
    id: 'cbr-tv-shows-options',
    title: 'Series Long-Press Quick Options',
    caption: 'Quickly Resume Last Played Episode, Play Next Unwatched Episode, or toggle series watchlist status.',
    imageUrl: img14,
    category: 'VOD & Series',
    tag: 'Series Menu'
  },
  {
    id: 'cbr-season-episode-selector',
    title: 'Season Tabs & Episode Overview',
    caption: 'Horizontal season selector pills with episode thumbnails, air dates, plot synopses, and individual watch progress bars.',
    imageUrl: img15,
    category: 'VOD & Series',
    tag: 'Episodes'
  },
  {
    id: 'cbr-vod-settings',
    title: 'VOD Playback & Watched Thresholds',
    caption: 'Configure auto-mark watched percentage (e.g. 92% to skip ending credits) and automatic next-episode autoplay.',
    imageUrl: img27,
    category: 'VOD & Series',
    tag: 'VOD Settings'
  },

  // 4. Settings & Playlists
  {
    id: 'cbr-general-settings',
    title: 'General Settings & Startup Behavior',
    caption: 'Configure "Turn on last channel on app start", "Confirm exit by second press Back", and automatic frame rate switching.',
    imageUrl: img19,
    category: 'Settings & Playlists',
    tag: 'General Settings'
  },
  {
    id: 'cbr-playlist-settings-status',
    title: 'Playlist Sync Status & Statistics',
    caption: 'Shows recent import timestamps, total live channels, movies, series count, and sync diagnostic indicators.',
    imageUrl: img20,
    category: 'Settings & Playlists',
    tag: 'Playlist Status'
  },
  {
    id: 'cbr-customize-playlist-tools',
    title: 'Playlist Customization Suite',
    caption: 'Full control panel to refresh playlists, edit Xtream server credentials, and manage category/channel hierarchies.',
    imageUrl: img21,
    category: 'Settings & Playlists',
    tag: 'Playlist Tools'
  },
  {
    id: 'cbr-reorder-hide-categories-choice',
    title: 'Category Customization Hub',
    caption: 'Select Live TV, Movies, or TV Shows sections to reorder rows or hide unwanted language and regional packages.',
    imageUrl: img22,
    category: 'Settings & Playlists',
    tag: 'Category Hub'
  },
  {
    id: 'cbr-reorder-or-hide-categories',
    title: 'Reorder Categories & Visibility',
    caption: 'Clean intuitive drag/reorder controls and checkboxes to effortlessly remove clutter and prioritize UK & Sports channels.',
    imageUrl: img23,
    category: 'Settings & Playlists',
    tag: 'Reorder Categories'
  },
  {
    id: 'cbr-select-category-for-channels',
    title: 'Channel Organization Selector',
    caption: 'Drill down into any specific category to manage channel ordering, hide secondary streams, or manage favorites.',
    imageUrl: img24,
    category: 'Settings & Playlists',
    tag: 'Channel Selector'
  },
  {
    id: 'cbr-reorder-channels-favorites',
    title: 'Reorder Channels & Quick Favorites',
    caption: 'Quickly star favorite channels into the dedicated VIP Favorites group and customize exact channel number sequences.',
    imageUrl: img25,
    category: 'Settings & Playlists',
    tag: 'Channel Order'
  },
  {
    id: 'cbr-epg-settings',
    title: 'EPG Schedule & Past Days Retention',
    caption: 'Set past guide retention (1-3 days), refresh intervals, and toggle "Long press Left for earlier programs" (TiviMate mode).',
    imageUrl: img26,
    category: 'Settings & Playlists',
    tag: 'EPG Settings'
  },
  {
    id: 'cbr-recording-timeshift-settings',
    title: 'Recording & Timeshift Buffer Config',
    caption: 'Leave DVR turned OFF (recommended). Enable optional Timeshift buffer (5-60 min) for pause/rewind without saving to permanent disk.',
    imageUrl: img29,
    category: 'Settings & Playlists',
    tag: 'Recording & Timeshift'
  },

  // 5. Household Link & Parental Controls
  {
    id: 'cbr-household-link',
    title: 'Household Link Multi-Device Sync',
    caption: 'Link all FireSticks and Android TVs in your home using a single 4-digit PIN. Syncs favorites, watchlists, and progress automatically.',
    imageUrl: img30,
    category: 'Household & Security',
    tag: 'Household Link'
  },
  {
    id: 'cbr-turn-on-parental-controls',
    title: 'Parental Controls & PIN Protection',
    caption: 'Set a secure 4-digit master PIN to lock adult (18+) categories, hide sensitive international sections, and prevent settings changes.',
    imageUrl: img31,
    category: 'Household & Security',
    tag: 'Parental PIN'
  },
  {
    id: 'cbr-parental-controls-options',
    title: 'Lock Hidden Content & Re-Prompt Timers',
    caption: 'Configure authorization timeout ("Always prompt", 15 min, 30 min, 1 hour) and tap "Lock hidden content now" before handing remote.',
    imageUrl: img32,
    category: 'Household & Security',
    tag: 'Lock Timeout'
  }
];

export const CBR_APP_SETTINGS_GUIDES: AppSettingSection[] = [
  {
    title: 'Critical Initial Setup: DVR vs Timeshift',
    category: 'Essential Setup',
    iconName: 'AlertTriangle',
    recommendedBadge: 'Crucial Guideline',
    summary: 'The single most important rule when setting up CBR TV is how recording and temporary playback are configured.',
    warningNote: 'CRITICAL: Leave Settings → Recording → DVR turned OFF. Scheduled or permanent series DVR recordings consume massive flash storage and are unnecessary when 7-Day Catchup is available.',
    keyInstructions: [
      'Navigate to Settings > Recording.',
      'Ensure "DVR" is toggled OFF (Do not enable scheduled or permanent recording).',
      'Timeshift is optional (Off by default). If you want pause and rewind on Live TV, toggle Timeshift ON.',
      'Select Buffer Duration: 10 to 30 minutes is ideal (~0.6 GB temporary RAM for 10 min 1080p stream).',
      'Timeshift files are temporary and automatically wiped when you switch channels or close the app.'
    ],
    screenshotUrl: img29
  },
  {
    title: 'EPG Settings & TiviMate-Style Remote Mode',
    category: 'EPG & Navigation',
    iconName: 'Tv',
    recommendedBadge: 'Recommended',
    summary: 'Fine-tune your Electronic Program Guide retention and remote navigation habits for the fastest browsing experience.',
    keyInstructions: [
      'Go to Settings > EPG.',
      'Past days to keep EPG: Set to 1 day for Tier 1 (VS), or 3 days for Tier 2/3 (DKO/Trillio). Do not set to 7 days as it slows down low-spec FireSticks.',
      'TiviMate Remote Controls: In CBR TV, pressing Left normally moves to earlier guide times. If you prefer TiviMate behavior, turn ON "Long press Left for earlier programs".',
      'When enabled: Pressing Left once returns instantly to category lists; holding Left opens earlier show catchups!'
    ],
    screenshotUrl: img26
  },
  {
    title: 'General Settings & Startup Behavior',
    category: 'System & Startup',
    iconName: 'Sliders',
    recommendedBadge: 'Quality of Life',
    summary: 'Optimize app launch speed, accidental remote exits, and cinema frame-rate matching.',
    keyInstructions: [
      'Turn on last channel on app start: Toggle ON if you want CBR TV to act like a traditional cable box that resumes your TV immediately upon turning on your TV.',
      'Confirm exit by second press Back: Toggle ON to prevent accidentally closing the app when backing out of channel lists.',
      'Automatic Frame Rate Matching (AFR): Enable to automatically sync your TV refresh rate (50Hz UK, 60Hz US, 24Hz Movies) for perfectly smooth, judder-free motion.'
    ],
    screenshotUrl: img19
  },
  {
    title: 'Sports Hub & Multi-Feed Sports Broadcasts',
    category: 'Live Sports',
    iconName: 'Flame',
    recommendedBadge: '#1 Sports Feature',
    summary: 'CBR TV features an integrated Sports Hub engine that aggregates live matches and connects multiple live feeds per game.',
    keyInstructions: [
      'From the main menu, open Sports Hub to view today’s live football, boxing, F1, NFL, and tennis matches.',
      'Event Details: Highlight any match to see kickoff time, venue, team form, and available broadcasts.',
      'Select "View Broadcasts" to choose from UK Sky/TNT 4K, USA Peacock, TNT Sports, or Canadian TSN feeds.',
      'Sports Hub Settings: Reorder your favorite leagues (e.g. Premier League & Champions League) to the top in Settings > Sports Hub.'
    ],
    screenshotUrl: img16
  },
  {
    title: 'MultiView: Watch up to 4 Live Matches Simultaneously',
    category: 'Live TV & Multi-Screen',
    iconName: 'Layers',
    recommendedBadge: 'Matchday Beast',
    summary: 'Watch up to 4 live events at once on a single screen without changing channels.',
    keyInstructions: [
      'During full-screen Live TV, press OK and press Down to the action row.',
      'Select "MultiView" to add a split screen.',
      'Choose between "Add Screen from TV Guide" (browse categories) or "Add Screen from Sports Hub" (browse live games with red LIVE badges).',
      'Move between screens with arrow keys; press OK on any screen to switch active audio.'
    ],
    screenshotUrl: img07
  },
  {
    title: 'Playlist Customization: Hide Clutter & Reorder Channels',
    category: 'Playlists & Organization',
    iconName: 'Sliders',
    recommendedBadge: 'Organization',
    summary: 'Easily remove hundreds of foreign or unneeded language packages so your channel guide is lightning-fast and tailored to you.',
    keyInstructions: [
      'Navigate to Settings > Playlists > Select your active playlist.',
      'Select "Category Customization" > "Hide categories" to uncheck languages or sections you never watch.',
      'Select "Reorder categories" to place UK Sky Entertainment, UK Sports, and 4K UHD VIP at the very top.',
      'In "Channel customization", star your primary daily channels to build your 1-click Favorites lineup.'
    ],
    screenshotUrl: img21
  },
  {
    title: 'Household Link: Multi-Room TV Sync via 4-Digit PIN',
    category: 'Multi-Room Sync',
    iconName: 'Activity',
    recommendedBadge: 'Smart Sync',
    summary: 'Sync your playlists, watch history, favorites, and resume points across every TV in your home without entering server URLs or passwords again.',
    keyInstructions: [
      'Step 1 (Main TV): Set up your playlist on your first TV. Go to Settings > Household Link, toggle ON, and set a 4-digit pairing PIN.',
      'Step 2 (Secondary TV): Install CBR TV on any other FireStick or Android TV connected to the same home Wi-Fi network.',
      'Open Household Link on the second TV, select "Link to existing device", enter the 4-digit PIN, and your entire setup syncs automatically!'
    ],
    screenshotUrl: img30
  },
  {
    title: 'Parental Controls & Category PIN Locking',
    category: 'Security & Family',
    iconName: 'ShieldCheck',
    recommendedBadge: 'Family Safe',
    summary: 'Safely lock adult (18+) categories, PPV, or specific groups behind a protected 4-digit master PIN.',
    keyInstructions: [
      'Go to Settings > Parental Controls > Toggle ON.',
      'Set and confirm your 4-digit Master PIN.',
      'Select the adult or sensitive categories you wish to hide from children.',
      'Set "Require PIN again" timer (e.g. Always prompt, or 15/30 minute timeout).',
      'Click "Lock hidden content now" before handing the remote control to family members.'
    ],
    screenshotUrl: img31
  }
];

export const CBR_REMOTE_SHORTCUTS: RemoteShortcut[] = [
  {
    key: 'Single Tap OK',
    action: 'Channel Preview',
    description: 'Tapping OK on any channel in the EPG grid loads a live preview in the top-right banner.'
  },
  {
    key: 'Double Tap OK or Hold OK',
    action: 'Enter Full Screen',
    description: 'Expands the playing preview into full-screen immersive 4K/60FPS video.'
  },
  {
    key: 'OK (in Fullscreen)',
    action: 'Info Overlay & Recent Channels',
    description: 'Shows program progress, synopsis, resolution, and horizontal recent channels row.'
  },
  {
    key: 'Down Arrow (in Fullscreen)',
    action: 'Action Controls Row',
    description: 'Opens MultiView button, Subtitles/CC toggle, Audio track selector, and Favorite star.'
  },
  {
    key: 'Back Button',
    action: 'Return to Categories',
    description: 'Closes overlays or returns from the channel list back to the main category directory.'
  },
  {
    key: 'Left Arrow (Standard)',
    action: 'Earlier EPG Catchup',
    description: 'Moves left in the guide to replay past aired programs on catchup-enabled channels.'
  },
  {
    key: 'Left Arrow (TiviMate Mode)',
    action: 'Tap Left = Categories, Hold Left = Catchup',
    description: 'Activated by toggling "Long press Left for earlier programs" in Settings > EPG.'
  },
  {
    key: 'Left / Right (in Playback)',
    action: 'Quick Skip (-10s / +10s)',
    description: 'Jumps backward or forward through Timeshift buffers, catchup replays, and VOD movies.'
  }
];

export const CBR_TV_OFFICIAL_GUIDE: DetailedSetupGuide = {
  id: 'guide-cbr-tv',
  slug: 'cbr-tv',
  title: 'CBR TV Official App Setup & Complete Settings Guide (FireStick & Android TV)',
  shortTitle: 'CBR TV Official',
  deviceCategory: 'firestick',
  deviceCategoryLabel: 'Amazon FireStick & Android TV',
  playerName: 'CBR TV (Official App)',
  playerType: 'Official High-Performance Media Engine',
  icon: 'Flame',
  appLogo: img01,
  difficulty: 'Easy',
  timeEstimate: '2 Mins',
  rating: 5.0,
  reviewsCount: '4,890+ verified reviews',
  verifiedDate: 'November 2026',
  badge: '⭐ Our Official Recommended App',
  popular: true,
  isOfficialApp: true,
  officialBadge: 'Official StreamUK Application',
  downloaderCode: '626198',
  appUrl: 'https://streamuk.vip/cbr-tv.apk',
  summary: 'CBR TV is our flagship, official media player built specifically for Amazon FireStick, Fire TV Cube, Google TV, and Android TV (Nvidia Shield). Engineered on the celebrated Boss Media Player (Jrod edition v1.0.39), it delivers ultra-fast channel zapping, cable-style TV guide, up to 4-screen MultiView, an integrated Sports Hub with multiple live feeds, seamless 7-day catchup, local Timeshift buffer, and revolutionary Household Link multi-TV sync.',
  targetKeywords: [
    'cbr tv official app',
    'cbr tv firestick setup',
    'cbr tv android tv install',
    'boss media player jrod edition guide',
    'cbr tv downloader code',
    'cbr tv settings timeshift dvr',
    'cbr tv sports hub multiview',
    'cbr tv household link pairing pin'
  ],
  loginType: 'xtream_codes',
  sampleConfig: {
    serverUrl: 'http://uk-premium.streamdns.me:8080',
    username: 'cbr_user9482',
    password: '••••••••••••'
  },
  steps: [
    {
      stepNumber: 1,
      title: 'Enable Apps from Unknown Sources on FireStick / Android TV',
      description: 'On your FireStick, go to Settings > My Fire TV > Developer Options and turn "Install Unknown Apps" ON for Downloader. (If Developer Options is hidden on Fire OS, click Settings > My Fire TV > About and press OK on your device name 7 times rapidly until you see "You are now a developer"). On Android TV, open Settings > Device Preferences > Security & Restrictions.',
      tip: 'This allows you to safely install high-performance streaming engines not hosted in the default Amazon store.'
    },
    {
      stepNumber: 2,
      title: 'Open Downloader App',
      description: 'Search for the orange "Downloader" app from the Amazon Appstore or Google Play Store and install it. Launch Downloader and permit storage access.',
      codeOrValue: 'Downloader',
      tip: 'Downloader is 100% free and developed by AFTVnews.'
    },
    {
      stepNumber: 3,
      title: 'Enter Official CBR TV Downloader Code: 626198',
      description: 'In the URL / Search field of Downloader, enter the official CBR TV shortcode: 626198 (or direct mirror URL: https://streamuk.vip/cbr-tv.apk) and press "Go".',
      codeOrValue: '626198',
      actionUrl: 'https://streamuk.vip/cbr-tv.apk',
      tip: 'The official CBR TV (Boss Media Player Jrod edition) APK will download directly onto your device.'
    },
    {
      stepNumber: 4,
      title: 'Install CBR TV Application',
      description: 'When the download completes, a prompt will appear asking to install the app. Click "Install" in the bottom-right corner, then click "Open".',
      tip: 'You can delete the APK file when Downloader asks afterwards to keep your FireStick storage clean.'
    },
    {
      stepNumber: 5,
      title: 'Select "Add Playlist" & Choose Xtream Codes API',
      description: 'On the CBR TV welcome screen, select "Add Playlist". Choose the Xtream Codes API login method for the fastest connection and automated EPG guide syncing.',
      tip: 'If setting up a secondary TV in your house, see Step 10 below for 1-click Household Link pairing instead!'
    },
    {
      stepNumber: 6,
      title: 'Enter Your StreamUK Account Credentials',
      description: 'Type in a Playlist Name (e.g. "StreamUK VIP"), your Server URL (e.g. http://uk-premium.streamdns.me:8080), Username, and Password sent in your instant trial or order confirmation email.',
      tip: 'Leave "Include VOD & EPG" checked so movies, series, and program schedules populate automatically.'
    },
    {
      stepNumber: 7,
      title: 'Apply Critical Recording & Timeshift Setting',
      description: 'IMPORTANT: Go to Settings > Recording. Ensure "DVR" is toggled OFF (DVR is for permanent recordings and unnecessary). If you want pause and rewind on Live TV, turn "Timeshift" ON and choose a buffer of 10 to 30 minutes.',
      tip: 'Timeshift uses temporary device memory (~0.6 GB per 10 mins) and clears cleanly whenever you switch channels.'
    },
    {
      stepNumber: 8,
      title: 'Configure EPG Past Days & Navigation Habits',
      description: 'Go to Settings > EPG. Set "Past days to keep EPG" to 1 day for Tier 1 or 3 days for Tier 2/3. If you love TiviMate remote controls, enable "Long press Left for earlier programs" so tapping Left takes you straight back to channel categories!',
      tip: 'This makes switching between sports categories effortless.'
    },
    {
      stepNumber: 9,
      title: 'Explore Sports Hub & 4-Screen MultiView',
      description: 'From the main screen, tap "Sports Hub" to browse today’s football matches and choose from multiple broadcast feeds. During any live game, press OK > Down > "MultiView" to watch up to 4 games simultaneously on your TV!',
      tip: 'Use direction arrows to change audio between active split screens.'
    },
    {
      stepNumber: 10,
      title: 'Optional: Pair Multiple TVs with Household Link',
      description: 'Have a second TV in the bedroom or living room? Open Settings > Household Link on your primary TV, turn it ON, and set a 4-digit PIN. On your second TV, simply open Household Link and pair using the PIN — no need to re-enter usernames or URLs!',
      tip: 'Syncs your favorite channels, watch history, and movie progress across all TVs.'
    }
  ],
  recommendedSettings: [
    {
      setting: 'Recording Settings (CRITICAL)',
      value: 'DVR: OFF | Timeshift: Optional (10-30 min)',
      explanation: 'Never enable scheduled DVR. Use Timeshift for live pause/rewind or use 7-Day Catchup.'
    },
    {
      setting: 'EPG Past Days Retention',
      value: '1 Day (Tier 1) / 3 Days (Tier 2 & 3)',
      explanation: 'Prevents database bloat on low-storage FireSticks while keeping full schedule accuracy.'
    },
    {
      setting: 'Long Press Left in EPG',
      value: 'ENABLED (TiviMate Style)',
      explanation: 'Single tap Left returns to categories; hold Left enters past catchup shows.'
    },
    {
      setting: 'Startup Behavior',
      value: 'Turn on last channel on app start: ON',
      explanation: 'Instant TV experience — starts playing your favorite live channel immediately upon launch.'
    },
    {
      setting: 'Confirm Exit on Second Back',
      value: 'ENABLED',
      explanation: 'Prevents accidentally quitting CBR TV when navigating backwards through channel menus.'
    },
    {
      setting: 'VOD Watched Threshold',
      value: '92% Movies / 90% TV Shows',
      explanation: 'Automatically marks cinema titles as watched before end-credit sequences begin.'
    }
  ],
  remoteShortcuts: CBR_REMOTE_SHORTCUTS,
  screenshotsGallery: CBR_TV_SCREENSHOTS,
  appSettingsSections: CBR_APP_SETTINGS_GUIDES,
  pros: [
    'Official StreamUK supported app with 100% server line compatibility',
    'Ultra-fast zapping engine powered by Boss Media Player Jrod edition v1.0.39',
    'Dedicated Sports Hub aggregating all today’s football, F1, boxing & NFL fixtures',
    'Up to 4-screen MultiView with dual picker (TV Guide or Live Sports Hub)',
    'Revolutionary Household Link multi-device sync via simple 4-digit PIN',
    'Built-in 7-Day Catchup and local temporary Timeshift pause & rewind',
    'Full Parental Controls PIN locking for 18+ adult categories and settings'
  ],
  faqs: [
    {
      q: 'Why is CBR TV our official recommended app for FireStick & Android TV?',
      a: 'CBR TV is customized and optimized specifically for our high-speed 10Gbps UK streaming architecture. Unlike generic players that frequently crash or struggle with 4K 60FPS feeds, CBR TV incorporates hardware video decoders, instant Sports Hub match selection, TiviMate-style controls, and seamless Household Link multi-room synchronization.'
    },
    {
      q: 'Why should I leave DVR turned OFF in Settings > Recording?',
      a: 'DVR in CBR TV is designed for writing permanent, multi-gigabyte video files onto local storage. Most FireSticks only have 4GB to 8GB of internal storage, which can quickly fill up and crash the operating system. Instead, our servers already store 7 days of full catchup in the cloud at zero storage cost! You can safely enable Timeshift (which uses a small temporary buffer of ~0.6GB for pause and rewind) while keeping DVR off.'
    },
    {
      q: 'How do I use MultiView to watch multiple football games at once?',
      a: 'While watching any full-screen channel, press the OK button on your remote, then press Down to the action row and select "MultiView". You can pick another channel from the TV Guide or pick directly from live matches with red LIVE badges in the Sports Hub. You can view 2, 3, or 4 screens simultaneously and use directional buttons to switch audio between them.'
    },
    {
      q: 'How does Household Link sync work across multiple TVs?',
      a: 'Household Link allows you to connect multiple FireSticks or Android TVs in the same home on Wi-Fi. Turn Household Link ON in Settings on TV #1 and create a 4-digit PIN. On TV #2, install CBR TV and connect using that PIN. Your channels, playlists, favorite star lists, watch history, and resume points sync automatically without typing your server URL or password again!'
    },
    {
      q: 'Can I lock adult 18+ channels and sensitive categories?',
      a: 'Yes! Go to Settings > Parental Controls, toggle it ON, and set a 4-digit master PIN. You can then hide adult or sensitive foreign categories, choose a re-prompt timer (e.g. Always prompt or 30-minute timeout), and click "Lock hidden content now" before handing the remote control over to others.'
    }
  ]
};

// Android TV variant of the official guide
export const CBR_TV_OFFICIAL_GUIDE_ANDROID: DetailedSetupGuide = {
  ...CBR_TV_OFFICIAL_GUIDE,
  id: 'guide-cbr-tv-android',
  slug: 'android-tv-cbr-tv',
  title: 'CBR TV Official App Setup Guide for Android TV, Google TV & Shield',
  deviceCategory: 'android-tv',
  deviceCategoryLabel: 'Android TV & Google TV',
  downloaderCode: '626198',
  appUrl: 'https://streamuk.vip/cbr-tv.apk',
};

// FireStick alias variant of the official guide
export const CBR_TV_OFFICIAL_GUIDE_FIRESTICK: DetailedSetupGuide = {
  ...CBR_TV_OFFICIAL_GUIDE,
  id: 'guide-cbr-tv-firestick',
  slug: 'firestick-cbr-tv',
  title: 'CBR TV Official App Setup Guide for Amazon FireStick & Fire TV 4K',
  deviceCategory: 'firestick',
  deviceCategoryLabel: 'Amazon FireStick & Fire TV',
  downloaderCode: '626198',
  appUrl: 'https://streamuk.vip/cbr-tv.apk',
};
