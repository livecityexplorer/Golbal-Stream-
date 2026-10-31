import React, { useState, useMemo } from 'react';
import { BlogPost, BlogCategory } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import premierLeagueStadiumImg from '../assets/images/premier_league_stadium_1793368233393.jpg';
import { BlogPostModal } from './BlogPostModal';
import { 
  Newspaper, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Tag, 
  Flame, 
  Tv, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BlogSectionProps {
  onSelectPlan?: (planId: string) => void;
  navigateTo?: (path: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPlan, navigateTo }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePostClick = (post: BlogPost) => {
    if (navigateTo) {
      navigateTo('/blog/' + post.slug);
    } else {
      setActivePost(post);
    }
  };

  const categories: { id: BlogCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Updates & Guides', count: BLOG_POSTS.length },
    { id: 'sports_fixtures', label: '⚽ Sports & Fixtures', count: BLOG_POSTS.filter(p => p.category === 'sports_fixtures').length },
    { id: 'channel_updates', label: '📺 Channel Additions', count: BLOG_POSTS.filter(p => p.category === 'channel_updates').length },
    { id: 'setup_guides', label: '🛠️ Setup Guides', count: BLOG_POSTS.filter(p => p.category === 'setup_guides').length },
    { id: 'industry_news', label: '⚡ Anti-Throttling & VOD', count: BLOG_POSTS.filter(p => p.category === 'industry_news').length },
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch = 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query)) ||
        post.targetKeywords.some(k => k.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  }, []);

  const regularPosts = useMemo(() => {
    // If not searching, exclude featured from regular grid
    if (!searchQuery && selectedCategory === 'all') {
      return filteredPosts.filter(p => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, searchQuery, selectedCategory]);

  return (
    <section id="blog" className="py-20 relative bg-[#040611] text-slate-100 overflow-hidden">
      {/* Anchor alias for #news */}
      <div id="news" className="absolute -top-10 left-0" />

      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Newspaper className="w-4 h-4 text-cyan-400" />
              <span>StreamUK Editorial • Blog, News & Guides</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Latest Channel Updates, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Sports Fixtures & IPTV Guides
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Stay up to date with new 4K channel additions, Premier League 3pm blackout broadcast schedules, Amazon FireStick tutorials, and anti-throttling solutions for UK, US, and Canada viewers.
            </p>
          </div>

          {/* Search Box & Expand */}
          <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search guides, channels, fixtures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/40'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Article Hero (When viewing all and not actively searching) */}
        {!searchQuery && selectedCategory === 'all' && featuredPost && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Editor's Top Featured Guide</span>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/95 via-[#080d22] to-slate-950 border border-cyan-500/30 hover:border-cyan-400/60 shadow-2xl shadow-cyan-950/40 group transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Left Visual Image */}
                <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-video lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-slate-950">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = premierLeagueStadiumImg;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d22] via-transparent to-transparent lg:hidden opacity-80" />
                  
                  {/* Subtle Top-Left Geo & Read-time pills */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/90 text-white backdrop-blur-md shadow-lg">
                      🇬🇧 UK Focus
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/85 text-slate-200 backdrop-blur-md border border-white/10">
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>

                {/* Right Content Column */}
                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3.5">
                    
                    {/* Clean Metadata Pills Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-slate-950" />
                        Featured Story
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
                        {featuredPost.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 ml-auto">
                        <Calendar className="w-3 h-3 text-sky-400" />
                        {featuredPost.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => handlePostClick(featuredPost)}
                      className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                    >
                      {featuredPost.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Keyword Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {featuredPost.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/90 border border-white/10 text-slate-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & CTA Button */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-9 h-9 rounded-full object-cover border border-white/10"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-white">{featuredPost.author.name}</div>
                        <div className="text-[10px] text-slate-400">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePostClick(featuredPost)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer group/btn"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* Section divider when showing regular articles under featured */}
        {!searchQuery && selectedCategory === 'all' && (
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-cyan-400" />
              <span>All Articles & Latest Guides ({regularPosts.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Updated daily with 4K schedules</span>
          </div>
        )}

        {/* Regular Articles Grid */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.slice(0, isExpanded ? undefined : 3).map((post) => {
              const geoBadge = {
                UK: { text: '🇬🇧 UK', color: 'border-rose-500/30 text-rose-300 bg-rose-500/10' },
                USA: { text: '🇺🇸 USA', color: 'border-blue-500/30 text-blue-300 bg-blue-500/10' },
                Canada: { text: '🇨🇦 Canada', color: 'border-red-500/30 text-red-300 bg-red-500/10' },
                Global: { text: '🌍 Global', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10' },
              }[post.geoFocus];

              return (
                <article
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#070b1c] border border-white/10 hover:border-cyan-400/40 p-5 flex flex-col justify-between group transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="space-y-4">
                    
                    {/* Thumbnail Image */}
                    <div className="relative rounded-xl overflow-hidden aspect-video w-full bg-slate-950">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = premierLeagueStadiumImg;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${geoBadge.color}`}>
                          {geoBadge.text}
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-200">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-sky-400 font-bold uppercase tracking-wider">
                        {post.categoryLabel.split('&')[0]}
                      </span>
                      <span>{post.date}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Keyword Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/80 text-slate-300 border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Footer Card Row */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-medium text-slate-300">{post.author.name}</span>
                    </div>

                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>

                </article>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-white/5 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-base font-bold text-white">No updates found matching your filter</div>
            <p className="text-xs text-slate-400">Try adjusting your keyword search or select "All Updates & Guides".</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-sky-400 text-xs font-bold hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* SEO Long-Tail Keyword Explore Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Popular SEO Search Topics & Long-Tail Keywords:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {[
              '#PremierLeague3pmIPTV',
              '#SkySportsPlus4K',
              '#TiviMateFireStickGuide',
              '#WatchNFLRedZoneLive',
              '#VirginMediaAntiFreeze',
              '#TSN4KCanadaIPTV',
              '#EFLChampionshipLiveStreams',
              '#BestUKIPTVService2026',
              '#ChampionsLeague4KUHD',
              '#NoBufferingIPTV',
              '#DownloaderCodeFireTV',
              '#IPTV24HourTrial'
            ].map((kw) => (
              <button
                key={kw}
                onClick={() => setSearchQuery(kw.replace('#', ''))}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors font-mono cursor-pointer"
              >
                {kw}
              </button>
            ))}
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

      {/* Reader Modal */}
      <BlogPostModal
        post={activePost}
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
        onSelectPlan={onSelectPlan}
        onOpenPost={(p) => setActivePost(p)}
        navigateTo={navigateTo}
      />

    </section>
  );
};
