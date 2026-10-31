import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { SupportedLanguage } from '../types';
import { ShieldCheck, Zap, Sparkles, CheckCircle2, X } from 'lucide-react';

interface PurchaseEvent {
  name: string;
  location: string;
  plan: string;
  timeAgo: string;
  device: string;
}

const PURCHASES_BY_LANG: Record<SupportedLanguage, PurchaseEvent[]> = {
  en: [
    { name: 'Oliver B.', location: 'London, UK 🇬🇧', plan: '12 Months 4K Season Pass', timeAgo: '2 minutes ago', device: 'FireStick 4K Max' },
    { name: 'James H.', location: 'Manchester, UK 🇬🇧', plan: 'Free 24h VIP Trial Pass', timeAgo: '4 minutes ago', device: 'Samsung Smart TV' },
    { name: 'Michael T.', location: 'Toronto, Canada 🇨🇦', plan: '12 Months 4K VIP Pass', timeAgo: '7 minutes ago', device: 'TiviMate 4K' },
    { name: 'Connor M.', location: 'Glasgow, UK 🇬🇧', plan: '3 Months 4K Premier Pass', timeAgo: '11 minutes ago', device: 'Apple TV 4K' },
    { name: 'Brandon K.', location: 'New York, USA 🇺🇸', plan: '12 Months 4K VIP Pass', timeAgo: '14 minutes ago', device: 'Android TV' },
    { name: 'Harry W.', location: 'Birmingham, UK 🇬🇧', plan: 'Free 24h VIP Trial Pass', timeAgo: '18 minutes ago', device: 'LG webOS' },
    { name: 'Liam S.', location: 'Leeds, UK 🇬🇧', plan: '6 Months 4K Pass', timeAgo: '21 minutes ago', device: 'IPTV Smarters Pro' },
  ],
  fr: [
    { name: 'Lucas D.', location: 'Paris, France 🇫🇷', plan: 'Pass VIP 12 Mois 4K', timeAgo: 'Il y a 2 min', device: 'FireStick 4K Max' },
    { name: 'Maxime R.', location: 'Lyon, France 🇫🇷', plan: 'Essai Gratuit 24h VIP', timeAgo: 'Il y a 5 min', device: 'Samsung Smart TV' },
    { name: 'Alexandre B.', location: 'Marseille, France 🇫🇷', plan: 'Pass 12 Mois 4K', timeAgo: 'Il y a 8 min', device: 'TiviMate 4K' },
    { name: 'Guillaume L.', location: 'Bruxelles, Belgique 🇧🇪', plan: 'Pass 6 Mois 4K', timeAgo: 'Il y a 12 min', device: 'Apple TV 4K' },
    { name: 'Antoine M.', location: 'Montréal, Canada 🇨🇦', plan: 'Pass 12 Mois 4K', timeAgo: 'Il y a 15 min', device: 'Android TV Box' },
  ],
  de: [
    { name: 'Maximilian K.', location: 'München, Deutschland 🇩🇪', plan: '12 Monate 4K VIP Pass', timeAgo: 'Vor 2 Min.', device: 'FireStick 4K Max' },
    { name: 'Felix S.', location: 'Berlin, Deutschland 🇩🇪', plan: 'Kostenlose 24h VIP-Testphase', timeAgo: 'Vor 4 Min.', device: 'Samsung Smart TV' },
    { name: 'Lukas W.', location: 'Wien, Österreich 🇦🇹', plan: '12 Monate 4K Pass', timeAgo: 'Vor 7 Min.', device: 'TiviMate 4K' },
    { name: 'Leon B.', location: 'Hamburg, Deutschland 🇩🇪', plan: '6 Monate 4K Pass', timeAgo: 'Vor 11 Min.', device: 'Apple TV 4K' },
    { name: 'Jan N.', location: 'Zürich, Schweiz 🇨🇭', plan: '12 Monate 4K VIP Pass', timeAgo: 'Vor 16 Min.', device: 'Android TV' },
  ],
  es: [
    { name: 'Alejandro M.', location: 'Madrid, España 🇪🇸', plan: 'Pase VIP 12 Meses 4K', timeAgo: 'Hace 2 min', device: 'FireStick 4K Max' },
    { name: 'Carlos R.', location: 'Barcelona, España 🇪🇸', plan: 'Prueba Gratis 24h VIP', timeAgo: 'Hace 5 min', device: 'Samsung Smart TV' },
    { name: 'Mateo G.', location: 'Valencia, España 🇪🇸', plan: 'Pase 12 Meses 4K', timeAgo: 'Hace 9 min', device: 'TiviMate 4K' },
    { name: 'Daniel F.', location: 'Buenos Aires, Argentina 🇦🇷', plan: 'Pase 6 Meses 4K', timeAgo: 'Hace 13 min', device: 'Apple TV 4K' },
    { name: 'Santiago V.', location: 'Ciudad de México, México 🇲🇽', plan: 'Pase 12 Meses 4K', timeAgo: 'Hace 17 min', device: 'Android TV' },
  ],
  it: [
    { name: 'Matteo R.', location: 'Milano, Italia 🇮🇹', plan: 'Pass VIP 12 Mesi 4K', timeAgo: '2 minuti fa', device: 'FireStick 4K Max' },
    { name: 'Lorenzo B.', location: 'Roma, Italia 🇮🇹', plan: 'Prova Gratuita 24h VIP', timeAgo: '4 minuti fa', device: 'Samsung Smart TV' },
    { name: 'Andrea M.', location: 'Torino, Italia 🇮🇹', plan: 'Pass 12 Mesi 4K', timeAgo: '8 minuti fa', device: 'TiviMate 4K' },
    { name: 'Francesco P.', location: 'Napoli, Italia 🇮🇹', plan: 'Pass 6 Mesi 4K', timeAgo: '12 minuti fa', device: 'Apple TV 4K' },
    { name: 'Marco G.', location: 'Firenze, Italia 🇮🇹', plan: 'Pass 12 Mesi 4K', timeAgo: '16 minuti fa', device: 'Android TV' },
  ],
};

export const LiveSalesNotification: React.FC = () => {
  const { language } = useTranslation();
  const purchases = PURCHASES_BY_LANG[language] || PURCHASES_BY_LANG.en;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const showNotification = () => {
      setIsVisible(true);
      // Keep visible for 7 seconds, then hide
      showTimeout = setTimeout(() => {
        setIsVisible(false);
        // Rotate to the next item
        setCurrentIndex((prev) => (prev + 1) % purchases.length);
        // Wait 2 minutes (120,000 ms) of quiet time before showing the next notification
        hideTimeout = setTimeout(showNotification, 120000);
      }, 7000);
    };

    // First appearance after 2 minutes (120,000 ms) of landing
    const initialTimer = setTimeout(showNotification, 120000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [isDismissed, purchases.length]);

  if (isDismissed || !isVisible) return null;

  const current = purchases[currentIndex] || purchases[0];

  const getActionLabel = (lang: SupportedLanguage) => {
    switch (lang) {
      case 'fr': return 'A activé';
      case 'de': return 'Aktiviert';
      case 'es': return 'Ha activado';
      case 'it': return 'Ha attivato';
      default: return 'Activated';
    }
  };

  return (
    <div className="fixed bottom-24 left-3 right-3 sm:right-auto sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-sm w-auto animate-fade-in pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-indigo-500/40 rounded-2xl p-3.5 shadow-2xl shadow-black/80 flex items-center gap-3 relative overflow-hidden group">
        
        {/* Glow accent */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-cyan-400" />

        {/* Pulsing delivery icon */}
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
          <Zap className="w-5 h-5 fill-emerald-400" />
        </div>

        {/* Content */}
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-1.5 text-xs font-black text-white">
            <span>{current.name}</span>
            <span className="text-slate-400 font-normal">in</span>
            <span className="text-cyan-300 font-semibold">{current.location}</span>
          </div>
          
          <div className="text-[11px] text-emerald-300 font-bold flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>{getActionLabel(language)} {current.plan}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
            <span>{current.device}</span>
            <span>•</span>
            <span className="text-slate-500">{current.timeAgo}</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-white/5 transition-colors absolute top-2 right-2 cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
