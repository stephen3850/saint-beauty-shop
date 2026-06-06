import React, { useState, useEffect } from 'react';
import { Search, Calendar, Download, Filter, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/admin-dashboard.css';

// Components
import StatsCard from '../../components/admin/StatsCard';
import SalesChart from '../../components/admin/SalesChart';
import RecentOrdersTable from '../../components/admin/RecentOrdersTable';
import InventoryAlerts from '../../components/admin/InventoryAlerts';
import TopProducts from '../../components/admin/TopProducts';
import AdminHeaderTools from '../../components/admin/AdminHeaderTools';
import NotificationsBell from '../../components/admin/NotificationsBell';

// Service
import { adminService } from '../../services/adminService';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('week');

  const [stats, setStats] = useState([
    { title: 'Total Revenue', value: '...', trend: 'up', trendValue: 0, icon: DollarSign, color: '#2563EB' },
    { title: 'Total Orders', value: '...', trend: 'up', trendValue: 0, icon: ShoppingCart, color: '#10B981' },
    { title: 'Total Customers', value: '...', trend: 'up', trendValue: 0, icon: Users, color: '#D4AF37' },
    { title: 'Conversion Rate', value: '...', trend: 'up', trendValue: 0, icon: Activity, color: '#F59E0B' },
  ]);

  const [salesData, setSalesData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000); // Faster update (10s)
    return () => clearInterval(interval);
  }, [period]);

  const fetchDashboardData = async () => {
    try {
      const [statsData, sales, orders, alerts, top] = await Promise.allSettled([
        adminService.getDashboardStats(period),
        adminService.getSalesData(period),
        adminService.getRecentOrders(),
        adminService.getInventoryAlerts(),
        adminService.getTopProducts()
      ]);

      if (statsData.status === 'fulfilled') {
        const d = statsData.value;
        console.log('%c📊 Dashboard Data Update:', 'color: #10B981; font-weight: bold', d);

        setStats([
          {
            title: 'Total Revenue',
            value: d.totalRevenue || 0,
            trend: (d.revenueTrend || 0) >= 0 ? 'up' : 'down',
            trendValue: Math.abs(d.revenueTrend || 0),
            icon: DollarSign,
            color: '#3B82F6'
          },
          {
            title: 'Total Orders',
            value: d.totalOrders || 0,
            trend: (d.ordersTrend || 0) >= 0 ? 'up' : 'down',
            trendValue: Math.abs(d.ordersTrend || 0),
            icon: ShoppingCart,
            color: '#10B981'
          },
          {
            title: 'Total Customers',
            value: d.totalCustomers || 0,
            trend: (d.customersTrend || 0) >= 0 ? 'up' : 'down',
            trendValue: Math.abs(d.customersTrend || 0),
            icon: Users,
            color: '#A855F7' // Vibrant Purple
          },
          {
            title: 'Conversion Rate',
            value: d.conversionRate || 0,
            trend: (d.conversionTrend || 0) >= 0 ? 'up' : 'down',
            trendValue: Math.abs(d.conversionTrend || 0),
            icon: Activity,
            color: '#F97316' // Bright Orange
          },
        ]);
      }

      if (sales.status === 'fulfilled') setSalesData(sales.value);
      else setSalesData([]);

      if (orders.status === 'fulfilled') setRecentOrders(orders.value);
      else setRecentOrders([]); // Don't use mock data if API call fails

      if (alerts.status === 'fulfilled') setInventoryAlerts(alerts.value);
      else setInventoryAlerts([]);

      if (top.status === 'fulfilled') setTopProducts(top.value);
      else setTopProducts([]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to update dashboard data');
      setLoading(false);
    }
  };

  const generateMockSales = (p) => {
    const labels = p === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return labels.map(label => ({
      name: label,
      revenue: Math.floor(Math.random() * 5000) + 2000
    }));
  };

  return (
    <div className="animate-fade-in">
      {/* Top Header */}
      <header className="admin-top-bar">
        <AdminHeaderTools />

        <div className="search-wrapper">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search analytics, orders..."
            className="admin-search-input"
          />
        </div>
      </header>

      {/* Welcome Section */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold mb-0.5">Welcome back, Stephen! 👋</h1>
        <p className="text-slate-400 text-xs">Here's what's happening with your store today.</p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Charts & Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 glass-card vivid-card-blue">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <div>
              <h2 className="text-lg font-bold text-blue-400">Sales Overview</h2>
              <p className="text-[10px] text-slate-400">Revenue growth comparison</p>
            </div>
            <div className="flex gap-1.5">
              {['week', 'month', 'year'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize transition-all ${
                    period === p ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="p-1 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 ml-1">
                <Download size={14} />
              </button>
            </div>
          </div>
          <SalesChart data={salesData} />
        </div>

        <div className="glass-card vivid-card-purple">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-lg font-bold text-purple-400">Top Products</h2>
            <Link to="/dashboard/admin/products" className="text-[10px] text-blue-400 hover:underline">View All</Link>
          </div>
          <TopProducts products={topProducts} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card vivid-card-green">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-lg font-bold text-emerald-400">Recent Orders</h2>
            <Link to="/dashboard/admin/orders" className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-800 text-slate-400 rounded-lg text-[10px] hover:bg-slate-700">
              <Filter size={12} /> View All
            </Link>
          </div>
          <RecentOrdersTable orders={recentOrders} />
        </div>

        <div className="glass-card vivid-card-rose">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-lg font-bold text-rose-400">Inventory Alerts</h2>
            <Link to="/dashboard/admin/inventory" className="px-1.5 py-0.5 bg-rose-500/20 text-rose-500 text-[9px] font-bold rounded uppercase">Action Required</Link>
          </div>
          <InventoryAlerts alerts={inventoryAlerts} />
        </div>
      </div>

      {/* Quick Stats Footer */}
      <footer className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">Avg. Order Value</p>
          <p className="text-base font-bold text-white">$87.50</p>
        </div>
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">Satisfaction</p>
          <p className="text-base font-bold text-white">4.8 ★</p>
        </div>
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">Response Time</p>
          <p className="text-base font-bold text-white">2.4 min</p>
        </div>
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">System Uptime</p>
          <p className="text-base font-bold text-emerald-500">99.98%</p>
        </div>
      </footer>
    </div>
  );
};

// --- MOCK DATA ---
const mockOrders = [
  { id: 1, order_id: 'HB-1092', customer_name: 'Alex Johnson', date: '2023-10-19', total: 125.50, status: 'Completed', order_date: new Date() },
  { id: 2, order_id: 'HB-1091', customer_name: 'Maria Garcia', date: '2023-10-19', total: 45.00, status: 'Processing', order_date: new Date() },
  { id: 3, order_id: 'HB-1090', customer_name: 'James Wilson', date: '2023-10-18', total: 210.20, status: 'Pending', order_date: new Date() },
  { id: 4, order_id: 'HB-1089', customer_name: 'Sarah Parker', date: '2023-10-18', total: 89.99, status: 'Completed', order_date: new Date() },
  { id: 5, order_id: 'HB-1088', customer_name: 'Kevin Lee', date: '2023-10-17', total: 32.50, status: 'Cancelled', order_date: new Date() },
];

const mockAlerts = [
  { id: 1, name: 'Divine Lip Kit', stock: 2 },
  { id: 2, name: 'Glow Serum', stock: 0 },
  { id: 3, name: 'Rose Water Toner', stock: 4 },
];

const mockTopProducts = [
  { id: 1, name: 'Divine Lip Kit', sales: 2450 },
  { id: 2, name: 'Glow Serum', sales: 1890 },
  { id: 3, name: 'Hydrating Mist', sales: 1200 },
  { id: 4, name: 'Night Repair Cream', sales: 950 },
];

export default AdminDashboard;
