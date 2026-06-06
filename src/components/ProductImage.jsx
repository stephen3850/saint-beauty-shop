import React, { useState } from 'react';

const ProductImage = ({ imageUrl, productName, category, className = "" }) => {
  const [error, setError] = useState(false);

  const fallbacks = {
    Skincare: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop",
    Hair: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&auto=format&fit=crop",
    Makeup: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
    Nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop",
    default: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop"
  };

  const fallbackUrl = fallbacks[category] || fallbacks.default;

  return (
    <div className={`relative overflow-hidden bg-[#F0E4DC] ${className}`}>
      <img
        src={error || !imageUrl ? fallbackUrl : imageUrl}
        alt={productName}
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {(!imageUrl || error) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none">
          <span className="text-4xl opacity-50">
            {category === 'Skincare' && '🌸'}
            {category === 'Hair' && '💇‍♀️'}
            {category === 'Makeup' && '💄'}
            {category === 'Nails' && '💅'}
            {!['Skincare', 'Hair', 'Makeup', 'Nails'].includes(category) && '✨'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
