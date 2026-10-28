import React, { useState } from 'react';
import { MOCK_VOD } from '../data/mockData';
import { VodItem } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { 
  Film, 
  Star, 
  Play, 
  Tv, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Volume2, 
  LayoutGrid, 
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

interface VodShowcaseProps {
  onSelectPlan?: (planId: string) => void;
}

export const VodShowcase: React.FC<VodShowcaseProps> = ({ onSelectPlan }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<'tmdb_movies' | 'tmdb_series' | 'uk_boxsets' | 'us_canada_hits'>('tmdb_movies');
  const [selectedItem, setSelectedItem] = useState<VodItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileLayout, setMobileLayout] = useState<'grid' | 'carousel'>('grid');

  const filteredItems = MOCK_VOD.filter(item => item.category === activeCategory)
    .sort((a, b) => (a.tmdbRank || 99) - (b.tmdbRank || 99));

  const getRankBadgeStyle = (rank?: number) => {
    if (rank === 1) {
      return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/40 font-black border border-yellow-200';
    }
    if (rank === 2) {
      return 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 shadow-sm font-black border border-white';
    }
    if (rank === 3) {
      return 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-sm font-black border border-amber-400/40';
    }
    return 'bg-slate-900/90 text-white border border-white/20 font-extrabold';
  };

  const displayedItems = isExpanded ? filteredItems : filteredItems.slice(0, 6);

  return (
    <section id="vod" className="py-16 sm:py-24 bg-[#050713] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] sm:text-xs font-black border border-amber-500/20 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>{t.vod?.badge || 'TOP 10 STREAMING NOW • 2026 DIGITAL RELEASES'}</span>
            </div>
            
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t.vod?.title || '4K Cinema & '}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400">
                {t.vod?.titleHighlight || 'VOD Boxsets'}
              </span>
            </h2>
            
            <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
              {t.vod?.subtitle || 'Top 10 digital releases automatically updated daily. Stream newest blockbusters and boxsets in 4K HDR & Dolby Atmos.'}
            </p>
          </div>

          {/* Mobile Layout Switcher: Grid vs Carousel */}
          <div className="flex sm:hidden items-center justify-between p-1 bg-slate-900/90 rounded-xl border border-white/10 w-fit shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setMobileLayout('grid')}
              className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mobileLayout === 'grid'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>2-Col Grid</span>
            </button>
            <button
              onClick={() => setMobileLayout('carousel')}
              className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mobileLayout === 'carousel'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Swipe Reel</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 p-1 rounded-2xl border border-white/10 mb-6 overflow-x-auto no-scrollbar shadow-xl">
          <button
            onClick={() => {
              setActiveCategory('tmdb_movies');
              setIsExpanded(false);
            }}
            className={`min-h-[42px] flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeCategory === 'tmdb_movies'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>🎬 {t.vod?.tmdbMovies || 'Top Movies'}</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('tmdb_series');
              setIsExpanded(false);
            }}
            className={`min-h-[42px] flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeCategory === 'tmdb_series'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>📺 {t.vod?.tmdbSeries || 'TV Series'}</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('uk_boxsets');
              setIsExpanded(false);
            }}
            className={`min-h-[42px] flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeCategory === 'uk_boxsets'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-sm leading-none">🇬🇧</span>
            <span>{t.vod?.ukBoxsets || 'UK Boxsets'}</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('us_canada_hits');
              setIsExpanded(false);
            }}
            className={`min-h-[42px] flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeCategory === 'us_canada_hits'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-sm leading-none">🇺🇸🇨🇦</span>
            <span>{t.vod?.usHits || 'US & CA Hits'}</span>
          </button>
        </div>

        {/* VOD Cards Container: Responsive 2-Col Grid or Swipe Carousel on Mobile */}
        <div className={`
          ${mobileLayout === 'carousel' 
            ? 'flex overflow-x-auto sm:grid gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 no-scrollbar pb-3 snap-x snap-mandatory' 
            : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4'
          }
        `}>
          {displayedItems.map((item) => {
            const isTop3 = (item.tmdbRank || 99) <= 3;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative rounded-xl sm:rounded-2xl bg-slate-900/90 border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg active:scale-95 ${
                  mobileLayout === 'carousel' ? 'min-w-[155px] max-w-[170px] snap-start shrink-0 sm:min-w-0 sm:max-w-none sm:shrink' : 'w-full'
                } ${
                  isTop3 
                    ? 'border-amber-500/40 hover:border-amber-400 shadow-amber-500/5' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* Poster Box */}
                <div className="relative aspect-[2/3] overflow-hidden bg-slate-950">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-black backdrop-blur-md ${getRankBadgeStyle(item.tmdbRank)}`}>
                      #{item.tmdbRank}
                    </span>
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute top-2 right-2 z-10">
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[9px] sm:text-[10px] font-black text-amber-300 border border-amber-400/30">
                      {item.quality}
                    </span>
                  </div>

                  {/* Play Button Overlay (Visible on hover on desktop, or subtle icon on mobile) */}
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1.5px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/50 transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="p-2.5 sm:p-3 space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                      <span className="font-medium">{item.year}</span>
                      <span className="flex items-center gap-0.5 font-bold text-amber-400">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        {item.tmdbScore.toFixed(1)}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400">
                    <span className="truncate max-w-[80px]">{item.duration}</span>
                    <span className="text-amber-400/90 font-mono font-medium">Dolby Atmos</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile-Friendly Expand / Collapse Toggle */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="min-h-[44px] px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-amber-300 text-xs sm:text-sm font-bold rounded-xl border border-amber-500/30 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 text-amber-400" />
                <span>Show Top 6 Titles</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">Collapse</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-amber-400" />
                <span>Show All {filteredItems.length} Titles</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  +{filteredItems.length - 6} More
                </span>
              </>
            )}
          </button>
        </div>

        {/* Footer Nominative Fair Use Note */}
        <p className="text-center text-[10px] text-slate-500 mt-4">
          * 65,000+ title catalog preview. All digital titles indexed for nominative descriptive reference.
        </p>

      </div>

      {/* Mobile-Optimized Detail Modal for Selected VOD Item */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
        >
          <div 
            className="relative w-full max-w-xl bg-slate-900 border border-white/15 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-scale-up max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button (Always accessible) */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer shadow-lg"
              title="Close modal"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Container on Mobile */}
            <div className="overflow-y-auto no-scrollbar flex-1">
              
              {/* Header Hero Banner (Compact on mobile) */}
              <div className="relative h-44 sm:h-56 bg-slate-950 overflow-hidden">
                <img
                  src={selectedItem.thumbnail}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/30" />
                
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-black backdrop-blur-md ${getRankBadgeStyle(selectedItem.tmdbRank)}`}>
                      #{selectedItem.tmdbRank} TMDB
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                      {selectedItem.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4">
                
                {/* Meta Tags Bar */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[11px] font-black border border-sky-500/30">
                    {selectedItem.quality}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[11px] font-black border border-amber-500/30 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {selectedItem.tmdbScore.toFixed(1)} TMDB
                  </span>
                  <span className="text-slate-400 text-xs font-medium">({selectedItem.tmdbVotes})</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-medium">{selectedItem.year}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-medium">Rated {selectedItem.rating}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-medium">{selectedItem.duration}</span>
                </div>

                {/* Synopsis */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Audio & Codec Specs */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      Audio Track:
                    </span>
                    <span className="font-bold text-white text-right">{selectedItem.audio}</span>
                  </div>

                  {selectedItem.network && (
                    <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-white/5">
                      <span className="text-slate-400">Digital Provider:</span>
                      <span className="font-bold text-amber-400">{selectedItem.network}</span>
                    </div>
                  )}
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      if (onSelectPlan) {
                        onSelectPlan('trial-24h');
                      } else {
                        const el = document.getElementById('pricing');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm text-center shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Stream in 4K UHD with Free 24H Pass</span>
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-2">
                    Instant automated access on FireStick, Smart TV, Apple TV &amp; Android.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
