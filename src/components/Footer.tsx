import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-[#FFD700] pt-12 pb-6 px-4 sm:px-12 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <img src={logo} alt="LinkaFrex Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">LinkaFrex</span>
          </Link>
          <p className="text-gray-400 text-sm">
            Delivering seamless, secure, and smart logistics across East Africa.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-[#FFD700]">Home</Link></li>
            <li><Link to="/services" className="hover:text-[#FFD700]">Services</Link></li>
            <li><Link to="/about" className="hover:text-[#FFD700]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[#FFD700]">Contact</Link></li>
            <li><Link to="/quote" className="hover:text-[#FFD700]">Get Quote</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center space-x-2"><Phone size={16} /> <span>+254 712 345 678</span></li>
            <li className="flex items-center space-x-2"><Mail size={16} /> <span>support@linkafrex.com</span></li>
            <li className="flex items-center space-x-2"><MapPin size={16} /> <span>Nairobi, Kenya</span></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex space-x-4 text-[#FFD700]">
            <a href="#" className="hover:text-white" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} LinkaFrex. All rights reserved. Made with ❤️ for Africa
      </div>
    </footer>
  );
};

export default Footer;
