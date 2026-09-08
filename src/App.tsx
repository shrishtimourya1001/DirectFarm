import React, { useState } from 'react';
import { 
  RoleMode, 
  Language, 
  Product, 
  Order, 
  Farmer, 
  AiPriceInsight, 
  OrderStatus 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_FARMERS, 
  INITIAL_ORDERS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { fetchAiPriceRecommendation } from './services/aiService';

// Layout components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Views
import { LandingPage } from './components/LandingPage';
import { FarmerDashboard } from './components/FarmerDashboard';
import { BuyerMarketplace } from './components/BuyerMarketplace';
import { SupplyChainComparison } from './components/SupplyChainComparison';
import { AdminDashboard } from './components/AdminDashboard';

// Modals
import { AddProductModal } from './components/AddProductModal';
import { AiPriceModal } from './components/AiPriceModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FarmerProfileModal } from './components/FarmerProfileModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';

export default function App() {
  // Global Navigation & Role state
  const [currentRole, setCurrentRole] = useState<RoleMode>('landing');
  const [language, setLanguage] = useState<Language>('en');

  // Core Data Stores
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [farmers] = useState<Farmer[]>(INITIAL_FARMERS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Cart & Checkout
  const [cartItems, setCartItems] = useState<{ product: Product; quantityKg: number }[]>([]);

  // Modal Controllers
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAiPriceOpen, setIsAiPriceOpen] = useState(false);
  const [activeAiInsight, setActiveAiInsight] = useState<AiPriceInsight | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [isFarmerProfileOpen, setIsFarmerProfileOpen] = useState(false);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);

  // Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  // Farmer Actions
  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`✓ Published ${newProduct.name} to DirectFarm Marketplace!`);
  };

  const handleOpenAiPrice = async (product?: Product) => {
    const targetCrop = product ? product.name : 'Tomato (Himsona Hybrid)';
    const targetQuantity = product ? product.availableQuantity : 500;
    const targetLocation = product ? product.location : 'Kanpur Dehat';

    try {
      const insight = await fetchAiPriceRecommendation({
        crop: targetCrop,
        quantity: targetQuantity,
        location: targetLocation,
        expectedPrice: product?.pricePerKg
      });
      setActiveAiInsight(insight);
      setIsAiPriceOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Buyer Actions
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    setCartItems([{ product, quantityKg: Math.min(10, product.availableQuantity) }]);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = (product: Product, quantityKg: number) => {
    setCartItems([{ product, quantityKg }]);
    setIsCheckoutOpen(true);
  };

  const handleSelectFarmer = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsFarmerProfileOpen(true);
  };

  // Order Actions
  const handlePlaceOrder = (newOrderData: Partial<Order>) => {
    const fullOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderData.orderNumber || `DF-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: newOrderData.items || [],
      totalAmount: newOrderData.totalAmount || 0,
      farmerPayoutAmount: newOrderData.farmerPayoutAmount || 0,
      platformLogisticsFee: newOrderData.platformLogisticsFee || 0,
      buyerName: newOrderData.buyerName || 'Buyer',
      buyerPhone: newOrderData.buyerPhone || '+91 98765 43210',
      deliveryAddress: newOrderData.deliveryAddress || 'Civil Lines, Kanpur',
      deliveryCity: newOrderData.deliveryCity || 'Kanpur',
      deliverySlot: newOrderData.deliverySlot || 'Today Evening',
      paymentMethod: newOrderData.paymentMethod || 'upi',
      status: 'placed',
      placedAt: 'Just Now',
      estimatedDelivery: 'Today by 6:30 PM',
      timeline: {
        placed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };

    setOrders((prev) => [fullOrder, ...prev]);
    setCartItems([]);
    setTrackedOrder(fullOrder);
    setIsOrderTrackingOpen(true);
    showToast(`✓ Order ${fullOrder.orderNumber} placed! Farmer notified.`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    if (trackedOrder && trackedOrder.id === orderId) {
      setTrackedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    showToast(`Order status updated to: ${newStatus.replace(/_/g, ' ')}`);
  };

  const handleOpenOrderTracking = (order: Order) => {
    setTrackedOrder(order);
    setIsOrderTrackingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-stone-900 font-['Inter',sans-serif] flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b4332] text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-3 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Responsive Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        cartCount={cartItems.length}
        onOpenCart={() => {
          if (cartItems.length > 0) setIsCheckoutOpen(true);
          else setCurrentRole('buyer');
        }}
        notifications={notifications}
        onOpenAddProduct={() => setIsAddProductOpen(true)}
      />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {currentRole === 'landing' && (
          <LandingPage
            onSelectRole={setCurrentRole}
            language={language}
            onOpenAiPriceDemo={() => handleOpenAiPrice()}
          />
        )}

        {currentRole === 'farmer' && (
          <FarmerDashboard
            products={products}
            orders={orders}
            notifications={notifications}
            language={language}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
            onOpenAiPriceRecommendation={(prod) => handleOpenAiPrice(prod)}
            onSelectOrder={handleOpenOrderTracking}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {currentRole === 'buyer' && (
          <BuyerMarketplace
            products={products}
            farmers={farmers}
            language={language}
            onSelectProduct={handleSelectProduct}
            onBuyNow={handleBuyNow}
            onSelectFarmer={handleSelectFarmer}
          />
        )}

        {currentRole === 'supply-chain' && (
          <SupplyChainComparison
            language={language}
            onGoToFarmer={() => setCurrentRole('farmer')}
            onGoToMarketplace={() => setCurrentRole('buyer')}
          />
        )}

        {currentRole === 'admin' && (
          <AdminDashboard
            products={products}
            orders={orders}
            farmers={farmers}
            language={language}
          />
        )}
      </main>

      {/* Professional Footer */}
      <Footer
        onSelectRole={setCurrentRole}
        language={language}
      />

      {/* Modals & Workflows */}

      {/* 1. Add Product Modal with AI Price Suggestion */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
        language={language}
        onOpenAiRecommendationScreen={(insight) => {
          setActiveAiInsight(insight);
          setIsAiPriceOpen(true);
        }}
      />

      {/* 2. AI Price Recommendation Modal Screen */}
      <AiPriceModal
        isOpen={isAiPriceOpen}
        onClose={() => setIsAiPriceOpen(false)}
        insight={activeAiInsight}
        language={language}
        onApplyPrice={(recommendedPrice) => {
          showToast(`✓ Applied AI Recommended Price: ₹${recommendedPrice}/kg`);
        }}
        onFindBuyers={() => {
          setCurrentRole('buyer');
          showToast('Navigating to Direct Buyer Marketplace with active quotes');
        }}
      />

      {/* 3. Product Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        language={language}
        onProceedToCheckout={handleProceedToCheckout}
        farmers={farmers}
        onOpenFarmerProfile={handleSelectFarmer}
      />

      {/* 4. Farmer Profile Modal */}
      <FarmerProfileModal
        farmer={selectedFarmer}
        isOpen={isFarmerProfileOpen}
        onClose={() => setIsFarmerProfileOpen(false)}
        products={products}
        language={language}
        onSelectProduct={handleSelectProduct}
      />

      {/* 5. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        language={language}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* 6. Order Tracking Timeline Modal */}
      <OrderTrackingModal
        order={trackedOrder}
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        language={language}
        onUpdateStatus={handleUpdateOrderStatus}
      />

    </div>
  );
}
