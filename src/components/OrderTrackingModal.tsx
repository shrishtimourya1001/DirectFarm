import React from 'react';
import { Order, Language, OrderStatus } from '../types';
import { translations } from '../utils/translations';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Package, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  UserCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface OrderTrackingModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const STAGES: { id: OrderStatus; label: string; desc: string }[] = [
  { id: 'placed', label: 'Order Placed', desc: 'Received & routed to farmer' },
  { id: 'confirmed', label: 'Farmer Confirmed', desc: 'Harvest batch verified' },
  { id: 'packed', label: 'Packed at Farm', desc: 'Crated & quality sealed' },
  { id: 'out_for_delivery', label: 'Out for Delivery', desc: 'Cold-chain van en route' },
  { id: 'delivered', label: 'Delivered', desc: 'Kisan escrow released' },
];

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  isOpen,
  onClose,
  language,
  onUpdateStatus
}) => {
  if (!isOpen || !order) return null;

  const t = translations[language];

  const currentStageIndex = STAGES.findIndex(s => s.id === order.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                {order.orderNumber}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Direct Farm Dispatch
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Poppins',sans-serif] mt-1">
              Live Farm-to-Doorstep Tracking
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ETA Highlight Card */}
        <div className="my-5 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-amber-50 border border-emerald-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#1b4332] text-white flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-[#74c69d]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                Estimated Delivery
              </span>
              <div className="text-lg font-bold text-stone-900 font-['Poppins',sans-serif]">
                {order.estimatedDelivery}
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">
                Slot: {order.deliverySlot}
              </span>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-stone-200 sm:pl-4">
            <span className="text-xs text-stone-400 block">Total Amount</span>
            <div className="text-xl font-extrabold text-stone-900 font-['Poppins',sans-serif]">
              ₹{order.totalAmount}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              ₹{order.farmerPayoutAmount} Direct to Farmer
            </span>
          </div>
        </div>

        {/* ORDER TRACKING TIMELINE (Exact from prompt) */}
        <div className="my-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Order Status Timeline
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {STAGES.map((stage, idx) => {
              const isPassed = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div key={stage.id} className="relative flex items-start gap-4">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-100'
                      : isPassed
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-stone-400 border-stone-300'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>

                  {/* Stage Text */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${isCurrent ? 'text-emerald-900' : isPassed ? 'text-stone-900' : 'text-stone-400'}`}>
                        {stage.label}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-100 text-emerald-900 uppercase">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HACKATHON DEMO: INTERACTIVE TIMELINE STAGE ADVANCE */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 my-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Judge Demonstration Control
            </span>
            <span className="text-[11px] text-stone-400">Test timeline progression</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {STAGES.map((stage) => (
              <button
                key={stage.id}
                onClick={() => onUpdateStatus(order.id, stage.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  order.status === stage.id
                    ? 'bg-[#1b4332] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 border border-stone-200 text-stone-700'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>

        {/* Order Items List */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2.5 my-4">
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
            Dispatched Produce
          </span>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-stone-700">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={item.image} 
                    alt={item.productName} 
                    className="w-9 h-9 rounded-lg object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-bold text-stone-900 block">{item.productName}</span>
                    <span className="text-[11px] text-stone-500">
                      {item.quantityKg} kg • Farmer: {item.farmerName}
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-stone-900">₹{item.totalPrice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recipient and Driver Snippet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-400 block font-semibold">Delivery To:</span>
            <div className="font-bold text-stone-900">{order.buyerName}</div>
            <p className="text-stone-500 text-[11px]">{order.deliveryAddress}, {order.deliveryCity}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-400 block font-semibold">Cold-Chain Vehicle:</span>
            <div className="font-bold text-stone-900">DirectFarm Van UP-78-AG-4412</div>
            <p className="text-stone-500 text-[11px]">Temperature Monitored: 16°C Freshness Active</p>
          </div>
        </div>

        {/* Close */}
        <div className="pt-4 mt-4 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-white font-bold text-xs hover:bg-[#2d6a4f] transition-colors"
          >
            Close Tracking
          </button>
        </div>

      </div>
    </div>
  );
};
