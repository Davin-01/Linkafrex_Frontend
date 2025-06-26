// src/components/UserDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const UserDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 hover:opacity-80 transition"
      >
        <img
          src="https://ui-avatars.com/api/?name=David&background=000&color=FFD700"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <ChevronDown size={18} className="text-[#FFD700]" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-[#222] rounded-md shadow-lg z-50">
          <a
            href="/dashboard/profile"
            className="block px-4 py-2 text-[#FFD700] hover:bg-[#1a1a1a] transition"
          >
            👤 Profile
          </a>
          <button
            onClick={() => alert("Logging out...")}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#1a1a1a] transition"
          >
            🚪 Logout
          </button>
           <button
            onClick={() => alert("Logging out...")}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#1a1a1a] transition"
          >
            🚪 Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
