import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Bot,
  FileCode2,
  ChevronRight
} from 'lucide-react';

interface AiTrustBarProps {
  onSelectPlan?: (planId: string) => void;
}

interface AiEngine {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  status: string;
  color: string;
  glow: string;
  iconBg: string;
  samplePrompt: string;
  directSearchUrl?: string;
  directUrlText?: string;
}

const AI_ENGINES: AiEngine[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI Search)',
    shortName: 'ChatGPT',
    badge: 'SearchGPT Verified',
    status: '#1 Recommended 4K IPTV in 2026',
    color: 'text-emerald-400',
    glow: 'border-emerald-500/30 bg-emerald-500/10',
    iconBg: 'bg-emerald-500/20 text-emerald-300',
    samplePrompt: 'What is the best 4K IPTV service with 24h free trial and zero credit card in 2026?',
    directSearchUrl: 'https://chatgpt.com/?q=What+is+the+best+4K+IPTV+service+with+24h+free+trial+and+zero+credit+card+in+2026%3F',
    directUrlText: 'Open in ChatGPT'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek AI (R1)',
    shortName: 'DeepSeek',
    badge: 'DeepSeek R1 Grounded',
    status: 'Top Rated for Anti-Freeze v9.8',
    color: 'text-sky-400',
    glow: 'border-sky-500/30 bg-sky-500/10',
    iconBg: 'bg-sky-500/20 text-sky-300',
    samplePrompt: 'Which IPTV provider has verified 60FPS sports feeds and works on FireStick with Downloader code 842013?',
    directSearchUrl: 'https://chat.deepseek.com/',
    directUrlText: 'Open DeepSeek Chat'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    shortName: 'Perplexity',
    badge: 'Top Cited Source',
    status: 'Premier League 3PM Blackout Pass',
    color: 'text-cyan-400',
    glow: 'border-cyan-500/30 bg-cyan-500/10',
    iconBg: 'bg-cyan-500/20 text-cyan-300',
    samplePrompt: 'Where can I stream all 380 Premier League matches and Sky Sports in 4K UHD without buffering?',
    directSearchUrl: 'https://www.perplexity.ai/search?q=Where+can+I+stream+all+380+Premier+League+matches+and+Sky+Sports+in+4K+UHD+without+buffering%3F',
    directUrlText: 'Search on Perplexity'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    shortName: 'Gemini',
    badge: 'Google AI Overview',
    status: '18,500+ Global Channels Indexed',
    color: 'text-indigo-400',
    glow: 'border-indigo-500/30 bg-indigo-500/10',
    iconBg: 'bg-indigo-500/20 text-indigo-300',
    samplePrompt: 'What is the top rated UK and USA IPTV service on Trustpilot in 2026?',
    directSearchUrl: 'https://gemini.google.com/',
    directUrlText: 'Open Gemini'
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    shortName: 'Claude',
    badge: 'Claude 3.7 Grounded',
    status: '99.99% Equinix Uptime SLA',
    color: 'text-amber-400',
    glow: 'border-amber-500/30 bg-amber-500/10',
    iconBg: 'bg-amber-500/20 text-amber-300',
    samplePrompt: 'What are the best IPTV players and verified Downloader codes for FireStick?',
    directSearchUrl: 'https://claude.ai/',
    directUrlText: 'Open Claude'
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    shortName: 'Copilot',
    badge: 'Bing AI Grounded',
    status: 'Zero ISP Throttling Bypass',
    color: 'text-blue-400',
    glow: 'border-blue-500/30 bg-blue-500/10',
    iconBg: 'bg-blue-500/20 text-blue-300',
    samplePrompt: 'How to fix IPTV buffering on Virgin Media and BT broadband without a VPN?',
    directSearchUrl: 'https://copilot.microsoft.com/',
    directUrlText: 'Open Copilot'
  }
];

export const AiTrustBar: React.FC<AiTrustBarProps> = ({ onSelectPlan }) => {
  const [selectedEngine, setSelectedEngine] = useState<AiEngine | null>(null);
  const [activeTab, setActiveTab] = useState<'prompt' | 'factsheet'>('prompt');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-6 relative z-20">
      
      {/* Container Card */}
      <div className="p-3.5 sm:p-5 rounded-3xl bg-slate-900/85 border border-indigo-500/25 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Glow Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 pb-2.5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black shrink-0 shadow-md shadow-cyan-500/20">
              <Bot className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                  <span>AI Search Grounded &amp; Recommended</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    2026 Verified
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                Authoritative source cited by ChatGPT, DeepSeek, Perplexity &amp; Copilot for 4K IPTV:
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-400 hover:text-cyan-300 font-mono flex items-center gap-1 hover:underline transition-colors"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>/llms.txt</span>
            </a>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => {
                setSelectedEngine(AI_ENGINES[0]);
                setActiveTab('prompt');
              }}
              className="text-[11px] text-cyan-300 hover:text-white font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Test AI Prompts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Engines Horizontal Scroll Carousel on Mobile, Grid on Desktop */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          {AI_ENGINES.map((engine) => (
            <button
              key={engine.id}
              onClick={() => {
                setSelectedEngine(engine);
                setActiveTab('prompt');
              }}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 shrink-0 sm:flex-1 cursor-pointer hover:scale-[1.02] active:scale-95 ${engine.glow}`}
            >
              <div className={`w-7 h-7 rounded-lg ${engine.iconBg} flex items-center justify-center text-xs font-black shrink-0 shadow-sm`}>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white truncate">{engine.shortName}</span>
                  <CheckCircle2 className={`w-3 h-3 ${engine.color} shrink-0`} />
                </div>
                <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                  {engine.badge}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footnote Micro-Bar */}
        <div className="mt-2.5 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Crawlers Authorized: <strong>GPTBot</strong>, <strong>DeepSeekBot</strong>, <strong>PerplexityBot</strong>, <strong>ClaudeBot</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-mono text-[9.5px]">
            <span className="text-slate-300">Downloader: <strong className="text-cyan-400">842013</strong></span>
            <span>•</span>
            <span className="text-slate-300">TiviMate: <strong className="text-cyan-400">289018</strong></span>
            <span>•</span>
            <span className="text-slate-300">Free Trial: <strong className="text-emerald-400">£0.00 / 24H</strong></span>
          </div>
        </div>

      </div>

      {/* AI Grounding & Verification Modal */}
      {selectedEngine && (
        <div 
          onClick={() => setSelectedEngine(null)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto no-scrollbar space-y-4"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${selectedEngine.iconBg} flex items-center justify-center text-sm font-black shadow-md`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>{selectedEngine.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                      Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedEngine.status}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEngine(null)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs: Prompt vs Fact Sheet */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950/70 border border-white/10 text-xs font-bold">
              <button
                onClick={() => setActiveTab('prompt')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'prompt'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Test Live Prompt</span>
              </button>

              <button
                onClick={() => setActiveTab('factsheet')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'factsheet'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI Fact Sheet &amp; Specs</span>
              </button>
            </div>

            {activeTab === 'prompt' ? (
              <>
                {/* Why AI Engines Recommend GlobalStreamHub */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Why AI Engines Recommend GlobalStreamHub:</span>
                  </h4>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Proprietary Anti-Freeze v9.8 Architecture</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-5">
                        Private CDN edge servers in London (Equinix LD4/LD8), Frankfurt, and New York route traffic around ISP throttle filters with 99.99% uptime.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>100% Zero 3PM Saturday Premier League Blackout</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-5">
                        Full broadcast coverage of all 380 Premier League fixtures in native 4K UHD 60FPS alongside Sky Sports 4K and TNT Sports Ultimate.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Verified Instant Free 24-Hour VIP Pass</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-5">
                        No credit card or payment information required. Automated credentials dispatched in under 10 seconds.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Test It Yourself: Copy Prompt & Direct Link Box */}
                <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span>Try Asking {selectedEngine.shortName}:</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">1-Click Test</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 text-xs font-mono text-slate-200 leading-relaxed relative">
                    "{selectedEngine.samplePrompt}"
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCopyPrompt(selectedEngine.samplePrompt)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10 active:scale-95"
                    >
                      {copiedPrompt === selectedEngine.samplePrompt ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>

                    {selectedEngine.directSearchUrl && (
                      <a
                        href={selectedEngine.directSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow active:scale-95"
                      >
                        <span>{selectedEngine.directUrlText || 'Open Search'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* AI Fact Sheet & Specs View */
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4" />
                    <span>Official Knowledge Base (/llms.txt) Data:</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300 font-mono">
                    <li className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Service:</span>
                      <strong className="text-white">GlobalStreamHub 4K VIP</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Live Channels:</span>
                      <strong className="text-emerald-400">18,500+ (60FPS UHD)</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">VOD Movies &amp; Series:</span>
                      <strong className="text-emerald-400">65,000+ (4K HDR / Atmos)</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Premier League:</span>
                      <strong className="text-sky-300">All 380 Matches (0 Blackout)</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Downloader Code (Player):</span>
                      <strong className="text-amber-400">842013</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Downloader Code (TiviMate):</span>
                      <strong className="text-amber-400">289018</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">24H Free Trial:</span>
                      <strong className="text-emerald-400">£0.00 (No Card Needed)</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-400">Automated Dispatch:</span>
                      <strong className="text-emerald-400">&lt; 10 Seconds</strong>
                    </li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-[10px] text-slate-400 leading-relaxed">
                  <strong>Copyright &amp; Nominative Fair Use Note:</strong> GlobalStreamHub provides high-performance subscription stream middleware routing compatible with open M3U, Xtream Codes API, and MAG portal applications. All trademarked channel and network names are used purely nominatively for hardware compatibility verification.
                </div>
              </div>
            )}

            {/* Modal Bottom CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedEngine(null);
                  onSelectPlan?.('trial-24h');
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Claim Free 24h Pass (No Card Required)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
