import React from 'react';

const ChatMessage = ({ message, isOwn }) => {
  const isAdmin = message.senderRole === 'admin';
  const time = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} space-y-2 group`}>
      {/* Meta Info */}
      <div className="flex items-center gap-3 px-1">
        {!isOwn && (
          <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">
            {message.senderName || (isAdmin ? 'Admin' : 'Customer')}
          </span>
        )}
        <span className="text-[8px] text-slate-500 font-bold uppercase">{time}</span>
      </div>

      {/* Bubble */}
      <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm transition-all shadow-lg ${
        isOwn
          ? 'bg-blue-600 text-white rounded-tr-none'
          : 'bg-slate-800 text-slate-100 border border-white/5 rounded-tl-none'
      }`}>
        {message.text && <p className="leading-relaxed font-light whitespace-pre-wrap">{message.text}</p>}

        {message.file_url && (
          <div className={`mt-2 rounded-lg overflow-hidden border border-white/10 ${message.text ? 'pt-2' : ''}`}>
            <img
              src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${message.file_url}`}
              alt="Attachment"
              className="max-w-full h-auto object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${message.file_url}`, '_blank')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
