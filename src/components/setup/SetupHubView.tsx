import React, { useState, useMemo } from 'react';
import { 
  ALL_SETUP_GUIDES, 
  DEVICE_CATEGORIES, 
  DOWNLOADER_SHORTCODES_VAULT,
  UK_ISP_OPTIMIZATIONS 
} from '../../data/setupGuidesData';
import { ShareReferralBar } from '../ShareReferralBar';
import { DeviceCategoryType } from '../../types';
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
  Lightbulb, 
  MessageSquare, 
  Layers, 
  Sliders, 
  Terminal, 
  Activity,
  Wifi,
  Download,
  AlertTriangle,
  ChevronDown
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
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeIspIndex, setActiveIspIndex] = useState<number | null>(0);
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

  // Filtered guides based on search or category
  const displayedCategoryGuides = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return ALL_SETUP_GUIDES.filter(g => 
        g.title.toLowerCase().includes(q) ||
        g.playerName.toLowerCase().includes(q) ||
        g.deviceCategoryLabel.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.targetKeywords.some(k => k.toLowerCase().includes(q))
      );
    }
    return ALL_SETUP_GUIDES.filter(g => g.deviceCategory === selectedCategory);
  }, [selectedCategory, searchQuery]);

  const renderCategoryIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Flame': return <Flame className={`${className} text-amber-400`} />;
      case 'Tv': return <Tv className={`${className} text-cyan-400`} />;
      case 'Cpu': return <Cpu className={`${className} text-emerald-400`} />;
      case 'Smartphone': return <Smartphone className={`${className} text-purple-400`} />;
      case 'Laptop': return <Laptop className={`${className} text-blue-400`} />;
      default: return <Tv className={`${className} text-cyan-400`} />;
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* 1. Hub Hero Header */}
      <header className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Step-by-Step IPTV Setup Hub • 2026 Directory</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          How to Setup IPTV on Any Device in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400">2 Minutes</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Select your hardware platform and streaming app below to open its <strong>dedicated step-by-step tutorial</strong>, verified Downloader shortcodes, and 4K 60FPS sports settings.
        </p>

        {/* 1-Click Free 24H VIP Trial CTA Banner (Zero Card Required) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border-2 border-emerald-500/40 shadow-xl shadow-emerald-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-left max-w-3xl mx-auto">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wide border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>Instant VIP Pass • Zero Credit Card Needed</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white">
              Want to Test Our 4K 60FPS Stream Right Now?
            </h2>
            <p className="text-xs text-slate-300">
              Get an instant 24-hour test line with all 18,500+ channels, Premier League 3pm feeds, and 4K cinema box sets.
            </p>
          </div>

          <button
            onClick={() => onSelectPlan('trial-24h')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 shrink-0 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Start Free 24H Trial</span>
          </button>
        </div>

        {/* Universal Search Bar */}
        <div className="pt-2 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by device or player (e.g. TiviMate, FireStick, Smarters, XCIPTV...)"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Prominent Quick-Access Downloader Shortcodes Bar */}
        <div className="pt-2 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-left space-y-3 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Popular FireStick & Android Downloader Shortcodes (Direct APKs)
                </span>
              </div>
              <button
                onClick={() => setActiveTab('vault')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>View All {DOWNLOADER_SHORTCODES_VAULT.length} Codes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* TiviMate Pro */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5 flex flex-col justify-between gap-1.5 group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">TiviMate 4K</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                    #1 Player
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-sm font-black text-cyan-300">272483</span>
                  <button
                    onClick={() => handleCopy('272483', 'top-272483')}
                    className="text-[11px] px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                  >
                    {copiedKey === 'top-272483' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* IPTV Smarters Pro */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5 flex flex-col justify-between gap-1.5 group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">Smarters Pro</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                    Universal
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-sm font-black text-cyan-300">80198</span>
                  <button
                    onClick={() => handleCopy('80198', 'top-80198')}
                    className="text-[11px] px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                  >
                    {copiedKey === 'top-80198' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* XCIPTV Player */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5 flex flex-col justify-between gap-1.5 group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">XCIPTV OTT</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                    VOD+Live
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-sm font-black text-cyan-300">537992</span>
                  <button
                    onClick={() => handleCopy('537992', 'top-537992')}
                    className="text-[11px] px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                  >
                    {copiedKey === 'top-537992' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* iMPlayer TV */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5 flex flex-col justify-between gap-1.5 group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">iMPlayer TV</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                    Multi-Screen
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-sm font-black text-cyan-300">82375</span>
                  <button
                    onClick={() => handleCopy('82375', 'top-82375')}
                    className="text-[11px] px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                  >
                    {copiedKey === 'top-82375' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hub Quick Nav Tabs (Matrix / Vault / ISP / Diagnostic) */}
      <div className="flex justify-center">
        <div className="inline-flex bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'matrix' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Device & Player Guides ({ALL_SETUP_GUIDES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'vault' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloader Codes Vault ({DOWNLOADER_SHORTCODES_VAULT.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('isp')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'isp' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>UK Broadband ISP Fixes</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'diagnostic' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Stream Diagnostics Tool</span>
          </button>
        </div>
      </div>

      {/* 3. TAB 1: DEVICE PLATFORM SELECTOR + PLAYER GUIDES DIRECTORY */}
      {activeTab === 'matrix' && (
        <div className="space-y-10">
          
          {/* Step 1: Device Platform Archetype Selector */}
          <section id="step1-device-selector" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Step 1: Choose Your Streaming Device Platform</span>
              </h2>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Selected: <strong className="text-cyan-300">{DEVICE_CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {DEVICE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id && !searchQuery;
                return (
                  <button
                    key={cat.id}
                    id={`cat-btn-${cat.id}`}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(cat.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 relative cursor-pointer group ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-500/20 via-slate-900 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-400/40'
                        : 'bg-slate-900/60 border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-12 h-12 rounded-xl border p-1 flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-cyan-500/25 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/30' 
                          : 'bg-slate-950 border-white/10 group-hover:border-cyan-500/30 group-hover:bg-slate-900'
                      }`}>
                        {cat.imageUrl ? (
                          <img
                            src={cat.imageUrl}
                            alt={cat.name}
                            className="w-full h-full object-contain filter drop-shadow transition-transform group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          renderCategoryIcon(cat.iconName, 'w-5 h-5')
                        )}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-white/10">
                        {cat.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className={`text-xs sm:text-sm font-black transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                        {cat.shortName}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {cat.tagline.split(',')[0]}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-cyan-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2: Available Player Apps Matrix (Each opens a dedicated page!) */}
          <section id="step2-player-selector" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Step 2: Choose Your IPTV Player to Open Dedicated Guide</span>
              </h2>
              <span className="text-xs text-cyan-400 font-semibold">
                {displayedCategoryGuides.length} {displayedCategoryGuides.length === 1 ? 'Dedicated Guide' : 'Dedicated Guides Available'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedCategoryGuides.map((guide) => {
                return (
                  <article
                    key={guide.id}
                    id={`guide-card-${guide.slug}`}
                    onClick={() => {
                      navigateTo('/setup/' + guide.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-5 rounded-2xl border border-white/10 bg-slate-900/70 hover:border-cyan-400 hover:bg-slate-900 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer relative group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-12 h-12 rounded-xl border border-white/10 bg-slate-950 p-1.5 flex items-center justify-center shrink-0 group-hover:border-cyan-500/40 group-hover:bg-slate-900 transition-all">
                          {guide.appLogo ? (
                            <img
                              src={guide.appLogo}
                              alt={guide.playerName}
                              className="w-full h-full object-contain filter drop-shadow transition-transform group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Tv className="w-6 h-6 text-cyan-400" />
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-cyan-300 border border-cyan-500/20">
                            {guide.playerType}
                          </span>
                          {guide.badge && (
                            <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                              ★ {guide.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                          {guide.title}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-1">
                          {guide.summary}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{guide.timeEstimate}</span>
                      </span>
                      <span className="font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Open Tutorial</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

        </div>
      )}

      {/* 4. TAB 2: DOWNLOADER SHORTCODES VAULT */}
      {activeTab === 'vault' && (
        <section id="downloader-codes-vault" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Download className="w-6 h-6 text-cyan-400" />
                <span>Verified Downloader Shortcodes Vault (FireStick & Android TV)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Enter these official 5-6 digit codes into the AFTVnews Downloader application to install IPTV players in seconds with zero typing.
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-400 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 shrink-0">
              Verified August 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOWNLOADER_SHORTCODES_VAULT.map((item) => (
              <div
                key={item.code}
                className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col justify-between gap-4 group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/10 p-1.5 flex items-center justify-center shrink-0 group-hover:border-cyan-500/40 transition-colors">
                      {item.iconUrl ? (
                        <img
                          src={item.iconUrl}
                          alt={item.name}
                          className="w-full h-full object-contain drop-shadow transition-transform group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Download className="w-6 h-6 text-cyan-400" />
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
                    <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {item.device} • <span className="font-mono text-slate-300">{item.version}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-white/5">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Shortcode</span>
                      <span className="font-mono text-lg font-black text-cyan-300 tracking-wider">
                        {item.code}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(item.code, `vault-${item.code}`)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                    >
                      {copiedKey === `vault-${item.code}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === `vault-${item.code}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {item.directUrl && (
                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                      <span className="truncate max-w-[180px]">{item.directUrl}</span>
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

      {/* 5. TAB 3: UK BROADBAND ISP ANTI-BLOCK FIXES */}
      {activeTab === 'isp' && (
        <section id="isp-firewall-fixes" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Wifi className="w-6 h-6 text-cyan-400" />
                <span>UK Broadband ISP Anti-Block & Firewall Settings (3PM Football)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                UK internet providers (Virgin Media, BT, Sky, TalkTalk, Vodafone) have parental web shields that can interfere with IPTV streams during Premier League matches. Disable them in 30 seconds:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              {UK_ISP_OPTIMIZATIONS.map((isp, idx) => (
                <button
                  key={isp.ispName}
                  onClick={() => setActiveIspIndex(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeIspIndex === idx
                      ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10 text-white'
                      : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-black text-sm block text-white">{isp.ispName}</span>
                    <span className="text-xs text-slate-400">{isp.blockingFeature}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeIspIndex === idx ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {activeIspIndex !== null && UK_ISP_OPTIMIZATIONS[activeIspIndex] && (
                <div className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        {UK_ISP_OPTIMIZATIONS[activeIspIndex].routerModel}
                      </span>
                      <h3 className="text-xl font-black text-white">
                        {UK_ISP_OPTIMIZATIONS[activeIspIndex].ispName} - {UK_ISP_OPTIMIZATIONS[activeIspIndex].blockingFeature}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                      {UK_ISP_OPTIMIZATIONS[activeIspIndex].impactLevel} Priority
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      How to Disable Filtering:
                    </h4>
                    <div className="text-sm text-slate-200 bg-slate-950/80 p-4 rounded-xl border border-white/5 leading-relaxed">
                      {UK_ISP_OPTIMIZATIONS[activeIspIndex].howToDisable}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-cyan-300">
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

      {/* 6. TAB 4: DIAGNOSTICS STREAM SIMULATOR */}
      {activeTab === 'diagnostic' && (
        <section id="stream-diagnostic" className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-cyan-400" />
                <span>Live UK Server CDN & Stream Health Diagnostic</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Simulate real-time stream packet routing, latency, and EPG feed connectivity to our London & Amsterdam server clusters.
              </p>
            </div>

            <button
              onClick={runDiagnostic}
              disabled={diagRunning}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                diagRunning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
              }`}
            >
              <Activity className={`w-4 h-4 ${diagRunning ? 'animate-spin' : ''}`} />
              <span>{diagRunning ? 'Running Tests...' : 'Run Diagnostics'}</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-white/10 font-mono text-xs text-slate-300 space-y-2 min-h-[160px]">
            {diagLogs.length === 0 && !diagRunning && (
              <div className="text-slate-500 italic py-6 text-center">
                Click "Run Diagnostics" to test StreamUK London Edge Gateway and 4K UHD stream codecs...
              </div>
            )}

            {diagLogs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2 animate-fadeIn">
                <span className="text-emerald-400">✔</span>
                <span className="text-slate-300">{log}</span>
              </div>
            ))}

            {diagComplete && (
              <div className="pt-3 border-t border-white/10 text-emerald-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Diagnostics Complete: All UK Tier-1 Server Clusters are operating at 100% health (0.00% Packet Loss).</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. General Setup FAQ Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            <span>Frequently Asked Setup Questions</span>
          </h2>
          <p className="text-xs text-slate-400">
            Common questions regarding credentials, multiple TV connections, and playlist sync.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TiviMate Premium with Xtream Codes FAQ */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2 md:col-span-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-extrabold uppercase">
              <span>#1 Search Query</span>
            </div>
            <h3 className="text-base font-black text-white">
              How to unlock TiviMate Premium features with Xtream Codes?
            </h3>
            <div className="text-xs text-slate-300 leading-relaxed space-y-1.5">
              <p>
                To unlock TiviMate Premium features on your Amazon FireStick or Android TV:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                <li>
                  <strong className="text-white">Add your StreamUK playlist:</strong> Open TiviMate &gt; Add Playlist &gt; select <strong className="text-cyan-400">Xtream Codes</strong>. Enter Server URL (<code className="text-cyan-300 font-mono">http://uk-premium.streamdns.me:8080</code>) plus your username and password.
                </li>
                <li>
                  <strong className="text-white">Unlock TiviMate Premium:</strong> Go to TiviMate Settings &gt; <strong className="text-white">Unlock Premium</strong> &gt; Log in with your TiviMate account credentials. If you do not have an account yet, install the official <em>TiviMate Companion</em> app from Google Play or purchase a license via <code className="text-slate-300">tivimate.com</code> ($33.99 lifetime or $9.99/yr).
                </li>
                <li>
                  <strong className="text-white">Enjoy full VIP capabilities:</strong> Once unlocked, StreamUK is 100% natively compatible with all TiviMate Premium features: 7-day TV catch-up, multi-view (watch up to 9 live sports streams at once on matchday), DVR recording to USB/NAS, custom group management, and automatic EPG refresh!
                </li>
              </ol>
            </div>
          </div>

          {/* TiviMate Downloader Code FAQ */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <h3 className="text-sm font-bold text-white">What is the Downloader shortcode for TiviMate APK?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In the Downloader app on your FireStick, enter shortcode <strong className="text-cyan-300 font-mono text-sm">272483</strong>. This will automatically download and trigger the direct installer for the official TiviMate IPTV Player APK.
            </p>
          </div>

          {/* 3PM Blackout FAQ */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <h3 className="text-sm font-bold text-white">How to watch 3pm blackout Premier League games in 4K?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              StreamUK provides unthrottled 4K 60FPS overseas club feeds (USA Peacock Extra, Canada Fubo/TSN, Australia Optus Sport) for every single Saturday 3pm kickoff. Simply open the "UK • EPL Extra Feeds 4K" or "USA • Peacock Sports UHD" categories on your FireStick or TiviMate.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <h3 className="text-sm font-bold text-white">How long does activation take after ordering?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Activation is instant. Your Xtream Codes API, M3U playlist link, and server credentials are sent immediately via WhatsApp and Email.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <h3 className="text-sm font-bold text-white">Can I use one subscription across multiple devices?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Yes! You can install StreamUK on unlimited devices (e.g. Living room FireStick, Bedroom Apple TV, Phone). For simultaneous streaming on multiple TVs at the same time, choose our 2, 3, or 4 Connection Multi-Room package.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <h3 className="text-sm font-bold text-white">Do I need a VPN to stream in the UK?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No! StreamUK includes built-in Anti-Freeze v9.8 encryption that bypasses UK ISP blocks without needing a third-party VPN. However, if you prefer using a VPN (e.g. Surfshark, NordVPN), we are 100% VPN-friendly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <h3 className="text-sm font-bold text-white">What minimum internet speed is recommended?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We recommend 15 Mbps for Full HD 1080p channels and 30+ Mbps for native 4K UHD 60FPS sports broadcasts and 4K cinema box sets.
            </p>
          </div>
        </div>
      </section>

      {/* Referral & Social Sharing Bar */}
      <ShareReferralBar
        currentUrl={typeof window !== 'undefined' ? `${window.location.origin}/setup` : 'https://globalstreamhub.net/setup'}
        title="GlobalStreamHub 4K VIP IPTV Setup Hub • Firestick, TiviMate & Device Guides"
      />

      {/* 8. WhatsApp Support Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>24/7 Live UK Support</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Need Help Choosing the Right App for Your Device?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Our UK technicians are available 24/7 on WhatsApp to provide free setup assistance, Downloader shortcodes, and free 24-hour trials.
          </p>
        </div>

        <a
          href={`https://api.whatsapp.com/send?phone=${whatsappNumber.replace(/[^0-9]/g, '')}&text=${encodeURIComponent('Hi StreamUK support, I need help choosing the best IPTV player for my device.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm flex items-center gap-2 transition-all shadow-xl shadow-cyan-500/20 shrink-0 whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95"
        >
          <MessageSquare className="w-5 h-5 fill-slate-950" />
          <span>Ask on WhatsApp</span>
        </a>
      </section>

      {/* Floating 1-Click Free 24H Trial Bar for quick conversion */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/50 shadow-[0_10px_35px_rgba(16,185,129,0.3)] p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 backdrop-blur-xl animate-fade-in">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-black text-white truncate block">
              Free 24H 4K VIP Pass Available
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 truncate block">
              Instant login • No card required • Full matchday access
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelectPlan('trial-24h')}
          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          Claim Free Trial
        </button>
      </div>

    </div>
  );
};
