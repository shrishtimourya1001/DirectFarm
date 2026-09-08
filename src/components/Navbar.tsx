import React, { useState } from 'react';
import { RoleMode, Language, NotificationItem } from '../types';
import { translations } from '../utils/translations';
import { 
  Sprout, 
  ShoppingCart, 
  Bell, 
  Languages, 
  Menu, 
  X, 
  BarChart3, 
  Tractor, 
  Store, 
  ShieldCheck, 
  Sparkles,
  Home
} from 'lucide-react';

interface NavbarProps {
  currentRole: RoleMode;
  onSelectRole: (role: RoleMode) => void;
  language: Language;
  onToggleLanguage: () => void;
  cartCount: number;
  onOpenCart: () => void;
  notifications: NotificationItem[];
  onOpenAddProduct: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  language,
  onToggleLanguage,
  cartCount,
  onOpenCart,
  notifications,
  onOpenAddProduct
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const t = translations[language];

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { id: RoleMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: t.navLanding, icon: <Home className="w-4 h-4" /> },
    { id: 'farmer', label: t.navFarmer, icon: <Tractor className="w-4 h-4" />, badge: 'AI Price' },
    { id: 'buyer', label: t.navBuyer, icon: <Store className="w-4 h-4" /> },
    { id: 'supply-chain', label: t.navSupplyChain, icon: <BarChart3 className="w-4 h-4" />, badge: 'Judge View' },
    { id: 'admin', label: t.navAdmin, icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => onSelectRole('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] flex items-center justify-center text-white shadow-md shadow-emerald-950/15 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-[#74c69d]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-['Poppins',sans-serif] text-xl font-bold tracking-tight text-[#1b4332]">
                  Direct<span className="text-[#2d6a4f]">Farm</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-800 rounded-md border border-emerald-300/60">
                  AI AgriTech
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
                {language === 'en' ? 'Farmer-to-Consumer Disintermediation' : 'सीधे किसान से उपभोक्ता तक'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Modes */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200/80">
            {navItems.map((item) => {
              const isActive = currentRole === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => onSelectRole(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-[#1b4332] shadow-xs shadow-stone-300 font-bold' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                      isActive ? 'bg-[#d8f3dc] text-[#1b4332]' : 'bg-stone-200/80 text-stone-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Add Produce button for Farmer mode */}
            {currentRole === 'farmer' && (
              <button
                id="navbar-add-crop-btn"
                onClick={onOpenAddProduct}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#2d6a4f] hover:bg-[#1b4332] text-white shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.addNewCrop}</span>
              </button>
            )}

            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLanguage}
              title="Toggle Language (English / हिन्दी)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors shadow-2xs"
            >
              <Languages className="w-4 h-4 text-emerald-700" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                id="notifications-toggle-btn"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors shadow-2xs"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-stone-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div 
                  id="notifications-dropdown"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {t.notifications}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold cursor-pointer hover:underline">
                      Mark all read
                    </span>
                  </div>
                  <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto mt-1">
                    {notifications.map((item) => (
                      <div key={item.id} className="py-2.5 px-2 hover:bg-stone-50 rounded-lg transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-semibold text-stone-900">{item.title}</span>
                          <span className="text-[10px] text-stone-400 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{item.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 p-2.5 sm:px-3 sm:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-[#1b4332] font-semibold text-xs transition-colors shadow-2xs"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline">{t.cart}</span>
              {cartCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-[#1b4332] text-white text-[10px] font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-stone-200 bg-white text-stone-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-stone-100 space-y-1">
            {navItems.map((item) => {
              const isActive = currentRole === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectRole(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-[#1b4332] text-white' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
