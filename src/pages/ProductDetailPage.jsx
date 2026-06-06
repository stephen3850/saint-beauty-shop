import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { Loader2 } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await productService.getProductById(id);
        if (isMounted && data) {
          setProduct(data);
        }
      } catch (err) {
        console.error('Data loading error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
        <Loader2 className="animate-spin text-[#FA8CA3]" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-xl font-bold">Ritual not found</h2>
        <button onClick={() => navigate('/shop')} className="px-10 py-3 bg-gray-900 text-white rounded-sm">Back to Boutique</button>
      </div>
    );
  }

  // Define images array with multiple layers of safety
  const getImages = () => {
    const fallback = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881';
    try {
      const imgs = product.images;
      let list = [];
      if (Array.isArray(imgs)) list = imgs;
      else if (typeof imgs === 'string' && imgs.startsWith('[')) list = JSON.parse(imgs);
      else if (typeof imgs === 'string' && imgs.length > 0) list = [imgs];

      if (list.length === 0) return [fallback];

      return list.map(img => {
        const s = String(img);
        if (s.startsWith('http') || s.startsWith('data:')) return s;
        return `http://localhost:5000${s.startsWith('/') ? '' : '/'}${s}`;
      });
    } catch (e) {
      return [fallback];
    }
  };

  const productImages = getImages();

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          <div className="space-y-6">
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-8 border border-gray-100">
               <img
                src={productImages[activeImage] || productImages[0]}
                alt={product.name || 'Ritual'}
                className="max-w-full max-h-full object-contain"
               />
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 border shrink-0 ${activeImage === i ? 'border-gray-900' : 'border-gray-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FA8CA3]">{String(product.category || 'Collection')}</p>
              <h1 className="text-4xl font-serif text-gray-900 leading-tight">{String(product.name || 'Beauty Ritual')}</h1>
              <p className="text-3xl font-normal text-gray-900">{formatCurrency(product.price)}</p>
            </div>

            <div className="flex items-center gap-4">
               <div className="flex border border-gray-200">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 hover:bg-gray-50">-</button>
                  <span className="w-12 h-12 flex items-center justify-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 hover:bg-gray-50">+</button>
               </div>
               <button
                onClick={() => { addToCart(product, quantity); navigate('/checkout'); }}
                className="flex-grow bg-gray-900 text-white py-4 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all"
               >
                Buy Now
               </button>
            </div>

            <div className="pt-10 border-t border-gray-100">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Description</h3>
               <p className="text-gray-600 leading-relaxed italic text-lg">
                 "{String(product.description || 'Elevate your natural glow with this curated beauty essential.')}"
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
