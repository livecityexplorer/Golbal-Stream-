import React, { useState, useMemo } from 'react';
import { 
  ALL_SETUP_GUIDES, 
  DEVICE_CATEGORIES, 
  DOWNLOADER_SHORTCODES_VAULT,
  UK_ISP_OPTIMIZATIONS 
} from '../../data/setupGuidesData';
import { ShareReferralBar } from '../ShareReferralBar';
import { CbrTvDesktopDownloads } from './CbrTvDesktopDownloads';
import { DeviceCategoryType, DetailedSetupGuide } from '../../types';
import { 
  Tv, 
  Flame, 
  Smartphone, 
  Laptop, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Check, 
  Copy, 
  ExternalLink, 
  ChevronRight, 
  Search, 
  Sparkles, 
  HelpCircle, 
  MessageSquare, 
  Layers, 
  Activity,
  Wifi,
  Download,
  ChevronDown,
  Star,
  Play,
  X
} from 'lucide-react';

interface SetupHubViewProps {
  onSelectPlan: (planId: string) => void;
  navigateTo: (path: string) => void;
  whatsappNumber?: string;
  themeConfig?: any;
}

export const SetupHubView: React.FC<SetupHubViewProps> = ({
  onSelectPlan,
  navigateTo,
  whatsappNumber = '+44 7731 454811',
  themeConfig,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategoryType>('firestick');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeIspIndex, setActiveIspIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'matrix' | 'vault' | 'isp' | 'diagnostic'>('matrix');
  const [dismissStickyTrial, setDismissStickyTrial] = useState(false);

  // Diagnostic Simulator State
  const [diagRunning, setDiagRunning] = useState(false);
  const [diagComplete, setDiagComplete] = useState(false);
  const [diagLogs, setDiagLogs] = useState<string[]>([]);

  const handleCopy = (text: string, key: string) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2500);
      }
    } catch (e) {
      console.warn('Clipboard write blocked:', e);
    }
  };

  const runDiagnostic = () => {
    if (diagRunning) return;
    setDiagRunning(true);
    setDiagComplete(false);
    setDiagLogs([]);

    const steps = [
      'Pinging UK Tier-1 Server CDN (uk-premium.streamdns.me:8080)...',
      'TLS Handshake successful: Latency 14ms (London Edge Gateway)',
      'Checking 24,000+ Live Channel Master Stream Sync... [OK]',
      'Verifying 7-Day UK EPG & Catch-Up XMLTV Feeds... [ONLINE - 99.98%]',
      'Testing 4K 60FPS Video Stream Packet Loss... [0.00% Jitter]',
      'StreamUK Anti-Freeze Cluster v9.8 Status: ALL SYSTEMS OPERATIONAL'
    ];

    steps.forEach((log, index) => {
      setTimeout(() => {
        setDiagLogs(prev => [...prev, log]);
        if (index === steps.length - 1) {
          setDiagRunning(false);
          setDiagComplete(true);
        }
      }, (index + 1) * 450);
    });
  };

  // Current selected category object
  const currentCategoryMeta = useMemo(() => {
    return DEVICE_CATEGORIES.find(c => c.id === selectedCategory) || DEVICE_CATEGORIES[0];
  }, [selectedCategory]);

  // Guides matching search query (if any)
  const searchMatchedGuides = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALL_SETUP_GUIDES.filter(g => 
      g.title.toLowerCase().includes(q) ||
      g.playerName.toLowerCase().includes(q) ||
      g.deviceCategoryLabel.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q) ||
      g.targetKeywords?.some(k => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // For the selected device category:
  // 1. Find the primary spotlight guide (e.g. CBR TV for FireStick/Android/PC, or recommended player)
  const { spotlightGuide, alternativeGuides } = useMemo(() => {
    const categoryGuides = ALL_SETUP_GUIDES.filter(g => g.deviceCategory === selectedCategory);
    
    const recommendedSlug = currentCategoryMeta.recommendedPlayerSlug;
    let spotlight = categoryGuides.find(g => g.slug === recommendedSlug);
    if (!spotlight) {
      spotlight = categoryGuides.find(g => g.isOfficialApp) || categoryGuides[0];
    }

    // Filter alternative guides to avoid repeating CBR TV variants in the secondary list
    const alternatives = categoryGuides.filter(g => {
      if (spotlight && g.slug === spotlight.slug) return false;
      if (spotlight?.isOfficialApp && g.isOfficialApp) return false;
      return true;
    });

    return { spotlightGuide: spotlight, alternativeGuides: alternatives };
  }, [selectedCategory, currentCategoryMeta]);

  // Category Icon helper
  const renderCategoryIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'Smartphone': return <Smartphone className={className} />;
      case 'Tv': return <Tv className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Laptop': return <Laptop className={className} />;
      default: return <Tv className={className} />;
    }
  };

  const faqs = [
    {
      q: 'How to unlock TiviMate Premium features with Xtream Codes?',
      a: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>To unlock TiviMate Premium features on your Amazon FireStick or Android TV:</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-400">
            <li><strong className="text-slate-100">Add Playlist:</strong> Open TiviMate &gt; Add Playlist &gt; select <strong className="text-sky-300">Xtream Codes</strong>. Enter Server URL (<code className="text-sky-300 font-mono">http://uk-premium.streamdns.me:8080</code>) plus your username and password.</li>
            <li><strong className="text-slate-100">Unlock Premium:</strong> Go to TiviMate Settings &gt; <strong className="text-slate-100">Unlock Premium</strong> &gt; Log in with your TiviMate account credentials via the TiviMate Companion app or <code className="text-slate-300">tivimate.com</code>.</li>
            <li><strong className="text-slate-100">Enjoy Full 4K VIP:</strong> Once unlocked, StreamUK is 100% compatible with all TiviMate features: 7-day TV catch-up, multi-view (watch up to 9 live sports streams simultaneously), DVR recording, and instant EPG refresh.</li>
          </ol>
        </div>
      )
    },
    {
      q: 'What is the Downloader shortcode for CBR TV and TiviMate?',
      a: (
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In the Downloader app on FireStick or Android TV, enter code <strong className="text-amber-300 font-mono font-bold">626198</strong> for our official <strong className="text-slate-100">CBR TV app</strong>, or shortcode <strong className="text-sky-300 font-mono font-bold">272483</strong> for the official <strong className="text-slate-100">TiviMate APK</strong>. Both codes trigger an instant direct installer.
        </p>
      )
    },
    {
      q: 'How do I watch 3pm Saturday Premier League games in 4K?',
      a: (
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          StreamUK delivers unthrottled 4K 60FPS overseas club feeds (USA Peacock Extra, Canada Fubo/TSN, Australia Optus Sport) for every single Saturday 3pm kickoff. Open the "UK • EPL Extra Feeds 4K" or "USA • Peacock Sports UHD" categories on your device.
        </p>
      )
    },
    {
      q: 'How fast is activation after ordering a subscription or trial?',
      a: (
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Activation is instant and fully automated. Your Xtream Codes API credentials, M3U playlist link, and login details are delivered immediately via WhatsApp and Email upon activation.
        </p>
      )
    },
    {
      q: 'Can I use one subscription across multiple devices?',
      a: (
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Yes! You can install StreamUK on unlimited devices (e.g. living room TV, bedroom FireStick, tablet, phone). For simultaneous streaming on multiple screens at the same time, choose our 2, 3, or 4 Connection Multi-Room package.
        </p>
      )
    },
    {
      q: 'Do I need a VPN to stream in the UK?',
      a: (
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          No! StreamUK includes built-in Anti-Freeze v9.8 encryption that bypasses UK ISP throttling and blocks without requiring a separate VPN. However, if you already use a VPN (e.g. Surfshark, NordVPN), we are 100% VPN-friendly.
        </p>
      )
    }
  ];

  return (
    <div className="pt-20 sm:pt-24 pb-28 px-3.5 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 sm:space-y-10 text-slate-100">
      
      {/* 1. Sleek, Focused Header - Eye-Friendly Emerald Tones */}
      <header className="text-center max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Device Setup & App Directory • 2026</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          How to Setup IPTV on <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-emerald-400">Any Device</span>
        </h1>

        <p className="text-xs sm:text-base text-emerald-100/80 leading-relaxed max-w-2xl mx-auto">
          Choose your streaming device below for direct Downloader shortcodes, verified step-by-step app setup, and 4K sports streaming settings.
        </p>

        {/* Quick Downloader Code Strip - Horizontally scrollable on mobile */}
        <div className="pt-1">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 text-xs">
            <span className="text-emerald-200/60 font-medium shrink-0 hidden sm:inline">Popular Shortcodes:</span>
            
            <button
              onClick={() => handleCopy('626198', 'code-cbr')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/25 transition-colors cursor-pointer shrink-0 min-h-[36px]"
              title="Click to copy CBR TV code"
            >
              <span className="font-bold text-emerald-200">⭐ CBR TV:</span>
              <span className="font-mono font-bold text-white">626198</span>
              {copiedKey === 'code-cbr' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-emerald-300" />}
            </button>

            <button
              onClick={() => handleCopy('272483', 'code-tivimate')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/15 border border-teal-400/35 text-teal-300 hover:bg-teal-500/25 transition-colors cursor-pointer shrink-0 min-h-[36px]"
              title="Click to copy TiviMate code"
            >
              <span className="font-bold">TiviMate:</span>
              <span className="font-mono font-bold text-white">272483</span>
              {copiedKey === 'code-tivimate' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-teal-300" />}
            </button>

            <button
              onClick={() => handleCopy('80198', 'code-smarters')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c241e] border border-emerald-900/50 text-emerald-200/90 hover:bg-[#103027] transition-colors cursor-pointer shrink-0 min-h-[36px]"
              title="Click to copy Smarters code"
            >
              <span className="font-bold">Smarters:</span>
              <span className="font-mono font-bold text-white">80198</span>
              {copiedKey === 'code-smarters' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-emerald-400/70" />}
            </button>

            <button
              onClick={() => {
                setActiveTab('vault');
                setSearchQuery('');
              }}
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 ml-1 cursor-pointer shrink-0 whitespace-nowrap min-h-[36px] flex items-center"
            >
              All Codes ({DOWNLOADER_SHORTCODES_VAULT.length}) →
            </button>
          </div>
        </div>

        {/* Streamlined Search Bar */}
        <div className="pt-1.5 max-w-lg mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by device or player (e.g. FireStick, TiviMate, CBR TV, Smarters)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#091b17] border border-emerald-500/25 text-slate-100 placeholder:text-emerald-200/40 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-emerald-300 hover:text-white px-2 py-1 bg-emerald-950/80 border border-emerald-800/60 rounded-md cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Organized Section Tabs - Mobile Touch Friendly & Eye-Comfort */}
      <div className="flex justify-center border-b border-emerald-900/40 pb-3">
        <nav className="grid grid-cols-2 sm:flex sm:flex-row bg-[#081a16] p-1.5 rounded-2xl border border-emerald-900/50 w-full sm:w-auto gap-1">
          <button
            onClick={() => {
              setActiveTab('matrix');
              setSearchQuery('');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
              activeTab === 'matrix' && !searchQuery
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-900/40'
                : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Device Guides</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('vault');
              setSearchQuery('');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
              activeTab === 'vault'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-900/40'
                : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Shortcodes ({DOWNLOADER_SHORTCODES_VAULT.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('isp');
              setSearchQuery('');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
              activeTab === 'isp'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-900/40'
                : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 shrink-0" />
            <span>ISP Unblock</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('diagnostic');
              setSearchQuery('');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
              activeTab === 'diagnostic'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-900/40'
                : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span>Diagnostic</span>
          </button>
        </nav>
      </div>

      {/* 3. SEARCH RESULTS (Active if query typed) */}
      {searchQuery.trim() !== '' && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
              Results for <span className="text-emerald-300">"{searchQuery}"</span>
            </h2>
            <span className="text-xs text-emerald-200/60">
              {searchMatchedGuides.length} {searchMatchedGuides.length === 1 ? 'guide found' : 'guides found'}
            </span>
          </div>

          {searchMatchedGuides.length === 0 ? (
            <div className="text-center py-10 bg-[#091b17] rounded-2xl border border-emerald-900/40 space-y-3">
              <HelpCircle className="w-8 h-8 text-emerald-500/50 mx-auto" />
              <p className="text-sm text-slate-300">No setup guides found matching your search term.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-emerald-400 hover:underline cursor-pointer"
              >
                Clear search and view all devices
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {searchMatchedGuides.map((guide) => (
                <div
                  key={guide.id}
                  onClick={() => {
                    navigateTo('/setup/' + guide.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 sm:p-5 rounded-2xl bg-[#091b17] border border-emerald-900/40 hover:border-emerald-500/40 hover:bg-[#0d2621] transition-all cursor-pointer group flex flex-col justify-between gap-3 shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#061411] border border-emerald-900/50 p-1 flex items-center justify-center shrink-0">
                        {guide.appLogo ? (
                          <img src={guide.appLogo} alt={guide.playerName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          <Tv className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                        {guide.deviceCategoryLabel.split('&')[0]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                        {guide.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-200/70 pt-2.5 border-t border-emerald-900/40">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>{guide.timeEstimate}</span>
                    </span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Guide</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 4. MAIN TAB: STREAMLINED 2-STEP DEVICE SETUP */}
      {activeTab === 'matrix' && searchQuery.trim() === '' && (
        <div className="space-y-8 sm:space-y-10">

          {/* STEP 1: Streamlined Device Platform Selector - Horizontal swipe on mobile, grid on desktop */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-200/90 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/25 text-emerald-300 flex items-center justify-center text-[11px] font-black">1</span>
                <span>Choose Your Streaming Device:</span>
              </h2>
              <span className="text-xs text-emerald-200/60 hidden sm:inline">
                Selected: <strong className="text-white">{currentCategoryMeta.name}</strong>
              </span>
              <span className="text-[11px] text-emerald-400/70 sm:hidden">
                Swipe to browse →
              </span>
            </div>

            {/* Mobile Swipe Carousel + Desktop 6-Column Grid */}
            <div className="flex md:grid md:grid-cols-6 overflow-x-auto gap-2 sm:gap-2.5 pb-2 pt-0.5 no-scrollbar snap-x touch-pan-x">
              {DEVICE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 min-w-[125px] sm:min-w-[140px] md:min-w-0 snap-start p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer relative group min-h-[72px] sm:min-h-[80px] ${
                      isSelected
                        ? 'bg-[#0e2c24] border-emerald-400 shadow-md ring-1 ring-emerald-400/40'
                        : 'bg-[#091b17]/80 border-emerald-900/40 hover:border-emerald-600/50 hover:bg-[#0c241e]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                        isSelected ? 'text-emerald-300' : 'text-emerald-400/60 group-hover:text-emerald-200'
                      }`}>
                        {renderCategoryIcon(cat.iconName, 'w-4 h-4 sm:w-5 sm:h-5')}
                      </div>
                      {cat.id === 'firestick' || cat.id === 'android-tv' || cat.id === 'pc-web' ? (
                        <span className="text-[9px] font-bold uppercase text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/25">
                          Official
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <span className={`text-xs font-bold block truncate transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {cat.shortName}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* STEP 2: Recommended App Spotlight Card (The "Best Pick") */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-200/90 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/25 text-emerald-300 flex items-center justify-center text-[11px] font-black">2</span>
                <span>Recommended App for {currentCategoryMeta.shortName}</span>
              </h2>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified 4K 60FPS</span>
              </span>
            </div>

            {/* If PC & Web is selected: dedicated CBR TV Desktop Suite */}
            {selectedCategory === 'pc-web' ? (
              <div className="space-y-4">
                <div className="p-4 sm:p-6 md:p-7 rounded-3xl bg-[#091b17] border border-emerald-500/30 shadow-md relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/40 pb-4 sm:pb-5">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                        ⭐ Official StreamUK App for PC & Mac
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black text-white">
                        CBR TV for Windows, macOS, Linux & Web
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
                        Live TV, movies, series, TV guide and sports fixtures in one sleek app. Includes built-in 4K/8K hardware video decoding and a one-tap Proxy button to bypass UK broadband ISP blocks.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigateTo('/setup/cbr-tv-desktop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/50 shrink-0 cursor-pointer active:scale-95 min-h-[44px]"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Open Full Desktop Guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-4 sm:pt-5">
                    <CbrTvDesktopDownloads />
                  </div>
                </div>
              </div>
            ) : spotlightGuide ? (
              /* Spotlight Card for FireStick, Android TV, Apple TV, Smart TV, Formuler */
              <div className={`p-4 sm:p-6 md:p-7 rounded-3xl border transition-all relative overflow-hidden shadow-sm ${
                spotlightGuide.isOfficialApp
                  ? 'bg-gradient-to-br from-[#0c241e] via-[#091a16] to-[#071512] border-emerald-500/35'
                  : 'bg-[#091a16] border-emerald-900/40'
              }`}>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
                  {/* Left: App Identity & Summary */}
                  <div className="space-y-3.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        spotlightGuide.isOfficialApp
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/35'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-400/35'
                      }`}>
                        {spotlightGuide.isOfficialApp ? '⭐ Official StreamUK App' : '★ Recommended Player'}
                      </span>
                      <span className="text-xs text-emerald-200/70">
                        Setup: <strong className="text-white">{spotlightGuide.timeEstimate}</strong>
                      </span>
                      <span className="text-xs text-emerald-200/70">
                        Difficulty: <strong className="text-emerald-400">{spotlightGuide.difficulty}</strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#061411] border border-emerald-900/50 p-2 flex items-center justify-center shrink-0">
                        {spotlightGuide.appLogo ? (
                          <img
                            src={spotlightGuide.appLogo}
                            alt={spotlightGuide.playerName}
                            className="w-full h-full object-contain filter drop-shadow"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <Tv className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white leading-tight">
                          {spotlightGuide.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                          {spotlightGuide.summary}
                        </p>
                      </div>
                    </div>

                    {/* Key Perks Bullets */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5 text-xs">
                      {spotlightGuide.isOfficialApp ? (
                        <>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-[#061411] border border-emerald-900/40 flex items-center gap-2 text-emerald-100">
                            <span className="text-amber-400">🏆</span>
                            <span>Dedicated Sports Hub</span>
                          </div>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-[#061411] border border-emerald-900/40 flex items-center gap-2 text-emerald-100">
                            <span className="text-teal-300">📺</span>
                            <span>4-Screen MultiView</span>
                          </div>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-[#061411] border border-emerald-900/40 flex items-center gap-2 text-emerald-100">
                            <span className="text-emerald-400">⚡</span>
                            <span>Zero Stutter Engine</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-[#061411] border border-emerald-900/40 flex items-center gap-2 text-emerald-100">
                            <span className="text-teal-300">⚡</span>
                            <span>Fast Channel Zapping</span>
                          </div>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-[#061411] border border-emerald-900/40 flex items-center gap-2 text-emerald-100">
                            <span className="text-emerald-400">📅</span>
                            <span>7-Day Full UK EPG</span>
                          </div>
                          <div className="p-2 sm:p-2.5 rounded-xl bg-[#061411] border border-emerald-900/40 flex items-center gap-2 text-emerald-100">
                            <span className="text-amber-400">🎬</span>
                            <span>4K Cinema & VOD</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Quick Shortcode + Action Button (Mobile-Full-Width) */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-2.5 shrink-0 lg:min-w-[230px] pt-2 lg:pt-0 border-t lg:border-t-0 border-emerald-900/40">
                    {spotlightGuide.downloaderCode && (
                      <div className="p-3 rounded-2xl bg-[#061411] border border-emerald-900/50 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/70 block">Downloader Code</span>
                          <span className="font-mono text-base font-bold text-amber-300">
                            {spotlightGuide.downloaderCode}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(spotlightGuide.downloaderCode!, `spotlight-${spotlightGuide.slug}`)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-800/50 min-h-[36px]"
                        >
                          {copiedKey === `spotlight-${spotlightGuide.slug}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        navigateTo('/setup/' + spotlightGuide.slug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-3 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/50 cursor-pointer active:scale-95 min-h-[46px]"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Open Setup Guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          {/* STEP 3: Alternative Compatible Players (Clean, non-overwhelming grid) */}
          {alternativeGuides.length > 0 && (
            <section className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    Alternative Players for {currentCategoryMeta.shortName}
                  </h3>
                  <p className="text-xs text-emerald-200/70 mt-0.5">
                    Prefer a different app? We support all standard Xtream Codes & M3U players:
                  </p>
                </div>
                <span className="text-xs text-emerald-300/60 hidden sm:inline">
                  {alternativeGuides.length} options
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {alternativeGuides.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => {
                      navigateTo('/setup/' + guide.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#091b17] border border-emerald-900/40 hover:border-emerald-500/40 hover:bg-[#0d2621] transition-all cursor-pointer group flex flex-col justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#061411] border border-emerald-900/50 p-1 flex items-center justify-center shrink-0">
                          {guide.appLogo ? (
                            <img
                              src={guide.appLogo}
                              alt={guide.playerName}
                              className="w-full h-full object-contain filter drop-shadow"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Tv className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {guide.playerName}
                          </h4>
                          <span className="text-[11px] text-emerald-200/60">
                            {guide.playerType}
                          </span>
                        </div>
                      </div>

                      {guide.badge && (
                        <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#061411] text-emerald-300 border border-emerald-900/60 shrink-0">
                          {guide.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>

                    <div className="flex items-center justify-between text-xs text-emerald-200/70 pt-2 border-t border-emerald-900/40">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{guide.timeEstimate}</span>
                      </span>

                      <span className="font-semibold text-emerald-400 text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Guide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}

      {/* 5. TAB 2: DOWNLOADER SHORTCODES VAULT (Clean & Compact) */}
      {activeTab === 'vault' && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/40 pb-3.5">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <span>Verified Downloader Shortcodes Vault</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/70 mt-1">
                Enter these 5-6 digit codes into the AFTVnews Downloader app on your FireStick or Android TV for direct APK installation without typing URLs.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-300 px-3 py-1 bg-emerald-500/15 rounded-full border border-emerald-400/30 shrink-0 self-start sm:self-auto">
              Verified 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {DOWNLOADER_SHORTCODES_VAULT.map((item) => (
              <div
                key={item.code}
                className="bg-[#091b17] p-4 sm:p-5 rounded-2xl border border-emerald-900/40 hover:border-emerald-500/40 transition-all flex flex-col justify-between gap-3.5 group shadow-sm"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#061411] border border-emerald-900/50 p-1.5 flex items-center justify-center shrink-0">
                      {item.iconUrl ? (
                        <img
                          src={item.iconUrl}
                          alt={item.name}
                          className="w-full h-full object-contain drop-shadow"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Download className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold text-amber-300">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-emerald-200/60 mt-0.5">
                      {item.device}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2.5 border-t border-emerald-900/40">
                  <div className="flex items-center justify-between bg-[#061411] p-2 rounded-xl border border-emerald-900/50">
                    <div className="space-y-0.5 pl-1">
                      <span className="text-[9px] font-bold text-emerald-200/60 uppercase tracking-wider block">Shortcode</span>
                      <span className="font-mono text-base font-bold text-emerald-300">
                        {item.code}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(item.code, `vault-${item.code}`)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer min-h-[34px]"
                    >
                      {copiedKey === `vault-${item.code}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === `vault-${item.code}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {item.directUrl && (
                    <div className="flex items-center justify-between text-[11px] text-emerald-200/60 px-1">
                      <span className="truncate max-w-[160px]">{item.directUrl}</span>
                      <a
                        href={item.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Link</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. TAB 3: UK BROADBAND ISP ANTI-BLOCK FIXES */}
      {activeTab === 'isp' && (
        <section className="space-y-5">
          <div className="border-b border-emerald-900/40 pb-3.5">
            <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
              <Wifi className="w-5 h-5 text-emerald-400" />
              <span>UK Broadband ISP Anti-Block & Firewall Settings</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/70 mt-1">
              UK broadband providers (Virgin Media, BT, Sky, TalkTalk, Vodafone) have web shields that can interfere with IPTV streams during Premier League matches. Disable them in 30 seconds:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Mobile Horizontal Scroll for ISPs */}
            <div className="flex lg:flex-col overflow-x-auto gap-2 no-scrollbar pb-1">
              {UK_ISP_OPTIMIZATIONS.map((isp, idx) => (
                <button
                  key={isp.ispName}
                  onClick={() => setActiveIspIndex(idx)}
                  className={`shrink-0 min-w-[160px] lg:min-w-0 w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer min-h-[50px] ${
                    activeIspIndex === idx
                      ? 'bg-[#0d2720] border-emerald-400 shadow-sm text-white'
                      : 'bg-[#091b17]/70 border-emerald-900/40 text-emerald-200/70 hover:bg-[#0c241e] hover:text-white'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm block text-white">{isp.ispName}</span>
                    <span className="text-xs text-emerald-200/60 truncate max-w-[140px] block">{isp.blockingFeature}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform hidden lg:block ${activeIspIndex === idx ? 'rotate-90 text-emerald-400' : 'text-emerald-600'}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {activeIspIndex !== null && UK_ISP_OPTIMIZATIONS[activeIspIndex] && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#091b17] border border-emerald-900/40 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                        {UK_ISP_OPTIMIZATIONS[activeIspIndex].routerModel}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {UK_ISP_OPTIMIZATIONS[activeIspIndex].ispName} - {UK_ISP_OPTIMIZATIONS[activeIspIndex].blockingFeature}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold shrink-0">
                      {UK_ISP_OPTIMIZATIONS[activeIspIndex].impactLevel} Priority
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-200/70">
                      How to Disable Filtering:
                    </h4>
                    <div className="text-xs sm:text-sm text-slate-200 bg-[#061411] p-3.5 rounded-xl border border-emerald-900/50 leading-relaxed">
                      {UK_ISP_OPTIMIZATIONS[activeIspIndex].howToDisable}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#061411] border border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-200">
                    <span>Recommended DNS: <strong className="text-emerald-300">{UK_ISP_OPTIMIZATIONS[activeIspIndex].recommendedDns}</strong></span>
                    <button
                      onClick={() => handleCopy(UK_ISP_OPTIMIZATIONS[activeIspIndex].recommendedDns, 'dns-copy')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto min-h-[34px]"
                    >
                      {copiedKey === 'dns-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'dns-copy' ? 'Copied DNS' : 'Copy DNS'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 7. TAB 4: DIAGNOSTICS STREAM SIMULATOR */}
      {activeTab === 'diagnostic' && (
        <section className="p-5 sm:p-6 rounded-2xl bg-[#091b17] border border-emerald-900/40 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/40 pb-3.5">
            <div className="space-y-0.5">
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Live UK Server CDN & Stream Health Diagnostic</span>
              </h2>
              <p className="text-xs text-emerald-200/70">
                Test real-time stream packet routing, latency, and EPG feed connectivity to our London & Amsterdam server clusters.
              </p>
            </div>

            <button
              onClick={runDiagnostic}
              disabled={diagRunning}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[42px] ${
                diagRunning
                  ? 'bg-[#061411] text-emerald-600 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-950/50'
              }`}
            >
              <Activity className={`w-4 h-4 ${diagRunning ? 'animate-spin' : ''}`} />
              <span>{diagRunning ? 'Running Tests...' : 'Run Diagnostics'}</span>
            </button>
          </div>

          <div className="bg-[#061411] p-3.5 sm:p-4 rounded-xl border border-emerald-900/50 font-mono text-xs text-slate-300 space-y-2 min-h-[130px]">
            {diagLogs.length === 0 && !diagRunning && (
              <div className="text-emerald-500/60 italic py-5 text-center">
                Click "Run Diagnostics" to test StreamUK London Edge Gateway and 4K UHD stream codecs...
              </div>
            )}

            {diagLogs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-emerald-400 shrink-0">✔</span>
                <span className="text-slate-200 break-all">{log}</span>
              </div>
            ))}

            {diagComplete && (
              <div className="pt-2 border-t border-emerald-900/50 text-emerald-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Diagnostics Complete: All UK Tier-1 Server Clusters are operating at 100% health (0.00% Packet Loss).</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. Setup FAQ Accordion (Clean & Non-cluttered) */}
      <section className="p-4 sm:p-6 rounded-3xl bg-[#091b17] border border-emerald-900/40 space-y-3.5">
        <div className="space-y-0.5">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Setup Questions & Answers</span>
          </h2>
          <p className="text-xs text-emerald-200/70">
            Quick answers about Xtream Codes login, credentials, 3pm matches, and multi-room.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-emerald-900/40 bg-[#061411] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-[#091f1a] transition-colors min-h-[46px]"
                >
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-emerald-300' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1 text-slate-200 border-t border-emerald-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Referral & Social Sharing */}
      <ShareReferralBar
        currentUrl={typeof window !== 'undefined' ? `${window.location.origin}/setup` : 'https://globalstreamhub.net/setup'}
        title="StreamUK 4K VIP IPTV Setup Hub • FireStick, TiviMate & Device Guides"
      />

      {/* 10. WhatsApp Support Banner */}
      <section className="p-4 sm:p-6 rounded-2xl bg-[#091b17] border border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-bold uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 UK Setup Support</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            Need Live Assistance Setting Up Your Device?
          </h3>
          <p className="text-xs text-emerald-100/80 max-w-lg leading-relaxed">
            Our UK technical team is available on WhatsApp to walk you through installation, provide Downloader shortcodes, and test your connection.
          </p>
        </div>

        <a
          href={`https://api.whatsapp.com/send?phone=${whatsappNumber.replace(/[^0-9]/g, '')}&text=${encodeURIComponent('Hi StreamUK support, I need help setting up IPTV on my device.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/50 shrink-0 cursor-pointer min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4 fill-slate-950" />
          <span>WhatsApp VIP Help</span>
        </a>
      </section>

      {/* 11. Subtle Sticky Bottom Trial Bar - Mobile Compact & Dismissible */}
      {!dismissStickyTrial && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg bg-[#061411]/95 border border-emerald-900/60 shadow-xl p-2 sm:p-2.5 rounded-xl flex items-center justify-between gap-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-white truncate block">
                Free 24H 4K VIP Pass
              </span>
              <span className="text-[10px] text-emerald-200/60 truncate block">
                Instant login • No card required
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onSelectPlan('trial-24h')}
              className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs whitespace-nowrap shadow-sm active:scale-95 transition-all cursor-pointer min-h-[32px]"
            >
              Claim Pass
            </button>
            <button
              onClick={() => setDismissStickyTrial(true)}
              className="p-1 text-emerald-400/60 hover:text-white rounded cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
