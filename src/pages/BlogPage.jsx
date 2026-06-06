import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const categories = [
    "BACK TO SCHOOL", "CRUELTY-FREE", "CURLY HAIR", "EYE PROTECTION",
    "EYESHIELDS", "FRIZZY HAIR", "GIFT IDEAS", "GREASY HAIR",
    "HAIR CARE", "HAIR COLOR", "HAIR REPAIR", "HAIR ROUTINE",
    "HAIR STYLES", "HAIR TREATMENTS", "HAIR TRENDS", "HOLIDAY",
    "MAKEUP", "MENS GROOMING", "MUSIC FESTIVALS", "NAIL ART",
    "OVER-DYED HAIR", "PERMS", "RED LIGHT THERAPY", "SKIN CARE",
    "SPLIT ENDS", "SUMMER", "SUMMER STYLES", "SUSTAINABLE BEAUTY",
    "TANNING", "TRAVEL TIPS", "VEGAN", "VOLUME", "WINTER"
  ];

  const posts = [
    {
      id: 1,
      title: "How to Care For Over-Dyed Hair",
      date: "MAY 26, 2022",
      img1: "https://images.unsplash.com/photo-1560869713-7d0a29430039?auto=format&fit=crop&q=80&w=1000",
      img2: "https://images.unsplash.com/photo-1519735810577-45146b01f041?auto=format&fit=crop&q=80&w=1000",
      tags: ["FRIZZY HAIR", "OVER-DYED HAIR", "SPLIT ENDS"],
      featured: true
    },
    {
      id: 2,
      title: "4 Common Hair Headaches & How To Solve Them",
      date: "MAR 9, 2022",
      img: "https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=1000",
      tags: ["FRIZZY HAIR", "GREASY HAIR", "SPLIT ENDS", "VOLUME"]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-normal text-gray-800 mb-12">Blog</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-24">
            {posts.map((post) => (
              <article key={post.id} className="space-y-8">
                {post.featured ? (
                  <div className="relative aspect-[2/1] flex border border-gray-100 shadow-sm bg-gray-50">
                    <div className="w-1/2 overflow-hidden">
                       <img src={post.img1} className="w-full h-full object-cover grayscale-[20%]" alt="" />
                    </div>
                    <div className="w-1/2 overflow-hidden border-l border-white/20">
                       <img src={post.img2} className="w-full h-full object-cover" alt="" />
                    </div>

                    {/* High visibility circles */}
                    <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-44 h-44 md:w-64 md:h-64 rounded-full border-[10px] border-white shadow-2xl overflow-hidden z-20">
                       <img src={post.img1} className="w-full h-full object-cover scale-150" alt="" />
                    </div>
                    <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-44 h-44 md:w-64 md:h-64 rounded-full border-[10px] border-white shadow-2xl overflow-hidden z-20">
                       <img src={post.img2} className="w-full h-full object-cover scale-150" alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video md:aspect-[2.5/1] overflow-hidden border border-gray-100 bg-gray-50">
                    <img src={post.img} className="w-full h-full object-cover" alt="" />
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-gray-900 font-normal text-4xl">{post.title}</h2>
                    <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em]">{post.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <h3 className="text-xl font-normal text-gray-800">Explore more</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} className="px-3 py-2 border border-gray-200 text-[9px] font-bold text-gray-500 uppercase tracking-widest hover:border-gray-900 transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Rewards Button */}
      <div className="fixed bottom-8 right-8 bg-[#FA8CA3] text-white px-8 py-4 rounded-full font-bold shadow-2xl z-50 cursor-pointer hover:scale-105 transition-transform">
        Rewards
      </div>
    </div>
  );
};

export default BlogPage;
