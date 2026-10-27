import React from 'react';
import { ThemeCustomization, Currency } from '../types';
import { Settings, Sparkles, Sliders, X, Palette, MessageSquare, Mail, Globe, Check } from 'lucide-react';

interface ThemeCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: ThemeCustomization;
  setThemeConfig: React.Dispatch<React.SetStateAction<ThemeCustomization>>;
}

export const ThemeCustomizerDrawer: React.FC<ThemeCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  themeConfig,
  setThemeConfig,
}) => {
  if (!isOpen) return null;

  const colorPresets: { id: ThemeCustomization['accentColorName']; name: string; hex: string; bgClass: string }[] = [
    { id: 'cyan', name: 'Neon Cyan (Default UK)', hex: '#06b6d4', bgClass: 'bg-cyan-500' },
    { id: 'emerald', name: 'Emerald Sports', hex: '#10b981', bgClass: 'bg-emerald-500' },
    { id: 'purple', name: 'Electric Violet', hex: '#a855f7', bgClass: 'bg-purple-500' },
    { id: 'red', name: 'Crimson Matchday', hex: '#ef4444', bgClass: 'bg-red-500' },
    { id: 'amber', name: 'Gold VIP', hex: '#f59e0b', bgClass: 'bg-amber-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-l border-slate-700 w-full max-w-md h-full p-6 space-y-6 shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-lg font-black text-white">Live Theme Customizer</h3>
              <span className="text-xs text-slate-400">Tweak branding for UK IPTV store</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Brand Name:</label>
          <input
            type="text"
            value={themeConfig.brandName}
            onChange={(e) => setThemeConfig(prev => ({ ...prev, brandName: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            placeholder="e.g. GlobalStreamHub, VisionMedia, EthernetMedia"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Tagline:</label>
          <input
            type="text"
            value={themeConfig.brandTagline}
            onChange={(e) => setThemeConfig(prev => ({ ...prev, brandTagline: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            placeholder="e.g. The UK's #1 Premium 4K IPTV Service"
          />
        </div>

        {/* Color Palette Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span>Accent Theme Preset:</span>
          </label>
          <div className="grid grid-cols-1 gap-2">
            {colorPresets.map((preset) => {
              const isSelected = themeConfig.accentColorName === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setThemeConfig(prev => ({
                    ...prev,
                    accentColorName: preset.id,
                    accentColor: preset.hex
                  }))}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-slate-950 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-4 h-4 rounded-full ${preset.bgClass}`} />
                    <span>{preset.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* UK WhatsApp Contact */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>UK WhatsApp Support Number:</span>
          </label>
          <input
            type="text"
            value={themeConfig.whatsappNumber}
            onChange={(e) => setThemeConfig(prev => ({ ...prev, whatsappNumber: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            placeholder="+44 7731 454811"
          />
        </div>

        {/* Telegram Username */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span className="text-sky-400 font-black text-xs">✈️</span>
            <span>Telegram Support Username:</span>
          </label>
          <input
            type="text"
            value={themeConfig.telegramUser || '@cbrtvuk'}
            onChange={(e) => setThemeConfig(prev => ({ ...prev, telegramUser: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-sky-300 focus:outline-none focus:border-sky-500 font-mono"
            placeholder="@cbrtvuk"
          />
        </div>

        {/* Discord Server Link */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span className="text-indigo-400 font-black text-xs">🎮</span>
            <span>Discord Support & VIP Ticket Server:</span>
          </label>
          <input
            type="text"
            value={themeConfig.discordUrl || ''}
            onChange={(e) => setThemeConfig(prev => ({ ...prev, discordUrl: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono text-xs"
            placeholder="https://discord.gg/QyNQRYwJj3"
          />
        </div>

        {/* Support Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>Support Email:</span>
          </label>
          <input
            type="email"
            value={themeConfig.supportEmail}
            onChange={(e) => setThemeConfig(prev => ({ ...prev, supportEmail: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            placeholder="support@globalstreamhub.net"
          />
        </div>

        {/* Crypto Wallet Addresses */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="text-xs font-black text-amber-400 uppercase tracking-wider block">
            🪙 Crypto Payment Gateway Wallets:
          </label>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <span className="text-amber-400 font-black">₿</span>
              <span>Bitcoin (BTC) Receiving Address:</span>
            </label>
            <input
              type="text"
              value={themeConfig.btcWalletAddress || ''}
              onChange={(e) => setThemeConfig(prev => ({ ...prev, btcWalletAddress: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
              placeholder="e.g. bc1q..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <span className="text-indigo-400 font-black">Ξ</span>
              <span>Ethereum (ETH) Receiving Address:</span>
            </label>
            <input
              type="text"
              value={themeConfig.ethWalletAddress || ''}
              onChange={(e) => setThemeConfig(prev => ({ ...prev, ethWalletAddress: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-sky-300 font-mono focus:outline-none focus:border-indigo-500"
              placeholder="e.g. 0x..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <span className="text-emerald-400 font-black">₮</span>
              <span>USDT (TRC-20) Receiving Address:</span>
            </label>
            <input
              type="text"
              value={themeConfig.usdtTrc20Address || ''}
              onChange={(e) => setThemeConfig(prev => ({ ...prev, usdtTrc20Address: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-500"
              placeholder="e.g. T..."
            />
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Default Store Currency:</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['GBP', 'EUR', 'USD'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setThemeConfig(prev => ({ ...prev, currency: curr }))}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  themeConfig.currency === curr
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {curr === 'GBP' ? '£ GBP' : curr === 'EUR' ? '€ EUR' : '$ USD'}
              </button>
            ))}
          </div>
        </div>

        {/* Apply & Close */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25"
          >
            Apply & View Theme
          </button>
        </div>

      </div>
    </div>
  );
};
