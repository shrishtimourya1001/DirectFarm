import React, { useState } from 'react';
import { Product, Order, Language, OrderItem } from '../types';
import { translations } from '../utils/translations';
import { 
  X, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Building,
  ArrowRight
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { product: Product; quantityKg: number }[];
  language: Language;
  onPlaceOrder: (orderData: Partial<Order>) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  language,
  onPlaceOrder
}) => {
  if (!isOpen || cartItems.length === 0) return null;

  const t = translations[language];

  const [buyerName, setBuyerName] = useState('Vikram Sharma (Civil Lines)');
  const [buyerPhone, setBuyerPhone] = useState('+91 97110 88291');
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 402, Ganga Heights, Mall Road');
  const [deliveryCity, setDeliveryCity] = useState('Kanpur');
  const [deliverySlot, setDeliverySlot] = useState('Today Evening (4:00 PM – 7:00 PM)');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'escrow' | 'cod'>('upi');

  const totalAmount = cartItems.reduce((acc, item) => acc + item.product.pricePerKg * item.quantityKg, 0);
  const farmerPayoutAmount = Math.round(totalAmount * 0.94);
  const platformFee = totalAmount - farmerPayoutAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      pricePerKg: item.product.pricePerKg,
      quantityKg: item.quantityKg,
      totalPrice: item.product.pricePerKg * item.quantityKg,
      image: item.product.image,
      farmerName: item.product.farmerName,
      farmerId: item.product.farmerId
    }));

    const orderId = `DF-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    onPlaceOrder({
      orderNumber: orderId,
      items: orderItems,
      totalAmount,
      farmerPayoutAmount,
      platformLogisticsFee: platformFee,
      buyerName,
      buyerPhone,
      deliveryAddress,
      deliveryCity,
      deliverySlot,
      paymentMethod,
      status: 'placed',
      placedAt: 'Just Now',
      estimatedDelivery: 'Today by 6:30 PM',
      timeline: {
        placed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
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
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              Direct Kisan-Escrow Checkout
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-1">
              Confirm Fresh Farm Dispatch
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 my-4">
          
          {/* Items Summary Box */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              Order Items ({cartItems.length} Lots)
            </span>

            <div className="divide-y divide-stone-200/80">
              {cartItems.map(({ product, quantityKg }) => (
                <div key={product.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900">{product.name}</h4>
                      <span className="text-[11px] text-stone-500">
                        {quantityKg} kg • ₹{product.pricePerKg}/kg (Farmer: {product.farmerName})
                      </span>
                    </div>
                  </div>
                  <div className="font-extrabold text-stone-900 text-sm">
                    ₹{product.pricePerKg * quantityKg}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              Delivery Address & Schedule
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-700 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">City / District</label>
                <input
                  type="text"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Preferred Dispatch Slot</label>
              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 bg-white"
              >
                <option value="Today Evening (4:00 PM – 7:00 PM)">Today Evening (4:00 PM – 7:00 PM) - Picked Dawn</option>
                <option value="Tomorrow Morning (7:00 AM – 10:00 AM)">Tomorrow Morning (7:00 AM – 10:00 AM) - Fresh Morning</option>
                <option value="Weekend Bulk Batch (Saturday 9:00 AM)">Weekend Bulk Batch (Saturday 9:00 AM)</option>
              </select>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              Payment Guarantee Mode
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'upi', title: 'UPI Instant', desc: 'GPay / PhonePe / Paytm' },
                { id: 'escrow', title: 'Kisan Escrow', desc: 'Funds released on delivery' },
                { id: 'cod', title: 'Cash on Delivery', desc: 'Pay at doorstep' },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === m.id
                      ? 'bg-emerald-50 border-emerald-500 shadow-2xs'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{m.title}</span>
                    {paymentMethod === m.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <span className="text-[10px] text-stone-500 block mt-0.5">{m.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-stone-700">
              <span>Farmer Direct Earning (Transferred to Escrow):</span>
              <span className="font-bold text-emerald-900">₹{farmerPayoutAmount}</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span>DirectFarm Quality & Logistics Handling (6%):</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-emerald-200">
              <span>Total Payable Amount:</span>
              <span className="text-emerald-950 text-base">₹{totalAmount}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="confirm-place-order-btn"
              className="px-7 py-3 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-colors"
            >
              <span>Confirm & Track Live Delivery (₹{totalAmount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
