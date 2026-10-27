import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { SupportedLanguage, LanguageInfo } from '../types';
import { translations, TranslationSchema, SUPPORTED_LANGUAGES } from '../i18n/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationSchema;
  currentLanguageInfo: LanguageInfo;
  languages: LanguageInfo[];
  deviceLanguage: SupportedLanguage;
  deviceLocale: string;
  isAutoDetected: boolean;
  resetToDeviceLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'streamuk_preferred_language';
const MANUAL_OVERRIDE_KEY = 'streamuk_manual_language_override';
const COOKIE_CONSENT_KEY = 'streamuk_cookie_consent_v1';

export function canPersistLocalizationPreferences(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return true; // Default allowed until explicit rejection
    const consent = JSON.parse(raw);
    return consent.localization !== false;
  } catch {
    return true;
  }
}

/**
 * Intelligent helper to extract the best matching supported language from device settings
 */
export function detectDeviceLanguage(): { lang: SupportedLanguage; locale: string } {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { lang: 'en', locale: 'en-US' };
  }

  // 1. Gather all candidate locale strings from browser & device
  const candidates: string[] = [];

  // Check navigator.languages (array of user-configured languages in priority order)
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    candidates.push(...navigator.languages);
  }

  // Check navigator.language
  if (navigator.language) {
    candidates.push(navigator.language);
  }

  // Check legacy browser properties (e.g. mobile Safari, IE, Android WebViews)
  const nav = navigator as unknown as { userLanguage?: string; browserLanguage?: string; systemLanguage?: string };
  if (nav.userLanguage) candidates.push(nav.userLanguage);
  if (nav.browserLanguage) candidates.push(nav.browserLanguage);
  if (nav.systemLanguage) candidates.push(nav.systemLanguage);

  // Check Intl resolved locale
  try {
    const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (intlLocale) candidates.push(intlLocale);
  } catch {
    // ignore
  }

  const primaryLocale = candidates[0] || 'en-GB';

  // 2. Normalize and check each candidate in order
  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== 'string') continue;
    const lower = candidate.toLowerCase().trim();

    // Direct French matches (fr, fr-fr, fr-ca, fr-be, fr-ch, fr-lu, fr-mc, etc.)
    if (lower === 'fr' || lower.startsWith('fr-') || lower.startsWith('fr_')) {
      return { lang: 'fr', locale: candidate };
    }

    // Direct German matches (de, de-de, de-at, de-ch, de-li, de-lu, etc.)
    if (lower === 'de' || lower.startsWith('de-') || lower.startsWith('de_')) {
      return { lang: 'de', locale: candidate };
    }

    // Direct Spanish matches (es, es-es, es-mx, es-ar, es-co, es-cl, es-pe, es-us, etc.)
    if (lower === 'es' || lower.startsWith('es-') || lower.startsWith('es_')) {
      return { lang: 'es', locale: candidate };
    }

    // Direct Italian matches (it, it-it, it-ch, it-sm, etc.)
    if (lower === 'it' || lower.startsWith('it-') || lower.startsWith('it_')) {
      return { lang: 'it', locale: candidate };
    }

    // Direct English matches (en, en-gb, en-us, en-ca, en-au, en-nz, en-ie, etc.)
    if (lower === 'en' || lower.startsWith('en-') || lower.startsWith('en_')) {
      return { lang: 'en', locale: candidate };
    }
  }

  // 3. Fallback: Heuristic based on resolved system timezone
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      const tzLower = timeZone.toLowerCase();
      if (tzLower.includes('paris') || tzLower.includes('brussels') || tzLower.includes('monaco')) {
        return { lang: 'fr', locale: primaryLocale };
      }
      if (tzLower.includes('berlin') || tzLower.includes('vienna') || tzLower.includes('zurich')) {
        return { lang: 'de', locale: primaryLocale };
      }
      if (tzLower.includes('madrid') || tzLower.includes('barcelona') || tzLower.includes('mexico') || tzLower.includes('bogota') || tzLower.includes('buenos_aires')) {
        return { lang: 'es', locale: primaryLocale };
      }
      if (tzLower.includes('rome') || tzLower.includes('milan')) {
        return { lang: 'it', locale: primaryLocale };
      }
    }
  } catch {
    // ignore
  }

  return { lang: 'en', locale: primaryLocale };
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState(() => detectDeviceLanguage());
  
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(MANUAL_OVERRIDE_KEY) !== 'true';
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // 1. Check URL query param ?lang= first for direct links & search crawlers
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as SupportedLanguage | null;
      if (urlLang && ['en', 'fr', 'de', 'es', 'it'].includes(urlLang)) {
        return urlLang;
      }

      // 2. Check if user explicitly set a manual preference
      const manualOverride = localStorage.getItem(MANUAL_OVERRIDE_KEY) === 'true';
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (manualOverride && saved && ['en', 'fr', 'de', 'es', 'it'].includes(saved)) {
        return saved;
      }
    }

    // 3. Automatically derive from device
    const detected = detectDeviceLanguage();
    return detected.lang;
  });

  // User manually selects a language
  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    setIsAutoDetected(false);
    try {
      if (canPersistLocalizationPreferences()) {
        localStorage.setItem(STORAGE_KEY, newLang);
        localStorage.setItem(MANUAL_OVERRIDE_KEY, 'true');
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Reset to device language
  const resetToDeviceLanguage = useCallback(() => {
    const detected = detectDeviceLanguage();
    setDeviceInfo(detected);
    setLanguageState(detected.lang);
    setIsAutoDetected(true);
    try {
      if (canPersistLocalizationPreferences()) {
        localStorage.removeItem(MANUAL_OVERRIDE_KEY);
        localStorage.setItem(STORAGE_KEY, detected.lang);
      } else {
        localStorage.removeItem(MANUAL_OVERRIDE_KEY);
        localStorage.removeItem(STORAGE_KEY);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = detected.lang;
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Listen to cookie consent updates to clear storage if user revoked localization consent
  useEffect(() => {
    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ localization?: boolean }>;
      if (customEvent.detail && customEvent.detail.localization === false) {
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(MANUAL_OVERRIDE_KEY);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('cookie_consent_updated', handleConsentUpdate);
    return () => window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
  }, []);

  // Listen to OS/Device 'languagechange' event in real-time
  useEffect(() => {
    const handleLanguageChange = () => {
      const detected = detectDeviceLanguage();
      setDeviceInfo(detected);
      
      const manualOverride = localStorage.getItem(MANUAL_OVERRIDE_KEY) === 'true';
      if (!manualOverride) {
        setLanguageState(detected.lang);
        setIsAutoDetected(true);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = detected.lang;
        }
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  // Sync document html lang attribute and canonical tag
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;

      // Update or create canonical link tag dynamically
      try {
        let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!canonicalEl) {
          canonicalEl = document.createElement('link');
          canonicalEl.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalEl);
        }

        const currentUrl = new URL(window.location.href);
        // Canonical tag should always point to the clean canonical path without query strings
        canonicalEl.setAttribute('href', currentUrl.origin + currentUrl.pathname);

        // If a ?lang= query parameter exists in the URL, cleanly replace state in browser history
        if (currentUrl.searchParams.has('lang') && window.history && window.history.replaceState) {
          currentUrl.searchParams.delete('lang');
          const cleanSearch = currentUrl.searchParams.toString();
          const cleanUrl = currentUrl.pathname + (cleanSearch ? `?${cleanSearch}` : '') + currentUrl.hash;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      } catch (e) {
        console.warn('Could not update canonical tag dynamically:', e);
      }
    }
  }, [language]);

  const currentLanguageInfo = useMemo(() => {
    return SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  const contextValue = useMemo<LanguageContextType>(() => ({
    language,
    setLanguage,
    t: translations[language] || translations.en,
    currentLanguageInfo,
    languages: SUPPORTED_LANGUAGES,
    deviceLanguage: deviceInfo.lang,
    deviceLocale: deviceInfo.locale,
    isAutoDetected,
    resetToDeviceLanguage,
  }), [
    language,
    setLanguage,
    currentLanguageInfo,
    deviceInfo.lang,
    deviceInfo.locale,
    isAutoDetected,
    resetToDeviceLanguage,
  ]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
