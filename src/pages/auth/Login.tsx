import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import axios from '../../api/axiosInstance';

const Login: React.FC = () => {
  const [form, setForm] = useState({ 
    email: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/auth/login/', {
        email: form.email.trim(),
        password: form.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { access, refresh } = response.data.tokens;
      const { role } = response.data.user;

      // Store tokens and user data
      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('role', role);

      // Redirect based on role
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'carrier':
          navigate('/carrier');
          break;
        default:
          navigate('/dashboard');
      }

    } catch (err: any) {
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (err.response) {
        // Handle specific error messages from server
        if (err.response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (err.response.data?.detail) {
          errorMessage = err.response.data.detail;
        }
      } else if (err.request) {
        errorMessage = 'No response from server. Please try again.';
      }

      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl">
        {/* Left Panel - Graphic */}
        <div className="hidden md:flex flex-1 bg-[#800000] items-center justify-center p-8">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">🔐 Welcome Back</h2>
            <p className="text-xl mb-6">Track and manage your shipments with ease</p>
            <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-white/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#800000] mb-2">Login</h2>
              <p className="text-gray-600">Enter your credentials to continue</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#800000] mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-[#800000]/70" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 py-2.5 rounded-md focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#800000] mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-[#800000]/70" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 py-2.5 rounded-md focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#800000] focus:ring-[#800000] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#800000] hover:text-[#600000] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-[#800000] text-white font-bold rounded-md hover:bg-[#600000] transition ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01]'
                } shadow-md flex items-center justify-center mt-4`}
              >
                {loading ? (
                  <>
                    <ImSpinner2 className="animate-spin mr-2" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              {/* Register Link */}
              <p className="text-center text-sm mt-6 text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-[#800000] font-medium hover:underline hover:text-[#600000]"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;