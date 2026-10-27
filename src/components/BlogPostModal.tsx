import React, { useState, useMemo } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import { 
  X, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Tv, 
  Tag, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
  onOpenPost?: (post: BlogPost) => void;
  navigateTo?: (path: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  isOpen,
  onClose,
  onSelectPlan,
  onOpenPost,
  navigateTo,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic 3 related posts based on shared tags and keywords
  const relatedPostsData = useMemo(() => {
    if (!post) return [];
    const currentTags = post.tags || [];
    const currentTagsLower = currentTags.map(t => t.toLowerCase().trim());
    const currentKeywordsLower = (post.targetKeywords || []).map(k => k.toLowerCase().trim());

    const scored = BLOG_POSTS
      .filter(candidate => candidate.id !== post.id)
      .map(candidate => {
        const candidateTags = candidate.tags || [];
        const candidateKeywords = candidate.targetKeywords || [];

        const matchedTags = candidateTags.filter(cTag => {
          const cLower = cTag.toLowerCase().trim();
          return currentTagsLower.some(curr => curr === cLower || curr.includes(cLower) || cLower.includes(curr));
        });

        const matchedKeywords = candidateKeywords.filter(cKw => {
          const cLower = cKw.toLowerCase().trim();
          return currentKeywordsLower.some(curr => curr === cLower || curr.includes(cLower) || cLower.includes(curr));
        });

        let score = (matchedTags.length * 10) + (matchedKeywords.length * 4);
        if (candidate.category === post.category) score += 6;
        if (candidate.geoFocus === post.geoFocus) score += 3;
        if (candidate.featured) score += 1;

        return {
          post: candidate,
          sharedTags: matchedTags,
          matchScore: score,
        };
      });

    scored.sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return new Date(b.post.isoDate || b.post.date).getTime() - new Date(a.post.isoDate || a.post.date).getTime();
    });

    return scored.slice(0, 3);
  }, [post]);

  if (!isOpen || !post) return null;

  const handleCopyLink = () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://globalstreamhub.net';
    const url = `${origin}/blog/${post.slug}`;
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch (e) {
      console.warn('Clipboard write blocked:', e);
    }
  };

  const handleRelatedClick = (relatedPost: BlogPost) => {
    if (navigateTo) {
      onClose();
      navigateTo('/blog/' + relatedPost.slug);
    } else if (onOpenPost) {
      onOpenPost(relatedPost);
    }
  };

  const handleStartTrial = () => {
    onClose();
    if (onSelectPlan) {
      onSelectPlan('trial-24h');
    } else {
      const pricingEl = document.getElementById('pricing');
      pricingEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const geoBadge = {
    UK: { text: '🇬🇧 UK Focused', color: 'border-rose-500/30 text-rose-300 bg-rose-500/10' },
    USA: { text: '🇺🇸 USA Focused', color: 'border-blue-500/30 text-blue-300 bg-blue-500/10' },
    Canada: { text: '🇨🇦 Canada Focused', color: 'border-red-500/30 text-red-300 bg-red-500/10' },
    Global: { text: '🌍 Global Edition', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10' },
  }[post.geoFocus];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#090d21] border border-indigo-500/30 rounded-3xl shadow-2xl shadow-indigo-950/80 overflow-hidden my-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ambient Glow */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-600/20 via-sky-600/10 to-transparent pointer-events-none" />

        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#090d21]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-500/20 text-sky-300 border border-indigo-500/30">
              {post.categoryLabel}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${geoBadge.color}`}>
              {geoBadge.text}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer border border-white/5"
              title="Copy Article Link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Share Article</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5 flex items-center justify-center"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-4 border-b border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
                />
                <div>
                  <div className="font-bold text-white text-sm">{post.author.name}</div>
                  <div className="text-[11px] text-slate-400">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[12px]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Article Cover Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video max-h-[380px] w-full">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Key Article Highlights & Takeaways</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-300">
              {post.content.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Executive Summary */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-medium text-slate-200 text-base sm:text-lg leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-white/5">
              {post.content.summary}
            </p>

            {/* Sections */}
            {post.content.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-3 pt-4">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-base">0{sIdx + 1}.</span>
                  {section.heading}
                </h2>

                {section.subheading && (
                  <h3 className="text-sm sm:text-base font-bold text-sky-300">
                    {section.subheading}
                  </h3>
                )}

                {section.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {p}
                  </p>
                ))}

                {section.listItems && section.listItems.length > 0 && (
                  <ul className="space-y-2 pl-2 pt-1 text-sm text-slate-300">
                    {section.listItems.map((li, liIdx) => (
                      <li key={liIdx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.tipBox && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-medium flex items-start gap-3 mt-3">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>{section.tipBox}</div>
                  </div>
                )}
              </div>
            ))}

            {/* FAQ Section if available */}
            {post.content.faq && post.content.faq.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-400" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {post.content.faq.map((faqItem, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-1.5">
                      <div className="font-bold text-white text-sm">{faqItem.q}</div>
                      <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">{faqItem.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Long-tail Keywords Cloud in Article */}
          <div className="pt-6 border-t border-white/10 space-y-2.5">
            <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-sky-400" />
              <span>Target SEO Keywords & Long-Tail Search Queries:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.targetKeywords.map((kw) => (
                <span key={kw} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 border border-white/10 text-cyan-300">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles Section inside Modal */}
          {relatedPostsData.length > 0 && (
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    Related Articles & Next Guides
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  Matched by shared topics & device tags
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPostsData.map(({ post: rPost, sharedTags }) => (
                  <div
                    key={rPost.id}
                    onClick={() => handleRelatedClick(rPost)}
                    className="group cursor-pointer bg-slate-900/90 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-3.5 space-y-3 transition-all hover:bg-slate-800/80 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                        <img
                          src={rPost.coverImage}
                          alt={rPost.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-950/90 text-sky-300 border border-indigo-500/30">
                          {rPost.categoryLabel}
                        </div>
                      </div>

                      {sharedTags.length > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-cyan-300 font-bold truncate">
                          <Tag className="w-2.5 h-2.5 shrink-0" />
                          <span>#{sharedTags[0]}</span>
                        </div>
                      )}

                      <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {rPost.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-400">
                      <span>{rPost.readTime}</span>
                      <span className="text-cyan-400 font-bold flex items-center gap-0.5 group-hover:underline">
                        <span>Read</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Conversion Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900/80 border border-indigo-500/40 text-center space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Risk 100% Free 24-Hour VIP Pass</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to Experience StreamUK 4K in Ultra High Definition?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Get immediate automated activation with 18,500+ live channels, Sky Sports, TNT Sports, Premier League 3pm feeds, and 65,000+ VOD boxsets.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartTrial}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start Free 24h VIP Trial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors cursor-pointer border border-white/5"
              >
                Close & Return to Site
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
