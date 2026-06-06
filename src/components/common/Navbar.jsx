import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold text-accent">
          Saint <span className="text-primary">Beauty Shop</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          {user && (
            <Link to={isAdmin ? "/admin" : "/dashboard"} className="hover:text-primary transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button className="hover:text-primary transition-colors">
            <Search size={22} />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:text-primary transition-colors relative"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="relative group">
            <button className="hover:text-primary transition-colors">
              <User size={22} />
            </button>
            {/* Dropdown would go here */}
            {user ? (
               <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b text-sm font-semibold">{user.name}</div>
                  <Link to={isAdmin ? "/admin" : "/dashboard"} className="block px-4 py-2 hover:bg-primary-light">Dashboard</Link>
                  <button onClick={logout} className="w-full text-left block px-4 py-2 hover:bg-primary-light text-red-500">Logout</button>
               </div>
            ) : (
               <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                  <Link to="/login" className="block px-4 py-2 hover:bg-primary-light">Login</Link>
               </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t mt-4 flex flex-col space-y-3 font-medium">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          {user && <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
