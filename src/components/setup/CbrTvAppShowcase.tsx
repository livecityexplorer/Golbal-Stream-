import React, { useState } from 'react';
import { AppScreenshotItem, DetailedSetupGuide } from '../../types';
import { 
  Tv, 
  Flame, 
  Sliders, 
  Layers, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  Check, 
  ChevronRight, 
  Maximize2, 
  X, 
  ChevronLeft, 
  Sparkles,
  Download,
  Info,
  Clock,
  Zap,
  Lock
} from 'lucide-react';

interface CbrTvAppShowcaseProps {
  guide: DetailedSetupGuide;
  onSelectPlan: (planId: string) => void;
}

export const CbrTvAppShowcase: React.FC<CbrTvAppShowcaseProps> = ({
  guide,
  onSelectPlan
}) => {
  const screenshots = guide.screenshotsGallery || [];
  const settingsSections = guide.appSettingsSections || [];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalImage, setActiveModalImage] = useState<AppScreenshotItem | null>(null);
  const [activeSettingsTab, setActiveSettingsTab] = useState<number>(0);

  const categories = [
    'All',
    'Live TV',
    'MultiView & Sports',
    'VOD & Series',
    'Settings & Playlists',
    'Household & Security'
  ];

  const filteredScreenshots = selectedCategory === 'All'
    ? screenshots
    : screenshots.filter(s => s.category === selectedCategory);

  const openModal = (item: AppScreenshotItem) => {
    setActiveModalImage(item);
  };

  const closeModal = () => {
    setActiveModalImage(null);
  };

  const nextModalImage = () => {
    if (!activeModalImage) return;
    const currentIndex = filteredScreenshots.findIndex(s => s.id === activeModalImage.id);
    const nextIndex = (currentIndex + 1) % filteredScreenshots.length;
    setActiveModalImage(filteredScreenshots[nextIndex]);
  };

  const prevModalImage = () => {
    if (!activeModalImage) return;
    const currentIndex = filteredScreenshots.findIndex(s => s.id === activeModalImage.id);
    const prevIndex = (currentIndex - 1 + filteredScreenshots.length) % filteredScreenshots.length;
    setActiveModalImage(filteredScreenshots[prevIndex]);
  };

  return (
    <div className="space-y-12">
      
      {/* 1. Official App Badge & Welcome Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Our Official Recommended App</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Boss Engine Jrod Edition v1.0.39
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              CBR TV: High-Performance FireStick & Android TV Experience
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              CBR TV is custom-tuned for our 18,500+ live 4K channels and 65,000+ VOD catalog. Engineered for instant zapping, zero buffering, multi-feed sports matching, and multi-device household syncing, it is the highest-rated player for Amazon FireStick 4K and Android TV.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 flex flex-col items-center justify-center text-center gap-2 shrink-0 w-full md:w-auto shadow-xl">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Official Downloader Code
            </span>
            <span className="font-mono text-3xl font-black text-cyan-300 tracking-wider">
              2130837
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Direct APK • No Card Required
            </span>
          </div>
        </div>
      </div>

      {/* 2. Critical App Settings & Recommendations (DVR vs Timeshift Rule) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <Sliders className="w-6 h-6 text-cyan-400" />
              <span>Official App Settings Walkthrough & Golden Rules</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Follow these recommended configurations to maximize speed, save device storage, and unlock cable-style navigation.
            </p>
          </div>
        </div>

        {/* Golden Rules Alert Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-black text-amber-300">
                CRITICAL SETUP RULE: Leave Settings → Recording → DVR Turned OFF
              </h4>
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed max-w-3xl">
                Do not enable scheduled, manual, or team series DVR recordings. DVR consumes massive internal storage and is unnecessary because <strong>7-Day Catchup</strong> is already stored in the cloud. You may safely enable <strong>Timeshift</strong> (Off by default) for live pause and rewind using temporary buffer memory.
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black whitespace-nowrap self-start lg:self-center">
            Zero-Disk Bloat
          </span>
        </div>

        {/* Interactive Settings Tabs & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Settings Tab Selector */}
          <div className="lg:col-span-4 space-y-2">
            {settingsSections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSettingsTab(idx)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                  activeSettingsTab === idx
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 font-bold'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900/90 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className={`w-2 h-2 rounded-full ${activeSettingsTab === idx ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                  <span className="text-xs sm:text-sm truncate">{sec.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeSettingsTab === idx ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>

          {/* Active Settings Section Detail Card */}
          {settingsSections[activeSettingsTab] && (
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    {settingsSections[activeSettingsTab].category}
                  </span>
                  <h4 className="text-xl font-black text-white">
                    {settingsSections[activeSettingsTab].title}
                  </h4>
                </div>
                {settingsSections[activeSettingsTab].recommendedBadge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 self-start sm:self-center">
                    {settingsSections[activeSettingsTab].recommendedBadge}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {settingsSections[activeSettingsTab].summary}
              </p>

              {settingsSections[activeSettingsTab].warningNote && (
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{settingsSections[activeSettingsTab].warningNote}</span>
                </div>
              )}

              {/* Step Checklist for this setting */}
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                  Configuration Instructions:
                </span>
                <ul className="space-y-2.5">
                  {settingsSections[activeSettingsTab].keyInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 bg-slate-950/70 p-3 rounded-xl border border-white/5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Linked screenshot thumbnail preview */}
              {settingsSections[activeSettingsTab].screenshotUrl && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-400 block mb-2">
                    Reference In-App Screenshot:
                  </span>
                  <div 
                    onClick={() => {
                      const matched = screenshots.find(s => s.imageUrl === settingsSections[activeSettingsTab].screenshotUrl);
                      if (matched) openModal(matched);
                    }}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 max-h-64 cursor-pointer bg-slate-950 shadow-lg"
                  >
                    <img
                      src={settingsSections[activeSettingsTab].screenshotUrl}
                      alt={settingsSections[activeSettingsTab].title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-bold text-white">
                      <Maximize2 className="w-4 h-4 text-cyan-400" />
                      <span>Click to Enlarge Fullscreen</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. Comprehensive Screenshots Gallery (32 High-Resolution Previews) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <Tv className="w-6 h-6 text-cyan-400" />
              <span>CBR TV Visual Walkthrough & Screenshots ({screenshots.length} Screens)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real screenshots captured directly from CBR TV (Boss Media Player Jrod Edition v1.0.39). Tap any preview to zoom.
            </p>
          </div>
          <span className="text-xs text-cyan-400 font-bold self-start sm:self-center bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            {filteredScreenshots.length} {selectedCategory} Previews
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-900 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScreenshots.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openModal(item)}
              className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between gap-3 cursor-pointer group"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-[10px] font-bold text-cyan-300 border border-cyan-500/20">
                  {item.tag || item.category}
                </div>
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-bold text-white">
                  <Maximize2 className="w-4 h-4 text-cyan-400" />
                  <span>Click to Zoom</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Remote Control Quick Cheat Sheet */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Tv className="w-5 h-5 text-cyan-400" />
              <span>FireStick & Android TV Remote Control Cheat Sheet</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Master the navigation shortcuts to control Live TV, Timeshift, and MultiView effortlessly.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-white/5 self-start sm:self-center">
            TiviMate Mode Supported
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {guide.remoteShortcuts?.map((shortcut, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1.5 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-mono text-xs font-black text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 inline-block">
                  {shortcut.key}
                </span>
                <h5 className="text-xs font-bold text-white">
                  {shortcut.action}
                </h5>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                {shortcut.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Lightbox Modal for Zooming Screenshots */}
      {activeModalImage && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 border border-cyan-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {activeModalImage.tag || activeModalImage.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
                  {activeModalImage.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image with Navigation Arrows */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center flex-1 min-h-0">
              <img
                src={activeModalImage.imageUrl}
                alt={activeModalImage.title}
                className="w-full h-full object-contain"
              />

              <button
                onClick={prevModalImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-cyan-500 text-white hover:text-slate-950 transition-all border border-white/10 cursor-pointer shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextModalImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-cyan-500 text-white hover:text-slate-950 transition-all border border-white/10 cursor-pointer shadow-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Caption Footer */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300 shrink-0">
              <p className="leading-relaxed">
                {activeModalImage.caption}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectPlan('trial-24h')}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
                >
                  Activate Free 24H Trial Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
