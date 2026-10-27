import React, { useState } from 'react';
import { DetailedSetupGuide } from '../../types';
import { ALL_SETUP_GUIDES, DEVICE_CATEGORIES } from '../../data/setupGuidesData';
import { ShareReferralBar } from '../ShareReferralBar';
import { 
  Tv, 
  Flame, 
  Smartphone, 
  Laptop, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Check, 
  Copy, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  MessageSquare, 
  Share2, 
  ChevronDown,
  ArrowLeft,
  Download,
  AlertTriangle,
  Sliders,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';

interface DedicatedGuideViewProps {
  guide: DetailedSetupGuide;
  onSelectPlan: (planId: string) => void;
  navigateTo: (path: string) => void;
  whatsappNumber?: string;
}

export const DedicatedGuideView: React.FC<DedicatedGuideViewProps> = ({
  guide,
  onSelectPlan,
  navigateTo,
  whatsappNumber = '+44 7731 454811',
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [shareToast, setShareToast] = useState(false);

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / guide.steps.length) * 100);

  const handleCopy = (text: string, key: string) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2500);
      }
    } catch (e) {
      console.warn('Clipboard write blocked:', e);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: guide.title,
      text: guide.summary,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        handleCopy(shareUrl, 'share-url');
        setShareToast(true);
        setTimeout(() => setShareToast(false), 3000);
      }
    } else {
      handleCopy(shareUrl, 'share-url');
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const markAllSteps = (val: boolean) => {
    const next: Record<number, boolean> = {};
    guide.steps.forEach(s => {
      next[s.stepNumber] = val;
    });
    setCompletedSteps(next);
  };

  // Sibling guides for the same device category
  const siblingGuides = ALL_SETUP_GUIDES.filter(
    g => g.deviceCategory === guide.deviceCategory && g.id !== guide.id
  );

  // Other popular guides across platforms
  const otherDeviceGuides = ALL_SETUP_GUIDES.filter(
    g => g.deviceCategory !== guide.deviceCategory && g.popular
  ).slice(0, 4);

  const getDeviceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Tv': return <Tv className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-blue-400" />;
      default: return <Tv className="w-5 h-5 text-cyan-400" />;
    }
  };

  const currentCategoryMeta = DEVICE_CATEGORIES.find(c => c.id === guide.deviceCategory);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5" />
          <span>Direct Guide URL copied to clipboard!</span>
        </div>
      )}

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
        <button
          onClick={() => navigateTo('/')}
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <button
          onClick={() => navigateTo('/setup')}
          className="hover:text-cyan-400 transition-colors font-medium cursor-pointer"
        >
          Setup Guides Hub
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <button
          onClick={() => {
            navigateTo('/setup');
          }}
          className="hover:text-cyan-400 transition-colors text-slate-300 font-medium cursor-pointer"
        >
          {guide.deviceCategoryLabel}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-cyan-300 font-bold truncate max-w-[200px] sm:max-w-none">
          {guide.playerName}
        </span>
      </nav>

      {/* Back to Hub Floating Header Pill */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('/setup')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-cyan-300 bg-slate-900/80 hover:bg-slate-900 px-4 py-2 rounded-xl border border-white/10 transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Browse All Device Guides</span>
        </button>

        {/* Share Button Pill */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 rounded-xl border border-cyan-500/30 transition-all cursor-pointer shadow-lg shadow-cyan-500/5"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Tutorial</span>
        </button>
      </div>

      {/* 2. DEDICATED HERO SECTION */}
      <header className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a0f26] to-slate-950 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Metadata Chips Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold relative z-10">
          <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider flex items-center gap-1.5">
            {getDeviceIcon(guide.icon)}
            <span>{guide.deviceCategoryLabel}</span>
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-950/80 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{guide.badge || 'Verified 2026 Tutorial'}</span>
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-950/80 text-slate-300 border border-white/10 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Setup Time: {guide.timeEstimate}</span>
          </span>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Freeze v9.8 Ready</span>
          </span>
        </div>

        {/* Main Title & App Branding Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-950/90 border border-cyan-500/40 p-3 flex items-center justify-center shadow-xl shadow-cyan-500/10 shrink-0 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
            {guide.appLogo ? (
              <img
                src={guide.appLogo}
                alt={guide.playerName}
                className="w-full h-full object-contain filter drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Tv className="w-10 h-10 text-cyan-400" />
            )}
          </div>

          <div className="space-y-3 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
              {guide.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
              {guide.summary}
            </p>
          </div>
        </div>

        {/* Key Quick Action Highlights (Downloader Code / Store Link + Plan CTA) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-white/10 relative z-10">
          
          {/* Downloader / App Code Card */}
          {guide.downloaderCode ? (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between gap-3 shadow-lg">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Downloader Code
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-cyan-300 tracking-wider">
                  {guide.downloaderCode}
                </span>
              </div>
              <button
                onClick={() => handleCopy(guide.downloaderCode!, 'hero-code')}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md shadow-cyan-500/20"
              >
                {copiedKey === 'hero-code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'hero-code' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-3 shadow-lg">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Installation Source
                </span>
                <span className="text-sm font-black text-white">
                  {guide.playerType}
                </span>
              </div>
              {guide.appUrl && (
                <a
                  href={guide.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Store Link</span>
                </a>
              )}
            </div>
          )}

          {/* Player Protocol Type */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-3 shadow-lg">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Connection Protocol
              </span>
              <span className="text-sm font-black text-indigo-300 uppercase">
                {guide.loginType === 'xtream_codes' ? 'Xtream Codes API' :
                 guide.loginType === 'mac_portal' ? 'MAC / Portal Middleware' :
                 guide.loginType === 'm3u_url' ? 'M3U Plus Playlist URL' : 'Instant Web Player'}
              </span>
            </div>
            <Zap className="w-6 h-6 text-amber-400" />
          </div>

          {/* Instant Activation Button - Free 24H Trial Priority */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-cyan-500/20 border-2 border-emerald-400/40 flex items-center justify-between gap-3 shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="space-y-0.5">
              <span className="text-[11px] font-black text-emerald-300 uppercase tracking-wider block">
                Zero-Risk 24H Pass
              </span>
              <span className="text-xs font-bold text-white">
                No Card Required • Instant
              </span>
            </div>
            <button
              onClick={() => onSelectPlan('trial-24h')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs transition-all shadow-md shadow-emerald-500/25 cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95"
            >
              Start Free 24H Trial
            </button>
          </div>
        </div>

        {/* 3. Interactive Checklist Progress Tracker */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Tutorial Progress: {completedCount} of {guide.steps.length} Steps Completed</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => markAllSteps(true)}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold cursor-pointer underline underline-offset-4"
              >
                Mark All Done
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => markAllSteps(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* 4. MAIN STEP-BY-STEP TUTORIAL STEPS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span>Step-by-Step Installation Walkthrough</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Tested & Working 2026
          </span>
        </div>

        <div className="space-y-4">
          {guide.steps.map((step) => {
            const isDone = !!completedSteps[step.stepNumber];
            return (
              <div
                key={step.stepNumber}
                id={`step-${step.stepNumber}`}
                className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 relative ${
                  isDone
                    ? 'bg-slate-950/60 border-emerald-500/30'
                    : 'bg-slate-900/90 border-white/10 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step Checkbox Button */}
                  <button
                    onClick={() => toggleStep(step.stepNumber)}
                    className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-950 border-white/10 text-cyan-400 hover:border-cyan-400'
                    }`}
                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isDone ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <span className="font-black text-sm">{step.stepNumber}</span>
                    )}
                  </button>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className={`text-base sm:text-lg font-black transition-colors ${
                        isDone ? 'text-slate-300 line-through' : 'text-white'
                      }`}>
                        {step.title}
                      </h3>
                      <span className="text-[11px] font-bold text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-950 border border-white/5">
                        Step {step.stepNumber} of {guide.steps.length}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Copyable shortcode / parameter */}
                    {step.codeOrValue && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-cyan-500/30 max-w-xl">
                        <span className="text-xs font-mono text-cyan-300 flex-1 truncate font-bold">
                          {step.codeOrValue}
                        </span>
                        <button
                          onClick={() => handleCopy(step.codeOrValue!, `step-code-${step.stepNumber}`)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                        >
                          {copiedKey === `step-code-${step.stepNumber}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === `step-code-${step.stepNumber}` ? 'Copied' : 'Copy Code'}</span>
                        </button>
                      </div>
                    )}

                    {/* Action Download / Store Link */}
                    {step.actionUrl && (
                      <div className="pt-1">
                        <a
                          href={step.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white bg-slate-950 px-3.5 py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-400 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Direct URL / App Portal</span>
                        </a>
                      </div>
                    )}

                    {/* Pro Tip Callout Box */}
                    {step.tip && (
                      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 font-bold block mb-0.5">StreamUK Pro Tip:</strong>
                          {step.tip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. STREAMUK SERVER CREDENTIALS VAULT */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>StreamUK 4K Connection Credentials Reference</span>
            </h3>
            <p className="text-xs text-slate-400">
              Copy and paste these standard server URLs into your {guide.playerName} setup.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Server URL */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold">Server URL (Xtream Codes)</span>
              <button
                onClick={() => handleCopy('http://uk-premium.streamdns.me:8080', 'server-url')}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                {copiedKey === 'server-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'server-url' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <code className="block font-mono text-sm text-cyan-300 bg-slate-900/80 p-2.5 rounded-xl border border-white/5 truncate">
              http://uk-premium.streamdns.me:8080
            </code>
          </div>

          {/* Stalker / MAG Portal URL */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold">MAG / Stalker Portal URL</span>
              <button
                onClick={() => handleCopy('http://uk-premium.streamdns.me:8080/c', 'portal-url')}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                {copiedKey === 'portal-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'portal-url' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <code className="block font-mono text-sm text-indigo-300 bg-slate-900/80 p-2.5 rounded-xl border border-white/5 truncate">
              http://uk-premium.streamdns.me:8080/c
            </code>
          </div>

          {/* Username & Password placeholder */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <span className="text-xs font-bold text-slate-400 block">Username & Password</span>
            <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span>Sent instantly via WhatsApp & Email upon activation</span>
              <span className="text-emerald-400 font-bold">24/7 Instant</span>
            </div>
          </div>

          {/* WebTV Direct Portal */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold">Instant Web Player URL</span>
              <a
                href="https://webtv.iptvsmarters.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Browser</span>
              </a>
            </div>
            <code className="block font-mono text-sm text-emerald-300 bg-slate-900/80 p-2.5 rounded-xl border border-white/5 truncate">
              https://webtv.iptvsmarters.com
            </code>
          </div>
        </div>
      </section>

      {/* 6. RECOMMENDED 4K 60FPS SETTINGS (If Available) */}
      {guide.recommendedSettings && guide.recommendedSettings.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 space-y-5">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span>Recommended 4K HDR & Anti-Freeze Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guide.recommendedSettings.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {item.setting}
                </span>
                <span className="text-sm font-black text-cyan-300 block">
                  {item.value}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. PROS & ADVANTAGES OF THIS PLAYER */}
      {guide.pros && guide.pros.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Why Choose {guide.playerName} for {guide.deviceCategoryLabel}?</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guide.pros.map((pro, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  {pro}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. DEVICE & PLAYER SPECIFIC FAQS */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 space-y-5">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Troubleshooting & Frequently Asked Questions</span>
          </h3>

          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-950 border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 9. OTHER PLAYERS FOR THIS DEVICE CATEGORY */}
      {siblingGuides.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Other Verified IPTV Players for {guide.deviceCategoryLabel}</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">
              {siblingGuides.length} Alternative {siblingGuides.length === 1 ? 'Guide' : 'Guides'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siblingGuides.map((altGuide) => (
              <article
                key={altGuide.id}
                onClick={() => {
                  navigateTo('/setup/' + altGuide.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 p-1 flex items-center justify-center shrink-0 group-hover:border-cyan-500/40 transition-colors">
                      {altGuide.appLogo ? (
                        <img
                          src={altGuide.appLogo}
                          alt={altGuide.playerName}
                          className="w-full h-full object-contain filter drop-shadow transition-transform group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Tv className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-white/5">
                      {altGuide.timeEstimate}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {altGuide.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {altGuide.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-cyan-400">
                  <span>View Dedicated Tutorial</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Referral & Social Sharing Bar */}
      <ShareReferralBar
        currentUrl={typeof window !== 'undefined' ? `${window.location.origin}/setup/${guide.slug}` : `https://globalstreamhub.net/setup/${guide.slug}`}
        title={`${guide.title} | GlobalStreamHub VIP Setup Guide`}
      />

      {/* 10. 24/7 WHATSAPP VIP SUPPORT CTA */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Need 1-on-1 Remote Setup Help?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Chat with our UK IPTV Technicians on WhatsApp
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Stuck setting up {guide.playerName} on your {guide.deviceCategoryLabel}? Our live support team will guide you through setup in real-time.
          </p>
        </div>

        <a
          href={`https://api.whatsapp.com/send?phone=${whatsappNumber.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(`Hi StreamUK support, I need help setting up ${guide.playerName} on my ${guide.deviceCategoryLabel}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all shadow-xl shadow-emerald-500/20 shrink-0 whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95"
        >
          <MessageSquare className="w-5 h-5 fill-slate-950" />
          <span>Chat on WhatsApp</span>
        </a>
      </section>

      {/* Floating 1-Click Free 24H Trial Bar for quick conversion */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/50 shadow-[0_10px_35px_rgba(16,185,129,0.3)] p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 backdrop-blur-xl animate-fade-in">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-black text-white truncate block">
              Free 24H {guide.playerName} Test Line
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 truncate block">
              Instant Xtream Codes • No credit card • 4K UHD
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelectPlan('trial-24h')}
          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          Claim 24H Pass
        </button>
      </div>

    </div>
  );
};
