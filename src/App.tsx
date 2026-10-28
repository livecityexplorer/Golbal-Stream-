import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { PricingCalculator } from './components/PricingCalculator';
import { ChannelExplorer } from './components/ChannelExplorer';
import { VodShowcase } from './components/VodShowcase';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { LiveSalesNotification } from './components/LiveSalesNotification';
import { SeoHashtagCloud } from './components/SeoHashtagCloud';
import { ShareReferralBar } from './components/ShareReferralBar';
import { Footer } from './components/Footer';
import { DeviceSetupModal } from './components/DeviceSetupModal';
import { SpeedTestModal } from './components/SpeedTestModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FreeTrialModal } from './components/FreeTrialModal';
import { ThemeCustomizerDrawer } from './components/ThemeCustomizerDrawer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { DomainAdvisorModal } from './components/DomainAdvisorModal';
import { NamecheapDeployModal } from './components/NamecheapDeployModal';
import { TrafficBoosterModal } from './components/TrafficBoosterModal';
import { LanguageProvider } from './context/LanguageContext';
import { SUBSCRIPTION_PLANS } from './data/mockData';
import { fetchLiveSportsFixtures, generateDynamicLiveFixtures, setupMidnightScheduler } from './services/liveSportsService';
import { BLOG_POSTS } from './data/blogData';
import { BlogPostPage } from './components/BlogPostPage';
import { SetupGuidePage } from './components/SetupGuidePage';
import { RegionalLandingPage, RegionalMarket } from './components/RegionalLandingPage';
import { InteractiveDeviceHub } from './components/InteractiveDeviceHub';
import { LiveSupportWidget } from './components/LiveSupportWidget';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LiveFixturesSchedule } from './components/LiveFixturesSchedule';
import { SportsTicker } from './components/SportsTicker';
import { Currency, PlanPricing, ThemeCustomization, SportsFixture } from './types';
import { getInstantLocaleCurrency, detectLocationCurrency } from './utils/geoCurrency';

export default function App() {
  // Theme & branding state
  const [themeConfig, setThemeConfig] = useState<ThemeCustomization>(() => ({
    brandName: 'GlobalStreamHub 4K',
    brandTagline: 'Ultra HD Global Sports & Cinema Media Portal',
    accentColor: '#0ea5e9',
    accentColorName: 'cyan',
    whatsappNumber: '+44 7731 454811',
    telegramUser: '@globalstreamhub',
    supportEmail: 'support@globalstreamhub.net',
    currency: getInstantLocaleCurrency(),
    isDarkMode: true,
  }));

  // Auto-detect user currency based on location in background
  useEffect(() => {
    detectLocationCurrency((detectedCurrency) => {
      setThemeConfig(prev => {
        if (prev.currency !== detectedCurrency) {
          return { ...prev, currency: detectedCurrency };
        }
        return prev;
      });
    });
  }, []);

  // Path routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Memoized currency change handler that prevents re-render loops if currency has not changed
  const handleCurrencyChange = useCallback((newCurrency: Currency) => {
    setThemeConfig(prev => {
      if (prev.currency === newCurrency) return prev;
      return { ...prev, currency: newCurrency };
    });
  }, []);

  const navigateTo = useCallback((path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      console.warn('History pushState is blocked or restricted in this container/iframe:', e);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Redirect /blog and /news helper
  useEffect(() => {
    if (currentPath === '/blog' || currentPath === '/news') {
      try {
        window.history.replaceState({}, '', '/');
      } catch (e) {
        console.warn('History replaceState is blocked or restricted in this container/iframe:', e);
      }
      setCurrentPath('/');
      setTimeout(() => {
        const blogEl = document.getElementById('blog');
        blogEl?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [currentPath]);

  // Active Modals
  const [isDeviceGuideOpen, setIsDeviceGuideOpen] = useState(false);
  const [isSpeedTestOpen, setIsSpeedTestOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isDomainAdvisorOpen, setIsDomainAdvisorOpen] = useState(false);
  const [isNamecheapDeployOpen, setIsNamecheapDeployOpen] = useState(false);
  const [isTrafficBoosterOpen, setIsTrafficBoosterOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Selected Plan for Checkout
  const [selectedPlan, setSelectedPlan] = useState<PlanPricing>(SUBSCRIPTION_PLANS[4]); // 12 Months
  const [selectedConnections, setSelectedConnections] = useState(1);
  const [includeAdult, setIncludeAdult] = useState(false);

  const handleSelectPlan = useCallback((planId: string) => {
    if (planId === 'trial-24h') {
      setIsFreeTrialOpen(true);
      return;
    }
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId) || SUBSCRIPTION_PLANS[0];
    setSelectedPlan(plan);
    setSelectedConnections(1);
    setIncludeAdult(false);
    setIsCheckoutOpen(true);
  }, []);

  const handleSelectPlanAndConnections = useCallback((
    plan: PlanPricing,
    connections: number,
    adult: boolean
  ) => {
    if (plan.id === 'trial-24h' || plan.durationMonths === 0) {
      setIsFreeTrialOpen(true);
      return;
    }
    setSelectedPlan(plan);
    setSelectedConnections(connections);
    setIncludeAdult(adult);
    setIsCheckoutOpen(true);
  }, []);

  // Match blog posts
  const blogMatch = currentPath.match(/^\/blog\/([^/]+)$/);
  const currentBlogSlug = blogMatch ? blogMatch[1] : null;
  const currentBlogPost = currentBlogSlug ? BLOG_POSTS.find(p => p.slug === currentBlogSlug) : null;

  // Real-time Live Sports Fixtures State (Updated Daily & Live Scores)
  const [liveFixtures, setLiveFixtures] = useState<SportsFixture[]>(() => generateDynamicLiveFixtures());
  const [loadingFixtures, setLoadingFixtures] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const loadRealFixtures = async (force: boolean = false) => {
      try {
        const fresh = await fetchLiveSportsFixtures(force);
        if (isMounted && fresh && fresh.length > 0) {
          setLiveFixtures(fresh);
        }
      } catch (err) {
        console.warn('Could not load real sports fixtures:', err);
      }
    };

    // Load initial real fixtures from cache or network
    loadRealFixtures(false);

    // Precise daily midnight updater for sports fixture slider (Europe/London 00:00:02)
    const cleanupMidnight = setupMidnightScheduler(() => {
      console.log('[StreamUK] Daily midnight reached: rolling over sports fixtures slider for new matchday');
      loadRealFixtures(true);
    });

    // Auto sync periodically and poll for live scores every 5 minutes during matchday
    const interval = setInterval(() => {
      loadRealFixtures(true);
    }, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      cleanupMidnight();
      clearInterval(interval);
    };
  }, []);

  const handleRefreshFixtures = async () => {
    setLoadingFixtures(true);
    try {
      const fresh = await fetchLiveSportsFixtures(true);
      if (fresh && fresh.length > 0) {
        setLiveFixtures(fresh);
      }
    } catch (err) {
      console.warn('Manual sync failed:', err);
    } finally {
      setLoadingFixtures(false);
    }
  };

  // Match setup guide pages (/setup, /setup/:slug, /setup-guide, /guides)
  const setupMatch = currentPath.match(/^\/(?:setup|setup-guide|setup-guides|guides)(?:\/([^/]+))?$/);
  const isSetupRoute = !!setupMatch;
  const currentSetupSlug = setupMatch ? setupMatch[1] : undefined;

  // Match regional landing pages for UK, USA, Canada, and European markets
  const getMarketFromPath = (path: string): RegionalMarket | null => {
    const clean = path.toLowerCase().replace(/\/$/, '');
    if (clean === '/uk-iptv' || clean === '/uk') return 'uk';
    if (clean === '/usa-iptv' || clean === '/usa' || clean === '/us-iptv' || clean === '/us') return 'usa';
    if (clean === '/canada-iptv' || clean === '/canada' || clean === '/ca-iptv' || clean === '/ca') return 'canada';
    if (clean === '/ireland-iptv' || clean === '/ireland' || clean === '/ie-iptv' || clean === '/ie') return 'ireland';
    if (clean === '/germany-iptv' || clean === '/germany' || clean === '/de-iptv' || clean === '/de' || clean === '/deutschland-iptv') return 'germany';
    if (clean === '/france-iptv' || clean === '/france' || clean === '/fr-iptv' || clean === '/fr') return 'france';
    if (clean === '/spain-iptv' || clean === '/spain' || clean === '/es-iptv' || clean === '/es' || clean === '/espana-iptv') return 'spain';
    if (clean === '/italy-iptv' || clean === '/italy' || clean === '/it-iptv' || clean === '/it' || clean === '/italia-iptv') return 'italy';
    if (clean === '/netherlands-iptv' || clean === '/netherlands' || clean === '/nl-iptv' || clean === '/nl' || clean === '/nederland-iptv') return 'netherlands';
    if (clean === '/europe-iptv' || clean === '/europe' || clean === '/eu-iptv' || clean === '/eu') return 'europe';
    return null;
  };

  const detectedMarket = getMarketFromPath(currentPath);
  const isRegionalRoute = detectedMarket !== null;
  const currentMarket: RegionalMarket = detectedMarket || 'uk';

  return (
    <LanguageProvider>
      <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#060814] text-slate-100 selection:bg-indigo-500 selection:text-white font-sans pb-24 xl:pb-0">
        
        {/* Main Navigation */}
        <Navbar
          themeConfig={themeConfig}
          setThemeConfig={setThemeConfig}
          onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
          onOpenDeviceGuide={() => navigateTo('/setup')}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onSelectPlan={handleSelectPlan}
          navigateTo={navigateTo}
          currentPath={currentPath}
          currency={themeConfig.currency}
          onCurrencyChange={handleCurrencyChange}
        />

        {currentBlogPost ? (
          <BlogPostPage
            post={currentBlogPost}
            onSelectPlan={handleSelectPlan}
            navigateTo={navigateTo}
          />
        ) : isSetupRoute ? (
          <SetupGuidePage
            currentSlug={currentSetupSlug}
            onSelectPlan={handleSelectPlan}
            navigateTo={navigateTo}
            whatsappNumber={themeConfig.whatsappNumber}
          />
        ) : isRegionalRoute ? (
          <RegionalLandingPage
            market={currentMarket}
            onSelectPlan={handleSelectPlan}
            navigateTo={navigateTo}
            whatsappNumber={themeConfig.whatsappNumber}
            setThemeCurrency={handleCurrencyChange}
          />
        ) : (
          <>
            {/* Top Sports Ticker */}
            <SportsTicker fixtures={liveFixtures} loading={loadingFixtures} />

            {/* Hero Section */}
            <HeroSection
              onSelectPlan={handleSelectPlan}
              onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
              fixtures={liveFixtures}
              loadingFixtures={loadingFixtures}
            />

            {/* Live Sports Fixtures & Matchday Schedule (Premier League, Champions League, UFC, F1) */}
            <LiveFixturesSchedule 
              fixtures={liveFixtures} 
              loadingFixtures={loadingFixtures}
              onRefresh={handleRefreshFixtures}
            />

            {/* Subscription Pricing Calculator */}
            <PricingCalculator
              currency={themeConfig.currency}
              onSelectPlanAndConnections={handleSelectPlanAndConnections}
            />

            {/* Channel Matrix Explorer & Live Matchday Finder */}
            <ChannelExplorer onSelectPlan={handleSelectPlan} />

            {/* VOD & 2026 Cinema Boxsets Showcase */}
            <VodShowcase onSelectPlan={handleSelectPlan} />

            {/* UK Bento Features Grid */}
            <FeaturesGrid />

            {/* Interactive Device Setup Guides & FireStick Downloader Codes Hub */}
            <InteractiveDeviceHub 
              onSelectPlan={handleSelectPlan}
              whatsappNumber={themeConfig.whatsappNumber}
            />

            {/* SEO, Keyword & Hashtag Hub for UK, US & Canada (Hidden for public visitors) */}
            <div className="hidden" id="admin-seo-tool">
              <SeoHashtagCloud />
            </div>

            {/* Editorial Blog, News, Channel Additions & IPTV Guides */}
            <BlogSection 
              onSelectPlan={handleSelectPlan} 
              navigateTo={navigateTo}
            />

            {/* Customer Trust & Reviews */}
            <Testimonials />

            {/* Frequently Asked Questions */}
            <FaqSection themeConfig={themeConfig} />

            {/* Viral Referral & Social Sharing Bar */}
            <ShareReferralBar />
          </>
        )}

        {/* Footer */}
        <Footer
          themeConfig={themeConfig}
          onOpenDeviceGuide={() => navigateTo('/setup')}
          onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
          onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
          onOpenDomainAdvisor={() => setIsDomainAdvisorOpen(true)}
          onOpenTrafficBooster={() => setIsTrafficBoosterOpen(true)}
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
          navigateTo={navigateTo}
        />

        {/* Namecheap Stellar Plus Deployment Guide & Package Modal */}
        <NamecheapDeployModal
          isOpen={isNamecheapDeployOpen}
          onClose={() => setIsNamecheapDeployOpen(false)}
        />

        {/* Traffic & Visitor Growth Playbook Modal */}
        <TrafficBoosterModal
          isOpen={isTrafficBoosterOpen}
          onClose={() => setIsTrafficBoosterOpen(false)}
        />

        {/* Domain Strategy & SEO Advisory Modal */}
        <DomainAdvisorModal
          isOpen={isDomainAdvisorOpen}
          onClose={() => setIsDomainAdvisorOpen(false)}
        />

        {/* Interactive Device Setup Modal */}
        <DeviceSetupModal
          isOpen={isDeviceGuideOpen}
          onClose={() => setIsDeviceGuideOpen(false)}
          navigateTo={navigateTo}
        />

        {/* Line Speed Test Modal */}
        <SpeedTestModal
          isOpen={isSpeedTestOpen}
          onClose={() => setIsSpeedTestOpen(false)}
        />

        {/* Dedicated 24h VIP Free Trial Request Modal (Discord & WhatsApp) */}
        <FreeTrialModal
          isOpen={isFreeTrialOpen}
          onClose={() => setIsFreeTrialOpen(false)}
          themeConfig={themeConfig}
        />

        {/* Instant Checkout & Activation Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          plan={selectedPlan}
          connections={selectedConnections}
          includeAdult={includeAdult}
          currency={themeConfig.currency}
          themeConfig={themeConfig}
        />

        {/* Theme Customizer Drawer */}
        <ThemeCustomizerDrawer
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          themeConfig={themeConfig}
          setThemeConfig={setThemeConfig}
        />

        {/* Real-Time Live Sales & Activation Notification Proof */}
        <LiveSalesNotification />

        {/* Non-Intrusive GDPR/CCPA Cookie & Localization Consent Banner */}
        <CookieConsentBanner
          isSettingsOpen={isCookieSettingsOpen}
          onCloseSettings={() => setIsCookieSettingsOpen(false)}
          onOpenSettings={() => setIsCookieSettingsOpen(true)}
        />

        {/* Live Instant WhatsApp & Telegram Support Widget */}
        <LiveSupportWidget
          themeConfig={themeConfig}
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
          isOpen={isSupportOpen}
          onToggle={() => setIsSupportOpen(!isSupportOpen)}
          onClose={() => setIsSupportOpen(false)}
        />

        {/* Sticky Thumb-Friendly Mobile Navigation Bar */}
        <MobileBottomNav
          themeConfig={themeConfig}
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
          onOpenSupport={() => setIsSupportOpen(!isSupportOpen)}
          isSupportOpen={isSupportOpen}
          navigateTo={navigateTo}
        />

      </div>
    </LanguageProvider>
  );
}
