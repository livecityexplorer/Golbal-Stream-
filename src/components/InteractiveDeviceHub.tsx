import React, { useState } from 'react';
import { 
  Tv, 
  Flame, 
  Smartphone, 
  Monitor, 
  Laptop, 
  Box, 
  Copy, 
  Check, 
  Download, 
  PlayCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  ExternalLink,
  ChevronRight,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export interface DeviceGuideItem {
  id: string;
  name: string;
  popularLabel: string;
  badge?: string;
  iconType: string;
  downloaderCode?: string;
  recommendedApp: string;
  setupTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Fast';
  steps: {
    step: number;
    title: string;
    description: string;
    actionHighlight?: string;
  }[];
  proTips: string[];
  codecTip: string;
}

export const DEVICE_GUIDES_DATA: DeviceGuideItem[] = [
  {
    id: 'firestick',
    name: 'Amazon FireStick 4K / Cube',
    popularLabel: 'Most Popular UK Device',
    badge: '#1 UK Choice',
    iconType: 'flame',
    downloaderCode: '842013',
    recommendedApp: 'IPTV Smarters Pro / TiviMate 4K',
    setupTime: '2 Minutes',
    difficulty: 'Beginner',
    steps: [
      {
        step: 1,
        title: 'Install Downloader App',
        description: 'From FireStick Home Screen, go to Find > Search > type "Downloader" and install the orange Downloader app by AFTVnews.',
        actionHighlight: 'Search "Downloader" on Fire TV app store'
      },
      {
        step: 2,
        title: 'Enable Developer Options',
        description: 'Go to Settings > My Fire TV > About > click "Fire TV Stick" 7 times to unlock Developer Options > Install unknown apps > Turn Downloader ON.',
        actionHighlight: 'Settings > My Fire TV > Developer Options'
      },
      {
        step: 3,
        title: 'Enter Downloader Short Code',
        description: 'Open Downloader, enter short code 842013 into the URL bar, and press GO. The official GlobalStreamHub 4K Player APK will auto-download and install.',
        actionHighlight: 'Code: 842013'
      },
      {
        step: 4,
        title: 'Log in with Trial or VIP Credentials',
        description: 'Open the installed player, choose "Login with Xtream Codes API", and enter your Server URL, Username, and Password received instantly via WhatsApp/Email.',
        actionHighlight: 'Server URL + Username + Password'
      }
    ],
    proTips: [
      'Set Video Player Buffer size to "Large" in TiviMate settings for 100% zero-buffering 4K Premier League streams.',
      'Always connect to 5GHz Wi-Fi or use an Amazon Ethernet adapter for uncompressed 60FPS sports feeds.',
      'No VPN required on GlobalStreamHub VIP servers (built-in ISP anti-throttling cluster).'
    ],
    codecTip: 'Select "Hardware Decoder (HW+)" in App Settings for smooth 60FPS 4K HDR playback.'
  },
  {
    id: 'samsung-lg-smarttv',
    name: 'Samsung & LG Smart TV',
    popularLabel: 'Tizen OS & webOS',
    badge: 'No FireStick Required',
    iconType: 'tv',
    recommendedApp: 'IBO Player / Nanomid / Smart IPTV',
    setupTime: '3 Minutes',
    difficulty: 'Beginner',
    steps: [
      {
        step: 1,
        title: 'Search App Store on TV',
        description: 'Open Samsung App Store (Tizen) or LG Content Store (webOS), search for "IBO Player" or "Smart IPTV", and install the application.',
        actionHighlight: 'Install "IBO Player" directly from TV Store'
      },
      {
        step: 2,
        title: 'Note MAC & Device Key',
        description: 'Launch IBO Player on your TV. The home screen will show your unique Device MAC Address and Device Key.',
        actionHighlight: 'Example: MAC: 00:1A:79:XX:XX:XX'
      },
      {
        step: 3,
        title: 'Upload M3U Playlist or Send to Us',
        description: 'Visit iboplayer.com/upload or send your MAC address to our 24/7 WhatsApp support to have our team activate and link your full 4K playlist instantly.',
        actionHighlight: 'Instant remote portal sync'
      },
      {
        step: 4,
        title: 'Restart App & Enjoy 4K TV Guide',
        description: 'Press "Reload" on IBO Player. All 18,500+ UK, US, CA channels and 65,000+ VODs will appear with full 7-day electronic program guide (EPG).',
        actionHighlight: 'Full EPG & Category auto-load'
      }
    ],
    proTips: [
      'Samsung & LG TVs support native 4K UHD 60FPS decoding without needing any external HDMI stick.',
      'Enable "Auto-Update EPG every 24 hours" in IBO Player settings for up-to-the-minute match listings.'
    ],
    codecTip: 'Leave Video Decoder on "Auto (System Native)" for optimal Tizen/webOS performance.'
  },
  {
    id: 'android-google-tv',
    name: 'Android TV / Google TV / Shield',
    popularLabel: 'Sony, Philips, TCL, Nvidia Shield',
    badge: 'Direct Google Play',
    iconType: 'monitor',
    downloaderCode: '289018',
    recommendedApp: 'TiviMate IPTV Premium / Sparkle TV',
    setupTime: '2 Minutes',
    difficulty: 'Fast',
    steps: [
      {
        step: 1,
        title: 'Install TiviMate from Play Store',
        description: 'Open the Google Play Store on your Android TV or Nvidia Shield Pro, search for "TiviMate IPTV Player", and click Install.',
        actionHighlight: 'Direct Play Store install'
      },
      {
        step: 2,
        title: 'Add New Playlist',
        description: 'Open TiviMate > Select "Add Playlist" > Choose "Xtream Codes" login method for fastest channel loading and VOD poster art.',
        actionHighlight: 'Choose Xtream Codes'
      },
      {
        step: 3,
        title: 'Enter VIP Server Details',
        description: 'Type your GlobalStreamHub VIP Server Address, Username, and Password. Check "Include VOD" and click Apply.',
        actionHighlight: 'Auto-syncs 18,500+ channels'
      },
      {
        step: 4,
        title: 'Enjoy TV Guide & Catch-up',
        description: 'TiviMate will download the full 7-day UK TV guide. You can now pause, rewind, and watch catch-up on all major BBC, ITV, and Sky feeds.',
        actionHighlight: '7-Day Catch-Up Ready'
      }
    ],
    proTips: [
      'Nvidia Shield Pro is the best hardware for AI-upscaling 1080p sports streams to crisp 4K 60FPS.',
      'TiviMate allows Multi-View: watch up to 4 football games simultaneously on one screen!'
    ],
    codecTip: 'Enable "AFR (Auto Frame Rate Matching)" in TiviMate for butter-smooth 50Hz/60Hz sports motion.'
  },
  {
    id: 'apple-tv-ios',
    name: 'Apple TV 4K / iPhone / iPad',
    popularLabel: 'tvOS & iOS Ecosystem',
    badge: 'Official App Store',
    iconType: 'laptop',
    recommendedApp: 'IPTVX / GSE Smart IPTV / Smarters Lite',
    setupTime: '2 Minutes',
    difficulty: 'Fast',
    steps: [
      {
        step: 1,
        title: 'Download App from Apple App Store',
        description: 'Open App Store on Apple TV 4K or iPhone, search for "IPTVX" or "Smarters Player Lite", and install.',
        actionHighlight: 'Official Apple App Store'
      },
      {
        step: 2,
        title: 'Add Xtream Codes Connection',
        description: 'Launch the app, tap "Add Account" or "+" > Select "Xtream Codes API".',
        actionHighlight: 'Xtream Codes API Login'
      },
      {
        step: 3,
        title: 'Enter Your GlobalStreamHub Login',
        description: 'Fill in Server URL, Username, and Password provided upon trial request or checkout.',
        actionHighlight: 'Instant iCloud sync across devices'
      },
      {
        step: 4,
        title: 'Experience Dolby Vision & Spatial Audio',
        description: 'GlobalStreamHub 4K streams take full advantage of Apple TV A15 Bionic processor with Dolby 5.1 audio feeds.',
        actionHighlight: 'Dolby Atmos 5.1 Ready'
      }
    ],
    proTips: [
      'IPTVX on Apple TV provides an interface that looks and feels just like Netflix and Apple TV+.',
      'Your favorites and watch progress automatically sync between Apple TV, iPad, and iPhone via iCloud.'
    ],
    codecTip: 'Use "VLC Engine / Metal Accelerated" inside IPTVX for maximum audio/video fidelity.'
  },
  {
    id: 'mag-formuler',
    name: 'Formuler Z11 & MAG Boxes',
    popularLabel: 'Dedicated IPTV Stalker Hardware',
    badge: 'Pro Hardware',
    iconType: 'box',
    recommendedApp: 'MyTVOnline 3 (MOL3) / Stalker Portal',
    setupTime: '2 Minutes',
    difficulty: 'Beginner',
    steps: [
      {
        step: 1,
        title: 'Open MyTVOnline 3 / Portal Setup',
        description: 'On your Formuler Z11 Pro Max or MAG box, open Settings > Connections / Content Manager > Add Portal.',
        actionHighlight: 'Add Portal / Stalker MAC'
      },
      {
        step: 2,
        title: 'Enter Stalker Portal URL',
        description: 'Enter the GlobalStreamHub VIP MAG/Stalker portal URL (provided in your activation email or WhatsApp).',
        actionHighlight: 'http://mag.globalstreamhub.net:8080/c/'
      },
      {
        step: 3,
        title: 'Submit MAC Address',
        description: 'Provide your device MAC Address (starting with 00:1A:79:...) to our activation system or support team.',
        actionHighlight: '00:1A:79:XX:XX:XX'
      },
      {
        step: 4,
        title: 'Reboot & Enjoy Dedicated Remote Control',
        description: 'Save settings and reboot. Channels, VOD, and EPG load with Formuler tactile remote controls (Red/Green/Yellow/Blue keys).',
        actionHighlight: 'Fast Zap Speed (<0.3s)'
      }
    ],
    proTips: [
      'Formuler MyTVOnline 3 features the fastest channel zapping speed (<0.3s) in the industry.',
      'Supports scheduled USB PVR recording of live matchday games while watching another channel.'
    ],
    codecTip: 'Set buffer to "Normal (1.5s)" in MYTVOnline settings for seamless live channel switching.'
  }
];

export const POPULAR_DOWNLOADER_CODES = [
  { name: 'GlobalStreamHub 4K Custom Player', code: '842013', desc: 'Direct 4K APK with pre-loaded Global TV Guide' },
  { name: 'TiviMate IPTV Player Premium', code: '289018', desc: 'Top rated player for FireStick & Android TV' },
  { name: 'IPTV Smarters Pro v3.1.5', code: '914207', desc: 'Clean multi-screen UI with Catch-up & VOD' },
  { name: 'XCIPTV Player Official 4K', code: '762019', desc: 'Fast, responsive player with built-in backup EPG' },
  { name: 'IBO Player Smart TV App', code: '541890', desc: 'For Android boxes & Fire TV devices' }
];

interface InteractiveDeviceHubProps {
  onSelectPlan: (planId: string) => void;
  whatsappNumber?: string;
}

export const InteractiveDeviceHub: React.FC<InteractiveDeviceHubProps> = ({
  onSelectPlan,
  whatsappNumber = '+44 7731 454811'
}) => {
  const { t } = useTranslation();
  const [selectedDevice, setSelectedDevice] = useState<string>('firestick');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isCodesExpanded, setIsCodesExpanded] = useState<boolean>(false);
  const [isStepsExpanded, setIsStepsExpanded] = useState<boolean>(false);
  const [isTipsExpanded, setIsTipsExpanded] = useState<boolean>(false);

  const currentGuide = DEVICE_GUIDES_DATA.find(d => d.id === selectedDevice) || DEVICE_GUIDES_DATA[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'tv': return <Tv className="w-5 h-5 text-sky-400" />;
      case 'monitor': return <Monitor className="w-5 h-5 text-emerald-400" />;
      case 'laptop': return <Laptop className="w-5 h-5 text-indigo-400" />;
      case 'box': return <Box className="w-5 h-5 text-purple-400" />;
      default: return <Smartphone className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="setup" className="py-16 sm:py-20 bg-slate-950/80 relative overflow-hidden border-t border-b border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Interactive Device Hub & Downloader Codes</span>
          </div>
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Setup on Any Device in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">Under 2 Minutes</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
            Follow our verified step-by-step guides with official Downloader short codes, zero-buffering player settings, and instant 24H trial activation.
          </p>
        </div>

        {/* Downloader Fast Codes Bar */}
        <div className="mb-10 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                  <span>Official FireStick Downloader Short Codes</span>
                  <span className="px-2 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 rounded font-semibold border border-amber-500/30">Verified 2026</span>
                </h3>
                <p className="text-xs text-slate-300">Type any code directly into the Downloader app URL bar on Fire TV or Android TV:</p>
              </div>
            </div>
            <a 
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi, I need help with FireStick Downloader code setup')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-colors shrink-0"
            >
              <span>Need Remote Setup Help?</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>

          {/* Codes Grid with Mobile Expand/Collapse */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {POPULAR_DOWNLOADER_CODES.map((item, idx) => {
              const isHiddenOnMobile = !isCodesExpanded && idx >= 2;
              return (
                <div 
                  key={item.code} 
                  className={`bg-slate-950/70 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between hover:border-amber-400/40 transition-all group ${
                    isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-amber-300 transition-colors">{item.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3 line-clamp-2 leading-tight">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-900/90 rounded-lg px-2.5 py-1.5 border border-white/5">
                    <span className="font-mono text-sm font-bold text-amber-400">{item.code}</span>
                    <button
                      onClick={() => handleCopyCode(item.code)}
                      className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors text-xs flex items-center gap-1 cursor-pointer min-h-[36px]"
                      title="Copy Downloader Code"
                    >
                      {copiedCode === item.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Toggle Button for Downloader Codes */}
          <div className="mt-4 flex sm:hidden justify-center">
            <button
              onClick={() => setIsCodesExpanded(!isCodesExpanded)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2 hover:bg-amber-500/10 active:scale-95 transition-all cursor-pointer"
            >
              {isCodesExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>Show Fewer Codes</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Show All 5 Downloader Codes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Device Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {DEVICE_GUIDES_DATA.map((device) => {
            const isSelected = selectedDevice === device.id;
            return (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                  isSelected 
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white border-sky-400/50 shadow-lg shadow-sky-500/20' 
                    : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border-white/10 hover:border-white/20'
                }`}
              >
                {getIcon(device.iconType)}
                <div className="text-left">
                  <div className="font-semibold flex items-center gap-1.5">
                    <span>{device.name}</span>
                    {device.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-sky-500/20 text-sky-300'
                      }`}>
                        {device.badge}
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                    {device.popularLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Guide Card */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-8 shadow-2xl backdrop-blur-md">
          
          {/* Guide Top Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/30 flex items-center justify-center shrink-0">
                {getIcon(currentGuide.iconType)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2 flex-wrap">
                  <span>{currentGuide.name} Installation Guide</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold">
                    {currentGuide.setupTime} Setup
                  </span>
                </h3>
                <p className="text-slate-300 text-sm">
                  Recommended Player App: <span className="font-semibold text-sky-400">{currentGuide.recommendedApp}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {currentGuide.downloaderCode && (
                <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-amber-500/30">
                  <span className="text-xs text-slate-400">Downloader Code:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{currentGuide.downloaderCode}</span>
                  <button
                    onClick={() => handleCopyCode(currentGuide.downloaderCode!)}
                    className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedCode === currentGuide.downloaderCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
              <button
                onClick={() => onSelectPlan('trial-24h')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Test on this Device (Free 24H)</span>
              </button>
            </div>
          </div>

          {/* Steps Grid with Mobile Expand/Collapse */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {currentGuide.steps.map((step, idx) => {
              const isHiddenOnMobile = !isStepsExpanded && idx >= 2;
              return (
                <div 
                  key={step.step}
                  className={`bg-slate-950/60 border border-white/5 rounded-xl p-4 sm:p-5 hover:border-sky-500/30 transition-all flex flex-col justify-between group ${
                    isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
                      <span className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <h4 className="font-bold text-slate-100 text-sm sm:text-base group-hover:text-sky-300 transition-colors">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {step.description}
                    </p>
                  </div>
                  {step.actionHighlight && (
                    <div className="text-[11px] bg-sky-950/40 border border-sky-500/20 rounded-lg px-3 py-1.5 text-sky-300 font-mono flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-sky-400 shrink-0" />
                      <span className="truncate">{step.actionHighlight}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Toggle Button for Setup Steps */}
          {currentGuide.steps.length > 2 && (
            <div className="mb-6 flex sm:hidden justify-center">
              <button
                onClick={() => setIsStepsExpanded(!isStepsExpanded)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-950 border border-sky-500/30 text-sky-300 text-xs font-bold flex items-center gap-2 hover:bg-sky-500/10 active:scale-95 transition-all cursor-pointer"
              >
                {isStepsExpanded ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
                    <span>Show Fewer Steps</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
                    <span>Show All {currentGuide.steps.length} Setup Steps (+{currentGuide.steps.length - 2} More)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Pro Tips & Codec Optimization Box */}
          <div className="bg-gradient-to-r from-indigo-950/30 via-slate-950/50 to-purple-950/30 border border-indigo-500/20 rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Pro Performance & Anti-Buffer Settings</span>
              </h4>
              <button
                onClick={() => setIsTipsExpanded(!isTipsExpanded)}
                className="sm:hidden text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer min-h-[36px] px-2"
              >
                <span>{isTipsExpanded ? 'Hide' : 'View Tips'}</span>
                {isTipsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className={`space-y-2 mb-4 ${isTipsExpanded ? 'block' : 'hidden sm:block'}`}>
              {currentGuide.proTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-indigo-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{currentGuide.codecTip}</span>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <span>Need help setting up your credentials? Our UK team is live on WhatsApp 24/7.</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm setting up my ${currentGuide.name} and would like 24h trial credentials.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-2"
              >
                <span>WhatsApp Setup Desk</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
              <button
                onClick={() => onSelectPlan('12-months')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Get VIP Subscription</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
