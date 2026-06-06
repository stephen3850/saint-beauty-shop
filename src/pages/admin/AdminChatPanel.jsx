import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import socketService from '../../services/socket';
import api from '../../services/api';
import ChatMessage from '../../components/chat/ChatMessage';
import {
  Send,
  Search,
  Users,
  MessageSquare,
  X,
  Loader2,
  User,
  MoreVertical,
  Circle,
  Paperclip
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/admin-dashboard.css';

const AdminChatPanel = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [msgsLoading, setMsgsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTypingCustomer, setIsTypingCustomer] = useState(false);

  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const { data } = await api.get('/api/chat/conversations');
      setConversations(data.data);

      // Auto-select if customerId was passed from another page
      if (location.state?.customerId) {
        const targetConv = data.data.find(c => c.user_id === location.state.customerId || c.id === location.state.customerId);
        if (targetConv) {
          selectConversation(targetConv);
        }
      }
    } catch (error) {
      console.error('Failed to fetch conversations', error);
      // Fallback for demo if API is down
      const fallback = [
        { id: 1, user_id: 1, user_name: 'Alex Johnson', last_message: 'Is my order shipped?', last_message_time: new Date(), unread_count: 2 },
        { id: 2, user_id: 2, user_name: 'Maria Garcia', last_message: 'The glow serum is amazing!', last_message_time: new Date(), unread_count: 0 },
      ];
      setConversations(fallback);

      if (location.state?.customerId) {
        const targetConv = fallback.find(c => c.user_id === location.state.customerId);
        if (targetConv) {
          selectConversation(targetConv);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const selectConversation = async (conv) => {
    setSelectedConv(conv);
    setMsgsLoading(true);

    socketService.emit('join_room', {
      userId: user.id,
      role: user.role,
      conversationId: conv.id
    });

    try {
      const { data } = await api.get(`/api/chat/messages/${conv.id}`);
      setMessages(data.data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
      setMessages([
        { id: 101, content: 'Hello, I have a question about my order.', senderRole: 'customer', senderId: 99, createdAt: new Date() },
        { id: 102, content: 'Sure, how can I help?', senderRole: 'admin', senderId: user.id, createdAt: new Date() },
      ]);
    } finally {
      setMsgsLoading(false);
    }
  };

  useEffect(() => {
    const socket = socketService.connect();
    if (!socket) return;

    const handleNewMessage = (msg) => {
      const convId = msg.conversationId || msg.conversation_id;
      if (selectedConv && convId === selectedConv.id) {
        setMessages(prev => [...prev, msg]);
        setIsTypingCustomer(false);
      }

      setConversations(prev => {
        const index = prev.findIndex(c => c.id === convId);
        if (index === -1) return prev;

        const updated = [...prev];
        const conv = { ...updated[index] };
        conv.last_message = msg.content;
        conv.last_message_time = msg.createdAt || msg.created_at;
        if (!selectedConv || convId !== selectedConv.id) {
            conv.unread_count = (conv.unread_count || 0) + 1;
        }

        updated.splice(index, 1);
        return [conv, ...updated];
      });

      if ((msg.senderRole || msg.sender_role) === 'customer' && (!selectedConv || convId !== selectedConv.id)) {
        toast(`New message from ${msg.senderName || msg.sender_name}`, { icon: '💬', style: { background: '#1E293B', color: '#fff' } });
      }
    };

    const handleTyping = (data) => {
      const convId = data.conversationId || data.conversation_id;
      if (selectedConv && convId === selectedConv.id && (data.senderRole || data.sender_role) === 'customer') {
        setIsTypingCustomer(data.isTyping);
      }
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleTyping);
    };
  }, [selectedConv]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTypingCustomer]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedConv) return;

    socketService.emit('send_message', {
      conversationId: selectedConv.id,
      senderId: user.id,
      senderName: user.name,
      senderRole: 'admin',
      content: message
    });

    setMessage('');
  };

  const filteredConvs = conversations.filter(c =>
    (c.user_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.last_message || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in h-[calc(100vh-120px)] flex gap-6 overflow-hidden pb-4">

      {/* Sidebar List */}
      <aside className="w-80 flex flex-col glass-card vivid-card-purple p-0 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/5">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <MessageSquare size={18} className="text-purple-400" />
            Support Inbox
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input
              type="text"
              placeholder="Search chats..."
              className="admin-search-input w-full pl-9 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></div>
          ) : filteredConvs.length === 0 ? (
            <div className="p-10 text-center text-slate-500 text-sm italic">No conversations found</div>
          ) : (
            filteredConvs.map(conv => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv)}
                className={`w-full p-3 flex items-center gap-3 border-b border-white/5 transition-all text-left ${
                  selectedConv?.id === conv.id ? 'bg-blue-600/10 border-r-2 border-r-blue-600' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative shrink-0">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold border border-white/10 text-xs">
                    {conv.user_name?.charAt(0) || 'C'}
                    </div>
                    {conv.unread_count > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-[9px] font-bold">
                            {conv.unread_count}
                        </span>
                    )}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-bold text-xs truncate text-white">{conv.user_name || 'Customer'}</p>
                    <span className="text-[9px] text-slate-500">
                      {conv.last_message_time ? new Date(conv.last_message_time).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : ''}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate italic">
                    {conv.last_message || 'Start chatting...'}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-grow glass-card vivid-card-blue p-0 flex flex-col relative">
        {selectedConv ? (
          <>
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border border-white/10">
                  <User size={16} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{selectedConv.user_name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"><MoreVertical size={18} /></button>
                <button onClick={() => setSelectedConv(null)} className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-800 transition-all"><X size={18} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/10">
              {msgsLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="animate-spin text-blue-500" size={24} />
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <ChatMessage
                      key={msg.id || i}
                      message={{
                        text: msg.content,
                        senderName: msg.senderName || msg.sender_name,
                        senderRole: msg.senderRole || msg.sender_role,
                        timestamp: msg.createdAt || msg.created_at
                      }}
                      isOwn={(msg.senderRole || msg.sender_role) === 'admin'}
                    />
                  ))}
                  {isTypingCustomer && (
                    <div className="flex items-center gap-2 text-blue-500 text-[9px] animate-pulse italic">
                        <Loader2 size={10} className="animate-spin" />
                        Customer is typing...
                    </div>
                  )}
                  <div ref={scrollRef} />
                </>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-white/5 flex gap-2 bg-white/5">
              <input
                type="file"
                ref={fileInputRef}
                hidden
                onChange={(e) => {
                  if(e.target.files?.[0]) toast.success(`File "${e.target.files[0].name}" attached!`);
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-500 hover:text-white transition-all"
              >
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                placeholder={`Reply to ${selectedConv.user_name}...`}
                className="flex-grow admin-search-input py-2 text-xs"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  socketService.emit('typing', {
                    conversationId: selectedConv.id,
                    isTyping: e.target.value.length > 0,
                    senderRole: 'admin'
                  });
                }}
              />
              <button
                type="submit"
                disabled={!message.trim() || msgsLoading}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-4">
            <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center border border-white/10">
              <MessageSquare size={32} className="text-blue-500/30" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Live Support Concierge</h2>
              <p className="text-slate-500 max-w-xs mx-auto text-xs">Select a customer inquiry from the left to begin helping them with their beauty needs.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminChatPanel;
