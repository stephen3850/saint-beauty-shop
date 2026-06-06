import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FullPageLoader } from '../components/common/Loader';
import AdminSidebar from '../components/admin/AdminSidebar';
import { Menu, X } from 'lucide-react';
import '../styles/admin-dashboard.css';

const AdminLayout = () => {
  const { isAuthenticated, role, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  if (loading) return <FullPageLoader />;

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-dashboard-wrapper">
      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <main className={`admin-main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">S</div>
            <span className="font-bold text-lg tracking-tight uppercase">Saint <span className="text-blue-500">Beauty Shop</span></span>
          </div>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 hover:bg-white/5 rounded-xl text-slate-400"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
