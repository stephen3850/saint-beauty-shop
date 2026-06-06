import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const { isAuthenticated, role } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between shadow-lg">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-[#E08B6E]' : 'text-gray-400'}`}
      >
        <Home size={24} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
      </Link>

      <Link
        to="/shop"
        className={`flex flex-col items-center gap-1 ${isActive('/shop') ? 'text-[#E08B6E]' : 'text-gray-400'}`}
      >
        <Search size={24} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Shop</span>
      </Link>

      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-1 text-gray-400 relative"
      >
        <ShoppingBag size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#E08B6E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
      </button>

      <Link
        to={isAuthenticated ? (role === 'admin' ? '/dashboard/admin' : '/dashboard') : '/login'}
        className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/dashboard') || isActive('/login') ? 'text-[#E08B6E]' : 'text-gray-400'}`}
      >
        <User size={24} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Account</span>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
