import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-pink-900/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`bg-white rounded-[3rem] w-full ${sizeClasses[size]} relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200`}>
        <div className="p-8 border-b border-pink-50 flex items-center justify-between">
          <h2 className="text-3xl font-black italic">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-pink-50 rounded-full transition-colors text-gray-400">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
