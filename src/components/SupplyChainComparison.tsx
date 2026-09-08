import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Award,
  DollarSign
} from 'lucide-react';

interface SupplyChainProps {
  language: Language;
  onGoToFarmer: () => void;
  onGoToMarketplace: () => void;
}

interface CropSimulatorData {
  name: string;
  nameHi: string;
  traditionalFarmerPrice: number;
  traderPrice: number;
  wholesalerPrice: number;
  retailerPrice: number;
  consumerPriceTraditional: number;
  directFarmFarmerPrice: number;
  directFarmLogisticsFee: number;
  consumerPriceDirect: number;
  unit: string;
}

const CROPS_DATA: Record<string, CropSimulatorData> = {
  tomato: {
    name: 'Tomato (Hybrid)',
    nameHi: 'टमाटर (हाइब्रिड)',
    traditionalFarmerPrice: 18,
    traderPrice: 22,
    wholesalerPrice: 28,
    retailerPrice: 38,
    consumerPriceTraditional: 42,
    directFarmFarmerPrice: 31,
    directFarmLogisticsFee: 1.5,
    consumerPriceDirect: 32.5,
    unit: 'kg'
  },
  onion: {
    name: 'Nashik Red Onion',
    nameHi: 'नासिक लाल प्याज',
    traditionalFarmerPrice: 16,
    traderPrice: 20,
    wholesalerPrice: 26,
    retailerPrice: 34,
    consumerPriceTraditional: 39,
    directFarmFarmerPrice: 28,
    directFarmLogisticsFee: 1.5,
    consumerPriceDirect: 29.5,
    unit: 'kg'
  },
  wheat: {
    name: 'Sharbati Wheat',
    nameHi: 'शरबती गेहूं',
    traditionalFarmerPrice: 22,
    traderPrice: 25,
    wholesalerPrice: 31,
    retailerPrice: 42,
    consumerPriceTraditional: 48,
    directFarmFarmerPrice: 34,
    directFarmLogisticsFee: 2.0,
    consumerPriceDirect: 36.0,
    unit: 'kg'
  },
  potato: {
    name: 'Kufri Jyoti Potato',
    nameHi: 'कुफरी ज्योति आलू',
    traditionalFarmerPrice: 11,
    traderPrice: 14,
    wholesalerPrice: 18,
    retailerPrice: 24,
    consumerPriceTraditional: 28,
    directFarmFarmerPrice: 19,
    directFarmLogisticsFee: 1.5,
    consumerPriceDirect: 20.5,
    unit: 'kg'
  }
};

export const SupplyChainComparison: React.FC<SupplyChainProps> = ({
  language,
  onGoToFarmer,
  onGoToMarketplace
}) => {
  const t = translations[language];
  const [selectedCropKey, setSelectedCropKey] = useState<string>('tomato');
  const [quantity, setQuantity] = useState<number>(2000); // 2000 kg default batch

  const crop = CROPS_DATA[selectedCropKey] || CROPS_DATA.tomato;

  // Real Financial Calculations
  const traditionalTotalFarmerRevenue = crop.traditionalFarmerPrice * quantity;
  const traditionalTotalConsumerCost = crop.consumerPriceTraditional * quantity;
  const traditionalMiddlemanCut = traditionalTotalConsumerCost - traditionalTotalFarmerRevenue;

  const directFarmTotalFarmerRevenue = crop.directFarmFarmerPrice * quantity;
  const directFarmTotalConsumerCost = crop.consumerPriceDirect * quantity;
  const extraFarmerIncome = directFarmTotalFarmerRevenue - traditionalTotalFarmerRevenue;
  const totalConsumerSavings = traditionalTotalConsumerCost - directFarmTotalConsumerCost;

  const farmerGainPercent = Math.round(((crop.directFarmFarmerPrice - crop.traditionalFarmerPrice) / crop.traditionalFarmerPrice) * 100);
  const consumerSavePercent = Math.round(((crop.consumerPriceTraditional - crop.consumerPriceDirect) / crop.consumerPriceTraditional) * 100);
  const spoilageSavedKg = Math.round(quantity * 0.16); // 16% transit waste prevented

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. PRESENTATION HEADER FOR HACKATHON JUDGES */}
      <div className="bg-gradient-to-r from-[#12281e] via-[#1b4332] to-[#245842] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-900 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>National Hackathon Presentation Screen</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Poppins',sans-serif] tracking-tight">
            Supply Chain Disintermediation Engine
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            Directly comparing the extractive 5-tier traditional distribution system against DirectFarm's AI-coordinated 3-tier transparent network.
          </p>
        </div>

        {/* Quick Simulator Controls Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-800/80 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-2">
              Select Crop to Simulate:
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CROPS_DATA).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCropKey(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCropKey === key
                      ? 'bg-amber-400 text-stone-900 shadow-md scale-105'
                      : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-emerald-300 font-bold mb-1">
              <span>Harvest Volume:</span>
              <span className="text-white text-sm">{quantity.toLocaleString('en-IN')} kg ({quantity / 1000} Metric Tons)</span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="100"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-emerald-400/80 mt-1">
              <span>200 kg (Smallholder)</span>
              <span>5,000 kg</span>
              <span>10,000 kg (FPO Collective)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP IMPACT SCORECARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Farmer Earnings Lift
          </span>
          <div className="text-3xl font-extrabold text-emerald-900 font-['Poppins',sans-serif] mt-1">
            +{farmerGainPercent}%
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">
            Extra +₹{extraFarmerIncome.toLocaleString('en-IN')} in farmer pocket
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border-2 border-amber-400 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
            Consumer Savings
          </span>
          <div className="text-3xl font-extrabold text-amber-900 font-['Poppins',sans-serif] mt-1">
            -{consumerSavePercent}%
          </div>
          <span className="text-xs text-amber-700 font-semibold mt-1 block">
            Saved ₹{totalConsumerSavings.toLocaleString('en-IN')} vs retail store
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
            Intermediaries Bypassed
          </span>
          <div className="text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-1">
            4 Removed
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            Zero trader, broker & cartel markup
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
            Food Waste Prevented
          </span>
          <div className="text-3xl font-extrabold text-[#1b4332] font-['Poppins',sans-serif] mt-1">
            {spoilageSavedKg} kg
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">
            Direct &lt;14 hr cold-transit chain
          </span>
        </div>
      </div>

      {/* 3. VISUAL FLOW COMPARISON */}
      <div className="space-y-8">
        
        {/* CURRENT BROKEN SYSTEM */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-rose-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-rose-100">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-base uppercase tracking-wider">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>CURRENT SYSTEM: 4 Intermediaries Extractive Chain</span>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Total Middleman Leakage: ₹{traditionalMiddlemanCut.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Flow Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            
            {/* Node 1: Farmer */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase">Step 1</span>
              <h4 className="font-bold text-stone-900 text-sm">Farmer</h4>
              <div className="text-xl font-extrabold text-stone-800 font-['Poppins',sans-serif]">
                ₹{crop.traditionalFarmerPrice}/kg
              </div>
              <p className="text-[10px] text-stone-500">Takes 100% weather & crop cost risks</p>
            </div>

            {/* Node 2: Trader */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase">Step 2</span>
              <h4 className="font-bold text-rose-950 text-sm">Village Trader</h4>
              <div className="text-xl font-extrabold text-rose-800 font-['Poppins',sans-serif]">
                ₹{crop.traderPrice}/kg
              </div>
              <p className="text-[10px] text-rose-600">+₹{crop.traderPrice - crop.traditionalFarmerPrice} cartage & weigh fee</p>
            </div>

            {/* Node 3: Wholesaler */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase">Step 3</span>
              <h4 className="font-bold text-rose-950 text-sm">APMC Wholesaler</h4>
              <div className="text-xl font-extrabold text-rose-800 font-['Poppins',sans-serif]">
                ₹{crop.wholesalerPrice}/kg
              </div>
              <p className="text-[10px] text-rose-600">+₹{crop.wholesalerPrice - crop.traderPrice} mandi auction cut</p>
            </div>

            {/* Node 4: Retailer */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase">Step 4</span>
              <h4 className="font-bold text-rose-950 text-sm">City Retailer</h4>
              <div className="text-xl font-extrabold text-rose-800 font-['Poppins',sans-serif]">
                ₹{crop.retailerPrice}/kg
              </div>
              <p className="text-[10px] text-rose-600">+₹{crop.retailerPrice - crop.wholesalerPrice} distribution margin</p>
            </div>

            {/* Node 5: Consumer */}
            <div className="p-4 rounded-2xl bg-rose-100/70 border-2 border-rose-300 text-center space-y-1">
              <span className="text-[10px] font-bold text-rose-900 uppercase">Final Price</span>
              <h4 className="font-bold text-rose-950 text-sm">Consumer</h4>
              <div className="text-2xl font-extrabold text-rose-700 font-['Poppins',sans-serif]">
                ₹{crop.consumerPriceTraditional}/kg
              </div>
              <p className="text-[10px] text-rose-800 font-semibold">Total Cost: ₹{traditionalTotalConsumerCost.toLocaleString('en-IN')}</p>
            </div>

          </div>

          <div className="p-3 rounded-xl bg-stone-100 text-stone-600 text-xs flex flex-wrap items-center justify-between gap-3">
            <span>⏱ Average Supply Duration: <strong>4.8 Days in Transit</strong></span>
            <span>⚠️ Post-harvest rotting: <strong>18–22% Food Loss</strong></span>
            <span>📉 Farmer Share of Final Consumer Rupee: <strong>Only 42.8%</strong></span>
          </div>
        </div>

        {/* DIRECTFARM SYSTEM */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-500 shadow-lg space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-2xl -z-10" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>DIRECTFARM: Direct 3-Tier Transparent Network</span>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              94.5% Value Delivered Directly to Cultivator
            </span>
          </div>

          {/* DirectFarm Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Farmer */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-400 text-center space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Step 1 • Direct Source</span>
              <h4 className="font-bold text-emerald-950 text-base">Verified Farmer</h4>
              <div className="text-3xl font-extrabold text-emerald-900 font-['Poppins',sans-serif]">
                ₹{crop.directFarmFarmerPrice} <span className="text-xs font-normal">/ kg</span>
              </div>
              <div className="text-xs font-bold text-emerald-700 bg-white py-1 px-2 rounded-lg border border-emerald-200 inline-block">
                +{farmerGainPercent}% Income Lift
              </div>
              <p className="text-xs text-emerald-800 mt-1">Total Farmer Payout: <strong>₹{directFarmTotalFarmerRevenue.toLocaleString('en-IN')}</strong></p>
            </div>

            {/* Step 2: DirectFarm Quality & Logistics */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Step 2 • Tech Layer</span>
              <h4 className="font-bold text-stone-900 text-base">DirectFarm AI Platform</h4>
              <div className="text-xl font-extrabold text-stone-800 font-['Poppins',sans-serif]">
                ₹{crop.directFarmLogisticsFee} <span className="text-xs font-normal">/ kg</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Quality grading, cold-box handling, and escrow settlement fee. No speculative hoarding markups.
              </p>
            </div>

            {/* Step 3: Consumer */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-400 text-center space-y-2">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Step 3 • Delivery</span>
              <h4 className="font-bold text-amber-950 text-base">Direct Consumer</h4>
              <div className="text-3xl font-extrabold text-amber-900 font-['Poppins',sans-serif]">
                ₹{crop.consumerPriceDirect} <span className="text-xs font-normal">/ kg</span>
              </div>
              <div className="text-xs font-bold text-amber-800 bg-white py-1 px-2 rounded-lg border border-amber-200 inline-block">
                {consumerSavePercent}% Cheaper vs Supermarkets
              </div>
              <p className="text-xs text-amber-900 mt-1">Total Consumer Spend: <strong>₹{directFarmTotalConsumerCost.toLocaleString('en-IN')}</strong></p>
            </div>

          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs flex flex-wrap items-center justify-between gap-3 font-medium">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-700" /> Farm-to-Fork: <strong>Under 14 Hours</strong></span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-700" /> Zero Chemical preservation baths</span>
            <span>💰 Farmer Share of Rupee: <strong className="text-emerald-950">95.3%</strong></span>
          </div>
        </div>

      </div>

      {/* 4. COMPARISON MATRIX TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <h3 className="text-xl font-bold text-stone-900 font-['Poppins',sans-serif]">
          Feature-by-Feature Model Audit
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-700 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Supply Metric</th>
                <th className="py-3 px-4 text-rose-700">Traditional Mandi System</th>
                <th className="py-3 px-4 text-emerald-800">DirectFarm Network</th>
                <th className="py-3 px-4">Disintermediation Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">Intermediary Layers</td>
                <td className="py-3 px-4 text-rose-600 font-semibold">4 Entities (Trader, Mandi agent, Wholesaler, Retailer)</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">0 Middlemen (Direct Platform Coordination)</td>
                <td className="py-3 px-4 text-stone-500">Removes ₹14–24/kg speculative markups</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">Farmer Selling Price</td>
                <td className="py-3 px-4 text-rose-600">₹{crop.traditionalFarmerPrice}/kg (Mandi distress rate)</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">₹{crop.directFarmFarmerPrice}/kg (AI-recommended)</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">+{farmerGainPercent}% instant income lift</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">Consumer Retail Price</td>
                <td className="py-3 px-4 text-rose-600">₹{crop.consumerPriceTraditional}/kg</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">₹{crop.consumerPriceDirect}/kg</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">{consumerSavePercent}% savings for families</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">Payment Timeline</td>
                <td className="py-3 px-4 text-stone-600">14 to 30 days delayed credit by traders</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">Immediate Kisan Escrow (Same Day)</td>
                <td className="py-3 px-4 text-stone-500">Zero debt trap cycle</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">Perishability & Spoilage</td>
                <td className="py-3 px-4 text-rose-600">18–22% spoiled across multi-day warehousing</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">&lt;3% with same-day direct dispatch</td>
                <td className="py-3 px-4 text-stone-500">Conserves national food security</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onGoToFarmer}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm shadow-md transition-colors"
        >
          Test Farmer Mode & List Produce →
        </button>

        <button
          onClick={onGoToMarketplace}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-[#1b4332] border-2 border-emerald-200 font-bold text-sm shadow-xs transition-colors"
        >
          Explore Consumer Marketplace →
        </button>
      </div>

    </div>
  );
};
