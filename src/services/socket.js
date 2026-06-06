import { io } from 'socket.io-client';
import { STORAGE_KEYS } from '../utils/constants';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return;

    const user = JSON.parse(userStr);
    const token = user.token || user.access_token;
    if (!token) return;

    if (this.socket && this.socket.connected) return this.socket;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('📡 Connected to Sanctuary Socket');
      this.socket.emit('join_room', { userId: user.id, role: user.role });
    });

    return this.socket;
  }

  joinConversation(conversationId) {
    if (this.socket) {
      this.socket.emit('join_room', { conversationId });
    }
  }

  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

const socketService = new SocketService();
export default socketService;
