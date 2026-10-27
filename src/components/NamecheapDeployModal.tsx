import React, { useState } from 'react';
import { 
  Server, 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  FileCode, 
  Globe, 
  Layers, 
  Cpu, 
  Terminal,
  FolderArchive,
  Lock,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import JSZip from 'jszip';

interface NamecheapDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HTACCESS_CONTENT = `# ==============================================================================
# NAMECHEAP STELLAR PLUS HOSTING - PRODUCTION APACHE CONFIGURATION
# Optimized for Ultra-Fast Loading, Core Web Vitals, Gzip, SSL & SPA Routing
# ==============================================================================

# 1. PREVENT DIRECTORY LISTING
Options -Indexes

# 2. FORCE UTF-8 ENCODING
AddDefaultCharset UTF-8
AddType 'text/html; charset=UTF-8' html

# 3. MIME TYPES FOR MODERN WEB FORMATS
<IfModule mod_mime.c>
  AddType application/javascript js mjs
  AddType text/css css
  AddType image/svg+xml svg svgz
  AddType image/webp webp
  AddType image/avif avif
  AddType font/woff2 woff2
  AddType font/woff woff
  AddType application/json json
</IfModule>

# 4. GZIP / DEFLATE COMPRESSION (Google Core Web Vitals)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css text/javascript
  AddOutputFilterByType DEFLATE application/xml application/xhtml+xml application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml font/woff font/woff2
</IfModule>

# 5. BROWSER CACHING & EXPIRES HEADERS
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# 6. CACHE-CONTROL & SECURITY HEADERS
<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js|woff2|woff|ttf|png|jpg|jpeg|webp|svg)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
  </FilesMatch>
  <FilesMatch "\\.(html|htm)$">
    Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
  </FilesMatch>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# 7. REWRITE ENGINE: FORCE HTTPS & SPA ROUTING FALLBACK
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Force HTTPS (cPanel AutoSSL Compatible)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Don't rewrite files or directories that exist
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # SPA fallback to index.html
  RewriteRule ^ index.html [L]
</IfModule>`;

const ROBOTS_CONTENT = `# Robots.txt for GlobalStreamHub IPTV Service
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /checkout/success/

Sitemap: https://globalstreamhub.net/sitemap.xml`;

const SITEMAP_CONTENT = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://globalstreamhub.net/</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://globalstreamhub.net/#sports</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://globalstreamhub.net/#channels</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://globalstreamhub.net/#pricing</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

export const NamecheapDeployModal: React.FC<NamecheapDeployModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'github' | 'checklist' | 'htaccess' | 'dns' | 'multidomain'>('github');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDirectDeploying, setIsDirectDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleDirectDeploy = async () => {
    try {
      setIsDirectDeploying(true);
      setDeployResult(null);
      const res = await fetch('/api/deploy', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setDeployResult({ success: true, message: '🎉 Live build successfully deployed to https://globalstreamhub.net!' });
      } else {
        setDeployResult({ success: false, message: data.error || 'Deployment failed. Please check server connection.' });
      }
    } catch (err: any) {
      setDeployResult({ success: false, message: err.message || 'Network error during deployment.' });
    } finally {
      setIsDirectDeploying(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleDownloadDeployPackage = async () => {
    try {
      setIsZipping(true);
      // Directly trigger download of the compiled production ZIP
      const link = document.createElement('a');
      link.href = '/streamuk-production-build.zip';
      link.download = 'streamuk-production-build.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsZipping(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to download deployment ZIP:', err);
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-slate-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
              <Server className="w-3.5 h-3.5" />
              <span>Namecheap Stellar Plus Optimization & cPanel Guide</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              Deploy to Namecheap Stellar Plus Hosting
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Production Apache configuration, free AutoSSL setup, Gzip acceleration, and SPA routing.
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

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Gzip & Brotli</span>
            </div>
            <p className="text-[11px] text-slate-400">95+ PageSpeed score on Apache mod_deflate</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="text-sky-400 font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Free AutoSSL</span>
            </div>
            <p className="text-[11px] text-slate-400">HTTPS rewrite with Sectigo / cPanel SSL</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="text-indigo-400 font-bold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Unlimited Addons</span>
            </div>
            <p className="text-[11px] text-slate-400">Host UK (.co.uk) & US (.com) simultaneously</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SPA .htaccess</span>
            </div>
            <p className="text-[11px] text-slate-400">Zero 404 errors on page reload</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'github' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            🐙 GitHub Pages (Free $0)
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'checklist' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 Namecheap EasyWP / cPanel
          </button>
          <button
            onClick={() => setActiveTab('htaccess')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'htaccess' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ .htaccess Config
          </button>
          <button
            onClick={() => setActiveTab('dns')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'dns' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            🌐 DNS Records
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'github' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="text-lg">🐙</span>
                  <span>GitHub Pages Free $0 Hosting Setup Guide</span>
                </h4>
                <button
                  onClick={handleDownloadDeployPackage}
                  disabled={isZipping}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadSuccess ? 'Downloaded!' : 'Download Compiled Build ZIP'}</span>
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Your application is now 100% pre-configured with <code className="text-cyan-300">.github/workflows/deploy.yml</code>, <code className="text-cyan-300">CNAME</code>, <code className="text-cyan-300">404.html</code>, <code className="text-cyan-300">sitemap.xml</code>, and <code className="text-cyan-300">robots.txt</code> for GitHub Pages with your custom domain <code className="text-cyan-300">globalstreamhub.net</code>!
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1.5">
                  <strong className="text-emerald-400 font-bold block text-xs">Option A: Automatic Deploy via GitHub Actions (Recommended)</strong>
                  <p className="text-slate-400">
                    1. Push this code repository to your GitHub account on branch <code className="text-white">main</code>.<br />
                    2. In your GitHub Repo, go to <strong>Settings &gt; Pages &gt; Source</strong> and select <strong className="text-emerald-300">GitHub Actions</strong>.<br />
                    3. GitHub will automatically run <code className="text-cyan-300">.github/workflows/deploy.yml</code> and publish your site live in 60 seconds!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1.5">
                  <strong className="text-sky-400 font-bold block text-xs">Option B: Upload Extracted Build Files Directly to GitHub Repo</strong>
                  <p className="text-slate-400">
                    1. Click <strong>Download Compiled Build ZIP</strong> above (or download <code className="text-cyan-300">streamuk-production-build.zip</code>).<br />
                    2. Unzip the file on your computer. Inside you will find <code className="text-white">index.html</code>, <code className="text-white">404.html</code>, <code className="text-white">CNAME</code>, <code className="text-white">sitemap.xml</code>, <code className="text-white">robots.txt</code>, and the <code className="text-white">assets/</code> folder.<br />
                    3. On GitHub.com, click <strong>Add file &gt; Upload files</strong> and drag-and-drop all extracted contents into your repository root.<br />
                    4. Go to <strong>Settings &gt; Pages &gt; Source</strong>: select <strong>Deploy from a branch</strong> (<code className="text-white">main</code> / <code className="text-white">/root</code>).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                  <strong className="text-purple-400 font-bold block text-xs">Namecheap Custom Domain DNS Setup for globalstreamhub.net</strong>
                  <p className="text-slate-400">
                    In Namecheap Domain Manager &gt; Advanced DNS, add the 4 official GitHub Pages A-Records:
                  </p>
                  <div className="font-mono text-[11px] text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 mt-1">
                    <div>A Record @ -&gt; 185.199.108.153</div>
                    <div>A Record @ -&gt; 185.199.109.153</div>
                    <div>A Record @ -&gt; 185.199.110.153</div>
                    <div>A Record @ -&gt; 185.199.111.153</div>
                    <div>CNAME Record www -&gt; globalstreamhub.net</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <div className="space-y-3 text-xs leading-relaxed">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0 text-sm">
                  1
                </div>
                <div className="space-y-1">
                  <strong className="text-white font-bold text-sm block">Export or Build Your Static Files</strong>
                  <p className="text-slate-400">
                    Run <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">npm run build</code> locally. This generates the production <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">dist/</code> folder containing all compiled HTML, CSS, JavaScript, and the optimized <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">.htaccess</code> file.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0 text-sm">
                  2
                </div>
                <div className="space-y-1">
                  <strong className="text-white font-bold text-sm block">Upload to cPanel File Manager (public_html)</strong>
                  <p className="text-slate-400">
                    Log into <strong>Namecheap &gt; Hosting List &gt; Go to cPanel &gt; File Manager</strong>. Open <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">public_html</code>, click <strong>Upload</strong>, select your zipped dist folder, and extract its files directly into <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">public_html</code>.
                  </p>
                  <div className="text-[11px] text-amber-300/90 pt-1">
                    💡 Tip: In File Manager top right, click <strong>Settings</strong> and ensure <em>"Show Hidden Files (dotfiles)"</em> is checked so <code className="text-white">.htaccess</code> is visible.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0 text-sm">
                  3
                </div>
                <div className="space-y-1">
                  <strong className="text-white font-bold text-sm block">Activate Free AutoSSL in cPanel</strong>
                  <p className="text-slate-400">
                    In cPanel search for <strong>SSL/TLS Status</strong>, select your domain, and click <strong className="text-emerald-400">Run AutoSSL</strong>. Namecheap automatically installs a verified SSL certificate within 2-5 minutes. The provided <code className="text-white">.htaccess</code> will automatically redirect all HTTP traffic to HTTPS.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0 text-sm">
                  4
                </div>
                <div className="space-y-1">
                  <strong className="text-white font-bold text-sm block">Verify Live 4K Streaming Platform</strong>
                  <p className="text-slate-400">
                    Visit your domain (e.g. <code className="text-cyan-300">https://globalstreamhub.net</code>). Test live fixture filtering, trial activations, and currency switches (£/$/€).
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'htaccess' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Pre-configured for Namecheap Apache: Gzip compression, 1-year asset cache, security headers & SPA rewrite.
              </span>
              <button
                onClick={() => handleCopy(HTACCESS_CONTENT, 'htaccess')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedText === 'htaccess' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText === 'htaccess' ? 'Copied!' : 'Copy .htaccess'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300/90 overflow-x-auto max-h-[300px] leading-relaxed select-all">
              {HTACCESS_CONTENT}
            </pre>
          </div>
        )}

        {activeTab === 'dns' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>Namecheap DNS Records Configuration</span>
              </h4>
              <p className="text-slate-400">
                If your domain is registered on Namecheap and pointing to Stellar Plus hosting, use <strong>Namecheap Web Hosting DNS</strong> or point A-Records manually:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2">Type</th>
                      <th className="py-2">Host</th>
                      <th className="py-2">Value / Destination</th>
                      <th className="py-2">TTL</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2 text-emerald-400 font-bold">A Record</td>
                      <td className="py-2">@</td>
                      <td className="py-2 text-cyan-300">Your Stellar Plus Server IP (from cPanel sidebar)</td>
                      <td className="py-2">Automatic</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-emerald-400 font-bold">CNAME</td>
                      <td className="py-2">www</td>
                      <td className="py-2 text-cyan-300">yourdomain.com.</td>
                      <td className="py-2">Automatic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'multidomain' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Stellar Plus Advantage: Unlimited Addon Domains</span>
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Namecheap <strong>Stellar Plus</strong> includes <em>Unlimited Websites & Addon Domains</em> with unmetered SSD storage. You can host both your UK brand and US brand under a single $3.48/mo hosting plan!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1.5">
                  <strong className="text-emerald-400 font-bold block">Primary Domain (public_html)</strong>
                  <p className="text-slate-400 text-[11px]">
                    Your primary global domain (e.g. <code>globalstreamhub.net</code>) serves the entire world with automated currency & language detection.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1.5">
                  <strong className="text-sky-400 font-bold block">Addon Domain (/public_html/streamus4k)</strong>
                  <p className="text-slate-400 text-[11px]">
                    Go to <strong>cPanel &gt; Domains &gt; Create a New Domain</strong>. Enter <code>visionmediaservice.org</code> or <code>ethernetmedia.site</code> and set Document Root. Upload a mirror or US landing page for zero extra cost!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Message */}
        {deployResult && (
          <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 ${
            deployResult.success 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            <span>{deployResult.message}</span>
            {deployResult.success && (
              <a
                href="https://globalstreamhub.net"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-[11px] hover:bg-emerald-400 transition-colors shrink-0"
              >
                Visit Live Site →
              </a>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Automated SFTP pipeline configured for <code className="text-cyan-400 font-mono">globalstreamhub.net</code>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <button
              onClick={handleDirectDeploy}
              disabled={isDirectDeploying}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isDirectDeploying ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>Deploying to Live Server...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-yellow-300" />
                  <span>⚡ 1-Click Direct Deploy to Live</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
