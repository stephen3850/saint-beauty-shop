import React from 'react';
import { Sparkles } from 'lucide-react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse"></div>
        <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl shadow-inner relative z-10">
          <Sparkles className="text-white w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-gray-900 leading-tight">
          SAINT
        </span>
        <span className="text-[10px] md:text-[12px] font-sans font-black tracking-[0.3em] text-primary uppercase">
          BEAUTY SHOP
        </span>
      </div>
    </div>
  );
};

export default Logo;
