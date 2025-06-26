import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Flag } from 'lucide-react';
import pic1 from '../../assets/pic1.jpg';

const NationalShipping: React.FC = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section
        className="px-6 md:px-20 py-24 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${pic1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-[#FFD700] mb-4">National Courier Services</h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">Seamless delivery across all 47 counties in Kenya — fast, affordable, and secure.</p>
      </section>

      {/* Content */}
      <section className="px-6 md:px-20 py-16 space-y-10">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 border border-gray-700 rounded-xl shadow">
            <Truck className="text-[#FFD700] w-10 h-10 mb-4" />
            <h2 className="text-xl font-bold text-[#FFD700] mb-2">Nationwide Reach</h2>
            <p className="text-gray-400">We reach every town and village in Kenya through our efficient road logistics network.</p>
          </div>
          <div className="bg-zinc-900 p-6 border border-gray-700 rounded-xl shadow">
            <Flag className="text-[#FFD700] w-10 h-10 mb-4" />
            <h2 className="text-xl font-bold text-[#FFD700] mb-2">Quick Turnaround</h2>
            <p className="text-gray-400">Next-day delivery available in major cities with real-time package tracking.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/createshipment"
            className="bg-[#FFD700] text-black px-6 py-3 font-bold rounded-lg hover:bg-yellow-500 transition"
          >
            Create National Shipment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NationalShipping;
