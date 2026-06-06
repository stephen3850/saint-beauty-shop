import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageUploadPreview = ({ onImageSelect, currentImage, label = "Product Image" }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith('image/')) {
      return toast.error('Please select an image file');
    }
    if (file.size > 2 * 1024 * 1024) {
      return toast.error('File size must be less than 2MB');
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onImageSelect(file);
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
      <div
        onClick={() => fileInputRef.current.click()}
        className={`relative h-48 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
          preview ? 'border-pink-200 bg-white' : 'border-pink-100 bg-pink-50/30 hover:bg-pink-50'
        }`}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-300 mx-auto shadow-sm">
              <Upload size={24} />
            </div>
            <p className="text-sm text-gray-400 font-bold">Click to upload image</p>
            <p className="text-[10px] text-gray-300">Max 2MB (PNG, JPG)</p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
