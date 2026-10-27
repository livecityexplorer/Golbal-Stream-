import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, Zap, Tv, CheckCircle2, ArrowRight, Sparkles, 
  HelpCircle, Wifi, Globe, Smartphone, Download, AlertTriangle, 
  Play, Star, Check, Phone, MessageSquare, Server, Activity, 
  MapPin, DollarSign, ChevronRight, Users, Award, ShieldAlert
} from 'lucide-react';
import { Currency, PlanPricing, ThemeCustomization } from '../types';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import { RegionalMarket, RegionalContent, REGIONAL_CONFIG } from '../data/regionalData';

export type { RegionalMarket };

interface RegionalLandingPageProps {
  market: RegionalMarket;
  onSelectPlan: (planId: string) => void;
  navigateTo: (path: string) => void;
  whatsappNumber?: string;
  setThemeCurrency?: (currency: Currency) => void;
}

export const RegionalLandingPage: React.FC<RegionalLandingPageProps> = ({
  market,
  onSelectPlan,
  navigateTo,
  whatsappNumber = '+44 7731 454811',
  setThemeCurrency
}) => {
  const content = REGIONAL_CONFIG[market] || REGIONAL_CONFIG.uk;
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-12m');

  // Update document title, meta tags, OpenGraph, Canonical, and Schema.org dynamically for SEO
  useEffect(() => {
    // 1. Page Title & Meta Description
    document.title = content.metaTitle;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', content.metaDescription);

    // 2. Language attribute
    document.documentElement.lang = content.lang || 'en';

    // 3. Dynamic Canonical Link
    const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://globalstreamhub.net';
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = `${baseUrl}/${content.marketKey}-iptv`;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    const setMetaProperty = (property: string, val: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMetaProperty('og:title', content.metaTitle);
    setMetaProperty('og:description', content.metaDescription);
    setMetaProperty('og:url', canonicalUrl);
    setMetaProperty('og:locale', content.ogLocale || 'en_GB');

    // 5. Twitter Card Tags
    const setMetaName = (name: string, val: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMetaName('twitter:title', content.metaTitle);
    setMetaName('twitter:description', content.metaDescription);

    // 6. Inject Full Regional Structured Data Graph (Schema.org JSON-LD)
    const schemaScriptId = `schema-regional-${market}`;
    let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.id = schemaScriptId;
      document.head.appendChild(schemaScript);
    }

    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          "url": canonicalUrl,
          "name": content.metaTitle,
          "description": content.metaDescription,
          "inLanguage": content.lang || "en",
          "isPartOf": {
            "@type": "WebSite",
            "@id": `${baseUrl}/#website`,
            "name": "GlobalStreamHub VIP",
            "url": baseUrl
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumbs`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${baseUrl}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": `${content.countryName} IPTV Subscription 2026`,
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Product",
          "@id": `${canonicalUrl}#product`,
          "name": `${content.countryName} 4K IPTV Subscription 2026`,
          "description": content.metaDescription,
          "brand": {
            "@type": "Brand",
            "name": "GlobalStreamHub VIP"
          },
          "sku": `STREAMHUB-${content.marketKey.toUpperCase()}-2026`,
          "image": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&h=630&q=85",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.95",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "2840",
            "reviewCount": "2840"
          },
          "review": (content.reviews || []).map(r => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": r.name
            },
            "datePublished": r.date,
            "reviewBody": r.reviewText,
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": r.rating.toString(),
              "bestRating": "5",
              "worstRating": "1"
            }
          })),
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": content.currency,
            "lowPrice": "0.00",
            "highPrice": market === 'canada' ? "154.99" : market === 'usa' ? "114.99" : "89.99",
            "offerCount": "6",
            "availability": "https://schema.org/InStock",
            "url": canonicalUrl
          }
        },
        {
          "@type": "Service",
          "@id": `${canonicalUrl}#service`,
          "name": `${content.countryName} 4K IPTV Streaming Service`,
          "serviceType": "IPTV Television Streaming",
          "description": content.heroLead,
          "provider": {
            "@type": "Organization",
            "name": "GlobalStreamHub VIP",
            "url": baseUrl
          },
          "areaServed": {
            "@type": "Country",
            "name": content.countryName
          }
        },
        {
          "@type": "HowTo",
          "@id": `${canonicalUrl}#howto`,
          "name": content.ispBypass.title,
          "description": content.ispBypass.subtitle,
          "step": content.ispBypass.steps.map((s, idx) => ({
            "@type": "HowToStep",
            "position": idx + 1,
            "name": `Optimize ${s.provider} for IPTV`,
            "text": s.action
          }))
        },
        {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          "mainEntity": content.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        }
      ]
    });

    return () => {
      const existing = document.getElementById(schemaScriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [market]);

  // Align app currency to the regional market when the market or its currency changes
  useEffect(() => {
    if (setThemeCurrency && content?.currency) {
      setThemeCurrency(content.currency);
    }
  }, [content?.currency, setThemeCurrency]);

  const getPlanPriceFormatted = (plan: PlanPricing) => {
    if (plan.durationMonths === 0) return 'Free';
    if (content.currency === 'CAD') return `CA$${plan.priceCAD || (plan.priceUSD * 1.35).toFixed(2)}`;
    if (content.currency === 'USD') return `$${plan.priceUSD}`;
    if (content.currency === 'EUR') return `€${plan.priceEUR}`;
    return `£${plan.priceGBP}`;
  };

  const getMonthlyEquivalent = (plan: PlanPricing) => {
    if (plan.durationMonths === 0) return 'Free';
    let base = plan.priceGBP;
    if (content.currency === 'CAD') base = plan.priceCAD || plan.priceUSD * 1.35;
    if (content.currency === 'USD') base = plan.priceUSD;
    if (content.currency === 'EUR') base = plan.priceEUR;
    const monthly = (base / plan.durationMonths).toFixed(2);
    return `${content.currencySymbol}${monthly}/mo`;
  };

  const allMarkets: { key: RegionalMarket; label: string; flag: string; path: string }[] = [
    { key: 'uk', label: 'UK', flag: '🇬🇧', path: '/uk-iptv' },
    { key: 'usa', label: 'USA', flag: '🇺🇸', path: '/usa-iptv' },
    { key: 'canada', label: 'Canada', flag: '🇨🇦', path: '/canada-iptv' },
    { key: 'ireland', label: 'Ireland', flag: '🇮🇪', path: '/ireland-iptv' },
    { key: 'germany', label: 'Germany', flag: '🇩🇪', path: '/germany-iptv' },
    { key: 'france', label: 'France', flag: '🇫🇷', path: '/france-iptv' },
    { key: 'spain', label: 'Spain', flag: '🇪🇸', path: '/spain-iptv' },
    { key: 'italy', label: 'Italy', flag: '🇮🇹', path: '/italy-iptv' },
    { key: 'netherlands', label: 'Netherlands', flag: '🇳🇱', path: '/netherlands-iptv' },
    { key: 'europe', label: 'All Europe', flag: '🇪🇺', path: '/europe-iptv' },
  ];

  return (
    <div className="w-full bg-[#060814] text-slate-100 min-h-screen pb-20">
      
      {/* Country Switcher Bar */}
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-[61px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <Globe className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">Country / Market:</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto py-0.5">
            {allMarkets.map((m) => {
              const isActive = market === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => navigateTo(m.path)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/25 scale-[1.02]' 
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{m.flag}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEO Breadcrumbs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <button 
            onClick={() => navigateTo('/')}
            className="hover:text-sky-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-sky-400 font-semibold flex items-center gap-1.5">
            <span>{content.flag}</span>
            <span>{content.countryName} IPTV Subscription 2026</span>
          </span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-sky-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-black uppercase tracking-wider shadow-lg shadow-sky-500/10">
            <span className="text-base">{content.flag}</span>
            <span>{content.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            {content.h1Title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
              {content.h1Highlight}
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            {content.heroLead}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onSelectPlan('trial-24h')}
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>Get Free 24h Trial ({content.currencySymbol}0.00)</span>
            </button>

            <a
              href="#pricing"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-white/15 transition-all flex items-center gap-2"
            >
              <span>View {content.countryName} Plans</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </a>

            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 font-bold text-sm border border-emerald-500/30 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Setup</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">10s Instant Setup</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">Anti-Freeze v9.8</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">True 4K UHD 60FPS</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">Zero Card For Trial</span>
            </div>
          </div>

        </div>
      </section>

      {/* Live Server Edge & CDN Status Card */}
      {content.serverNode && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-slate-900/60 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Server className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live Edge Connected</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs font-mono text-slate-300">{content.countryName} CDN Mesh</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {content.serverNode.city}: <span className="text-sky-400 font-medium text-sm sm:text-base">{content.serverNode.facility}</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <div className="text-center md:text-left">
                <div className="text-[11px] font-medium text-slate-400 mb-0.5">Average Ping</div>
                <div className="text-base sm:text-lg font-mono font-black text-emerald-400">
                  {content.serverNode.pingMs} ms
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-[11px] font-medium text-slate-400 mb-0.5">Bandwidth</div>
                <div className="text-base sm:text-lg font-mono font-black text-sky-400">
                  {content.serverNode.bandwidthGbps} Gbps
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-[11px] font-medium text-slate-400 mb-0.5">Packet Loss</div>
                <div className="text-base sm:text-lg font-mono font-black text-white">
                  0.00%
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Major Cities Covered (Essential for Local Search Rankings) */}
      {content.majorCities && content.majorCities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Optimized CDN Edge Delivery Across {content.countryName} Metropolitan Areas:</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">100% Zero Buffer Coverage</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.majorCities.map((city, cIdx) => (
                <span 
                  key={cIdx} 
                  className="px-3 py-1 rounded-lg bg-slate-950/80 text-slate-300 border border-white/10 text-xs font-medium hover:border-sky-500/40 hover:text-sky-300 transition-colors"
                >
                  📍 {city}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cable Monopoly vs StreamUK VIP Savings Card */}
      {content.cableSavings && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" />
                  <span>Cost Comparison in {content.countryName}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Save {content.cableSavings.savingsPercentage} Compared to Traditional Cable
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Traditional pay-TV providers like {content.cableSavings.cableProvider} lock you into expensive contracts with rental fees and blackout restrictions. StreamUK delivers more sports and cinema channels at a fraction of the cost.
                </p>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center min-w-[130px]">
                  <div className="text-[11px] font-bold text-red-400 mb-1">Traditional Cable</div>
                  <div className="text-xl sm:text-2xl font-black text-red-300 line-through">
                    {content.cableSavings.cableAnnualCost}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Contracts &amp; Fees</div>
                </div>

                <div className="text-xl font-bold text-slate-500">VS</div>

                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center min-w-[140px] shadow-lg shadow-emerald-500/10">
                  <div className="text-[11px] font-bold text-emerald-400 mb-1">StreamUK VIP</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300">
                    {content.cableSavings.streamUkAnnualCost}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-1">Save {content.cableSavings.savingsPercentage} / Year</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Downloader Shortcodes Table (Targeting high-volume FireStick searches) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-slate-900/70 border border-sky-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
                <Download className="w-4 h-4" />
                <span>FireStick & Android TV Downloader Shortcodes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Official {content.countryName} Downloader Codes (2026)
              </h2>
            </div>
            <div className="shrink-0">
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                100% Tested &amp; Verified
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold">
                  <th className="py-3 px-3">Player Application</th>
                  <th className="py-3 px-3">Downloader Code</th>
                  <th className="py-3 px-3">Compatibility</th>
                  <th className="py-3 px-3">Primary Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="bg-sky-500/10">
                  <td className="py-3.5 px-3 font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>StreamUK VIP 4K Custom Player</span>
                  </td>
                  <td className="py-3.5 px-3 font-black text-sky-400 text-base font-mono">842013</td>
                  <td className="py-3.5 px-3 text-slate-300">FireStick 4K / Max / Cube, Android TV</td>
                  <td className="py-3.5 px-3 text-emerald-400 font-medium">Integrated 4K EPG &amp; Anti-Freeze v9.8</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-slate-200">TiviMate IPTV Player Premium</td>
                  <td className="py-3.5 px-3 font-bold text-sky-400 font-mono">289018 / 272483</td>
                  <td className="py-3.5 px-3 text-slate-400">Fire TV, Google TV, NVIDIA Shield</td>
                  <td className="py-3.5 px-3 text-slate-300">Multi-view up to 9 screens, custom recording</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-slate-200">IPTV Smarters Pro</td>
                  <td className="py-3.5 px-3 font-bold text-sky-400 font-mono">914207 / 80198</td>
                  <td className="py-3.5 px-3 text-slate-400">FireStick, Android TV, Mobile, Smart TV</td>
                  <td className="py-3.5 px-3 text-slate-300">Xtream Codes API login, master search</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-semibold text-slate-200">iMPlayer TV IPTV</td>
                  <td className="py-3.5 px-3 font-bold text-sky-400 font-mono">82375</td>
                  <td className="py-3.5 px-3 text-slate-400">FireStick, Apple TV 4K, Android TV</td>
                  <td className="py-3.5 px-3 text-slate-300">Quad-view live sports &amp; cloud sync</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Regional Sports Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <Tv className="w-4 h-4" />
            <span>Dedicated Sports Feeds for {content.countryName}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Unrestricted Live 4K Sports Broadcasting
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every major sporting event captured with high-bitrate audio and zero regional blackout restrictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.sportsHighlights.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-sky-500/40 transition-all shadow-lg"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-mono font-bold">
                  {item.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">60 FPS HDR</span>
              </div>
              <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                {item.channels.map((ch, cidx) => (
                  <span key={cidx} className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-white/10 text-xs font-medium">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regional ISP Anti-Throttling Bypass Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-slate-900 via-[#0a0f26] to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>{content.countryName} ISP Speed Optimization</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {content.ispBypass.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {content.ispBypass.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.ispBypass.steps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">{step.provider}</span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {step.filterName}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Local Customer Reviews (Crucial for Trust & Social Proof) */}
      {content.reviews && content.reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Verified Customer Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              What Customers in {content.countryName} Are Saying
            </h2>
            <p className="text-slate-400 text-sm">
              Rated 4.95 / 5.0 across 2,840+ verified subscribers in {content.countryName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.reviews.map((rev, rIdx) => (
              <div 
                key={rIdx}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Verified User
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed mb-4 italic">
                    "{rev.reviewText}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{rev.name}</span>
                    <span className="text-slate-400">📍 {rev.location}</span>
                  </div>
                  <span className="text-[10px] text-sky-400 font-mono">
                    {rev.verifiedPlan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pricing Section tailored to Country */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Instant Automated Delivery in {content.currency}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {content.countryName} Subscription Plans
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            All passes include full access to 18,500+ live channels, 65,000+ VOD movies, and 24/7 VIP support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 24-Hour Free Trial */}
          <div className="bg-slate-900/70 border border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase">
              100% Free
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">24-Hour VIP Trial</h3>
              <p className="text-xs text-slate-400 mb-4">Complete test before purchasing</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-emerald-400">{content.currencySymbol}0.00</span>
                <span className="text-xs text-slate-400 ml-2">/ 24 Hours</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full access to all 18,500+ channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All 4K Sports &amp; 65,000+ VOD movies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No credit card required</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('trial-24h')}
              className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition-all cursor-pointer"
            >
              Get Free Trial
            </button>
          </div>

          {/* 12 Months Season Pass (Best Value) */}
          <div className="bg-gradient-to-b from-sky-950/60 to-slate-900/90 border-2 border-sky-400 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-lg whitespace-nowrap">
              Most Popular in {content.countryName}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">12 Months Season Pass</h3>
              <p className="text-xs text-sky-200 mb-4">Unrestricted 4K streaming all year</p>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{getPlanPriceFormatted(SUBSCRIPTION_PLANS[4])}</span>
                  <span className="text-xs text-slate-400 line-through">{content.currencySymbol}120.00</span>
                </div>
                <span className="text-xs text-sky-400 font-mono font-bold">{getMonthlyEquivalent(SUBSCRIPTION_PLANS[4])}</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Dedicated 10Gbps Tier-1 VIP Server Line</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Every Sky Sports, TNT, TSN &amp; Peacock 4K</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>All Live PPV Boxing &amp; UFC Super-Fights</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Free automated daily matchday EPG sync</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('plan-12m')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 text-slate-950 font-black text-sm transition-all hover:opacity-95 cursor-pointer shadow-lg shadow-sky-500/25"
            >
              Order 12 Months Pass
            </button>
          </div>

          {/* 3 Months Matchday Pass */}
          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">3 Months Pass</h3>
              <p className="text-xs text-slate-400 mb-4">Quarterly Matchday Access</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">{getPlanPriceFormatted(SUBSCRIPTION_PLANS[2])}</span>
                <span className="text-xs text-slate-400 ml-2">/ 3 Months</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>All 18,500+ channels &amp; 65k VOD</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Anti-Freeze v9.8 low latency</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Instant 10-second credential delivery</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('plan-3m')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all cursor-pointer"
            >
              Order 3 Months Pass
            </button>
          </div>
        </div>
      </section>

      {/* Regional FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Common Questions in {content.countryName}
          </h2>
        </div>

        <div className="space-y-4">
          {content.faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-white">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
