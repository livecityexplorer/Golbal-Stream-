import React, { useEffect, useState } from 'react';
import { TrendingUp, RefreshCw, Zap, ShieldCheck, Activity } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export const ExchangeRateTicker: React.FC = () => {
  const { t } = useTranslation();
  const [rates, setRates] = useState<{ EUR: number; USD: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/GBP');
        if (res.ok) {
          const data = await res.json();
          setRates({
            EUR: data.rates.EUR,
            USD: data.rates.USD,
          });
        }
      } catch (err) {
        console.error("Failed to fetch rates", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60 * 60 * 1000); // every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#04060f] border-b border-indigo-500/20 py-1.5 sm:py-2 px-2.5 sm:px-3 flex justify-center items-center overflow-hidden relative w-full max-w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-sky-900/10 to-emerald-900/10" />
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono font-medium tracking-wide text-slate-300 relative z-10">
        
        {/* Instant Automated WhatsApp Delivery */}
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>⚡ Instant Automated WhatsApp Delivery in &lt; 10s</span>
        </div>

        <span className="text-slate-700 hidden sm:inline">•</span>

        {/* Anti-Freeze SLA */}
        <div className="hidden md:flex items-center gap-1.5 text-cyan-300">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>99.99% Uptime SLA • Anti-Freeze v9.8</span>
        </div>

        {rates && (
          <>
            <span className="text-slate-700 hidden md:inline">•</span>
            <div className="hidden lg:flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1">
                <span className="text-slate-300">1 GBP =</span> 
                <span className="text-emerald-400 font-bold font-mono">€{rates.EUR.toFixed(2)}</span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1">
                <span className="text-slate-300">1 GBP =</span> 
                <span className="text-cyan-400 font-bold font-mono">${rates.USD.toFixed(2)}</span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

