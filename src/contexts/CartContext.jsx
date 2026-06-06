import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { STORAGE_KEYS, DELIVERY_FEE } from '../utils/constants';
import { orderService } from '../services/orderService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    // Standardize ID
    const productId = product.id || product._id;

    if (product.stock !== undefined && product.stock <= 0) {
      toast.error('Sorry, this item is out of stock! 🌹');
      return false;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => (item.id || item._id) === productId);

      if (existingItem) {
        if (product.stock !== undefined && existingItem.quantity + quantity > product.stock) {
          // If already at max, don't show error, just let it proceed so component can navigate
          return prevItems;
        }

        return prevItems.map(item =>
          (item.id || item._id) === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      toast.success(`${product.name} added to bag! ✨`);
      return [...prevItems, { ...product, id: productId, quantity }];
    });
    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.error('Item removed from bag');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(productId);

    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === productId);
      if (item && item.stock !== undefined && newQuantity > item.stock) {
        toast.error(`Maximum available stock reached (${item.stock})`);
        return prevItems;
      }
      return prevItems.map(i =>
        i.id === productId ? { ...i, quantity: newQuantity } : i
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  const checkout = async (shippingAddress, paymentMethod) => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod
      };

      const order = await orderService.createOrder(orderData);
      if (order) {
        clearCart();
        toast.success('Order placed successfully! 🛍️');
        return order;
      }
    } catch (error) {
      // Error handled by interceptor or custom logic here
      throw error;
    } finally {
      setIsCheckingOut(false);
    }
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const getCartSummary = () => {
    return {
      subtotal: cartTotal,
      itemCount: cartCount,
      deliveryFee: cartCount > 0 ? DELIVERY_FEE : 0,
      grandTotal: cartCount > 0 ? cartTotal + DELIVERY_FEE : 0
    };
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      isCheckingOut,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      checkout,
      cartTotal,
      cartCount,
      getCartSummary
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
