import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import {
  CreditCard, Search, Download, Loader2, Calendar,
  DollarSign, CheckCircle, Clock, ShieldCheck,
  ChevronRight, ArrowUpRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/admin-dashboard.css';
import AdminHeaderTools from '../../components/admin/AdminHeaderTools';

const PaymentsManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      // Filter orders that have payment info or consider all orders as payment records
      setPayments(data);
    } catch (err) {
      toast.error("Failed to fetch payment records");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Order ID', 'Customer', 'Amount', 'Method', 'Date', 'Status'];
    const rows = filteredPayments.map(p => [
      p.transaction_id || 'N/A',
      p.order_id,
      p.customer_name,
      p.total,
      p.payment_method || 'Card',
      new Date(p.order_date).toLocaleDateString(),
      p.payment_confirmed ? 'Confirmed' : 'Pending'
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `hbs_payments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Payment logs exported!');
  };

  const filteredPayments = payments.filter(p => {
    const matchesMethod = filterMethod === 'all' || (p.payment_method || '').toLowerCase() === filterMethod.toLowerCase();
    const matchesSearch = (p.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (p.order_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (p.transaction_id || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMethod && matchesSearch;
  });

  const stats = {
    totalRevenue: payments.reduce((acc, curr) => acc + (curr.total || 0), 0),
    confirmedPayments: payments.filter(p => p.payment_confirmed || p.status !== 'pending').length,
    pendingPayments: payments.filter(p => !p.payment_confirmed && p.status === 'pending').length
  };

  return (
    <div className="animate-fade-in space-y-6 pb-8">
      {/* Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1 text-white">Payment Ledger</h1>
            <p className="text-slate-400 text-xs font-medium">Real-time record of all financial transactions.</p>
          </div>
          <AdminHeaderTools />
        </div>
        <button
          onClick={handleExportCSV}
          className="w-full xl:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 border border-white/10 rounded-xl text-xs font-bold text-white transition-all hover:bg-slate-700"
        >
          <Download size={16} className="text-emerald-400" /> Export Logs
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card vivid-card-green p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <DollarSign className="text-emerald-500 mb-4" size={24} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Gross Volume</p>
          <h3 className="text-3xl font-black text-white">${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="glass-card vivid-card-blue p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <ShieldCheck className="text-blue-500 mb-4" size={24} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Confirmed Transactions</p>
          <h3 className="text-3xl font-black text-white">{stats.confirmedPayments}</h3>
        </div>

        <div className="glass-card p-6 border-white/5 bg-white/[0.02] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <Clock className="text-amber-500 mb-4" size={24} />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Pending Clearance</p>
          <h3 className="text-3xl font-black text-white">{stats.pendingPayments}</h3>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-card vivid-card-purple p-3 flex flex-col xl:flex-row justify-between items-center gap-4">
        <div className="flex bg-slate-900/60 p-0.5 rounded-lg border border-white/5 gap-0.5 w-full xl:w-auto">
          {['all', 'M-Pesa', 'Card', 'VISA'].map(m => (
            <button
              key={m}
              onClick={() => setFilterMethod(m)}
              className={`flex-1 xl:flex-none px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${
                filterMethod === m ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="relative w-full xl:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search Trans ID, Order ID or Customer..."
            className="admin-search-input w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card p-0 overflow-hidden border-white/5">
        <div className="admin-table-wrapper custom-scrollbar">
          <table className="admin-table-container min-w-[900px]">
            <thead>
              <tr className="bg-white/[0.01]">
                <th className="px-6 py-4">Transaction Details</th>
                <th>Order Reference</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th className="text-right px-6">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="py-20 text-center"><Loader2 className="animate-spin text-purple-500 mx-auto" size={32} /></td></tr>
              ) : filteredPayments.map((payment, idx) => (
                <tr key={payment.id} className="admin-table-row group">
                  <td className="px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-purple-400 border border-white/5">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white tracking-widest uppercase">{payment.transaction_id || `TRX-${payment.id}K92L`}</p>
                        <p className="text-[9px] text-slate-500 font-bold">Processed via Gateway</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-mono text-blue-400 font-bold">#{payment.order_id}</span>
                       <ArrowUpRight size={10} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-400 border border-white/5">{payment.customer_name?.charAt(0)}</div>
                      <span className="text-xs font-medium text-white">{payment.customer_name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs font-black text-white">${Number(payment.total).toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                      payment.payment_method === 'M-Pesa' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-blue-500/20 text-blue-400 bg-blue-500/5'
                    }`}>
                      {payment.payment_method || 'VISA'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {payment.payment_confirmed || payment.status !== 'pending' ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle size={12} />
                          <span className="text-[9px] font-black uppercase">Cleared</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <Clock size={12} className="animate-pulse" />
                          <span className="text-[9px] font-black uppercase">Pending</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-right px-6">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-white">{new Date(payment.order_date).toLocaleDateString()}</span>
                      <span className="text-[9px] text-slate-500 font-medium">{new Date(payment.order_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-20 text-center space-y-3">
                    <p className="text-slate-500 italic">No transactions found matching your criteria.</p>
                    <button onClick={() => {setSearchTerm(''); setFilterMethod('all');}} className="text-purple-400 text-[10px] font-black uppercase tracking-widest border-b border-purple-400/30">Clear all filters</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsManagement;
