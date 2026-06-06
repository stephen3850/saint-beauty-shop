import { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  Package,
  RotateCcw,
  HelpCircle,
  Clock,
  Paperclip,
  Check,
  CheckCheck,
  Crown
} from 'lucide-react';
import socketService from '../../services/socket';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import ChatMessage from './ChatMessage';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTypingAdmin, setIsTypingAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const scrollRef = useRef(null);

  const initChat = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const { data: convs } = await api.get('/api/chat/conversations');
      let currentConv = convs.data[0];

      if (currentConv) {
        setConversation(currentConv);
        const { data: msgs } = await api.get(`/api/chat/messages/${currentConv.id}`);
        setMessages(msgs.data);
      }
    } catch (error) {
      console.error('Failed to init chat', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !conversation && isAuthenticated) {
      initChat();
    }
  }, [isOpen, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = socketService.connect();
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (conversation && msg.conversationId === conversation.id) {
        setMessages(prev => [...prev, msg]);
        if (!isOpen) setUnreadCount(prev => prev + 1);
        setIsTypingAdmin(false);
      }
    };

    const handleTyping = (data) => {
      if (conversation && data.conversationId === conversation.id && data.senderRole === 'admin') {
        setIsTypingAdmin(data.isTyping);
      }
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleTyping);
    };
  }, [conversation, isOpen, isAuthenticated]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [isOpen, messages]);

  const handleSend = (e, textOverride = null) => {
    if (e) e.preventDefault();
    const content = textOverride || message;
    if (!content.trim() || !conversation) return;

    socketService.emit('send_message', {
      conversationId: conversation.id,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content: content
    });

    setMessage('');
  };

  const quickReplies = [
    { label: '📦 Where is my order?', text: 'Where is my order?' },
    { label: '🔄 How to return?', text: 'How do I return a product?' },
    { label: '💳 Payment methods', text: 'What payment methods do you accept?' },
    { label: '🚚 Shipping info', text: 'Tell me about shipping rates.' }
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {isOpen ? (
        <div className="w-[380px] md:w-[450px] h-[650px] bg-[#1A2A44]/95 backdrop-blur-2xl rounded-[1.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-500">

          {/* Header */}
          <div className="p-6 bg-white/[0.03] border-b border-white/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-white font-bold text-xl flex items-center gap-2">
                  <Sparkles size={18} className="text-[#7B9E87]" /> Customer Support
                </h2>
                <p className="text-white/40 text-xs font-light italic">Direct communication with our curators</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Concierge Card */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7B9E87] to-[#2D3A2E] rounded-xl flex items-center justify-center text-white shadow-lg">
                <Crown size={24} />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-sm italic">Saint Concierge</h3>
                  <div className="bg-[#7B9E87]/20 text-[#7B9E87] text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-[#7B9E87]/30">
                    ⏱️ Avg: 5m
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-1">
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      <span className="text-[10px] text-white/60 font-medium">Admin Online</span>
                   </div>
                   <span className="text-[10px] text-white/30 italic">Mon-Sat, 9AM-9PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/5">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Loader2 className="animate-spin text-[#7B9E87]" />
                <p className="text-white/20 text-xs italic">Opening sanctuary channel...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <MessageCircle size={40} className="text-white" />
                </div>
                <p className="text-white text-sm italic">No messages yet.<br/>Send your first inquiry below.</p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => {
                  const isOwn = msg.senderId === user.id;
                  return (
                    <div key={i} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl text-sm relative group ${
                        isOwn
                        ? 'bg-[#2A4A7F] text-white rounded-tr-none'
                        : 'bg-white/10 text-white backdrop-blur-md border border-white/5 rounded-tl-none'
                      }`}>
                        {msg.content}
                        <div className={`absolute bottom-[-20px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 ${isOwn ? 'right-0' : 'left-0'}`}>
                          <span className="text-[9px] text-white/30 font-medium">
                            {new Date(msg.createdAt || msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isOwn && (
                            msg.is_read ? <CheckCheck size={12} className="text-[#7B9E87]" /> : <Check size={12} className="text-white/20" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {isTypingAdmin && (
                  <div className="flex items-center gap-2 text-[#7B9E87] px-2 animate-pulse">
                     <span className="text-[10px] font-black uppercase italic tracking-widest">Concierge is typing...</span>
                  </div>
                )}
                <div ref={scrollRef} />
              </>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="p-4 bg-white/[0.02] border-t border-white/5">
            {/* Quick Replies */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-4 border-b border-white/5">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(null, reply.text)}
                  className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-bold text-white/60 hover:text-white transition-all shadow-sm"
                >
                  {reply.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="flex gap-3 items-center">
              <div className="flex-grow relative group">
                <input
                  type="text"
                  placeholder="Type your message..."
                  maxLength={500}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder-white/20 outline-none focus:bg-white/10 focus:border-[#7B9E87]/50 transition-all shadow-inner pr-12"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    socketService.emit('typing', { conversationId: conversation?.id, isTyping: true });
                  }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   <button type="button" className="text-white/20 hover:text-white transition-colors">
                      <Paperclip size={18} />
                   </button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  type="submit"
                  disabled={!message.trim() || !conversation}
                  className="w-14 h-14 bg-[#2A4A7F] hover:bg-[#1A3A6F] text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-30 disabled:hover:scale-100"
                >
                  <Send size={20} className="ml-0.5" />
                </button>
                <span className={`text-[8px] font-bold ${message.length > 450 ? 'text-red-400' : 'text-white/10'}`}>
                  {message.length}/500
                </span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-[#2A4A7F] text-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#1A2A44] animate-bounce">
              {unreadCount}
            </span>
          )}
          <MessageCircle size={32} />
        </button>
      )}
    </div>
  );
};

export default LiveChatWidget;
