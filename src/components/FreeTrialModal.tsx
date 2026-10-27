import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  Copy, 
  Check, 
  Tv, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Send,
  MessageSquare
} from 'lucide-react';
import { ThemeCustomization } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig?: ThemeCustomization;
}

const STREAMING_DEVICES = [
  { id: 'firestick', name: 'Fire TV Stick', icon: '🔥' },
  { id: 'android', name: 'Android TV / Shield', icon: '📺' },
  { id: 'apple', name: 'Apple TV / iOS', icon: '🍎' },
  { id: 'smarttv', name: 'Samsung / LG Smart TV', icon: '🖥️' },
  { id: 'formuler', name: 'Formuler / MAG Box', icon: '⚡' },
  { id: 'pc', name: 'PC / Mac / Other', icon: '💻' },
];

const POPULAR_APPS = [
  'TiviMate 4K',
  'IPTV Smarters Pro',
  'IBO Player',
  'XCIPTV',
  'Other / Recommend for me',
];

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  isOpen,
  onClose,
  themeConfig,
}) => {
  const { t, language } = useTranslation();
  const [selectedDevice, setSelectedDevice] = useState<string>(STREAMING_DEVICES[0].name);
  const [selectedApp, setSelectedApp] = useState<string>(POPULAR_APPS[0]);
  const [customerName, setCustomerName] = useState<string>('');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  if (!isOpen) return null;

  const whatsappRaw = themeConfig?.whatsappNumber || '+44 7731 454811';
  const whatsappClean = whatsappRaw.replace(/[^\d]/g, '');
  const telegramUsername = (themeConfig?.telegramUser || '@cbrtvuk').replace(/^@/, '');
  const discordUrl = themeConfig?.discordUrl || 'https://discord.gg/QyNQRYwJj3';
  const telegramDirectUrl = `https://t.me/${telegramUsername}`;

  // Construct personalized contact message
  const trialMessage = `Hello GlobalStreamHub VIP Support! 👋
I would like to request my official Free 24-Hour 4K VIP Trial Pass.

📺 Device: ${selectedDevice}
📱 Preferred App: ${selectedApp}${customerName.trim() ? `\n👤 Name: ${customerName.trim()}` : ''}
🌐 Website: globalstreamhub.net (Language: ${language.toUpperCase()})

Please provide my active Xtream Codes API and M3U playlist credentials for the 10Gbps stream node. Thank you!`;

  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(trialMessage)}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(trialMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#090d1f] border border-indigo-500/30 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(99,102,241,0.25)] text-slate-100 my-auto overflow-hidden"
      >
        {/* Background glow accents */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold uppercase tracking-wide mb-2">
              <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>Instant 24-Hour VIP Pass • No Card Required</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Get Your Free 24h 4K VIP Trial
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Select your streaming device and tap any channel below to connect with our 24/7 activation team.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-2xl bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-white/10 shrink-0 cursor-pointer flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Device Selection (Clean, Compact Pills) */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Tv className="w-4 h-4 text-indigo-400" />
              <span>1. Your Streaming Device:</span>
            </span>
            <span className="text-xs text-slate-400 font-normal">Select one</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {STREAMING_DEVICES.map((dev) => (
              <button
                key={dev.id}
                type="button"
                onClick={() => setSelectedDevice(dev.name)}
                className={`py-2.5 px-3 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedDevice === dev.name
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30 border border-indigo-300/40'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800/90 hover:text-white border border-white/5'
                }`}
              >
                <span className="text-base shrink-0">{dev.icon}</span>
                <span className="truncate text-xs">{dev.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Customization Toggle */}
        <div className="mb-6">
          {!showAdvanced ? (
            <button
              type="button"
              onClick={() => setShowAdvanced(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>+ Add preferred app or nickname (optional)</span>
            </button>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-fade-in">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Preferred App:
                </label>
                <select
                  value={selectedApp}
                  onChange={(e) => setSelectedApp(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {POPULAR_APPS.map((app) => (
                    <option key={app} value={app} className="bg-slate-950 text-white">
                      {app}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Your Nickname:
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Instant Contact Options (Bigger, Bold, Highly Visible Cards) */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-200">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>2. Choose Your Activation Channel:</span>
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engineers Online Now</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            
            {/* WhatsApp (Prominent Green) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0e2a1b] via-slate-900 to-slate-950 border-2 border-emerald-500/50 hover:border-emerald-400 transition-all hover:scale-[1.03] shadow-lg shadow-emerald-950/60 flex flex-col justify-between cursor-pointer space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 ring-2 ring-emerald-300/30 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/40">
                    &lt; 2 min reply
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-black text-white leading-tight">WhatsApp</h3>
                  <p className="text-xs text-emerald-300/90 font-medium mt-0.5">VIP Direct Support</p>
                </div>
              </div>

              <div className="w-full py-2.5 rounded-xl bg-[#25D366] text-slate-950 font-black text-xs sm:text-sm text-center shadow-md shadow-[#25D366]/30 flex items-center justify-center gap-1.5 group-hover:bg-[#20bd5a] transition-colors">
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Telegram (Prominent Sky Blue) */}
            <a
              href={telegramDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0a2638] via-slate-900 to-slate-950 border-2 border-sky-500/50 hover:border-sky-400 transition-all hover:scale-[1.03] shadow-lg shadow-sky-950/60 flex flex-col justify-between cursor-pointer space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0088cc] text-white flex items-center justify-center shadow-lg shadow-[#0088cc]/40 ring-2 ring-sky-300/30 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.943z"/>
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-extrabold border border-sky-500/40">
                    Instant Chat
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-black text-white leading-tight">Telegram</h3>
                  <p className="text-xs text-sky-300/90 font-medium mt-0.5">@cbrtvuk</p>
                </div>
              </div>

              <div className="w-full py-2.5 rounded-xl bg-[#0088cc] text-white font-black text-xs sm:text-sm text-center shadow-md shadow-[#0088cc]/30 flex items-center justify-center gap-1.5 group-hover:bg-[#007ab8] transition-colors">
                <span>Chat on Telegram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Discord (Prominent Blurple) */}
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#181a38] via-slate-900 to-slate-950 border-2 border-[#5865F2]/50 hover:border-[#5865F2] transition-all hover:scale-[1.03] shadow-lg shadow-indigo-950/60 flex flex-col justify-between cursor-pointer space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#5865F2] text-white flex items-center justify-center shadow-lg shadow-[#5865F2]/40 ring-2 ring-indigo-300/30 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 fill-white" viewBox="0 0 127.14 96.36">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z"/>
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#5865F2]/20 text-indigo-300 text-[10px] font-extrabold border border-[#5865F2]/40">
                    VIP Ticket
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-black text-white leading-tight">Discord</h3>
                  <p className="text-xs text-indigo-300/90 font-medium mt-0.5">#free-trial channel</p>
                </div>
              </div>

              <div className="w-full py-2.5 rounded-xl bg-[#5865F2] text-white font-black text-xs sm:text-sm text-center shadow-md shadow-[#5865F2]/30 flex items-center justify-center gap-1.5 group-hover:bg-[#4954d4] transition-colors">
                <span>Join Discord</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

          </div>
        </div>

        {/* Footer: Copy Request & Feature Highlights */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              18.5k Channels
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              4K Movies & Sports
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              10Gbps Uplink
            </span>
          </div>

          <button
            onClick={handleCopyMessage}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/5"
            title="Copy prefilled message to paste anywhere"
          >
            {copiedText ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy details</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

