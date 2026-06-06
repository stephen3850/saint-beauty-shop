import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import socketService from '../services/socket';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.token) {
      const s = socketService.connect();
      if (!s) return;

      setSocket(s);

      s.on('connect', () => setIsConnected(true));
      s.on('disconnect', () => setIsConnected(false));

      // Global listeners
      s.on('new_message', (msg) => {
        // Notification for new message if chat not open or for different user
        if (window.location.pathname !== '/chat') {
           toast(`New message from ${msg.senderName}`, { icon: '💬' });
        }
      });

      s.on('order_status_update', (data) => {
        toast.success(`Order #${data.orderId} status updated to ${data.status}!`, {
          icon: '📦',
          duration: 5000
        });
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [isAuthenticated, user?.token]);

  const sendMessage = useCallback((conversationId, content) => {
    if (socket && isConnected) {
      socket.emit('send_message', { conversationId, content });
      return true;
    }
    return false;
  }, [socket, isConnected]);

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      sendMessage
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
