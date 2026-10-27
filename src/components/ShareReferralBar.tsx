import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Send, Sparkles, Gift, Flame } from 'lucide-react';

interface ShareReferralBarProps {
  currentUrl?: string;
  title?: string;
}

export const ShareReferralBar: React.FC<ShareReferralBarProps> = ({
  currentUrl = 'https://globalstreamhub.net',
  title = 'GlobalStreamHub 4K • Ultra HD Sports & Global Media Portal (18,500+ Live Channels in 4K 60FPS)'
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out GlobalStreamHub — Stream every Premier League match, Ultra HD 4K live sports & 65,000+ movies with Anti-Freeze v9.8! Claim your free 24-hour trial:`;
  const encodedText = encodeURIComponent(`${shareText} ${currentUrl}`);
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(`${shareText} ${currentUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a0f2b] to-slate-900 border border-indigo-500/30 p-4 sm:p-6 shadow-2xl shadow-indigo-950/40">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Left Text & Referral Incentive */}
          <div className="flex items-start gap-3 sm:gap-4 text-left w-full md:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Referral Reward
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">1 Friend = 1 Month FREE</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white mt-1">
                Share GlobalStreamHub with Friends & Groups
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-0.5 leading-relaxed">
                Invite friends or share in your messaging groups. When someone subscribes, message our Telegram/WhatsApp to receive <strong className="text-amber-300">1 free bonus month</strong> added to your plan!
              </p>
            </div>
          </div>

          {/* Right Action Sharing Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end shrink-0">
            
            {/* WhatsApp Share */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-slate-950 border border-[#25D366]/40 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Telegram Share */}
            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#229ED9]/20 hover:bg-[#229ED9] text-[#229ED9] hover:text-white border border-[#229ED9]/40 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              title="Share on Telegram"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>

            {/* Reddit Share */}
            <a
              href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF4500]/20 hover:bg-[#FF4500] text-[#FF4500] hover:text-white border border-[#FF4500]/40 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              title="Share on Reddit"
            >
              <Flame className="w-4 h-4" />
              <span className="hidden sm:inline">Reddit</span>
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer border ${
                copied
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
