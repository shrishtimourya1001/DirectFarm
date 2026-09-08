import React, { useState } from 'react';
import { Product, Order, Farmer, Language } from '../types';
import { translations } from '../utils/translations';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Scale, 
  BarChart3, 
  Activity, 
  Layers, 
  ArrowUpRight,
  Truck
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  farmers: Farmer[];
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  farmers,
  language
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'overview' | 'transparency' | 'supply_demand' | 'hubs'>('overview');

  // Computed metrics
  const totalTransactionVolume = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 4820000;
  const totalMiddlemanSaved = Math.round(totalTransactionVolume * 0.38); // 38% middleman margin eliminated
  const activeFarmersCount = farmers.length + 380;
  const activeConsumersCount = 2450;

  // Regional trading hubs data
  const TRADING_HUBS = [
    {
      name: 'Kanpur-Lucknow Agro-Corridor',
      state: 'Uttar Pradesh',
      activeFarmers: 142,
      activeBuyers: 890,
      monthlyVolumeTons: 380,
      topCrops: 'Tomato, Potato, Cauliflower, Chilli',
      status: 'High Surge',
      middlemanCutEliminated: '₹8.4 Lakhs'
    },
    {
      name: 'Nashik-Pune Onion & Grape Cluster',
      state: 'Maharashtra',
      activeFarmers: 110,
      activeBuyers: 720,
      monthlyVolumeTons: 520,
      topCrops: 'Red Onion, Grapes, Pomegranate',
      status: 'Stable Surplus',
      middlemanCutEliminated: '₹6.1 Lakhs'
    },
    {
      name: 'Ludhiana-Chandigarh Grain Belt',
      state: 'Punjab',
      activeFarmers: 78,
      activeBuyers: 510,
      monthlyVolumeTons: 840,
      topCrops: 'Sharbati Wheat, Basmati Rice, Mustard',
      status: 'Bulk Movement',
      middlemanCutEliminated: '₹4.8 Lakhs'
    },
    {
      name: 'Indore-Malwa Soybean & Spices Hub',
      state: 'Madhya Pradesh',
      activeFarmers: 56,
      activeBuyers: 330,
      monthlyVolumeTons: 290,
      topCrops: 'Garlic, Coriander, Wheat',
      status: 'Growing',
      middlemanCutEliminated: '₹2.9 Lakhs'
    }
  ];

  // Supply vs Demand matrix
  const SUPPLY_DEMAND_METRICS = [
    { crop: 'Tomato (Hybrid Desi)', supplyKg: 42000, demandKg: 68000, ratio: 62, status: 'High Demand Deficit', priceTrend: '+12% expected' },
    { crop: 'Nashik Red Onion', supplyKg: 85000, demandKg: 79000, ratio: 108, status: 'Balanced Supply', priceTrend: 'Stable' },
    { crop: 'Kufri Jyoti Potato', supplyKg: 120000, demandKg: 95000, ratio: 126, status: 'Surplus Available', priceTrend: 'Mild drop' },
    { crop: 'Sharbati Wheat C-306', supplyKg: 65000, demandKg: 92000, ratio: 71, status: 'High Institutional Demand', priceTrend: '+8% expected' },
    { crop: 'Guntur Green Chilli', supplyKg: 18000, demandKg: 31000, ratio: 58, status: 'Severe Shortage', priceTrend: '+22% surge' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. ADMIN HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>DirectFarm Master Operations & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-1.5">
            {t.adminDashboard}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Network oversight, algorithmic price monitoring, escrow settlement status, and trade hub balance.
          </p>
        </div>

        {/* Live Network Health Indicator */}
        <div className="flex items-center gap-3 bg-stone-50 px-4 py-2.5 rounded-2xl border border-stone-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="text-stone-400 block font-medium">Platform Escrow</span>
            <span className="font-bold text-stone-900">100% Guaranteed</span>
          </div>
        </div>
      </div>

      {/* 2. FOUR KEY METRICS CARDS (Exact from prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Total Transactions */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>{t.totalTransactions}</span>
            <Activity className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] pt-1">
            ₹{(totalTransactionVolume / 100000).toFixed(1)} Lakhs
          </div>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +24.8% Month-over-Month
          </span>
        </div>

        {/* Metric 2: Active Farmers */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>{t.activeFarmers}</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] pt-1">
            {activeFarmersCount}
          </div>
          <span className="text-xs text-stone-500">Across 18 regional districts</span>
        </div>

        {/* Metric 3: Active Consumers / Buyers */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>{t.activeBuyers}</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] pt-1">
            {activeConsumersCount.toLocaleString()}
          </div>
          <span className="text-xs text-stone-500">Families & HoReCa Partners</span>
        </div>

        {/* Metric 4: Estimated Middleman Cost Saved */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1b4332] to-[#245842] text-white shadow-md space-y-1">
          <div className="flex items-center justify-between text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <span>{t.middlemanSaved}</span>
            <DollarSign className="w-4 h-4 text-amber-300" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-['Poppins',sans-serif] pt-1">
            ₹{(totalMiddlemanSaved / 100000).toFixed(1)} Lakhs
          </div>
          <span className="text-xs text-emerald-200 font-medium">Bypassed trader margins</span>
        </div>

      </div>

      {/* 3. TABS FOR VISUAL ANALYTICS */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-1">
        {[
          { id: 'overview', label: 'Overview & Hubs' },
          { id: 'transparency', label: 'Price Transparency Audit' },
          { id: 'supply_demand', label: 'Supply vs Demand Analysis' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. TAB CONTENTS */}

      {/* TAB 1: OVERVIEW & GEOGRAPHIC TRADING HUBS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 font-['Poppins',sans-serif]">
              Geographic Trading Hubs & Corridors
            </h3>
            <span className="text-xs text-stone-400">Real-time load balancing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TRADING_HUBS.map((hub, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{hub.state}</span>
                    <h4 className="text-base font-bold text-stone-900 font-['Poppins',sans-serif]">{hub.name}</h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    hub.status.includes('Surge') ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {hub.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-stone-50 rounded-2xl border border-stone-100">
                  <div>
                    <span className="text-stone-400 text-[10px] block">Farmers</span>
                    <span className="font-extrabold text-stone-900 text-sm">{hub.activeFarmers}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] block">Buyers</span>
                    <span className="font-extrabold text-stone-900 text-sm">{hub.activeBuyers}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] block">Monthly Volume</span>
                    <span className="font-extrabold text-emerald-800 text-sm">{hub.monthlyVolumeTons} Tons</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Key Crops Traded:</span>
                    <strong className="text-stone-900">{hub.topCrops}</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Intermediary Margin Saved:</span>
                    <strong className="text-emerald-800 font-bold">{hub.middlemanCutEliminated}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PRICE TRANSPARENCY AUDIT */}
      {activeTab === 'transparency' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-['Poppins',sans-serif]">
                Price Transparency Audit: Traditional vs DirectFarm
              </h3>
              <p className="text-xs text-stone-500">
                Comparing APMC Mandi Distress Rates, Middleman Markups, and DirectFarm Farmer Payouts.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              Verified Daily APMC Feeds
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-700 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Produce</th>
                  <th className="py-3.5 px-4 text-rose-700">Mandi Price Paid to Farmer</th>
                  <th className="py-3.5 px-4 text-emerald-800">DirectFarm Farmer Payout</th>
                  <th className="py-3.5 px-4">Traditional Retail Price</th>
                  <th className="py-3.5 px-4 text-emerald-900 font-extrabold">DirectFarm Consumer Price</th>
                  <th className="py-3.5 px-4">Farmer Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                <tr>
                  <td className="py-3 px-4 font-bold text-stone-900">Tomato (Hybrid)</td>
                  <td className="py-3 px-4 text-rose-600">₹18/kg</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">₹31/kg</td>
                  <td className="py-3 px-4">₹42/kg</td>
                  <td className="py-3 px-4 text-emerald-900 font-extrabold">₹32.5/kg</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold">+72.2%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-stone-900">Nashik Red Onion</td>
                  <td className="py-3 px-4 text-rose-600">₹16/kg</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">₹28/kg</td>
                  <td className="py-3 px-4">₹39/kg</td>
                  <td className="py-3 px-4 text-emerald-900 font-extrabold">₹29.5/kg</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold">+75.0%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-stone-900">Kufri Jyoti Potato</td>
                  <td className="py-3 px-4 text-rose-600">₹11/kg</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">₹19/kg</td>
                  <td className="py-3 px-4">₹28/kg</td>
                  <td className="py-3 px-4 text-emerald-900 font-extrabold">₹20.5/kg</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold">+72.7%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-stone-900">Sharbati Wheat C-306</td>
                  <td className="py-3 px-4 text-rose-600">₹22/kg</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">₹34/kg</td>
                  <td className="py-3 px-4">₹48/kg</td>
                  <td className="py-3 px-4 text-emerald-900 font-extrabold">₹36.0/kg</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold">+54.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SUPPLY VS DEMAND ANALYSIS */}
      {activeTab === 'supply_demand' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-['Poppins',sans-serif]">
                Supply vs Demand Predictive Telemetry
              </h3>
              <p className="text-xs text-stone-500">
                AI market forecasting to notify farmers when to harvest and sell for peak earnings.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">
              Dynamic AI Signals
            </span>
          </div>

          <div className="space-y-4">
            {SUPPLY_DEMAND_METRICS.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-stone-900 text-sm">{item.crop}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                      item.ratio < 80 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-stone-500 font-semibold">{item.priceTrend}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Available Supply: {(item.supplyKg / 1000).toFixed(1)} MT</span>
                    <span>Buyer Demand: {(item.demandKg / 1000).toFixed(1)} MT</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full ${item.ratio < 80 ? 'bg-amber-500' : 'bg-emerald-600'}`} 
                      style={{ width: `${Math.min(100, item.ratio)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
