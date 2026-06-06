import React from 'react';
import { Calendar } from 'lucide-react';
import NotificationsBell from './NotificationsBell';

const AdminHeaderTools = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 bg-slate-800/50 border border-white/10 px-4 py-2 rounded-xl text-xs font-medium text-slate-200">
        <Calendar size={16} className="text-blue-500" />
        <span className="font-medium">Oct 12, 2023 - Oct 19, 2023</span>
      </div>
      <NotificationsBell />
      <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-600/20 text-blue-400 font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        AU
      </div>
    </div>
  );
};

export default AdminHeaderTools;
