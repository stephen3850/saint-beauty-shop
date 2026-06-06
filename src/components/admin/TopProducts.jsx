import React from 'react';

const TopProducts = ({ products }) => {
  const maxSales = Math.max(...products.map(p => p.sales), 1);

  return (
    <div className="space-y-6">
      {products.map((product, index) => (
        <div key={product.id} className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-mono">0{index + 1}</span>
              <span className="font-medium">{product.name}</span>
            </div>
            <span className="font-bold">{product.sales.toLocaleString()}</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(product.sales / maxSales) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProducts;
