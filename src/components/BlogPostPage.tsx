import React, { useState, useMemo, useEffect } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import { ShareReferralBar } from './ShareReferralBar';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Check, 
  ChevronRight, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  HelpCircle,
  TrendingUp,
  Award,
  Link as LinkIcon
} from 'lucide-react';

interface BlogPostPageProps {
  post: BlogPost;
  onSelectPlan: (planId: string) => void;
  navigateTo: (path: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onSelectPlan,
  navigateTo,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://globalstreamhub.net';

  // Dynamic SEO Title & Meta Tag Injection for Current Blog Post URL
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${post.title} | GlobalStreamHub 4K VIP Blog`;

    // Dynamic Canonical Link Update
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalTag) {
      canonicalTag.href = `${baseUrl}/blog/${post.slug}`;
    }

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDesc) {
      metaDesc.content = post.excerpt;
    }

    // Dynamic JSON-LD Structured Data for this specific Article URL
    const scriptId = 'dynamic-article-schema';
    let existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.id = scriptId;
      existingScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(existingScript);
    }

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${post.slug}`
      },
      "headline": post.title,
      "description": post.excerpt,
      "image": post.coverImage,
      "datePublished": post.isoDate,
      "dateModified": post.isoDate,
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "GlobalStreamHub VIP",
        "logo": {
          "@type": "ImageObject",
          "url": "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&h=630&q=80"
        }
      },
      "keywords": post.targetKeywords.join(', ')
    };

    existingScript.textContent = JSON.stringify(articleSchema);

    return () => {
      document.title = originalTitle;
      if (canonicalTag) {
        canonicalTag.href = `${baseUrl}/`;
      }
      const schemaEl = document.getElementById(scriptId);
      if (schemaEl) {
        schemaEl.remove();
      }
    };
  }, [post, baseUrl]);

  const handleCopyLink = () => {
    try {
      const articleUrl = `${baseUrl}/blog/${post.slug}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(articleUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch (e) {
      console.warn('Clipboard write is blocked or restricted in this environment:', e);
    }
  };

  const handleStartTrial = () => {
    onSelectPlan('trial-24h');
  };

  // Dynamic algorithm to find top 3 related posts based on shared tags, keywords, and category
  const relatedPostsData = useMemo(() => {
    const currentTags = post.tags || [];
    const currentTagsLower = currentTags.map(t => t.toLowerCase().trim());
    const currentKeywordsLower = (post.targetKeywords || []).map(k => k.toLowerCase().trim());

    const scored = BLOG_POSTS
      .filter(candidate => candidate.id !== post.id)
      .map(candidate => {
        const candidateTags = candidate.tags || [];
        const candidateKeywords = candidate.targetKeywords || [];

        // Find direct or partial tag overlaps
        const matchedTags = candidateTags.filter(cTag => {
          const cLower = cTag.toLowerCase().trim();
          return currentTagsLower.some(curr => curr === cLower || curr.includes(cLower) || cLower.includes(curr));
        });

        // Find keyword overlaps
        const matchedKeywords = candidateKeywords.filter(cKw => {
          const cLower = cKw.toLowerCase().trim();
          return currentKeywordsLower.some(curr => curr === cLower || curr.includes(cLower) || cLower.includes(curr));
        });

        // Compute relevance score
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

    // Sort by highest matchScore descending, then by newest date
    scored.sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return new Date(b.post.isoDate || b.post.date).getTime() - new Date(a.post.isoDate || a.post.date).getTime();
    });

    return scored.slice(0, 3);
  }, [post]);

  const geoBadge = (post.geoFocus && {
    UK: { text: '🇬🇧 UK Focused', color: 'border-rose-500/30 text-rose-300 bg-rose-500/10' },
    USA: { text: '🇺🇸 USA Focused', color: 'border-blue-500/30 text-blue-300 bg-blue-500/10' },
    Canada: { text: '🇨🇦 Canada Focused', color: 'border-red-500/30 text-red-300 bg-red-500/10' },
    Global: { text: '🌍 Global Edition', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10' },
  }[post.geoFocus]) || { text: '🌍 Global Edition', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10' };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#060814] text-slate-200 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[250px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link Breadcrumb & Permanent URL */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
            <span>Back to Home Dashboard</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/5">
            <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300">{baseUrl.replace(/^https?:\/\//, '')}/blog/{post.slug}</span>
          </div>
        </div>

        {/* Outer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Deep-dive Article Content (8 Cols) */}
          <article className="lg:col-span-8 bg-gradient-to-b from-slate-900/60 to-[#090d21]/80 border border-white/5 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
            
            {/* Category & Geo Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/10 text-sky-300 border border-indigo-500/30">
                {post.categoryLabel}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${geoBadge.color}`}>
                {geoBadge.text}
              </span>
              {post.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 fill-amber-400/20" />
                  Featured Guide
                </span>
              )}
            </div>

            {/* Main Heading H1 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Excerpt Summary */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed border-l-2 border-cyan-400 pl-4 py-1 italic font-medium">
              {post.excerpt}
            </p>

            {/* Author & Timestamp Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-6 border-b border-white/10 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-indigo-500/40"
                />
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">{post.author.name}</div>
                  <div className="text-[11px] sm:text-xs text-slate-400">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {post.readTime}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer border border-white/5 active:scale-95"
                  title="Copy Article URL Link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied URL!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Share Article</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* High-Res Cinematic Cover Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video max-h-[440px] w-full shadow-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-cyan-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Takeaways Highlight Box */}
            <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3.5">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-sm sm:text-base">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Executive Highlights & Key Takeaways</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                {post.content.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections Parser */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
              
              {/* Summary Paragraph */}
              <p className="font-medium text-slate-200 text-base sm:text-lg leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                {post.content.summary}
              </p>

              {/* Loop Sections */}
              {post.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4 pt-4">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-base sm:text-lg">0{sIdx + 1}.</span>
                    {section.heading}
                  </h2>

                  {section.subheading && (
                    <h3 className="text-sm sm:text-base font-bold text-sky-300">
                      {section.subheading}
                    </h3>
                  )}

                  {section.body && section.body.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                      {p}
                    </p>
                  ))}

                  {/* Bullet Points */}
                  {section.listItems && section.listItems.length > 0 && (
                    <ul className="space-y-2.5 pl-2 pt-1 text-sm sm:text-base text-slate-300">
                      {section.listItems.map((li, liIdx) => (
                        <li key={liIdx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Highlight Tip Box */}
                  {section.tipBox && (
                    <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-medium flex items-start gap-3 mt-3 shadow-sm">
                      <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>{section.tipBox}</div>
                    </div>
                  )}
                </div>
              ))}

              {/* Embedded Q&A FAQ Block */}
              {post.content.faq && post.content.faq.length > 0 && (
                <div className="space-y-4 pt-8 border-t border-white/10">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3.5">
                    {post.content.faq.map((faqItem, fIdx) => (
                      <div key={fIdx} className="p-5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2 shadow-inner">
                        <div className="font-bold text-white text-sm sm:text-base">{faqItem.q}</div>
                        <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">{faqItem.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* High-Impact SEO Hashtags & Target Keywords */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>SEO Target Keywords & Hashtags for Search Indexing:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.targetKeywords.map((kw) => (
                  <span 
                    key={kw} 
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-950/90 border border-cyan-500/20 text-cyan-300 hover:border-cyan-400/50 transition-colors shadow-sm"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Conversion Action Pitch Box */}
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950/70 via-indigo-900/40 to-slate-950 border border-indigo-500/40 text-center space-y-4 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-Risk 100% Free 24-Hour Trial Included</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                Unleash Liquid-Smooth 4K Streaming Today
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Connect your Smart TV, FireStick, or Mobile instantly. Gain instant access to all UK channels, Premium 4K sports events, anti-freeze buffers, and unthrottled streams.
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
                  onClick={() => navigateTo('/')}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors cursor-pointer border border-white/5"
                >
                  Back to Home Page
                </button>
              </div>
            </div>

          </article>

          {/* Right Column: Sticky Sidebar & Related Guides (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Conversion Widget */}
            <div className="p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl space-y-4 text-center shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 fill-emerald-400" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Instant Test Pass
                </span>
                <h3 className="font-black text-lg text-white">Free 24H VIP Trial</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Test all 4K sports channels and unthrottled matchday feeds before kickoff. Zero payment details required.
              </p>
              <button
                onClick={handleStartTrial}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-105 active:scale-95"
              >
                Start Free 24h Trial Now
              </button>
            </div>

            {/* Related Articles list */}
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-3xl space-y-5">
              
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h4 className="font-black text-sm text-white uppercase tracking-wider">Related Guides & Updates</h4>
              </div>

              <div className="space-y-4">
                {relatedPostsData.map(({ post: rPost, sharedTags }) => (
                  <div
                    key={rPost.id}
                    onClick={() => navigateTo('/blog/' + rPost.slug)}
                    className="group cursor-pointer flex gap-3 items-start hover:bg-white/5 p-2 rounded-xl transition-colors"
                  >
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0 group-hover:border-cyan-500/40 transition-colors"
                    />
                    <div className="space-y-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {rPost.title}
                      </h5>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span>{rPost.readTime}</span>
                        <span>•</span>
                        <span>{rPost.date}</span>
                      </div>
                      {sharedTags.length > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-cyan-400/90 font-medium truncate pt-0.5">
                          <Tag className="w-2.5 h-2.5 shrink-0" />
                          <span>#{sharedTags[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* UK VPN & Anti-Throttling Quick Proof Widget */}
            <div className="p-6 bg-gradient-to-b from-indigo-950/20 to-slate-900/40 border border-indigo-500/10 rounded-3xl space-y-3.5">
              <h4 className="text-xs font-black text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Virgin/BT Throttling Notice</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                UK internet service providers automatically block or throttle standard server streams during major match times. Our **Anti-Freeze v9.8** bypass routes streams dynamically, ensuring you won't experience blank screens or buffers.
              </p>
            </div>

          </aside>

        </div>

        {/* Viral Referral & Quick Sharing Bar */}
        <ShareReferralBar
          currentUrl={`${baseUrl}/blog/${post.slug}`}
          title={`${post.title} | GlobalStreamHub 4K VIP`}
        />

        {/* Dynamic Related Articles Section at Bottom of Blog Post */}
        <section className="mt-16 pt-12 border-t border-white/10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tag-Matched Recommendations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Related Articles & Recommended Guides
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Explore more streaming setups, sports blackout bypasses, and 4K tutorials dynamically suggested based on shared tags, categories, and keywords with this guide.
              </p>
            </div>

            <button
              onClick={() => navigateTo('/')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-400 hover:text-cyan-300 transition-colors shrink-0 group self-start sm:self-auto cursor-pointer"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
            </button>
          </div>

          {/* 3 Related Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedPostsData.map(({ post: rPost, sharedTags, matchScore }) => (
              <article
                key={rPost.id}
                onClick={() => navigateTo('/blog/' + rPost.slug)}
                className="group relative flex flex-col bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-[#090d21] border border-white/10 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
              >
                {/* Cover Image with hover scale */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={rPost.coverImage}
                    alt={rPost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-950/90 backdrop-blur-md text-sky-300 border border-indigo-500/30">
                      {rPost.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 pointer-events-none">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-slate-950/90 backdrop-blur-md text-slate-300 border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {rPost.readTime}
                    </span>
                  </div>

                  {/* Shared Tag Badges over Image */}
                  {sharedTags.length > 0 && (
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
                      {sharedTags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-950/95 backdrop-blur-md text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shadow-sm"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          <span>#{tag}</span>
                        </span>
                      ))}
                      {sharedTags.length > 2 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-slate-300 border border-white/10">
                          +{sharedTags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{rPost.date}</span>
                      <span>•</span>
                      <span className="text-cyan-400 font-medium">{rPost.geoFocus || 'UK'} Edition</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {rPost.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed font-normal">
                      {rPost.excerpt}
                    </p>
                  </div>

                  {/* Bottom Card Bar: Author and Read Button */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={rPost.author.avatar}
                        alt={rPost.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-indigo-500/30"
                      />
                      <span className="text-xs font-semibold text-slate-300 truncate max-w-[120px]">
                        {rPost.author.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:underline">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>

      {/* Floating 1-Click Free 24H VIP Trial Bar */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/50 shadow-[0_10px_35px_rgba(16,185,129,0.3)] p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 backdrop-blur-xl animate-fade-in">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-black text-white truncate block">
              Watch Today's 4K Match Free
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 truncate block">
              Instant 24H VIP trial • Zero credit card • 60FPS
            </span>
          </div>
        </div>

        <button
          onClick={handleStartTrial}
          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          Get 24H Pass
        </button>
      </div>

    </main>
  );
};
