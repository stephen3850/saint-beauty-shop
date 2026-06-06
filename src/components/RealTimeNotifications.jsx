import { useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const RealTimeNotifications = () => {
  const { socket } = useSocket();
  const { user, role } = useAuth();

  useEffect(() => {
    const handleAdminNotification = (notif) => {
      if (role !== 'admin') return;

      toast(notif.message, {
        duration: 5000,
        icon: '🛍️',
        style: {
          background: '#fff',
          color: '#333',
          border: '2px solid #f59e0b'
        }
      });

      // Play subtle sound
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.volume = 0.2;
        audio.play();
      } catch (e) {}
    };

    const handleOrderStatusChange = (data) => {
      if (role === 'admin') return;
      if (data.customerId && data.customerId !== user?.id) return;

      toast(`Order #${data.orderId} updated to: ${data.status.toUpperCase()} ✨`, {
        duration: 5000,
        icon: '📦',
        style: {
          background: '#ec4899',
          color: '#fff',
        }
      });
    };

    if (!socket) return;

    socket.on('admin_notification', handleAdminNotification);
    socket.on('order_status_changed', handleOrderStatusChange);

    return () => {
      socket.off('admin_notification', handleAdminNotification);
      socket.off('order_status_changed', handleOrderStatusChange);
    };
  }, [socket, role, user]);

  return null;
};

export default RealTimeNotifications;
