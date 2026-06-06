import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    // orderData: { items, shippingAddress, paymentMethod }
    const { data } = await api.post('/api/orders', orderData);
    return data.data;
  },

  getOrders: async () => {
    const { data } = await api.get('/api/orders/myorders');
    return data.data;
  },

  getAllOrders: async () => {
    const { data } = await api.get('/api/admin/orders');
    return data.data;
  },

  getOrderById: async (id) => {
    const { data } = await api.get(`/api/orders/${id}`);
    return data.data;
  },

  trackOrder: async (orderId) => {
    const { data } = await api.get(`/api/orders/track/${orderId}`);
    return data.data;
  },

  updateOrderStatus: async (id, status) => {
    const { data } = await api.put(`/api/orders/${id}/status`, { status });
    return data.data;
  },

  cancelOrder: async (id) => {
    const { data } = await api.put(`/api/orders/${id}/cancel`);
    return data.success;
  },

  getStats: async () => {
    const { data } = await api.get('/api/admin/stats');
    return data.data;
  }
};
