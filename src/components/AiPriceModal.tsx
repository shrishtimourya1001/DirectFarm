import React from 'react';
import { AiPriceInsight, Language } from '../types';
import { translations } from '../utils/translations';
import { 
  Sparkles, 
  X, 
  TrendingUp, 
  MapPin, 
  Users, 
  Scale, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface AiPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  insight: AiPriceInsight | null;
  language: Language;
  onApplyPrice?: (price: number) => void;
  onFindBuyers?: () => void;
}

export const AiPriceModal: React.FC<AiPriceModalProps> = ({
  isOpen,
  onClose,
  insight,
  language,
  onApplyPrice,
  onFindBuyers
}) => {
  if (!isOpen || !insight) return null;

  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>DirectFarm Neural Pricing Engine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif]">
              {t.aiInsightTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Real-time APMC Mandi feeds • Urban buyer telemetry • Cold-chain optimization
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PRIMARY HERO CARD (Exact example from prompt) */}
        <div className="my-6 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1b4332] via-[#245842] to-[#12281e] text-white shadow-lg border border-emerald-900 relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-b border-emerald-800/80 pb-6 mb-6">
            
            <div>
              <span className="text-xs text-emerald-300 font-semibold block uppercase tracking-wider">Crop Listing</span>
              <div className="text-xl font-bold font-['Poppins',sans-serif] mt-0.5">{insight.crop}</div>
              <span className="text-xs text-emerald-200/80">{insight.quantity} kg batch</span>
            </div>

            <div>
              <span className="text-xs text-emerald-300 font-semibold block uppercase tracking-wider">Location</span>
              <div className="text-xl font-bold font-['Poppins',sans-serif] mt-0.5 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-300" />
                <span>{insight.location}</span>
              </div>
              <span className="text-xs text-emerald-200/80">65 km buyer radius</span>
            </div>

            <div>
              <span className="text-xs text-emerald-300 font-semibold block uppercase tracking-wider">Current Market Price</span>
              <div className="text-xl font-bold text-stone-300 font-['Poppins',sans-serif] mt-0.5">
                ₹{insight.currentMarketPrice} <span className="text-xs font-normal">/ kg</span>
              </div>
              <span className="text-xs text-rose-300">Local APMC Mandi rate</span>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl border border-white/20 backdrop-blur-xs">
              <span className="text-xs text-amber-300 font-extrabold block uppercase tracking-wider">
                AI Recommended Price
              </span>
              <div className="text-2xl font-extrabold text-amber-300 font-['Poppins',sans-serif] mt-0.5">
                ₹{insight.recommendedMinPrice}–{insight.recommendedMaxPrice} <span className="text-xs font-normal text-white">/ kg</span>
              </div>
              <span className="text-[11px] text-emerald-200 font-medium">+{insight.potentialEarningsIncrease}% Extra Farmer Earnings</span>
            </div>

          </div>

          {/* Demand and Selling Window */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 font-bold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Demand: <strong className="text-white">{insight.demandLevel}</strong>
              </span>

              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-stone-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                Window: {insight.optimalSellingWindow}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-300 font-semibold">{t.confidence}:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-400 text-stone-900 font-extrabold">
                {insight.confidenceScore}%
              </span>
            </div>
          </div>
        </div>

        {/* EXPLANATION OF WHY THE AI RECOMMENDED THIS PRICE */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 font-['Poppins',sans-serif]">
              {t.whyPrice}
            </h3>
            <span className="text-xs text-stone-400">5-Factor Algorithmic Analysis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            
            {/* Factor 1: Market Price */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>1. Current Market Price Trend</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {insight.factors.mandiPriceTrend}
              </p>
            </div>

            {/* Factor 2: Regional Demand */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>2. Consumer & Commercial Demand</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {insight.factors.demandSurge}
              </p>
            </div>

            {/* Factor 3: Location & Logistics */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>3. Location & Transport Efficiency</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {insight.factors.transportOptimization}
              </p>
            </div>

            {/* Factor 4: Historical Trends */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>4. Historical Seasonality & Trends</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {insight.factors.historicalTrends}
              </p>
            </div>

          </div>

          {/* Factor 5: Available Quantity & Spoilage */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-emerald-950 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>Quantity & Perishability Score:</strong> {insight.factors.spoilageRisk}</span>
            </div>
          </div>
        </div>

        {/* MATCHED BUYERS SECTION */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Direct Buyer Liquidity Pool ({insight.location})
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
              {insight.buyerMatching.activeBuyersCount} Verified Buyers Ready
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-white rounded-xl border border-stone-200">
              <span className="text-lg font-extrabold text-stone-900">{insight.buyerMatching.verifiedRestaurants}</span>
              <span className="text-[10px] text-stone-500 block">Hotels & Restaurants</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-stone-200">
              <span className="text-lg font-extrabold text-stone-900">{insight.buyerMatching.residentialSocieties}</span>
              <span className="text-[10px] text-stone-500 block">Housing Societies</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-stone-200">
              <span className="text-lg font-extrabold text-stone-900">{insight.buyerMatching.fpoPartners}</span>
              <span className="text-[10px] text-stone-500 block">FPO Partners</span>
            </div>
          </div>

          <div className="text-xs text-stone-600 flex items-center justify-between bg-white p-2.5 rounded-xl border border-stone-200">
            <span>Highest Current Verified Bid:</span>
            <strong className="text-emerald-800">{insight.buyerMatching.topBuyerQuote}</strong>
          </div>
        </div>

        {/* ACTION BUTTONS (Exact CTA: "Find Best Buyer") */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
          >
            Close
          </button>

          {onApplyPrice && (
            <button
              type="button"
              onClick={() => {
                onApplyPrice(insight.recommendedMinPrice);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{t.applyPrice} (₹{insight.recommendedMinPrice}/kg)</span>
            </button>
          )}

          <button
            type="button"
            id="find-best-buyer-btn"
            onClick={() => {
              if (onFindBuyers) onFindBuyers();
              onClose();
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 text-amber-300" />
            <span>{t.findBestBuyer}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
