import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { CookiePreferences, CookieRegionMode } from '../types';
import { 
  ShieldCheck, 
  Settings2, 
  Check, 
  X, 
  Globe, 
  Zap, 
  Lock, 
  Sliders, 
  ChevronRight,
  Info,
  Sparkles
} from 'lucide-react';

export const COOKIE_CONSENT_KEY = 'streamuk_cookie_consent_v1';

export function detectUserRegionMode(): CookieRegionMode {
  if (typeof window === 'undefined') return 'gdpr';

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone?.toLowerCase() || '';
    const lang = (navigator.language || '').toLowerCase();
    
    // US / CCPA timezones and locales
    if (
      tz.includes('new_york') || 
      tz.includes('los_angeles') || 
      tz.includes('chicago') || 
      tz.includes('denver') || 
      tz.includes('phoenix') || 
      tz.includes('detroit') || 
      tz.includes('indiana') ||
      tz.includes('anchorage') ||
      tz.includes('honolulu') ||
      lang === 'en-us' ||
      lang === 'es-us'
    ) {
      return 'ccpa';
    }

    // UK & EU / GDPR timezones and locales
    if (
      tz.includes('europe') || 
      tz.includes('london') || 
      tz.includes('paris') || 
      tz.includes('berlin') || 
      tz.includes('madrid') || 
      tz.includes('rome') || 
      tz.includes('dublin') || 
      tz.includes('amsterdam') || 
      tz.includes('brussels') || 
      tz.includes('vienna') || 
      tz.includes('zurich') || 
      tz.includes('warsaw') || 
      tz.includes('stockholm') || 
      tz.includes('lisbon') || 
      tz.includes('athens') ||
      lang.startsWith('en-gb') ||
      lang.startsWith('fr') ||
      lang.startsWith('de') ||
      lang.startsWith('es') ||
      lang.startsWith('it')
    ) {
      return 'gdpr';
    }
  } catch {
    // fallback
  }

  return 'global';
}

export function getStoredCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw) {
      return JSON.parse(raw) as CookiePreferences;
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveCookiePreferences(prefs: CookiePreferences) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: prefs }));
  } catch {
    // ignore
  }
}

interface CookieConsentBannerProps {
  isSettingsOpen?: boolean;
  onCloseSettings?: () => void;
  onOpenSettings?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  isSettingsOpen = false,
  onCloseSettings,
  onOpenSettings,
}) => {
  const { t, language } = useTranslation();
  const [regionMode, setRegionMode] = useState<CookieRegionMode>('gdpr');
  const [hasDecided, setHasDecided] = useState<boolean>(true); // start true to prevent flash
  const [internalSettingsOpen, setInternalSettingsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Granular preference state
  const [prefs, setPrefs] = useState<CookiePreferences>({
    strictlyNecessary: true,
    localization: true,
    analytics: true,
    regionMode: 'gdpr',
  });

  useEffect(() => {
    const detected = detectUserRegionMode();
    setRegionMode(detected);

    const stored = getStoredCookiePreferences();
    if (stored) {
      setPrefs(stored);
      setHasDecided(true);
    } else {
      setPrefs({
        strictlyNecessary: true,
        localization: true,
        analytics: true,
        regionMode: detected,
      });
      // Show after subtle delay
      const timer = setTimeout(() => {
        setHasDecided(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen to external cookie_consent_updated events
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>;
      if (customEvent.detail) {
        setPrefs(customEvent.detail);
        setHasDecided(true);
      }
    };
    window.addEventListener('cookie_consent_updated', handler);
    return () => window.removeEventListener('cookie_consent_updated', handler);
  }, []);

  const handleAcceptAll = () => {
    const updated: CookiePreferences = {
      strictlyNecessary: true,
      localization: true,
      analytics: true,
      regionMode,
      timestamp: Date.now(),
    };
    saveCookiePreferences(updated);
    setPrefs(updated);
    setHasDecided(true);
    setInternalSettingsOpen(false);
    if (onCloseSettings) onCloseSettings();
  };

  const handleRejectNonEssential = () => {
    const updated: CookiePreferences = {
      strictlyNecessary: true,
      localization: false,
      analytics: false,
      regionMode,
      timestamp: Date.now(),
    };
    saveCookiePreferences(updated);
    setPrefs(updated);
    setHasDecided(true);
    setInternalSettingsOpen(false);
    if (onCloseSettings) onCloseSettings();
  };

  const handleSaveCustom = () => {
    const updated: CookiePreferences = {
      ...prefs,
      strictlyNecessary: true,
      regionMode,
      timestamp: Date.now(),
    };
    saveCookiePreferences(updated);
    setHasDecided(true);
    setInternalSettingsOpen(false);
    if (onCloseSettings) onCloseSettings();
  };

  const showModal = isSettingsOpen || internalSettingsOpen;

  const cookieTexts = t.cookieConsent || {
    badge: 'GDPR / CCPA Privacy & Localization Preferences',
    title: 'Cookie & Localization Preferences',
    description: 'We use essential cookies and local storage to remember your chosen language, regional currency, device timezone, and streaming node configuration.',
    gdprBadge: 'GDPR Compliant (UK/EU)',
    ccpaBadge: 'CCPA Compliant (USA)',
    globalBadge: 'Privacy Protected',
    acceptAll: 'Accept All Preferences',
    rejectNonEssential: 'Essential Only',
    customize: 'Customize Choices',
    savePreferences: 'Save Preferences',
    settingsTitle: 'Privacy & Cookie Settings',
    settingsSubtitle: 'Control your localization, regional currency, and performance preferences in accordance with GDPR & CCPA standards.',
    strictlyNecessaryTitle: 'Strictly Necessary (Always Active)',
    strictlyNecessaryDesc: 'Required for core website security, video stream token routing, load balancing, and anti-freeze connection authentication.',
    strictlyNecessaryBadge: 'Always Active',
    localizationTitle: 'Localization & Region Preferences',
    localizationDesc: 'Saves your preferred language, automatic device locale detection, currency (GBP/USD/EUR/CAD), and timezone display settings.',
    analyticsTitle: 'Streaming Speed & Performance Cache',
    analyticsDesc: 'Stores speed test latency metrics and channel search cache locally to accelerate page loading and server node selection.',
    doNotSellTitle: 'Do Not Sell or Share My Information',
    doNotSellDesc: 'In compliance with CCPA, we never sell, rent, or broker your personal information, viewing habits, or device telemetry to third parties.',
    privacyNote: 'Your choices take effect immediately and can be updated anytime from the footer.',
    close: 'Close',
  };

  const getRegionBadge = () => {
    if (regionMode === 'gdpr') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-wider">
          <span>🇬🇧 🇪🇺</span>
          <span>{cookieTexts.gdprBadge}</span>
        </span>
      );
    }
    if (regionMode === 'ccpa') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-bold tracking-wider">
          <span>🇺🇸</span>
          <span>{cookieTexts.ccpaBadge}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold tracking-wider">
        <span>🌐</span>
        <span>{cookieTexts.globalBadge}</span>
      </span>
    );
  };

  return (
    <>
      {/* 1. Non-Intrusive Floating Banner */}
      {!hasDecided && !showModal && !isMinimized && (
        <aside
          aria-label="Cookie consent"
          className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 max-w-xl w-[calc(100%-2rem)] sm:w-auto animate-fade-in pointer-events-auto"
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-indigo-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/80 space-y-3 relative overflow-hidden group">
            
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400" />

            {/* Header / Badges */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-black text-white">{cookieTexts.title}</h2>
                  {getRegionBadge()}
                </div>
              </div>

              <button
                onClick={() => setIsMinimized(true)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Minimize banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanatory Text */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {cookieTexts.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs transition-all shadow-md shadow-indigo-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{cookieTexts.acceptAll}</span>
              </button>

              <button
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors border border-white/5 cursor-pointer"
              >
                {cookieTexts.rejectNonEssential}
              </button>

              <button
                onClick={() => {
                  if (onOpenSettings) {
                    onOpenSettings();
                  } else {
                    setInternalSettingsOpen(true);
                  }
                }}
                className="px-3 py-2 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-sky-300 font-semibold text-xs transition-colors flex items-center gap-1.5 ml-auto cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{cookieTexts.customize}</span>
              </button>
            </div>

          </div>
        </aside>
      )}

      {/* Minimized Pill if dismissed without deciding */}
      {!hasDecided && isMinimized && !showModal && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-4 left-4 z-40 bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-black/60 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          <span>{cookieTexts.title}</span>
        </button>
      )}

      {/* 2. Granular Settings & Preferences Modal (GDPR & CCPA Compliant) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-sky-400">
                    <Settings2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{cookieTexts.settingsTitle}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      {getRegionBadge()}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {cookieTexts.settingsSubtitle}
                </p>
              </div>

              <button
                onClick={() => {
                  setInternalSettingsOpen(false);
                  if (onCloseSettings) onCloseSettings();
                }}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Granular Preferences Items */}
            <div className="space-y-4">
              
              {/* 1. Strictly Necessary */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">{cookieTexts.strictlyNecessaryTitle}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                      {cookieTexts.strictlyNecessaryBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cookieTexts.strictlyNecessaryDesc}
                  </p>
                </div>

                {/* Locked Switch */}
                <div className="w-12 h-6 rounded-full bg-emerald-500/30 border border-emerald-500/40 p-1 flex items-center justify-end shrink-0 cursor-not-allowed opacity-80" title="Always active for core security">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-sm" />
                </div>
              </div>

              {/* 2. Localization & Region Preferences */}
              <div className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/30 p-4 rounded-2xl flex items-start justify-between gap-4 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold text-white">{cookieTexts.localizationTitle}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cookieTexts.localizationDesc}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-sky-300/80">
                    <span>Active: <strong>{language.toUpperCase()}</strong></span>
                    <span>•</span>
                    <span>Device Auto-Sync Enabled</span>
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setPrefs(prev => ({ ...prev, localization: !prev.localization }))}
                  className={`w-12 h-6 rounded-full p-1 flex items-center transition-all shrink-0 cursor-pointer ${
                    prefs.localization ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {/* 3. Performance & Speed Test Cache */}
              <div className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/30 p-4 rounded-2xl flex items-start justify-between gap-4 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-white">{cookieTexts.analyticsTitle}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cookieTexts.analyticsDesc}
                  </p>
                </div>

                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setPrefs(prev => ({ ...prev, analytics: !prev.analytics }))}
                  className={`w-12 h-6 rounded-full p-1 flex items-center transition-all shrink-0 cursor-pointer ${
                    prefs.analytics ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {/* CCPA Notice of Non-Sale */}
              <div className="bg-slate-950/50 border border-slate-800/80 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-slate-400">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 font-bold block">{cookieTexts.doNotSellTitle}</strong>
                  <span>{cookieTexts.doNotSellDesc}</span>
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-500 text-center sm:text-left">
                {cookieTexts.privacyNote}
              </span>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors w-full sm:w-auto cursor-pointer"
                >
                  {cookieTexts.rejectNonEssential}
                </button>

                <button
                  onClick={handleSaveCustom}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-black transition-all shadow-lg shadow-indigo-500/20 w-full sm:w-auto cursor-pointer"
                >
                  {cookieTexts.savePreferences}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
