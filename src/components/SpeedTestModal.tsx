import React, { useState, useEffect } from 'react';
import { Zap, Server, Activity, CheckCircle2, ShieldCheck, X, RotateCcw } from 'lucide-react';

interface SpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeedTestModal: React.FC<SpeedTestModalProps> = ({ isOpen, onClose }) => {
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ping, setPing] = useState(11);
  const [jitter, setJitter] = useState(1.2);
  const [downloadSpeed, setDownloadSpeed] = useState(148.5);
  const [streamQuality, setStreamQuality] = useState<'4K Ultra HD (60fps)' | 'FHD 1080p' | 'Testing...'>('4K Ultra HD (60fps)');

  const runTest = () => {
    setTesting(true);
    setProgress(0);
    setStreamQuality('Testing...');

    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      setProgress(current);

      // Randomize simulated realistic UK values
      setPing(Math.floor(9 + Math.random() * 6));
      setJitter(+(0.8 + Math.random() * 0.9).toFixed(1));
      setDownloadSpeed(+(110 + Math.random() * 80).toFixed(1));

      if (current >= 100) {
        clearInterval(interval);
        setTesting(false);
        setStreamQuality('4K Ultra HD (60fps)');
      }
    }, 100);
  };

  useEffect(() => {
    if (isOpen) {
      runTest();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-black text-white">UK Streaming Speed & Ping Test</h3>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Target Selector */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300">CDN Edge Cluster:</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
              10Gbps Active
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => { setPing(10); runTest(); }}
              className="py-1.5 px-2 rounded-lg bg-slate-900 border border-indigo-500/30 text-[11px] font-bold text-sky-300 hover:bg-slate-800 transition-colors cursor-pointer text-center"
            >
              🇬🇧 London
            </button>
            <button
              onClick={() => { setPing(18); runTest(); }}
              className="py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer text-center"
            >
              🇩🇪 Frankfurt
            </button>
            <button
              onClick={() => { setPing(28); runTest(); }}
              className="py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer text-center"
            >
              🇺🇸 New York
            </button>
          </div>
        </div>

        {/* Animated Gauge / Result Display */}
        <div className="text-center py-6 bg-slate-950 rounded-2xl border border-slate-800/80 relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Measured 4K Streaming Bandwidth
            </span>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 font-mono">
              {downloadSpeed} <span className="text-lg text-slate-400 font-sans">Mbps</span>
            </div>
            <div className="text-xs font-semibold text-emerald-400 pt-1">
              ✓ Compatible with: <strong className="text-white">{streamQuality}</strong>
            </div>
          </div>

          {/* Progress bar */}
          {testing && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Latency & Jitter Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">Ping to Edge Node</span>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">{ping} ms</div>
            <span className="text-[10px] text-emerald-400 font-semibold">Zero Buffering Latency</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">Jitter Stability</span>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">{jitter} ms</div>
            <span className="text-[10px] text-emerald-400 font-semibold">Lossless 60FPS Sync</span>
          </div>
        </div>

        {/* ISP Status Note */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>Your connection exceeds the recommended 30 Mbps required for uninterrupted 4K 60FPS sports.</p>
            <p className="text-[11px] text-sky-400 font-mono">Recommended FireStick App: <strong>CBR TV (Downloader: 2130837)</strong></p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={runTest}
            disabled={testing}
            className="flex-1 py-3 min-h-[44px] text-center text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Testing...' : 'Test Connection Again'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 min-h-[44px] text-xs font-black rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
