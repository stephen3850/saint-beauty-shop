import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../contexts/SocketContext';

const useWebSocket = (event, callback) => {
  const { socket, isConnected, sendMessage } = useSocket();
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    if (!socket || !event) return;

    const handler = (data) => {
      setLastMessage(data);
      if (callback) callback(data);
    };

    socket.on(event, handler);
    return () => socket.off(event, handler);
  }, [socket, event, callback]);

  return { isConnected, sendMessage, lastMessage };
};

export default useWebSocket;
