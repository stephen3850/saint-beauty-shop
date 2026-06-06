import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BarChart2,
  ShoppingBag,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
  AlertTriangle,
  CreditCard,
  Briefcase,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard/admin', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/admin/analytics', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: ShoppingBag, label: 'Orders', path: '/dashboard/admin/orders', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { icon: Package, label: 'Products', path: '/dashboard/admin/products', color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { icon: CreditCard, label: 'Payments', path: '/dashboard/admin/payments', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { icon: AlertTriangle, label: 'Inventory', path: '/dashboard/admin/inventory', color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { icon: Users, label: 'Customers', path: '/dashboard/admin/customers', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { icon: Briefcase, label: 'Careers', path: '/dashboard/admin/careers', color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { icon: MessageSquare, label: 'Messages', path: '/dashboard/admin/chat', color: 'text-pink-400', bg: 'bg-pink-400/10', badge: 'New' },
    { icon: Settings, label: 'Settings', path: '/dashboard/admin/settings', color: 'text-slate-400', bg: 'bg-slate-400/10' },
    { icon: Home, label: 'View Shop', path: '/', color: 'text-white', bg: 'bg-white/5', border: true },
  ];

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Brand & Toggle Section */}
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        {(!isCollapsed || isMobileOpen) && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">S</div>
            <span className="font-bold text-lg tracking-tight uppercase">Saint <span className="text-blue-500">Beauty Shop</span></span>
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Mobile Close Toggle */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1.5 hover:bg-slate-800 rounded-lg text-slate-400"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav custom-scrollbar overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/dashboard/admin'}
            className={({ isActive }) => `nav-item group ${isActive ? 'active ' + item.bg : ''}`}
            onClick={() => isMobileOpen && setIsMobileOpen(false)}
          >
            <div className={`p-2 rounded-lg transition-all duration-300 ${item.color} group-hover:scale-110`}>
                <item.icon size={20} />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex-grow flex justify-between items-center ml-2">
                <span className={`text-sm font-medium transition-colors ${item.color.replace('text-', 'group-hover:text-')}`}>{item.label}</span>
                {item.badge && (
                  <span className={`${item.bg.replace('/10', '')} text-[9px] px-1.5 py-0.5 rounded-md text-white font-black uppercase tracking-tighter`}>
                    {item.badge}
                  </span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
            AD
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate text-white">Stephen Admin</p>
              <p className="text-[10px] text-slate-500 truncate">admin@hevenbeauty.com</p>
            </div>
          )}
          {(!isCollapsed || isMobileOpen) && (
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors hover:bg-rose-500/10 rounded-lg"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
