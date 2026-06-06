import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-primary-light pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-2xl font-serif font-bold text-accent mb-6 block">
            Saint <span className="text-primary">Beauty Shop</span>
          </Link>
          <p className="text-gray-600 mb-6">
            Discover your natural glow with our premium collection of ethically sourced beauty products.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-primary"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-primary"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-primary"><Twitter size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Shop</h4>
          <ul className="space-y-3 text-gray-600">
            <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/shop?cat=skincare" className="hover:text-primary">Skincare</Link></li>
            <li><Link to="/shop?cat=makeup" className="hover:text-primary">Makeup</Link></li>
            <li><Link to="/shop?cat=body" className="hover:text-primary">Body Care</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Customer Service</h4>
          <ul className="space-y-3 text-gray-600">
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-primary">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-primary">Returns & Exchanges</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Newsletter</h4>
          <p className="text-gray-600 mb-4">Join our community for exclusive offers and beauty tips.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-primary-light border-none rounded-l-full px-4 py-2 w-full focus:ring-1 focus:ring-primary outline-none"
            />
            <button className="bg-primary text-white rounded-r-full px-4 py-2 hover:bg-primary-dark transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-100 mt-16 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Saint Beauty Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
