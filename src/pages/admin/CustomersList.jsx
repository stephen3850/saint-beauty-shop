import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import {
  Users,
  Mail,
  ShoppingBag,
  CreditCard,
  Search,
  Loader2,
  ChevronRight,
  Filter,
  Download,
  Calendar,
  MoreVertical,
  X,
  MapPin,
  Phone,
  User as UserIcon,
  Clock,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/admin-dashboard.css';

const CustomersList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Failed to fetch customers');
      toast.error('Could not load customer database');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const filteredCustomers = customers.filter(c =>
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 text-white">Customer Directory</h1>
          <p className="text-slate-400 font-medium">Manage your community and monitor client loyalty.</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm font-bold text-white transition-all hover:bg-slate-700">
            <Download size={18} className="text-blue-400" /> Export List
          </button>
        </div>
      </header>

      {/* Control Bar */}
      <div className="glass-card vivid-card-purple p-3 flex flex-col xl:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 w-full xl:w-auto">
           <div className="relative flex-1 xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="admin-search-input w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-slate-800 text-slate-400 rounded-xl border border-white/5 hover:text-white transition-all">
            <Filter size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
             {customers.length} Total Customers
           </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full py-40 flex flex-col items-center">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
            <p className="text-slate-500 italic">Accessing customer records...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="col-span-full py-40 glass-card vivid-card-orange text-center space-y-4">
             <Users size={48} className="text-slate-700 mx-auto" />
             <p className="text-slate-400 italic">No customers match your search criteria.</p>
          </div>
        ) : filteredCustomers.map((customer, index) => (
          <div
            key={customer.id}
            className={`glass-card group relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border-l-4 p-4 ${
              index % 4 === 0 ? 'vivid-card-purple border-l-purple-500' :
              index % 4 === 1 ? 'vivid-card-blue border-l-blue-500' :
              index % 4 === 2 ? 'vivid-card-emerald border-l-emerald-500' :
              'vivid-card-orange border-l-orange-500'
            }`}
          >
            {/* Background Animated Glow */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 opacity-20 group-hover:opacity-40 transition-all duration-700 blur-[60px] rounded-full ${
              index % 4 === 0 ? 'bg-purple-500' :
              index % 4 === 1 ? 'bg-blue-500' :
              index % 4 === 2 ? 'bg-emerald-500' :
              'bg-orange-500'
            }`} />

            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shrink-0 ${
                index % 4 === 0 ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                index % 4 === 1 ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                index % 4 === 2 ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                'bg-gradient-to-br from-orange-500 to-rose-600'
              }`}>
                {customer.name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-black text-white text-base truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 ${
                  index % 4 === 0 ? 'group-hover:from-purple-400 group-hover:to-pink-400' :
                  index % 4 === 1 ? 'group-hover:from-blue-400 group-hover:to-cyan-400' :
                  index % 4 === 2 ? 'group-hover:from-emerald-400 group-hover:to-teal-400' :
                  'group-hover:from-orange-400 group-hover:to-rose-400'
                }">{customer.name}</h3>
                <p className="text-[9px] text-slate-400 font-black uppercase flex items-center gap-1.5 tracking-wider truncate">
                  <Mail size={10} className={
                    index % 4 === 0 ? 'text-purple-400' :
                    index % 4 === 1 ? 'text-blue-400' :
                    index % 4 === 2 ? 'text-emerald-400' :
                    'text-orange-400'
                  } /> {customer.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
              <div className="bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-white/5 transition-all group-hover:bg-white/10">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5 flex items-center gap-1">
                  <ShoppingBag size={10} className="text-emerald-400" /> Orders
                </p>
                <p className="text-lg font-black text-white">{customer.totalOrders || 0}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-white/5 transition-all group-hover:bg-white/10">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5 flex items-center gap-1">
                  <CreditCard size={10} className="text-blue-400" /> Spent
                </p>
                <p className="text-lg font-black text-white">${(customer.totalSpent || 0).toFixed(0)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 relative z-10">
              <div className="flex flex-col">
                <span className="text-[7px] text-slate-500 font-black uppercase tracking-[0.2em]">Status</span>
                <span className="text-[9px] font-black text-emerald-400 uppercase flex items-center gap-1 mt-0.5">
                   <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                   </span>
                   Active
                </span>
              </div>
              <button
                onClick={() => handleViewProfile(customer)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 ${
                  index % 4 === 0 ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white' :
                  index % 4 === 1 ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white' :
                  index % 4 === 2 ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white' :
                  'bg-orange-600/20 text-orange-400 hover:bg-orange-600 hover:text-white'
                }`}
              >
                Profile <ChevronRight size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Profile Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 lg:p-10 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#0F172A] border border-white/10 rounded-[2.5rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20">
                  {selectedCustomer.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Customer Profile</h2>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">ID: {selectedCustomer.id}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{selectedCustomer?.totalOrders || 0}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-emerald-400">${Number(selectedCustomer?.totalSpent || 0).toFixed(2)}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Order</p>
                  <p className="text-2xl font-bold text-blue-400">
                    ${(selectedCustomer?.totalOrders > 0) ? (Number(selectedCustomer?.totalSpent || 0) / selectedCustomer.totalOrders).toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-white/5 pb-2">Information Vault</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Full Name</p>
                      <p className="text-sm font-bold text-white">{selectedCustomer?.name || 'Unknown'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                      <p className="text-sm font-bold text-white">{selectedCustomer?.email || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Phone Number</p>
                      <p className="text-sm font-bold text-white">{selectedCustomer?.phone || 'Not Provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-400">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Member Since</p>
                      <p className="text-sm font-bold text-white">
                        {selectedCustomer?.createdAt ? new Date(selectedCustomer.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-400">
                      <MapPin size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Primary Shipping Address</p>
                      <p className="text-sm font-bold text-white">{selectedCustomer?.address || 'No address on file'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => navigate('/dashboard/admin/chat', { state: { customerId: selectedCustomer.id } })}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  <Mail size={16} /> Send Message
                </button>
                <button
                  onClick={() => navigate('/dashboard/admin/orders', { state: { searchTerm: selectedCustomer.email } })}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <ExternalLink size={16} /> View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersList;
