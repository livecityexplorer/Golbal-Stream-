import React, { useState, useEffect } from 'react';
import { Home, Trophy, Tv, Zap, MessageCircle } from 'lucide-react';
import { ThemeCustomization } from '../types';

interface MobileBottomNavProps {
  themeConfig: ThemeCustomization;
  onOpenFreeTrial: () => void;
  navigateTo?: (path: string) => void;
  onOpenSupport?: () => void;
  isSupportOpen?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  themeConfig,
  onOpenFreeTrial,
  navigateTo,
  onOpenSupport,
  isSupportOpen
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'sports' | 'trial' | 'channels' | 'support'>('home');

  useEffect(() => {
    const handleScroll = () => {
      if (isSupportOpen) return;
      const scrollY = window.scrollY;
      const sportsEl = document.getElementById('sports');
      const channelsEl = document.getElementById('channels');
      const pricingEl = document.getElementById('pricing');

      if (pricingEl && scrollY >= pricingEl.offsetTop - 300) {
        setActiveTab('trial');
      } else if (channelsEl && scrollY >= channelsEl.offsetTop - 300) {
        setActiveTab('channels');
      } else if (sportsEl && scrollY >= sportsEl.offsetTop - 300) {
        setActiveTab('sports');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSupportOpen]);

  const cleanWhatsapp = (themeConfig.whatsappNumber || '+44 7731 454811').replace(/[^0-9]/g, '');

  const scrollTo = (id: string, tab: 'home' | 'sports' | 'trial' | 'channels') => {
    setActiveTab(tab);
    if (navigateTo && window.location.pathname !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSupportClick = () => {
    setActiveTab('support');
    if (onOpenSupport) {
      onOpenSupport();
    } else {
      const msg = encodeURIComponent('Hi GlobalStreamHub team, I need instant assistance with a 4K subscription or free trial.');
      window.open(`https://wa.me/${cleanWhatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <nav
      aria-label="Mobile Quick Navigation"
      className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-[#050713]/95 backdrop-blur-2xl border-t border-white/10 px-2 sm:px-4 py-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.8)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center gap-1">
        
        {/* 1. Home */}
        <button
          onClick={() => scrollTo('top', 'home')}
          className={`min-h-[48px] py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl transition-all cursor-pointer ${
            !isSupportOpen && activeTab === 'home'
              ? 'text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
        >
          <Home className="w-5 h-5 shrink-0" />
          <span className="text-[10px] tracking-tight leading-none">Home</span>
        </button>

        {/* 2. Live Sports */}
        <button
          onClick={() => scrollTo('sports', 'sports')}
          className={`min-h-[48px] py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl transition-all relative cursor-pointer ${
            !isSupportOpen && activeTab === 'sports'
              ? 'text-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
        >
          <div className="relative">
            <Trophy className="w-5 h-5 shrink-0" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <span className="text-[10px] tracking-tight leading-none">Sports</span>
        </button>

        {/* 3. Center CTA: 24H Free Trial */}
        <button
          onClick={onOpenFreeTrial}
          className="min-h-[50px] -mt-3.5 flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black shadow-lg shadow-emerald-500/30 border border-emerald-300/40 active:scale-95 transition-transform cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-slate-950/20 flex items-center justify-center">
            <Zap className="w-4 h-4 fill-current text-slate-950" />
          </div>
          <span className="text-[9.5px] uppercase tracking-tighter leading-none font-extrabold">24H Pass</span>
        </button>

        {/* 4. Channels Matrix */}
        <button
          onClick={() => scrollTo('channels', 'channels')}
          className={`min-h-[48px] py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl transition-all cursor-pointer ${
            !isSupportOpen && activeTab === 'channels'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
        >
          <Tv className="w-5 h-5 shrink-0" />
          <span className="text-[10px] tracking-tight leading-none">Channels</span>
        </button>

        {/* 5. Live Support Dialog (Opens Live Support options) */}
        <button
          onClick={handleSupportClick}
          className={`min-h-[48px] py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-xl transition-all cursor-pointer ${
            isSupportOpen
              ? 'text-emerald-300 font-bold bg-emerald-500/15 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
          title="Open VIP Support"
          aria-label="Open Live Support"
        >
          <MessageCircle className="w-5 h-5 shrink-0 text-emerald-400" />
          <span className="text-[10px] tracking-tight leading-none">Support</span>
        </button>

      </div>
    </nav>
  );
};
