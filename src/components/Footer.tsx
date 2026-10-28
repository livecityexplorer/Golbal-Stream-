import React from 'react';
import { Tv, MessageSquare, ShieldCheck, Zap, Mail, ArrowUp, Globe } from 'lucide-react';
import { ThemeCustomization } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface FooterProps {
  themeConfig?: ThemeCustomization;
  onOpenDeviceGuide?: () => void;
  onOpenSpeedTest?: () => void;
  onOpenCookieSettings?: () => void;
  onOpenDomainAdvisor?: () => void;
  onOpenTrafficBooster?: () => void;
  onOpenFreeTrial?: () => void;
  navigateTo?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  themeConfig,
  onOpenDeviceGuide,
  onOpenSpeedTest,
  onOpenCookieSettings,
  onOpenDomainAdvisor,
  onOpenTrafficBooster,
  onOpenFreeTrial,
  navigateTo,
}) => {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const brandName = themeConfig?.brandName || 'GlobalStreamHub 4K';
  const brandTagline = themeConfig?.brandTagline || 'Ultra HD Global Sports & Cinema Media Portal';
  const whatsappNumber = themeConfig?.whatsappNumber || '+44 7731 454811';
  const supportEmail = themeConfig?.supportEmail || 'support@globalstreamhub.net';

  return (
    <footer className="bg-[#03050d] border-t border-indigo-500/20 text-slate-400 text-xs pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => {
                if (navigateTo) {
                  navigateTo('/');
                } else {
                  window.location.hash = '';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-3 group cursor-pointer bg-transparent border-none p-0 text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25">
                <div className="w-full h-full bg-[#060814] rounded-[14px] flex items-center justify-center">
                  <Tv className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white">{brandName}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-500/20 text-sky-300 border border-indigo-500/30">
                  UK • USA • CA • EUROPE
                </span>
              </div>
            </button>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {brandTagline}. {t.footer.brandDescription}
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 pt-1">
              <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/5 font-medium">🇬🇧 🇺🇸 🇨🇦 🇪🇺 London, Frankfurt, Amsterdam & NY</span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/5 font-medium">⚡ Anti-Freeze v9.8</span>
            </div>

            {/* Language Selector in Footer */}
            <div className="pt-3">
              <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.nav.selectLanguage || 'Language / Region'}:</span>
              </div>
              <LanguageSwitcher />
            </div>
          </div>

          {/* TV Packages & Regional Hubs */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Regional Hubs (UK, USA, CA & EU)</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <button 
                onClick={() => navigateTo ? navigateTo('/uk-iptv') : (window.location.pathname = '/uk-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇬🇧</span> UK IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/usa-iptv') : (window.location.pathname = '/usa-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇺🇸</span> USA IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/canada-iptv') : (window.location.pathname = '/canada-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇨🇦</span> Canada IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/ireland-iptv') : (window.location.pathname = '/ireland-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇮🇪</span> Ireland IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/germany-iptv') : (window.location.pathname = '/germany-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇩🇪</span> Germany IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/france-iptv') : (window.location.pathname = '/france-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇫🇷</span> France IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/spain-iptv') : (window.location.pathname = '/spain-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇪🇸</span> Spain IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/italy-iptv') : (window.location.pathname = '/italy-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇮🇹</span> Italy IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/netherlands-iptv') : (window.location.pathname = '/netherlands-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇳🇱</span> Netherlands IPTV
              </button>
              <button 
                onClick={() => navigateTo ? navigateTo('/europe-iptv') : (window.location.pathname = '/europe-iptv')}
                className="text-sky-400 hover:underline text-left flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>🇪🇺</span> All Europe IPTV
              </button>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-white/5 text-xs text-slate-400">
              <li><a href="#sports" className="hover:text-sky-300 transition-colors">Sky Sports & TNT Sports 4K</a></li>
              <li><a href="#sports" className="hover:text-sky-300 transition-colors">Premier League 3pm Matches Live</a></li>
              <li><a href="#sports" className="hover:text-sky-300 transition-colors">UEFA Champions League Multi-Audio</a></li>
            </ul>
          </div>

          {/* Setup & Tools */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t.footer.deviceSetup}</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => navigateTo ? navigateTo('/setup') : onOpenDeviceGuide()} className="text-cyan-400 hover:underline text-left flex items-center gap-1 font-bold cursor-pointer"><span>🛠️</span> All Device Setup Guides</button></li>
              <li><button onClick={() => navigateTo ? navigateTo('/setup/firestick-smarters-pro') : onOpenDeviceGuide()} className="hover:text-sky-300 transition-colors text-left cursor-pointer">IPTV Smarters Pro FireStick</button></li>
              <li><button onClick={() => navigateTo ? navigateTo('/setup/firestick-tivimate') : onOpenDeviceGuide()} className="hover:text-sky-300 transition-colors text-left cursor-pointer">TiviMate 4K Sideload Guide</button></li>
              <li><button onClick={() => navigateTo ? navigateTo('/setup/smart-tv-ibo-player') : onOpenDeviceGuide()} className="hover:text-sky-300 transition-colors text-left cursor-pointer">Samsung & LG Smart TV (IBO)</button></li>
              <li><button onClick={() => navigateTo ? navigateTo('/setup/apple-tv-iptvx') : onOpenDeviceGuide()} className="hover:text-sky-300 transition-colors text-left cursor-pointer">Apple TV 4K & iPhone (IPTVX)</button></li>
              <li><button onClick={() => navigateTo ? navigateTo('/setup/formuler-mytvonline3') : onOpenDeviceGuide()} className="hover:text-sky-300 transition-colors text-left cursor-pointer">Formuler Z11 & MAG Stalker</button></li>
              <li><button onClick={onOpenSpeedTest} className="text-sky-400 hover:underline text-left flex items-center gap-1 font-bold cursor-pointer"><Zap className="w-3 h-3" /> {t.footer.speedTest}</button></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t.footer.supportHelp}</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-2 font-bold transition-colors group"
                >
                  <span className="w-5 h-5 rounded-md bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </span>
                  <span>WhatsApp VIP Support</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/${(themeConfig?.telegramUser || '@cbrtvuk').replace(/^@/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-2 font-bold transition-colors group"
                >
                  <span className="w-5 h-5 rounded-md bg-[#0088cc] flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.943z"/>
                    </svg>
                  </span>
                  <span>Telegram VIP Support</span>
                </a>
              </li>
              <li>
                <a
                  href={themeConfig?.discordUrl || 'https://discord.gg/QyNQRYwJj3'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#8ea1e1] hover:text-indigo-300 hover:underline flex items-center gap-2 font-bold transition-colors group"
                >
                  <span className="w-5 h-5 rounded-md bg-[#5865F2] flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 127.14 96.36">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z"/>
                    </svg>
                  </span>
                  <span>Discord VIP Community</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${supportEmail}`} className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{supportEmail}</span>
                </a>
              </li>
              <li><a href="#faq" className="hover:text-sky-300 transition-colors">{t.footer.vpnFaqs}</a></li>
              <li>
                {onOpenFreeTrial ? (
                  <button
                    onClick={onOpenFreeTrial}
                    className="hover:text-sky-300 transition-colors text-left cursor-pointer flex items-center gap-1"
                  >
                    <span>{t.footer.trialPass}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">Free</span>
                  </button>
                ) : (
                  <a href="#pricing" className="hover:text-sky-300 transition-colors">{t.footer.trialPass}</a>
                )}
              </li>
              {onOpenTrafficBooster && (
                <li>
                  <button
                    onClick={onOpenTrafficBooster}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>🚀 Get Visitors &amp; Growth Strategy</span>
                  </button>
                </li>
              )}
              {onOpenCookieSettings && (
                <li>
                  <button
                    onClick={onOpenCookieSettings}
                    className="text-sky-400/90 hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.footer.cookiePreferences || 'Cookie & Privacy Preferences'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* SEO Keyword Topic Directory - Collapsed by default to prevent visual clutter on mobile & desktop while preserving 100% crawler indexing and internal links */}
        <details className="py-3 border-b border-white/5 group">
          <summary className="text-[11px] text-slate-500 hover:text-slate-400 font-medium cursor-pointer flex items-center justify-between list-none select-none py-1 transition-colors">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
              <span>Popular IPTV Search Topics &amp; Regional Index</span>
            </span>
            <span className="text-[10px] text-slate-500 group-open:hidden transition-colors">+ Expand Topics</span>
            <span className="text-[10px] text-slate-500 hidden group-open:inline transition-colors">− Collapse</span>
          </summary>
          
          <div className="pt-3 pb-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-slate-400">
            <a 
              href="/uk-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/uk-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇬🇧 UK IPTV (3PM Premier League Blackout Bypass)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/usa-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/usa-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇺🇸 USA IPTV (NFL Sunday Ticket &amp; NBA Pass)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/canada-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/canada-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇨🇦 Canada IPTV (TSN 4K &amp; NHL)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/ireland-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/ireland-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇮🇪 Ireland IPTV (RTÉ, GAA GO &amp; Premier Sports)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/germany-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/germany-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇩🇪 IPTV Deutschland (Sky Bundesliga 4K &amp; DAZN)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/france-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/france-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇫🇷 IPTV France (Canal+ 4K, beIN &amp; Ligue 1)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/spain-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/spain-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇪🇸 IPTV España (Deportes 4K, TDT &amp; Entretenimiento)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/italy-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/italy-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇮🇹 IPTV Italia (Serie A 4K, Sky Sport &amp; DAZN)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/netherlands-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/netherlands-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇳🇱 IPTV Nederland (Eredivisie 4K &amp; Viaplay F1)
            </a>
            <span className="text-slate-700">•</span>
            
            <a 
              href="/europe-iptv" 
              onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('/europe-iptv'); } }} 
              className="hover:text-sky-300 text-sky-400 font-medium cursor-pointer"
            >
              🇪🇺 Europe IPTV (18,500+ EU Channels &amp; F1)
            </a>
            <span className="text-slate-700">•</span>
            
            <a href="#pricing" className="hover:text-sky-300 transition-colors font-semibold text-sky-400">Best IPTV UK 2026</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors font-semibold text-sky-400">Buy IPTV</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors font-semibold text-sky-400">UK IPTV Subscription</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors">Buy IPTV Subscription 2026</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors">Buy IPTV UK</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors">Best IPTV Provider UK</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors">Best IPTV Service UK</a>
            <span className="text-slate-700">•</span>
            <a href="#sports" className="hover:text-sky-300 transition-colors">Sports IPTV (Premier League 4K 60FPS)</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors">Cheap IPTV UK &amp; Europe</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors">Reliable IPTV (Anti-Freeze v9.8)</a>
            <span className="text-slate-700">•</span>
            <a href="#pricing" className="hover:text-sky-300 transition-colors">24H Free IPTV Trial</a>
            <span className="text-slate-700">•</span>
            <a href="#setup" className="hover:text-sky-300 transition-colors">Best IPTV for FireStick</a>
            <span className="text-slate-700">•</span>
            <a href="#setup" className="hover:text-sky-300 transition-colors">TiviMate Premium IPTV</a>
            <span className="text-slate-700">•</span>
            <a href="#sports" className="hover:text-sky-300 transition-colors">UEFA Champions League 4K Multi-Audio</a>
          </div>
        </details>

        {/* Legal Disclaimer & DMCA Notice */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-500 leading-relaxed">
          <p className="font-semibold text-slate-400 mb-1">
            ⚖️ Legal Disclaimer &amp; Copyright Compliance (DMCA Policy):
          </p>
          <p>
            {brandName} is an informational media software index and middleware portal. We do not host, broadcast, archive, or transmit any audio/video media streams or copyrighted content on or through our servers. All product names, logos, sports leagues, and trademarks referenced are property of their respective owners and are used purely for nominative descriptive identification under Fair Use principles. If you are a copyright owner or authorized agent wishing to request immediate removal of references, please contact our designated compliance agent at <a href="mailto:dmca@globalstreamhub.net" className="text-sky-400 hover:underline">dmca@globalstreamhub.net</a>. All valid requests are processed within 24–48 hours.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <p>© {new Date().getFullYear()} {brandName}. {t.footer.allRightsReserved}</p>
            {onOpenCookieSettings && (
              <>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <button
                  onClick={onOpenCookieSettings}
                  className="text-slate-400 hover:text-sky-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-sky-400" />
                  <span>{t.footer.cookiePreferences || 'Privacy & Cookies'}</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">{t.footer.acceptedPayments}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 border border-white/10 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
