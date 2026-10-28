import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Share2, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  Globe, 
  Zap, 
  Tv, 
  CheckCircle2, 
  Flame,
  Award,
  Users
} from 'lucide-react';

interface TrafficBoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrafficBoosterModal: React.FC<TrafficBoosterModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const REDDIT_POST = `🔥 Best UK IPTV for Premier League 4K UHD (Zero 3PM Blackout & Free 24H Trial)

If you're looking for a stable UK IPTV provider with zero buffering on Virgin Media / BT, check out GlobalStreamHub:
🌐 Website: https://globalstreamhub.net
📺 Official FireStick Downloader Code: 842013
⚽ All 380 EPL games live in native 4K 60FPS + Sky Sports 4K & TNT Sports Ultimate
⚡ Instant 24-Hour Free Trial pass (£0.00 - No credit card required!)`;

  const WHATSAPP_PROMO = `⚽ Stream All Premier League Matches in 4K UHD (Zero 3PM Blackout!)
📺 Sky Sports 4K, TNT Sports, 18,500+ Live Channels & 65,000+ VOD Movies
🔥 Official FireStick Downloader Code: 842013
🎁 Claim your 100% Free 24-Hour Trial Pass now at https://globalstreamhub.net`;

  const FORUM_POST = `[RECOMMENDED] GlobalStreamHub 4K IPTV Service 2026
Website: https://globalstreamhub.net
Downloader Code: 842013 (FireStick / Android TV)
- 18,500+ Live Channels (UK, US, Canada, EU)
- Anti-Freeze v9.8 Private London Equinix CDN
- Sky Sports 4K, TNT Sports Ultimate, NFL RedZone & TSN
- Instant 24H Free Trial without credit card`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-slate-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>GlobalStreamHub Traffic &amp; Visitor Acquisition Hub</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              5 Strategies to Get 10,000+ Visitors to globalstreamhub.net
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Automated SEO indexing, FireStick shortcode distribution, social viral loops, and direct lead capture.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Growth Pillars Grid */}
        <div className="space-y-4 text-xs">
          
          {/* Strategy 1: Google Search Console */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <strong className="text-emerald-400 font-black text-sm flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>1. Submit Sitemap to Google &amp; Bing Search Console</span>
              </strong>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1"
              >
                <span>Google Console</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Now that <code className="text-cyan-300">globalstreamhub.net</code> is live with SSL, add your domain to <strong>Google Search Console</strong> and <strong>Bing Webmaster Tools</strong>. Submit your sitemap URL:
            </p>
            <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-white/5 font-mono text-cyan-300">
              <span>https://globalstreamhub.net/sitemap.xml</span>
              <button
                onClick={() => handleCopy('https://globalstreamhub.net/sitemap.xml', 'sitemap')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedKey === 'sitemap' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'sitemap' ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>

          {/* Strategy 2: Reddit & IPTV Forums */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <strong className="text-sky-400 font-black text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>2. Share on Reddit (r/IPTV, r/IPTVReviews) &amp; Tech Forums</span>
              </strong>
              <button
                onClick={() => handleCopy(REDDIT_POST, 'reddit')}
                className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 font-bold hover:bg-sky-500/30 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'reddit' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'reddit' ? 'Copied Post' : 'Copy Reddit Post'}</span>
              </button>
            </div>
            <p className="text-slate-300 leading-relaxed">
              High-intent users looking to buy IPTV search Reddit subreddits like <code className="text-cyan-300">r/IPTVReviews</code>, <code className="text-cyan-300">r/FireStickHacks</code>, and <code className="text-cyan-300">r/CordCutters</code>. Share this pre-written promo template:
            </p>
            <pre className="p-3 rounded-xl bg-slate-900 border border-white/5 font-mono text-[11px] text-slate-300 whitespace-pre-wrap">
              {REDDIT_POST}
            </pre>
          </div>

          {/* Strategy 3: FireStick Downloader Code Marketing */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <strong className="text-amber-400 font-black text-sm flex items-center gap-2">
              <Tv className="w-4 h-4" />
              <span>3. FireStick Downloader Code Keyword Targeting (842013)</span>
            </strong>
            <p className="text-slate-300 leading-relaxed">
              Over 60% of UK IPTV users search Google for numeric shortcodes like <strong className="text-white">"Downloader code 842013"</strong> or <strong className="text-white">"best downloader code for firestick 2026"</strong>. Mentioning shortcode <code className="text-amber-300">842013</code> on forums, YouTube video titles, and TikTok tutorial videos drives massive direct app installs!
            </p>
          </div>

          {/* Strategy 4: WhatsApp & Telegram Direct Lead Automation */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <strong className="text-purple-400 font-black text-sm flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>4. WhatsApp &amp; Telegram Group Broadcasts</span>
              </strong>
              <button
                onClick={() => handleCopy(WHATSAPP_PROMO, 'wa')}
                className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold hover:bg-purple-500/30 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'wa' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'wa' ? 'Copied Promo' : 'Copy Broadcast Text'}</span>
              </button>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Your website features direct automated buttons linking visitors to WhatsApp (<code className="text-emerald-400">+44 7731 454811</code>) and Telegram (<code className="text-sky-400">@GlobalStreamHub_Support</code>). Broadcast this offer into Telegram football and streaming channels:
            </p>
            <pre className="p-3 rounded-xl bg-slate-900 border border-white/5 font-mono text-[11px] text-slate-300 whitespace-pre-wrap">
              {WHATSAPP_PROMO}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-800 pt-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
          >
            Close Growth Playbook
          </button>
        </div>

      </div>
    </div>
  );
};
