import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await login(email, password);

      // If admin, always force to admin dashboard
      if (user.role === 'admin') {
        navigate('/dashboard/admin', { replace: true });
        return;
      }

      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      // Error handled by toast in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F2F6F0]">
      <div className="w-full max-w-xl glass-card p-12 md:p-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-medium mb-3 italic tracking-tight text-[#2D3A2E]">Welcome Back</h1>
          <p className="text-[#5A6B5C] font-light text-lg italic">Log in to your beauty sanctuary</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="form-label">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7B9E87]" size={20} />
              <input
                type="email"
                className="input-field pl-16 py-5"
                placeholder="emma@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="form-label">Password</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7B9E87]" size={20} />
              <input
                type="password"
                className="input-field pl-16 py-5"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-premium py-6 text-base font-black shadow-xl mt-6"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Enter Shop'}
          </button>
        </form>

        <div className="mt-12 text-center text-[#5A6B5C] font-light">
          New to Saint Beauty shop? {' '}
          <Link to="/register" className="text-[#7B9E87] font-bold border-b border-[#7B9E87] pb-1 hover:text-[#2D3A2E] hover:border-[#2D3A2E] transition-all">Create account</Link>
        </div>

        <div className="mt-10 p-6 bg-white/40 border border-[#D8E2D6] rounded-3xl text-[10px] text-[#5A6B5C] flex justify-between italic">
           <div><p className="font-bold uppercase tracking-widest text-[#2D3A2E]">Customer</p><p>customer@heavenly.com / pass123</p></div>
           <div className="text-right"><p className="font-bold uppercase tracking-widest text-[#2D3A2E]">Admin</p><p>admin@heavenly.com / admin123</p></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
