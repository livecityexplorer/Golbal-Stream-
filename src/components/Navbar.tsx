import React, { useState, useEffect } from 'react';
import { ThemeCustomization, Currency } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CountrySelector } from './CountrySelector';
import { 
  Tv, 
  HelpCircle, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Flame, 
  Radio, 
  Layers, 
  Check, 
  ChevronDown,
  Zap,
  Play
} from 'lucide-react';

interface NavbarProps {
  themeConfig: ThemeCustomization;
  setThemeConfig: React.Dispatch<React.SetStateAction<ThemeCustomization>>;
  onOpenSpeedTest: () => void;
  onOpenDeviceGuide: () => void;
  onOpenCustomizer: () => void;
  onSelectPlan: (planId: string) => void;
  navigateTo?: (path: string) => void;
  currentPath?: string;
  currency?: Currency;
  onCurrencyChange?: (currency: Currency) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  themeConfig,
  setThemeConfig,
  onOpenSpeedTest,
  onOpenDeviceGuide,
  onOpenCustomizer,
  onSelectPlan,
  navigateTo,
  currentPath = '/',
  currency = 'GBP',
  onCurrencyChange,
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsapp = themeConfig?.whatsappNumber || '+44 7731 454811';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#050713]/95 backdrop-blur-2xl border-b border-indigo-500/20 shadow-2xl shadow-black/60 py-2.5' 
        : 'bg-[#060814]/85 backdrop-blur-xl border-b border-white/10 py-3.5'
    }`}>
      
      {/* Top ambient micro-line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent pointer-events-none" />

      <div className="w-full max-w-[90rem] mx-auto px-2.5 min-[380px]:px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1.5 min-[380px]:gap-2 sm:gap-4 xl:gap-8 w-full">
          
          {/* ======================================================== */}
          {/* ENHANCED BRAND LOGO & BADGE                              */}
          {/* ======================================================== */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => {
                if (navigateTo) {
                  navigateTo('/');
                } else {
                  window.location.hash = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-3 group relative select-none cursor-pointer bg-transparent border-none p-0 text-left"
            >
              
              {/* Premium 3D Neon 4K Emblem */}
              <div className="relative flex items-center justify-center shrink-0">
                {/* Ambient glow behind logo */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 rounded-xl blur-[8px] opacity-70 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Outer metallic container */}
                <div className="relative w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 rounded-[12px] sm:rounded-[18px] bg-gradient-to-br from-slate-900 via-[#0a0f26] to-slate-950 p-[1.5px] shadow-[0_0_12px_rgba(56,189,248,0.25)] border border-white/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-[10px] sm:rounded-[16px] bg-[#070b1e] flex flex-col items-center justify-center relative overflow-hidden">
                    
                    {/* Futuristic grid mesh background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px] opacity-30" />
                    
                    {/* TV / Broadcast Core Graphic */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="relative">
                        <Tv className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 sm:w-6 sm:h-6 xl:w-7 xl:h-7 text-cyan-400 group-hover:text-amber-400 transition-colors drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]" />
                        <span className="absolute -bottom-1 -right-2 text-[7px] min-[360px]:text-[8px] sm:text-[9px] xl:text-[10px] font-black tracking-tighter bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 px-0.5 sm:px-1 rounded-[2px] leading-none py-0.5 shadow-sm border border-amber-200/50">
                          4K
                        </span>
                      </div>
                    </div>

                    {/* Laser shine line */}
                    <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                  </div>
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col justify-center">
                <div className="font-black text-sm min-[360px]:text-base min-[400px]:text-xl sm:text-2xl xl:text-3xl tracking-tight text-white flex items-center drop-shadow-md leading-none">
                  GLOBAL<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">STREAM</span>
                  <span className="ml-1 text-[7px] min-[360px]:text-[8px] sm:text-[10px] xl:text-xs font-black tracking-wider text-amber-400 bg-amber-400/10 px-1 sm:px-1.5 py-0.5 rounded border border-amber-400/30">
                    HUB
                  </span>
                </div>
                <span className="text-[7px] min-[360px]:text-[8px] min-[400px]:text-[9px] sm:text-[10px] font-bold tracking-wider text-sky-400/90 uppercase mt-0.5 drop-shadow-sm">
                  Ultra HD Media Portal
                </span>
              </div>
            </button>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP NAVIGATION MENU ITEMS                            */}
          {/* ======================================================== */}
          <nav className="hidden xl:flex items-center gap-4 xl:gap-6 text-[12px] xl:text-[13px] font-semibold text-slate-300">
            <a href="#sports" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap text-sky-200 hover:text-white">
              <span>Live Sports</span>
              <span className="px-1.5 py-0.5 rounded text-rose-300 text-[10px] font-black font-mono bg-rose-500/20 border border-rose-400/30 animate-pulse">
                4K Live
              </span>
            </a>
            <a href="#channels" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap">
              <span>{t.nav.channels}</span>
              <span className="px-1.5 py-0.5 rounded text-sky-300 text-[10px] font-black font-mono bg-sky-500/10 border border-sky-400/20">
                {t.nav.channelsCount}
              </span>
            </a>
            <a href="#vod" className="hover:text-white transition-colors duration-200 whitespace-nowrap">
              {t.nav.vod}
            </a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200 whitespace-nowrap">
              {t.nav.pricing}
            </a>
            <button 
              onClick={() => {
                if (navigateTo) {
                  navigateTo('/');
                  setTimeout(() => {
                    const blogEl = document.getElementById('blog');
                    blogEl?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const blogEl = document.getElementById('blog');
                  blogEl?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer bg-transparent border-none p-0 text-left font-semibold text-slate-300"
            >
              <span>Blog & News</span>
              <span className="px-1.5 py-0.5 rounded text-cyan-300 text-[10px] font-black font-mono bg-cyan-500/10 border border-cyan-400/20">
                Guides
              </span>
            </button>
            <button 
              onClick={() => {
                if (navigateTo) {
                  navigateTo('/setup');
                } else if (onOpenDeviceGuide) {
                  onOpenDeviceGuide();
                }
              }} 
              className="hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
            >
              {t.nav.setupGuide}
            </button>
          </nav>

          {/* ======================================================== */}
          {/* RIGHT ACTION CONTROLS (DESKTOP)                          */}
          {/* ======================================================== */}
          <div className="hidden xl:flex items-center gap-2 xl:gap-3 shrink-0">
            
            {/* Country & Currency Selector */}
            <CountrySelector 
              currentPath={currentPath}
              navigateTo={navigateTo || (() => {})}
              currency={currency}
              onCurrencyChange={onCurrencyChange}
              variant="navbar"
            />

            {/* Language Switcher */}
            <LanguageSwitcher variant="navbar" />

            {/* Divider */}
            <div className="w-px h-5 bg-white/10" />

            {/* Enhanced Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30"
                title="WhatsApp Support"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={themeConfig.discordUrl || 'https://discord.gg/QyNQRYwJj3'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#5865F2]/15 text-[#5865F2] hover:bg-[#5865F2] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-[#5865F2]/10 hover:shadow-[#5865F2]/30"
                title="Discord Community"
              >
                <svg className="w-4 h-4" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
              </a>
            </div>

            {/* High-Converting Free Trial Button */}
            <button
              onClick={() => onSelectPlan('trial-24h')}
              className="relative group overflow-hidden px-3 xl:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 ml-1 xl:ml-2 whitespace-nowrap"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>{t.nav.freeTrial}</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* MOBILE ACTION CONTROLS & PINNED HAMBURGER                */}
          {/* ======================================================== */}
          <div className="flex items-center gap-1 min-[360px]:gap-1.5 sm:gap-2 xl:hidden shrink-0">
            
            {/* Language Switcher Button on Mobile */}
            <LanguageSwitcher variant="navbar" />

            {/* Free 24H Trial CTA Button (Visible on sm+ screens, mobile handled by bottom navigation bar) */}
            <button
              onClick={() => onSelectPlan('trial-24h')}
              aria-label="Claim Free 24 Hour Trial"
              className="hidden sm:flex min-h-[44px] px-2.5 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 font-black text-xs items-center justify-center gap-1.5 shadow-md shadow-emerald-500/25 active:scale-95 transition-all shrink-0 cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950 shrink-0" />
              <span className="leading-none">Free 24h</span>
            </button>

            {/* Pinned Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-900/95 text-slate-100 border border-white/20 hover:bg-slate-800 active:scale-95 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-slate-100" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE DROPDOWN DRAWER (OPTIMIZED FOR CWV & TOUCH)       */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <nav 
          id="mobile-nav-drawer"
          aria-label="Mobile Navigation Menu"
          className="xl:hidden bg-[#050713]/98 backdrop-blur-2xl border-b border-indigo-500/30 px-3.5 min-[380px]:px-4 py-4 space-y-4 animate-fade-in shadow-2xl overflow-y-auto max-h-[calc(100dvh-4rem)] w-full max-w-full"
        >
          {/* Top VIP Free Trial CTA inside drawer */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-teal-950/80 border border-emerald-500/40 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                <span>Instant 24H VIP Access</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                100% Free
              </span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectPlan('trial-24h');
              }}
              className="w-full min-h-[44px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 font-black text-xs text-center shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Claim Free 24h VIP Pass</span>
            </button>
          </div>
          
          {/* Country & Region Selector in Mobile Drawer */}
          <CountrySelector 
            currentPath={currentPath}
            navigateTo={(path) => {
              setMobileMenuOpen(false);
              if (navigateTo) navigateTo(path);
            }}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            variant="mobile"
          />

          {/* Language Switcher in Mobile Drawer */}
          <LanguageSwitcher variant="mobile" />

          {/* Navigation Links with 48px Touch Heights */}
          <div className="flex flex-col gap-1 text-sm font-extrabold text-slate-200 pt-1">
            <a
              href="#sports"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-slate-100">{t.nav.matchdayLineups}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono font-black">{t.nav.live}</span>
            </a>

            <a
              href="#channels"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <span className="text-slate-100">{t.nav.channels}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono font-black">4K 60FPS</span>
            </a>

            <a
              href="#vod"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <span className="text-slate-100">{t.nav.vod}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono font-black">{t.nav.top10}</span>
            </a>

            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <span className="text-slate-100">{t.nav.pricing}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-black">{t.nav.vip}</span>
            </a>

            <a
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between border-b border-white/5 transition-colors"
            >
              <span className="text-slate-100">Blog, News & 4K Guides</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono font-black">NEW</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (navigateTo) {
                  navigateTo('/setup');
                } else if (onOpenDeviceGuide) {
                  onOpenDeviceGuide();
                }
              }}
              className="min-h-[48px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center gap-2.5 text-left text-slate-200 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{t.nav.setupGuide}</span>
            </button>
          </div>

          {/* Bottom Mobile CTAs with Enhanced Touch Ergonomics */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectPlan('trial-24h');
              }}
              className="w-full min-h-[48px] py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 font-black text-sm text-center shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{t.nav.freeTrial}</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="min-h-[46px] py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={themeConfig.discordUrl || 'https://discord.gg/QyNQRYwJj3'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Discord Community"
                className="min-h-[46px] py-2.5 px-3 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2]/30 text-[#5865F2] hover:text-white border border-[#5865F2]/40 font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
                <span>Discord</span>
              </a>
            </div>
          </div>

        </nav>
      )}

    </header>
  );
};
