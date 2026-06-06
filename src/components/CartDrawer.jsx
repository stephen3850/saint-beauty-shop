import { useCart } from '../contexts/CartContext';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    getCartSummary
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const { subtotal } = getCartSummary();

  // Calculate dummy delivery dates (e.g., tomorrow and day after)
  const getDeliveryRange = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 1);
    const end = new Date(today);
    end.setDate(today.getDate() + 2);

    const options = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options).toUpperCase()} - ${end.toLocaleDateString('en-US', options).toUpperCase()}`;
  };

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col bg-white shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Shopping cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex items-center gap-1 text-gray-500 hover:text-black transition-colors"
              >
                <X size={20} />
                <span className="text-[13px] font-medium uppercase tracking-wider">Close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <ShoppingBag size={64} className="text-gray-100" />
                  <p className="text-gray-500 font-medium">Your bag is currently empty.</p>
                  <button
                    onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                    className="text-black font-bold border-b-2 border-black pb-1 hover:text-[#7B9E87] hover:border-[#7B9E87] transition-all"
                  >
                    Return to Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-50 last:border-0 relative group">
                      <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        {(() => {
                          try {
                            const images = typeof item.images === 'string' ? JSON.parse(item.images) : item.images;
                            const imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : (item.image || item.image_url);

                            let finalUrl = imageUrl;
                            if (finalUrl && !finalUrl.startsWith('http')) {
                              const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                              finalUrl = `${baseUrl}${finalUrl.startsWith('/') ? '' : '/'}${finalUrl}`;
                            }

                            return finalUrl ? (
                              <img src={finalUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-100">✨</div>
                            );
                          } catch (e) {
                            return <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-100">✨</div>;
                          }
                        })()}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start pr-6">
                          <h4 className="text-sm font-bold text-gray-800 leading-snug">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute top-0 right-0 p-1 text-gray-300 hover:text-black transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-rose-500 font-black uppercase tracking-[0.1em] mt-1">
                          DELIVERY: {getDeliveryRange()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="text-[13px] text-gray-400 font-medium">{item.quantity} ×</span>
                           <span className="text-[14px] font-bold text-gray-900">{formatCurrency(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Subtotal:</span>
                  <span className="text-lg font-black text-gray-900">{formatCurrency(subtotal)}</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Link
                    to="/cart" // Assuming there's a full cart page
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-gray-50 text-gray-900 text-[11px] font-black uppercase tracking-[0.2em] text-center hover:bg-gray-100 transition-all"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] text-center hover:bg-[#2D3A2E] transition-all shadow-xl"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
