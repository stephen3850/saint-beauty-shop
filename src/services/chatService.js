import api from './api';

export const chatService = {
  getMyConversation: async () => {
    try {
      const { data } = await api.get('/api/chat/conversations/my');
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  },

  startConversation: async () => {
    const { data } = await api.post('/api/chat/conversations/start');
    return data;
  },

  getMessages: async (conversationId) => {
    const { data } = await api.get(`/api/chat/messages/${conversationId}`);
    return data;
  },

  sendMessage: async (conversationId, content, file = null) => {
    const formData = new FormData();
    formData.append('conversation_id', conversationId);
    if (content) formData.append('content', content);
    if (file) formData.append('file', file);

    const { data } = await api.post('/api/chat/messages/send', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  markAsRead: async (messageId) => {
    const { data } = await api.put(`/api/chat/messages/${messageId}/read`);
    return data;
  }
};
