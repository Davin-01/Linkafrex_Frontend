import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaGlobeAfrica } from 'react-icons/fa';
import { MdOutlineLocationCity } from 'react-icons/md';
import { useAuth } from '../auth/AuthContext';

const countries = [
  { name: 'Kenya', emoji: '🇰🇪' },
  { name: 'Nigeria', emoji: '🇳🇬' },
  { name: 'South Africa', emoji: '🇿🇦' },
  { name: 'Uganda', emoji: '🇺🇬' },
  { name: 'Tanzania', emoji: '🇹🇿' },
  { name: 'United States', emoji: '🇺🇸' },
  { name: 'United Kingdom', emoji: '🇬🇧' },
  { name: 'Germany', emoji: '🇩🇪' },
  { name: 'India', emoji: '🇮🇳' },
  { name: 'Canada', emoji: '🇨🇦' },
];

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

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('❌ Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      //TODO: add the link as a proxy in react
      const response = await axios.post('http://localhost:8000/api/auth/register/', {
        full_name: form.fullName,
        email: form.email,
        password: form.password,
        account_type: form.accountType,
        country: form.country,
        city: form.city,
      });

      const { token } = response.data;

      toast.success('✅ Registration successful!');
      login(token); // auto-login & redirect
    } catch (err: any) {
      if (err.response?.data?.detail) {
        toast.error(`❌ ${err.response.data.detail}`);
      } else {
        toast.error('❌ Registration failed. Try again.');
      }
    } finally {
      setLoading(false);
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
            <InputField label="Full Name" name="fullName" icon={<FaUser />} type="text" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
            <InputField label="Email" name="email" icon={<FaEnvelope />} type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
            <CountryDropdown value={form.country} onChange={handleChange} />
            <InputField label="City" name="city" icon={<MdOutlineLocationCity />} type="text" placeholder="City" value={form.city} onChange={handleChange} />
            <InputField label="Password" name="password" icon={<FaLock />} type="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <InputField label="Confirm Password" name="confirmPassword" icon={<FaLock />} type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
          </div>

          {/* Account Type */}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold rounded-md transition duration-300 transform hover:scale-[1.02] shadow-lg ${
              loading ? 'bg-yellow-300 cursor-not-allowed' : 'bg-[#FFD700] text-black hover:bg-yellow-400'
            }`}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Redirect */}
          <p className="text-center text-sm mt-4 text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FFD700] font-medium hover:underline">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

// Reusable InputField
const InputField = ({
  label,
  name,
  icon,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div>
    <label className="text-sm font-medium text-[#FFD700]">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-3 text-[#FFD700]">{icon}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="pl-10 w-full bg-black border border-[#FFD700] text-white py-2 rounded-md focus:ring-2 focus:ring-[#FFD700]/50 outline-none"
      />
    </div>
  </div>
);

// Country dropdown with flags
const CountryDropdown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) => (
  <div>
    <label className="text-sm font-medium text-[#FFD700]">Country</label>
    <select
      name="country"
      value={value}
      onChange={onChange}
      required
      className="w-full bg-black border border-[#FFD700] text-white py-2 px-3 rounded-md"
    >
      <option value="">Choose Country</option>
      {countries.map((c) => (
        <option key={c.name} value={c.name}>
          {`${c.emoji} ${c.name}`}
        </option>
      ))}
    </select>
  </div>
);

export default Register;

