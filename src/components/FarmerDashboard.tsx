import React from 'react';
import { Product, Order, Language, NotificationItem, AiPriceInsight } from '../types';
import { translations } from '../utils/translations';
import { MANDI_RATES_TODAY, AVAILABLE_BUYERS } from '../data/mockData';
import { 
  Sparkles, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ChevronRight, 
  MapPin, 
  ShieldCheck, 
  Truck,
  AlertCircle
} from 'lucide-react';

interface FarmerDashboardProps {
  products: Product[];
  orders: Order[];
  notifications: NotificationItem[];
  language: Language;
  onOpenAddProduct: () => void;
  onOpenAiPriceRecommendation: (product?: Product) => void;
  onSelectOrder: (order: Order) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  products,
  orders,
  notifications,
  language,
  onOpenAddProduct,
  onOpenAiPriceRecommendation,
  onSelectOrder,
  onUpdateOrderStatus
}) => {
  const t = translations[language];

  // Calculate Farmer Stats
  const totalDirectEarnings = orders.reduce((sum, ord) => sum + ord.farmerPayoutAmount, 42800);
  const middlemanSavedAmount = Math.round(totalDirectEarnings * 0.32);
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered').length;
  const myFarmerProducts = products.filter(p => p.farmerId === 'farmer-1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. WELCOME HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#245842] to-[#1b4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=150&q=80" 
              alt="Ramesh Kumar Patel" 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-300 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  {t.verifiedFarmer} • ID: UP-KNP-8891
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Poppins',sans-serif]">
                {t.namaste}, Ramesh Kumar Patel
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <span>Bilhaur Farm Cluster, Kanpur Dehat • 6.5 Acres Organic/Natural</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="farmer-get-ai-price-btn"
              onClick={() => onOpenAiPriceRecommendation()}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-stone-900" />
              <span>{t.aiRecommended}</span>
            </button>

            <button
              id="farmer-add-new-crop-btn"
              onClick={onOpenAddProduct}
              className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-[#1b4332] font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 text-[#1b4332]" />
              <span>{t.addNewCrop}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S MARKET PRICE TICKER */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
              {t.todayMandiRate} (Kanpur & Regional APMC Live Feeds)
            </span>
          </div>
          <span className="text-[11px] text-stone-400">
            Updated today 7:00 AM • DirectFarm AI pricing applied
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MANDI_RATES_TODAY.map((item) => (
            <div key={item.crop} className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <span className="text-xs font-semibold text-stone-700 block">{item.crop}</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-lg font-extrabold text-stone-900 font-['Poppins',sans-serif]">
                  ₹{item.mandiPrice}
                </span>
                <span className={`text-[10px] font-bold flex items-center ${
                  item.status === 'up' ? 'text-emerald-700' : item.status === 'down' ? 'text-rose-600' : 'text-stone-500'
                }`}>
                  {item.status === 'up' ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : item.status === 'down' ? <TrendingDown className="w-2.5 h-2.5 mr-0.5" /> : null}
                  {item.trend}
                </span>
              </div>
              <div className="text-[10px] text-emerald-800 font-medium mt-1">
                Direct: ₹{item.mandiPrice + 4}–{item.mandiPrice + 6}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. KEY STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>{t.totalEarnings}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-2">
            ₹{totalDirectEarnings.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Direct bank escrow deposits
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>{t.middlemanLossSaved}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-['Poppins',sans-serif] mt-2">
            +₹{middlemanSavedAmount.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">
            Money saved from 12% agent commissions
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>{t.activeOrders}</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-2">
            {activeOrdersCount} Pending
          </div>
          <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
            Ready for farm-gate dispatch
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>{t.availableBuyers}</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-2">
            {AVAILABLE_BUYERS.length} Nearby
          </div>
          <span className="text-[11px] text-purple-700 font-semibold mt-1 block">
            Immediate bulk purchase bids
          </span>
        </div>
      </div>

      {/* 4. AI SPOTLIGHT RECOMMENDATION CARD */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 rounded-3xl p-6 sm:p-7 border-2 border-emerald-300 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Market Opportunity Alert</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Poppins',sans-serif]">
              Tomato (Hybrid Grade A) is peaking at ₹31–33/kg in Kanpur Urban
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Mandi rate is currently stagnant at ₹28/kg, but DirectFarm buyers within 15 km are requesting 800+ kg for weekend delivery at higher rates.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenAiPriceRecommendation()}
              className="px-6 py-3 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>View AI Price Breakdown</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. TWO COLUMN SECTION: ACTIVE ORDERS & MY CROPS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Orders Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-['Poppins',sans-serif]">
                {t.activeOrders}
              </h3>
              <p className="text-xs text-stone-500">Live orders waiting for packing and delivery driver pickup</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {orders.length} Total Orders
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 shadow-xs transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-900">{order.orderNumber}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'delivered' 
                          ? 'bg-emerald-100 text-emerald-900'
                          : order.status === 'out_for_delivery'
                          ? 'bg-blue-100 text-blue-900'
                          : order.status === 'packed'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-stone-100 text-stone-800'
                      }`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 font-medium">
                      Buyer: <strong className="text-stone-900">{order.buyerName}</strong> ({order.deliveryCity})
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-extrabold text-stone-900 font-['Poppins',sans-serif]">
                      ₹{order.farmerPayoutAmount.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">Your Take-home</span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-stone-700">
                      <span>{item.productName} ({item.quantityKg} kg)</span>
                      <span className="font-semibold">₹{item.totalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Action Buttons for Farmer (Minimal Clicks requirement) */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Slot: {order.deliverySlot}
                  </span>

                  <div className="flex items-center gap-2">
                    {order.status === 'confirmed' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'packed')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
                      >
                        Mark as Packed at Farm
                      </button>
                    )}
                    {order.status === 'packed' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'out_for_delivery')}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                      >
                        Handover to Delivery Agent
                      </button>
                    )}
                    {order.status === 'out_for_delivery' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                      >
                        Confirm Delivery & Release Escrow
                      </button>
                    )}
                    <button
                      onClick={() => onSelectOrder(order)}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-medium"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Crops & Available Buyers Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* My Crops */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900 font-['Poppins',sans-serif]">
                {t.myProducts}
              </h3>
              <button
                onClick={onOpenAddProduct}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {t.addNewCrop}
              </button>
            </div>

            <div className="space-y-3">
              {myFarmerProducts.map((prod) => (
                <div 
                  key={prod.id}
                  className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{prod.name}</h4>
                      <span className="text-[11px] text-stone-500 block">Stock: {prod.availableQuantity} kg</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">Mandi: ₹{prod.marketPricePerKg}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-emerald-900 font-['Poppins',sans-serif]">
                      ₹{prod.pricePerKg} / kg
                    </div>
                    <button
                      onClick={() => onOpenAiPriceRecommendation(prod)}
                      className="text-[10px] text-amber-700 font-bold hover:underline flex items-center gap-0.5 justify-end mt-0.5"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-amber-600" /> AI Pricing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Nearby Buyers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900 font-['Poppins',sans-serif]">
                {t.availableBuyers}
              </h3>
              <span className="text-xs text-stone-400">Kanpur Hub</span>
            </div>

            <div className="space-y-3">
              {AVAILABLE_BUYERS.map((buyer) => (
                <div key={buyer.id} className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{buyer.name}</h4>
                      <span className="text-[11px] text-stone-500">{buyer.category} • {buyer.distance}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <div>
                      <span className="text-stone-500 text-[11px]">Demand: </span>
                      <span className="font-semibold text-stone-800">{buyer.neededQuantity}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-800">{buyer.offeredRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800 uppercase tracking-wider">
              <span>{t.notifications}</span>
              <span className="text-emerald-700 text-[11px] cursor-pointer">View all</span>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className="p-2.5 rounded-xl bg-white border border-stone-200 text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900 text-[11px]">{notif.title}</span>
                    <span className="text-[9px] text-stone-400">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
