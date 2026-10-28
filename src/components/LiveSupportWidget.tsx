import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Zap, 
  Tv, 
  CreditCard, 
  ChevronRight,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { ThemeCustomization } from '../types';

interface LiveSupportWidgetProps {
  themeConfig: ThemeCustomization;
  onOpenFreeTrial?: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export const LiveSupportWidget: React.FC<LiveSupportWidgetProps> = ({
  themeConfig,
  onOpenFreeTrial,
  isOpen: controlledIsOpen,
  onToggle,
  onClose
}) => {
  const { t } = useTranslation();
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  const cleanWhatsapp = (themeConfig.whatsappNumber || '+44 7731 454811').replace(/[^0-9]/g, '');
  const cleanTelegram = (themeConfig.telegramUser || '@cbrtvuk').replace('@', '');

  const quickPrompts = [
    {
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      label: '⚡ Instant 24H Free Trial Pass',
      message: 'Hi GlobalStreamHub VIP team, I would like to request an instant 24H free trial test pass for my device.'
    },
    {
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      label: '📺 FireStick Downloader Code Help',
      message: 'Hi, I need assistance setting up the GlobalStreamHub 4K player on Amazon FireStick using Downloader code 842013.'
    },
    {
      icon: <Tv className="w-4 h-4 text-sky-400" />,
      label: '⚽ Premier League 4K & Ultra Sports',
      message: 'Hello, can you confirm all 380 Premier League games, live sports in 4K UHD 60FPS and 18,500+ channels are active on your service?'
    },
    {
      icon: <CreditCard className="w-4 h-4 text-purple-400" />,
      label: '💳 Crypto & Instant Activation Inquiry',
      message: 'Hi, I want to purchase an IPTV subscription with Crypto / Credit Card. How quickly is my account activated?'
    }
  ];

  const handleLaunchWhatsApp = (message: string) => {
    const url = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLaunchTelegram = (message: string) => {
    const url = `https://t.me/${cleanTelegram}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Mobile Backdrop when Support Dialog is Open */}
      {isOpen && (
        <div 
          onClick={handleClose}
          aria-hidden="true"
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 xl:hidden animate-fade-in"
        />
      )}

      <div className={`fixed z-50 pointer-events-auto ${
        isOpen
          ? 'bottom-20 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-20 max-w-sm sm:w-96 mx-auto sm:mx-0'
          : 'bottom-5 right-5'
      } flex flex-col items-end`}>
        
        {/* Floating Dialog Popover */}
        {isOpen && (
          <div className="w-full bg-slate-900/98 backdrop-blur-2xl border border-indigo-500/40 rounded-2xl shadow-2xl shadow-black/80 p-4 sm:p-5 text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-200 mb-2">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 sm:mb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>GlobalStreamHub Support</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">24/7 VIP</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    <span>Online • Typical reply under 60 seconds</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Intro Text */}
            <p className="text-xs text-slate-300 mb-3">
              Choose a quick topic or chat directly with our 24/7 VIP support team:
            </p>

            {/* Quick Option Prompts */}
            <div className="space-y-2 mb-4">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx === 0 && onOpenFreeTrial) {
                      handleClose();
                      onOpenFreeTrial();
                    } else {
                      handleLaunchWhatsApp(prompt.message);
                    }
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-white/5 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="shrink-0">{prompt.icon}</span>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-emerald-300 transition-colors truncate">
                      {prompt.label}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>

            {/* Direct WhatsApp & Telegram Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => handleLaunchWhatsApp('Hi GlobalStreamHub VIP, I have a question about your 4K IPTV service.')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => handleLaunchTelegram('Hi GlobalStreamHub VIP, I have a question about your 4K IPTV service.')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </button>
            </div>

            <div className="mt-3 text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Encrypted VIP Support • Fast Activation</span>
            </div>

          </div>
        )}

        {/* Main Floating Trigger Button (Hidden on Mobile because the Support button is in MobileBottomNav) */}
        <button
          onClick={handleToggle}
          className="hidden xl:flex group relative items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          title="Live VIP Support"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>Chat Live with Us</span>
          </div>

          {/* Pulsing indicator tag */}
          <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-semibold border border-white/10">
            24/7
          </span>
        </button>

      </div>
    </>
  );
};
