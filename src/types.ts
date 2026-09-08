export type RoleMode = 'landing' | 'farmer' | 'buyer' | 'supply-chain' | 'admin';

export type Language = 'en' | 'hi';

export type CropCategory = 'all' | 'vegetables' | 'fruits' | 'grains' | 'spices';

export interface Product {
  id: string;
  name: string;
  nameHi: string;
  category: 'vegetables' | 'fruits' | 'grains' | 'spices';
  variety: string;
  pricePerKg: number;
  marketPricePerKg: number; // APMC or retail comparison
  retailSupermarketPrice: number;
  availableQuantity: number; // in kg
  unit: string;
  farmerId: string;
  farmerName: string;
  farmerPhoto: string;
  farmerRating: number;
  farmerReviewCount: number;
  location: string;
  distanceKm: number;
  harvestDate: string;
  shelfLifeDays: number;
  image: string;
  organic: boolean;
  grade: 'Grade A' | 'Grade A+' | 'Export Quality';
  description: string;
  descriptionHi: string;
}

export interface Farmer {
  id: string;
  name: string;
  nameHi: string;
  avatar: string;
  location: string;
  state: string;
  district: string;
  phone: string;
  experienceYears: number;
  farmSizeAcres: number;
  rating: number;
  totalOrdersFulfilled: number;
  kisanId: string;
  farmingPractices: string[];
  bio: string;
  bioHi: string;
  bankAccountVerified: boolean;
}

export type OrderStatus = 'placed' | 'confirmed' | 'packed' | 'out_for_delivery' | 'delivered';

export interface OrderItem {
  productId: string;
  productName: string;
  pricePerKg: number;
  quantityKg: number;
  totalPrice: number;
  image: string;
  farmerName: string;
  farmerId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  farmerPayoutAmount: number;
  platformLogisticsFee: number;
  buyerName: string;
  buyerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliverySlot: string;
  paymentMethod: 'upi' | 'cod' | 'escrow';
  status: OrderStatus;
  placedAt: string;
  estimatedDelivery: string;
  timeline: {
    placed: string;
    confirmed?: string;
    packed?: string;
    outForDelivery?: string;
    delivered?: string;
  };
}

export interface AiPriceInsight {
  crop: string;
  quantity: number;
  location: string;
  currentMarketPrice: number;
  recommendedMinPrice: number;
  recommendedMaxPrice: number;
  retailPriceBenchmark: number;
  demandLevel: 'High' | 'Surging' | 'Moderate' | 'Stable';
  confidenceScore: number;
  optimalSellingWindow: string;
  potentialEarningsIncrease: number;
  consumerSavingsPercent: number;
  factors: {
    mandiPriceTrend: string;
    demandSurge: string;
    transportOptimization: string;
    historicalTrends: string;
    spoilageRisk: string;
  };
  buyerMatching: {
    activeBuyersCount: number;
    verifiedRestaurants: number;
    residentialSocieties: number;
    fpoPartners: number;
    topBuyerQuote: string;
  };
  aiSummary: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'price_alert' | 'demand' | 'system';
}

export interface FarmerSuccessStory {
  id: string;
  farmerName: string;
  location: string;
  crop: string;
  oldIncomePerQuintal: number;
  newIncomePerQuintal: number;
  incomeIncreasePercent: number;
  quote: string;
  quoteHi: string;
  avatar: string;
}
