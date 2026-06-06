import React from 'react';
import { RotateCcw, Filter, ChevronDown } from 'lucide-react';

const FiltersSidebar = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  resetFilters
}) => {
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-6 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-gray-100 shadow-xl shadow-pink-500/5 sticky top-24">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-black flex items-center gap-2 uppercase tracking-widest text-gray-900">
          <Filter size={16} className="text-pink-500" /> Filters
        </h2>
        <button
          onClick={resetFilters}
          className="text-gray-400 hover:text-pink-500 transition-colors flex items-center gap-1 text-[10px] font-black uppercase tracking-widest"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Categories */}
      <section>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="peer appearance-none w-4 h-4 rounded border-2 border-gray-100 checked:border-pink-500 checked:bg-pink-500 transition-all cursor-pointer"
                />
                <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-gray-600 group-hover:text-pink-500 transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Price Range */}
      <section>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Price Range</h3>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">$</span>
            <input
              type="number"
              placeholder="0"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-full pl-6 pr-2 py-2 rounded-xl bg-gray-50 border border-gray-100 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all text-[11px] font-bold outline-none"
            />
          </div>
          <span className="text-gray-200">/</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">$</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-full pl-6 pr-2 py-2 rounded-xl bg-gray-50 border border-gray-100 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all text-[11px] font-bold outline-none"
            />
          </div>
        </div>
      </section>

      {/* Sort By */}
      <section>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Sort By</h3>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all text-[11px] font-bold text-gray-700 outline-none"
          >
            <option value="name-asc">Alphabetical (A-Z)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default FiltersSidebar;
