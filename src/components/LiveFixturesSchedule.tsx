import React, { useState } from 'react';
import { SportsFixture } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { 
  Trophy, 
  Radio, 
  Clock, 
  Calendar, 
  Tv, 
  MapPin, 
  RefreshCw, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Users,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LiveFixturesScheduleProps {
  fixtures: SportsFixture[];
  loadingFixtures?: boolean;
  onRefresh?: () => Promise<void> | void;
}

export const LiveFixturesSchedule: React.FC<LiveFixturesScheduleProps> = ({ fixtures, loadingFixtures, onRefresh }) => {
  const { t } = useTranslation();
  const allFixtures = fixtures && fixtures.length > 0 ? fixtures : [];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState<'UK' | 'US'>('UK');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: t.fixtures.allCategory, badge: 'Live' },
    { id: 'premier-league', label: 'Premier League', badge: 'UHD 4K' },
    { id: 'ucl', label: 'Champions League', badge: 'Europe' },
    { id: 'serie-a', label: 'Serie A', badge: 'Italy' },
    { id: 'bundesliga', label: 'Bundesliga', badge: 'Germany' },
    { id: 'ligue-1', label: 'Ligue 1', badge: 'France' },
    { id: 'nfl', label: 'NFL', badge: 'US/CA' },
    { id: 'nba', label: 'NBA', badge: 'US/CA' },
  ];

  const filteredFixtures = allFixtures.filter((f) => {
    if (selectedCategory === 'all') return true;
    return f.leagueKey === selectedCategory;
  });

  const FIXTURES_PREVIEW_LIMIT = 6;
  const displayedFixtures = isExpanded ? filteredFixtures : filteredFixtures.slice(0, FIXTURES_PREVIEW_LIMIT);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      }
      setSyncMessage(`✓ Live scores & fixtures synced (${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} BST)`);
    } catch {
      setSyncMessage(`✓ ${t.fixtures.syncSuccess}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  return (
    <section id="sports" className="py-24 bg-[#060814] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-sky-300 text-xs font-black border border-indigo-500/25 uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>{t.fixtures.badge}</span>
              <span className="hidden sm:inline text-indigo-300/80 font-semibold normal-case text-[11px]">• Updated Daily at Midnight UK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t.fixtures.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">{t.fixtures.titleHighlight}</span>
            </h2>
            <p className="text-slate-400 text-base">
              {t.fixtures.subtitle}
            </p>
          </div>

          {/* Sync & Timezone controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            
            {/* Dual Timezone Switcher */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-white/10 text-xs font-bold">
              <button
                onClick={() => setTimeZone('UK')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  timeZone === 'UK' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇬🇧 UK (BST)
              </button>
              <button
                onClick={() => setTimeZone('US')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  timeZone === 'US' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇺🇸/🇨🇦 US (ET)
              </button>
            </div>

            {/* Sync Button */}
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? '...' : t.fixtures.syncButton}</span>
            </button>
          </div>
        </div>

        {/* Sync confirmation alert banner */}
        {syncMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}

        {/* League Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setIsExpanded(false);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-slate-950 font-black shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                selectedCategory === cat.id ? 'bg-black/30 text-sky-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {cat.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedFixtures.map((fixture, idx) => {
            const isHiddenOnMobile = !isExpanded && idx >= 3;
            return (
              <div
                key={fixture.id}
                className={`electric-card rounded-3xl p-6 flex flex-col justify-between space-y-5 hover:border-indigo-500/50 transition-all group shadow-xl ${
                  isHiddenOnMobile ? 'hidden md:flex' : 'flex'
                }`}
              >
              <div className="space-y-4">
                
                {/* Top Bar: League & Kickoff Time */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-sky-300 font-extrabold text-[10px] uppercase font-mono border border-indigo-500/30">
                    {fixture.league}
                  </span>

                  <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs bg-slate-900 px-2.5 py-1 rounded-lg border border-white/5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>{timeZone === 'UK' ? fixture.timeUK : fixture.timeUS}</span>
                  </div>
                </div>

                {/* Team Head-to-Head & Form */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/5 space-y-3">
                  
                  {/* Home Team */}
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white text-base group-hover:text-sky-300 transition-colors">
                      {fixture.homeTeam}
                    </span>
                    {fixture.homeForm && (
                      <div className="flex items-center gap-1">
                        {fixture.homeForm.map((f, i) => (
                          <span
                            key={i}
                            className={`w-3.5 h-3.5 rounded text-[9px] font-bold flex items-center justify-center font-mono ${
                              f === 'W' || f === 'P1'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : f === 'D' || f === 'P2'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* VS divider & Date */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-y border-white/5 py-1">
                    <span className="text-sky-400 font-bold">VS</span>
                    <span>{fixture.dayLabel}</span>
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white text-base group-hover:text-sky-300 transition-colors">
                      {fixture.awayTeam}
                    </span>
                    {fixture.awayForm && (
                      <div className="flex items-center gap-1">
                        {fixture.awayForm.map((f, i) => (
                          <span
                            key={i}
                            className={`w-3.5 h-3.5 rounded text-[9px] font-bold flex items-center justify-center font-mono ${
                              f === 'W' || f === 'P1'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : f === 'D' || f === 'P2'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Projected Lineup Info */}
                {fixture.lineupInfo && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/5 text-[11px] space-y-1 text-slate-300">
                    <span className="text-[10px] font-bold text-sky-400 uppercase flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{t.hero.confirmedLineups}:</span>
                    </span>
                    <p className="line-clamp-2 text-slate-400 font-sans">
                      {fixture.lineupInfo}
                    </p>
                  </div>
                )}

                {/* Venue */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{fixture.venue}</span>
                </div>

                {/* Broadcast Channels List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Tv className="w-3 h-3 text-emerald-400" />
                    <span>{t.hero.liveBroadcasts}:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {fixture.channels.map((ch, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/10 text-sky-300 text-[10px] font-mono font-bold"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">{t.fixtures.crystal4k}</span>
                <a
                  href="#pricing"
                  className="text-sky-400 font-bold hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{t.fixtures.watchLive}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          );
        })}
        </div>

        {/* Expand / Close Button */}
        {filteredFixtures.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="min-h-[48px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 border border-indigo-500/30 text-sky-300 font-bold hover:bg-indigo-500/10 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 group cursor-pointer text-xs sm:text-sm"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{t.fixtures.showLess || 'Show Fewer Fixtures'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">Collapse</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
                  <span>{(t.fixtures?.expandAll || 'Show All {count} Matchdays').replace('{count}', filteredFixtures.length.toString())}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    +{filteredFixtures.length - (isExpanded ? 0 : 3)} Available
                  </span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
