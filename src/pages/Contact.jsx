import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-[#F8FAF9] min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-100/30 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">
            <Phone size={12} /> Direct Support
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-none">
            Let's Start a <span className="text-emerald-600 italic">Conversation</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Have a question about our rituals or need personalized beauty advice? Our curators are here to guide you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-4 space-y-8 animate-fade-in">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-emerald-900/5 border border-emerald-50 space-y-10">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Contact Information</h2>

            <div className="space-y-6">
              <a href="tel:0706773127" className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Call Us</p>
                  <p className="text-base font-bold text-gray-800">0706 773 127</p>
                </div>
              </a>

              <a href="mailto:hello@heavenlybeauty.com" className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Ritual</p>
                  <p className="text-base font-bold text-gray-800">hello@heavenlybeauty.com</p>
                </div>
              </a>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Main Sanctuary</p>
                  <p className="text-base font-bold text-gray-800">Nairobi CBD, Kenya</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ritual Hours</p>
                  <p className="text-base font-bold text-gray-800">8 AM — 8 PM Daily</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-emerald-50">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Follow Our Journey</p>
              <div className="flex gap-4">
                {[<Instagram size={18}/>, <Facebook size={18}/>, <Twitter size={18}/>].map((icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-8 animate-fade-in delay-100">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-emerald-900/5 border border-emerald-50">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Send a Secret Message</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input type="text" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 placeholder-gray-300" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 placeholder-gray-300" placeholder="your@email.com" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                <select className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 appearance-none">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Beauty Advice</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Message</label>
                <textarea rows="5" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 placeholder-gray-300 resize-none" placeholder="How can we help your glow today?"></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full md:w-auto bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95 flex items-center justify-center gap-3">
                  Send Message <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map or Secondary Image Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="rounded-[3rem] overflow-hidden h-[400px] relative shadow-2xl">
           <img
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1600"
            className="w-full h-full object-cover"
            alt="Store Sanctuary"
           />
           <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-[2px]" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] text-center shadow-2xl border border-white">
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Want to visit?</h3>
                 <p className="text-gray-500 font-medium mb-6 uppercase text-[10px] tracking-widest">Our sanctuaries are open across Nairobi</p>
                 <Link to="/stores" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 transition-all">View Locations</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
