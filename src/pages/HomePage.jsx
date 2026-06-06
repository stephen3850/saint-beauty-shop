import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Globe, Heart, ShieldCheck, Leaf, Star, Quote, MessageCircle, UserPlus, MapPin, Briefcase, Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: ''
  });

  const handleQuickRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate initial step and redirect to full registration with data
    setTimeout(() => {
        setIsSubmitting(false);
        navigate('/register', { state: { ...formData } });
        toast.success("Let's complete your profile! ✨");
    }, 1000);
  };

  const categories = [
    {
      name: 'Skincare',
      path: '/shop?category=Skincare',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
      description: 'Clean rituals for a timeless glow.',
      className: 'md:col-span-2 md:row-span-2'
    },
    {
      name: 'Nail Care',
      path: '/shop?category=Nails',
      img: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=600',
      description: 'Artistry at your fingertips.',
      className: 'md:col-span-1 md:row-span-1'
    },
    {
      name: 'Makeup',
      path: '/shop?category=Makeup',
      img: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&q=80&w=600',
      description: 'Enhance your natural canvas.',
      className: 'md:col-span-1 md:row-span-1'
    },
    {
      name: 'Body Care',
      path: '/shop?category=Body',
      img: 'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=800',
      description: 'Luxury for every inch of you.',
      className: 'md:col-span-2 md:row-span-1'
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-stone-200">

      {/* --- Collections Grid - Refined & Minimal --- */}
      <section className="pb-24 pt-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em]">The Collections</p>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight leading-none">
              Shop by <span className="italic font-light">Ritual</span>
            </h2>
          </div>
          <Link to="/shop" className="group text-stone-400 hover:text-stone-900 font-bold text-[10px] uppercase tracking-[0.3em] transition-all flex items-center gap-2 border-b border-stone-100 pb-1">
            View All Categories <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[650px]">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={cat.path}
              className={`group relative overflow-hidden bg-stone-50 ${cat.className} transition-all duration-700`}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-700" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-all duration-700">
                <p className="text-[9px] font-bold text-white/80 uppercase tracking-[0.4em] mb-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Explore</p>
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight drop-shadow-sm">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- Philosophy Section - Clean Editorial --- */}
      <section className="relative py-20 overflow-hidden bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12">
              <div className="inline-flex items-center gap-4 text-stone-400 text-[10px] font-bold uppercase tracking-[0.5em]">
                <div className="w-10 h-px bg-stone-200" /> Rooted in Nature
              </div>

              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 tracking-tighter leading-[1.1] md:leading-[1] max-w-2xl">
                  Beauty is a <span className="italic font-light text-stone-500">Dialogue</span> with the Earth.
                </h2>

                <div className="max-w-xl space-y-8">
                  <p className="text-lg text-stone-500 leading-relaxed font-medium">
                    We believe in absolute transparency. From the nutrient-rich volcanic soil of our Kenyan estates to the hand-poured recycled glass in your hand.
                  </p>
                  <p className="text-stone-800 italic font-serif text-xl leading-snug border-l-2 border-stone-200 pl-8">
                    "Pure, potent, and ethically curated for the modern soul."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-12 pt-4">
                 {[
                   { num: "01", title: "Purity", desc: "No synthetic fillers." },
                   { num: "02", title: "Ethics", desc: "Fair trade sourcing." },
                   { num: "03", title: "Zero", desc: "Plastic-free vision." }
                 ].map((item, i) => (
                   <div key={i} className="space-y-3">
                      <p className="text-2xl font-serif italic text-stone-300">{item.num}</p>
                      <div className="space-y-1">
                        <p className="text-[11px] font-black text-stone-900 uppercase tracking-widest">{item.title}</p>
                        <p className="text-[10px] text-stone-400 font-medium uppercase tracking-tighter leading-tight">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
                  alt="Botanical Ingredients"
                  className="w-full h-full object-cover grayscale-[10%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Store Locations - Minimal --- */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
          <div className="text-center space-y-3">
            <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.5em]">The Experience</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Our <span className="italic font-light">Sanctuaries</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
            {[
              { title: 'The Flagship', loc: 'Nairobi CBD', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
              { title: 'The Oasis', loc: 'Kibra Hub', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
              { title: 'The Gallery', loc: 'Pipeline', img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=800' }
            ].map((store, i) => (
              <div key={i} className="group space-y-6">
                <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                  <img src={store.img} alt={store.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1s]" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-[11px] font-bold text-stone-900 uppercase tracking-[0.2em]">{store.title}</h3>
                  <p className="text-[10px] font-medium text-stone-400 uppercase tracking-[0.15em]">{store.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Careers Section - Clean Professional --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
               <div className="aspect-[4/3] overflow-hidden bg-stone-100 rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
                    alt="Our Team"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
               </div>
            </div>
            <div className="space-y-10 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase tracking-[0.5em]">
                <div className="w-10 h-px bg-stone-200" /> Join the Team
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-stone-900 tracking-tighter leading-none">
                Crafting <span className="italic font-light">Future</span> Beauty.
              </h2>
              <p className="text-lg text-stone-500 font-medium leading-relaxed">
                We are looking for clinical experts, visionary creators, and logistics pioneers to help us redefine Africa's conscious beauty landscape.
              </p>
              <div className="pt-4">
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 border-b-2 border-stone-900 pb-2 hover:text-stone-500 hover:border-stone-200 transition-all group"
                >
                  Explore Opportunities <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Join the Sanctuary Section - Professional & Minimal --- */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

            {/* Left: Content */}
            <div className="lg:col-span-5 space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 text-white/60 text-[9px] font-bold uppercase tracking-widest">
                <UserPlus size={10} /> Exclusive Membership
              </div>
              <h2 className="text-3xl md:text-6xl font-serif leading-[1.1] md:leading-[1] tracking-tighter">
                Unlock your <br className="hidden md:block" />
                <span className="italic font-light opacity-50">Glow Journey</span>
              </h2>
              <p className="text-lg text-white/60 font-medium leading-relaxed max-w-md">
                Join our circle for priority access to new rituals, professional pricing, and curated beauty insights.
              </p>

              <div className="grid grid-cols-1 gap-6 pt-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 transition-colors"><ShieldCheck size={16} /></div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Secure Authentication</p>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 transition-colors"><Briefcase size={16} /></div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Professional Benefits</p>
                </div>
              </div>
            </div>

            {/* Right: The Sign Up Form - Clean & High Contrast */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
                <div className="mb-10">
                   <p className="text-stone-400 mb-2 text-xs font-medium uppercase tracking-widest">Register</p>
                   <h3 className="text-3xl font-serif text-stone-900 tracking-tight">Personal Information</h3>
                </div>

                <form onSubmit={handleQuickRegister} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">First Name</label>
                       <input
                        type="text"
                        required
                        className="w-full border-b border-stone-200 py-3 px-1 focus:outline-none focus:border-stone-900 transition-all text-stone-900 placeholder-stone-200 font-medium text-sm"
                        placeholder="Jane"
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Last Name</label>
                       <input
                        type="text"
                        required
                        className="w-full border-b border-stone-200 py-3 px-1 focus:outline-none focus:border-stone-900 transition-all text-stone-900 placeholder-stone-200 font-medium text-sm"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                       />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
                       <input
                        type="email"
                        required
                        className="w-full border-b border-stone-200 py-3 px-1 focus:outline-none focus:border-stone-900 transition-all text-stone-900 placeholder-stone-200 font-medium text-sm"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                       />
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-stone-900 text-white py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : (
                        <>Continue to Sanctuary <ArrowRight size={14} /></>
                      )}
                    </button>
                    <p className="text-center mt-6 text-stone-400 text-[10px]">
                      Already a member? <Link to="/login" className="text-stone-900 font-bold border-b border-stone-900 ml-1">Sign In</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* --- Floating Curator --- */}
      <a
        href="https://wa.me/254706773127"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-12 left-12 z-50 bg-stone-950 text-white p-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-emerald-700 transition-all duration-700 group"
      >
        <MessageCircle size={24} strokeWidth={1} />
        <div className="absolute left-full ml-6 bg-white text-stone-950 px-6 py-4 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-stone-100">
          Inquire with a Curator
        </div>
      </a>
    </div>
  );
};

export default HomePage;
