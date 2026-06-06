import api from './api';

export const adminService = {
  // Global dashboard stats (Revenue, Orders, Customers, Conversion)
  getDashboardStats: async (period = 'week') => {
    const { data } = await api.get(`/api/admin/stats?period=${period}`);
    return data.data;
  },

  // Sales chart data
  getSalesData: async (period = 'week') => {
    const { data } = await api.get(`/api/admin/sales?period=${period}`);
    return data.data;
  },

  // Last 10 orders
  getRecentOrders: async () => {
    const { data } = await api.get('/api/admin/recent-orders');
    return data.data;
  },

  // Low stock items
  getInventoryAlerts: async () => {
    const { data } = await api.get('/api/admin/inventory-alerts');
    return data.data;
  },

  // Best selling items
  getTopProducts: async () => {
    const { data } = await api.get('/api/admin/top-products');
    return data.data;
  },

  // Customer management
  getAllCustomers: async () => {
    const { data } = await api.get('/api/admin/users');
    return data.data;
  },

  // Notifications center
  getNotifications: async () => {
    const { data } = await api.get('/api/admin/notifications');
    return data.data;
  }
};
