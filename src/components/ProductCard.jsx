import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ProductPlaceholder = ({ category }) => {
  const icons = {
    Skincare: "🌿",
    Hair: "💇‍♀️",
    Makeup: "💄",
    Nails: "💅"
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#D8E2D6]/30 text-7xl">
      {icons[category] || "✨"}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Colourful palette for different product types - More vibrant
  const getThemeColors = (category) => {
    const cats = category?.toLowerCase() || '';
    if (cats.includes('skin') || cats.includes('serum') || cats.includes('essence') || cats.includes('ampoule'))
        return { bg: 'bg-rose-50/50', text: 'text-rose-600', badge: 'bg-rose-100', shadow: 'hover:shadow-rose-100/50', accent: 'bg-rose-500' };
    if (cats.includes('hair'))
        return { bg: 'bg-emerald-50/50', text: 'text-emerald-600', badge: 'bg-emerald-100', shadow: 'hover:shadow-emerald-100/50', accent: 'bg-emerald-500' };
    if (cats.includes('makeup') || cats.includes('lip'))
        return { bg: 'bg-amber-50/50', text: 'text-amber-600', badge: 'bg-amber-100', shadow: 'hover:shadow-amber-100/50', accent: 'bg-amber-500' };
    if (cats.includes('body') || cats.includes('scrub'))
        return { bg: 'bg-violet-50/50', text: 'text-violet-600', badge: 'bg-violet-100', shadow: 'hover:shadow-violet-100/50', accent: 'bg-violet-500' };
    if (cats.includes('tool') || cats.includes('eye'))
        return { bg: 'bg-sky-50/50', text: 'text-sky-600', badge: 'bg-sky-100', shadow: 'hover:shadow-sky-100/50', accent: 'bg-sky-500' };
    if (cats.includes('cleanser') || cats.includes('toner'))
        return { bg: 'bg-cyan-50/50', text: 'text-cyan-600', badge: 'bg-cyan-100', shadow: 'hover:shadow-cyan-100/50', accent: 'bg-cyan-500' };
    if (cats.includes('sun'))
        return { bg: 'bg-yellow-50/50', text: 'text-yellow-700', badge: 'bg-yellow-100', shadow: 'hover:shadow-yellow-100/50', accent: 'bg-yellow-500' };

    return { bg: 'bg-slate-50/50', text: 'text-slate-600', badge: 'bg-slate-100', shadow: 'hover:shadow-slate-100/50', accent: 'bg-slate-600' };
  };

  const theme = getThemeColors(product.category);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  let imageUrl = null;
  if (product.images) {
    try {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (Array.isArray(images) && images.length > 0) {
        imageUrl = images[0];
      }
    } catch (e) {
      console.error("Error parsing product images", e);
    }
  } else if (product.image_url) {
    imageUrl = product.image_url;
  }

  if (imageUrl && !imageUrl.startsWith('http')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  }

  return (
    <div className={`group relative flex flex-col h-full transition-all duration-500 hover:-translate-y-1.5`}>
      {/* Image Container with Dynamic Background - More compact */}
      <div className={`relative aspect-[4/5] overflow-hidden ${theme.bg} backdrop-blur-sm border border-gray-50/50 transition-all duration-700 mb-3 flex items-center justify-center p-3 rounded-2xl ${theme.shadow} hover:shadow-2xl`}>
        {!imageUrl || imageError ? (
          <ProductPlaceholder category={product.category} />
        ) : (
          <img
            src={imageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-110 transition-all duration-1000 ease-out drop-shadow-md"
          />
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <button
              onClick={handleAddToCart}
              className={`${theme.accent} text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl`}
            >
              Quick Add
            </button>
        </div>

        {/* Dynamic Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.stock < 10 && product.stock > 0 && (
             <span className="bg-red-500 text-white px-1.5 py-0.5 text-[6px] font-black uppercase tracking-widest rounded-sm shadow-sm">
               Low Stock
             </span>
          )}
          {product.price > 5000 && (
             <span className="bg-amber-400 text-white px-1.5 py-0.5 text-[6px] font-black uppercase tracking-widest rounded-sm shadow-sm">
               Premium
             </span>
          )}
        </div>
      </div>

      {/* Content Area - More Compact */}
      <div className="flex flex-col flex-grow px-1">
        <Link to={`/shop/${product._id || product.id}`}>
          <h3 className="text-[12px] font-bold text-gray-800 mb-0.5 group-hover:text-black transition-colors duration-300 leading-tight line-clamp-2 min-h-[2rem]">
            {product.name}
          </h3>
        </Link>

        <p className={`text-[8px] ${theme.text} font-black uppercase tracking-[0.15em] mb-1.5`}>
          {product.shop_name || 'SAINT BEAUTY SHOP'}
        </p>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-2.5 h-2.5 fill-current ${i < (product.rating || 5) ? '' : 'text-gray-200'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[9px] text-gray-400 font-medium">
            ({product.num_reviews || 12})
          </span>
        </div>

        <div className="mt-auto flex justify-between items-center pt-1 border-t border-gray-50">
          <p className="text-sm font-black text-gray-900">
            {formatCurrency(product.price)}
          </p>
          <button
            onClick={handleAddToCart}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-100 text-gray-600 hover:bg-black hover:text-white hover:border-black active:scale-90 shadow-sm`}
          >
            <ShoppingBag size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
