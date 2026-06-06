import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, MapPin, Phone, Lock, Save, Loader2, Sparkles, ShieldCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateUserProfile(formData);
      setIsSaving(false);
    }, 800);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      return toast.error('New passwords do not match');
    }
    toast.success('Password updated successfully! ✨');
    setPasswords({ old: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 text-white pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-tr from-[#7B9E87] to-[#C4A46C] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={20} className="text-white" />
             </div>
             <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">Sanctuary Profile</h1>
          </div>
          <p className="text-white/40 text-lg font-light italic">Refine your identity within the beauty garden.</p>
        </div>
        <div className="bg-gradient-to-r from-[#C4A46C]/20 to-[#7B9E87]/20 px-6 py-2.5 rounded-2xl text-[#C4A46C] text-[10px] font-black uppercase tracking-[0.3em] border border-[#C4A46C]/30 shadow-2xl backdrop-blur-xl">
          Verified Resident
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Personal Info */}
        <section className="bg-white/[0.03] backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#7B9E87]/5 rounded-full blur-[80px] group-hover:bg-[#7B9E87]/10 transition-colors" />

          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="w-12 h-12 bg-[#7B9E87] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#7B9E87]/20 rotate-3 group-hover:rotate-0 transition-transform">
               <User size={22} />
            </div>
            <h2 className="text-2xl font-black italic tracking-tight text-white">General Information</h2>
          </div>

          <form onSubmit={handleUpdateInfo} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Full Name</label>
              <div className="relative group/input">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7B9E87] group-focus-within/input:scale-110 transition-transform" size={18} />
                <input
                  type="text" className="w-full pl-14 pr-6 py-4 text-sm rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7B9E87] focus:bg-white/10 transition-all shadow-inner"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="email" className="w-full pl-14 py-4 text-sm rounded-2xl bg-white/0 border border-white/5 text-white/30 cursor-not-allowed italic font-light transition-all"
                  value={formData.email} disabled
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Phone Number</label>
              <div className="relative group/input">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7B9E87] group-focus-within/input:scale-110 transition-transform" size={18} />
                <input
                  type="tel" className="w-full pl-14 pr-6 py-4 text-sm rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7B9E87] focus:bg-white/10 transition-all shadow-inner"
                  placeholder="+254 700 000 000"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Shipping Address</label>
              <div className="relative group/input">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7B9E87] group-focus-within/input:scale-110 transition-transform" size={18} />
                <input
                  type="text" className="w-full pl-14 pr-6 py-4 text-sm rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#7B9E87] focus:bg-white/10 transition-all shadow-inner"
                  placeholder="Kenyatta Avenue, Nairobi"
                  value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl bg-gradient-to-r from-[#7B9E87] to-[#6A8A75] text-white shadow-xl shadow-[#7B9E87]/20 hover:shadow-[#7B9E87]/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center mt-10"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} className="mr-3" /> Seal Changes</>}
            </button>
          </form>
        </section>

        {/* Security / Password */}
        <div className="space-y-12">
          <section className="bg-white/[0.03] backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-[#C4A46C]/5 rounded-full blur-[80px] group-hover:bg-[#C4A46C]/10 transition-colors" />

            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 bg-[#C4A46C] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#C4A46C]/20 -rotate-3 group-hover:rotate-0 transition-transform">
                 <Lock size={22} />
              </div>
              <h2 className="text-2xl font-black italic tracking-tight text-white">Security Vault</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6 relative z-10">
              <div className="space-y-3">
                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">Current Password</label>
                <input
                  type="password" placeholder="••••••••"
                  className="w-full px-6 py-4 text-sm rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#C4A46C] focus:bg-white/10 transition-all shadow-inner"
                  required
                  value={passwords.old} onChange={e => setPasswords({...passwords, old: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-4">New Password</label>
                <input
                  type="password" placeholder="••••••••"
                  className="w-full px-6 py-4 text-sm rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#C4A46C] focus:bg-white/10 transition-all shadow-inner"
                  required
                  value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-white/5 text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] border border-white/10 hover:bg-white/10 hover:border-[#C4A46C]/50 transition-all shadow-xl mt-4 flex items-center justify-center gap-3">
                <ShieldCheck size={18} className="text-[#C4A46C]" /> Update Security
              </button>
            </form>
          </section>

          <section className="p-10 rounded-[3rem] border border-red-500/20 bg-red-500/[0.02] text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-red-500/[0.02] group-hover:bg-red-500/[0.05] transition-colors" />
             <div className="relative z-10">
                <h3 className="text-red-400 font-black italic text-xl mb-3 uppercase tracking-tighter">Dissolution Zone</h3>
                <p className="text-sm text-white/40 font-light italic mb-8 max-w-[240px] mx-auto">Permanently remove your presence from our beauty garden.</p>
                <button className="flex items-center gap-2 mx-auto text-red-500 font-black text-[11px] uppercase tracking-[0.3em] border-b-2 border-red-500/20 pb-1 hover:border-red-500 transition-all">
                   <Trash2 size={14} /> Terminate Account
                </button>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
