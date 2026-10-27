import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { ShieldCheck, Zap, Server, Wifi, Cpu, Clock, Award, CheckCircle2, Tv, RefreshCw, Globe } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#060814] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-black border border-indigo-500/25 uppercase tracking-wider">
            <Server className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.features.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.features.titleStart}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">
              {t.features.titleHighlight}
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.features.subtitle}
          </p>
        </div>

        {/* Asymmetric Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Bento Item 1: High-Speed 10Gbps Streaming Engine */}
          <div className="md:col-span-2 lg:col-span-2 electric-card rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:border-indigo-500/50">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-sky-400 flex items-center justify-center border border-indigo-500/30">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black text-sky-400 uppercase tracking-wider block mb-1">
                  10Gbps Dedicated Uplink
                </span>
                <h3 className="text-2xl font-black text-white">
                  Ultra-Fast 18,500+ Channel & VOD Delivery
                </h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Direct peering with major European and North American internet exchanges delivers instant channel switching under 0.5s with zero ISP throttling and buffer-free 4K playback.
              </p>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/5 flex items-center justify-between text-xs text-sky-300 font-mono font-bold">
              <span>● Ultra-Low Latency CDN: ACTIVE</span>
              <span className="text-emerald-400">99.99% Uptime SLA</span>
            </div>
          </div>

          {/* Bento Item 2: Anti-Freeze 9.8 */}
          <div className="md:col-span-1 lg:col-span-2 electric-card rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:border-indigo-500/50">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black text-sky-400 uppercase tracking-wider block mb-1">
                  {t.features.item2Badge}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {t.features.item2Title}
                </h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.features.item2Desc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.features.item2Tested}</span>
            </div>
          </div>

          {/* Bento Item 3: 4K 60FPS */}
          <div className="md:col-span-1 lg:col-span-2 electric-card rounded-3xl p-8 space-y-4 hover:border-indigo-500/50">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Tv className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-white">{t.features.item3Title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.features.item3Desc}
            </p>
          </div>

          {/* Bento Item 4: Instant Xtream Delivery */}
          <div className="md:col-span-2 lg:col-span-2 electric-card rounded-3xl p-8 space-y-4 hover:border-indigo-500/50">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-white">{t.features.item4Title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.features.item4Desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
