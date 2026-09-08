import React, { useState } from 'react';
import { Product, Farmer, Language, CropCategory } from '../types';
import { translations } from '../utils/translations';
import { 
  Search, 
  MapPin, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  Filter, 
  Check, 
  Leaf, 
  ArrowRight,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

interface BuyerMarketplaceProps {
  products: Product[];
  farmers: Farmer[];
  language: Language;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onSelectFarmer: (farmer: Farmer) => void;
}

export const BuyerMarketplace: React.FC<BuyerMarketplaceProps> = ({
  products,
  farmers,
  language,
  onSelectProduct,
  onBuyNow,
  onSelectFarmer
}) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CropCategory>('all');
  const [maxDistance, setMaxDistance] = useState<number>(50); // in km
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');

  // Filter & Sort
  const filteredProducts = products.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDistance = item.distanceKm <= maxDistance;

    return matchesSearch && matchesCategory && matchesDistance;
  }).sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'price') return a.pricePerKg - b.pricePerKg;
    if (sortBy === 'rating') return b.farmerRating - a.farmerRating;
    return 0;
  });

  const categories: { id: CropCategory; label: string }[] = [
    { id: 'all', label: t.allCategories },
    { id: 'vegetables', label: t.vegCat },
    { id: 'fruits', label: t.fruitCat },
    { id: 'grains', label: t.grainCat },
    { id: 'spices', label: t.spiceCat },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. MARKETPLACE BANNER & SEARCH */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-amber-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct-to-Consumer Fresh Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-1.5">
              Fresh Harvests, Straight from Verified Farms
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Bypass supermarket markups. Picked today, delivered within 16 hours directly from Kanpur, Nashik & Ludhiana farms.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 shrink-0">
            <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Zero Middleman Markups
            </span>
          </div>
        </div>

        {/* Big Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
          <input
            type="text"
            id="buyer-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-stone-300 bg-white text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills & Filters Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#1b4332] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Distance and Sort Controls */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-200">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <span className="font-semibold text-stone-600">Max Distance:</span>
              <select
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="bg-transparent font-bold text-stone-900 focus:outline-hidden"
              >
                <option value={10}>Within 10 km</option>
                <option value={20}>Within 20 km</option>
                <option value={50}>Within 50 km</option>
                <option value={100}>All India (100 km+)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-600">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-stone-900 focus:outline-hidden"
              >
                <option value="distance">Nearest Farm First</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Top Farmer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NEARBY VERIFIED FARMERS STRIP */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-stone-900 font-['Poppins',sans-serif]">
              Nearby Verified Farmers Ready for Dispatch
            </h3>
          </div>
          <span className="text-xs text-stone-500">Tap a farmer to see full profile & farm credentials</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              onClick={() => onSelectFarmer(farmer)}
              className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all duration-200 flex items-center gap-3 group"
            >
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-12 h-12 rounded-xl object-cover border border-emerald-200 shrink-0 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-0.5 overflow-hidden">
                <div className="flex items-center gap-1">
                  <h4 className="font-bold text-stone-900 text-xs truncate group-hover:text-emerald-800 transition-colors">
                    {farmer.name}
                  </h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <p className="text-[11px] text-stone-500 truncate">{farmer.location}</p>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="flex items-center text-amber-500 font-bold">
                    <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" />
                    {farmer.rating}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-emerald-700 font-medium">{farmer.farmSizeAcres} Acres</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FRESH PRODUCE CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 font-['Poppins',sans-serif]">
            Available Produce ({filteredProducts.length} Lots)
          </h2>
          <span className="text-xs text-stone-400">All prices in ₹/kg (Direct Farm Gate Rate)</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
            <Leaf className="w-8 h-8 text-stone-300 mx-auto" />
            <h4 className="text-base font-bold text-stone-800">No produce matches this filter</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search query, increasing distance radius, or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setMaxDistance(50);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const savings = product.retailSupermarketPrice - product.pricePerKg;
              const savingsPercent = Math.round((savings / product.retailSupermarketPrice) * 100);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  {/* Top Image Section */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Savings Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#1b4332] text-white text-[10px] font-bold shadow-md flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-amber-300" />
                      <span>Save ₹{savings}/kg ({savingsPercent}%)</span>
                    </div>

                    {/* Grade or Organic Badge */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-stone-800 shadow-xs">
                        {product.grade}
                      </span>
                      {product.organic && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-bold">
                          100% Organic
                        </span>
                      )}
                    </div>

                    {/* Harvest Date Bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-stone-900/70 backdrop-blur-xs text-stone-200 text-[10px] px-3 py-1 font-medium flex items-center justify-between">
                      <span>{product.harvestDate}</span>
                      <span className="text-emerald-300">Shelf: {product.shelfLifeDays}d</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Product Name & Variety */}
                      <h3 className="font-bold text-stone-900 text-base font-['Poppins',sans-serif] line-clamp-1 group-hover:text-emerald-800 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {product.variety}
                      </p>

                      {/* Price Comparison */}
                      <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-stone-100">
                        <div>
                          <span className="text-xs text-stone-400 block line-through">
                            Supermarket: ₹{product.retailSupermarketPrice}/kg
                          </span>
                          <div className="text-xl font-extrabold text-emerald-900 font-['Poppins',sans-serif]">
                            ₹{product.pricePerKg} <span className="text-xs font-normal text-stone-500">/ {product.unit}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-stone-400 block">Available Lot</span>
                          <span className="text-xs font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                            {product.availableQuantity} {product.unit}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Farmer Information Block */}
                    <div 
                      onClick={() => {
                        const f = farmers.find(farm => farm.id === product.farmerId);
                        if (f) onSelectFarmer(f);
                      }}
                      className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/60 cursor-pointer border border-stone-100 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img
                          src={product.farmerPhoto}
                          alt={product.farmerName}
                          className="w-7 h-7 rounded-full object-cover border border-emerald-300 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden">
                          <span className="text-xs font-semibold text-stone-900 block truncate">
                            {product.farmerName}
                          </span>
                          <span className="text-[10px] text-stone-500 flex items-center gap-0.5 truncate">
                            <MapPin className="w-2.5 h-2.5 text-emerald-700 shrink-0" />
                            {product.location} ({product.distanceKm} km away)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{product.farmerRating}</span>
                      </div>
                    </div>

                    {/* Action Buttons (Exact: "Buy Now" button) */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-500" />
                        <span>{t.viewDetails}</span>
                      </button>

                      <button
                        type="button"
                        id={`buy-now-${product.id}`}
                        onClick={() => onBuyNow(product)}
                        className="py-2.5 px-3 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <span>{t.buyNow}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
