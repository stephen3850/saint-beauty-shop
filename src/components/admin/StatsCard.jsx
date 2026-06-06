import React from 'react';
import CountUp from 'react-countup';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, trend, trendValue, icon: Icon, color }) => {
  const isPositive = trend === 'up';

  return (
    <div
      className="admin-vivid-card flex flex-col justify-between min-h-[130px] animate-fade-in relative overflow-hidden group p-4 bg-[#1E293B] rounded-xl border-l-4"
      style={{ borderLeftColor: color }}
    >
      {/* Background Glow */}
      <div
        className="absolute -right-2 -top-2 w-20 h-20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
        style={{ backgroundColor: color }}
      />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
          style={{ backgroundColor: color, color: '#fff' }}
        >
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm ${
          isPositive ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Number(trendValue || 0).toFixed(0)}%</span>
        </div>
      </div>

      <div className="space-y-0.5 relative z-10">
        {/* Title - Forced to white for maximum visibility */}
        <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-1 drop-shadow-sm">
          {title}
        </h3>
        <div className="text-2xl font-black tracking-tight text-white drop-shadow-md">
          {typeof value === 'number' ? (
            <CountUp
              end={value}
              duration={2}
              separator=","
              prefix={title.toLowerCase().includes('revenue') ? '$' : ''}
              decimals={title.toLowerCase().includes('rate') ? 1 : 0}
              suffix={title.toLowerCase().includes('rate') ? '%' : ''}
            />
          ) : value}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
