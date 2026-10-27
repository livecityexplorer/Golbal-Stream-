import React, { useState } from 'react';
import { MOCK_VOD } from '../data/mockData';
import { VodItem } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { Film, Star, Play, Sparkles, Tv, Flame, RefreshCw, X, CheckCircle2, ShieldCheck, Volume2, Award, ChevronDown, ChevronUp } from 'lucide-react';

export const VodShowcase: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<'tmdb_movies' | 'tmdb_series' | 'uk_boxsets' | 'us_canada_hits'>('tmdb_movies');
  const [selectedItem, setSelectedItem] = useState<VodItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredItems = MOCK_VOD.filter(item => item.category === activeCategory)
    .sort((a, b) => (a.tmdbRank || 99) - (b.tmdbRank || 99));

  const getRankBadgeStyle = (rank?: number) => {
    if (rank === 1) {
      return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/40 font-black border border-yellow-200';
    }
    if (rank === 2) {
      return 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 shadow-md font-black border border-white';
    }
    if (rank === 3) {
      return 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md font-black border border-amber-400/40';
    }
    return 'bg-slate-900/90 text-white border border-white/20 font-extrabold';
  };

  return (
    <section id="vod" className="py-24 bg-[#050713] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/20 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{t.vod?.badge || 'TOP 10 STREAMING NOW • 2026 DIGITAL RELEASES'}</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t.vod?.title || '4K Cinema & '}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400">
                {t.vod?.titleHighlight || 'VOD Boxsets'}
              </span>
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.vod?.subtitle || 'Top 10 digital releases automatically updated daily. Stream newest blockbusters and boxsets in 4K HDR & Dolby Atmos.'}
            </p>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 mb-8 overflow-x-auto no-scrollbar shadow-xl">
          <button
            onClick={() => setActiveCategory('tmdb_movies')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'tmdb_movies'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>🎬 {t.vod?.tmdbMovies || 'Top Movies'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('tmdb_series')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'tmdb_series'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>📺 {t.vod?.tmdbSeries || 'Top TV Series'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('uk_boxsets')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'uk_boxsets'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-base leading-none">🇬🇧</span>
            <span>{t.vod?.ukBoxsets || 'UK Boxsets'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('us_canada_hits')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'us_canada_hits'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-base leading-none">🇺🇸🇨🇦</span>
            <span>{t.vod?.usHits || 'US & Canada Hits'}</span>
          </button>
        </div>

        {/* TMDB Top 10 Grid */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-visible gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 no-scrollbar pb-4 snap-x snap-mandatory">
          {filteredItems.slice(0, isExpanded ? undefined : 5).map((item) => {
            const isTop3 = (item.tmdbRank || 99) <= 3;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative rounded-2xl bg-slate-900/80 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xl min-w-[165px] sm:min-w-0 snap-start shrink-0 sm:shrink ${
                  isTop3 
                    ? 'border-amber-500/40 hover:border-amber-400' 
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

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Rank Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black backdrop-blur-md ${getRankBadgeStyle(item.tmdbRank)}`}>
                      #{item.tmdbRank}
                    </span>
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-400/30">
                      {item.quality}
                    </span>
                  </div>

                  {/* Play Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/40 transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>{item.year}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {item.tmdbScore.toFixed(1)}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[90px]">{item.duration}</span>
                    <span className="text-amber-400/80 font-mono font-medium">Dolby Atmos</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="min-h-[48px] px-6 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-amber-300 text-xs sm:text-sm font-bold rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-5 h-5 text-amber-400" />
                <span>Show Fewer Titles</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">Collapse</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5 text-amber-400" />
                <span>Show All 10 TMDB Top Rated</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  +{filteredItems.length - 5} More
                </span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Detail Modal for Selected VOD Item */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col sm:flex-row">
              {/* Poster Column */}
              <div className="sm:w-5/12 relative aspect-[2/3] sm:aspect-auto bg-slate-950">
                <img
                  src={selectedItem.thumbnail}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black backdrop-blur-md ${getRankBadgeStyle(selectedItem.tmdbRank)}`}>
                    #{selectedItem.tmdbRank} TMDB
                  </span>
                </div>
              </div>

              {/* Info Column */}
              <div className="sm:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[11px] font-black border border-sky-500/30">
                      {selectedItem.quality}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[11px] font-black border border-amber-500/30 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {selectedItem.tmdbScore.toFixed(1)} TMDB
                    </span>
                    <span className="text-slate-400 text-xs">({selectedItem.tmdbVotes})</span>
                  </div>

                  <h3 className="text-2xl font-black text-white leading-tight">
                    {selectedItem.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-2">
                    <span>{selectedItem.year}</span>
                    <span>•</span>
                    <span>Rated {selectedItem.rating}</span>
                    <span>•</span>
                    <span>{selectedItem.duration}</span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm mt-4 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      {t.vod?.audioTracks || 'Audio Track'}:
                    </span>
                    <span className="font-bold text-white">{selectedItem.audio}</span>
                  </div>

                  {selectedItem.network && (
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Network / Platform:</span>
                      <span className="font-bold text-amber-400">{selectedItem.network}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href="#pricing"
                      onClick={() => setSelectedItem(null)}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs text-center shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{t.pricing?.activateTrialBtn || 'Stream in 4K Now'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
