import React, { useRef, useState, useEffect } from 'react';
import { Paperclip, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const FileUpload = ({ onFileSelect, onClear, selectedFile }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // Clear preview when selectedFile is cleared from parent
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG and GIF are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onFileSelect(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      {preview && (
        <div className="absolute bottom-full left-0 mb-4 p-3 bg-[#1A2A44]/90 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-2 shadow-2xl z-50">
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="pr-2 min-w-0">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Attachment</p>
            <p className="text-xs text-white truncate max-w-[120px] font-medium">{selectedFile?.name}</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="p-1.5 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition-all shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`p-4 rounded-xl transition-all ${preview ? 'text-[#7B9E87] bg-[#7B9E87]/10' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
        title="Attach Beauty Ritual Image"
      >
        <Paperclip size={22} />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
