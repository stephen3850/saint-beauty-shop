import api from './api';

export const authService = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  forgotPassword: async (email) => {
    const { data } = await api.post('/auth/forgotpassword', { email });
    return data;
  },

  resetPassword: async (token, password) => {
    const { data } = await api.put(`/auth/resetpassword/${token}`, { password });
    return data;
  }
};
