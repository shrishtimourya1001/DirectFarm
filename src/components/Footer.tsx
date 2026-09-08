import React from 'react';
import { RoleMode, Language } from '../types';
import { translations } from '../utils/translations';
import { Sprout, ShieldCheck, HeartHandshake, Leaf, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onSelectRole: (role: RoleMode) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRole, language }) => {
  const t = translations[language];

  return (
    <footer className="bg-[#12281e] text-stone-300 border-t border-emerald-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#52b788] flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-white">
                Direct<span className="text-[#52b788]">Farm</span>
              </span>
            </div>
            <p className="text-sm text-stone-300 max-w-md leading-relaxed">
              {language === 'en'
                ? 'An AI-powered Farmer-to-Consumer decentralized marketplace engineered to eliminate parasitic multi-tier intermediaries, guarantee remunerative prices to Indian farmers, and bring verifiable harvest freshness to consumers.'
                : 'भारतीय कृषि में बिचौलियों के अनावश्यक स्तरों को समाप्त करने, किसानों को उनकी मेहनत का पूरा मूल्य दिलाने और उपभोक्ताओं तक खेत की ताज़ा उपज पहुँचाने का आधुनिक मंच।'}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero Commission Brokerage
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-emerald-950/80 text-amber-300 border border-amber-800/60 font-medium">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                Escrow Kisan-Pay
              </span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Platform Modes
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onSelectRole('landing')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectRole('farmer')}
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#74c69d]"
                >
                  Farmer Portal & AI Rates <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectRole('buyer')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Consumer Marketplace
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectRole('supply-chain')}
                  className="hover:text-white transition-colors flex items-center gap-1 text-amber-300"
                >
                  Supply Chain Comparison <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectRole('admin')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Admin Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Core Technology */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              AI AgriTech Stack
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>Mandi Price Sentiment Engine</li>
              <li>Dynamic Urban Demand Predictor</li>
              <li>Geo-Radius Logistics Aggregator</li>
              <li>Spoilage Minimization Route Planner</li>
              <li>Transparent Digital APMC Ledger</li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Pilot Agro Corridors
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Active pilot clusters in Kanpur Dehat (UP), Lasalgaon-Nashik (MH), Ludhiana-Samrala (PB), and Baramati-Pune (MH).
            </p>
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-200">
              <span className="font-semibold text-white block mb-0.5">National Hackathon Edition</span>
              Demonstrating direct economic value creation for India's 140M+ farming households.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>© 2026 DirectFarm Technologies Inc. Built with pride for Indian Farmers.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-200 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-200 cursor-pointer">Farmer Terms</span>
            <span>•</span>
            <span className="hover:text-stone-200 cursor-pointer">Quality Verification Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
