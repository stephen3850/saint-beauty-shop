import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import socketService from '../../services/socket';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import {
  ShoppingBag, CheckCircle, Truck, PackageCheck,
  ChevronDown, ChevronUp, MapPin, Search, Filter,
  Download, Loader2, Eye, Calendar, User, Mail
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/admin-dashboard.css';
import AdminHeaderTools from '../../components/admin/AdminHeaderTools';

const OrdersManagement = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders().then(() => {
      // If we came from dashboard with a specific order
      if (location.state?.highlightOrderId) {
        setExpandedOrder(location.state.highlightOrderId);
        // Clean up state
        window.history.replaceState({}, document.title);
      }

      // If we came from customers list with a search term
      if (location.state?.searchTerm) {
        setSearchTerm(location.state.searchTerm);
      }
    });

    const s = socketService.connect();
    if (s) {
      const handleAdminNotification = (data) => {
        if (data.type === 'new_order') {
          setOrders(prev => [data.data, ...prev]);
          toast.success(`New order received! 🛍️`, { style: { background: '#1E293B', color: '#fff' } });
        }
      };
      s.on('admin_notification', handleAdminNotification);
      return () => s.off('admin_notification');
    }
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      setOrders(mockOrders); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e, orderId, newStatus) => {
    e.stopPropagation();
    const loadingToast = toast.loading(`Updating to ${newStatus}...`);
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success(`Marked as ${newStatus}! ✨`, { id: loadingToast });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      toast.error('Status update failed', { id: loadingToast });
    }
  };

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Status'];
    const rows = filteredOrders.map(o => [
      o.order_id,
      o.customer_name,
      o.customer_email,
      new Date(o.order_date).toLocaleDateString(),
      o.total,
      o.status
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `hbs_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Orders exported successfully!');
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = filterStatus === 'all' || o.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = (o.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (o.order_id || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="animate-fade-in space-y-6 pb-8">
      {/* Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1 text-white">Order Vault</h1>
            <p className="text-slate-400 text-xs font-medium">Manage and fulfill your customers' beauty desires.</p>
          </div>
          <AdminHeaderTools />
        </div>
        <button
          onClick={handleExportCSV}
          className="w-full xl:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 border border-white/10 rounded-xl text-xs font-bold text-white transition-all hover:bg-slate-700"
        >
          <Download size={16} className="text-blue-400" /> Export CSV
        </button>
      </header>

      {/* Control Bar - High Visibility */}
      <div className="glass-card vivid-card-blue p-3 flex flex-col xl:flex-row justify-between items-center gap-4">
        <div className="flex bg-slate-900/60 p-0.5 rounded-lg border border-white/5 gap-0.5 overflow-x-auto no-scrollbar w-full xl:w-auto">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-[0.05em] transition-all whitespace-nowrap ${
                filterStatus === s ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full xl:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search Order ID or Name..."
            className="admin-search-input w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Responsive Table */}
      <div className="glass-card vivid-card-green p-0 overflow-hidden">
        <div className="admin-table-wrapper custom-scrollbar">
          <table className="admin-table-container min-w-[800px]">
            <thead>
              <tr className="bg-white/[0.01]">
                <th className="w-10 px-4"></th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-right px-4">Fulfillment</th>
              </tr>
            </thead>
            <tbody>
              {loading && orders.length === 0 ? (
                <tr><td colSpan="7" className="py-20 text-center"><Loader2 className="animate-spin text-blue-500 mx-auto" size={32} /></td></tr>
              ) : filteredOrders.map(order => (
                <React.Fragment key={order.id}>
                  <tr
                    className={`admin-table-row cursor-pointer group ${expandedOrder === order.id ? 'bg-blue-600/5' : ''}`}
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <td className="text-center px-4">{expandedOrder === order.id ? <ChevronUp size={16} className="text-blue-500 mx-auto" /> : <ChevronDown size={16} className="text-slate-600 mx-auto" />}</td>
                    <td><span className="font-mono text-[10px] font-black text-blue-400">#{order.order_id}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold text-white border border-white/5 shrink-0">{order.customer_name?.charAt(0)}</div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{order.customer_name}</p>
                          <p className="text-[9px] text-slate-500 truncate">{order.customer_email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="text-[10px] font-medium text-slate-400">{new Date(order.order_date || Date.now()).toLocaleDateString()}</span></td>
                    <td><span className="text-xs font-black text-white">${Number(order.total).toFixed(2)}</span></td>
                    <td><OrderStatusBadge status={order.status} /></td>
                    <td className="text-right px-4">
                       <div className="flex justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                         {order.status.toLowerCase() === 'pending' && <button onClick={(e) => handleUpdateStatus(e, order.id, 'confirmed')} className="p-1.5 bg-blue-600/10 text-blue-400 rounded-md hover:bg-blue-600 hover:text-white transition-all" title="Confirm Order"><CheckCircle size={14} /></button>}
                         {order.status.toLowerCase() === 'confirmed' && <button onClick={(e) => handleUpdateStatus(e, order.id, 'shipped')} className="p-1.5 bg-indigo-600/10 text-indigo-400 rounded-md hover:bg-indigo-600 hover:text-white transition-all" title="Ship Order"><Truck size={14} /></button>}
                         {order.status.toLowerCase() === 'shipped' && <button onClick={(e) => handleUpdateStatus(e, order.id, 'delivered')} className="p-1.5 bg-emerald-600/10 text-emerald-400 rounded-md hover:bg-emerald-600 hover:text-white transition-all" title="Deliver Order"><PackageCheck size={14} /></button>}
                         <button className="p-1.5 bg-slate-800 text-slate-400 rounded-md hover:text-white transition-all" title="View Details"><Eye size={14} /></button>
                       </div>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr className="bg-black/20"><td colSpan="7" className="p-6"><div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"><ShoppingBag size={14} /> Manifest</h4>
                          <div className="space-y-2">{JSON.parse(order.items || '[]').map((item, i) => (
                             <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl border border-white/5"><div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xl border border-white/5">🧖</div>
                                <div><p className="text-sm font-bold text-white">{item.name}</p><p className="text-[10px] text-slate-500">Quantity: {item.quantity}</p></div>
                             </div><p className="font-bold text-sm text-white">${(item.quantity * item.price).toFixed(2)}</p></div>
                          ))}</div>
                       </div>
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"><MapPin size={14} /> Logistics</h4>
                          <div className="p-5 bg-slate-900/50 rounded-2xl border border-white/5 space-y-4">
                             <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Destination</p><p className="text-sm font-medium text-white">{typeof order.shipping_address === 'string' ? JSON.parse(order.shipping_address).street : 'Standard Delivery'}</p></div>
                             <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Contact</p><p className="text-sm font-medium text-white">{order.customer_name} • {order.customer_email}</p></div>
                          </div>
                       </div>
                    </div></td></tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mockOrders = [
  { id: 1, order_id: 'HB-1092', customer_name: 'Stephen King', customer_email: 'sk@beauty.com', order_date: new Date(), total: 245.50, status: 'Pending', items: '[{"name":"Serum","quantity":2,"price":45.00}]' },
  { id: 2, order_id: 'HB-1091', customer_name: 'Maria Garcia', customer_email: 'maria@web.com', order_date: new Date(), total: 89.00, status: 'Confirmed', items: '[{"name":"Mask","quantity":1,"price":89.00}]' },
];

export default OrdersManagement;
