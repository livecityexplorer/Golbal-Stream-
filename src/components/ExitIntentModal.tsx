import React, { useState, useEffect } from 'react';
import { 
  X, 
  Zap, 
  Tv, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Clock, 
  Gift,
  ArrowRight
} from 'lucide-react';
import { ThemeCustomization } from '../types';

interface ExitIntentModalProps {
  onOpenFreeTrial: () => void;
  themeConfig?: ThemeCustomization;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  onOpenFreeTrial,
  themeConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user already dismissed or opened in this session
    if (typeof window === 'undefined') return;
    const hasSeen = sessionStorage.getItem('gsh_exit_intent_shown');
    if (hasSeen) return;

    // Desktop: Trigger on mouse exit towards top navigation/tabs
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15 && !sessionStorage.getItem('gsh_exit_intent_shown')) {
        sessionStorage.setItem('gsh_exit_intent_shown', 'true');
        setIsOpen(true);
      }
    };

    // Mobile/Tablet: Trigger after 55 seconds of engaged dwell time
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('gsh_exit_intent_shown')) {
        sessionStorage.setItem('gsh_exit_intent_shown', 'true');
        setIsOpen(true);
      }
    }, 55000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  if (!isOpen) return null;

  const whatsappRaw = themeConfig?.whatsappNumber || '+44 7731 454811';
  const whatsappClean = whatsappRaw.replace(/[^\d]/g, '');
  const telegramUsername = (themeConfig?.telegramUser || '@cbrtvuk').replace(/^@/, '');
  const telegramUrl = `https://t.me/${telegramUsername}`;

  const instantTrialMessage = encodeURIComponent(
    'Hello GlobalStreamHub VIP! 👋 I saw your exit pass on the website and would like to claim my instant Free 24-Hour 4K VIP Trial Pass (Downloader code: 2130837). Thank you!'
  );
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${instantTrialMessage}`;

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-gradient-to-b from-[#0b0f26] to-[#060814] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_70px_rgba(245,158,11,0.25)] text-slate-100 my-auto overflow-hidden animate-scale-up"
      >
        {/* Decorative Amber/Indigo ambient glow */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-black uppercase tracking-wider mb-4">
          <Gift className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>Wait! Before You Leave</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Claim Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-indigo-300">Free 24h VIP Pass</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
          Test our high-speed 10Gbps UK & US servers with zero buffering. Stream 18,500+ channels, 380 Premier League matches in 4K UHD, and 65,000+ on-demand movies.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>No Credit Card Needed</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
            <Tv className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Downloader: <strong>2130837</strong></span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Instant 10s Setup</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Anti-ISP Throttling</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenFreeTrial();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Generate Free 24h Pass Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all text-center"
            >
              <span>WhatsApp Pass</span>
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 text-xs font-bold transition-all text-center"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram Pass</span>
            </a>
          </div>
        </div>

        {/* Footer Guarantee */}
        <p className="mt-4 text-[11px] text-center text-slate-400">
          🔒 100% Free VIP test. Zero automated billing. Credentials expire automatically after 24 hours.
        </p>
      </div>
    </div>
  );
};
