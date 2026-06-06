import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, Heart, ArrowRight } from 'lucide-react';
import OrderStatusBadge from '../../components/OrderStatusBadge';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ orders: 0, spent: 0, wishlist: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recommendations, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allOrders, allProducts] = await Promise.all([
          orderService.getOrders(),
          productService.getProducts()
        ]);

        setRecentOrders(allOrders.slice(0, 3));
        setRecommended(allProducts.slice(0, 3));

        const totalSpent = allOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        setStats({
          orders: allOrders.length,
          spent: totalSpent,
          wishlist: 5 // Placeholder for wishlist count
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-12 text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic">
            Bonjour, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B9E87] via-[#C4A46C] to-[#E5705E]">{user?.name?.split(' ')[0] || 'Emma'}</span>!
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-white/40 text-lg font-light italic">Your beauty sanctuary is ready for you today.</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C4A46C]/60 flex items-center gap-2">
              <span className="w-8 h-px bg-white/10" />
              {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
            <Link to="/shop" className="btn-premium px-8 py-3 text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-[#7B9E87] hover:text-white transition-all">Shop Rituals</Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="relative group overflow-hidden bg-gradient-to-br from-[#3B82F6]/20 to-transparent backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-3xl group-hover:bg-[#3B82F6]/20 transition-colors" />
          <div className="w-14 h-14 bg-[#3B82F6] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-[#3B82F6]/20 rotate-3 group-hover:rotate-0 transition-transform">
            <ShoppingBag size={24} />
          </div>
          <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.2em] mb-1">Total Rituals</p>
          <p className="text-5xl font-black tracking-tight">{stats.orders}</p>
        </div>

        <div className="relative group overflow-hidden bg-gradient-to-br from-[#10B981]/20 to-transparent backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#10B981]/10 rounded-full blur-3xl group-hover:bg-[#10B981]/20 transition-colors" />
          <div className="w-14 h-14 bg-[#10B981] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-[#10B981]/20 -rotate-3 group-hover:rotate-0 transition-transform">
            <CreditCard size={24} />
          </div>
          <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.2em] mb-1">Self Investment</p>
          <p className="text-5xl font-black tracking-tight">{formatCurrency(stats.spent)}</p>
        </div>

        <div className="relative group overflow-hidden bg-gradient-to-br from-[#F43F5E]/20 to-transparent backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#F43F5E]/10 rounded-full blur-3xl group-hover:bg-[#F43F5E]/20 transition-colors" />
          <div className="w-14 h-14 bg-[#F43F5E] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-[#F43F5E]/20 rotate-6 group-hover:rotate-0 transition-transform">
            <Heart size={24} />
          </div>
          <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.2em] mb-1">Loved Items</p>
          <p className="text-5xl font-black tracking-tight">{stats.wishlist}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Orders Section */}
        <section className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50" />
          <div className="flex justify-between items-center relative z-10">
            <h3 className="text-2xl font-black italic tracking-tight">Recent Rituals</h3>
            <Link to="/dashboard/orders" className="text-[10px] font-black uppercase tracking-widest text-[#7B9E87] hover:text-white border-b border-[#7B9E87]/30 pb-1 transition-all">View History</Link>
          </div>

          <div className="space-y-4 relative z-10">
            {recentOrders.length === 0 ? (
              <div className="text-center py-10 space-y-4">
                 <div className="text-4xl">🕯️</div>
                 <p className="text-white/20 italic text-sm">Your journey is just beginning...</p>
              </div>
            ) : recentOrders.map(order => (
              <div key={order.id} className="group bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:scale-[1.02] transition-all duration-300">
                <div className="space-y-1">
                  <p className="font-black text-xs tracking-widest text-[#C4A46C]">#{order.order_id || String(order.id).slice(-6).toUpperCase()}</p>
                  <p className="text-white/30 text-[10px] font-bold uppercase">{new Date(order.orderDate || order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div className="space-y-1">
                    <p className="font-black text-lg tracking-tighter">{formatCurrency(order.total)}</p>
                    <div className="flex justify-end"><OrderStatusBadge status={order.status} /></div>
                  </div>
                  <ArrowRight size={16} className="text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Products */}
        <section className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C4A46C]/5 rounded-full blur-[100px] pointer-events-none" />
          <h3 className="text-2xl font-black italic tracking-tight">Tailored for You</h3>
          <div className="grid grid-cols-1 gap-5">
            {recommendations.map(product => (
              <Link to={`/shop/${product.id}`} key={product.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-5 group hover:bg-white/10 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-[#0A1928] rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform overflow-hidden shadow-inner border border-white/5">
                  {(() => {
                    try {
                      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
                      return images && images[0] ? <img src={images[0]} className="w-full h-full object-cover" alt="" /> : '✨';
                    } catch (e) {
                      return '✨';
                    }
                  })()}
                </div>
                <div className="flex-grow">
                  <p className="font-black text-sm group-hover:text-[#7B9E87] transition-colors tracking-tight">{product.name}</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">{formatCurrency(product.price)}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#7B9E87] transition-all">
                    <ArrowRight size={14} className="text-white/20 group-hover:text-white" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardOverview;
