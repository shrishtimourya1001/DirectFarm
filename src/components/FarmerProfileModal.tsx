import React from 'react';
import { Farmer, Product, Language } from '../types';
import { translations } from '../utils/translations';
import { 
  X, 
  MapPin, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Package, 
  Leaf, 
  Award,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface FarmerProfileModalProps {
  farmer: Farmer | null;
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  language: Language;
  onSelectProduct: (product: Product) => void;
}

export const FarmerProfileModal: React.FC<FarmerProfileModalProps> = ({
  farmer,
  isOpen,
  onClose,
  products,
  language,
  onSelectProduct
}) => {
  if (!isOpen || !farmer) return null;

  const t = translations[language];
  const farmerProducts = products.filter(p => p.farmerId === farmer.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header Close */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md">
            DirectFarm Verified Cultivator
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Farmer Header Hero */}
        <div className="my-5 p-6 rounded-3xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <img 
              src={farmer.avatar} 
              alt={farmer.name} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-300 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold font-['Poppins',sans-serif]">{farmer.name}</h2>
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-300" />
                <span>{farmer.location}, {farmer.state}</span>
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs pt-1 text-emerald-200">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-300" /> Kisan ID: {farmer.kisanId}
                </span>
                <span>•</span>
                <span className="flex items-center text-amber-300 font-bold gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-300" /> {farmer.rating} (Verified Reviews)
                </span>
                <span>•</span>
                <span>{farmer.totalOrdersFulfilled} Direct Dispatches</span>
              </div>
            </div>
          </div>
        </div>

        {/* Farming Information & Bio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5 text-center text-xs">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block">Cultivation Land</span>
            <div className="text-xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-0.5">
              {farmer.farmSizeAcres} Acres
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block">Experience</span>
            <div className="text-xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-0.5">
              {farmer.experienceYears} Years
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block">Bank Account & Escrow</span>
            <div className="text-sm font-extrabold text-emerald-800 font-['Poppins',sans-serif] mt-1 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified KYC
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed my-4">
          <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
            Farming Philosophy & Heritage:
          </h4>
          <p>{language === 'hi' ? farmer.bioHi : farmer.bio}</p>
        </div>

        {/* Farming Practices */}
        <div className="my-5 space-y-2">
          <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
            Verified Sustainable Practices:
          </h4>
          <div className="flex flex-wrap gap-2">
            {farmer.farmingPractices.map((practice, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                {practice}
              </span>
            ))}
          </div>
        </div>

        {/* Available Products from this Farmer */}
        <div className="space-y-3 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-base font-['Poppins',sans-serif]">
              Active Harvest Lots ({farmerProducts.length})
            </h3>
            <span className="text-xs text-stone-400">Direct ordering enabled</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {farmerProducts.map((prod) => (
              <div 
                key={prod.id}
                className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-bold text-stone-900 text-xs line-clamp-1">{prod.name}</h5>
                    <span className="text-[11px] text-stone-500 block">Available: {prod.availableQuantity} kg</span>
                    <div className="text-xs font-extrabold text-emerald-900 font-['Poppins',sans-serif] mt-0.5">
                      ₹{prod.pricePerKg}/kg
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProduct(prod);
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs shrink-0 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
