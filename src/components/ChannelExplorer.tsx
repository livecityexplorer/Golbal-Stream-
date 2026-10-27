import React, { useState } from 'react';
import { MOCK_CHANNELS, CHANNEL_CATEGORIES } from '../data/mockData';
import { useTranslation } from '../context/LanguageContext';
import { 
  Search, 
  Tv, 
  Play, 
  Radio, 
  Clock, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  Globe, 
  Film, 
  Trophy, 
  Zap, 
  Flame, 
  Smile,
  ShieldCheck,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ChannelExplorer: React.FC = () => {
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedRegionTab, setSelectedRegionTab] = useState<'all' | 'uk' | 'usa' | 'canada' | 'cinema' | 'ppv'>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPackagesExpanded, setIsPackagesExpanded] = useState(false);

  const filteredChannels = MOCK_CHANNELS.filter((channel) => {
    // Region tab filtering
    if (selectedRegionTab === 'uk') {
      if (!channel.category.startsWith('uk_')) return false;
    } else if (selectedRegionTab === 'usa') {
      if (!channel.category.startsWith('us_')) return false;
    } else if (selectedRegionTab === 'canada') {
      if (!channel.category.startsWith('ca_')) return false;
    } else if (selectedRegionTab === 'cinema') {
      if (channel.category !== 'uk_sky_cinema' && channel.category !== 'us_cinema' && channel.category !== 'ca_entertainment') return false;
    } else if (selectedRegionTab === 'ppv') {
      if (channel.category !== 'uk_ppv_dazn' && !channel.name.includes('Box Office') && !channel.name.includes('PPV')) return false;
    }

    // Specific category filter
    const matchesCategory = activeCategory === 'all' || channel.category === activeCategory;

    // Search query matching
    const matchesSearch =
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.currentProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.nextProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const CHANNELS_PREVIEW_LIMIT = 6;
  const displayedChannels = isExpanded ? filteredChannels : filteredChannels.slice(0, CHANNELS_PREVIEW_LIMIT);

  const packagesList = [
    {
      icon: Trophy,
      color: 'text-sky-400',
      title: 'Premier & Live Sports (All)',
      desc: 'Main Event, Premier League, F1, Golf',
    },
    {
      icon: Film,
      color: 'text-indigo-400',
      title: 'Ultra Cinema & Boxsets (All)',
      desc: 'Premiere, Action, Sci-Fi 4K',
    },
    {
      icon: Zap,
      color: 'text-rose-400',
      title: 'European Arena & TNT (All)',
      desc: 'Ultimate 4K, UFC, MotoGP, Champions',
    },
    {
      icon: Flame,
      color: 'text-emerald-400',
      title: 'Global Fight Passes & PPV',
      desc: 'Boxing, Fight Night & Major Events',
    },
    {
      icon: Tv,
      color: 'text-amber-400',
      title: 'USA Network & Sports (All)',
      desc: 'Peacock, ESPN, HBO, NFL, NBA Pass',
    },
    {
      icon: Radio,
      color: 'text-cyan-400',
      title: 'Canada & International (All)',
      desc: 'TSN 1-5, Sportsnet 4K, Canal+, DAZN',
    },
  ];

  return (
    <section id="channels" className="py-20 sm:py-24 bg-[#060814] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-black border border-indigo-500/25 uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>{t.channels?.badge || '18,500+ CHANNELS • ALL PACKAGES INCLUDED'}</span>
          </div>
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.channels?.title || 'Explore 18,500+ Live Channels'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">
              {t.channels?.titleHighlight || 'In Crystal 4K & FHD'}
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.channels?.subtitle || 'Browse through our extensive library of live channels organized by country and category.'}
          </p>
        </div>

        {/* Package Inclusions Highlights Bar with Mobile Expand/Collapse */}
        <div className="mb-8">
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {packagesList.map((pkg, idx) => {
              const PkgIcon = pkg.icon;
              const isHiddenOnMobile = !isPackagesExpanded && idx >= 2;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl bg-slate-900/90 border border-white/5 space-y-1 transition-all ${
                    isHiddenOnMobile ? 'hidden sm:block' : 'block'
                  }`}
                >
                  <div className={`flex items-center gap-1.5 text-xs font-black ${pkg.color}`}>
                    <PkgIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{pkg.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{pkg.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Mobile Toggle Button for Packages */}
          <div className="mt-3 flex sm:hidden justify-center">
            <button
              onClick={() => setIsPackagesExpanded(!isPackagesExpanded)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPackagesExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
                  <span>Show Fewer Packages</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
                  <span>View All 6 Package Inclusions</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search & Filter Matrix */}
        <div className="electric-glass p-4 sm:p-5 rounded-3xl border border-white/10 mb-8 space-y-4 sm:space-y-5 shadow-2xl">
          
          {/* Main Package Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-white/5 pb-3">
            {[
              { id: 'all', label: `${t.channels?.allChannels || 'All Channels'} (18,500+)`, icon: Tv },
              { id: 'uk', label: '🇬🇧 UK Full Package (Sky, TNT, Cinema, BBC, DAZN)', icon: Trophy },
              { id: 'usa', label: '🇺🇸 USA Full Package (ESPN, Peacock, HBO, NFL, NBA)', icon: Zap },
              { id: 'canada', label: '🇨🇦 Canada Full Package (TSN 1-5, Sportsnet 4K, Crave)', icon: Flame },
              { id: 'cinema', label: '🎬 4K Cinema & HBO Movies', icon: Film },
              { id: 'ppv', label: '🥊 Live PPV & Box Office Fight Passes', icon: Star },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedRegionTab(tab.id as any);
                    setActiveCategory('all');
                    setIsExpanded(false);
                  }}
                  className={`min-h-[44px] px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    selectedRegionTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 text-slate-950 shadow-lg shadow-indigo-500/25 scale-[1.02]'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.channels?.searchPlaceholder || 'Search channels by name, country (e.g. Sky Sports, BBC, NBC)...'}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsExpanded(false);
              }}
              className="w-full bg-slate-900/90 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Detailed Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {CHANNEL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setIsExpanded(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white font-extrabold shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-sky-300 font-mono">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedChannels.map((channel) => (
            <div
              key={channel.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-indigo-500/40 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center font-black text-sm text-white group-hover:scale-105 transition-transform shrink-0 shadow-inner">
                    {channel.flag}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors">
                      {channel.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      {channel.country} • {(channel.category || '').replace('uk_', '').replace('us_', '').replace('ca_', '').replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full font-mono ${
                    channel.resolution === '4K UHD'
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                  }`}>
                    {channel.resolution}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {channel.fps} FPS
                  </span>
                </div>
              </div>

              {/* Now / Next EPG Guide */}
              <div className="space-y-1.5 text-xs border-t border-white/5 pt-3">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Play className="w-3 h-3 text-emerald-400" />
                    Now:
                  </span>
                  <span className="font-medium truncate max-w-[200px] text-[11px] text-slate-200">
                    {channel.currentProgram}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-600" />
                    Next:
                  </span>
                  <span className="truncate max-w-[200px] text-[11px]">
                    {channel.nextProgram}
                  </span>
                </div>
              </div>

              {/* Features Badges */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  {channel.catchupAvailable && (
                    <span className="text-sky-400 font-semibold flex items-center gap-0.5">
                      ✓ {t.channels?.catchup7days || '7-Day Catchup'}
                    </span>
                  )}
                  {channel.epgAvailable && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                      ✓ {t.channels?.epgGuide || 'EPG'}
                    </span>
                  )}
                </div>
                <span className="text-slate-500 font-mono">10Gbps Stream Node</span>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Close Button */}
        {filteredChannels.length > CHANNELS_PREVIEW_LIMIT && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="min-h-[48px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 border border-indigo-500/30 text-sky-300 font-bold hover:bg-indigo-500/10 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 group cursor-pointer text-xs sm:text-sm"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{t.fixtures?.showLess || 'Show Less Channels'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">Collapse</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
                  <span>{(t.fixtures?.expandAll || 'Show All {count} Channels').replace('{count}', filteredChannels.length.toString())}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    +{filteredChannels.length - CHANNELS_PREVIEW_LIMIT} More
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Footer info note */}
        <div className="mt-8 p-5 rounded-3xl bg-slate-950/90 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 shadow-xl">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              {t.channels?.showingChannels || 'Showing channels'}: <strong>{filteredChannels.length}</strong> / {t.channels?.totalChannels || 'Total'}: <strong>18,500+</strong>
            </span>
          </div>
          <a
            href="#pricing"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-slate-950 font-black text-xs hover:scale-105 transition-all shadow"
          >
            {t.pricing?.activateTrialBtn || 'Activate Free Trial'} →
          </a>
        </div>

      </div>
    </section>
  );
};
