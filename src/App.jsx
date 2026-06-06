import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Components
import CartDrawer from './components/CartDrawer';
import RealTimeNotifications from './components/RealTimeNotifications';
import { FullPageLoader } from './components/common/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
import ProductDetailPage from './pages/ProductDetailPage';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const CheckoutPage = lazy(() => import('./components/checkout/CheckoutPage'));
const About = lazy(() => import('./pages/About'));
const Stores = lazy(() => import('./pages/Stores'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));

// Legal Pages
const ShippingPolicy = lazy(() => import('./pages/legal/ShippingPolicy'));
const CancellationPolicy = lazy(() => import('./pages/legal/CancellationPolicy'));
const RefundPolicy = lazy(() => import('./pages/legal/RefundPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));

// Customer Pages
const CustomerDashboard = lazy(() => import('./pages/customer/CustomerDashboard'));
const MyOrders = lazy(() => import('./pages/customer/MyOrders'));
const OrderTracking = lazy(() => import('./pages/customer/OrderTracking'));
const ProfileSettings = lazy(() => import('./pages/customer/ProfileSettings'));
const Wishlist = lazy(() => import('./pages/customer/Wishlist'));
const Messages = lazy(() => import('./pages/customer/Messages'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ProductManagement = lazy(() => import('./pages/admin/ProductManagement'));
const OrdersManagement = lazy(() => import('./pages/admin/OrdersManagement'));
const CustomersList = lazy(() => import('./pages/admin/CustomersList'));
const AdminChatPanel = lazy(() => import('./pages/admin/AdminChatPanel'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const InventoryAlerts = lazy(() => import('./pages/admin/InventoryAlerts'));
const PaymentsManagement = lazy(() => import('./pages/admin/PaymentsManagement'));
const CareersManagement = lazy(() => import('./pages/admin/CareersManagement'));
const Settings = lazy(() => import('./pages/admin/Settings'));

import DashboardOverview from './pages/customer/DashboardOverview';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedAdminRoute = ({ children }) => {
  const { role, isAuthenticated, loading } = useAuth();
  if (loading) return <FullPageLoader />;
  if (!isAuthenticated || role !== 'admin') return <Navigate to="/login" replace />;
  return children;
};

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
    <h1 className="text-9xl font-bold text-gray-200 leading-none">404</h1>
    <h2 className="text-4xl font-bold text-gray-800">Page Not Found</h2>
    <p className="text-gray-500 font-medium text-xl max-w-md">The beauty you're looking for isn't here. Let's get you back home.</p>
    <Link to="/" className="btn-premium py-4 px-10 text-xl font-bold transition-all hover:opacity-90">Back Home</Link>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#F2F6F0]">
        <ScrollToTop />

        <Suspense fallback={<FullPageLoader />}>
          <Routes>
            {/* 1. Redirects First */}
            <Route path="/dashboard/customer" element={<Navigate to="/dashboard" replace />} />
            <Route path="/admin" element={<Navigate to="/dashboard/admin" replace />} />

            {/* 2. Public Layout Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />

              {/* Legal Routes */}
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/returns" element={<RefundPolicy />} />
              <Route path="/cancellation" element={<CancellationPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/journal" element={<BlogPage />} />
              <Route path="/services" element={<ServicesPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            {/* Dashboard Layout Routes */}
            <Route element={<DashboardLayout />}>
              {/* Customer Dashboard */}
              <Route path="/dashboard" element={<CustomerDashboard />}>
                <Route index element={<DashboardOverview />} />
                <Route path="orders" element={<MyOrders />} />
                <Route path="track/:orderId?" element={<OrderTracking />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="messages" element={<Messages />} />
              </Route>
            </Route>

            {/* Admin Dashboard Routes (Enterprise Redesign) */}
            <Route element={<AdminLayout />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/admin/products" element={<ProductManagement />} />
              <Route path="/dashboard/admin/orders" element={<OrdersManagement />} />
              <Route path="/dashboard/admin/customers" element={<CustomersList />} />
              <Route path="/dashboard/admin/chat" element={<AdminChatPanel />} />
              <Route path="/dashboard/admin/analytics" element={<Analytics />} />
              <Route path="/dashboard/admin/payments" element={<PaymentsManagement />} />
              <Route path="/dashboard/admin/careers" element={<CareersManagement />} />
              <Route path="/dashboard/admin/inventory" element={<InventoryAlerts />} />
              <Route path="/dashboard/admin/settings" element={<Settings />} />
            </Route>

            {/* Catch-all 404 */}
            <Route element={<PublicLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>

        <CartDrawer />
        <RealTimeNotifications />

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: '1rem',
              background: '#fff',
              color: '#2D2327',
              border: '1px solid #F0E4DC',
              padding: '16px',
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
