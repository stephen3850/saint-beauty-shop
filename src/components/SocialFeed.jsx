import React from 'react';
import { Instagram, Heart, Eye } from 'lucide-react';

const SocialFeed = () => {
  const posts = [
    { id: 1, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=500&auto=format&fit=crop', likes: '1.2k' },
    { id: 2, img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop', likes: '845' },
    { id: 3, img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&auto=format&fit=crop', likes: '2.1k' },
    { id: 4, img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop', likes: '1.5k' },
    { id: 5, img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop', likes: '932' },
    { id: 6, img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop', likes: '3.4k' },
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-20">
        <div className="flex justify-center gap-4 text-[#8A7A77]">
          <Instagram size={24} strokeWidth={1.5} />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2D2327]">Follow @SaintBeauty</span>
        </div>
        <h2 className="text-4xl md:text-5xl text-[#2D2327] italic">Inspiration for your glow</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="group relative aspect-square overflow-hidden bg-[#F0E4DC]">
            <img
              src={post.img}
              alt="Beauty Inspiration"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white gap-2">
              <div className="flex items-center gap-1">
                <Heart size={16} fill="white" />
                <span className="text-xs font-bold">{post.likes}</span>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 border-b border-white pb-0.5 hover:text-[#E5705E] hover:border-[#E5705E] transition-all"
              >
                View Post <Eye size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialFeed;
