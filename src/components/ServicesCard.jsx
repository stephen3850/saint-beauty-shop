import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Info, MapPin, CheckCircle2, Clock,
  DollarSign, Sparkles, Gem, ArrowRight
} from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: "Swedish & Deep Tissue Massage",
    category: "Standard",
    description: "The absolute standard across almost every Kenyan spa menu.",
    availableAt: "Mobile Service (Your Location)",
    benefits: "Relieves everyday Nairobi traffic and office stress",
    duration: "60-90 minutes",
    priceRange: "KSh 4,000 - KSh 6,000",
    icon: "🧖‍♂️",
    type: "standard"
  },
  {
    id: 2,
    title: "Aromatherapy & Hot Stone Therapy",
    category: "Standard",
    description: "Widely available options that utilize heated volcanic stones or localized aromatic essential oils.",
    availableAt: "Mobile Service (Your Location)",
    benefits: "Deeply soothing, reduces muscle tension, improves circulation",
    duration: "60-90 minutes",
    priceRange: "KSh 4,500 - KSh 7,000",
    icon: "🔥",
    type: "standard"
  },
  {
    id: 3,
    title: "Traditional Moroccan & Hammam Baths",
    category: "Standard",
    description: "Combines deep tissue massage with traditional steam bath, black soap application, and intense body scrub.",
    availableAt: "Mobile Service (Your Location)",
    includes: "Steam bath, black soap scrub, full body massage",
    benefits: "Deep skin exfoliation and intense relaxation",
    duration: "90-120 minutes",
    priceRange: "KSh 6,000 - KSh 9,000",
    icon: "🧼",
    type: "standard"
  },
  {
    id: 4,
    title: "Lomi Lomi Massage (Hawaiian)",
    category: "Specialty & Luxury",
    description: "Traditional Hawaiian technique using long, continuous forearm strokes that mimic ocean waves.",
    availableAt: "Mobile Service (Your Location)",
    uniqueFeature: "Wave-like strokes, flowing movements",
    benefits: "Restores energy flow and deep emotional release",
    duration: "60-90 minutes",
    priceRange: "KSh 7,000 - KSh 10,000",
    icon: "🌊",
    type: "luxury"
  },
  {
    id: 5,
    title: "Holistic & Crystal Healing Massages",
    category: "Specialty & Luxury",
    description: "Incorporates rose quartz or amethyst crystals to balance chakras alongside traditional muscle work.",
    availableAt: "Mobile Service (Your Location)",
    benefits: "Spiritual healing, chakra balancing, relaxation",
    duration: "75-90 minutes",
    priceRange: "KSh 8,000 - KSh 12,000",
    icon: "💎",
    type: "luxury"
  },
  {
    id: 6,
    title: "Bespoke / Custom Massages",
    category: "Specialty & Luxury",
    description: "Fully customize focus area, preferred pressure, and choice of herbal oils.",
    availableAt: "Mobile Service (Your Location)",
    features: "Personalized to your specific physical needs",
    priceRange: "KSh 7,500 - KSh 12,000+",
    duration: "Customized",
    icon: "✨",
    type: "luxury"
  },
  {
    id: 7,
    title: "Intense Full Body Recovery (Mobile)",
    category: "Mobile Ritual",
    description: "A high-intensity, deep pressure massage focused on complete muscle reset and tension release, performed in your own space.",
    availableAt: "Mobile Service (Your Location)",
    benefits: "Maximum tension release, improved mobility, deep physical restoration",
    duration: "90 minutes",
    priceRange: "KSh 10,000 - KSh 15,000",
    icon: "🏠",
    type: "standard"
  }
];

const ServicesCard = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (service) => {
    if (isMobile) {
      setSelectedService(service);
    }
  };

  return (
    <div className="w-full py-12 px-4 bg-[#0A192F] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Massage & <span className="italic text-[#7B9E87]">Spa Services</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm uppercase tracking-[0.3em]">
            Curated Rituals for Nairobi's Modern Soul
          </p>
        </div>

        {/* Pricing Summary Bar */}
        <div className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="text-[10px] font-black text-[#7B9E87] uppercase tracking-widest mb-1">Standard Urban Spa</p>
            <p className="text-white font-bold">KSh 4,000 - 6,000</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-[#C4A46C] uppercase tracking-widest mb-1">Luxury Hotel Spa</p>
            <p className="text-white font-bold">KSh 7,500 - 12,000+</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Combo Packages</p>
            <p className="text-white font-bold text-xs">Sauna & Steam Available</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="relative">
              <motion.div
                onMouseEnter={() => !isMobile && setHoveredId(service.id)}
                onMouseLeave={() => !isMobile && setHoveredId(null)}
                onClick={() => handleCardClick(service)}
                className={`
                  h-full p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden group
                  ${service.type === 'luxury'
                    ? 'bg-gradient-to-br from-[#112240] to-[#0A192F] border-white/5 hover:border-[#C4A46C]/30'
                    : 'bg-white/5 border-white/5 hover:border-[#7B9E87]/30'}
                `}
                whileHover={!isMobile ? { y: -10 } : {}}
              >
                {/* Background Glow */}
                <div className={`
                  absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700
                  ${service.type === 'luxury' ? 'bg-[#C4A46C]' : 'bg-[#7B9E87]'}
                `} />

                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-4xl">{service.icon}</span>
                    {service.type === 'luxury' && <Gem size={18} className="text-[#C4A46C]" />}
                  </div>

                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${service.type === 'luxury' ? 'text-[#C4A46C]' : 'text-[#7B9E87]'}`}>
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 leading-tight group-hover:text-white/90 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                    {isMobile ? 'Tap for Details' : 'Hover for Details'}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* Desktop Hover Popup */}
              <AnimatePresence>
                {!isMobile && hoveredId === service.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute z-[100] top-0 left-0 w-full h-full p-8 rounded-[2rem] bg-[#112240] border border-white/10 shadow-2xl pointer-events-none overflow-y-auto custom-scrollbar"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-[#7B9E87]">
                        <Info size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Full Ritual Details</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin size={16} className="text-blue-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available At</p>
                            <p className="text-white text-sm italic">{service.availableAt}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-[#7B9E87] mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Benefits</p>
                            <p className="text-white text-sm">{service.benefits}</p>
                          </div>
                        </div>

                        {service.includes && (
                          <div className="flex items-start gap-3">
                            <Sparkles size={16} className="text-[#C4A46C] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Includes</p>
                              <p className="text-white text-sm">{service.includes}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-slate-500" />
                            <span className="text-xs text-white/60">{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-black text-[#7B9E87]">{service.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobile && selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full bg-[#112240] rounded-t-[3rem] z-[1001] p-8 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />

              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 p-2 rounded-full bg-white/5 text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedService.icon}</span>
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedService.type === 'luxury' ? 'text-[#C4A46C]' : 'text-[#7B9E87]'}`}>
                      {selectedService.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed italic text-lg border-l-2 border-[#7B9E87] pl-6">
                  "{selectedService.description}"
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Where to find</p>
                      <p className="text-white font-medium">{selectedService.availableAt}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#7B9E87]/10 flex items-center justify-center text-[#7B9E87] shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Experience Benefits</p>
                      <p className="text-white font-medium">{selectedService.benefits}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Session</p>
                      <p className="text-white font-bold flex items-center gap-2 text-sm">
                        <Clock size={14} className="text-[#7B9E87]" /> {selectedService.duration}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Investment</p>
                      <p className="text-[#7B9E87] font-black text-sm">{selectedService.priceRange}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-[#7B9E87] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all mt-4"
                >
                  Confirm Ritual Selection
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default ServicesCard;
