import React, { useState } from 'react';
import {
  Briefcase, Plus, Search, Edit2, Trash2,
  Users, MapPin, Clock, DollarSign,
  ExternalLink, CheckCircle, XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/admin-dashboard.css';
import AdminHeaderTools from '../../components/admin/AdminHeaderTools';

const CareersManagement = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Senior Beauty Consultant', location: 'Nairobi CBD', type: 'Full-time', salary: 'Ksh 45k - 60k', applicants: 12, status: 'Active' },
    { id: 2, title: 'Digital Content Creator', location: 'Remote / Hybrid', type: 'Full-time', salary: 'Ksh 55k - 80k', applicants: 45, status: 'Active' },
    { id: 3, title: 'Glow Gallery Supervisor', location: 'Pipeline Sanctuary', type: 'Full-time', salary: 'Ksh 40k - 55k', applicants: 8, status: 'Active' },
    { id: 4, title: 'Logistics Ambassador', location: 'Nairobi', type: 'Contract', salary: 'Ksh 30k - 35k', applicants: 23, status: 'Closed' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to remove this job posting?')) {
      setJobs(jobs.filter(job => job.id !== id));
      toast.success('Job posting removed successfully');
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6 pb-8 text-white">
      {/* Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">Career Management</h1>
          <p className="text-slate-400 text-xs font-medium">Curate and manage the Glow Team opportunities.</p>
        </div>
        <div className="flex items-center gap-4 w-full xl:w-auto">
          <AdminHeaderTools />
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">
            <Plus size={16} /> Post New Role
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card vivid-card-blue p-6">
          <Briefcase className="text-blue-400 mb-4" size={24} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Roles</p>
          <h3 className="text-3xl font-black">{jobs.filter(j => j.status === 'Active').length}</h3>
        </div>
        <div className="glass-card vivid-card-purple p-6">
          <Users className="text-purple-400 mb-4" size={24} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Applicants</p>
          <h3 className="text-3xl font-black">{jobs.reduce((acc, job) => acc + job.applicants, 0)}</h3>
        </div>
        <div className="glass-card p-6 border-white/5 bg-white/[0.02]">
          <Clock className="text-amber-400 mb-4" size={24} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Avg. Time to Hire</p>
          <h3 className="text-3xl font-black">14 Days</h3>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-3 flex flex-col xl:flex-row justify-between items-center gap-4">
        <div className="relative w-full xl:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search roles or locations..."
            className="admin-search-input w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full xl:w-auto">
          <select className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest outline-none focus:border-emerald-500 transition-all">
            <option>All Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="glass-card p-0 overflow-hidden border-white/5">
        <div className="admin-table-wrapper custom-scrollbar">
          <table className="admin-table-container min-w-[900px]">
            <thead>
              <tr className="bg-white/[0.01]">
                <th className="px-6 py-4">Role Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Salary Range</th>
                <th>Applicants</th>
                <th>Status</th>
                <th className="text-right px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="admin-table-row group">
                  <td className="px-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{job.title}</p>
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Posted 3 days ago</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin size={12} />
                      <span className="text-xs font-medium">{job.location}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-[10px] font-bold text-slate-300 bg-white/5 px-2 py-1 rounded-md">{job.type}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                      <DollarSign size={12} /> {job.salary}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black text-xs">
                        {job.applicants}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">New</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {job.status === 'Active' ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle size={12} />
                          <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-rose-400">
                          <XCircle size={12} />
                          <span className="text-[9px] font-black uppercase tracking-widest">Closed</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition-all"><Edit2 size={14} /></button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CareersManagement;
