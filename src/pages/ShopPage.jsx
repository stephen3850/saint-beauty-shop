import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Search, X, ChevronDown } from 'lucide-react';

const categoriesList = [
  { name: 'Hot Deals', color: '#EF4444', subcategories: ["Clearance", "Deals of the Month", "Bundles & Kits", "Travel Size"] },
  { name: 'Hair', color: '#059669', subcategories: ["Brushes", "Combs", "Shampoos", "Conditioners", "Braiding Hair", "Hair Color", "Hair Growth", "Temporary Hair Color", "Styling Tools", "Perms", "Treatments"] },
  { name: 'Nails', color: '#8B5CF6', subcategories: ["Lacquer Polish", "UV/LED Gels", "Acrylic & Dip", "Tools & Supplies", "Nail Treatments", "Nail Kits"] },
  { name: 'Skincare', color: '#7B9E87', subcategories: ["Body Wash", "Bath Accessories", "Lotions", "Foot Care", "Body Shaving", "Waxing", "Tanning", "Cosmetics", "Skin Tools & Implements", "Fashion Accessories"] },
  { name: 'Face Care', color: '#10B981', subcategories: ['Cleanser', 'Essence', 'Eye Care', 'Mask', 'Moisturizer', 'Serum / Ampoule', 'Spot Treatment', 'Sunscreen', 'Toner'] },
  { name: 'Salon Supplies', color: '#3B82F6', subcategories: ["Capes & Aprons", "Hair Coloring Supplies", "Gloves", "Spray & Applicator Bottles", "Towels", "Mirrors", "Pins & Clips", "Storage", "Mannequin Heads", "Equipment", "Disinfectants & Cleaners", "Personal Protective Equipment"] },
  { name: 'Barber', color: '#F59E0B', subcategories: ["Men's Shaving", "Razors", "Clippers", "Barber Combs & Brushes", "Equipment", "Disinfectants & Cleaners", "Beard", "Men's Care"] },
  { name: 'Makeup', color: '#F43F5E' },
  { name: 'Perfume', color: '#7C3AED', subcategories: ['For Men', 'For Women', 'Unisex'] },
];

const SkeletonCard = () => (
  <div className="space-y-8 animate-pulse">
    <div className="aspect-[3/4] bg-[#D8E2D6]/20 rounded-[2.5rem]" />
    <div className="space-y-4 px-2">
       <div className="h-6 bg-[#D8E2D6]/20 w-3/4 rounded-full" />
       <div className="h-4 bg-[#D8E2D6]/20 w-1/4 rounded-full" />
       <div className="flex justify-between items-center pt-4">
          <div className="h-8 bg-[#D8E2D6]/20 w-1/3 rounded-full" />
          <div className="h-12 w-12 bg-[#D8E2D6]/20 rounded-full" />
       </div>
    </div>
  </div>
);

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [expandedCategories, setExpandedCategories] = useState({});

  const activeCategory = searchParams.get('category') || 'All';
  const activeBrand = searchParams.get('brand');

  // Sync search term with URL
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts({ limit: 100 });
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (cat) => {
    const newParams = new URLSearchParams(searchParams);

    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }

    setSearchParams(newParams);

    // Scroll to products grid on mobile
    if (window.innerWidth < 1024) {
      const productGrid = document.getElementById('product-grid');
      if (productGrid) {
        productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const toggleExpand = (e, catName) => {
    e.stopPropagation();
    setExpandedCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (!product) return false;

      // 1. Search Filter
      const name = product.name || '';
      const matchesSearch = name.toLowerCase().includes((searchTerm || '').toLowerCase());

      // 2. Brand Filter
      const brandVal = product.shop_name || product.brand || '';
      const matchesBrand = activeBrand ? (brandVal.toLowerCase() === activeBrand.toLowerCase()) : true;

      if (!matchesSearch || !matchesBrand) return false;

      // 3. Category Filter
      if (activeCategory === 'All') return true;

      // Find if active category is a parent
      const parentCat = categoriesList.find(c => c.name === activeCategory);

      if (parentCat) {
        // If it's a parent, show product if it matches parent name OR any of its subcategories
        return product.category === activeCategory || (parentCat.subcategories || []).includes(product.category);
      } else {
        // If it's a subcategory (or just some other category), show only exact matches
        return product.category === activeCategory;
      }
    });
  }, [products, searchTerm, activeCategory, activeBrand]);

  const isParentActive = (cat) => {
    return activeCategory === cat.name || (cat.subcategories || []).includes(activeCategory);
  };

  useEffect(() => {
    // Automatically expand the parent category if a subcategory is active
    const activeParent = categoriesList.find(c => (c.subcategories || []).includes(activeCategory));
    if (activeParent) {
      setExpandedCategories(prev => ({ ...prev, [activeParent.name]: true }));
    }
  }, [activeCategory]);

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-48 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="flex items-center flex-wrap gap-1 text-[8px] font-black text-[#888888] uppercase tracking-[0.1em] mb-4">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`hover:text-black transition-colors ${activeCategory === 'All' ? 'text-black font-black' : ''}`}
                >
                  Shop
                </button>
              </div>

              {(activeCategory !== 'All' || activeBrand || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchParams({});
                    setSearchTerm('');
                  }}
                  className="text-[9px] font-bold text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors flex items-center gap-1 mb-4"
                >
                  <X size={10} /> Clear Filters
                </button>
              )}

              <nav className="flex flex-col space-y-1">
                {categoriesList.map((cat) => (
                  <div key={cat.name} className="group flex flex-col">
                    <div className="flex items-center justify-between w-full py-1">
                      <button
                        onClick={() => handleCategoryChange(cat.name)}
                        className={`text-[11px] transition-all duration-300 text-left flex items-center gap-2.5 ${
                          isParentActive(cat)
                            ? 'font-bold scale-105'
                            : 'text-gray-500 hover:text-black'
                        }`}
                        style={{ color: isParentActive(cat) ? cat.color : undefined }}
                      >
                        <span
                          className="w-1 h-1 rounded-full transition-all duration-300 group-hover:scale-150"
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.name}
                      </button>
                      {cat.subcategories && (
                        <button
                          onClick={(e) => toggleExpand(e, cat.name)}
                          className={`p-0.5 rounded-full hover:bg-gray-100 transition-all ${expandedCategories[cat.name] ? 'rotate-180' : ''}`}
                        >
                          <ChevronDown size={10} className="text-gray-400 group-hover:text-black transition-colors" />
                        </button>
                      )}
                    </div>

                    {cat.subcategories && expandedCategories[cat.name] && (
                      <div className="flex flex-col ml-6 mt-1 mb-2 space-y-1.5 border-l border-gray-100 pl-3">
                        {cat.subcategories.map(sub => (
                          <button
                            key={sub}
                            onClick={() => handleCategoryChange(sub)}
                            className={`text-[10px] text-left transition-colors ${
                              activeCategory === sub ? 'text-black font-bold' : 'text-gray-400 hover:text-black'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1" id="product-grid">
            <div className="relative w-full group mb-10 max-w-md mx-auto lg:mx-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={14} />
              <input
                type="text"
                placeholder="Search rituals..."
                className="w-full bg-gray-50/50 border border-gray-100 rounded-full py-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:bg-white transition-all text-xs text-gray-800 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product._id || product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32 bg-gray-50/50 border border-dashed border-gray-200 rounded-[2rem]">
                    <p className="text-2xl text-gray-800 italic mb-4">No rituals found ✨</p>
                    <p className="text-gray-500 text-sm font-light italic">Try another category or search term.</p>
                    <button
                      onClick={() => {handleCategoryChange('All'); setSearchTerm('');}}
                      className="mt-8 text-pink-500 font-bold uppercase tracking-widest text-[10px] border-b border-pink-500 pb-0.5 hover:text-black hover:border-black transition-all"
                    >
                      Return to all rituals
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
