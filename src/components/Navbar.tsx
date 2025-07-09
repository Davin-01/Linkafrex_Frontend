import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate auth check (replace with actual auth logic)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-[#800000] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="LinkaFrex Logo" className="h-10 w-auto" />
          <h1 className="text-xl font-bold tracking-wide hidden sm:inline">LinkaFrex</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm sm:text-base">
          <Link to="/" className="hover:text-[#800000]/80 transition">Home</Link>
          <Link to="/services" className="hover:text-[#800000]/80 transition">Services</Link>
          <Link to="/about" className="hover:text-[#800000]/80 transition">About</Link>
          <Link to="/contact" className="hover:text-[#800000]/80 transition">Contact</Link>
          <Link to="/quote" className="hover:text-[#800000]/80 transition">Get Quote</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-[#800000] text-white px-4 py-2 rounded font-medium hover:bg-[#a00000] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-[#800000] text-[#800000] px-4 py-2 rounded font-medium hover:bg-[#800000] hover:text-white transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#800000] text-white px-4 py-2 rounded font-medium hover:bg-[#a00000] transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#800000]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#fff] text-[#800000] px-6 py-4 space-y-3 font-medium border-t border-gray-200">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Services</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Contact</Link>
          <Link to="/quote" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Get Quote</Link>
          <Link to="/createshipment" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Create</Link>
          <Link to="/trackshipment" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Track</Link>
          <Link to="/regional-agents" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Agents</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block hover:text-[#a00000]">Get Started</Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left hover:text-[#a00000]"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
