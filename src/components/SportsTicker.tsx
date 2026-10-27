import React from 'react';
import { SportsFixture } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { Radio } from 'lucide-react';

interface SportsTickerProps {
  fixtures: SportsFixture[];
  loading?: boolean;
}

export const SportsTicker: React.FC<SportsTickerProps> = ({ fixtures, loading }) => {
  const { t } = useTranslation();

  const handleScrollToSports = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('sports');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading && (!fixtures || fixtures.length === 0)) {
    return (
      <div className="bg-[#03050d] border-y border-indigo-500/20 py-2 flex justify-center items-center h-10">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{t.fixtures?.syncDaily || 'Syncing real-time matchday feeds'}...</span>
        </div>
      </div>
    );
  }

  if (!fixtures || fixtures.length === 0) return null;

  // Duplicate items for continuous looping animation
  const tickerItems = [...fixtures, ...fixtures];

  return (
    <div className="bg-[#02040a] border-y border-indigo-500/20 flex items-center relative overflow-hidden select-none h-12 z-20">
      
      {/* Left Static Live Badge */}
      <div 
        className="hidden sm:flex items-center gap-2 pl-4 pr-3.5 py-1.5 bg-gradient-to-r from-indigo-950/90 to-transparent border-r border-indigo-500/20 shrink-0 z-20 cursor-pointer"
        onClick={handleScrollToSports}
        title="Live sports fixtures updated daily at midnight UK time • Click to explore full matchday broadcast schedule"
      >
        <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider text-sky-300 font-mono flex items-center gap-1.5">
          <span>LIVE 4K SPORTS</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
        </span>
      </div>

      {/* Side fades */}
      <div className="absolute left-0 sm:left-40 top-0 bottom-0 w-12 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Ticker Line */}
      <div 
        onClick={handleScrollToSports}
        className="flex items-center gap-9 whitespace-nowrap animate-ticker cursor-pointer hover:opacity-95 transition-opacity"
        title="Updated daily at midnight (UK time) • Hover to pause • Click to view full matchday schedules and channels"
      >
        {tickerItems.map((fixture, idx) => {
          const isLive = fixture.isLive;
          const isToday = fixture.date.toLowerCase().includes('today');
          const isTomorrow = fixture.date.toLowerCase().includes('tomorrow');

          return (
            <div key={`${fixture.id}-${idx}`} className="inline-flex items-center gap-3.5 text-sm shrink-0">
              {/* League Badge */}
              <span className={`px-2.5 py-0.5 rounded font-black text-xs uppercase tracking-wider font-mono border ${
                fixture.league.includes('Premier') 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                  : fixture.league.includes('Champions')
                  ? 'bg-blue-500/20 text-sky-300 border-blue-500/30'
                  : fixture.league.includes('Bundesliga')
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {fixture.league.includes('Premier') ? 'Premier League' : fixture.league.includes('Champions') ? 'UCL' : fixture.league.includes('Bundesliga') ? 'Bundesliga' : fixture.league.includes('NFL') ? 'NFL' : fixture.league.split(' ')[0]}
              </span>

              {/* Live Status or Date Badge */}
              {isLive ? (
                <span className="px-2 py-0.5 rounded bg-rose-500/25 border border-rose-500/50 text-rose-300 font-extrabold text-xs font-mono animate-pulse flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span>LIVE</span>
                </span>
              ) : isToday ? (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs font-mono">
                  TODAY
                </span>
              ) : isTomorrow ? (
                <span className="px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/40 text-sky-300 font-extrabold text-xs font-mono">
                  TOMORROW
                </span>
              ) : (
                <span className="text-slate-400 font-mono text-xs">
                  {fixture.date}
                </span>
              )}

              {/* Match Teams */}
              <span className="font-bold text-white text-sm sm:text-[15px] flex items-center gap-2">
                <span className="text-slate-100 font-semibold">{fixture.homeTeam}</span>
                <span className="text-sky-400 font-semibold text-xs px-1">vs</span>
                <span className="text-slate-100 font-semibold">{fixture.awayTeam}</span>
              </span>

              {/* Time */}
              <span className="text-amber-300/90 font-mono text-xs sm:text-[13px] font-bold">
                {fixture.timeUK}
              </span>

              {/* Top Broadcast Channel */}
              {fixture.channels && fixture.channels[0] && (
                <span className="hidden md:inline-block px-2 py-0.5 rounded bg-white/5 text-slate-200 font-mono text-xs border border-white/10">
                  {fixture.channels[0].replace(' (USA)', '').replace(' (Canada)', '')}
                </span>
              )}

              <span className="text-slate-700 font-bold ml-1.5">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
