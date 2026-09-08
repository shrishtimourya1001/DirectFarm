import React, { useState } from 'react';
import { Product, Farmer, Language } from '../types';
import { translations } from '../utils/translations';
import { 
  X, 
  MapPin, 
  Star, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingDown, 
  Minus, 
  Plus, 
  ArrowRight,
  Phone,
  MessageSquare,
  Truck
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onProceedToCheckout: (product: Product, quantityKg: number) => void;
  farmers: Farmer[];
  onOpenFarmerProfile: (farmer: Farmer) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
  onProceedToCheckout,
  farmers,
  onOpenFarmerProfile
}) => {
  if (!isOpen || !product) return null;

  const t = translations[language];
  const [selectedQuantity, setSelectedQuantity] = useState<number>(Math.min(10, product.availableQuantity));

  const farmer = farmers.find(f => f.id === product.farmerId);
  const totalPrice = selectedQuantity * product.pricePerKg;
  const farmerShare = Math.round(totalPrice * 0.94);
  const logisticsFee = totalPrice - farmerShare;
  const savingsVsSupermarket = Math.round((product.retailSupermarketPrice - product.pricePerKg) * selectedQuantity);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header Close */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase">
              {product.grade}
            </span>
            {product.organic && (
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-700 text-white text-xs font-bold">
                100% Organic Certified
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Media & Core Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-5">
          <div className="h-56 sm:h-full rounded-2xl overflow-hidden bg-stone-100 relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#1b4332] text-white text-xs font-bold shadow-md flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-amber-300" />
              <span>Save ₹{product.retailSupermarketPrice - product.pricePerKg}/kg</span>
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-stone-900 font-['Poppins',sans-serif]">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Variety: <strong>{product.variety}</strong>
              </p>

              <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-xs text-stone-400 line-through">
                  Supermarket MRP: ₹{product.retailSupermarketPrice}/kg
                </div>
                <div className="text-2xl font-extrabold text-emerald-900 font-['Poppins',sans-serif]">
                  ₹{product.pricePerKg} <span className="text-xs font-normal text-stone-600">/ kg</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium">
                  Direct harvest rate with 0% middleman cut
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Harvested: <strong>{product.harvestDate}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Farm Distance: <strong>{product.distanceKm} km</strong> ({product.location})</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Shelf Life: <strong>{product.shelfLifeDays} days naturally</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
          {language === 'hi' ? product.descriptionHi : product.description}
        </p>

        {/* Farmer Card Snippet */}
        {farmer && (
          <div className="my-5 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={farmer.avatar} 
                alt={farmer.name} 
                className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-300 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{farmer.name}</h4>
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="text-[11px] text-stone-500 block">{farmer.location}</span>
                <span className="text-[10px] text-emerald-800 font-semibold">
                  {farmer.farmSizeAcres} Acres • {farmer.farmingPractices[0]}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenFarmerProfile(farmer);
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 transition-colors shrink-0"
            >
              View Full Farmer Profile →
            </button>
          </div>
        )}

        {/* Quantity Selector & Transparent Cost Breakdown */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 my-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-900 block">Select Quantity</span>
              <span className="text-[11px] text-stone-500">Available batch: {product.availableQuantity} kg</span>
            </div>

            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-stone-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                className="p-1 text-stone-500 hover:text-stone-900"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-stone-900 text-sm w-10 text-center">
                {selectedQuantity} kg
              </span>
              <button
                type="button"
                onClick={() => setSelectedQuantity(Math.min(product.availableQuantity, selectedQuantity + 1))}
                className="p-1 text-stone-500 hover:text-stone-900"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Transparent Rupee Split */}
          <div className="pt-3 border-t border-stone-200/80 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-stone-600">
              <span>Farmer Direct Earning (94%):</span>
              <span className="font-bold text-emerald-800">₹{farmerShare}</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span>DirectFarm Quality Packaging & Transit (6%):</span>
              <span>₹{logisticsFee}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-extrabold text-stone-900 pt-1 border-t border-stone-200">
              <span>Total Payable Amount:</span>
              <span className="text-emerald-950">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onProceedToCheckout(product, selectedQuantity);
            }}
            className="px-7 py-3 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-colors"
          >
            <span>Proceed to Buy ({selectedQuantity} kg • ₹{totalPrice})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
