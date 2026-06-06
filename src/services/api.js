import axios from 'axios';
import toast from 'react-hot-toast';

// 1. BACKEND URL CONFIGURATION
// In development, this usually points to http://localhost:5000
const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

// 2. REQUEST INTERCEPTOR (Adds Token)
api.interceptors.request.use(
  (config) => {
    console.log(`📡 Sending ${config.method.toUpperCase()} to ${config.url}`);
    const userStr = localStorage.getItem('hb_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const token = user.token || user.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. RESPONSE INTERCEPTOR (Handles Errors)
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Received from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error);

    if (!error.response) {
      // Network Error (Backend down or CORS)
      toast.error('Cannot connect to the server. Please ensure the backend is running!', { id: 'backend-unreachable' });
      console.error('CRITICAL: Backend is unreachable. Is it running on port 5000?');
    } else {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('hb_user');
        console.warn('Session expired or invalid token');
      }
    }
    return Promise.reject(error);
  }
);

// 4. TEST CONNECTION FUNCTION (Call from console)
window.testSaintAPI = async () => {
  console.log('🧪 Testing connection to backend...');
  try {
    const res = await axios.get(`${API_BASE_URL}/health`);
    console.log('💚 SUCCESS! Backend is alive:', res.data);
    return true;
  } catch (err) {
    console.error('💔 FAILURE! Backend is not responding.');
    console.log('Check if you ran: uvicorn main:app --reload --port 5000');
    return false;
  }
};

export default api;
