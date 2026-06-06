import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import {
  AlertTriangle,
  Package,
  Loader2,
  Plus,
  ArrowRight,
  TrendingDown,
  Box,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/admin-dashboard.css';

const InventoryAlerts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      // Filter for products with stock < 10
      const alerts = data.filter(p => p.stock < 10).sort((a, b) => a.stock - b.stock);
      setItems(alerts);
    } catch (err) {
      toast.error('Failed to sync inventory status');
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async (id, amount) => {
    const loadingToast = toast.loading('Updating inventory...');
    try {
      const currentItem = items.find(i => i.id === id);
      const newStock = (currentItem.stock || 0) + amount;

      // We use the FormData approach for consistency with the products router
      const formData = { stock: newStock };
      await productService.updateProduct(id, formData);

      setItems(prev => prev.map(i => i.id === id ? { ...i, stock: newStock } : i));
      toast.success(`Restocked successfully! 📦`, { id: loadingToast });
    } catch (err) {
      toast.error('Restock failed', { id: loadingToast });
    }
  };

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 text-white">Inventory Watch</h1>
          <p className="text-slate-400 font-medium">Critical stock levels requiring immediate replenishment.</p>
        </div>
        <button
          onClick={fetchAlerts}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm font-bold text-white transition-all hover:bg-slate-700"
        >
          <RefreshCw size={18} className="text-blue-400" /> Refresh Sync
        </button>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={48} />
          <p className="text-slate-500 italic">Scanning warehouse tiers...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="glass-card vivid-card-green py-24 text-center space-y-6">
           <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
             <Package size={40} className="text-emerald-500" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-white">All Stocked Up!</h2>
             <p className="text-slate-500 max-w-sm mx-auto mt-2">Your inventory velocity looks amazing. No products are currently under alert status.</p>
           </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {items.map(p => (
            <div key={p.id} className={`glass-card ${p.stock === 0 ? 'vivid-card-rose' : 'vivid-card-orange'} group flex flex-col md:flex-row items-center gap-8 relative overflow-hidden`}>
              {p.stock === 0 && (
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              )}

              <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center text-4xl border border-white/5 shadow-inner shrink-0">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt="" className="w-full h-full object-cover rounded-3xl" />
                ) : '📦'}
              </div>

              <div className="flex-grow text-center md:text-left space-y-3">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border ${p.stock === 0 ? 'bg-rose-500/20 text-rose-500 border-rose-500/20' : 'bg-amber-500/20 text-amber-500 border-amber-500/20'}`}>
                    {p.stock === 0 ? 'Out of Stock' : 'Low Stock Alert'}
                  </span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4">
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{p.category}</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ID: #{p.id}</p>
                </div>

                <div className="space-y-2 max-w-md mx-auto md:mx-0">
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${p.stock < 3 ? 'bg-rose-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.max((p.stock / 10) * 100, 5)}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    <span>Current Levels: {p.stock} units</span>
                    <span className={p.stock < 3 ? 'text-rose-500' : 'text-amber-500'}>
                      {p.stock === 0 ? 'Critical' : 'Attention Required'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                 <button
                  onClick={() => handleRestock(p.id, 10)}
                  className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                 >
                    <Plus size={16} /> Restock (+10)
                 </button>
                 <button className="p-3 bg-slate-800 text-slate-500 hover:text-white rounded-xl border border-white/5 transition-all">
                    <ArrowRight size={20} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryAlerts;
