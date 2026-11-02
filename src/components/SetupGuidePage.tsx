import React, { useMemo } from 'react';
import { ALL_SETUP_GUIDES } from '../data/setupGuidesData';
import { DedicatedGuideView } from './setup/DedicatedGuideView';
import { SetupHubView } from './setup/SetupHubView';
import { SetupSeoManager } from './setup/SetupSeoManager';
import { ThemeCustomization } from '../types';
import { Eye, Sparkles, Check } from 'lucide-react';

interface SetupGuidePageProps {
  currentSlug?: string;
  onSelectPlan: (planId: string) => void;
  navigateTo: (path: string) => void;
  whatsappNumber?: string;
  themeConfig?: ThemeCustomization;
  setThemeConfig?: React.Dispatch<React.SetStateAction<ThemeCustomization>>;
}

export const SetupGuidePage: React.FC<SetupGuidePageProps> = ({
  currentSlug,
  onSelectPlan,
  navigateTo,
  whatsappNumber = '+44 7731 454811',
  themeConfig,
  setThemeConfig,
}) => {
  // Find matching guide if a specific slug is present in the URL
  const matchedGuide = useMemo(() => {
    if (!currentSlug) return null;
    const normalized = currentSlug.toLowerCase().trim();
    if (normalized === 'cbr' || normalized === 'cbrtv' || normalized === 'boss-media-player' || normalized === 'boss-player') {
      return ALL_SETUP_GUIDES.find(g => g.slug === 'cbr-tv') || null;
    }
    if (normalized === 'cbr-tv-desktop' || normalized === 'cbr-desktop' || normalized === 'cbr-pc' || normalized === 'cbr-mac' || normalized === 'cbr-windows') {
      return ALL_SETUP_GUIDES.find(g => g.slug === 'cbr-tv-desktop') || null;
    }
    return ALL_SETUP_GUIDES.find(g => g.slug === normalized) || null;
  }, [currentSlug]);

  // Dynamic eye-comfort background styles according to active palette
  const activeColor = themeConfig?.accentColorName || 'emerald';

  const themeGradients = {
    emerald: 'from-[#071412] via-[#091a16] to-[#050f0e] selection:bg-emerald-500/30 selection:text-emerald-100',
    amber: 'from-[#140f09] via-[#1a140c] to-[#0d0905] selection:bg-amber-500/30 selection:text-amber-100',
    purple: 'from-[#12081a] via-[#180b22] to-[#0b0410] selection:bg-purple-500/30 selection:text-purple-100',
    cyan: 'from-[#07101e] via-[#0a172c] to-[#050b14] selection:bg-sky-500/30 selection:text-sky-100',
    red: 'from-[#15090a] via-[#1d0c0e] to-[#0d0506] selection:bg-rose-500/30 selection:text-rose-100',
  };

  const currentGradient = themeGradients[activeColor] || themeGradients.emerald;

  const eyeComfortPalettes: {
    id: ThemeCustomization['accentColorName'];
    name: string;
    icon: string;
    hex: string;
    desc: string;
    pillBg: string;
  }[] = [
    { id: 'emerald', name: 'Forest Sage', icon: '🌿', hex: '#10b981', desc: 'Eye-Comfort Natural (555nm Relaxing)', pillBg: 'bg-emerald-500' },
    { id: 'amber', name: 'Night Shift', icon: '☕', hex: '#f59e0b', desc: 'Zero-Blue Light Warm Amber', pillBg: 'bg-amber-500' },
    { id: 'cyan', name: 'Midnight Sky', icon: '🌌', hex: '#0ea5e9', desc: 'Deep Oceanic Slate', pillBg: 'bg-sky-500' },
    { id: 'purple', name: 'Amethyst', icon: '🔮', hex: '#a855f7', desc: 'Velvet Midnight Violet', pillBg: 'bg-purple-500' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentGradient} text-slate-100 font-sans transition-colors duration-500`}>
      {/* Dynamic SEO & Schema.org Structured Data Injection */}
      <SetupSeoManager
        guide={matchedGuide || undefined}
        isHub={!matchedGuide}
      />

      {/* Floating Eye-Comfort Palette Switcher Bar (Mobile & Desktop) */}
      {setThemeConfig && (
        <div className="pt-2 sm:pt-3 px-3.5 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 sm:p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs shadow-lg">
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Eye className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-white">Eye-Comfort Page & App Color:</span>
              <span className="text-slate-400 hidden md:inline">• Soothing, non-glare optics for TV guides</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto justify-start sm:justify-end">
              {eyeComfortPalettes.map((p) => {
                const isActive = activeColor === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setThemeConfig(prev => ({
                        ...prev,
                        accentColorName: p.id,
                        accentColor: p.hex,
                      }));
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 min-h-[32px] ${
                      isActive
                        ? 'bg-white/15 text-white border border-white/30 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                    title={p.desc}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${p.pillBg}`} />
                    <span>{p.name}</span>
                    {isActive && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {matchedGuide ? (
        // Dedicated Single Player & Device Setup Page (e.g. /setup/android-tv-tivimate)
        <DedicatedGuideView
          guide={matchedGuide}
          onSelectPlan={onSelectPlan}
          navigateTo={navigateTo}
          whatsappNumber={whatsappNumber}
          themeConfig={themeConfig}
        />
      ) : (
        // Setup Guides Hub & Directory (e.g. /setup)
        <SetupHubView
          onSelectPlan={onSelectPlan}
          navigateTo={navigateTo}
          whatsappNumber={whatsappNumber}
          themeConfig={themeConfig}
        />
      )}
    </div>
  );
};
