import React, { useState } from 'react';
import { CBR_TV_DESKTOP_DOWNLOADS } from '../../data/setupGuidesData';
import { CbrTvDesktopRelease } from '../../types';
import { 
  Download, 
  Copy, 
  Check, 
  Globe, 
  Tv, 
  Film, 
  Clapperboard, 
  Calendar, 
  Trophy, 
  Zap, 
  Lock,
  Terminal,
  AlertCircle,
  ShieldCheck,
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
    { name: 'Live TV', icon: Tv, desc: '18,500+ channels' },
    { name: 'Movies', icon: Film, desc: '4K cinema library' },
    { name: 'Series', icon: Clapperboard, desc: 'Full box sets' },
    { name: 'TV Guide', icon: Calendar, desc: '7-day EPG' },
    { name: 'Sports', icon: Trophy, desc: 'Matchday fixtures' },
    { name: '4K/8K Engine', icon: Zap, desc: 'Hardware decoded' },
    { name: 'Proxy Layer', icon: Lock, desc: 'Anti-ISP block' },
  ];

  return (
    <div className="space-y-5">
      
      {/* 7 Core Feature Badges - Mobile Horizontal Scroll, Desktop Grid - Eye-Comfort Emerald */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#081a16] border border-emerald-900/50 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-emerald-900/40 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Official StreamUK Player for PC & Mac
            </span>
          </div>
          <span className="text-[11px] text-emerald-200/60">
            Native 4K/8K rendering • Built-in proxy relay
          </span>
        </div>

        {/* Feature Pills: smooth swipe on mobile */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5">
          {corePillars.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.name}
                className="shrink-0 w-28 sm:w-auto p-2.5 rounded-xl bg-[#061411] border border-emerald-900/40 hover:border-emerald-500/40 transition-colors flex flex-col items-center text-center gap-1 group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-100 truncate w-full">
                  {p.name}
                </span>
                <span className="text-[10px] text-emerald-200/60 leading-tight truncate w-full">
                  {p.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* OS Filter Tabs - Touch Friendly & Clean */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        <div className="flex bg-[#061411] p-1 rounded-xl border border-emerald-900/50 gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
              selectedFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-emerald-200/60 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            All ({CBR_TV_DESKTOP_DOWNLOADS.length})
          </button>
          <button
            onClick={() => setSelectedFilter('windows')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
              selectedFilter === 'windows'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-emerald-200/60 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            Windows
          </button>
          <button
            onClick={() => setSelectedFilter('mac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
              selectedFilter === 'mac'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-emerald-200/60 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            macOS
          </button>
          <button
            onClick={() => setSelectedFilter('linux')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
              selectedFilter === 'linux'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-emerald-200/60 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            Linux
          </button>
        </div>

        <a
          href="https://webtv.iptvsmarters.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 hover:text-white text-xs font-semibold transition-colors border border-emerald-800/50 self-start sm:self-auto min-h-[36px]"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Prefer Browser? Instant Web Player →</span>
        </a>
      </div>

      {/* Downloads Cards Grid - Responsive, Eye-Friendly Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredReleases.map((release) => (
          <div
            key={release.platformId}
            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3.5 group ${
              release.recommended
                ? 'bg-gradient-to-b from-[#0c241e] to-[#081915] border-emerald-400/40 shadow-sm'
                : 'bg-[#091b17] border-emerald-900/40 hover:border-emerald-500/40 hover:bg-[#0c231d]'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-emerald-200/60 block tracking-wider">
                    {release.osCategory.toUpperCase()}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {release.osName}
                  </h3>
                </div>

                {release.badge && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    release.recommended
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                      : 'bg-[#061411] text-emerald-200/80 border-emerald-900/60'
                  }`}>
                    {release.badge}
                  </span>
                )}
              </div>

              <div className="text-xs font-medium text-emerald-300">
                {release.targetHardware}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                {release.description}
              </p>

              {/* Install Terminal Command if applicable */}
              {release.installCommand && (
                <div className="p-2 rounded-xl bg-[#061411] border border-emerald-900/50 font-mono text-[11px] flex items-center justify-between gap-2 text-slate-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{release.installCommand}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(release.installCommand!, `cmd-${release.platformId}`)}
                    className="p-1 rounded bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-200 hover:text-white shrink-0 cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center border border-emerald-800/40"
                    title="Copy command"
                  >
                    {copiedKey === `cmd-${release.platformId}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Download Actions */}
            <div className="space-y-2 pt-2.5 border-t border-emerald-900/40">
              <div className="flex items-center justify-between text-[11px] text-emerald-200/60">
                <span className="font-mono text-slate-200 font-medium truncate max-w-[150px]">{release.filename}</span>
                <span>{release.fileSize} • {release.updatedDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={release.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[42px] bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-950/50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {release.osCategory === 'windows' ? 'for Windows' : release.osCategory === 'mac' ? 'for Mac' : 'Package'}</span>
                </a>

                <button
                  onClick={() => handleCopy(release.downloadUrl, `url-${release.platformId}`)}
                  className="p-2.5 rounded-xl bg-[#061411] hover:bg-emerald-950 text-emerald-200 hover:text-white border border-emerald-900/50 transition-colors cursor-pointer shrink-0 min-h-[42px] min-w-[42px] flex items-center justify-center"
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
      <div className="p-4 rounded-2xl bg-[#081a16] border border-emerald-900/50 space-y-2 text-xs text-slate-300 leading-relaxed">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">ISP Proxy Layer Protection:</strong> The built-in proxy button helps bypass UK internet provider blocks (Virgin Media, BT, Sky, Vodafone, TalkTalk) during live Saturday 3pm football kickoffs. Tap Proxy on the home screen to keep watching.
          </p>
        </div>

        <div className="flex items-start gap-2.5 pt-1.5 border-t border-emerald-900/40">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Verification & Browser Streaming:</strong> The SHA-256 hash under each download lets you verify file integrity. Prefer not to install files? Use our zero-install Web Player directly in your browser.
          </p>
        </div>
      </div>

    </div>
  );
};
