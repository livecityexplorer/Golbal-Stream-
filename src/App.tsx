import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AiTrustBar } from './components/AiTrustBar';
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
import { ExitIntentModal } from './components/ExitIntentModal';
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
  // Theme & branding state - Clean Cinema Obsidian & Indigo Theme
  const [themeConfig, setThemeConfig] = useState<ThemeCustomization>(() => ({
    brandName: 'GlobalStreamHub 4K',
    brandTagline: 'Ultra HD Global Sports & Cinema Media Portal',
    accentColor: '#6366f1',
    accentColorName: 'purple',
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

  // Normalize current path by stripping multiple trailing slashes (e.g. /usabestiptv/ -> /usabestiptv)
  const normalizedPath = currentPath.toLowerCase().replace(/\/+$/, '') || '/';

  const navigateTo = useCallback((path: string) => {
    let target = path;
    if (target !== '/' && !target.endsWith('/') && !target.includes('#') && !target.includes('?')) {
      target = `${target}/`;
    }
    try {
      window.history.pushState({}, '', target);
    } catch (e) {
      console.warn('History pushState is blocked or restricted in this container/iframe:', e);
    }
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Map any legacy or non-canonical alias path directly to its canonical route
  useEffect(() => {
    const LEGACY_REDIRECT_MAP: Record<string, string> = {
      '/uk-best-iptv': '/ukbestiptv/',
      '/usa-best-iptv': '/usabestiptv/',
      '/europe-most-stable-iptv': '/europemoststableiptv/',
      '/arabic-best-iptv': '/arabicbestiptv/',
      '/middle-east-iptv': '/arabicbestiptv/',
      '/blog/champions-league-2026-predictions-knockout-draw-4k-uhd-stream-guide': '/blog/who-will-win-uefa-champions-league-2026-2027-predictions-streaming-guide/',
      '/blog/el-clasico-real-madrid-barcelona-tactics-prediction-4k-streaming-guide': '/blog/la-liga-el-clasico-2026-2027-title-race-real-madrid-barcelona-streaming-guide/',
      '/blog/serie-a-scudetto-race-inter-juventus-napoli-predictions-4k-streaming-guide': '/blog/serie-a-scudetto-race-inter-napoli-juventus-2026-2027-streaming-guide/',
      '/blog/der-klassiker-bayern-munich-borussia-dortmund-tactics-4k-streaming-guide': '/blog/bundesliga-title-race-bayern-leverkusen-dortmund-2026-2027-streaming-guide/',
      '/blog/premier-league-top-four-race-aston-villa-newcastle-chelsea-tottenham-predictions': '/blog/premier-league-top-four-race-amorim-man-united-alonso-chelsea-streaming-guide/',
    };

    const canonicalRedirectTarget = LEGACY_REDIRECT_MAP[normalizedPath];
    if (canonicalRedirectTarget) {
      try {
        window.history.replaceState({}, '', canonicalRedirectTarget);
        setCurrentPath(canonicalRedirectTarget);
      } catch (e) {
        console.warn('History replaceState restricted:', e);
      }
      return;
    }

    const DEDICATED_HUB_META: Record<string, { title: string; description: string; canonical: string }> = {
      '/blog': {
        title: 'IPTV Knowledge Base, Streaming Guides & Analysis • GlobalStreamHub VIP',
        description: 'Expert IPTV tutorials, device setup walkthroughs, live sports 4K streaming guides, and anti-buffering masterclasses from the GlobalStreamHub engineering team.',
        canonical: 'https://globalstreamhub.net/blog/'
      },
      '/news': {
        title: 'IPTV Knowledge Base, Streaming Guides & Analysis • GlobalStreamHub VIP',
        description: 'Expert IPTV tutorials, device setup walkthroughs, live sports 4K streaming guides, and anti-buffering masterclasses from the GlobalStreamHub engineering team.',
        canonical: 'https://globalstreamhub.net/blog/'
      },
      '/free-trial': {
        title: 'IPTV Free Trial: Instant 24-Hour VIP Test Pass (No Credit Card) • GlobalStreamHub',
        description: 'Claim your 100% free 24-hour VIP test pass with instant automated delivery in under 10 seconds. Full access to 18,500+ channels and 65,000+ VODs.',
        canonical: 'https://globalstreamhub.net/free-trial/'
      },
      '/pricing': {
        title: 'IPTV Pricing & Subscription Plans: 1, 3, 6 & 12 Month 4K Passes • GlobalStreamHub',
        description: 'Transparent pricing for high-performance 4K IPTV: £11.99/month or £59.99/year. 18,500+ channels, 65,000+ VODs, Anti-Freeze v9.8, instant activation.',
        canonical: 'https://globalstreamhub.net/pricing/'
      },
      '/channels': {
        title: '18,500+ Live Channels List: UK, USA, Canada, Sports & Global • GlobalStreamHub',
        description: 'Browse the complete 2026 channel catalog: Sky Sports 4K, TNT Sports, NBC Peacock, TSN, Sportsnet, international channels from 80+ countries.',
        canonical: 'https://globalstreamhub.net/channels/'
      },
      '/sports': {
        title: 'Live Sports Schedule & Fixtures: Premier League, Champions League, UFC & F1 in 4K',
        description: 'Real-time updated sports matchday schedule: kickoff times, broadcast channels, and 4K UHD streams for Premier League, UEFA Champions League, and UFC.',
        canonical: 'https://globalstreamhub.net/sports/'
      },
      '/speed-test': {
        title: 'IPTV Streaming Speed Test & Network Diagnostics Tool • GlobalStreamHub',
        description: 'Test your broadband download speed, jitter, and ping directly to our London, Frankfurt, and New York streaming CDN clusters for 4K streaming readiness.',
        canonical: 'https://globalstreamhub.net/speed-test/'
      },
      '/faq': {
        title: 'Frequently Asked Questions (FAQ) & Knowledge Base • GlobalStreamHub VIP',
        description: 'Find instant answers to common questions about IPTV setup, ISP block bypassing, payment options, device compatibility, and subscription management.',
        canonical: 'https://globalstreamhub.net/faq/'
      }
    };

    const hubMeta = DEDICATED_HUB_META[normalizedPath];
    if (hubMeta) {
      document.title = hubMeta.title;
      const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (metaDesc) metaDesc.content = hubMeta.description;
      const canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (canonicalTag) canonicalTag.href = hubMeta.canonical;
      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
      if (ogTitle) ogTitle.content = hubMeta.title;
      const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
      if (ogDesc) ogDesc.content = hubMeta.description;
      const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
      if (ogUrl) ogUrl.content = hubMeta.canonical;
    } else if (normalizedPath === '/') {
      document.title = 'Best 4K IPTV Subscription: UK, USA, Canada & Europe • GlobalStreamHub';
      const canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (canonicalTag) canonicalTag.href = 'https://globalstreamhub.net/';
      const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
      if (ogUrl) ogUrl.content = 'https://globalstreamhub.net/';
    }
  }, [normalizedPath]);

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

  // Match blog posts or direct /ukbestiptv / /usabestiptv / /europemoststableiptv / /arabicbestiptv landing route
  const isDirectUkBestIptv = normalizedPath === '/ukbestiptv';
  const isDirectUsaBestIptv = normalizedPath === '/usabestiptv';
  const isDirectEuropeMostStableIptv = normalizedPath === '/europemoststableiptv' || normalizedPath === '/europe-most-stable-iptv';
  const isDirectArabicBestIptv = normalizedPath === '/arabicbestiptv' || normalizedPath === '/arabic-best-iptv' || normalizedPath === '/middle-east-iptv';
  const blogMatch = normalizedPath.match(/^\/blog\/([^/]+)$/);
  
  // Crawler legacy alias map
  const SLUG_ALIASES: Record<string, string> = {
    'champions-league-2026-predictions-knockout-draw-4k-uhd-stream-guide': 'who-will-win-uefa-champions-league-2026-2027-predictions-streaming-guide',
    'el-clasico-real-madrid-barcelona-tactics-prediction-4k-streaming-guide': 'la-liga-el-clasico-2026-2027-title-race-real-madrid-barcelona-streaming-guide',
    'serie-a-scudetto-race-inter-juventus-napoli-predictions-4k-streaming-guide': 'serie-a-scudetto-race-inter-napoli-juventus-2026-2027-streaming-guide',
    'der-klassiker-bayern-munich-borussia-dortmund-tactics-4k-streaming-guide': 'bundesliga-title-race-bayern-leverkusen-dortmund-2026-2027-streaming-guide',
    'premier-league-top-four-race-aston-villa-newcastle-chelsea-tottenham-predictions': 'premier-league-top-four-race-amorim-man-united-alonso-chelsea-streaming-guide',
  };

  const BLOG_COMPANION_VARIANTS: Record<string, string> = {
    'ukbestiptv': 'blog-ukbestiptv-benchmark',
    'usabestiptv': 'blog-usabestiptv-benchmark',
    'europemoststableiptv': 'blog-europemoststableiptv-benchmark',
    'arabicbestiptv': 'blog-arabicbestiptv-benchmark',
  };

  const rawBlogSlug = isDirectUkBestIptv 
    ? 'ukbestiptv' 
    : (isDirectUsaBestIptv 
        ? 'usabestiptv' 
        : (isDirectEuropeMostStableIptv 
            ? 'europemoststableiptv' 
            : (isDirectArabicBestIptv
                ? 'arabicbestiptv'
                : (blogMatch ? (BLOG_COMPANION_VARIANTS[blogMatch[1]] || blogMatch[1]) : null))));

  const currentBlogSlug = rawBlogSlug ? (SLUG_ALIASES[rawBlogSlug] || rawBlogSlug) : null;
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
  const setupMatch = normalizedPath.match(/^\/(?:setup|setup-guide|setup-guides|guides)(?:\/([^/]+))?$/);
  const isSetupRoute = !!setupMatch;
  const currentSetupSlug = setupMatch ? setupMatch[1] : undefined;

  // Match regional landing pages for UK, USA, Canada, and European markets
  const getMarketFromPath = (path: string): RegionalMarket | null => {
    const clean = path.toLowerCase().replace(/\/+$/, '') || '/';
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
      <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#0b0d14] text-slate-100 selection:bg-indigo-500 selection:text-white font-sans pb-24 xl:pb-0">
        
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
            themeConfig={themeConfig}
            setThemeConfig={setThemeConfig}
          />
        ) : isRegionalRoute ? (
          <RegionalLandingPage
            market={currentMarket}
            onSelectPlan={handleSelectPlan}
            navigateTo={navigateTo}
            whatsappNumber={themeConfig.whatsappNumber}
            setThemeCurrency={handleCurrencyChange}
          />
        ) : normalizedPath === '/blog' || normalizedPath === '/news' ? (
          <div className="pt-20">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 text-center space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                2026/27 Streaming Knowledge Base
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                IPTV Guides, Football Analysis &amp; 4K Streaming Tutorials
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Browse expert tactical match previews, official CBR TV (Downloader: 2130837) tutorials, and ISP anti-throttling guides.
              </p>
            </section>
            <BlogSection onSelectPlan={handleSelectPlan} navigateTo={navigateTo} />
            <ShareReferralBar currentUrl="https://globalstreamhub.net/blog/" title="GlobalStreamHub IPTV Blog & Streaming Guides" />
          </div>
        ) : normalizedPath === '/free-trial' ? (
          <div className="pt-20">
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                100% Free • No Credit Card Required
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Instant 24-Hour 4K IPTV Free Trial Pass
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Test all 18,500+ live channels, Sky Sports 4K, TNT Sports Ultimate, NFL RedZone, and 65,000+ VODs on your FireStick (CBR TV Code: 2130837) or Smart TV in 10 seconds.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsFreeTrialOpen(true)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-500/25 cursor-pointer"
                >
                  Activate Free 24-Hour Trial Now
                </button>
              </div>
            </section>
            <PricingCalculator currency={themeConfig.currency} onSelectPlanAndConnections={handleSelectPlanAndConnections} />
            <FaqSection themeConfig={themeConfig} />
            <ShareReferralBar currentUrl="https://globalstreamhub.net/free-trial/" title="Claim Your Instant 24-Hour 4K IPTV Free Trial" />
          </div>
        ) : normalizedPath === '/pricing' ? (
          <div className="pt-20">
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 text-center space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                Transparent Multi-Device Plans
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                4K IPTV Subscription Plans &amp; Multi-Room Pricing
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Choose 1, 3, 6, or 12-month passes with up to 5 simultaneous connections, Anti-Freeze v9.8 routing, and 24/7 WhatsApp &amp; Telegram support.
              </p>
            </section>
            <PricingCalculator currency={themeConfig.currency} onSelectPlanAndConnections={handleSelectPlanAndConnections} />
            <Testimonials />
            <FaqSection themeConfig={themeConfig} />
            <ShareReferralBar currentUrl="https://globalstreamhub.net/pricing/" title="GlobalStreamHub 4K IPTV Pricing & Plans" />
          </div>
        ) : normalizedPath === '/channels' ? (
          <div className="pt-20">
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 text-center space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                18,500+ Live Channels &amp; 65,000+ VODs
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Global 4K Live TV Channel Matrix &amp; Cinema Library
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Search Sky Sports UHD, TNT Sports Ultimate, NBC Peacock, TSN 1-5, beIN Sports 4K, and regional bouquets across 80+ countries.
              </p>
            </section>
            <ChannelExplorer onSelectPlan={handleSelectPlan} />
            <VodShowcase onSelectPlan={handleSelectPlan} />
            <ShareReferralBar currentUrl="https://globalstreamhub.net/channels/" title="18,500+ Live 4K Channels Directory" />
          </div>
        ) : normalizedPath === '/sports' ? (
          <div className="pt-20">
            <SportsTicker fixtures={liveFixtures} loading={loadingFixtures} />
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2 text-center space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
                Daily Updated Matchday Schedule
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Live Sports Fixtures &amp; 4K Broadcast Channels
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Real-time kickoff times and 4K UHD channels for Premier League 3pm fixtures, UEFA Champions League, NFL RedZone, NBA, UFC, and Formula 1.
              </p>
            </section>
            <LiveFixturesSchedule fixtures={liveFixtures} loadingFixtures={loadingFixtures} onRefresh={handleRefreshFixtures} />
            <ShareReferralBar currentUrl="https://globalstreamhub.net/sports/" title="Live 4K Sports Matchday Schedule" />
          </div>
        ) : normalizedPath === '/speed-test' ? (
          <div className="pt-20">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                10Gbps CDN Network Diagnostics
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                4K IPTV Streaming Speed &amp; Ping Test
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Benchmark your connection latency and throughput against our London Docklands, Frankfurt, and New York Equinix edge streaming clusters.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSpeedTestOpen(true)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-xl shadow-cyan-500/25 cursor-pointer"
                >
                  Launch CDN Speed Diagnostic
                </button>
              </div>
            </section>
            <FeaturesGrid />
            <ShareReferralBar currentUrl="https://globalstreamhub.net/speed-test/" title="GlobalStreamHub 4K IPTV Speed Test" />
          </div>
        ) : normalizedPath === '/faq' ? (
          <div className="pt-20">
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2 text-center space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                24/7 Support Knowledge Base
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Frequently Asked Questions (IPTV Setup, ISP &amp; Billing)
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Answers to device setup (Downloader code 2130837), bypassing ISP throttling, multi-room connections, and instant trial activation.
              </p>
            </section>
            <FaqSection themeConfig={themeConfig} />
            <ShareReferralBar currentUrl="https://globalstreamhub.net/faq/" title="GlobalStreamHub FAQ & Support Knowledge Base" />
          </div>
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

            {/* AI Search Engine Grounding & Verification Trust Bar (Preserved for AI Crawlers & Functionality, Hidden from Public UI) */}
            <div className="hidden" aria-hidden="true" id="ai-grounding-metadata">
              <AiTrustBar onSelectPlan={handleSelectPlan} />
            </div>

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

        {/* Exit-Intent Free Trial Trigger Modal for Departing Visitors */}
        <ExitIntentModal
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
          themeConfig={themeConfig}
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
