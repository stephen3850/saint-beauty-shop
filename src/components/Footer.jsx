import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Mail,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Leaf,
  Sparkles,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1A12] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Vibrant Gradient Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 blur-[150px] rounded-full -z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-600/5 blur-[120px] rounded-full -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

          {/* Brand Identity - Vibrant Accent */}
          <div className="lg:col-span-3 space-y-8">
            <Link to="/" className="text-3xl font-black tracking-tighter flex items-center gap-2">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent uppercase">Saint</span>
              <span className="italic font-light opacity-80 uppercase">Beauty shop</span>
            </Link>
            <p className="text-emerald-50/60 text-base font-medium leading-relaxed max-w-sm">
              Crafting high-performance rituals that honor your skin and the planet. <span className="text-emerald-400">Pure nature, refined by science.</span>
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={20} />, href: '#', color: 'hover:bg-pink-500' },
                { icon: <Facebook size={20} />, href: '#', color: 'hover:bg-blue-600' },
                { icon: <Twitter size={20} />, href: '#', color: 'hover:bg-sky-400' },
                { icon: <Youtube size={20} />, href: '#', color: 'hover:bg-red-600' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-100/50 ${social.color} hover:text-white hover:scale-110 transition-all duration-500 border border-white/5 shadow-xl`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Improved based on design */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-emerald-400">Account</h4>
              <ul className="space-y-4">
                <li><Link to="/login" className="text-sm font-medium text-emerald-50/50 hover:text-emerald-400 transition-colors">Account Sign In</Link></li>
                <li><Link to="#" className="text-sm font-medium text-emerald-50/50 hover:text-emerald-400 transition-colors">Rewards Program</Link></li>
                <li><Link to="/register" className="text-sm font-medium text-emerald-50/50 hover:text-emerald-400 transition-colors">Beauty Pro Sign Up</Link></li>
                <li><Link to="#" className="text-sm font-medium text-emerald-50/50 hover:text-emerald-400 transition-colors">Affiliate Program</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-teal-400">Quick links</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-sm font-medium text-emerald-50/50 hover:text-teal-400 transition-colors">About Us</Link></li>
                <li><Link to="#" className="text-sm font-medium text-emerald-50/50 hover:text-teal-400 transition-colors">Education</Link></li>
                <li><Link to="/journal" className="text-sm font-medium text-emerald-50/50 hover:text-teal-400 transition-colors">Blog</Link></li>
                <li><Link to="#" className="text-sm font-medium text-emerald-50/50 hover:text-teal-400 transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="text-sm font-medium text-emerald-50/50 hover:text-teal-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-emerald-400/70">Policies</h4>
              <ul className="space-y-4">
                <li><Link to="/shipping" className="text-sm font-medium text-emerald-50/50 hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link to="/cancellation" className="text-sm font-medium text-emerald-50/50 hover:text-white transition-colors">Subscription Policy</Link></li>
                <li><Link to="/returns" className="text-sm font-medium text-emerald-50/50 hover:text-white transition-colors">Return & Refund Policy</Link></li>
                <li><Link to="/privacy" className="text-sm font-medium text-emerald-50/50 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm font-medium text-emerald-50/50 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter - Vibrant Input */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400">Stay Radiant</h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="Join the inner circle..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white/10 focus:border-emerald-500/50 outline-none transition-all font-bold text-xs text-white"
              />
              <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-emerald-500 text-emerald-950 rounded-xl flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-lg shadow-emerald-500/20">
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-emerald-50/40 hover:text-emerald-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                  <Mail size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">hello@radiance.com</span>
              </div>
              <div className="flex items-center gap-4 text-emerald-50/40 hover:text-emerald-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                  <Phone size={16} />
                </div>
                <a href="tel:0706773127" className="text-xs font-bold uppercase tracking-widest">0706 773 127</a>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Trust Badges - Highly Colorful */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-white/5 mb-12 bg-white/[0.02] rounded-[2rem] px-8">
           {[
             { icon: <Leaf size={20}/>, text: "100% Vegan", color: "text-emerald-400" },
             { icon: <ShieldCheck size={20}/>, text: "Tested Rituals", color: "text-blue-400" },
             { icon: <Sparkles size={20}/>, text: "Pure Sourcing", color: "text-amber-400" },
             { icon: <Heart size={20}/>, text: "Cruelty Free", color: "text-rose-400" }
           ].map((badge, i) => (
             <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group cursor-default">
                <div className={`${badge.color} group-hover:scale-125 transition-transform duration-500`}>{badge.icon}</div>
                <span className="group-hover:text-white transition-colors">{badge.text}</span>
             </div>
           ))}
        </div>

        {/* Bottom Bar - Professional with Colorful Accent */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-[10px] font-bold text-white/30 uppercase tracking-widest">
            <span>&copy; {currentYear} <span className="text-emerald-500/50">Saint Beauty shop</span></span>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-emerald-400 transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-emerald-400 transition-colors">Terms</Link>
            </div>
          </div>

          <div className="flex gap-4 items-center">
             <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mr-2">Certified Secure</span>
             <div className="flex gap-3 opacity-30 hover:opacity-100 transition-opacity duration-700">
                <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[7px] font-black border border-white/5">VISA</div>
                <div className="h-6 w-10 bg-[#25D366]/20 rounded flex items-center justify-center text-[7px] font-black border border-[#25D366]/20 text-[#25D366]">MPESA</div>
                <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[7px] font-black border border-white/5">CARD</div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
