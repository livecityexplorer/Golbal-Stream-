import React, { useState } from 'react';
import { CBR_TV_DESKTOP_DOWNLOADS } from '../../data/setupGuidesData';
import { CbrTvDesktopRelease } from '../../types';
import { 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Tv, 
  Film, 
  Clapperboard, 
  Calendar, 
  Trophy, 
  Layers, 
  Lock,
  Terminal,
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface CbrTvDesktopDownloadsProps {
  onOpenGuide?: () => void;
  showFullDetails?: boolean;
}

export const CbrTvDesktopDownloads: React.FC<CbrTvDesktopDownloadsProps> = ({
  onOpenGuide,
  showFullDetails = true,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'windows' | 'mac' | 'linux'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

  const filteredReleases = selectedFilter === 'all'
    ? CBR_TV_DESKTOP_DOWNLOADS
    : CBR_TV_DESKTOP_DOWNLOADS.filter(r => r.osCategory === selectedFilter);

  const corePillars = [
    { name: 'Live TV', icon: Tv, desc: '18,500+ unthrottled channels' },
    { name: 'Movies', icon: Film, desc: '4K cinema & TMDB metadata' },
    { name: 'Series', icon: Clapperboard, desc: 'Complete seasons & binge queue' },
    { name: 'TV Guide', icon: Calendar, desc: 'Full 7-day interactive EPG' },
    { name: 'Sports Fixtures', icon: Trophy, desc: 'Match kickoffs & live scores' },
    { name: '4K / 8K Player', icon: Zap, desc: 'Hardware-accelerated engine' },
    { name: 'Proxy Layer', icon: Lock, desc: 'One-tap anti-ISP block bypass' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 7 Core Feature Badges */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-amber-400/30 space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Official StreamUK Player for PC & Mac
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            All 7 features built-in • Native 4K/8K rendering
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {corePillars.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.name}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5 hover:border-amber-400/40 transition-colors flex flex-col items-center text-center gap-1 group"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  {p.name}
                </span>
                <span className="text-[9px] text-slate-400 leading-tight">
                  {p.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* OS Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="inline-flex bg-slate-900/80 p-1 rounded-xl border border-white/10 gap-1 overflow-x-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Versions ({CBR_TV_DESKTOP_DOWNLOADS.length})
          </button>
          <button
            onClick={() => setSelectedFilter('windows')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === 'windows'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Windows (PC & Laptop)
          </button>
          <button
            onClick={() => setSelectedFilter('mac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === 'mac'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            macOS (Apple Silicon & Intel)
          </button>
          <button
            onClick={() => setSelectedFilter('linux')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === 'linux'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Linux (.deb, AppImage, ARM)
          </button>
        </div>

        <a
          href="https://webtv.iptvsmarters.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs font-bold transition-colors self-start sm:self-auto border border-cyan-500/20"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Prefer Browser? Instant Web Player →</span>
        </a>
      </div>

      {/* Downloads Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReleases.map((release) => (
          <div
            key={release.platformId}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 group shadow-lg ${
              release.recommended
                ? 'bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border-amber-400/60 shadow-amber-500/10'
                : 'bg-slate-900/80 border-white/10 hover:border-cyan-400/50 hover:bg-slate-900'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    {release.osCategory.toUpperCase()}
                  </span>
                  <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                    {release.osName}
                  </h3>
                </div>

                {release.badge && (
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    release.recommended
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-slate-800 text-slate-300 border-white/10'
                  }`}>
                    {release.badge}
                  </span>
                )}
              </div>

              <div className="text-xs font-semibold text-cyan-300">
                {release.targetHardware}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {release.description}
              </p>

              {/* Install Terminal Command if applicable */}
              {release.installCommand && (
                <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 font-mono text-[11px] flex items-center justify-between gap-2 text-slate-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{release.installCommand}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(release.installCommand!, `cmd-${release.platformId}`)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 cursor-pointer"
                    title="Copy command"
                  >
                    {copiedKey === `cmd-${release.platformId}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Download Actions */}
            <div className="space-y-2.5 pt-3 border-t border-white/5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-white font-bold">{release.filename}</span>
                <span>{release.fileSize} • {release.updatedDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={release.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    release.recommended
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {release.osCategory === 'windows' ? 'for Windows' : release.osCategory === 'mac' ? 'for Mac' : '.deb / Package'}</span>
                </a>

                <button
                  onClick={() => handleCopy(release.downloadUrl, `url-${release.platformId}`)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
                  title="Copy direct download link"
                >
                  {copiedKey === `url-${release.platformId}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Official Advice & Security Notices */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-2.5 text-xs text-slate-300 leading-relaxed">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">ISP Proxy Layer Protection:</strong> The built-in proxy layer helps get around UK internet provider blocks (Virgin Media, BT, Sky, Vodafone, TalkTalk) during live Saturday 3pm football kickoffs, but doesn’t guarantee a bypass in every single case. Some networks may block the relay too.
          </p>
        </div>

        <div className="flex items-start gap-2.5 pt-1 border-t border-white/5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Verification & Browser Streaming:</strong> The SHA-256 code under each download lets you verify that a file was not changed. Prefer the browser? You can use our zero-install Web Player directly with nothing to install.
          </p>
        </div>
      </div>

    </div>
  );
};
