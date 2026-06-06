import React from 'react';
import { AlertCircle, RefreshCw, Heart } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center bg-heavenly-pearl">
          <div className="bg-white/80 backdrop-blur-2xl p-16 rounded-[4rem] border border-heavenly-rose/20 shadow-[0_30px_100px_rgba(74,44,58,0.1)] max-w-xl animate-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto text-red-500 mb-10 shadow-xl shadow-red-100/50">
              <AlertCircle size={48} />
            </div>
            <h1 className="text-4xl font-black text-heavenly-dark mb-4 italic tracking-tight">Pardon our glow...</h1>
            <p className="text-gray-500 mb-12 font-medium text-lg leading-relaxed italic">
              We've encountered a small ripple in the sanctuary. <br />
              Don't worry, your items and profile are perfectly safe.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="btn-rose-gold w-full py-6 flex items-center justify-center gap-4 text-xl"
              >
                <RefreshCw size={24} /> Refresh Sanctuary
              </button>
              <p className="flex items-center justify-center gap-2 text-xs font-black text-gray-300 uppercase tracking-widest pt-4">
                Still having trouble? <a href="/contact" className="text-heavenly-rose underline decoration-2 underline-offset-4">Talk to an Angel</a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
