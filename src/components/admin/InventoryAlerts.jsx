import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

const InventoryAlerts = ({ alerts }) => {
  const getSeverity = (stock) => {
    if (stock === 0) return { label: 'Critical', color: 'text-rose-500', bg: 'bg-rose-500/10' };
    if (stock <= 3) return { label: 'Low', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { label: 'Warning', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
  };

  return (
    <div className="space-y-4">
      {alerts.length === 0 ? (
        <div className="text-center py-8 text-slate-500 italic">No inventory alerts</div>
      ) : (
        alerts.map((item) => {
          const severity = getSeverity(item.stock);
          return (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${severity.bg} ${severity.color}`}>
                  <AlertCircle size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.stock} left in stock</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                Restock <ArrowRight size={14} />
              </button>
            </div>
          );
        })
      )}
      <button className="w-full py-2 mt-2 text-sm font-medium text-slate-400 hover:text-white border border-dashed border-slate-700 rounded-xl transition-all">
        View All Inventory
      </button>
    </div>
  );
};

export default InventoryAlerts;
