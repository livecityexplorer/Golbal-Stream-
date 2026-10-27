import React, { useState } from 'react';
import { 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  Copy, 
  Check, 
  X, 
  ExternalLink,
  Layers,
  Zap,
  Award
} from 'lucide-react';

interface DomainAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DomainRecommendation {
  domain: string;
  tld: string;
  targetMarket: string;
  type: 'Global Brand' | 'UK Specific (.co.uk)' | 'US Specific' | 'Hybrid Multi-Domain' | string;
  seoPower: number; // out of 100
  pros: string[];
  verdict: string;
  suggestedAction: string;
}

const DOMAIN_RECOMMENDATIONS: DomainRecommendation[] = [
  {
    domain: 'globalstreamhub.net',
    tld: '.net',
    targetMarket: 'Global (UK, USA, Canada, Worldwide)',
    type: 'Global Brand (Recommended)',
    seoPower: 99,
    pros: [
      'Universal authority: Ideal for Namecheap EasyWP with clean international indexing across Google UK, Google US, Canada & Europe',
      '.net carries established networking & broadcast infrastructure trust',
      'Neutral, versatile branding covering UK Premier League, Sky Sports, US NFL, and Canada hockey seamlessly'
    ],
    verdict: '🏆 #1 Top Recommended Choice for EasyWP! Premium brand name with zero geo-penalties and maximum SEO versatility.',
    suggestedAction: 'Primary Master Domain'
  },
  {
    domain: 'visionmediaservice.org',
    tld: '.org',
    targetMarket: 'Global Media & VOD',
    type: 'High-Trust Authority',
    seoPower: 94,
    pros: [
      '.org delivers exceptionally high organic trust and search engine credibility',
      'Perfect as an authoritative media portal or secondary mirror for customer activation',
      'Ideal for corporate and long-term search ranking stability'
    ],
    verdict: 'Excellent secondary authority domain or dedicated portal brand.',
    suggestedAction: 'Secondary Domain or Dedicated Portal'
  },
  {
    domain: 'ethernetmedia.site',
    tld: '.site',
    targetMarket: 'Low-Latency Tech & Sports',
    type: 'High-Speed Tech Brand',
    seoPower: 90,
    pros: [
      'Strong association with wired Gigabit, low-latency, and anti-buffering CDN streaming',
      'Great companion domain for device setup tutorials and fast app download links'
    ],
    verdict: 'Great technical / player setup companion domain.',
    suggestedAction: 'Player & Setup Sub-brand'
  },
  {
    domain: 'stream4k.live / premierstream.tv',
    tld: '.live / .tv',
    targetMarket: 'International Sports Audience 🌍',
    type: 'Global Brand',
    seoPower: 86,
    pros: [
      'Neutral brand name that appeals equally to UK, US, Canada, Australia & Europe',
      'High keyword-in-domain match for sports live streaming search intent'
    ],
    verdict: 'Superb brandable generic option if you want to scale beyond UK branding.',
    suggestedAction: 'Alternative Brand Name'
  }
];

export const DomainAdvisorModal: React.FC<DomainAdvisorModalProps> = ({ isOpen, onClose }) => {
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<'single' | 'multidomain'>('single');

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDomain(text);
    setTimeout(() => setCopiedDomain(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>Domain Strategy & International SEO Advisory</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              What Domain Name Should You Buy?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Expert breakdown on single vs. multi-domain strategies for UK and USA market visibility.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Answer Callout */}
        <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-sky-950/80 p-5 rounded-2xl border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Your Available Domains Evaluation (Namecheap EasyWP Safe)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
            <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-emerald-300">globalstreamhub.net</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-slate-950">⭐ #1 Pick</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Extremely professional, authoritative, and clean. Perfectly suited for Namecheap EasyWP hosting with zero trademark flags.
              </p>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-300">visionmediaservice.org</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-500/20 text-sky-300">Tech Portal</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Great neutral name for a customer support, billing, or media streaming gateway portal. Very safe.
              </p>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-300">ethernetmedia.site</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300">Alternative</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clean alternative, though `.site` TLD is less memorable than `.net` for entertainment portals.
              </p>
            </div>
          </div>
        </div>

        {/* Strategy Switcher */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSelectedStrategy('single')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedStrategy === 'single' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Recommended Domain Names (.vip / .tv / .com)
          </button>
          <button
            onClick={() => setSelectedStrategy('multidomain')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedStrategy === 'multidomain' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            UK vs USA Multi-Domain Comparison
          </button>
        </div>

        {/* Domain Suggestions Cards */}
        {selectedStrategy === 'single' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOMAIN_RECOMMENDATIONS.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 p-5 rounded-2xl space-y-3 transition-all group"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-cyan-300 group-hover:text-white">
                      {item.domain}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.suggestedAction}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.domain)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy domain name"
                  >
                    {copiedDomain === item.domain ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-[11px] text-slate-400 font-semibold">
                    Target Market: <span className="text-slate-200">{item.targetMarket}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    SEO Ranking Power: <strong className="text-emerald-400">{item.seoPower}/100</strong>
                  </div>
                </div>

                <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
                  {item.pros.map((pro, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-[11px] text-slate-300 font-medium">
                  {item.verdict}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs text-slate-300">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Step-by-Step Multi-Domain Architecture for UK + USA</span>
            </h4>

            <div className="space-y-3 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5">
                <strong className="text-indigo-300 font-bold block mb-1">1. Primary Master Domain (e.g. <code>globalstreamhub.net</code>)</strong>
                <span>Hosts the main responsive application, automated payment gateways, and central customer portal. Automatically detects user IP and switches between £ (GBP), $ (USD), and € (EUR).</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5">
                <strong className="text-cyan-300 font-bold block mb-1">2. Media Authority Mirror (e.g. <code>visionmediaservice.org</code>)</strong>
                <span>Set up as a dedicated customer portal or high-trust landing page. Boosts overall network trust and provides instant failover.</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5">
                <strong className="text-emerald-300 font-bold block mb-1">3. High-Speed Tech Hub (e.g. <code>ethernetmedia.site</code>)</strong>
                <span>Dedicated setup and fast-app shortcode download hub for FireStick and Smart TV applications.</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Ready to register? Recommended registrars: <strong>Namecheap</strong>, <strong>Porkbun</strong>, or <strong>Cloudflare Registrar</strong>.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold text-xs transition-all shadow-lg shadow-indigo-600/25 cursor-pointer w-full sm:w-auto"
          >
            Got It, Close Advisor
          </button>
        </div>

      </div>
    </div>
  );
};
