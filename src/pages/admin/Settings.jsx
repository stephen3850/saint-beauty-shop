import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Image as ImageIcon,
  Camera
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/admin-dashboard.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: User, color: 'text-blue-400' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-rose-400' },
    { icon: Palette, id: 'appearance', label: 'Appearance', color: 'text-purple-400' },
    { id: 'security', label: 'Security', icon: Shield, color: 'text-emerald-400' },
    { id: 'localization', label: 'Localization', icon: Globe, color: 'text-amber-400' },
  ];

  const handleSave = () => {
    const loading = toast.loading('Syncing preferences...');
    setTimeout(() => {
      toast.success('Settings secured! ✨', { id: loading });
    }, 1500);
  };

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <header>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1 text-white flex items-center gap-3">
          <SettingsIcon className="text-slate-500" /> Control Suite Settings
        </h1>
        <p className="text-slate-400 text-xs font-medium">Configure your administrator experience and store defaults.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <aside className="lg:w-64 shrink-0">
          <div className="glass vivid-card-blue p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : tab.color} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Settings Panel */}
        <main className="flex-grow">
          <div className="glass-card vivid-card-purple min-h-[500px] p-6 lg:p-8 relative overflow-hidden">
            <div className="relative z-10">
              {activeTab === 'profile' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/5 pb-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-1">
                        <img
                          src="https://ui-avatars.com/api/?name=Stephen+Admin&background=random&color=fff"
                          alt="Profile"
                          className="w-full h-full rounded-xl object-cover border-2 border-[#1E293B]"
                        />
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-2 bg-slate-800 border border-white/10 rounded-lg text-blue-400 hover:text-white transition-all shadow-xl">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-bold text-white mb-1">Stephen King</h2>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Master Administrator</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                      <input type="text" className="admin-search-input" defaultValue="Stephen King" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                      <input type="email" className="admin-search-input" defaultValue="admin@hevenbeauty.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Support Handle</label>
                      <input type="text" className="admin-search-input" defaultValue="@heven_stephen" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Timezone</label>
                      <select className="admin-search-input">
                        <option>GMT+3 (Nairobi)</option>
                        <option>UTC (London)</option>
                        <option>EST (New York)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/10">
                      <Bell size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black italic text-white tracking-tight">Notification Pulse</h2>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-time store heartbeat</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: 'New Order Alerts', desc: 'Instant pulse when a beauty ritual is ordered.', checked: true, color: 'from-emerald-500/20 to-emerald-600/5', iconColor: 'text-emerald-400', toggleColor: 'peer-checked:bg-emerald-500' },
                      { label: 'Customer Inquiry', desc: 'Direct alert for new support sessions.', checked: true, color: 'from-blue-500/20 to-blue-600/5', iconColor: 'text-blue-400', toggleColor: 'peer-checked:bg-blue-500' },
                      { label: 'Low Stock Warnings', desc: 'Critical stock depletion notifications.', checked: false, color: 'from-rose-500/20 to-rose-600/5', iconColor: 'text-rose-400', toggleColor: 'peer-checked:bg-rose-500' },
                      { label: 'Daily Sales Report', desc: 'Midnight performance analytics delivery.', checked: true, color: 'from-purple-500/20 to-purple-600/5', iconColor: 'text-purple-400', toggleColor: 'peer-checked:bg-purple-500' }
                    ].map((n, i) => (
                      <div key={i} className={`flex items-center justify-between p-3.5 rounded-2xl border border-white/5 bg-gradient-to-r ${n.color} group hover:border-white/20 transition-all duration-500 shadow-lg`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-black/40 ${n.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                             <Bell size={16} />
                          </div>
                          <div className="max-w-md">
                            <p className="text-xs font-black text-white italic">{n.label}</p>
                            <p className="text-[9px] text-slate-400 mt-0.5 font-medium">{n.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer scale-100">
                          <input type="checkbox" className="sr-only peer" defaultChecked={n.checked} />
                          <div className={`w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:shadow-sm ${n.toggleColor}`}></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-500 shadow-lg shadow-purple-500/10">
                      <Palette size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black italic text-white tracking-tight">Visual Aesthetics</h2>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Reskin your workspace</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: 'Midnight', color: 'bg-[#0F172A]', active: true, accent: 'from-blue-600 to-indigo-600' },
                      { label: 'Onyx', color: 'bg-[#000000]', accent: 'from-slate-800 to-black' },
                      { label: 'Plum', color: 'bg-[#2D1B36]', accent: 'from-purple-600 to-pink-900' },
                      { label: 'Jungle', color: 'bg-[#062016]', accent: 'from-emerald-700 to-green-900' }
                    ].map((theme, i) => (
                      <button key={i} className={`group relative p-1 rounded-2xl transition-all duration-500 overflow-hidden ${theme.active ? 'bg-gradient-to-br from-blue-500 to-purple-500 p-[1.5px]' : 'hover:scale-105'}`}>
                        <div className={`h-full w-full rounded-[0.9rem] p-3 flex flex-col items-center gap-3 ${theme.active ? 'bg-[#0F172A]' : 'bg-white/5 border border-white/5'}`}>
                           <div className={`w-12 h-12 rounded-xl shadow-2xl bg-gradient-to-br ${theme.accent} border border-white/10 group-hover:rotate-12 transition-transform duration-500`} />
                           <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white">{theme.label}</span>
                           {theme.active && <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 space-y-4">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                       <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Interface Density</p>
                    </div>
                    <div className="flex gap-3">
                      {['Compact', 'Standard', 'Relaxed'].map(d => (
                        <button key={d} className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${d === 'Standard' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/10">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black italic text-white tracking-tight">Security Citadel</h2>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Fortify your access</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/10 space-y-3">
                        <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Two-Factor Auth</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed">Add an extra layer of protection to your administrator account.</p>
                        <button className="w-full py-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Enable 2FA</button>
                     </div>
                     <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/10 space-y-3">
                        <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Session Vault</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed">Instantly terminate all active sessions across your devices.</p>
                        <button className="w-full py-2.5 bg-rose-500/20 text-rose-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">Flush Sessions</button>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === 'localization' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black italic text-white tracking-tight">Regional Hub</h2>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tailor your global presence</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-5 rounded-2xl bg-gradient-to-tr from-amber-500/5 to-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-amber-500/30 transition-all duration-700">
                        <div>
                           <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1">Display Language</p>
                           <p className="text-lg font-black text-white italic">English (US)</p>
                        </div>
                        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
                           <Globe size={20} />
                        </div>
                     </div>
                     <div className="p-5 rounded-2xl bg-gradient-to-tr from-blue-500/5 to-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all duration-700">
                        <div>
                           <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">Base Currency</p>
                           <p className="text-lg font-black text-white italic">USD ($)</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:rotate-12 transition-transform">
                           <Globe size={20} />
                        </div>
                     </div>
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-3">
                <button className="px-6 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">Discard Changes</button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all active:scale-95 shadow-xl shadow-blue-600/20"
                >
                  <Save size={16} /> Deploy Settings
                </button>
              </div>
            </div>

            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-bl-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/5 rounded-tr-full -ml-10 -mb-10 blur-3xl pointer-events-none" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
