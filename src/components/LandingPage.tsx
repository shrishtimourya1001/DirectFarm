import React, { useState } from 'react';
import { RoleMode, Language } from '../types';
import { translations } from '../utils/translations';
import { SUCCESS_STORIES } from '../data/mockData';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Users, 
  CheckCircle2, 
  AlertTriangle,
  Leaf,
  Scale,
  DollarSign,
  Clock,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: RoleMode) => void;
  language: Language;
  onOpenAiPriceDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  language,
  onOpenAiPriceDemo
}) => {
  const t = translations[language];
  const [interactiveCrop, setInteractiveCrop] = useState<'Tomato' | 'Onion' | 'Wheat'>('Tomato');

  const demoPricing = {
    Tomato: { mandi: 28, direct: 31, retail: 42, farmerLift: '+11%', consumerSave: '26%' },
    Onion: { mandi: 24, direct: 28, retail: 40, farmerLift: '+16%', consumerSave: '30%' },
    Wheat: { mandi: 26, direct: 32, retail: 48, farmerLift: '+23%', consumerSave: '33%' },
  };

  const currentDemo = demoPricing[interactiveCrop];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/60 via-[#f9fafb] to-white border-b border-stone-200">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/30 via-emerald-100/10 to-amber-100/20 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>National AgriTech Disintermediation Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="font-['Poppins',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
              From Farmer to You. <br className="hidden sm:inline" />
              <span className="text-[#1b4332] relative inline-block">
                Directly.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 12" fill="none">
                  <path d="M3 9C60 3 190 2 247 9" stroke="#52b788" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
              DirectFarm connects farmers directly with consumers and institutional buyers while providing AI-powered pricing, demand intelligence, and 100% transparent supply-chain insights.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                id="hero-start-selling-btn"
                onClick={() => onSelectRole('farmer')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-base shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 group"
              >
                <span>{t.startSelling}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-produce-btn"
                onClick={() => onSelectRole('buyer')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-stone-50 text-[#1b4332] font-bold text-base border-2 border-[#1b4332]/20 hover:border-[#1b4332]/40 shadow-xs transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>{t.exploreProduce}</span>
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 0% Middleman Commission
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Direct Kisan Escrow Payment
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Farm-to-Table in &lt;16 Hours
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. IMPACT STATISTICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1b4332] text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-emerald-950/15 border border-emerald-900">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#74c69d]">
              Direct Disintermediation Metric
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Poppins',sans-serif] mt-1">
              Real Economic Impact Delivered
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-emerald-800/80">
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Poppins',sans-serif]">
                +38.5%
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 mt-2 font-medium">
                Average Farmer Income Lift
              </div>
              <p className="text-[11px] text-emerald-300/70 mt-1">Direct payout vs village commission agents</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-300 font-['Poppins',sans-serif]">
                -24.2%
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 mt-2 font-medium">
                Consumer Price Reduction
              </div>
              <p className="text-[11px] text-emerald-300/70 mt-1">Compared to city supermarket chains</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#74c69d] font-['Poppins',sans-serif]">
                0
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 mt-2 font-medium">
                Parasitic Middlemen
              </div>
              <p className="text-[11px] text-emerald-300/70 mt-1">Traders & wholesalers bypassed</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Poppins',sans-serif]">
                ₹4.82 Cr
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 mt-2 font-medium">
                Direct Farmer Wealth Created
              </div>
              <p className="text-[11px] text-emerald-300/70 mt-1">14,800+ smallholders empowered</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Frictionless Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-3">
            {t.howItWorks}
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base">
            Eliminating traditional supply chain friction with AI price discovery and rapid direct fulfillment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Farmer Lists Produce',
              desc: 'Farmer enters crop type and harvest date. In 1 click, our AI engine suggests optimal selling prices based on real-time APMC Mandi rates.',
              icon: <Scale className="w-6 h-6 text-emerald-700" />,
              color: 'bg-emerald-50 border-emerald-200'
            },
            {
              step: '02',
              title: 'AI Matches Local Demand',
              desc: 'Our geo-algorithm connects the listing directly to verified nearby households, restaurants, and wholesale consumer collectives.',
              icon: <Sparkles className="w-6 h-6 text-emerald-700" />,
              color: 'bg-emerald-50 border-emerald-200'
            },
            {
              step: '03',
              title: 'Direct Escrow Payment',
              desc: 'Buyer pays securely via UPI/card. Funds are locked in Kisan-Escrow and released automatically upon physical crop handover.',
              icon: <DollarSign className="w-6 h-6 text-emerald-700" />,
              color: 'bg-emerald-50 border-emerald-200'
            },
            {
              step: '04',
              title: 'Farm-Fresh Delivery',
              desc: 'Direct pickup from farm gate to consumer in &lt;16 hours, eliminating transit delays and multi-warehouse post-harvest rot.',
              icon: <Truck className="w-6 h-6 text-emerald-700" />,
              color: 'bg-emerald-50 border-emerald-200'
            },
          ].map((item) => (
            <div 
              key={item.step}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-extrabold text-stone-400 tracking-wider">
                    STEP {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-stone-900 mb-2 font-['Poppins',sans-serif]">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUPPLY CHAIN COMPARISON (Visual Teaser) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200">
                Supply Chain Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-2">
                Traditional Cartel vs DirectFarm Model
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                See exactly where the 45% value leak happens in conventional agricultural trade.
              </p>
            </div>
            <button
              onClick={() => onSelectRole('supply-chain')}
              className="px-5 py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold hover:bg-[#2d6a4f] transition-colors flex items-center gap-1.5 self-start md:self-auto shadow-xs"
            >
              <span>Explore Interactive Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Old Broken System */}
            <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs relative">
              <div className="flex items-center gap-2 mb-4 text-rose-700 font-bold text-sm uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Current Traditional System (4 Intermediaries)</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block">1. Farmer</span>
                    <span className="text-stone-500">Takes all weather & yield risks</span>
                  </div>
                  <span className="font-bold text-rose-700 text-sm">₹18 / kg</span>
                </div>

                <div className="flex items-center justify-center text-stone-400">
                  <span className="text-[11px] font-mono">↓ Village Aggregator (+₹4)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block">2. APMC Mandi Trader & Wholesaler</span>
                    <span className="text-stone-500">Adds loading, unloading & commissions</span>
                  </div>
                  <span className="font-bold text-stone-700 text-sm">₹28 / kg</span>
                </div>

                <div className="flex items-center justify-center text-stone-400">
                  <span className="text-[11px] font-mono">↓ District Broker (+₹10)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/50 border border-rose-200 text-xs">
                  <div>
                    <span className="font-bold text-rose-950 block">3. Urban Retailer / Supermarket</span>
                    <span className="text-rose-800">Final price paid by consumer</span>
                  </div>
                  <span className="font-bold text-rose-700 text-base">₹42 / kg</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span>⏱ 4.5 Days transit delay</span>
                <span className="text-rose-600 font-semibold">18–22% Spoilage Rot</span>
              </div>
            </div>

            {/* DirectFarm Solution */}
            <div className="p-6 rounded-2xl bg-white border-2 border-emerald-500 shadow-md relative">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Direct Disintermediation
              </div>
              <div className="flex items-center gap-2 mb-4 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>DirectFarm Ecosystem (0 Middlemen)</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div>
                    <span className="font-bold text-emerald-950 block text-sm">Farmer Direct Earnings</span>
                    <span className="text-emerald-700 font-medium">+72% higher than Mandi gate</span>
                  </div>
                  <span className="font-bold text-emerald-800 text-lg">₹31 / kg</span>
                </div>

                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-[11px] text-stone-600">
                  <span>DirectFarm AI Quality & Cold Dispatch</span>
                  <span className="font-semibold text-stone-800">₹1.50 / kg</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs">
                  <div>
                    <span className="font-bold text-emerald-950 block text-sm">Consumer Final Price</span>
                    <span className="text-emerald-800 font-medium">26% cheaper than supermarkets</span>
                  </div>
                  <span className="font-bold text-emerald-900 text-lg">₹32.50 / kg</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs text-stone-700 font-medium">
                <span className="flex items-center gap-1 text-emerald-800">
                  <Clock className="w-3.5 h-3.5" /> &lt;14 Hours Farm-to-Kitchen
                </span>
                <span className="text-emerald-700 font-bold">&lt;3% Spoilage Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE AI PRICE INTELLIGENCE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#12281e] to-[#1b4332] text-white rounded-3xl p-6 sm:p-12 shadow-xl border border-emerald-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Price Intelligence Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Poppins',sans-serif]">
                Algorithmic Fair Pricing for Every Harvest
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                DirectFarm’s machine learning model monitors daily APMC Mandi bids across 2,400+ markets, weather-induced supply crunches, and urban consumption heatmaps to recommend the most profitable selling price.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {(['Tomato', 'Onion', 'Wheat'] as const).map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setInteractiveCrop(crop)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      interactiveCrop === crop
                        ? 'bg-[#52b788] text-white shadow-md'
                        : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/60 border border-emerald-800'
                    }`}
                  >
                    {crop} Analysis
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenAiPriceDemo}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1b4332] hover:bg-emerald-50 text-xs font-bold transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Open Full AI Price Recommendation Screen</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white text-stone-900 rounded-2xl p-6 shadow-2xl border border-stone-200">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Sample Crop Analysis
                    </span>
                    <h4 className="text-xl font-bold text-stone-900 font-['Poppins',sans-serif]">
                      {interactiveCrop} (500 kg Batch)
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
                    Demand: High
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 my-5">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[11px] font-semibold text-stone-500 block">
                      Local Mandi APMC Price
                    </span>
                    <div className="text-2xl font-extrabold text-stone-700 font-['Poppins',sans-serif] mt-0.5">
                      ₹{currentDemo.mandi} <span className="text-xs font-normal text-stone-500">/ kg</span>
                    </div>
                    <span className="text-[10px] text-rose-600 font-medium">Broker takes 12% cut</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-500">
                    <span className="text-[11px] font-bold text-emerald-900 block flex items-center justify-between">
                      AI Suggested Price
                      <span className="text-[9px] px-1.5 py-0.2 bg-emerald-600 text-white rounded">
                        {currentDemo.farmerLift}
                      </span>
                    </span>
                    <div className="text-2xl font-extrabold text-emerald-800 font-['Poppins',sans-serif] mt-0.5">
                      ₹{currentDemo.direct} <span className="text-xs font-normal text-emerald-700">/ kg</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium">100% Direct to Farmer</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span>Consumer saves <strong className="text-amber-950">{currentDemo.consumerSave}</strong> vs supermarket (₹{currentDemo.retail}/kg)</span>
                  <span className="font-bold text-amber-800">Win-Win</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FARMER BENEFITS VS CONSUMER BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Mutual Value
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-3">
            Built for Both Ends of the Harvest
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Farmer Benefits */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#1b4332]">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-['Poppins',sans-serif]">
                  {t.farmerBenefits}
                </h3>
                <span className="text-xs text-stone-500 font-medium">For Cultivators, FPOs & Orchardists</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Unlicensed Middlemen:</strong> Stop paying unofficial mandi "kanta" fees, cartage deductions, and auction cuts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>AI-Driven Dynamic Pricing:</strong> Never sell in distress. Know your true market worth before harvesting.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Instant Escrow Payouts:</strong> Same-day direct bank transfers via Kisan Credit & UPI upon delivery confirmation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Guaranteed Bulk Buyers:</strong> Direct purchase contracts from apartment associations, hotels, and food processors.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onSelectRole('farmer')}
                className="w-full py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs transition-colors"
              >
                Access Farmer Portal & AI Pricing →
              </button>
            </div>
          </div>

          {/* Consumer Benefits */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-900">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-['Poppins',sans-serif]">
                  {t.consumerBenefits}
                </h3>
                <span className="text-xs text-stone-500 font-medium">For Families, Chefs & Bulk Buyers</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Peak Freshness (Under 16 Hours):</strong> Crops are picked at maturity, bypassing days of chemical preservation in warehouses.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>20–30% Cheaper than Supermarkets:</strong> Savings from cutting intermediaries are passed directly to you.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>100% Farm Traceability:</strong> Know exactly who grew your food, which farm it came from, and soil cultivation practices.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Conscious Impact:</strong> Every rupee you spend directly sustains rural farming livelihoods.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onSelectRole('buyer')}
                className="w-full py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-colors"
              >
                Browse Fresh Farm Harvests →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FARMER SUCCESS STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Field Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-3">
            {t.successStories}
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Real cultivators from Uttar Pradesh, Maharashtra, and Punjab sharing their journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((story) => (
            <div 
              key={story.id} 
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={story.avatar} 
                    alt={story.farmerName} 
                    className="w-13 h-13 rounded-full object-cover border-2 border-emerald-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-base font-['Poppins',sans-serif]">
                      {story.farmerName}
                    </h4>
                    <span className="text-xs text-stone-500 block">{story.location}</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">{story.crop}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-600">Earnings Increase:</span>
                    <span className="text-emerald-800 font-extrabold text-sm">+{story.incomeIncreasePercent}%</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    ₹{story.oldIncomePerQuintal} → <strong className="text-emerald-900">₹{story.newIncomePerQuintal} / quintal</strong>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic leading-relaxed">
                  "{language === 'hi' ? story.quoteHi : story.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] text-white rounded-3xl p-8 sm:p-14 text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Poppins',sans-serif] max-w-2xl mx-auto">
            {t.readyToTransform}
          </h2>
          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto mt-3">
            {t.joinDirectFarm}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => onSelectRole('farmer')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#1b4332] hover:bg-stone-100 font-bold text-sm shadow-md transition-colors"
            >
              List Produce as Farmer
            </button>
            <button
              onClick={() => onSelectRole('buyer')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 text-white border border-emerald-400/40 font-bold text-sm transition-colors"
            >
              Browse Fresh Marketplace
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
