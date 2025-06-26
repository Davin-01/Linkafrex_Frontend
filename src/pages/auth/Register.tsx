// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaGlobeAfrica } from 'react-icons/fa';
import { MdOutlineLocationCity } from 'react-icons/md';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    country: '',
    city: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('❌ Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/auth/register/', {
        full_name: form.fullName,
        email: form.email,
        password: form.password,
        account_type: form.accountType,
        country: form.country,
        city: form.city,
      });

      alert('✅ Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('❌ Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10 overflow-hidden relative">
      {/* Optional ambient glow grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:16px_16px] opacity-10 z-0" />

      <div className="w-full max-w-4xl z-10 bg-white/5 backdrop-blur-sm border border-[#FFD700]/30 rounded-2xl shadow-xl text-white px-8 py-10">
        <h2 className="text-4xl font-bold text-center text-[#FFD700] mb-2">🚛 Create Account</h2>
        <p className="text-center text-gray-400 mb-8">Join LinkaFrex and simplify your logistics journey.</p>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Two-column flex layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-[#FFD700]"><FaUser /></span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md focus:ring-2 focus:ring-[#FFD700]/50 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-[#FFD700]"><FaEnvelope /></span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md focus:ring-2 focus:ring-[#FFD700]/50"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Country</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-[#FFD700]"><FaGlobeAfrica /></span>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">City</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-[#FFD700]"><MdOutlineLocationCity /></span>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md"
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
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-[#FFD700]"><FaLock /></span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Account Type - Full Width */}
          <div>
            <label className="text-sm font-medium text-[#FFD700]">Account Type</label>
            <select
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
              required
              className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
            >
              <option value="">Choose Account Type</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="carrier">Carrier</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#FFD700] text-black font-bold rounded-md hover:bg-yellow-400 transition duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm mt-4 text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FFD700] font-medium hover:underline">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
