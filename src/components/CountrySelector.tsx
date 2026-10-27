import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Currency } from '../types';

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  currency: Currency;
  currencySymbol: string;
  path: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£', path: '/uk-iptv' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$', path: '/usa-iptv' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', currencySymbol: 'CA$', path: '/canada-iptv' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', currency: 'EUR', currencySymbol: '€', path: '/ireland-iptv' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€', path: '/germany-iptv' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€', path: '/france-iptv' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', currencySymbol: '€', path: '/spain-iptv' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', currencySymbol: '€', path: '/italy-iptv' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', currencySymbol: '€', path: '/netherlands-iptv' },
  { code: 'EU', name: 'All Europe', flag: '🇪🇺', currency: 'EUR', currencySymbol: '€', path: '/europe-iptv' },
];

interface CountrySelectorProps {
  currentPath: string;
  navigateTo: (path: string) => void;
  currency: Currency;
  onCurrencyChange?: (currency: Currency) => void;
  variant?: 'navbar' | 'mobile' | 'footer';
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  currentPath,
  navigateTo,
  currency,
  onCurrencyChange,
  variant = 'navbar'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCountry = COUNTRIES.find(c => c.path === currentPath) || 
    (currency === 'GBP' ? COUNTRIES[0] : currency === 'CAD' ? COUNTRIES[2] : COUNTRIES[1]);

  const handleSelect = (country: CountryOption) => {
    if (onCurrencyChange) {
      onCurrencyChange(country.currency);
    }
    navigateTo(country.path);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Region & Currency</span>
          </div>
          <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 font-mono">
            {activeCountry.code} ({activeCountry.currencySymbol})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
          {COUNTRIES.map((c) => {
            const isSelected = activeCountry.code === c.code;
            return (
              <button
                key={c.code}
                onClick={() => handleSelect(c)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-300 border border-white/5 hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                <span className="font-semibold text-[11px] truncate w-full text-center">{c.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{c.currencySymbol}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-sky-500/30 text-xs font-bold transition-all shadow-sm cursor-pointer"
        aria-label="Select Region and Currency"
        title="Select Country & Currency"
      >
        <span className="text-base leading-none">{activeCountry.flag}</span>
        <span className="font-mono text-sky-400 text-xs font-semibold">{activeCountry.code}</span>
        <span className="text-slate-400 text-[11px]">({activeCountry.currencySymbol})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-950 border border-white/15 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 mb-1 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Region & Currency</span>
            <Globe className="w-3 h-3 text-sky-400" />
          </div>

          <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
            {COUNTRIES.map((c) => {
              const isSelected = activeCountry.code === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => handleSelect(c)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/15 text-sky-300 font-bold border border-sky-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{c.flag}</span>
                    <div className="text-left">
                      <div className="font-semibold leading-none">{c.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {c.code} • {c.currency} ({c.currencySymbol})
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-white/10 px-2">
            <button
              onClick={() => {
                navigateTo('/');
                setIsOpen(false);
              }}
              className="w-full text-center py-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              🌐 Global Hub (All Channels)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
