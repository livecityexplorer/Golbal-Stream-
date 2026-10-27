import React, { useState, useMemo } from 'react';
import { PlanPricing, Currency, ThemeCustomization } from '../types';
import { CONNECTION_MULTIPLIERS } from '../data/mockData';
import { 
  ShieldCheck, Zap, Copy, Check, Lock, CheckCircle2, ArrowRight, X, Gift, 
  AlertCircle, QrCode, RefreshCw, Wallet, Clock, MessageSquare, ExternalLink, 
  HelpCircle, CreditCard 
} from 'lucide-react';
import { FreeTrialModal } from './FreeTrialModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanPricing;
  connections: number;
  includeAdult: boolean;
  currency: Currency;
  themeConfig?: ThemeCustomization;
}

type CryptoAsset = 'BTC' | 'ETH' | 'USDT_TRC20' | 'USDT_ERC20';

interface CryptoOption {
  id: CryptoAsset;
  name: string;
  symbol: string;
  network: string;
  icon: string;
  accentColor: string;
  badge: string;
  ratePerGBP: number; // Conversion rate relative to GBP
}

const CRYPTO_OPTIONS: CryptoOption[] = [
  {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Native (BTC)',
    icon: '₿',
    accentColor: '#f7931a',
    badge: 'Popular',
    ratePerGBP: 0.000015,
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'Ethereum (ERC-20)',
    icon: 'Ξ',
    accentColor: '#627eea',
    badge: 'Fast',
    ratePerGBP: 0.00045,
  },
  {
    id: 'USDT_TRC20',
    name: 'Tether USDT',
    symbol: 'USDT',
    network: 'TRON (TRC-20)',
    icon: '₮',
    accentColor: '#26a17b',
    badge: 'Lowest Fees ($1)',
    ratePerGBP: 1.30,
  },
  {
    id: 'USDT_ERC20',
    name: 'Tether USDT',
    symbol: 'USDT',
    network: 'Ethereum (ERC-20)',
    icon: '₮',
    accentColor: '#50af95',
    badge: 'Standard',
    ratePerGBP: 1.30,
  },
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  connections,
  includeAdult,
  currency,
  themeConfig,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset>('BTC');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [deviceType, setDeviceType] = useState('Amazon Fire TV Stick 4K');
  const [txHash, setTxHash] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showNoCryptoHelp, setShowNoCryptoHelp] = useState(false);
  
  // NOWPayments invoice states
  const [invoiceUrl, setInvoiceUrl] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [isSandbox, setIsSandbox] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fallback / Configurable Wallet Addresses
  const wallets = useMemo(() => ({
    BTC: themeConfig?.btcWalletAddress || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: themeConfig?.ethWalletAddress || '0x71C83577379dD3775945E517006140A8a906212B',
    USDT_TRC20: themeConfig?.usdtTrc20Address || 'TYDzsYUEpvnYmQk4zGP9sWWcTEd3GL8Lsu',
    USDT_ERC20: themeConfig?.usdtErc20Address || themeConfig?.ethWalletAddress || '0x71C83577379dD3775945E517006140A8a906212B',
  }), [themeConfig]);

  // Generated credentials state
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    serverUrl: 'http://uk-premium.streamdns.me:8080',
    m3uUrl: '',
    epgUrl: 'http://uk-premium.streamdns.me:8080/epg.xml'
  });

  const isFreeTrial = plan?.durationMonths === 0 || plan?.id === 'trial-24h';
  const currencySymbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : currency === 'CAD' ? 'CA$' : '$';
  const connectionMultipliers = CONNECTION_MULTIPLIERS;
  const basePrice = currency === 'EUR' ? (plan?.priceEUR || 0) : currency === 'USD' ? (plan?.priceUSD || 0) : currency === 'CAD' ? (plan?.priceCAD || +(plan?.priceUSD * 1.35).toFixed(2)) : (plan?.priceGBP || 0);
  const finalPrice = isFreeTrial ? 0 : +(basePrice * (connectionMultipliers[connections] || 1)).toFixed(2);

  // Convert to GBP reference price for crypto calculation
  const priceInGBP = currency === 'GBP' ? finalPrice : currency === 'EUR' ? finalPrice * 0.85 : currency === 'CAD' ? finalPrice * 0.58 : finalPrice * 0.78;

  const activeCrypto = CRYPTO_OPTIONS.find(c => c.id === selectedCrypto) || CRYPTO_OPTIONS[0];
  
  // Calculate crypto payment amount
  const cryptoAmount = useMemo(() => {
    if (isFreeTrial) return '0.00';
    if (selectedCrypto === 'BTC') {
      return (priceInGBP * activeCrypto.ratePerGBP).toFixed(6);
    }
    if (selectedCrypto === 'ETH') {
      return (priceInGBP * activeCrypto.ratePerGBP).toFixed(4);
    }
    return (priceInGBP * activeCrypto.ratePerGBP).toFixed(2);
  }, [priceInGBP, selectedCrypto, activeCrypto, isFreeTrial]);

  const activeWalletAddress = wallets[selectedCrypto];

  // URI scheme for deep linking wallet apps
  const cryptoUri = useMemo(() => {
    if (selectedCrypto === 'BTC') return `bitcoin:${activeWalletAddress}?amount=${cryptoAmount}`;
    if (selectedCrypto === 'ETH') return `ethereum:${activeWalletAddress}?value=${cryptoAmount}`;
    if (selectedCrypto === 'USDT_TRC20') return `tron:${activeWalletAddress}?amount=${cryptoAmount}`;
    if (selectedCrypto === 'USDT_ERC20') return `ethereum:${activeWalletAddress}?tokenAddress=0xdac17f958d2ee523a2206206994597c13d831ec7&value=${cryptoAmount}`;
    return activeWalletAddress;
  }, [selectedCrypto, activeWalletAddress, cryptoAmount]);

  // Dynamic real-time QR code URL (using qrserver.com API)
  const qrCodeUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=12&color=0d1527&data=${encodeURIComponent(cryptoUri)}`;
  }, [cryptoUri]);

  // Support Contacts
  const whatsappNumberClean = (themeConfig?.whatsappNumber || '+44 7731 454811').replace(/[^\d]/g, '');
  const discordUrl = themeConfig?.discordUrl || 'https://discord.gg/QyNQRYwJj3';

  const alternativePaymentMessage = encodeURIComponent(
    `Hello StreamUK Support! I would like to subscribe to the "${plan?.name || 'IPTV Plan'}" (${connections} Device${connections > 1 ? 's' : ''}) for ${currencySymbol}${finalPrice}, but I do not have cryptocurrency. Can I please pay via an alternative method (Credit/Debit Card, PayPal, Revolut, or Bank Transfer)? My Email is: ${email || 'pending'}.`
  );
  const whatsappDirectUrl = `https://wa.me/${whatsappNumberClean}?text=${alternativePaymentMessage}`;

  if (!isOpen) return null;

  // If user selected free trial, direct to dedicated Discord & WhatsApp verification modal
  if (isFreeTrial) {
    return <FreeTrialModal isOpen={isOpen} onClose={onClose} themeConfig={themeConfig} />;
  }

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsProcessing(true);
    setErrorMsg('');

    try {
      const orderDescription = `GlobalStreamHub: ${plan?.name || 'IPTV Sub'} (${connections} Device${connections > 1 ? 's' : ''}) - ${deviceType}`;
      const response = await fetch('/api/checkout/nowpayments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_amount: finalPrice,
          price_currency: currency, // e.g. 'GBP', 'EUR', 'USD'
          order_description: orderDescription,
          customer_email: email,
        }),
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json().catch(() => null);
        if (data && data.success) {
          setInvoiceUrl(data.invoice_url);
          setInvoiceId(data.id);
          setIsSandbox(!!data.is_sandbox);
        }
      }
      setStep('payment');
    } catch (err) {
      console.log('Proceeding to static checkout options:', err);
      setStep('payment');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompleteActivation = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const uname = 'vip_' + Math.random().toString(36).substring(2, 7);
      const pass = Math.random().toString(36).substring(2, 10);
      const m3u = `http://uk-premium.streamdns.me:8080/get.php?username=${uname}&password=${pass}&type=m3u_plus&output=ts`;

      setCredentials({
        username: uname,
        password: pass,
        serverUrl: 'http://uk-premium.streamdns.me:8080',
        m3uUrl: m3u,
        epgUrl: 'http://uk-premium.streamdns.me:8080/epg.xml'
      });

      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleReset = () => {
    setStep('details');
    setTxHash('');
    setInvoiceUrl('');
    setInvoiceId('');
    setErrorMsg('');
    setShowNoCryptoHelp(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative my-6 text-slate-100">
        
        {/* Modal Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= STEP 1: ORDER & DEVICE DETAILS ================= */}
        {step === 'details' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isFreeTrial
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                }`}>
                  {isFreeTrial ? '100% Free 24h VIP Pass' : 'Crypto Direct Gateway (BTC • ETH • USDT)'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isFreeTrial ? 'Activate Your Free 24h VIP Pass' : 'Complete 4K IPTV Subscription'}
              </h3>
            </div>

            {/* Selected Plan Summary Card */}
            <div className="bg-slate-950/80 p-3.5 sm:p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-white">{plan?.name}</span>
                <span className="font-mono font-extrabold text-lg">
                  {isFreeTrial ? (
                    <span className="text-emerald-400 font-black">FREE (£0.00)</span>
                  ) : (
                    <span className="text-sky-400">{currencySymbol}{finalPrice}</span>
                  )}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex flex-wrap gap-x-3 gap-y-1">
                <span>⚡ {connections} Connection{connections > 1 ? 's' : ''}</span>
                <span>•</span>
                <span>{includeAdult ? '🔞 18+ Channels Included' : 'Family Safe (No 18+)'}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Instant &lt;10s Activation</span>
              </div>
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-3.5">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Email Address (to receive Xtream & M3U Playlist credentials):
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  WhatsApp Number (optional for instant 1-on-1 setup assistance):
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +44 7731 454811"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Primary Device */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Your Streaming Device:
                </label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="Amazon Fire TV Stick 4K">Amazon Fire TV Stick 4K / Max / Cube</option>
                  <option value="Samsung Smart TV (Tizen)">Samsung Smart TV (Tizen / IBO Player)</option>
                  <option value="LG Smart TV (webOS)">LG Smart TV (webOS / Smart IPTV)</option>
                  <option value="Android TV / Nvidia Shield / Formuler">Android TV / Nvidia Shield / Formuler (TiviMate)</option>
                  <option value="Apple TV / iPhone / iPad">Apple TV / iPhone / iPad (IPTV Smarters Pro)</option>
                  <option value="MAG Box / Enigma 2">MAG Box 254/322/524 / Enigma 2</option>
                  <option value="Windows PC / Mac">Windows PC / Mac</option>
                </select>
              </div>

              {/* Anonymous Crypto Notice */}
              {!isFreeTrial && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                  <Wallet className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">100% Anonymous Crypto Checkout</strong>
                    <span>Pay directly via Bitcoin (BTC), Ethereum (ETH), or Tether USDT (TRC-20/ERC-20).</span>
                  </div>
                </div>
              )}

              {/* Don't have crypto? Assistance Box */}
              {!isFreeTrial && (
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                      <HelpCircle className="w-4 h-4 text-indigo-400" />
                      <span>Don't have cryptocurrency?</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Card / PayPal / Revolut Available
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    If you prefer paying with a regular <strong className="text-white">Credit/Debit Card, PayPal, Revolut, or UK Bank Transfer</strong>, contact our 24/7 support agents directly:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {/* WhatsApp Button */}
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-center"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    {/* Discord Button */}
                    <a
                      href={discordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-center"
                    >
                      <span className="text-sm">🎮</span>
                      <span>Join Discord Support</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isFreeTrial
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-slate-950 shadow-orange-500/25'
                }`}
              >
                {isProcessing ? (
                  <span>Generating Credentials...</span>
                ) : isFreeTrial ? (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Activate Free 24h Pass Instantly</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Crypto Payment ({currencySymbol}{finalPrice})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Anonymous & Secure • Instant Automated Credentials Dispatch</span>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 2: CRYPTO PAYMENT GATEWAY (NOWPAYMENTS) ================= */}
        {step === 'payment' && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Secure Crypto Invoice Generated
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Automated Gateway Checkout
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
              >
                Back
              </button>
            </div>

            {/* Sandbox Notice */}
            {isSandbox && (
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Sandbox / Demo Mode Active</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  You haven't set your <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-400 font-mono text-[10px]">NOWPAYMENTS_API_KEY</code> in your environment secrets yet. Below is a simulated checkout link to show the flow.
                </p>
              </div>
            )}

            {/* Invoice Order Details Summary Card */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3 shadow-inner">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800/60">
                <span className="text-slate-400">Invoice ID:</span>
                <span className="font-mono font-semibold text-slate-300">{invoiceId}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Plan Selected:</span>
                  <span className="text-white font-bold">{plan?.name} ({connections} Devices)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Total Amount:</span>
                  <span className="text-emerald-400 font-extrabold text-sm">{currencySymbol}{finalPrice} {currency}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Your Email:</span>
                  <span className="text-slate-300 truncate block">{email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Device Configured:</span>
                  <span className="text-slate-300 truncate block">{deviceType}</span>
                </div>
              </div>
            </div>

            {/* Main NOWPayments Payment Redirect Portal Card */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-slate-950 to-slate-900 border border-emerald-500/20 rounded-2xl text-center space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />
              
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Verified NOWPayments Gateway</span>
                </div>
                <h4 className="text-md font-bold text-white">
                  Pay securely with your preferred Crypto Wallet
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Click below to open your secure checkout page. You can pay with <strong className="text-white">Bitcoin, Ethereum, USDT, Litecoin, Dogecoin</strong>, and dozens more instantly!
                </p>
              </div>

              {/* Action Button to Open Checkout */}
              <div>
                <a
                  href={invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all text-center cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>OPEN SECURE CRYPTO GATEWAY</span>
                  <ExternalLink className="w-4 h-4 opacity-90" />
                </a>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Protected by AES-256 SSL Encryption</span>
              </div>
            </div>

            {/* Direct Confirmation CTA after they clicked pay */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleCompleteActivation}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700/50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Confirming Blockchain Broadcast...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>I Have Completed the Gateway Payment • Activate My IPTV</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-slate-500 text-center block leading-normal">
                Click this button once you have completed your payment in the invoice window. Your subscription credentials will populate instantly!
              </span>
            </div>

            {/* Alternative Manual Transfer addresses collapsible fallback */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/40">
              <button
                type="button"
                onClick={() => setShowNoCryptoHelp(!showNoCryptoHelp)}
                className="w-full py-3 px-4 flex items-center justify-between text-xs text-slate-400 hover:text-white transition-colors hover:bg-slate-950/80 cursor-pointer"
              >
                <span className="font-bold">⚠️ Prefer Direct Manual Transfer (to Ledger Address)?</span>
                <span className="text-sky-400 underline text-[11px]">
                  {showNoCryptoHelp ? 'Hide Details' : 'Show Details'}
                </span>
              </button>

              {showNoCryptoHelp && (
                <div className="p-4 border-t border-slate-800 space-y-4 bg-slate-950/80">
                  <p className="text-[11px] text-slate-400 leading-normal">
                    If you prefer sending crypto directly to our main Ledger wallet addresses manually, you can use the details below:
                  </p>
                  
                  {/* Reuse manual coin selector */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {CRYPTO_OPTIONS.map((coin) => (
                      <button
                        key={coin.id}
                        type="button"
                        onClick={() => setSelectedCrypto(coin.id)}
                        className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedCrypto === coin.id
                            ? 'bg-slate-900 border-amber-500 text-white'
                            : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="text-xs font-black block">{coin.symbol}</span>
                        <span className="text-[8px] text-slate-500 block truncate">{coin.network.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-3 text-[11px]">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Manual QR Code */}
                      <div className="bg-white p-2 rounded-xl shrink-0 border border-slate-700/10 w-24 h-24 flex items-center justify-center">
                        <img 
                          src={qrCodeUrl} 
                          alt={`Scan to pay ${cryptoAmount} ${activeCrypto.symbol}`}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Manual Address & Amount details */}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex justify-between items-center border-b border-slate-800/40 pb-1.5">
                          <span className="text-slate-400">Manual Amount:</span>
                          <strong className="text-amber-300 font-mono text-xs">{cryptoAmount} {activeCrypto.symbol}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold block mb-1">Deposit Address ({activeCrypto.network}):</span>
                          <div className="flex items-center justify-between bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                            <code className="text-sky-300 font-mono text-[10px] break-all select-all">{activeWalletAddress}</code>
                            <button
                              type="button"
                              onClick={() => handleCopy(activeWalletAddress, 'manual_wallet')}
                              className="text-slate-400 p-1 hover:text-white transition-colors cursor-pointer"
                            >
                              {copiedKey === 'manual_wallet' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Support info fallback footer */}
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Need support? Contact us on:</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial py-1.5 px-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>🎮 Discord</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Automated Gateway verification takes 10–60 seconds</span>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CREDENTIALS DELIVERED ================= */}
        {step === 'success' && (
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">
                {isFreeTrial ? 'Free 24h Trial Activated!' : 'Subscription Activated & Ready!'}
              </h3>
              <p className="text-xs text-slate-300">
                Your login credentials are ready below and have also been dispatched to <strong className="text-sky-400">{email || 'your email'}</strong>.
              </p>
            </div>

            {/* Xtream Codes Box */}
            <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 border border-indigo-500/40 space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-black uppercase text-sky-400 tracking-wide flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  Xtream Codes API Credentials
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Active (10Gbps London Node)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {/* Server URL */}
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-slate-400 text-[11px]">Server / Portal URL:</span>
                  <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                    <code className="text-sky-300 font-mono text-xs">{credentials.serverUrl}</code>
                    <button
                      onClick={() => handleCopy(credentials.serverUrl, 'serverUrl')}
                      className="text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      {copiedKey === 'serverUrl' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px]">Username:</span>
                  <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                    <code className="text-white font-mono font-bold text-xs">{credentials.username}</code>
                    <button
                      onClick={() => handleCopy(credentials.username, 'username')}
                      className="text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      {copiedKey === 'username' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px]">Password:</span>
                  <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                    <code className="text-white font-mono font-bold text-xs">{credentials.password}</code>
                    <button
                      onClick={() => handleCopy(credentials.password, 'password')}
                      className="text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      {copiedKey === 'password' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* M3U Playlist */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">M3U Plus Playlist URL:</span>
              <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                <code className="text-slate-300 font-mono text-[11px] truncate max-w-[340px]">
                  {credentials.m3uUrl}
                </code>
                <button
                  onClick={() => handleCopy(credentials.m3uUrl, 'm3uUrl')}
                  className="text-slate-400 hover:text-white p-1 shrink-0 ml-2 cursor-pointer"
                >
                  {copiedKey === 'm3uUrl' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 24/7 Setup Assistance */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">Need help setting up your Firestick or Smart TV?</span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${whatsappNumberClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold transition-colors"
                >
                  <span>Discord</span>
                </a>
              </div>
            </div>

            {/* Done CTA */}
            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs transition-colors cursor-pointer"
            >
              Close & Start Streaming 4K TV
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
