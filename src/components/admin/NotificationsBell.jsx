import React, { useState } from 'react';
import { Bell, ShoppingCart, MessageCircle, AlertTriangle } from 'lucide-react';

const NotificationsBell = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    { id: 1, type: 'order', text: 'New order #1284 received', time: '2 mins ago', icon: ShoppingCart, color: 'text-blue-500' },
    { id: 2, type: 'chat', text: 'New message from Sarah', time: '15 mins ago', icon: MessageCircle, color: 'text-emerald-500' },
    { id: 3, type: 'stock', text: 'Glow Serum is low on stock', time: '1 hour ago', icon: AlertTriangle, color: 'text-amber-500' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-xl border border-white/5 transition-all"
      >
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0A0E17]" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-3 w-80 bg-[#12192D] border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold">Notifications</h3>
              <button className="text-xs text-blue-400 hover:underline">Mark all as read</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex gap-3">
                    <div className={`mt-1 ${n.color}`}>
                      <n.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-200">{n.text}</p>
                      <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 text-center">
              <button className="text-xs text-slate-400 hover:text-white">View all notifications</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationsBell;
