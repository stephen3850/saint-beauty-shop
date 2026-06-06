import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  BarChart3,
  Package,
  Truck,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const sidebarLinks = [
    { name: 'Overview', path: '/dashboard', icon: <BarChart3 size={18} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'My Orders', path: '/dashboard/orders', icon: <Package size={18} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Track Order', path: '/dashboard/track', icon: <Truck size={18} />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { name: 'Messages', path: '/dashboard/messages', icon: <MessageSquare size={18} />, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { name: 'Wishlist', path: '/dashboard/wishlist', icon: <Heart size={18} />, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { name: 'Profile Settings', path: '/dashboard/profile', icon: <Settings size={18} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  if (user?.role === 'admin') {
    sidebarLinks.unshift({
        name: 'Admin Panel',
        path: '/dashboard/admin',
        icon: <Settings size={18} />,
        color: 'text-indigo-400',
        bg: 'bg-indigo-400/10'
    });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[240px] h-screen flex flex-col sidebar-glass sticky top-0 z-50 overflow-y-auto custom-scrollbar">
      {/* Brand Header */}
      <div className="p-6 pb-2">
        <Link to="/" className="text-lg font-bold tracking-tight text-white block uppercase">
          Saint<span className="font-light italic text-[#7B9E87]"> Beauty Shop</span>
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="p-6 flex flex-col items-center border-b border-white/5 mb-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#7B9E87] via-[#C4A46C] to-[#E5705E] rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/20 rotate-3 hover:rotate-0 transition-transform duration-500">
          {user?.name?.charAt(0) || 'E'}
        </div>
        <div className="text-center">
          <h2 className="text-white font-black text-sm tracking-tight">{user?.name || 'Emma Watson'}</h2>
          <p className="text-white/40 text-[10px] lowercase truncate max-w-[180px] font-medium">{user?.email || 'beauty@sanctuary.com'}</p>
          <div className="mt-3 px-3 py-1 bg-[#C4A46C]/20 border border-[#C4A46C]/30 rounded-full">
            <p className="text-[#C4A46C] text-[8px] font-black uppercase tracking-[0.2em]">Gold Tier Member</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow space-y-2 px-3">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                isActive(link.path)
                ? `${link.bg} border border-white/10 shadow-lg`
                : 'hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] ${isActive(link.path) ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
              <div className={`p-2 rounded-lg transition-all duration-300 ${isActive(link.path) ? link.color : 'text-white/30 group-hover:text-white'}`}>
                {link.icon}
              </div>
              {link.name}
            </div>
            {isActive(link.path) && <div className={`w-1.5 h-1.5 rounded-full ${link.color.replace('text-', 'bg-')}`} />}
          </Link>
        ))}
      </nav>

      {/* Logout Action */}
      <div className="p-4 mt-auto border-t border-white/5">
        <button
          onClick={logout}
          className="sidebar-item w-full !p-3 !mx-0 !text-red-400 hover:!bg-red-500/10 rounded-lg"
        >
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest">
            <LogOut size={18} className="icon-red" />
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
