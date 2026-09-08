import React, { useState } from 'react';
import { Product, Language, AiPriceInsight } from '../types';
import { translations } from '../utils/translations';
import { fetchAiPriceRecommendation } from '../services/aiService';
import { X, Sparkles, Upload, MapPin, Calendar, Check, AlertCircle, Loader2 } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Omit<Product, 'id'>) => void;
  language: Language;
  onOpenAiRecommendationScreen: (insight: AiPriceInsight) => void;
}

const POPULAR_CROPS = [
  { name: 'Tomato (Hybrid Desi)', category: 'vegetables', defaultMandi: 28, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80' },
  { name: 'Nashik Red Onion', category: 'vegetables', defaultMandi: 24, img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Kufri Jyoti Potato', category: 'vegetables', defaultMandi: 16, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sharbati Wheat C-306', category: 'grains', defaultMandi: 26, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Guntur Green Chilli', category: 'spices', defaultMandi: 48, img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Snowball Cauliflower', category: 'vegetables', defaultMandi: 20, img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=400&q=80' }
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  language,
  onOpenAiRecommendationScreen
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [cropName, setCropName] = useState('Tomato (Hybrid Desi)');
  const [category, setCategory] = useState<'vegetables' | 'fruits' | 'grains' | 'spices'>('vegetables');
  const [quantity, setQuantity] = useState('500');
  const [expectedPrice, setExpectedPrice] = useState('32');
  const [harvestDate, setHarvestDate] = useState('Today (Morning Harvest)');
  const [location, setLocation] = useState('Bilhaur, Kanpur Dehat');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80');
  const [variety, setVariety] = useState('Himsona Hybrid Grade A');
  const [shelfLifeDays, setShelfLifeDays] = useState('6');
  const [organic, setOrganic] = useState(false);
  
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [aiInsight, setAiInsight] = useState<AiPriceInsight | null>(null);

  const handleSelectPopularCrop = (item: typeof POPULAR_CROPS[0]) => {
    setCropName(item.name);
    setCategory(item.category as any);
    setImage(item.img);
    setExpectedPrice(String(item.defaultMandi + 4));
  };

  const handleGetAiSuggestion = async () => {
    setIsAnalyzingAi(true);
    try {
      const insight = await fetchAiPriceRecommendation({
        crop: cropName,
        quantity: Number(quantity) || 500,
        location,
        harvestDate,
        expectedPrice: Number(expectedPrice) || undefined
      });
      setAiInsight(insight);
      setExpectedPrice(String(insight.recommendedMinPrice));
      // Give feedback and option to view full screen
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !quantity || !expectedPrice) return;

    onAddProduct({
      name: cropName,
      nameHi: cropName,
      category,
      variety: variety || 'Standard Local Grade A',
      pricePerKg: Number(expectedPrice),
      marketPricePerKg: Math.max(12, Number(expectedPrice) - 4),
      retailSupermarketPrice: Math.round(Number(expectedPrice) * 1.35),
      availableQuantity: Number(quantity),
      unit: 'kg',
      farmerId: 'farmer-1',
      farmerName: 'Ramesh Kumar Patel',
      farmerPhoto: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=150&q=80',
      farmerRating: 4.9,
      farmerReviewCount: 130,
      location,
      distanceKm: 8.5,
      harvestDate,
      shelfLifeDays: Number(shelfLifeDays) || 7,
      image,
      organic,
      grade: 'Grade A+',
      description: `Freshly harvested ${cropName} directly from Bilhaur farm. High quality, sorted with zero chemical bath.`,
      descriptionHi: `${cropName} की ताज़ा और शुद्ध उपज सीधे खेत से।`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-700" />
              Farmer Direct Listing
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-1">
              {t.addCropTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Select Popular Crop Pills */}
        <div className="my-4">
          <span className="text-xs font-semibold text-stone-500 block mb-2">
            Quick Select Common Crop:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_CROPS.map((c) => (
              <button
                type="button"
                key={c.name}
                onClick={() => handleSelectPopularCrop(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  cropName.includes(c.name.split(' ')[0])
                    ? 'bg-emerald-100/80 border-emerald-400 text-emerald-900 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Crop Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {t.cropNameLabel} *
              </label>
              <input
                type="text"
                required
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                placeholder="e.g. Tomato (Himsona Hybrid)"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {t.categoryLabel} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 bg-white"
              >
                <option value="vegetables">Vegetables (सब्जियां)</option>
                <option value="fruits">Fruits (फल)</option>
                <option value="grains">Grains & Cereals (अनाज)</option>
                <option value="spices">Spices & Herbs (मसाले)</option>
              </select>
            </div>
          </div>

          {/* Quantity & Expected Price with AI Price Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {t.quantityLabel} *
              </label>
              <input
                type="number"
                required
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                placeholder="500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-stone-700 block">
                  {t.expectedPriceLabel} *
                </label>
                <span className="text-[10px] text-stone-400">Direct to Farmer</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-stone-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  placeholder="32"
                />
              </div>
            </div>
          </div>

          {/* PROMINENT AI PRICE SUGGESTION BANNER & BUTTON */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-amber-50 border-2 border-emerald-300/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>AI Price Intelligence Recommendation</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-tight">
                  Evaluates Kanpur & regional APMC Mandi bids, transport distances, and current buyer demand.
                </p>
              </div>

              <button
                type="button"
                id="get-ai-price-suggestion-btn"
                onClick={handleGetAiSuggestion}
                disabled={isAnalyzingAi}
                className="px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 shrink-0 transition-colors disabled:opacity-75"
              >
                {isAnalyzingAi ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    <span>Analyzing Mandi...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t.getAiPriceBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* If AI insight was fetched */}
            {aiInsight && (
              <div className="mt-3 pt-3 border-t border-emerald-200/80 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-700">
                    Mandi Baseline: <strong>₹{aiInsight.currentMarketPrice}/kg</strong>
                  </span>
                  <span className="text-emerald-900 font-bold bg-emerald-200/80 px-2 py-0.5 rounded">
                    AI Recommended: ₹{aiInsight.recommendedMinPrice}–₹{aiInsight.recommendedMaxPrice}/kg
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 italic">
                  "{aiInsight.aiSummary}"
                </p>
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => onOpenAiRecommendationScreen(aiInsight)}
                    className="text-[11px] text-emerald-800 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Full AI Rationale & Buyer Matches →</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Harvest Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {t.harvestDateLabel} *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  placeholder="e.g. Harvested Today 6:00 AM"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {t.locationLabel} *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  placeholder="e.g. Bilhaur, Kanpur Dehat"
                />
              </div>
            </div>
          </div>

          {/* Product Image URL or sample selection */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Crop Image Preview / URL
            </label>
            <div className="flex items-center gap-3">
              <img 
                src={image} 
                alt="Produce preview" 
                className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
                placeholder="Image URL"
              />
            </div>
          </div>

          {/* Organic check */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="organic-check"
              checked={organic}
              onChange={(e) => setOrganic(e.target.checked)}
              className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-500"
            />
            <label htmlFor="organic-check" className="text-xs text-stone-700 font-medium cursor-pointer">
              Grown with Natural Cow Compost / Zero Chemical Sprays (जैविक / प्राकृतिक)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="publish-crop-listing-btn"
              className="px-6 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{t.publishCrop}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
