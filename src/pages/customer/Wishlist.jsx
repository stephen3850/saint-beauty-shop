import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, Trash2, Heart, ArrowRight, Package } from 'lucide-react';
import { STORAGE_KEYS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
    toast.error('Removed from wishlist');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const addAllToCart = () => {
    wishlist.forEach(p => addToCart(p));
    setWishlist([]);
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([]));
    toast.success('Everything moved to your bag! ✨');
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur p-16 rounded-[3rem] border-2 border-dashed border-pink-100 text-center">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-pink-300 mb-8">
          <Heart size={48} />
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 italic">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium text-lg">Save your favorite beauty items here to shop them later!</p>
        <Link to="/shop" className="btn-primary inline-flex items-center gap-3 py-4 px-10 text-xl font-black">
          Discover Products <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-2 italic">My Wishlist</h1>
          <p className="text-gray-500 font-bold text-xl">Products you've saved for later.</p>
        </div>
        <button
          onClick={addAllToCart}
          className="btn-gold py-4 px-8 font-black flex items-center gap-2 shadow-lg shadow-amber-100 transition-all hover:-translate-y-1 active:translate-y-0"
        >
          <ShoppingCart size={20} /> Move All to Bag
        </button>
      </div>

      <div className="grid gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-[2.5rem] border border-pink-50 shadow-sm hover:shadow-xl hover:shadow-pink-50 transition-all p-6 flex flex-col md:flex-row gap-8 items-center group">
            <div className="w-32 h-32 bg-pink-50 rounded-[2rem] flex items-center justify-center text-5xl shrink-0 group-hover:scale-105 transition-transform duration-500">
              {item.imageIcon}
            </div>

            <div className="flex-grow text-center md:text-left">
              <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-100 mb-2 inline-block">
                {item.category}
              </span>
              <h3 className="text-2xl font-black text-gray-800 italic">{item.name}</h3>
              <p className="text-gray-400 font-medium text-sm mt-1">{item.shopName}</p>
              <p className="text-2xl font-black text-pink-600 italic mt-3">{formatCurrency(item.price)}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={() => handleAddToCart(item)}
                className="btn-primary flex-grow md:flex-grow-0 py-4 px-8 text-sm font-black shadow-pink-100 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Add to Bag
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="p-4 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all flex items-center justify-center"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
