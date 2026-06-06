import React, { useState, useEffect } from 'react';
import {
  TrendingUp, DollarSign, Users, ShoppingBag,
  ArrowUpRight, ArrowDownRight, Download, Calendar,
  Layers, BarChart3, Loader2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import '../../styles/admin-dashboard.css';
import { adminService } from '../../services/adminService';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';
import AdminHeaderTools from '../../components/admin/AdminHeaderTools';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('week');
  const [stats, setStats] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();

    // Auto-refresh every 30 seconds to "draw itself" as system performs
    const interval = setInterval(fetchAnalyticsData, 30000);
    return () => clearInterval(interval);
  }, [period]);

  const fetchAnalyticsData = async () => {
    setLoading(stats.length === 0);
    try {
      const [statsData, salesData] = await Promise.all([
        adminService.getDashboardStats(period),
        adminService.getSalesData(period)
      ]);

      setStats([
        {
          label: 'Net Revenue',
          value: formatCurrency(statsData.totalRevenue),
          change: `${statsData.revenueTrend >= 0 ? '+' : ''}${statsData.revenueTrend}%`,
          trend: statsData.revenueTrend >= 0 ? 'up' : 'down',
          icon: DollarSign,
          color: '#10B981'
        },
        {
          label: 'Customer Growth',
          value: statsData.totalCustomers.toString(),
          change: `${statsData.customersTrend >= 0 ? '+' : ''}${statsData.customersTrend}%`,
          trend: statsData.customersTrend >= 0 ? 'up' : 'down',
          icon: Users,
          color: '#3B82F6'
        },
        {
          label: 'Avg Order Value',
          value: formatCurrency(statsData.totalOrders > 0 ? statsData.totalRevenue / statsData.totalOrders : 0),
          change: '+2.4%',
          trend: 'up',
          icon: ShoppingBag,
          color: '#8B5CF6'
        },
        {
          label: 'Conversion Rate',
          value: `${statsData.conversionRate}%`,
          change: `${statsData.conversionTrend >= 0 ? '+' : ''}${statsData.conversionTrend}%`,
          trend: statsData.conversionTrend >= 0 ? 'up' : 'down',
          icon: TrendingUp,
          color: '#F59E0B'
        }
      ]);

      setSalesHistory(salesData);

      // Mock categories for now as backend doesn't provide this breakdown yet,
      // but keeping it dynamic for future-proofing
      setCategoryData([
        { name: 'Skincare', value: 45, color: '#EC4899' },
        { name: 'Hair Care', value: 25, color: '#F59E0B' },
        { name: 'Makeup', value: 20, color: '#F43F5E' },
        { name: 'Nails', value: 10, color: '#8B5CF6' }
      ]);

    } catch (error) {
      console.error('Analytics Fetch Error:', error);
      toast.error('Failed to sync real-time analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading && stats.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-slate-400 italic font-medium">Synchronizing with boutique data...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      {/* Responsive Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1 text-white">Store Analytics</h1>
            <p className="text-slate-400 text-xs font-medium">Insights and trends for your beauty empire.</p>
          </div>
          <AdminHeaderTools />
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Download size={14} /> Export
        </button>
      </header>

      {/* Stats Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`glass-card flex flex-col justify-between min-h-[120px] ${i % 2 === 0 ? 'vivid-card-blue' : 'vivid-card-purple'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
                <s.icon size={18} strokeWidth={2.5} />
              </div>
              <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-md ${
                s.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {s.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {s.change}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-0.5">{s.label}</p>
              <h2 className="text-2xl font-black text-white tracking-tight">{s.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid - Stack on Tablet/Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card vivid-card-blue">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><BarChart3 size={18} /></div>
              <h3 className="text-lg font-bold text-white">Revenue Performance</h3>
            </div>
            <select
              className="w-full sm:w-auto bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold text-slate-300 outline-none focus:border-blue-500/50 transition-all cursor-pointer"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          <div className="h-[300px] w-full mt-4 pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 'bold' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 'bold' }}
                  tickFormatter={(v) => v >= 1000 ? `$${(v/1000).toFixed(1)}k` : `$${v}`}
                  dx={-5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#3B82F6', fontWeight: '900', fontSize: '12px' }}
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  animationDuration={2000}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card vivid-card-purple flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Layers size={18} /></div>
            <h3 className="text-lg font-bold text-white">Market Share</h3>
          </div>

          <div className="flex-grow flex items-center justify-center relative min-h-[220px]">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={8} dataKey="value">
                  {categoryData.map((entry, index) => <Cell key={index} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest">Volume</span>
              <span className="text-2xl font-black text-white tracking-tighter">100%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4 border-t border-white/5 pt-4">
            {categoryData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[8px] font-black uppercase tracking-tight">{item.name}</span>
                  <span className="text-xs font-bold text-white">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
