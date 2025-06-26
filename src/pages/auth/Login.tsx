import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { useAuth } from '../auth/AuthContext'; 

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // 👈 use context login

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login/', form);
      const { token } = res.data;

      login(token); // 👈 let AuthContext handle token decoding and navigation
    } catch (err) {
      alert('❌ Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:16px_16px] opacity-10 z-0" />
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-[#FFD700]/30 rounded-2xl shadow-xl text-white px-8 py-10 z-10">
        <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-2">🔐 Welcome Back</h2>
        <p className="text-center text-gray-400 mb-8">Log in to manage your shipments and track packages.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#FFD700]">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-[#FFD700]"><FaEnvelope /></span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md focus:ring-2 focus:ring-[#FFD700]/50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#FFD700]">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-[#FFD700]"><FaLock /></span>
              <input
                type="password"
                name="password"
                required
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md focus:ring-2 focus:ring-[#FFD700]/50"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFD700] text-black font-bold rounded-md hover:bg-yellow-400 transition duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin mr-2" /> Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-1">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-400 hover:text-[#FFD700] transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm mt-4 text-gray-400">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[#FFD700] font-medium hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

