import React from 'react';
import { Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderStatusBadge from '../OrderStatusBadge';

const RecentOrdersTable = ({ orders = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-table-wrapper custom-scrollbar">
      <table className="admin-table-container min-w-[600px]">
        <thead>
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th className="text-right px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-10 text-center text-slate-500 italic">No recent orders found.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="admin-table-row group">
                <td className="px-4 py-3 font-mono text-[10px] font-black text-blue-400">#{order.order_id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold text-white border border-white/5">
                      {order.customer_name ? order.customer_name.split(' ').map(n => n[0]).join('') : 'U'}
                    </div>
                    <span className="text-xs font-bold text-white truncate max-w-[120px]">{order.customer_name || 'Unknown'}</span>
                  </div>
                </td>
                <td className="text-[10px] text-slate-400 font-medium">
                  {new Date(order.order_date || order.date || Date.now()).toLocaleDateString()}
                </td>
                <td className="text-xs font-black text-white">${Number(order.total || 0).toFixed(2)}</td>
                <td><OrderStatusBadge status={order.status} /></td>
                <td className="text-right px-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => navigate('/dashboard/admin/orders', { state: { highlightOrderId: order.id } })}
                      className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-md transition-all flex items-center justify-center"
                      title="View in Order Vault"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;
