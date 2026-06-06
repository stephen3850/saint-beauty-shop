import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { STORAGE_KEYS } from '../utils/constants';
import api from '../services/api';
import socketService from '../services/socket';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    socketService.disconnect();
    toast.success('Logged out successfully');
  }, []);

  const checkAuth = useCallback(async () => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (!savedUser) {
      setLoading(false);
      return;
    }

    try {
      const parsedSaved = JSON.parse(savedUser);
      if (!parsedSaved || !parsedSaved.token && !parsedSaved.access_token) {
        setLoading(false);
        return;
      }

      // Get fresh profile data
      const { data } = await api.get('/api/auth/me');
      if (data) {
        const fullUser = {
          ...data,
          token: parsedSaved.token || parsedSaved.access_token
        };
        setUser(fullUser);
        socketService.connect();
      }
    } catch (error) {
      console.error('Auth check failed', error);
      // Only logout if it's a 401
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      // Use URLSearchParams for application/x-www-form-urlencoded (standard for FastAPI OAuth2)
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const { data } = await api.post('/api/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const userData = {
        ...data.user,
        token: data.access_token,
        loginTime: Date.now()
      };

      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      socketService.connect();
      toast.success(`Welcome back, ${userData.name}!`);
      return userData;
    } catch (error) {
      // Error handled by interceptor
      throw error;
    }
  };

  const register = async (name, email, password, extraData = {}) => {
    try {
      const payload = {
        name,
        email,
        password,
        ...extraData
      };
      const { data } = await api.post('/api/auth/register', payload);

      const userData = {
        ...data.user,
        token: data.access_token,
        loginTime: Date.now()
      };

      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      socketService.connect();
      toast.success(`Welcome to Saint Beauty shop, ${name}!`);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const { data } = await api.put('/api/auth/profile', updatedData);
      const newUser = { ...user, ...data };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      toast.success('Profile updated successfully');
    } catch (error) {
      // Error handled by interceptor
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      updateUserProfile,
      isAuthenticated: !!user,
      role: user?.role,
      loading
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
