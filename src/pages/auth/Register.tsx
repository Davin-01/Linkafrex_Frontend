// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('https://linkafrex.onrender.com/api/v1/auth/register/', {
        username: form.username,
        email: form.email,
        password: form.password,
        password_confirm: form.confirmPassword,
        role: form.role,
      });

      navigate('/login', { 
        state: { 
          successMessage: '✅ Registration successful! Please log in.' 
        } 
      });
    } catch (err: any) {
      console.error('Registration error:', err?.response?.data || err.message);
      const errors = err?.response?.data?.errors;
      
      if (errors) {
        const firstErrorField = Object.keys(errors)[0];
        setError(`${firstErrorField}: ${errors[firstErrorField]}`);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl">
        {/* Left Side - Graphic/Image */}
        <div className="hidden md:flex flex-1 bg-[#800000] items-center justify-center p-8">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">🚛 Welcome to LinkaFrex</h2>
            <p className="text-xl mb-6">Simplify your logistics journey with our platform</p>
            <div className="w-64 h-64 bg-white/20 rounded-full mx-auto flex items-center justify-center">
              <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-white/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 bg-white p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#800000] mb-2">Create Account</h2>
              <p className="text-gray-600">Join our logistics platform today</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Username */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#800000] mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-[#800000]/70" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 py-2.5 pl-10 pr-3 rounded-md focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#800000] mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-[#800000]/70" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 py-2.5 pl-10 pr-3 rounded-md focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#800000] mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-[#800000]/70" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 py-2.5 pl-10 pr-3 rounded-md focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#800000] mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-[#800000]/70" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 py-2.5 pl-10 pr-3 rounded-md focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-[#800000] mb-1">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 py-2.5 px-3 rounded-md focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition appearance-none"
                >
                  <option value="">Select your role</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                  <option value="carrier">Carrier</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-[#800000] text-white font-bold rounded-md hover:bg-[#600000] transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01]'} shadow-md flex items-center justify-center mt-6`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              <p className="text-center text-sm mt-6 text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-[#800000] font-medium hover:underline hover:text-[#600000] transition"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;