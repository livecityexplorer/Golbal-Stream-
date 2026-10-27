export type Currency = 'GBP' | 'EUR' | 'USD' | 'CAD';
export type SupportedLanguage = 'en' | 'fr' | 'de' | 'es' | 'it';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface PlanPricing {
  id: string;
  name: string;
  durationMonths: number;
  durationLabel: string;
  priceGBP: number;
  priceEUR: number;
  priceUSD: number;
  priceCAD?: number;
  originalPriceGBP: number;
  badge?: string;
  popular?: boolean;
  bestValue?: boolean;
  savingsPercentage: number;
  features: string[];
}

export interface ChannelCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  badge?: string;
}

export interface ChannelItem {
  id: string;
  name: string;
  category: string;
  resolution: '4K UHD' | 'FHD 1080p' | 'HD 720p';
  fps: number;
  country: string;
  flag: string;
  logoUrl?: string;
  currentProgram: string;
  nextProgram: string;
  catchupAvailable: boolean;
  epgAvailable: boolean;
  isPopular?: boolean;
}

export interface VodItem {
  id: string;
  title: string;
  category: 'tmdb_movies' | 'tmdb_series' | 'uk_boxsets' | 'us_canada_hits' | 'movies' | 'series' | 'sports_replays';
  genre: string[];
  year: number;
  rating: string;
  imdbScore: number;
  tmdbScore: number;
  tmdbRank?: number;
  tmdbVotes?: string;
  quality: '4K HDR' | '4K UHD' | 'FHD 1080p';
  duration: string;
  thumbnail: string;
  description: string;
  audio: string;
  network?: string;
  badge?: string;
}

export interface SportsFixture {
  id: string;
  league: string;
  leagueKey: string;
  homeTeam: string;
  awayTeam: string;
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

export interface SetupStep {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
  codeOrValue?: string;
  actionUrl?: string;
}

export interface SetupFaq {
  q: string;
  a: string;
}

export interface SetupSettingRecommendation {
  setting: string;
  value: string;
  explanation: string;
}

export type DeviceCategoryType = 
  | 'firestick' 
  | 'android-tv' 
  | 'apple' 
  | 'smart-tv' 
  | 'formuler-mag' 
  | 'pc-web';

export interface RemoteShortcut {
  key: string;
  action: string;
  description: string;
}

export interface DownloaderCodeItem {
  code: string;
  name: string;
  device: string;
  version: string;
  badge?: string;
  directUrl: string;
  category: 'Official' | 'EPG Kings' | 'Classic' | 'Tools';
  iconUrl?: string;
}

export interface DetailedSetupGuide {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  deviceCategory: DeviceCategoryType;
  deviceCategoryLabel: string;
  playerName: string;
  playerType: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Quick';
  timeEstimate: string;
  rating: number;
  reviewsCount?: string;
  verifiedDate: string;
  badge?: string;
  popular?: boolean;
  downloaderCode?: string;
  appUrl?: string;
  appLogo?: string;
  summary: string;
  targetKeywords: string[];
  loginType: 'xtream_codes' | 'm3u_url' | 'mac_portal' | 'webtv';
  sampleConfig: {
    serverUrl?: string;
    portalUrl?: string;
    macFormat?: string;
    username?: string;
    password?: string;
    m3uFormat?: string;
  };
  steps: SetupStep[];
  recommendedSettings?: SetupSettingRecommendation[];
  remoteShortcuts?: RemoteShortcut[];
  faqs?: SetupFaq[];
  pros?: string[];
}

export interface DeviceGuide {
  id: string;
  name: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Quick';
  timeEstimate: string;
  recommendedApp: string;
  appUrl?: string;
  downloaderCode?: string;
  steps: {
    title: string;
    description: string;
    tip?: string;
  }[];
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  countryFlag: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  isp: string;
  planName?: string;
  deviceUsed?: string;
  helpfulCount?: number;
  category?: 'sports' | 'broadband' | 'devices' | 'vod' | 'support';
  experienceDate?: string;
  avatarColor?: string;
}

export interface ThemeCustomization {
  brandName: string;
  brandTagline: string;
  accentColor: string;
  accentColorName: 'cyan' | 'emerald' | 'amber' | 'purple' | 'red';
  whatsappNumber: string;
  telegramUser: string;
  supportEmail: string;
  currency: Currency;
  bannerNotice: string;
  showAdultContent: boolean;
  btcWalletAddress?: string;
  ethWalletAddress?: string;
  usdtTrc20Address?: string;
  usdtErc20Address?: string;
  discordUrl?: string;
}

export interface ThemeFile {
  filename: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export type CookieRegionMode = 'gdpr' | 'ccpa' | 'global';

export interface CookiePreferences {
  strictlyNecessary: boolean;
  localization: boolean;
  analytics: boolean;
  regionMode: CookieRegionMode;
  timestamp?: number;
}

export type BlogCategory = 'all' | 'channel_updates' | 'sports_fixtures' | 'setup_guides' | 'industry_news';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'channel_updates' | 'sports_fixtures' | 'setup_guides' | 'industry_news';
  categoryLabel: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  tags: string[];
  targetKeywords: string[];
  geoFocus: 'UK' | 'USA' | 'Canada' | 'Global';
  featured?: boolean;
  content: {
    summary: string;
    keyTakeaways: string[];
    sections: {
      heading: string;
      subheading?: string;
      body?: string[];
      listItems?: string[];
      tipBox?: string;
      codeOrParams?: string;
    }[];
    faq?: {
      q: string;
      a: string;
    }[];
  };
}
