import React, { useState, useMemo, useEffect } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import premierLeagueStadiumImg from '../assets/images/premier_league_stadium_1793368233393.jpg';
import championsLeagueStadiumImg from '../assets/images/champions_league_stadium_1793376020117.jpg';
import elClasicoStadiumImg from '../assets/images/el_clasico_match_1793376033022.jpg';
import sanSiroStadiumImg from '../assets/images/serie_a_san_siro_1793434726269.jpg';
import bundesligaStadiumImg from '../assets/images/bundesliga_match_1793434775833.jpg';
import topFourStadiumImg from '../assets/images/german_stadium_1793434761672.jpg';
import { ShareReferralBar } from './ShareReferralBar';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  HelpCircle,
  TrendingUp,
  Link as LinkIcon,
  BookmarkCheck,
  ListOrdered,
  BadgeCheck,
  Tv,
  Globe2
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);

  const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://globalstreamhub.net';

  // Dynamic Scroll Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check which section is in view
      const sections = post.content.sections || [];
      sections.forEach((_, idx) => {
        const el = document.getElementById(`article-section-${idx}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSectionIdx(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  // Dynamic SEO Title & Meta Tag Injection for Current Blog Post URL
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${post.title} | GlobalStreamHub 4K VIP`;

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
      "image": typeof post.coverImage === 'string' ? post.coverImage : `${baseUrl}/assets/images/premier_league_stadium.jpg`,
      "datePublished": post.isoDate,
      "dateModified": post.isoDate,
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "GlobalStreamHub 4K VIP",
        "logo": {
          "@type": "ImageObject",
          "url": "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&h=630&q=80"
        }
      },
      "keywords": post.targetKeywords ? post.targetKeywords.join(', ') : ''
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

  const scrollToSection = (idx: number) => {
    const el = document.getElementById(`article-section-${idx}`);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth'
      });
      setActiveSectionIdx(idx);
    }
  };

  // Find image fallback based on slug/category
  const coverFallback = useMemo(() => {
    if (post.slug.includes('champions-league')) return championsLeagueStadiumImg;
    if (post.slug.includes('la-liga') || post.slug.includes('clasico')) return elClasicoStadiumImg;
    if (post.slug.includes('serie-a') || post.slug.includes('scudetto')) return sanSiroStadiumImg;
    if (post.slug.includes('bundesliga')) return bundesligaStadiumImg;
    if (post.slug.includes('top-four') || post.slug.includes('top-4')) return topFourStadiumImg;
    return premierLeagueStadiumImg;
  }, [post.slug]);

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

  return (
    <main className="min-h-screen pt-20 pb-20 bg-[#080a10] text-zinc-200 selection:bg-cyan-500/20 selection:text-cyan-200 relative overflow-hidden font-sans">
      
      {/* Top Fixed Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Subtle Ambient Background Gradient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-cyan-950/20 via-indigo-950/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb & Link Header */}
        <nav aria-label="Breadcrumb" className="mb-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <button
              onClick={() => navigateTo('/')}
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
              <span>Dashboard</span>
            </button>
            <span className="text-zinc-600">/</span>
            <button
              onClick={() => navigateTo('/')}
              className="hover:text-zinc-200 transition-colors cursor-pointer"
            >
              {post.categoryLabel || 'Editorial'}
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-300 font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {post.title}
            </span>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800/90 px-3.5 py-1.5 rounded-lg border border-zinc-700/60 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Copy Direct Link to Article"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </nav>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Reading Column (8 Cols) */}
          <article className="lg:col-span-8 bg-[#0d1017]/95 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl space-y-10">
            
            {/* Editorial Header Section */}
            <header className="space-y-6">
              
              {/* Unboxed Typographic Metadata */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-400">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
                  {post.categoryLabel}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="flex items-center gap-1 text-zinc-300">
                  <Globe2 className="w-3.5 h-3.5 text-zinc-400" />
                  {post.geoFocus ? `${post.geoFocus} Broadcast Edition` : 'Global 4K Edition'}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="flex items-center gap-1 text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                  {post.readTime}
                </span>
                {post.featured && (
                  <>
                    <span className="text-zinc-600">·</span>
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      Editor's Pick
                    </span>
                  </>
                )}
              </div>

              {/* Main Headline H1 */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black text-zinc-50 tracking-tight leading-[1.2] font-sans">
                {post.title}
              </h1>

              {/* Standfirst / Excerpt */}
              <p className="text-base sm:text-lg md:text-xl text-zinc-300/90 leading-relaxed font-normal">
                {post.excerpt}
              </p>

              {/* Author Attribution Bar */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80';
                    }}
                    className="w-11 h-11 rounded-full object-cover border border-zinc-700/80 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-zinc-100 text-sm sm:text-base">
                      <span>{post.author.name}</span>
                      <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0" title="Verified Sports Analyst" />
                    </div>
                    <div className="text-xs text-zinc-400 font-normal">
                      {post.author.role} · Published {post.date}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                  <Tv className="w-3.5 h-3.5 text-cyan-400" />
                  <span>4K UHD 60FPS Verified</span>
                </div>
              </div>

            </header>

            {/* High-Resolution Cinematic Hero Cover */}
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-xl aspect-[16/9] max-h-[440px] w-full bg-zinc-950">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = coverFallback;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Embedded tags on image */}
                {post.tags && post.tags.length > 0 && (
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 text-zinc-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 italic text-right pr-1">
                Broadcast photo ingest: European & UK sports feed telemetry.
              </p>
            </div>

            {/* Executive Highlights & Key Takeaways Card */}
            {post.content.keyTakeaways && post.content.keyTakeaways.length > 0 && (
              <section aria-label="Key Takeaways" className="p-6 sm:p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-zinc-100 font-bold text-base sm:text-lg">
                  <BookmarkCheck className="w-5 h-5 text-cyan-400" />
                  <span>Key Findings & Tactical Takeaways</span>
                </div>
                <ul className="grid grid-cols-1 gap-3 text-sm text-zinc-300">
                  {post.content.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* In-Article Mobile Table of Contents Quick Jump */}
            {post.content.sections && post.content.sections.length > 0 && (
              <div className="lg:hidden p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                  <ListOrdered className="w-4 h-4 text-cyan-400" />
                  <span>Table of Contents (Jump to Section)</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {post.content.sections.map((sec, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToSection(idx)}
                      className="block w-full text-left py-1 text-zinc-400 hover:text-cyan-300 transition-colors truncate"
                    >
                      <span className="text-zinc-600 font-mono mr-2">0{idx + 1}.</span>
                      {sec.heading}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Long-Form Editorial Article Body */}
            <div className="space-y-10 text-zinc-300 text-base leading-relaxed">
              
              {/* Executive Summary Standfirst */}
              {post.content.summary && (
                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-zinc-200 text-base sm:text-lg leading-relaxed font-normal">
                  {post.content.summary}
                </div>
              )}

              {/* Sequential Sections */}
              {post.content.sections && post.content.sections.map((section, sIdx) => (
                <section 
                  key={sIdx} 
                  id={`article-section-${sIdx}`}
                  className="space-y-5 pt-4 scroll-mt-24 border-t border-zinc-800/60 first:border-0"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                      <span className="w-4 h-[1px] bg-cyan-400/50" />
                      <span>Section 0{sIdx + 1}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
                      {section.heading}
                    </h2>
                  </div>

                  {section.subheading && (
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-200">
                      {section.subheading}
                    </h3>
                  )}

                  {/* Body Paragraphs */}
                  {section.body && section.body.map((p, pIdx) => (
                    <p key={pIdx} className="text-zinc-300 leading-relaxed text-sm sm:text-base font-normal">
                      {p}
                    </p>
                  ))}

                  {/* Key Stats Cards Grid */}
                  {section.statCards && section.statCards.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-4">
                      {section.statCards.map((stat, stIdx) => (
                        <div 
                          key={stIdx}
                          className="p-4 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-zinc-800/80 hover:border-cyan-500/30 transition-all shadow-sm"
                        >
                          <div className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider mb-1 truncate">
                            {stat.label}
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono flex items-baseline gap-1.5">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">
                              {stat.value}
                            </span>
                            {stat.change && (
                              <span className="text-[10px] font-bold text-emerald-400 font-sans">
                                {stat.change}
                              </span>
                            )}
                          </div>
                          {stat.description && (
                            <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                              {stat.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Statistical Comparison Data Table */}
                  {section.table && section.table.headers && section.table.rows && (
                    <div className="my-6 space-y-2">
                      {section.table.caption && (
                        <div className="text-xs font-mono font-semibold text-cyan-400 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{section.table.caption}</span>
                        </div>
                      )}
                      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60 shadow-lg">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
                          <thead>
                            <tr className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-300 font-mono text-[11px] uppercase tracking-wider">
                              {section.table.headers.map((th, thIdx) => (
                                <th 
                                  key={thIdx} 
                                  className={`py-3 px-3.5 font-bold ${thIdx === 0 ? 'text-zinc-100' : 'text-right'}`}
                                >
                                  {th}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800/60 font-mono text-zinc-300">
                            {section.table.rows.map((row, rIdx) => (
                              <tr 
                                key={rIdx} 
                                className="hover:bg-cyan-500/5 transition-colors group"
                              >
                                {row.map((cell, cIdx) => (
                                  <td 
                                    key={cIdx} 
                                    className={`py-2.5 px-3.5 ${
                                      cIdx === 0 
                                        ? 'font-sans font-semibold text-zinc-100 group-hover:text-cyan-300' 
                                        : 'text-right text-zinc-400 font-mono'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Structured List Items */}
                  {section.listItems && section.listItems.length > 0 && (
                    <div className="space-y-3 pl-1 pt-1">
                      {section.listItems.map((li, liIdx) => (
                        <div key={liIdx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2.5" />
                          <span className="leading-relaxed">{li}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Callout / Insight Box */}
                  {section.tipBox && (
                    <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/25 text-amber-200/90 text-sm font-medium flex items-start gap-3.5 mt-4 shadow-sm">
                      <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">{section.tipBox}</div>
                    </div>
                  )}
                </section>
              ))}

              {/* Embedded Frequently Asked Questions (FAQ) */}
              {post.content.faq && post.content.faq.length > 0 && (
                <section aria-label="Frequently Asked Questions" className="space-y-5 pt-8 border-t border-zinc-800">
                  <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-zinc-100">
                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <div className="space-y-3">
                    {post.content.faq.map((faqItem, fIdx) => (
                      <div key={fIdx} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                        <h4 className="font-bold text-zinc-100 text-sm sm:text-base">{faqItem.q}</h4>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{faqItem.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* SEO Keyword & Search Tags */}
            {post.targetKeywords && post.targetKeywords.length > 0 && (
              <div className="pt-6 border-t border-zinc-800/80 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Search Index Topics:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.targetKeywords.map((kw) => (
                    <span 
                      key={kw} 
                      className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Single End-of-Article Free Trial VIP CTA (Prompt 9 & 10 Compliance: Clean, authoritative, single CTA) */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-indigo-950/40 border border-indigo-500/30 text-center space-y-5 shadow-2xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant 24-Hour Free Pass — No Credit Card Required</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Stream Every Match in 4K UHD 60FPS
              </h3>

              <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
                Connect your FireStick, Smart TV, Apple TV, or mobile device in under 60 seconds. Test unthrottled live football, interactive EPGs, and anti-freeze streams risk-free before kickoff.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <button
                  onClick={handleStartTrial}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Start Free 24h VIP Trial</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('/')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm transition-colors cursor-pointer border border-zinc-700/60"
                >
                  Back to Dashboard
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-zinc-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Zero commitments
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Instant automated login
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  All 4K sports channels
                </span>
              </div>
            </div>

          </article>

          {/* Right Column: Sticky Table of Contents & Related Articles (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Desktop Interactive Table of Contents */}
            {post.content.sections && post.content.sections.length > 0 && (
              <div className="p-6 bg-[#0d1017]/95 border border-zinc-800/80 rounded-3xl space-y-4 shadow-lg hidden lg:block">
                <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                  <ListOrdered className="w-4 h-4 text-cyan-400" />
                  <span>On This Page</span>
                </div>

                <nav className="space-y-1">
                  {post.content.sections.map((sec, idx) => {
                    const isActive = activeSectionIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(idx)}
                        className={`w-full text-left py-2 px-3 rounded-lg text-xs transition-all flex items-start gap-2 cursor-pointer ${
                          isActive 
                            ? 'bg-zinc-800 text-cyan-300 font-semibold border-l-2 border-cyan-400' 
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                        }`}
                      >
                        <span className="font-mono text-zinc-500 shrink-0">0{idx + 1}.</span>
                        <span className="line-clamp-2 leading-snug">{sec.heading}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Related Articles in Same Category / Shared Tags */}
            <div className="p-6 bg-[#0d1017]/95 border border-zinc-800/80 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-200">More Match Guides</h3>
              </div>

              <div className="space-y-3.5">
                {relatedPostsData.map(({ post: rPost }) => (
                  <div
                    key={rPost.id}
                    onClick={() => navigateTo('/blog/' + rPost.slug)}
                    className="group cursor-pointer flex gap-3.5 items-start hover:bg-zinc-900/60 p-2 rounded-xl transition-colors"
                  >
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = premierLeagueStadiumImg;
                      }}
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-800 shrink-0 group-hover:border-cyan-500/40 transition-colors"
                    />
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {rPost.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                        <span>{rPost.readTime}</span>
                        <span>·</span>
                        <span>{rPost.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ISP Anti-Throttling Architecture Technical Notice */}
            <div className="p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-3xl space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Anti-Freeze Edge Architecture</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Major match broadcasts routinely cause ISP congestion on Virgin Media, BT, and Sky broadband. Our private 10Gbps London and European edge peering automatically routes around congested ISP gates, preventing stream freezing.
              </p>
            </div>

          </aside>

        </div>

        {/* Viral Social Referral Bar */}
        <div className="mt-12">
          <ShareReferralBar
            currentUrl={`${baseUrl}/blog/${post.slug}`}
            title={`${post.title} | GlobalStreamHub 4K VIP`}
          />
        </div>

        {/* Dynamic Related Articles Section at Bottom of Blog Post */}
        <section aria-label="Recommended Articles" className="mt-16 pt-12 border-t border-zinc-800 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                <span>Recommended Reading</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                Recommended Match & Streaming Guides
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                Explore our comprehensive library of 4K match previews, tactical predictions, and buffer-free streaming walkthroughs.
              </p>
            </div>

            <button
              onClick={() => navigateTo('/')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-cyan-300 transition-colors shrink-0 group self-start sm:self-auto cursor-pointer"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
            </button>
          </div>

          {/* 3 Related Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPostsData.map(({ post: rPost }) => (
              <article
                key={rPost.id}
                onClick={() => navigateTo('/blog/' + rPost.slug)}
                className="group relative flex flex-col bg-[#0d1017] border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={rPost.coverImage}
                    alt={rPost.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = premierLeagueStadiumImg;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-zinc-900/90 backdrop-blur-md text-zinc-200 border border-zinc-700/60">
                      {rPost.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 pointer-events-none">
                    <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-zinc-900/90 backdrop-blur-md text-zinc-300 border border-zinc-700/60 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400/80" />
                      {rPost.readTime}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{rPost.date}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {rPost.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                      {rPost.excerpt}
                    </p>
                  </div>

                  {/* Bottom Author Row */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3 text-xs">
                    <span className="text-zinc-400 font-medium truncate">
                      {rPost.author.name}
                    </span>

                    <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:underline">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};
