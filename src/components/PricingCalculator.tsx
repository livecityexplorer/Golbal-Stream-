import React, { useState } from 'react';
import { PlanPricing, Currency } from '../types';
import { SUBSCRIPTION_PLANS, CONNECTION_MULTIPLIERS } from '../data/mockData';
import { useTranslation } from '../context/LanguageContext';
import { CheckCircle2, ShieldCheck, Zap, Sparkles, Tv, Smartphone, Lock, ArrowRight, HelpCircle, Star, Globe } from 'lucide-react';

interface PricingCalculatorProps {
  currency: Currency;
  onSelectPlanAndConnections: (plan: PlanPricing, connections: number, adult: boolean) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  currency,
  onSelectPlanAndConnections,
}) => {
  const { t } = useTranslation();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('trial-24h');
  const [connections, setConnections] = useState<number>(1);
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [showSavingsComparison, setShowSavingsComparison] = useState<boolean>(false);

  const currencySymbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : currency === 'CAD' ? 'CA$' : '$';
  const connectionMultipliers = CONNECTION_MULTIPLIERS;

  const getPrice = (plan: PlanPricing, conns: number) => {
    if (plan.durationMonths === 0) return 0; // Free trial
    const base = currency === 'EUR' ? plan.priceEUR : currency === 'USD' ? plan.priceUSD : currency === 'CAD' ? (plan.priceCAD || +(plan.priceUSD * 1.35).toFixed(2)) : plan.priceGBP;
    const mult = connectionMultipliers[conns] || 1;
    return +(base * mult).toFixed(2);
  };

  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[0];
  const totalPrice = getPrice(currentPlan, connections);
  const monthlyEquivalent = currentPlan.durationMonths >= 1 ? (totalPrice / currentPlan.durationMonths).toFixed(2) : '0.00';

  return (
    <section id="pricing" className="py-24 bg-[#060814] relative overflow-hidden border-t border-white/5">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none opacity-20">
        <div className="w-full h-full bg-indigo-600/25 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-black border border-indigo-500/25 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.pricing.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.pricing.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Multi-Screen & Addons Configuration Bar */}
        <div className="electric-glass rounded-3xl p-6 mb-12 border border-white/10 max-w-4xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Multi-screen selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-sky-400" />
                  <span>{t.pricing.simultaneousScreens}:</span>
                </label>
                <span className="text-xs font-bold text-sky-400 font-mono">
                  {connections} {connections === 1 ? t.pricing.device : t.pricing.devices}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setConnections(num)}
                    className={`py-2 sm:py-2.5 px-0.5 sm:px-1 rounded-xl font-black text-[10px] sm:text-xs min-h-[44px] transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                      connections === num
                        ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-slate-950 font-black shadow-lg shadow-indigo-500/25'
                        : 'bg-slate-900/90 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{num} <span className="hidden min-[400px]:inline">{t.pricing.screen}</span></span>
                    <span className="text-[8px] sm:text-[9px] opacity-80 font-mono">
                      {num === 1 ? t.pricing.standard : `+${Math.round((connectionMultipliers[num] - 1) * 100)}%`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Adult 18+ Switch */}
            <div className="space-y-3">
              <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{t.pricing.adultChannels}:</span>
              </label>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-white/5">
                <span className="text-xs text-slate-300">{t.pricing.includeAdult}</span>
                <button
                  onClick={() => setIncludeAdult(!includeAdult)}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors flex items-center cursor-pointer ${
                    includeAdult ? 'bg-amber-500 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <span className="w-4.5 h-4.5 rounded-full bg-slate-950 shadow" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Sleek, Non-Intrusive Cable vs Portal Savings Comparison Toggle */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex justify-center mb-3">
            <button
              onClick={() => setShowSavingsComparison(!showSavingsComparison)}
              className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>💡 Compare with Traditional Cable &amp; Satellite Packages</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-transform ${
                showSavingsComparison ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-slate-400'
              }`}>
                {showSavingsComparison ? 'Hide' : 'Calculate Savings'}
              </span>
            </button>
          </div>

          {showSavingsComparison && (
            <div className="electric-card rounded-2xl p-5 sm:p-6 border border-emerald-500/30 bg-slate-900/90 shadow-2xl animate-fade-in space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Traditional Cable Packages */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-white/5 pb-2">
                    <span>Traditional Cable &amp; Satellite Subscriptions</span>
                    <span className="text-rose-400 font-mono">Expensive</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    <li className="flex justify-between"><span>Live Sports Tier (Sky / TNT / Cable):</span> <strong className="text-slate-300">~£45/mo</strong></li>
                    <li className="flex justify-between"><span>Cinema &amp; Movies Tier:</span> <strong className="text-slate-300">~£20/mo</strong></li>
                    <li className="flex justify-between"><span>Multi-Room Box Rentals &amp; 4K Fee:</span> <strong className="text-slate-300">~£15/mo</strong></li>
                    <li className="flex justify-between"><span>Streaming Apps (Netflix / Disney+ / Prime):</span> <strong className="text-slate-300">~£28/mo</strong></li>
                  </ul>
                  <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Average Total Cost:</span>
                    <span className="text-rose-400 font-mono font-extrabold text-sm">~£108/mo (£1,296/yr)</span>
                  </div>
                </div>

                {/* GlobalStreamHub Media Portal */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-950/80 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-300 border-b border-white/5 pb-2">
                    <span>GlobalStreamHub Digital Media Portal</span>
                    <span className="text-emerald-400 font-mono bg-emerald-500/20 px-1.5 py-0.2 rounded font-bold">12M Pass</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex justify-between"><span>18,500+ Live Channels (UK, USA, CA, EU):</span> <strong className="text-emerald-400">Included</strong></li>
                    <li className="flex justify-between"><span>65,000+ 4K VOD Movies &amp; Cinema Boxsets:</span> <strong className="text-emerald-400">Included</strong></li>
                    <li className="flex justify-between"><span>Anti-Freeze v9.8 &amp; Zero Blackout Coverage:</span> <strong className="text-emerald-400">Included</strong></li>
                    <li className="flex justify-between"><span>No Contracts, No Dish, Works on Any Device:</span> <strong className="text-emerald-400">Included</strong></li>
                  </ul>
                  <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">12-Month Season Pass:</span>
                    <span className="text-emerald-400 font-mono font-extrabold text-sm">~£4.99/mo (£59.99/yr)</span>
                  </div>
                </div>

              </div>

              {/* Bottom Savings Badge & Legal Disclaimer */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Estimated Annual Household Savings: Over £1,236 / $1,550 Every Year</span>
                </div>
                <button
                  onClick={() => onSelectPlanAndConnections(SUBSCRIPTION_PLANS[4], connections, includeAdult)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-black text-xs hover:bg-emerald-300 active:scale-95 transition-all text-center cursor-pointer shadow shrink-0"
                >
                  Claim 12M Season Pass
                </button>
              </div>

              <p className="text-[10px] text-slate-500 leading-tight">
                * Nominative descriptive comparison based on 2026 UK/US standalone broadcast rates. All trademarks belong to their respective owners. GlobalStreamHub is an independent media software protocol index.
              </p>
            </div>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            const price = getPrice(plan, connections);
            const monthly = plan.durationMonths >= 1 ? (price / plan.durationMonths).toFixed(2) : '0.00';
            const isFree = plan.durationMonths === 0;
            const isRecommended = plan.id === 'plan-12m' || plan.durationMonths === 12;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`electric-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between space-y-6 cursor-pointer transition-all duration-300 ease-out relative group ${
                  isSelected
                    ? `border-indigo-500 shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] scale-[1.03] ${isRecommended ? 'animate-subtle-pulse' : ''}`
                    : isRecommended
                    ? 'animate-subtle-pulse scale-[1.01] hover:scale-[1.03]'
                    : 'hover:border-indigo-500/60 hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.25)] hover:scale-[1.02] border-white/5'
                } ${isFree ? 'ring-1 ring-emerald-500/30' : ''}`}
              >
                {/* Popular / Best value badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-3.5 py-1 rounded-full text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 ${
                      isFree 
                        ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400' 
                        : isRecommended
                        ? 'bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 ring-2 ring-indigo-400/40 shadow-indigo-500/40'
                        : 'bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400'
                    }`}>
                      {isRecommended && <Sparkles className="w-3 h-3 text-slate-950 inline-block animate-pulse" />}
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Plan Name & Duration */}
                  <div>
                    <h3 className="text-xl font-black text-white">{plan.name}</h3>
                    <span className="text-xs text-slate-400 font-semibold">{plan.durationLabel}</span>
                  </div>

                  {/* Price Block */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/5 space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      {isFree ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                            {t.pricing.free}
                          </span>
                          <span className="text-xs text-slate-400 font-bold">
                            (£0.00 / $0.00)
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-3xl sm:text-4xl font-black text-white">
                            {currencySymbol}{price}
                          </span>
                          <span className="text-xs text-slate-400 font-bold">
                            / {plan.durationMonths}{t.pricing.perMonth}
                          </span>
                        </>
                      )}
                    </div>

                    {isFree ? (
                      <div className="text-[11px] text-emerald-400 font-bold font-mono">
                        {t.pricing.instantActivation}
                      </div>
                    ) : plan.durationMonths >= 1 && (
                      <div className="text-[11px] text-sky-400 font-bold font-mono">
                        {(t.pricing.justPerMonth || 'Just {price} / month').replace('{price}', `${currencySymbol}${monthly}`)}
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select / Order Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlanAndConnections(plan, connections, includeAdult);
                  }}
                  className={`w-full py-3.5 min-h-[48px] rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFree
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/25'
                      : isSelected
                      ? 'bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-slate-950 shadow-lg shadow-indigo-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border border-white/10'
                  }`}
                >
                  <span>{isFree ? t.pricing.activateTrialBtn : (t.pricing.selectPlanBtn || 'Select {name}').replace('{name}', plan.name)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 p-6 rounded-3xl electric-glass border border-white/10 max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-base text-amber-400 font-bold">₿</span>
            <span className="font-bold">{t.pricing.cryptoCheckout}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="font-bold">{t.pricing.instantDelivery}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">{t.pricing.moneyBack}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-400" />
            <span className="font-bold">{t.pricing.highSpeedNodes}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
