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
      
      {/* 7 Core Feature Badges - Mobile Horizontal Scroll, Desktop Grid - Luxury Obsidian */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#131622] border border-white/[0.08] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/[0.08] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Official StreamUK Player for PC & Mac
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
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
                className="shrink-0 w-28 sm:w-auto p-2.5 rounded-xl bg-[#0a0c13] border border-white/[0.08] hover:border-indigo-500/40 transition-colors flex flex-col items-center text-center gap-1 group"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-300 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-100 truncate w-full">
                  {p.name}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight truncate w-full">
                  {p.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* OS Filter Tabs - Touch Friendly & Clean */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        <div className="flex bg-[#0a0c13] p-1 rounded-xl border border-white/[0.08] gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
              selectedFilter === 'all'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-950/60'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            All ({CBR_TV_DESKTOP_DOWNLOADS.length})
          </button>
          <button
            onClick={() => setSelectedFilter('windows')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
              selectedFilter === 'windows'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-950/60'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Windows
          </button>
          <button
            onClick={() => setSelectedFilter('mac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
              selectedFilter === 'mac'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-950/60'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            macOS
          </button>
          <button
            onClick={() => setSelectedFilter('linux')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
              selectedFilter === 'linux'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-950/60'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Linux
          </button>
        </div>

        <a
          href="https://webtv.iptvsmarters.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-indigo-300 hover:text-white text-xs font-semibold transition-colors border border-white/[0.1] self-start sm:self-auto min-h-[36px]"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Prefer Browser? Instant Web Player →</span>
        </a>
      </div>

      {/* Downloads Cards Grid - Responsive, Luxury Dark Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredReleases.map((release) => (
          <div
            key={release.platformId}
            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3.5 group ${
              release.recommended
                ? 'bg-gradient-to-b from-[#182038] to-[#121626] border-indigo-500/40 shadow-xl'
                : 'bg-[#131622] border-white/[0.08] hover:border-indigo-500/40 hover:bg-[#181d2e]'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                    {release.osCategory.toUpperCase()}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {release.osName}
                  </h3>
                </div>

                {release.badge && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    release.recommended
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                      : 'bg-[#0a0c13] text-slate-300 border-white/[0.08]'
                  }`}>
                    {release.badge}
                  </span>
                )}
              </div>

              <div className="text-xs font-medium text-indigo-300">
                {release.targetHardware}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                {release.description}
              </p>

              {/* Install Terminal Command if applicable */}
              {release.installCommand && (
                <div className="p-2 rounded-xl bg-[#0a0c13] border border-white/[0.08] font-mono text-[11px] flex items-center justify-between gap-2 text-slate-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{release.installCommand}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(release.installCommand!, `cmd-${release.platformId}`)}
                    className="p-1 rounded bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 hover:text-white shrink-0 cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center border border-white/[0.1]"
                    title="Copy command"
                  >
                    {copiedKey === `cmd-${release.platformId}` ? <Check className="w-3 h-3 text-indigo-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Download Actions */}
            <div className="space-y-2 pt-2.5 border-t border-white/[0.08]">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-slate-200 font-medium truncate max-w-[150px]">{release.filename}</span>
                <span>{release.fileSize} • {release.updatedDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={release.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[42px] ${
                    release.recommended
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-950/40'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950/60'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {release.osCategory === 'windows' ? 'for Windows' : release.osCategory === 'mac' ? 'for Mac' : 'Package'}</span>
                </a>

                <button
                  onClick={() => handleCopy(release.downloadUrl, `url-${release.platformId}`)}
                  className="p-2.5 rounded-xl bg-[#0a0c13] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer shrink-0 min-h-[42px] min-w-[42px] flex items-center justify-center"
                  title="Copy direct download link"
                >
                  {copiedKey === `url-${release.platformId}` ? <Check className="w-3.5 h-3.5 text-indigo-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Official Advice & Security Notices */}
      <div className="p-4 rounded-2xl bg-[#131622] border border-white/[0.08] space-y-2 text-xs text-slate-300 leading-relaxed">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">ISP Proxy Layer Protection:</strong> The built-in proxy button helps bypass UK internet provider blocks (Virgin Media, BT, Sky, Vodafone, TalkTalk) during live Saturday 3pm football kickoffs. Tap Proxy on the home screen to keep watching.
          </p>
        </div>

        <div className="flex items-start gap-2.5 pt-1.5 border-t border-white/[0.08]">
          <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Verification & Browser Streaming:</strong> The SHA-256 hash under each download lets you verify file integrity. Prefer not to install files? Use our zero-install Web Player directly in your browser.
          </p>
        </div>
      </div>

    </div>
  );
};
