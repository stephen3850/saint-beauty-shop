export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const APP_NAME = "Saint Beauty shop";

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned'
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  MOBILE_MONEY: 'mobile_money',
  CASH_ON_DELIVERY: 'cash_on_delivery'
};

export const DELIVERY_FEE = 5.99;

export const CATEGORIES = ['Skincare', 'Hair', 'Makeup', 'Nails'];

export const STORAGE_KEYS = {
  USER: 'hb_user',
  CART: 'hb_cart',
  WISHLIST: 'hb_wishlist',
  CHAT_HISTORY: 'saint_chat_history',
  RECENTLY_VIEWED: 'hb_recently_viewed'
};
