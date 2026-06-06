import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import {
  Loader2,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ChevronDown,
  ArrowRight,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

const OrderTracking = () => {
  const { orderId: urlOrderId } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrders();
      setOrders(data || []);

      // If there's an ID in the URL, select it, otherwise select the most recent one
      if (urlOrderId && data) {
        const found = data.find(o => o.id.toString() === urlOrderId || o.order_id === urlOrderId);
        if (found) setSelectedOrder(found);
      } else if (data && data.length > 0) {
        setSelectedOrder(data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Unable to connect to the sanctuary. Please try again.");
      toast.error("Failed to load your beauty history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderChange = (e) => {
    const orderId = e.target.value;
    const found = orders.find(o => o.id.toString() === orderId);
    if (found) {
      setSelectedOrder(found);
      navigate(`/dashboard/track/${found.id}`);
    }
  };

  const statusConfig = {
    pending: { color: 'text-[#FFC107]', bg: 'bg-[#FFC107]/20', border: 'border-[#FFC107]/30', label: 'Pending' },
    confirmed: { color: 'text-[#2196F3]', bg: 'bg-[#2196F3]/20', border: 'border-[#2196F3]/30', label: 'Confirmed' },
    shipped: { color: 'text-[#9C27B0]', bg: 'bg-[#9C27B0]/20', border: 'border-[#9C27B0]/30', label: 'Shipped' },
    delivered: { color: 'text-[#4CAF50]', bg: 'bg-[#4CAF50]/20', border: 'border-[#4CAF50]/30', label: 'Delivered' }
  };

  const steps = [
    { key: 'pending', label: 'Order Placed', icon: <Clock size={18} /> },
    { key: 'confirmed', label: 'Payment Confirmed', icon: <CheckCircle size={18} /> },
    { key: 'shipped', label: 'Shipped', icon: <Truck size={18} /> },
    { key: 'delivered', label: 'Delivered', icon: <ShoppingBag size={18} /> }
  ];

  const getCurrentStep = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 3;
    if (s === 'shipped') return 2;
    if (s === 'confirmed') return 1;
    return 0;
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
      <Loader2 className="animate-spin text-[#7B9E87] mb-6" size={48} />
      <p className="text-white/40 italic animate-pulse">Locating your beauty rituals...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white space-y-6">
      <AlertCircle className="text-red-400" size={60} />
      <p className="text-xl font-light">{error}</p>
      <button onClick={fetchOrders} className="btn-premium px-10 py-3 text-sm">Retry Connection</button>
    </div>
  );

  if (orders.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white text-center space-y-8">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
        <Package className="text-white/20" size={40} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold italic">No beauty journeys yet</h2>
        <p className="text-white/40 font-light">Your order history is a blank canvas. Let's paint it together.</p>
      </div>
      <Link to="/shop" className="btn-premium px-12 py-4">Explore the Boutique</Link>
    </div>
  );

  const currentStatus = selectedOrder?.status?.toLowerCase() || 'pending';
  const config = statusConfig[currentStatus] || statusConfig.pending;
  const activeStep = getCurrentStep(currentStatus);

  // Parse JSON fields
  const items = typeof selectedOrder?.items === 'string' ? JSON.parse(selectedOrder.items) : (selectedOrder?.items || []);
  const timeline = typeof selectedOrder?.timeline === 'string' ? JSON.parse(selectedOrder.timeline) : (selectedOrder?.timeline || []);
  const shippingAddress = typeof selectedOrder?.shipping_address === 'string' ? JSON.parse(selectedOrder.shipping_address) : selectedOrder?.shipping_address;

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 max-w-6xl mx-auto pb-20">

      {/* Header & Selector */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white italic">Ritual Journey</h1>
          <p className="text-white/40 text-sm italic">Tracking the flow of your beauty essentials.</p>
        </div>

        <div className="w-full lg:w-96 relative">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2 mb-2 block">Select Journey</label>
          <div className="relative group">
            <select
              value={selectedOrder?.id}
              onChange={handleOrderChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-12 text-white text-sm appearance-none focus:outline-none focus:border-[#7B9E87] focus:bg-white/10 transition-all cursor-pointer shadow-xl"
            >
              {orders.map(o => (
                <option key={o.id} value={o.id} className="bg-[#0A1928] text-white">
                  #{o.order_id || o.id} — {new Date(o.order_date).toLocaleDateString()} — {formatCurrency(o.total)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none group-hover:text-white transition-colors" size={20} />
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Tracking Panel */}
          <div className="lg:col-span-2 space-y-8">

            {/* Status Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B9E87]/5 rounded-full blur-[100px] -mr-32 -mt-32" />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 mb-12">
                <div>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${config.bg} ${config.color} ${config.border}`}>
                    {config.label}
                  </span>
                  <h2 className="text-3xl font-bold italic text-white mt-4 tracking-tight">#{selectedOrder.order_id || selectedOrder.id}</h2>
                  <p className="text-white/40 text-xs mt-1">Journey started on {new Date(selectedOrder.order_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">Investment</p>
                  <p className="text-3xl font-bold text-white tracking-tighter">{formatCurrency(selectedOrder.total)}</p>
                </div>
              </div>

              {/* Stepper */}
              <div className="relative z-10 py-10 px-2">
                <div className="relative flex justify-between">
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />
                  <div
                    className="absolute top-1/2 left-0 h-[2px] bg-[#7B9E87] -translate-y-1/2 transition-all duration-1000 shadow-[0_0_15px_rgba(123,158,135,0.5)]"
                    style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  />

                  {steps.map((step, idx) => (
                    <div key={step.key} className="relative z-10 flex flex-col items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-700 ${idx <= activeStep ? 'bg-[#7B9E87] border-[#7B9E87] text-white shadow-lg' : 'bg-[#0A1928] border-white/5 text-white/10'}`}>
                        {step.icon}
                      </div>
                      <p className={`text-[10px] font-black uppercase tracking-widest text-center ${idx <= activeStep ? 'text-white' : 'text-white/20'}`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Items Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-xl">
              <h3 className="text-xl font-bold italic text-white mb-10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#7B9E87]/20 flex items-center justify-center text-[#7B9E87]"><Package size={16} /></div>
                Included Rituals
              </h3>
              <div className="grid gap-6">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                      {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : "✨"}
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-white group-hover:text-[#7B9E87] transition-colors">{item.name}</p>
                      <p className="text-white/30 text-[10px] font-black uppercase mt-1">{item.quantity} Rituals • {formatCurrency(item.price)} ea</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Panel */}
          <div className="space-y-8">

            {/* Timeline Card */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 shadow-xl">
              <h3 className="text-lg font-bold italic text-white mb-10 tracking-tight">Timeline</h3>
              <div className="space-y-10 relative">
                <div className="absolute left-[7px] top-2 bottom-0 w-0.5 bg-white/5" />
                {timeline.slice().reverse().map((event, idx) => (
                  <div key={idx} className="flex gap-6 relative z-10 group">
                    <div className={`w-4 h-4 rounded-full mt-1.5 shrink-0 border-2 ${idx === 0 ? 'bg-[#7B9E87] border-[#7B9E87] shadow-[0_0_10px_rgba(123,158,135,0.4)] animate-pulse' : 'bg-[#0A1928] border-white/10'}`} />
                    <div>
                      <p className={`text-sm leading-snug font-medium italic ${idx === 0 ? 'text-white' : 'text-white/40'}`}>{event.description}</p>
                      <p className="text-[10px] text-white/20 font-black uppercase mt-1 tracking-widest">
                        {new Date(event.date).toLocaleDateString()} — {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {(timeline.length === 0) && (
                   <p className="text-white/20 italic text-sm py-4">Journey starting soon...</p>
                )}
              </div>
            </div>

            {/* Destination & Tracking Info */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#7B9E87] shrink-0 mt-1" size={20} />
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Sanctuary Destination</h4>
                    <p className="text-white/80 font-light text-sm italic leading-relaxed">
                        {shippingAddress ? `${shippingAddress.street}, ${shippingAddress.city} ${shippingAddress.zip}` : 'No address provided'}
                    </p>
                  </div>
                </div>

                {selectedOrder.tracking_number && (
                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Carrier Tracking</h4>
                      <p className="text-xl font-bold text-white italic">{selectedOrder.tracking_number}</p>
                    </div>
                    {selectedOrder.estimated_delivery && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B9E87] mb-1">Expected Arrival</h4>
                        <p className="text-white font-medium text-sm">{new Date(selectedOrder.estimated_delivery).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Support Call-to-Action */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 text-center space-y-6">
              <p className="text-white/50 text-sm font-light italic leading-relaxed px-4">Encountered an issue with your beauty journey?</p>
              <button className="w-full bg-[#2196F3] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#1976D2] transition-all shadow-xl shadow-blue-500/10">Speak with support</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
