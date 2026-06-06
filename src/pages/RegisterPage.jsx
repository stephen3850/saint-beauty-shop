import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address1: '',
    address2: '',
    city: '',
    country: 'Kenya',
    state: 'Nairobi',
    zipCode: '',
    phone: '',
    marketingEmails: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form if data is passed from Home Page quick signup
  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        firstName: location.state.firstName || '',
        lastName: location.state.lastName || '',
        email: location.state.email || '',
        city: location.state.city || '',
        phone: location.state.phone || ''
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsSubmitting(true);
    try {
      // Map frontend fields to backend schema
      const backendData = {
        name: formData.firstName + " " + formData.lastName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        address: formData.address1 + (formData.address2 ? ", " + formData.address2 : ""),
        address_1: formData.address1,
        address_2: formData.address2,
        city: formData.city,
        country: formData.country,
        state_province: formData.state,
        zip_code: formData.zipCode,
        phone: formData.phone,
        marketing_emails: formData.marketingEmails
      };

      const user = await register(backendData.name, backendData.email, backendData.password, backendData);

      if (user) {
        toast.success(`Welcome to Saint Beauty Shop, ${formData.firstName}! ✨`);
        navigate('/dashboard'); // Auto-login and go to dashboard
      }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Registration failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-8 text-lg">
            Already have an account? <Link to="/login" className="text-gray-900 border-b border-gray-900 font-medium">Login here.</Link>
          </p>
          <h1 className="text-4xl md:text-5xl font-normal text-gray-800 tracking-tight text-left mb-10">Customer Information</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Customer Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-900">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-900">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-black text-gray-900">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-900">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-900">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="pt-10">
            <h2 className="text-3xl font-normal text-gray-800 mb-8">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-black text-gray-900">Address 1</label>
                <input
                  type="text"
                  name="address1"
                  className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                  placeholder="Address Line 1"
                  value={formData.address1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-black text-gray-900">Address 2</label>
                <input
                  type="text"
                  name="address2"
                  className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                  placeholder="Address Line 2"
                  value={formData.address2}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-gray-900">City</label>
                <input
                  type="text"
                  name="city"
                  className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-gray-900">Country</label>
                <select
                  name="country"
                  className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 bg-white"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option>Kenya</option>
                  <option>Uganda</option>
                  <option>Tanzania</option>
                  <option>Rwanda</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-gray-900">County</label>
                <select
                  name="state"
                  className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 bg-white"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option>Nairobi</option>
                  <option>Mombasa</option>
                  <option>Kiambu</option>
                  <option>Nakuru</option>
                  <option>Kisumu</option>
                  <option>Uasin Gishu</option>
                  <option>Machakos</option>
                  <option>Kajiado</option>
                  <option>Kilifi</option>
                  <option>Laikipia</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-gray-900">Postal Code (Optional)</label>
                <input
                  type="text"
                  name="zipCode"
                  className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                  placeholder="e.g. 00100"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-black text-gray-900">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full border border-gray-200 py-4 px-6 focus:outline-none focus:border-pink-300 transition-all text-gray-800 placeholder-gray-300"
                placeholder="e.g. 0700 000 000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-3 py-4">
            <input
              type="checkbox"
              id="marketingEmails"
              name="marketingEmails"
              className="mt-1 w-4 h-4 border-gray-300 rounded text-pink-500 focus:ring-pink-500"
              checked={formData.marketingEmails}
              onChange={handleChange}
            />
            <label htmlFor="marketingEmails" className="text-sm font-bold text-gray-900 leading-tight">
              I would like to receive emails about promos, special pricing, and limited deals.
            </label>
          </div>

          <div className="flex justify-center pt-6 pb-20">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FA8CA3] text-white px-20 py-4 rounded-md font-bold text-lg hover:opacity-90 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin inline mr-2" size={20} /> : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
