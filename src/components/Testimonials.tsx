import React, { useState } from 'react';
import { UK_CUSTOMER_REVIEWS } from '../data/mockData';
import { ReviewItem } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Wifi, 
  ThumbsUp, 
  Tv, 
  Award, 
  Check, 
  MessageSquare,
  Flame,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVoteHelpful = (id: string, initialCount: number = 0) => {
    if (votedReviews[id]) return;
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1
    }));
    setVotedReviews(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const categories = [
    { id: 'all', label: t.reviews.allReviews, count: UK_CUSTOMER_REVIEWS.length },
    { id: 'sports', label: t.reviews.sportsCategory, count: UK_CUSTOMER_REVIEWS.filter(r => r.category === 'sports').length },
    { id: 'broadband', label: t.reviews.broadbandCategory, count: UK_CUSTOMER_REVIEWS.filter(r => r.category === 'broadband').length },
    { id: 'devices', label: t.reviews.devicesCategory, count: UK_CUSTOMER_REVIEWS.filter(r => r.category === 'devices').length },
    { id: 'vod', label: t.reviews.vodCategory, count: UK_CUSTOMER_REVIEWS.filter(r => r.category === 'vod').length },
  ];

  const filteredReviews = UK_CUSTOMER_REVIEWS.filter(review => {
    if (selectedCategory === 'all') return true;
    return review.category === selectedCategory;
  });

  return (
    <section id="reviews" className="py-24 bg-[#060814] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black border border-emerald-500/25 tracking-wide shadow-sm">
            <div className="flex text-emerald-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-emerald-400" />
              ))}
            </div>
            <span>{t.reviews.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.reviews.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">{t.reviews.titleHighlight}</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Trustpilot Score Summary Card */}
        <div className="electric-card rounded-3xl p-6 sm:p-8 mb-12 border border-white/10 shadow-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Overall TrustScore */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-2 text-white font-extrabold text-lg">
                <span className="text-emerald-400 font-black text-2xl">★</span>
                <span>Trustpilot</span>
                <span className="text-xs font-medium text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  {t.reviews.verifiedReviews}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-white tracking-tight">4.9</span>
                <span className="text-slate-400 text-sm font-semibold">{t.reviews.outOf5}</span>
              </div>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-7 h-7 bg-[#00b67a] rounded flex items-center justify-center text-white text-xs font-black shadow-sm">
                    ★
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 pt-1">
                {t.reviews.basedOn} <span className="text-white font-bold">{t.reviews.basedOnHighlight}</span>
              </p>
            </div>

            {/* Middle: Star Rating Distribution */}
            <div className="lg:col-span-5 space-y-2">
              {[
                { stars: '5 Star', pct: 94, count: '1,391' },
                { stars: '4 Star', pct: 5, count: '74' },
                { stars: '3 Star', pct: 1, count: '15' },
                { stars: '2 Star', pct: 0, count: '0' },
                { stars: '1 Star', pct: 0, count: '0' },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-slate-400 font-medium">{item.stars}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-slate-400 font-mono text-[11px]">{item.pct}%</span>
                </div>
              ))}
            </div>

            {/* Right: Key Verified Guarantees */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-2.5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Anti-Throttling London Nodes</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Saturday 3pm Live Buffer-Free</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified UK & EU Subscribers</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 WhatsApp Support Desk</span>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                selectedCategory === cat.id ? 'bg-indigo-700/80 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.slice(0, isExpanded ? undefined : 4).map((review) => {
            const currentHelpful = helpfulVotes[review.id] ?? (review.helpfulCount || 12);
            const hasVoted = votedReviews[review.id];

            // Initials for avatar
            const initials = review.author
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={review.id}
                className="electric-card rounded-3xl p-6 flex flex-col justify-between space-y-5 hover:border-indigo-500/50 transition-all duration-300 shadow-xl bg-slate-950/60 border border-white/10 group relative"
              >
                {/* Top: Author header & Trustpilot stars */}
                <div className="space-y-4">
                  {/* Author bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.avatarColor || 'from-indigo-500 to-sky-500'} flex items-center justify-center text-white font-extrabold text-xs shadow-md border border-white/20`}>
                        {initials}
                      </div>
                      <div>
                        <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                          <span>{review.author}</span>
                          <span className="text-base" title="Country">{review.countryFlag}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{review.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        <Check className="w-2.5 h-2.5" />
                        <span>{t.reviews.verified}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-1">{review.date}</span>
                    </div>
                  </div>

                  {/* Trustpilot 5 Stars & Rating Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-[#00b67a] rounded-[2px] flex items-center justify-center text-white text-[9px] font-black">
                          ★
                        </div>
                      ))}
                      <span className="text-[11px] font-bold text-slate-300 ml-1.5">{t.reviews.excellent}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                      "{review.title}"
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>

                {/* Bottom Metadata & Technical Setup */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  
                  {/* Setup Pills */}
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {review.planName && (
                      <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                        {review.planName}
                      </span>
                    )}
                    {review.deviceUsed && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-white/10 flex items-center gap-1">
                        <Tv className="w-2.5 h-2.5 text-sky-400" />
                        {review.deviceUsed}
                      </span>
                    )}
                  </div>

                  {/* ISP & Date of experience */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-sky-300 truncate max-w-[170px]" title={review.isp}>
                      <Wifi className="w-3 h-3 text-sky-400 shrink-0" />
                      <span className="truncate">{review.isp}</span>
                    </div>

                    {/* Helpful button */}
                    <button
                      onClick={() => handleVoteHelpful(review.id, review.helpfulCount)}
                      disabled={hasVoted}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                        hasVoted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 cursor-pointer'
                      }`}
                      title="Mark review as helpful"
                    >
                      <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'text-emerald-400' : ''}`} />
                      <span>{currentHelpful}</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Trust summary metrics banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl electric-glass border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xl">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white">10,500+</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">{t.reviews.activeSubscribers}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-sky-400">99.99%</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">{t.reviews.serverUptime}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">&lt; 10s</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">{t.reviews.instantDelivery}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">4.9 / 5.0</div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">{t.reviews.verifiedScore}</div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-full border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>Collapse Section</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>Expand Section</span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
