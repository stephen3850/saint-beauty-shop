import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { Menu, X } from 'lucide-react';

const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen relative overflow-x-hidden bg-[#0A1928]">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-6 right-6 z-[60] p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white shadow-xl hover:bg-white/20 transition-all"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[45] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Remains persistent across all dashboard sub-routes */}
      <div className={`
        fixed lg:sticky top-0 h-screen z-50 transition-all duration-500 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <DashboardSidebar />
      </div>

      {/* Dynamic Content Area */}
      <main className="dashboard-main-content flex-1 w-full min-h-screen">
        <div className="p-4 md:p-10 max-w-7xl mx-auto h-full pt-20 lg:pt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
