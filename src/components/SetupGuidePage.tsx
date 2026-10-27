import React, { useMemo } from 'react';
import { ALL_SETUP_GUIDES } from '../data/setupGuidesData';
import { DedicatedGuideView } from './setup/DedicatedGuideView';
import { SetupHubView } from './setup/SetupHubView';
import { SetupSeoManager } from './setup/SetupSeoManager';

interface SetupGuidePageProps {
  currentSlug?: string;
  onSelectPlan: (planId: string) => void;
  navigateTo: (path: string) => void;
  whatsappNumber?: string;
}

export const SetupGuidePage: React.FC<SetupGuidePageProps> = ({
  currentSlug,
  onSelectPlan,
  navigateTo,
  whatsappNumber = '+44 7731 454811',
}) => {
  // Find matching guide if a specific slug is present in the URL
  const matchedGuide = useMemo(() => {
    if (!currentSlug) return null;
    return ALL_SETUP_GUIDES.find(g => g.slug === currentSlug) || null;
  }, [currentSlug]);

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 font-sans">
      {/* Dynamic SEO & Schema.org Structured Data Injection */}
      <SetupSeoManager
        guide={matchedGuide || undefined}
        isHub={!matchedGuide}
      />

      {matchedGuide ? (
        // Dedicated Single Player & Device Setup Page (e.g. /setup/android-tv-tivimate)
        <DedicatedGuideView
          guide={matchedGuide}
          onSelectPlan={onSelectPlan}
          navigateTo={navigateTo}
          whatsappNumber={whatsappNumber}
        />
      ) : (
        // Setup Guides Hub & Directory (e.g. /setup)
        <SetupHubView
          onSelectPlan={onSelectPlan}
          navigateTo={navigateTo}
          whatsappNumber={whatsappNumber}
        />
      )}
    </div>
  );
};
