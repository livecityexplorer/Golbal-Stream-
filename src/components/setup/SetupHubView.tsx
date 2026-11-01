import React, { useState, useMemo } from 'react';
import { 
  ALL_SETUP_GUIDES, 
  DEVICE_CATEGORIES, 
  DOWNLOADER_SHORTCODES_VAULT,
  UK_ISP_OPTIMIZATIONS 
} from '../../data/setupGuidesData';
import { ShareReferralBar } from '../ShareReferralBar';
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
  Play
} from 'lucide-react';

interface SetupHubViewProps {
  onSelectPlan: (planId: string) => void;
  navigateTo: (path: string) => void;
  whatsappNumber?: string;
}

export const SetupHubView: React.FC<SetupHubViewProps> = ({
  onSelectPlan,
  navigateTo,
  whatsappNumber = '+44 7731 454811',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategoryType>('firestick');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeIspIndex, setActiveIspIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'matrix' | 'vault' | 'isp' | 'diagnostic'>('matrix');

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
  // 1. Find the primary spotlight guide (e.g. CBR TV for FireStick/Android TV, or the recommended player)
  const { spotlightGuide, alternativeGuides } = useMemo(() => {
    const categoryGuides = ALL_SETUP_GUIDES.filter(g => g.deviceCategory === selectedCategory);
    
    // Find the recommended guide by slug or official badge
    const recommendedSlug = currentCategoryMeta.recommendedPlayerSlug;
    let spotlight = categoryGuides.find(g => g.slug === recommendedSlug);
    if (!spotlight) {
      spotlight = categoryGuides.find(g => g.isOfficialApp) || categoryGuides[0];
    }

    // Filter alternative guides to avoid repeating CBR TV variants in the secondary list
    const alternatives = categoryGuides.filter(g => {
      if (spotlight && g.slug === spotlight.slug) return false;
      // Deduplicate CBR TV variants if CBR TV is already the spotlight
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
            <li><strong className="text-white">Add Playlist:</strong> Open TiviMate &gt; Add Playlist &gt; select <strong className="text-cyan-400">Xtream Codes</strong>. Enter Server URL (<code className="text-cyan-300 font-mono">http://uk-premium.streamdns.me:8080</code>) plus your username and password.</li>
            <li><strong className="text-white">Unlock Premium:</strong> Go to TiviMate Settings &gt; <strong className="text-white">Unlock Premium</strong> &gt; Log in with your TiviMate account credentials via the TiviMate Companion app or <code className="text-slate-300">tivimate.com</code>.</li>
            <li><strong className="text-white">Enjoy Full 4K VIP:</strong> Once unlocked, StreamUK is 100% compatible with all TiviMate features: 7-day TV catch-up, multi-view (watch up to 9 live sports streams simultaneously), DVR recording, and instant EPG refresh.</li>
          </ol>
        </div>
      )
    },
    {
      q: 'What is the Downloader shortcode for CBR TV and TiviMate?',
      a: (
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In the Downloader app on FireStick or Android TV, enter code <strong className="text-amber-300 font-mono">626198</strong> for the official <strong className="text-white">CBR TV app</strong> (Boss Media Player), or shortcode <strong className="text-cyan-300 font-mono">272483</strong> for the official <strong className="text-white">TiviMate APK</strong>. Both codes trigger an instant direct installer.
        </p>
      )
    },
    {
      q: 'How do I watch 3pm Saturday Premier League games in 4K?',
      a: (
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          StreamUK bypasses UK 3pm TV blackouts by delivering unthrottled 4K 60FPS overseas club feeds (USA Peacock Extra, Canada Fubo/TSN, Australia Optus Sport) for every single Saturday 3pm kickoff. Open the "UK • EPL Extra Feeds 4K" or "USA • Peacock Sports UHD" categories on your device.
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
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* 1. Sleek, Focused Header */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Device Setup & App Directory • 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          How to Setup IPTV on <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">Any Device</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Choose your streaming device below for the verified step-by-step setup guide, recommended player, and instant Downloader shortcodes.
        </p>

        {/* Quick Downloader Code Strip - Compact, non-intrusive utility */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Popular Downloader Codes:</span>
          
          <button
            onClick={() => handleCopy('626198', 'code-cbr')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer"
            title="Click to copy CBR TV code"
          >
            <span className="font-bold">⭐ CBR TV (Official):</span>
            <span className="font-mono font-black text-white">626198</span>
            {copiedKey === 'code-cbr' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
          </button>

          <button
            onClick={() => handleCopy('272483', 'code-tivimate')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer"
            title="Click to copy TiviMate code"
          >
            <span className="font-bold">TiviMate:</span>
            <span className="font-mono font-black text-white">272483</span>
            {copiedKey === 'code-tivimate' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-cyan-400" />}
          </button>

          <button
            onClick={() => handleCopy('80198', 'code-smarters')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
            title="Click to copy Smarters code"
          >
            <span className="font-bold">Smarters:</span>
            <span className="font-mono font-black text-white">80198</span>
            {copiedKey === 'code-smarters' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              setActiveTab('vault');
              setSearchQuery('');
            }}
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
          >
            All Codes ({DOWNLOADER_SHORTCODES_VAULT.length}) →
          </button>
        </div>

        {/* Streamlined Search Bar */}
        <div className="pt-2 max-w-lg mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by device or player (e.g. FireStick, TiviMate, Smarters, Apple TV)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 bg-slate-800 rounded-md cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Organized Section Tabs */}
      <div className="flex justify-center border-b border-white/10 pb-2">
        <nav className="inline-flex bg-slate-900/80 p-1 rounded-xl border border-white/10 max-w-full overflow-x-auto gap-1">
          <button
            onClick={() => {
              setActiveTab('matrix');
              setSearchQuery('');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'matrix' && !searchQuery
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Device Setup Guides</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('vault');
              setSearchQuery('');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'vault'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloader Codes ({DOWNLOADER_SHORTCODES_VAULT.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('isp');
              setSearchQuery('');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'isp'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>UK ISP Unblock (3PM Football)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('diagnostic');
              setSearchQuery('');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'diagnostic'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Stream Health Test</span>
          </button>
        </nav>
      </div>

      {/* 3. SEARCH RESULTS (Active if query typed) */}
      {searchQuery.trim() !== '' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Search Results for <span className="text-cyan-400">"{searchQuery}"</span>
            </h2>
            <span className="text-xs text-slate-400">
              {searchMatchedGuides.length} {searchMatchedGuides.length === 1 ? 'guide found' : 'guides found'}
            </span>
          </div>

          {searchMatchedGuides.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-white/5 space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-300">No setup guides found matching your search term.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
              >
                Clear search and view all devices
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchMatchedGuides.map((guide) => (
                <div
                  key={guide.id}
                  onClick={() => {
                    navigateTo('/setup/' + guide.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 p-1 flex items-center justify-center shrink-0">
                        {guide.appLogo ? (
                          <img src={guide.appLogo} alt={guide.playerName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          <Tv className="w-5 h-5 text-cyan-400" />
                        )}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {guide.deviceCategoryLabel.split('&')[0]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {guide.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{guide.timeEstimate}</span>
                    </span>
                    <span className="font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
        <div className="space-y-10">

          {/* STEP 1: Streamlined Device Platform Selector */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[11px] font-black">1</span>
                <span>Select Your Streaming Device:</span>
              </h2>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Selected: <strong className="text-white">{currentCategoryMeta.name}</strong>
              </span>
            </div>

            {/* Clean Segmented Device Tabs (No card clutter) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
              {DEVICE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer relative group ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-500/15 via-slate-900 to-slate-900 border-cyan-400/80 shadow-md ring-1 ring-cyan-400/30'
                        : 'bg-slate-900/60 border-white/10 hover:border-white/25 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'
                      }`}>
                        {renderCategoryIcon(cat.iconName, 'w-5 h-5')}
                      </div>
                      {cat.id === 'firestick' || cat.id === 'android-tv' ? (
                        <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-400/30">
                          Official App
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
                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* STEP 2: Recommended App Spotlight Card (The "Best Pick") */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[11px] font-black">2</span>
                <span>Recommended App for {currentCategoryMeta.shortName}</span>
              </h2>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified 4K 60FPS Compatible</span>
              </span>
            </div>

            {spotlightGuide && (
              <div className={`p-6 sm:p-7 rounded-3xl border transition-all relative overflow-hidden shadow-2xl ${
                spotlightGuide.isOfficialApp
                  ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-400/50 shadow-amber-500/10'
                  : 'bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 border-cyan-500/40 shadow-cyan-500/10'
              }`}>
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: App Identity & Summary */}
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        spotlightGuide.isOfficialApp
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                      }`}>
                        {spotlightGuide.isOfficialApp ? '⭐ Official StreamUK App' : '★ Recommended Player'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Setup Time: <strong className="text-white">{spotlightGuide.timeEstimate}</strong>
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Difficulty: <strong className="text-emerald-400">{spotlightGuide.difficulty}</strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/10 p-2 flex items-center justify-center shrink-0 shadow-lg">
                        {spotlightGuide.appLogo ? (
                          <img
                            src={spotlightGuide.appLogo}
                            alt={spotlightGuide.playerName}
                            className="w-full h-full object-contain filter drop-shadow"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <Tv className="w-8 h-8 text-cyan-400" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          {spotlightGuide.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {spotlightGuide.summary}
                        </p>
                      </div>
                    </div>

                    {/* Key Perks Bullets */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                      {spotlightGuide.isOfficialApp ? (
                        <>
                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center gap-2 text-slate-300">
                            <span className="text-amber-400">🏆</span>
                            <span>Dedicated Sports Hub</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center gap-2 text-slate-300">
                            <span className="text-cyan-400">📺</span>
                            <span>4-Screen MultiView</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center gap-2 text-slate-300">
                            <span className="text-emerald-400">⚡</span>
                            <span>Zero Stutter Engine</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center gap-2 text-slate-300">
                            <span className="text-cyan-400">⚡</span>
                            <span>Fast Channel Zapping</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center gap-2 text-slate-300">
                            <span className="text-emerald-400">📅</span>
                            <span>7-Day Full UK EPG</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center gap-2 text-slate-300">
                            <span className="text-amber-400">🎬</span>
                            <span>4K Cinema & VOD</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Quick Shortcode + Action Button */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-3 shrink-0 lg:min-w-[240px]">
                    {spotlightGuide.downloaderCode && (
                      <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-white/10 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Downloader Code</span>
                          <span className="font-mono text-base font-black text-amber-300">
                            {spotlightGuide.downloaderCode}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(spotlightGuide.downloaderCode!, `spotlight-${spotlightGuide.slug}`)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
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
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>Open Complete Setup Guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* STEP 3: Alternative Compatible Players (Clean, non-overwhelming grid) */}
          {alternativeGuides.length > 0 && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Alternative Players for {currentCategoryMeta.shortName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Already have an app or prefer a different interface? We support all standard Xtream Codes & M3U players:
                  </p>
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {alternativeGuides.length} options
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {alternativeGuides.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => {
                      navigateTo('/setup/' + guide.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 p-1 flex items-center justify-center shrink-0 group-hover:border-cyan-500/30 transition-colors">
                          {guide.appLogo ? (
                            <img
                              src={guide.appLogo}
                              alt={guide.playerName}
                              className="w-full h-full object-contain filter drop-shadow"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Tv className="w-5 h-5 text-cyan-400" />
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {guide.playerName}
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            {guide.playerType}
                          </span>
                        </div>
                      </div>

                      {guide.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 border border-amber-400/20 shrink-0">
                          {guide.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{guide.timeEstimate}</span>
                      </span>

                      <span className="font-bold text-cyan-400 text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-cyan-400" />
                <span>Verified Downloader Shortcodes Vault</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Enter these 5-6 digit codes into the AFTVnews Downloader app on your FireStick or Android TV for direct APK installation without typing URLs.
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-400 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 shrink-0">
              Verified 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOWNLOADER_SHORTCODES_VAULT.map((item) => (
              <div
                key={item.code}
                className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between gap-4 group shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-950 border border-white/10 p-1.5 flex items-center justify-center shrink-0">
                      {item.iconUrl ? (
                        <img
                          src={item.iconUrl}
                          alt={item.name}
                          className="w-full h-full object-contain drop-shadow"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Download className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-bold text-amber-400">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.device}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-white/5">
                    <div className="space-y-0.5 pl-1">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Shortcode</span>
                      <span className="font-mono text-base font-black text-cyan-300">
                        {item.code}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(item.code, `vault-${item.code}`)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedKey === `vault-${item.code}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === `vault-${item.code}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {item.directUrl && (
                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                      <span className="truncate max-w-[170px]">{item.directUrl}</span>
                      <a
                        href={item.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Direct Link</span>
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
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Wifi className="w-5 h-5 text-cyan-400" />
              <span>UK Broadband ISP Anti-Block & Firewall Settings (3PM Football)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              UK broadband providers (Virgin Media, BT, Sky, TalkTalk, Vodafone) have parental web shields that can interfere with IPTV streams during Premier League matches. Disable them in 30 seconds:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              {UK_ISP_OPTIMIZATIONS.map((isp, idx) => (
                <button
                  key={isp.ispName}
                  onClick={() => setActiveIspIndex(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeIspIndex === idx
                      ? 'bg-slate-900 border-cyan-400 shadow-md text-white'
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm block text-white">{isp.ispName}</span>
                    <span className="text-xs text-slate-400">{isp.blockingFeature}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeIspIndex === idx ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {activeIspIndex !== null && UK_ISP_OPTIMIZATIONS[activeIspIndex] && (
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        {UK_ISP_OPTIMIZATIONS[activeIspIndex].routerModel}
                      </span>
                      <h3 className="text-lg font-black text-white">
                        {UK_ISP_OPTIMIZATIONS[activeIspIndex].ispName} - {UK_ISP_OPTIMIZATIONS[activeIspIndex].blockingFeature}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                      {UK_ISP_OPTIMIZATIONS[activeIspIndex].impactLevel} Priority
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      How to Disable Filtering:
                    </h4>
                    <div className="text-xs sm:text-sm text-slate-200 bg-slate-950 p-4 rounded-xl border border-white/5 leading-relaxed">
                      {UK_ISP_OPTIMIZATIONS[activeIspIndex].howToDisable}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-cyan-300">
                    <span>Recommended DNS: <strong>{UK_ISP_OPTIMIZATIONS[activeIspIndex].recommendedDns}</strong></span>
                    <button
                      onClick={() => handleCopy(UK_ISP_OPTIMIZATIONS[activeIspIndex].recommendedDns, 'dns-copy')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold flex items-center gap-1 hover:bg-cyan-400 transition-colors cursor-pointer self-start sm:self-auto"
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
        <section className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>Live UK Server CDN & Stream Health Diagnostic</span>
              </h2>
              <p className="text-xs text-slate-400">
                Test real-time stream packet routing, latency, and EPG feed connectivity to our London & Amsterdam server clusters.
              </p>
            </div>

            <button
              onClick={runDiagnostic}
              disabled={diagRunning}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                diagRunning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
              }`}
            >
              <Activity className={`w-4 h-4 ${diagRunning ? 'animate-spin' : ''}`} />
              <span>{diagRunning ? 'Running Tests...' : 'Run Diagnostics'}</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/10 font-mono text-xs text-slate-300 space-y-2 min-h-[140px]">
            {diagLogs.length === 0 && !diagRunning && (
              <div className="text-slate-500 italic py-6 text-center">
                Click "Run Diagnostics" to test StreamUK London Edge Gateway and 4K UHD stream codecs...
              </div>
            )}

            {diagLogs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span>
                <span className="text-slate-300">{log}</span>
              </div>
            ))}

            {diagComplete && (
              <div className="pt-2 border-t border-white/10 text-emerald-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Diagnostics Complete: All UK Tier-1 Server Clusters are operating at 100% health (0.00% Packet Loss).</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. Setup FAQ Accordion (Clean & Non-cluttered) */}
      <section className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Setup Questions & Answers</span>
          </h2>
          <p className="text-xs text-slate-400">
            Quick answers about Xtream Codes login, credentials, 3pm matches, and multi-room.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-white/5 bg-slate-950/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-slate-300 border-t border-white/5">
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
      <section className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-extrabold uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 UK Setup Support</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            Need Live Assistance Setting Up Your Device?
          </h3>
          <p className="text-xs text-slate-300 max-w-lg">
            Our UK technical team is available on WhatsApp to walk you through installation, provide Downloader shortcodes, and test your connection.
          </p>
        </div>

        <a
          href={`https://api.whatsapp.com/send?phone=${whatsappNumber.replace(/[^0-9]/g, '')}&text=${encodeURIComponent('Hi StreamUK support, I need help setting up IPTV on my device.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer hover:scale-105 active:scale-95"
        >
          <MessageSquare className="w-4 h-4 fill-slate-950" />
          <span>WhatsApp VIP Help</span>
        </a>
      </section>

      {/* 11. Subtle Sticky Bottom Trial Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl bg-slate-950/95 border border-emerald-500/40 shadow-xl p-2.5 sm:p-3 rounded-2xl flex items-center justify-between gap-3 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-bold text-white truncate block">
              Free 24H 4K VIP Pass
            </span>
            <span className="text-[10px] text-slate-400 truncate block">
              Instant login • No card required • Matchday ready
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelectPlan('trial-24h')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs whitespace-nowrap shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
        >
          Free 24H Trial
        </button>
      </div>

    </div>
  );
};
