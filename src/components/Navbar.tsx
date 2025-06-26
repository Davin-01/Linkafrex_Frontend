import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-[#FFD700] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="LinkaFrex Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-bold tracking-wide hidden sm:inline">LinkaFrex</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm sm:text-base">
          <Link to="/" className="text-gray-300 hover:text-[#FFD700] transition">Home</Link>
          <Link to="/services" className="text-gray-300 hover:text-[#FFD700] transition">Services</Link>
          <Link to="/about" className="text-gray-300 hover:text-[#FFD700] transition">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-[#FFD700] transition">Contact</Link>
          <Link to="/quote" className="text-gray-300 hover:text-[#FFD700] transition">Get Quote</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/login"
            className="bg-[#FFD700] text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#FFD700] text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#FFD700]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-[#FFD700] px-6 py-4 space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-white">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block hover:text-white">Services</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-white">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:text-white">Contact</Link>
          <Link to="/quote" onClick={() => setIsOpen(false)} className="block hover:text-white">Get Quote</Link>
          <Link to="/createshipment" onClick={() => setIsOpen(false)} className="block hover:text-white">Create</Link>
          <Link to="/trackshipment" onClick={() => setIsOpen(false)} className="block hover:text-white">Track</Link>
          <Link to="/regional-agents" onClick={() => setIsOpen(false)} className="block hover:text-white">Agents</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block hover:text-white">Login</Link>
          <Link to="/register" onClick={() => setIsOpen(false)} className="block hover:text-white">Get Started</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
