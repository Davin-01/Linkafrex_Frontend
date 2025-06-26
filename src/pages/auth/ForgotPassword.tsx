import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post('http://localhost:8000/api/auth/forgot-password/', { email });
      setMessage({ type: 'success', text: 'Password reset link sent to your email.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to send reset link. Please check your email.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/5 border border-[#FFD700]/30 rounded-2xl shadow-xl text-white px-8 py-10 relative z-10">
        <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-4">Forgot Password?</h2>
        <p className="text-center text-gray-400 mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-[#FFD700]">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-[#FFD700]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-black border border-[#FFD700] text-white rounded-md focus:ring-2 focus:ring-[#FFD700]/50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFD700] text-black font-semibold rounded-md hover:bg-yellow-400 transition flex items-center justify-center"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin mr-2" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {message && (
          <div className={`mt-4 text-sm text-center ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
