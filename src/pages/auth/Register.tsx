// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineLocationCity } from 'react-icons/md';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    role: '',
    address: '',
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
      await axios.post('https://linkafrex.onrender.com/api/v1/auth/register/', {
        email: form.email,
        username: form.username,
        password: form.password,
        password_confirm: form.confirmPassword,
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
        role: form.role,
        address: form.address,
        city: form.city,
      });

      alert('✅ Registration successful!');
      navigate('/login');
   } catch (err: any) {
  console.error('Registration error:', err?.response?.data || err.message);

  const errors = err?.response?.data?.errors;
  if (errors) {
    const firstErrorField = Object.keys(errors)[0];
    alert(`❌ ${firstErrorField}: ${errors[firstErrorField]}`);
  } else {
    alert('❌ Registration failed. Check console for details.');
  }
}

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:16px_16px] opacity-10 z-0" />

      <div className="w-full max-w-4xl z-10 bg-white/5 backdrop-blur-sm border border-[#FFD700]/30 rounded-2xl shadow-xl text-white px-8 py-10">
        <h2 className="text-4xl font-bold text-center text-[#FFD700] mb-2">🚛 Create Account</h2>
        <p className="text-center text-gray-400 mb-8">Join LinkaFrex and simplify your logistics journey.</p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>

            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                placeholder="e.g. +254712345678"
                value={form.phone_number}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>

            {/* City */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-[#FFD700]">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street/Building Name"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-[#FFD700]">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-[#FFD700]">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="carrier">Carrier</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#FFD700] text-black font-bold rounded-md hover:bg-yellow-400 transition duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Create Account
          </button>

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
