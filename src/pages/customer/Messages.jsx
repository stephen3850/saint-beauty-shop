import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import socketService from '../../services/socket';
import { chatService } from '../../services/chatService';
import ChatMessage from '../../components/chat/ChatMessage';
import FileUpload from '../../components/chat/FileUpload';
import {
  Send,
  Sparkles,
  Loader2,
  MessageSquare,
  ArrowLeft,
  Crown
} from 'lucide-react';
import toast from 'react-hot-toast';

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const scrollRef = useRef(null);

  // 1. Initial Connection & Conversation Loading
  useEffect(() => {
    const initSanctuary = async () => {
      try {
        let conv = await chatService.getMyConversation();

        // AUTO-CREATE: If no channel exists, start one immediately
        if (!conv) {
          console.log("No existing channel. Initializing new sanctuary...");
          conv = await chatService.startConversation();
        }

        if (conv) {
          setConversation(conv);
          socketService.joinConversation(conv.id);
          const history = await chatService.getMessages(conv.id);
          setMessages(history || []);
        }
      } catch (error) {
        console.error('Channel initialization failed:', error);
        toast.error("Failed to connect to Heven Support.");
      } finally {
        setLoading(false);
      }
    };

    if (user) initSanctuary();
  }, [user]);

  // 2. Real-Time Logic (Socket.IO)
  useEffect(() => {
    const socket = socketService.connect();
    if (!socket || !conversation) return;

    const onNewMessage = (msg) => {
      const convId = msg.conversationId || msg.conversation_id;
      if (convId === conversation.id) {
        setMessages(prev => [...prev, msg]);
        setIsAdminTyping(false);
        // Auto-mark as read
        if ((msg.senderRole || msg.sender_role) === 'admin') {
          chatService.markAsRead(msg.id).catch(() => {});
        }
      }
    };

    const onTyping = (data) => {
      const convId = data.conversationId || data.conversation_id;
      if (convId === conversation.id && (data.senderRole || data.sender_role) === 'admin') {
        setIsAdminTyping(data.isTyping);
      }
    };

    socket.on('new_message', onNewMessage);
    socket.on('user_typing', onTyping);

    return () => {
      socket.off('new_message', onNewMessage);
      socket.off('user_typing', onTyping);
    };
  }, [conversation]);

  // 3. Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAdminTyping]);

  // 4. Handlers
  const handleSend = async (e, textOverride = null) => {
    if (e) e.preventDefault();
    const content = textOverride || message;

    if (!content.trim() && !selectedFile) return;
    if (!conversation) {
      toast.error("Still connecting to sanctuary...");
      return;
    }

    setSending(true);
    try {
      // API CALL: Uploads file if present and saves message
      const response = await chatService.sendMessage(conversation.id, content, selectedFile);

      if (response.success) {
        const savedMsg = response.data;

        // Update local UI
        setMessages(prev => [...prev, savedMsg]);

        // Notify socket
        socketService.emit('send_message', {
          ...savedMsg,
          conversationId: conversation.id
        });

        // Reset
        setMessage('');
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Communication failed:", err);
      toast.error("Failed to send message. Please retry.");
    } finally {
      setSending(false);
    }
  };

  const onType = (e) => {
    setMessage(e.target.value);
    if (conversation) {
      socketService.emit('typing', {
        conversationId: conversation.id,
        isTyping: e.target.value.length > 0,
        senderRole: 'customer'
      });
    }
  };

  const quickReplies = [
    { label: "📦 Track Order", text: "Where is my order? I'd like an update." },
    { label: "🔄 Returns", text: "What is your return policy?" },
    { label: "🚚 Shipping", text: "Tell me about shipping to Nairobi." }
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-white">
      <Loader2 className="animate-spin text-[#7B9E87] mb-6" size={48} />
      <p className="text-white/40 italic font-light">Entering the private sanctuary...</p>
    </div>
  );

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-1000 max-w-5xl mx-auto pb-6">

      <div className="flex justify-between items-center px-4">
        <button
          onClick={() => navigate('/dashboard/customer')}
          className="flex items-center gap-2 text-white/30 hover:text-white transition-all group font-bold text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Dashboard
        </button>

        <div className="flex items-center gap-3 bg-white/5 px-5 py-2 rounded-full border border-white/10 shadow-sm">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Curators Online</span>
        </div>
      </div>

      <div className="flex-grow bg-[#0A1928]/60 backdrop-blur-3xl rounded-[3rem] border border-white/10 flex flex-col overflow-hidden shadow-2xl relative">

        {/* Concierge Info Bar */}
        <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-[#7B9E87] to-[#2D3A2E] rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl">
              <Crown size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white italic tracking-tight">Heven Concierge</h2>
              <div className="flex items-center gap-4 mt-1.5">
                <span className="text-[9px] font-black text-[#7B9E87] uppercase tracking-widest bg-[#7B9E87]/10 px-3 py-1 rounded-md border border-[#7B9E87]/20">Avg Wait: 5m</span>
                <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest">Mon-Sat • 9AM-9PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Vault */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-black/10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20">
              <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10">
                <MessageSquare size={48} className="text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-white text-xl italic tracking-tight">The channel is quiet.</p>
                <p className="text-white/60 text-sm font-light">Send your first inquiry to begin a ritual of support.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((msg, i) => (
                <ChatMessage
                  key={msg.id || i}
                  message={{
                    text: msg.content,
                    senderName: msg.sender_name || msg.senderName,
                    senderRole: msg.sender_role || msg.senderRole,
                    timestamp: msg.created_at || msg.createdAt,
                    file_url: msg.file_url
                  }}
                  isOwn={(msg.sender_id || msg.senderId) === user.id}
                />
              ))}
            </div>
          )}

          {isAdminTyping && (
            <div className="flex items-center gap-3 text-[#7B9E87] px-4 animate-pulse">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-[#7B9E87] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-[#7B9E87] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-[#7B9E87] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Concierge is writing...</span>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Sanctuary */}
        <div className="p-8 bg-[#0A1928]/40 border-t border-white/10 space-y-6">

          {/* Quick Reply Scroll */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(null, reply.text)}
                className="whitespace-nowrap px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-bold text-white/50 hover:text-white transition-all shadow-sm flex items-center gap-2"
              >
                {reply.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-5 items-end">
            <div className="flex-grow relative bg-white/5 border border-white/10 rounded-[2rem] flex items-end shadow-inner p-1">
              <FileUpload
                onFileSelect={setSelectedFile}
                onClear={() => setSelectedFile(null)}
                selectedFile={selectedFile}
              />
              <textarea
                placeholder="Type your inquiry..."
                rows="1"
                className="flex-grow bg-transparent border-none py-5 px-3 text-white placeholder-white/20 outline-none resize-none text-sm font-light max-h-32 leading-relaxed"
                value={message}
                onChange={onType}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>

            <button
              type="submit"
              disabled={(!message.trim() && !selectedFile) || sending}
              className="w-16 h-16 bg-[#2A4A7F] text-white rounded-[1.5rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-30 disabled:hover:scale-100 group"
            >
              {sending ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
