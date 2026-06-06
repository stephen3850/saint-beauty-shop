import React from 'react';

export const FullPageLoader = () => (
  <div className="fixed inset-0 z-[250] flex items-center justify-center bg-[#FEF5F0]">
    <div className="flex flex-col items-center gap-8 animate-in fade-in duration-1000">
      <h1 className="text-3xl font-bold tracking-tight text-[#2D2327] animate-pulse">
        HEVEN<span className="font-light italic">BEAUTY SHOP</span>
      </h1>
      <div className="w-12 h-[1px] bg-[#E5705E] animate-[shimmer_2s_infinite]" />
    </div>
  </div>
);

export const SkeletonCard = () => (
  <div className="space-y-6">
    <div className="aspect-[4/5] bg-[#F0E4DC] animate-pulse" />
    <div className="space-y-3">
       <div className="h-4 bg-[#F0E4DC] animate-pulse w-1/4 mx-auto" />
       <div className="h-6 bg-[#F0E4DC] animate-pulse w-3/4 mx-auto" />
       <div className="h-4 bg-[#F0E4DC] animate-pulse w-1/4 mx-auto" />
    </div>
  </div>
);

export const ButtonLoader = () => (
  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
);
