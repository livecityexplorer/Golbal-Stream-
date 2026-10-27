import React, { useState } from 'react';
import { DEVICE_GUIDES } from '../data/mockData';
import { useTranslation } from '../context/LanguageContext';
import { Smartphone, Tv, Cpu, Radio, Flame, CheckCircle, Clock, Lightbulb, ChevronRight, X } from 'lucide-react';
import { DeviceGuide } from '../types';

interface DeviceSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo?: (path: string) => void;
}

export const DeviceSetupModal: React.FC<DeviceSetupModalProps> = ({ isOpen, onClose, navigateTo }) => {
  const { t } = useTranslation();
  const [selectedDevice, setSelectedDevice] = useState<DeviceGuide>(DEVICE_GUIDES[0]);
  const [filterCategory, setFilterCategory] = useState<'android' | 'apple'>('android');

  if (!isOpen) return null;

  const getDeviceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Tv': return <Tv className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-blue-400" />;
      default: return <Tv className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredGuides = DEVICE_GUIDES.filter((dev) => {
    if (filterCategory === 'android') {
      return ['guide-firestick', 'guide-android', 'guide-implayer'].includes(dev.id);
    } else {
      return ['guide-smarttv', 'guide-apple'].includes(dev.id);
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[11px] font-bold uppercase tracking-wider mb-1">
              {t.deviceModal?.subtitle || 'Easy 2-Minute Setup'}
            </div>
            <h3 className="text-2xl font-black text-white">{t.deviceModal?.title || 'Device Setup Guides'}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Category Filter Tabs */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
               setFilterCategory('android');
               const first = DEVICE_GUIDES.find(d => ['guide-firestick', 'guide-android', 'guide-implayer'].includes(d.id));
               if (first) setSelectedDevice(first);
            }}
            className={`flex-1 py-2.5 min-h-[44px] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
              filterCategory === 'android' ? 'bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            FireStick & Android
          </button>
          <button
            onClick={() => {
               setFilterCategory('apple');
               const first = DEVICE_GUIDES.find(d => ['guide-smarttv', 'guide-apple'].includes(d.id));
               if (first) setSelectedDevice(first);
            }}
            className={`flex-1 py-2.5 min-h-[44px] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
              filterCategory === 'apple' ? 'bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Smart TV & Apple iOS
          </button>
        </div>

        {/* Device Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filteredGuides.map((dev) => {
            const isSelected = dev.id === selectedDevice.id;
            return (
              <button
                key={dev.id}
                onClick={() => setSelectedDevice(dev)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {getDeviceIcon(dev.icon)}
                <span className="text-xs font-bold leading-tight line-clamp-1">{dev.name.split('/')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Guide Body */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-6">
          
          {/* Guide Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                {selectedDevice.name}
              </h4>
              <span className="text-xs text-slate-400">
                {t.deviceModal?.recommendedApp || 'Recommended App'}: <strong className="text-cyan-400">{selectedDevice.recommendedApp}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedDevice.timeEstimate}</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                {selectedDevice.difficulty}
              </span>
            </div>
          </div>

          {/* Custom Downloader Code & App Direct URL Banner */}
          {(selectedDevice.downloaderCode || selectedDevice.appUrl) && (
            <div className={`grid grid-cols-1 ${selectedDevice.downloaderCode && selectedDevice.appUrl ? 'sm:grid-cols-2' : ''} gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30`}>
              {selectedDevice.downloaderCode && (
                <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-lg border border-cyan-500/20">
                  <div>
                    <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider block">{t.deviceModal?.downloaderCode || 'Downloader Code'}</span>
                    <strong className="text-lg text-white font-mono">{selectedDevice.downloaderCode}</strong>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(selectedDevice.downloaderCode || '')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              )}

              {selectedDevice.appUrl && (
                <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-lg border border-cyan-500/20">
                  <div className="overflow-hidden mr-2">
                    <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider block">Direct URL</span>
                    <span className="text-xs text-slate-200 font-mono truncate block">{selectedDevice.appUrl}</span>
                  </div>
                  <a
                    href={selectedDevice.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition-transform hover:scale-105 shrink-0"
                  >
                    Open Link
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Steps List */}
          <div className="space-y-4">
            {selectedDevice.steps.map((step, idx) => (
              <div key={idx} className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-sm font-black text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step.title}</span>
                </div>
                <p className="text-xs text-slate-300 pl-8 leading-relaxed">
                  {step.description}
                </p>
                {step.tip && (
                  <div className="ml-8 mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <span><strong>{t.deviceModal?.proTip || 'Pro Tip'}:</strong> {step.tip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Xtream Codes Example Format */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-sans font-bold block mb-1">
              Sample Login Format:
            </span>
            <div><strong className="text-cyan-400">Server URL:</strong> http://uk-premium.streamdns.me:8080</div>
            <div><strong className="text-cyan-400">Username:</strong> stream_user9482</div>
            <div><strong className="text-cyan-400">Password:</strong> **********</div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            {navigateTo && (
              <button
                onClick={() => {
                  onClose();
                  navigateTo('/setup');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Browse All 20+ Dedicated Guides</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold w-full sm:w-auto cursor-pointer"
            >
              {t.deviceModal?.close || 'Close'}
            </button>
            <a
              href="#pricing"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs text-center w-full sm:w-auto shadow-lg shadow-cyan-500/25"
            >
              {t.pricing?.activateTrialBtn || 'Get Started Now'}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
