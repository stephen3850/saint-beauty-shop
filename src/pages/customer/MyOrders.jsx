import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import { orderService } from '../../services/orderService';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { Loader2, ArrowRight, Package, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

const MyOrders = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    if (user) {
      const data = await orderService.getOrders(user.id);
      setOrders(data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handleStatusUpdate = (data) => {
      if (data.customerId === user?.id) {
        setOrders(prev => prev.map(o =>
          o.id === data.orderId ? { ...o, status: data.status } : o
        ));
      }
    };
    socket.on('order_status_changed', handleStatusUpdate);
    return () => socket.off('order_status_changed', handleStatusUpdate);
  }, [socket, user]);

  const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <Loader2 className="animate-spin text-[#7B9E87] mb-4" size={40} />
      <p className="text-[#5A6B5C]/60 text-sm italic">Consulting our records...</p>
    </div>
  );

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-[#D8E2D6] text-center space-y-6 animate-in fade-in duration-1000">
        <div className="w-20 h-20 bg-[#F2F6F0] rounded-full flex items-center justify-center mx-auto text-[#7B9E87] shadow-inner">
          <Package size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[#2D3A2E] italic tracking-tight">No purchases yet</h2>
          <p className="text-[#5A6B5C]/60 text-base italic leading-relaxed">Your beauty journey starts here.</p>
        </div>
        <Link to="/shop" className="btn-premium inline-flex items-center gap-3 px-8 py-3 text-sm">
          Discover rituals <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold italic tracking-tight">Order History</h1>
          <p className="text-white/40 text-sm italic">Manage your past rituals.</p>
        </div>

        <div className="flex gap-1 bg-white/5 border border-white/10 p-1 rounded-xl shadow-sm">
           {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map(s => (
             <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filter === s ? 'bg-[#2196F3] text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
             >
               {s}
             </button>
           ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-center group hover:bg-white/[0.08] transition-all">
            {/* Visuals */}
            <div className="flex -space-x-8 shrink-0">
              {order.items.slice(0, 3).map((item, idx) => (
                <div key={idx} className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-3xl border-2 border-white/10 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10" style={{ zIndex: 30 - idx }}>
                  {item.imageIcon || "✨"}
                </div>
              ))}
            </div>

            {/* Info */}
            <div className="flex-grow text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">#{order.order_id || order.id.slice(-6).toUpperCase()}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <div>
                <h3 className="text-xl font-bold italic tracking-tight">
                  {order.items.length} {order.items.length === 1 ? 'Ritual' : 'Rituals'} •
                  <span className="text-[#2196F3] ml-2">{formatCurrency(order.total)}</span>
                </h3>
                <p className="text-white/40 text-xs font-light mt-1">
                  Ordered on {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Link */}
            <div className="shrink-0 w-full md:w-auto">
              <Link
                to={`/dashboard/track/${order.id}`}
                className="w-full md:w-auto bg-white/5 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 border border-white/5 transition-all"
              >
                Track Journey
                <ChevronDown size={14} className="-rotate-90" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
