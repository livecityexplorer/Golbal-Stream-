import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { SupportedLanguage } from '../types';
import { Globe, ChevronDown, Check, Smartphone, Sparkles, RotateCcw } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'mobile' | 'footer';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'navbar' }) => {
  const { 
    language, 
    setLanguage, 
    languages, 
    currentLanguageInfo, 
    deviceLanguage, 
    deviceLocale, 
    isAutoDetected, 
    resetToDeviceLanguage 
  } = useTranslation();
  
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

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const deviceLanguageInfo = languages.find(l => l.code === deviceLanguage) || languages[0];

  if (variant === 'mobile') {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Language / Région / Sprache</span>
          </div>
          {isAutoDetected ? (
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1 font-mono">
              <Smartphone className="w-2.5 h-2.5" />
              Device: {deviceLocale.split('-')[0].toUpperCase()}
            </span>
          ) : (
            <button
              onClick={resetToDeviceLanguage}
              className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold underline"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              Auto-Sync
            </button>
          )}
        </div>
        <div className="grid grid-cols-5 gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-white/10 text-xs font-bold">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`py-2 px-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${
                language === lang.code
                  ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title={lang.name}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span className="text-[10px] uppercase font-mono mt-0.5">{lang.code}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                language === lang.code
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              <span className="text-sm leading-none">{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </button>
          ))}
        </div>

        {isAutoDetected && (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
            <Smartphone className="w-3 h-3" />
            <span>Synced to device ({deviceLocale})</span>
          </span>
        )}
      </div>
    );
  }

  // Default 'navbar' variant
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all shadow-sm cursor-pointer group shrink-0"
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none shrink-0">{currentLanguageInfo.flag}</span>
        <span className="text-[11px] font-mono uppercase tracking-wide text-slate-200 hidden sm:inline shrink-0">
          {currentLanguageInfo.code}
        </span>
        {isAutoDetected && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Auto-adapted to device language" />
        )}
        <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-white transition-transform duration-200 shrink-0 hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-indigo-500/30 shadow-2xl py-1.5 z-50 animate-fade-in divide-y divide-white/5">
          <div className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>Select Language</span>
            </span>
            {isAutoDetected && (
              <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-0.5 normal-case font-medium bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                <Smartphone className="w-2.5 h-2.5" /> Auto: {deviceLocale.split('-')[0].toUpperCase()}
              </span>
            )}
          </div>

          <div className="py-1">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              const isDeviceLang = deviceLanguage === lang.code;

              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors hover:bg-indigo-600/20 cursor-pointer ${
                    isSelected
                      ? 'text-indigo-300 font-bold bg-indigo-600/10'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[13px]">{lang.nativeName}</span>
                        {isDeviceLang && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono">
                            Device
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{lang.name}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          {!isAutoDetected && (
            <div className="p-1.5">
              <button
                onClick={() => {
                  resetToDeviceLanguage();
                  setIsOpen(false);
                }}
                className="w-full py-1.5 px-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors border border-sky-500/20 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Device ({deviceLanguageInfo.nativeName})</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
