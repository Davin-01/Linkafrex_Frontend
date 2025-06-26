// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-[#0d0d0d] text-[#FFD700] w-full sm:w-64 p-6 h-full shadow-lg">
      <div className="mb-10">
        <h2 className="text-2xl font-bold">LinkaFrex</h2>
        <p className="text-sm mt-1">Logistics Dashboard</p>
      </div>

      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-white">🏠 Dashboard</Link>
        <Link to="/createshipment" className="block hover:text-white">📦 Create Shipment</Link>
        <Link to="/trackshipment" className="block hover:text-white">🔍 Track Shipment</Link>
        <Link to="/myshipment" className="block hover:text-white">🧾 My Shipments</Link>
        <Link to="/settings" className="block hover:text-white">⚙️ Settings</Link>
        <button className="mt-10 text-red-400 hover:text-red-200">🚪 Logout</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
