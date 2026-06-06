import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import Logo from './common/Logo';

const Navbar = () => {
  const { isAuthenticated, role } = useAuth();
  const { setIsCartOpen, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeDropdowns = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const dropdowns = [
    {
      name: 'Hot Deals 🔥',
      items: ["Clearance", "Deals of the Month", "Bundles & Kits", "Travel Size"],
      param: 'category'
    },
    {
      name: 'Top Brands',
      items: [
        "Nivea", "Garnier", "Unilever", "Maybelline New York",
        "Uncover Skincare", "SuzieBeauty", "Huddah Cosmetics",
        "Keyara Botanicals", "Sheth Naturals", "Bu.Ke",
        "Marini Naturals", "Mikalla", "Mosara"
      ],
      param: 'brand'
    },
    {
      name: 'Hair',
      items: ["Brushes", "Combs", "Shampoos", "Conditioners", "Braiding Hair", "Hair Color", "Hair Growth", "Temporary Hair Color", "Styling Tools", "Perms", "Treatments"],
      param: 'category'
    },
    {
      name: 'Nails',
      items: ["Lacquer Polish", "UV/LED Gels", "Acrylic & Dip", "Tools & Supplies", "Nail Treatments", "Nail Kits"],
      param: 'category'
    },
    {
      name: 'Skincare',
      items: ["Body Wash", "Bath Accessories", "Lotions", "Foot Care", "Body Shaving", "Waxing", "Tanning", "Cosmetics", "Skin Tools & Implements", "Fashion Accessories"],
      param: 'category'
    },
    {
      name: 'Salon Supplies',
      items: ["Capes & Aprons", "Hair Coloring Supplies", "Gloves", "Spray & Applicator Bottles", "Towels", "Mirrors", "Pins & Clips", "Storage", "Mannequin Heads", "Equipment", "Disinfectants & Cleaners", "Personal Protective Equipment"],
      param: 'category'
    },
    {
      name: 'Barber',
      items: ["Men's Shaving", "Razors", "Clippers", "Barber Combs & Brushes", "Equipment", "Disinfectants & Cleaners", "Beard", "Men's Care"],
      param: 'category'
    },
    {
      name: 'Services',
      items: ["Consultations", "Education", "Equipment Repair", "Mobile Massage", "Rewards Program", "Affiliate Program"],
      path: '/services'
    }
  ];

  return (
    <header className="w-full z-50">
      {/* 1. Top Announcement Bar - Pink */}
      <div className="bg-[#FA8CA3] text-white text-center py-2 px-4 text-[11px] font-bold tracking-tight">
        Free shipping on domestic Kenyan orders over KSh 5,000. <Link to="/shipping" className="underline">Exclusions apply.</Link>
      </div>

      {/* 2. Main Header Row - White */}
      <div className="bg-white border-b border-gray-100 py-4 md:py-6 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4 md:grid md:grid-cols-3">

          {/* Left: Search Bar (Desktop) / Menu (Mobile) */}
          <div className="flex-1 md:flex items-center">
            <div className="hidden md:block w-full">
              <form onSubmit={handleSearch} className="relative max-w-xs group">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-200 rounded-md py-2 px-4 pr-10 text-sm focus:outline-none focus:border-[#FA8CA3] transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FA8CA3]">
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-gray-700 p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center flex-shrink-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Right: Account & Cart */}
          <div className="flex-1 flex items-center justify-end gap-4 md:gap-8">
            <Link to={isAuthenticated ? (role === 'admin' ? '/dashboard/admin' : '/dashboard') : '/login'} className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#FA8CA3] transition-all">
              <User size={20} strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Account</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-[#FA8CA3] transition-all relative group p-1"
            >
              <div className="relative">
                <ShoppingBag size={22} md:size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FA8CA3] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Cart</span>
            </button>
          </div>
        </div>
      </div>


      {/* 3. Navigation Links Row - White/Gray */}
      <div className="bg-white border-b border-gray-100 py-3 hidden md:block" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-10 whitespace-nowrap">
          {dropdowns.map((dropdown) => (
            <div key={dropdown.name} className="relative py-2">
              <button
                onClick={() => toggleDropdown(dropdown.name)}
                className={`text-[10px] font-bold uppercase tracking-widest hover:text-[#FA8CA3] transition-all flex items-center gap-1 h-full border-b-2 pb-1 ${
                  activeDropdown === dropdown.name ? 'text-[#FA8CA3] border-gray-900' : 'text-gray-800 border-transparent'
                }`}
              >
                {dropdown.name} <ChevronDown size={8} className={`transition-transform duration-200 ${activeDropdown === dropdown.name ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === dropdown.name && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-2xl rounded-sm py-4 z-[100] grid grid-cols-1 gap-1 mt-0 animate-in fade-in slide-in-from-top-1 duration-200">
                  {dropdown.items.map((item) => (
                    <Link
                      key={item}
                      to={dropdown.path ? dropdown.path : `/shop?${dropdown.param}=${encodeURIComponent(item)}`}
                      onClick={closeDropdowns}
                      className="px-6 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#FA8CA3] hover:bg-gray-50 transition-all block"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/register" className="text-[10px] font-bold text-gray-800 uppercase tracking-widest hover:text-[#FA8CA3] transition-all hover:border-b-2 hover:border-gray-900 pb-1">Beauty Pro Sign-Up</Link>
          <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-[10px] font-bold text-gray-800 uppercase tracking-widest hover:text-[#FA8CA3] transition-all hover:border-b-2 hover:border-gray-900 pb-1">Account</Link>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-8 flex flex-col items-start gap-6 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl max-h-[80vh] overflow-y-auto custom-scrollbar">
           <form onSubmit={handleSearch} className="w-full relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 rounded-md py-3 px-4 pr-10 text-sm focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          </form>

          <Link to="/shop?category=On Sale" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-800">Hot Deals 🔥</Link>

          {/* Mobile Brands Section */}
          <div className="w-full">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Top Brands</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                "Nivea", "Garnier", "Unilever", "Maybelline New York",
                "Uncover Skincare", "SuzieBeauty", "Huddah Cosmetics",
                "Keyara Botanicals", "Sheth Naturals", "Bu.Ke",
                "Marini Naturals", "Mikalla", "Mosara"
              ].map(brand => (
                <Link key={brand} to={`/shop?brand=${brand}`} onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-bold text-gray-500 uppercase">{brand}</Link>
              ))}
            </div>
          </div>

          {/* Mobile Hair Section */}
          <div className="w-full">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Hair Rituals</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                "Brushes", "Combs", "Shampoos", "Conditioners", "Braiding Hair",
                "Hair Color", "Hair Growth", "Temporary Hair Color",
                "Styling Tools", "Perms", "Treatments"
              ].map(item => (
                <Link key={item} to={`/shop?category=${item}`} onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-bold text-gray-500 uppercase">{item}</Link>
              ))}
            </div>
          </div>

          {/* Mobile Services Section */}
          <div className="w-full">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Extra Services</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                "Consultations", "Education", "Equipment Repair",
                "Mobile Massage", "Rewards Program", "Affiliate Program"
              ].map(item => (
                <Link key={item} to="/services" onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-bold text-gray-500 uppercase">{item}</Link>
              ))}
            </div>
          </div>

          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-800">Shop All</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-800">Our Story</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-800">Contact</Link>
          <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-black text-[#FA8CA3] uppercase tracking-widest border border-[#FA8CA3] w-full text-center py-3 rounded-sm mt-4">Beauty Pro Sign-Up</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
