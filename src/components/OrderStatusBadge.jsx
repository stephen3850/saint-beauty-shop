import React from 'react';
import { Clock, CheckCircle, Truck, PackageCheck, XCircle } from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
  const configs = {
    pending: {
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      icon: <Clock size={12} />,
      text: 'Pending'
    },
    confirmed: {
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      icon: <CheckCircle size={12} />,
      text: 'Confirmed'
    },
    shipped: {
      color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      icon: <Truck size={12} />,
      text: 'Shipped'
    },
    delivered: {
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      icon: <PackageCheck size={12} />,
      text: 'Delivered'
    },
    cancelled: {
      color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      icon: <XCircle size={12} />,
      text: 'Cancelled'
    }
  };

  const config = configs[status?.toLowerCase()] || configs.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${config.color} backdrop-blur-sm`}>
      {config.icon}
      {config.text}
    </span>
  );
};

export default OrderStatusBadge;
