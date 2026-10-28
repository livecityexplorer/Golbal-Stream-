import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { 
  ChevronRight, 
  CheckCircle2,
  Tv,
  Sparkles,
  Zap,
  Server,
  Activity,
  Shield,
  Clock,
  Film
} from 'lucide-react';

interface HeroSectionProps {
  onSelectPlan: (planId: string) => void;
  onOpenSpeedTest: () => void;
  fixtures?: any[];
  loadingFixtures?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectPlan,
  onOpenSpeedTest,
}) => {
  const { t } = useTranslation();

  return (
    <section 
      aria-label="StreamUK 4K IPTV Hero Showcase"
      className="relative pt-4 sm:pt-12 pb-14 sm:pb-24 overflow-hidden bg-[#060814] w-full max-w-full"
      itemScope 
      itemType="https://schema.org/BroadcastService"
    >
      
      {/* Radiant Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[1100px] h-[350px] sm:h-[550px] bg-gradient-to-b from-indigo-600/25 via-sky-600/15 to-transparent blur-[100px] sm:blur-[120px] pointer-events-none max-w-full" />
      <div className="absolute -top-24 right-1/4 w-[280px] sm:w-[400px] h-[200px] sm:h-[300px] bg-rose-600/10 blur-[80px] sm:blur-[100px] pointer-events-none max-w-full" />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          <header className="space-y-4 sm:space-y-6">
            <h1 
              itemProp="name"
              className="hero-headline font-black text-white text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight break-words"
            >
              {t.hero.titleStart}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.titleEnd}
            </h1>

            <p 
              itemProp="description"
              className="text-slate-300 text-sm min-[380px]:text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal"
            >
              {t.hero.description}
            </p>

            {/* High-Intent Feature Micro-Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] min-[380px]:text-xs font-mono text-slate-300">
              <span className="max-w-full px-3 py-1.5 rounded-xl bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 font-bold shadow-sm">
                ⚽ Premier Sports &amp; Live Matchdays
              </span>
              <span className="max-w-full px-3 py-1.5 rounded-xl bg-sky-950/70 border border-sky-500/40 text-sky-300 font-bold shadow-sm">
                🌍 18,500+ Global HD Channels
              </span>
              <span className="max-w-full px-3 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-bold shadow-sm">
                ⚡ Anti-Freeze v9.8
              </span>
              <span className="max-w-full px-3 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm">
                🎬 65,000+ VOD Movies
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center">
              <button
                onClick={() => onSelectPlan('trial-24h')}
                aria-label="Claim Free 24 Hour VIP Streaming Trial"
                className="w-full sm:w-auto min-h-[56px] px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.hero.freeTrialBtn}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#pricing"
                aria-label="Explore 4K IPTV Subscription Pricing"
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-extrabold text-base border border-white/15 transition-all flex items-center justify-center text-center active:scale-95 shadow-lg"
              >
                {t.hero.explorePlansBtn}
              </a>
            </div>

            {/* Feature Checkpoints */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.hero.antiFreeze}</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.hero.instantSetup}</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.hero.ultraHd60fps}</span>
              </span>
            </div>
          </header>

          {/* High-Impact Infrastructure & Performance Counters Grid */}
          <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
            
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-indigo-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <Tv className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">4K 60FPS</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">18,500+</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Live Global Channels</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-sky-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <Film className="w-4 h-4 text-sky-400" />
                <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">2026 VOD</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">65,000+</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Movies &amp; Boxsets</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Anti-Freeze</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">99.99%</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Guaranteed Uptime</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Instant</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">&lt; 0.4s</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Channel Switch Time</div>
            </div>

          </div>

          {/* Relocated Infrastructure Status & Trust Bar (Anchored after stats for clean mobile UX) */}
          <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 w-full text-left">
            
            {/* 10Gbps High-Speed Stream Servers Active */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-sky-950/80 border border-indigo-500/30 text-slate-200 text-xs font-semibold backdrop-blur-xl shadow-md w-full md:w-auto">
              {/* Live Pulsing Beacon */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="flex h-2.5 w-2.5 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-emerald-400 font-bold flex items-center gap-1 text-[11px] sm:text-xs">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400 shrink-0" />
                  <span>10Gbps High-Speed Servers Active</span>
                </span>
              </div>

              <span className="text-slate-600 hidden sm:inline">•</span>

              <span className="text-sky-300 hidden sm:inline font-mono font-medium text-xs">
                2026 Fixtures &amp; Schedules Auto-Synced Daily
              </span>

              {/* Speed Test Quick Action */}
              <button
                onClick={onOpenSpeedTest}
                className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 text-sky-300 text-[10px] sm:text-[11px] font-mono border border-indigo-400/30 transition-colors flex items-center gap-1 cursor-pointer shrink-0 ml-auto md:ml-0"
                title="Test Line Speed to 10Gbps London Docklands Node"
              >
                <Activity className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>14ms Test</span>
              </button>
            </div>

            {/* Rated 4.9/5 Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 shadow-md">
              <span className="text-amber-400 shrink-0">★★★★★</span>
              <span>Rated <strong className="text-white font-bold">4.9/5</strong> by 14,800+ UK &amp; European Subscribers</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
