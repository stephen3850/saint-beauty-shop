import api from './api';

export const paymentService = {
  initiateStkPush: async (orderId, phone) => {
    const { data } = await api.post('/api/payments/stk-push', { order_id: orderId, phone });
    return data;
  },

  processCardPayment: async (orderId, token) => {
    const { data } = await api.post('/api/payments/card-pay', { order_id: orderId, token });
    return data;
  },

  createPaymentIntent: async (orderId) => {
    const { data } = await api.post('/orders/create-payment-intent', { orderId });
    return data;
  },

  processMockPayment: async (paymentData) => {
    const { data } = await api.post('/payments/mock', paymentData);
    return data;
  },

  getPaymentMethods: async () => {
    const { data } = await api.get('/payments/methods');
    return data.data;
  }
};
