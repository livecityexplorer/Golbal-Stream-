import { Currency } from '../types';

const STORAGE_KEY = 'streamuk_auto_currency';

// Eurozone and wider European country codes
const EURO_COUNTRIES = new Set([
  'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 
  'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'MC', 
  'SM', 'VA', 'AD', 'ME', 'XK', 'CH', 'NO', 'SE', 'DK', 'PL', 
  'CZ', 'HU', 'RO', 'BG', 'HR'
]);

const UK_COUNTRIES = new Set([
  'GB', 'UK', 'IM', 'GG', 'JE', 'GI'
]);

/**
 * Instantly detects the most appropriate currency based on client timezone and browser locale.
 * Runs 100% synchronously with zero delay or network dependency.
 */
export function getInstantLocaleCurrency(): Currency {
  try {
    // 1. Check if previously detected and cached
    const cached = localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (cached && (cached === 'GBP' || cached === 'EUR' || cached === 'USD')) {
      return cached;
    }

    // 2. Check Browser Timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    // United Kingdom timezones
    if (
      timeZone.includes('London') ||
      timeZone.includes('Belfast') ||
      timeZone.includes('Jersey') ||
      timeZone.includes('Guernsey') ||
      timeZone.includes('Isle_of_Man') ||
      timeZone.includes('Gibraltar')
    ) {
      return 'GBP';
    }

    // European timezones
    if (timeZone.startsWith('Europe/') || timeZone.includes('Atlantic/Canary') || timeZone.includes('Atlantic/Madeira')) {
      return 'EUR';
    }

    // Canadian timezones
    if (
      timeZone.startsWith('Canada/') ||
      timeZone.includes('Toronto') ||
      timeZone.includes('Vancouver') ||
      timeZone.includes('Montreal') ||
      timeZone.includes('Edmonton') ||
      timeZone.includes('Winnipeg') ||
      timeZone.includes('Halifax') ||
      timeZone.includes('St_Johns') ||
      timeZone.includes('Regina')
    ) {
      return 'CAD';
    }

    // Americas & Worldwide timezones
    if (
      timeZone.startsWith('America/') ||
      timeZone.startsWith('US/') ||
      timeZone.startsWith('Pacific/') ||
      timeZone.startsWith('Australia/') ||
      timeZone.startsWith('Asia/') ||
      timeZone.startsWith('Africa/')
    ) {
      return 'USD';
    }

    // 3. Fallback to Browser Language Locale
    const navLangs = navigator.languages ? [...navigator.languages] : [navigator.language || ''];
    for (const lang of navLangs) {
      const lower = lang.toLowerCase();
      if (lower.includes('-gb') || lower.includes('-uk') || lower.startsWith('en-ie') || lower.startsWith('cy') || lower.startsWith('gd')) {
        return 'GBP';
      }
      if (lower.includes('-ca')) {
        return 'CAD';
      }
      if (
        lower.startsWith('de') || lower.startsWith('fr') || lower.startsWith('it') ||
        lower.startsWith('es') || lower.startsWith('nl') || lower.startsWith('pt') ||
        lower.startsWith('el') || lower.startsWith('fi') || lower.startsWith('sv') ||
        lower.startsWith('da') || lower.startsWith('pl') || lower.startsWith('cs') ||
        lower.startsWith('sk') || lower.startsWith('hu') || lower.startsWith('ro') ||
        lower.startsWith('bg') || lower.startsWith('hr')
      ) {
        return 'EUR';
      }
      if (lower.includes('-us') || lower.includes('-au') || lower.includes('-nz')) {
        return 'USD';
      }
    }

    return 'GBP';
  } catch (e) {
    return 'GBP';
  }
}

/**
 * Asynchronously checks IP location via fast lightweight geo-APIs to confirm accurate currency.
 * Automatically updates storage and triggers the callback if currency differs from initial guess.
 */
export async function detectLocationCurrency(onDetected?: (currency: Currency) => void): Promise<Currency> {
  const instantCurrency = getInstantLocaleCurrency();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2800);

    const res = await fetch('https://api.country.is', {
      signal: controller.signal,
      cache: 'default',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const country = (data.country || '').toUpperCase();
      let confirmedCurrency: Currency = 'USD';

      if (UK_COUNTRIES.has(country)) {
        confirmedCurrency = 'GBP';
      } else if (country === 'CA') {
        confirmedCurrency = 'CAD';
      } else if (EURO_COUNTRIES.has(country)) {
        confirmedCurrency = 'EUR';
      } else {
        confirmedCurrency = 'USD';
      }

      localStorage.setItem(STORAGE_KEY, confirmedCurrency);
      if (onDetected && confirmedCurrency !== instantCurrency) {
        onDetected(confirmedCurrency);
      }
      return confirmedCurrency;
    }
  } catch (e) {
    // Network or adblock blocked, graceful fallback to instant timezone-based currency
  }

  return instantCurrency;
}
