import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-left">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold font-serif">Your Cart ({cart.length})</h2>
          <button onClick={() => setIsCartOpen(false)} className="hover:text-primary"><X /></button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-6">Your cart is empty</p>
              <button
                onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                className="btn-primary"
              >
                Go Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-primary font-bold">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-primary"
                      ><Minus size={16} /></button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-primary"
                      ><Plus size={16} /></button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    ><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-primary-light/30">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-2xl font-bold text-accent">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="w-full btn-primary py-4 text-lg"
              onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
