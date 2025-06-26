import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bike } from 'lucide-react';
import pic1 from '../../assets/pic1.jpg';

const CountyShipping: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <section
        className="px-6 md:px-20 py-24 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${pic1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-[#FFD700] mb-4">County-Level Errands</h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">We run your errands and small deliveries across towns and neighborhoods — fast and local.</p>
      </section>

      <section className="px-6 md:px-20 py-16 space-y-10">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 border border-gray-700 rounded-xl shadow">
            <MapPin className="text-[#FFD700] w-10 h-10 mb-4" />
            <h2 className="text-xl font-bold text-[#FFD700] mb-2">Neighborhood Delivery</h2>
            <p className="text-gray-400">From groceries to small packages — we connect estates, markets, and homes efficiently.</p>
          </div>
          <div className="bg-zinc-900 p-6 border border-gray-700 rounded-xl shadow">
            <Bike className="text-[#FFD700] w-10 h-10 mb-4" />
            <h2 className="text-xl font-bold text-[#FFD700] mb-2">Bike & Runner Dispatch</h2>
            <p className="text-gray-400">Our riders and runners ensure low-cost, fast response errands for your everyday needs.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/createshipment"
            className="bg-[#FFD700] text-black px-6 py-3 font-bold rounded-lg hover:bg-yellow-500 transition"
          >
            Book County-Level Errand
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CountyShipping;
