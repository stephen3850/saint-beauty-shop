import React, { useState, useEffect, useRef } from 'react';
import { productService } from '../../services/productService';
import {
  Package, Plus, Pencil, Trash2, X, Loader2,
  ChevronRight, Search, Image as ImageIcon,
  DollarSign, Box, Layers, MoreVertical, Eye,
  Upload, CheckCircle, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/admin-dashboard.css';
import AdminHeaderTools from '../../components/admin/AdminHeaderTools';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Cleanser',
    shop_name: '',
    stock: '',
    description: '',
    images: []
  });

  const categories = [
    { name: 'Hot Deals', color: '#EF4444', sub: ["Clearance", "Deals of the Month", "Bundles & Kits", "Travel Size"] },
    { name: 'Hair', color: '#059669', sub: ["Brushes", "Combs", "Shampoos", "Conditioners", "Braiding Hair", "Hair Color", "Hair Growth", "Temporary Hair Color", "Styling Tools", "Perms", "Treatments"] },
    { name: 'Nails', color: '#8B5CF6', sub: ["Lacquer Polish", "UV/LED Gels", "Acrylic & Dip", "Tools & Supplies", "Nail Treatments", "Nail Kits"] },
    { name: 'Skincare', color: '#7B9E87', sub: ["Body Wash", "Bath Accessories", "Lotions", "Foot Care", "Body Shaving", "Waxing", "Tanning", "Cosmetics", "Skin Tools & Implements", "Fashion Accessories"] },
    { name: 'Face Care', color: '#10B981', sub: ['Cleanser', 'Essence', 'Eye Care', 'Mask', 'Moisturizer', 'Serum / Ampoule', 'Spot Treatment', 'Sunscreen', 'Toner'] },
    { name: 'Salon Supplies', color: '#3B82F6', sub: ["Capes & Aprons", "Hair Coloring Supplies", "Gloves", "Spray & Applicator Bottles", "Towels", "Mirrors", "Pins & Clips", "Storage", "Mannequin Heads", "Equipment", "Disinfectants & Cleaners", "Personal Protective Equipment"] },
    { name: 'Barber', color: '#F59E0B', sub: ["Men's Shaving", "Razors", "Clippers", "Barber Combs & Brushes", "Equipment", "Disinfectants & Cleaners", "Beard", "Men's Care"] },
    { name: 'Makeup', color: '#F43F5E' },
    { name: 'Perfume', color: '#7C3AED', sub: ['For Men', 'For Women', 'Unisex'] },
  ];

  // Flatten for simple selection
  const flatCategories = categories.reduce((acc, cat) => {
    acc.push(cat.name);
    if (cat.sub) acc.push(...cat.sub);
    return acc;
  }, []);

  const getCategoryColor = (catName) => {
    const found = categories.find(c => c.name === catName || c.sub?.includes(catName));
    return found ? found.color : '#64748b';
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({ limit: 100 }); // Increase limit to show all rituals
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products');
      toast.error('Could not load products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category || 'Cleanser',
        shop_name: product.shop_name || '',
        stock: product.stock,
        description: product.description || '',
        images: []
      });

      let existingImages = [];
      if (product.images) {
        try {
          existingImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
        } catch (e) {
          existingImages = [product.images];
        }
      }
      setPreviewImages(Array.isArray(existingImages) ? existingImages : []);
      setIsEditing(true);
    } else {
      setSelectedProduct(null);
      setFormData({ name: '', price: '', category: 'Cleanser', shop_name: '', stock: '', description: '', images: [] });
      setPreviewImages([]);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removePreviewImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== (index - (previewImages.length - prev.images.length)))
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading(isEditing ? 'Updating product...' : 'Launching product...');

    try {
      if (isEditing) {
        await productService.updateProduct(selectedProduct.id, formData);
        toast.success('Updated successfully! ✨', { id: loadingToast });
      } else {
        await productService.addProduct(formData);
        toast.success('Launched successfully! 📦', { id: loadingToast });
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error('Operation failed.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This ritual will be removed permanently.')) {
      try {
        await productService.deleteProduct(id);
        toast.success('Removed successfully');
        fetchProducts();
      } catch (err) {
        toast.error('Deletion failed');
      }
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const parentCategory = categories.find(c => c.name === selectedCategory);
    const matchesCategory = selectedCategory === 'All' ||
                           p.category === selectedCategory ||
                           (parentCategory?.sub && parentCategory.sub.includes(p.category));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">Product Management</h1>
            <p className="text-slate-400 text-xs">Curate and refine your boutique offerings.</p>
          </div>
          <AdminHeaderTools />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full xl:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95"
        >
          <Plus size={18} /> Add Product
        </button>
      </header>

      {/* Control Bar */}
      <div className="glass-card vivid-card-purple p-3 flex flex-col xl:flex-row justify-between items-center gap-4">
        <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5 gap-1 overflow-x-auto no-scrollbar w-full xl:w-auto">
          {['All', ...categories.map(c => c.name)].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              style={selectedCategory === cat ? { backgroundColor: getCategoryColor(cat) } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full xl:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search catalog..."
            className="admin-search-input w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product Table Area */}
      <div className="glass-card vivid-card-blue p-0 overflow-hidden">
        <div className="admin-table-wrapper custom-scrollbar">
          <table className="admin-table-container">
            <thead>
              <tr>
                <th className="px-4 py-3">Item Details</th>
                <th>Category</th>
                <th>Price</th>
                <th>Inventory</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <Loader2 className="animate-spin text-blue-500 mx-auto mb-3" size={32} />
                    <p className="text-slate-500 text-xs italic">Syncing catalog...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-slate-500 text-xs italic">No products found.</td>
                </tr>
              ) : filteredProducts.map(product => (
                <tr key={product.id} className="admin-table-row group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                        {product.images?.[0] || product.image_url ? (
                          <img src={product.images?.[0] || product.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={18} className="text-slate-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-white truncate">{product.name}</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">
                          {product.shop_name || 'No Brand'} • ID: {product.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="border px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider"
                      style={{
                        backgroundColor: `${getCategoryColor(product.category)}15`,
                        color: getCategoryColor(product.category),
                        borderColor: `${getCategoryColor(product.category)}30`
                      }}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td><span className="font-bold text-sm text-white">${Number(product.price).toFixed(2)}</span></td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${product.stock < 10 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <span className={`text-[10px] font-bold ${product.stock < 10 ? 'text-amber-500' : 'text-slate-400'}`}>
                        {product.stock} Units
                      </span>
                    </div>
                  </td>
                  <td className="text-right pr-6">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => handleOpenModal(product)} className="p-1.5 bg-slate-800 border border-white/5 rounded-md text-slate-400 hover:text-blue-400 transition-all">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 bg-slate-800 border border-white/5 rounded-md text-slate-400 hover:text-rose-500 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Fully Responsive */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 lg:p-10 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#12192D] border border-white/10 rounded-[2rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 lg:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
              <h2 className="text-xl lg:text-2xl font-bold">{isEditing ? 'Update Product' : 'Add Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 lg:p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Media Upload</label>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removePreviewImage(index)} className="absolute top-1 right-1 p-1 bg-rose-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => fileInputRef.current.click()} className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl hover:border-blue-500/50 hover:bg-white/5 transition-all">
                      <Upload size={20} className="text-slate-500 mb-1" />
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Upload</span>
                    </button>
                  </div>
                  <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
                </div>

                <div className="md:col-span-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Title</label>
                  <input type="text" required className="admin-search-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="md:col-span-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Brand (e.g. COSRX)</label>
                  <input type="text" className="admin-search-input" value={formData.shop_name} onChange={e => setFormData({...formData, shop_name: e.target.value})} />
                </div>

                <div className="md:col-span-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Category Selection</label>
                  <div className="relative">
                    <Layers size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <select
                      required
                      className="admin-search-input appearance-none bg-[#1a2236] pl-10"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="" disabled>Select Category</option>
                      {categories.map(cat => (
                        <optgroup label={cat.name} key={cat.name} className="bg-[#12192D] font-bold text-blue-400">
                          <option value={cat.name} className="text-white font-normal">{cat.name} (Parent)</option>
                          {cat.sub?.map(sub => (
                            <option key={sub} value={sub} className="text-white font-normal">-- {sub}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Price ($)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <input type="number" step="0.01" required className="admin-search-input pl-10" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Stock</label>
                  <div className="relative">
                    <Box size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <input type="number" required className="admin-search-input pl-10" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Description</label>
                  <textarea rows="3" className="admin-search-input resize-none py-3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-4 pt-4 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-800 rounded-xl font-bold uppercase text-[10px] tracking-widest">Discard</button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (isEditing ? 'Save Changes' : 'Launch Ritual')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
