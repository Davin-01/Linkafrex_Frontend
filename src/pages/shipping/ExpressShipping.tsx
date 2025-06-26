import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Zap } from 'lucide-react';
import pic1 from '../../assets/pic1.jpg';

const ExpressShipping: React.FC = () => {
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
        <h1 className="text-4xl sm:text-5xl font-bold text-[#FFD700] mb-4">Express Delivery</h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">Same-day, time-critical deliveries for your most urgent needs — fast, secure, and reliable.</p>
      </section>

      <section className="px-6 md:px-20 py-16 space-y-10">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 border border-gray-700 rounded-xl shadow">
            <Clock className="text-[#FFD700] w-10 h-10 mb-4" />
            <h2 className="text-xl font-bold text-[#FFD700] mb-2">Same-Day Dispatch</h2>
            <p className="text-gray-400">Guaranteed delivery within hours, especially in major towns and cities.</p>
          </div>
          <div className="bg-zinc-900 p-6 border border-gray-700 rounded-xl shadow">
            <Zap className="text-[#FFD700] w-10 h-10 mb-4" />
            <h2 className="text-xl font-bold text-[#FFD700] mb-2">Priority Handling</h2>
            <p className="text-gray-400">No queues, no waiting — your package gets top priority from dispatch to drop-off.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/createshipment"
            className="bg-[#FFD700] text-black px-6 py-3 font-bold rounded-lg hover:bg-yellow-500 transition"
          >
            Request Express Delivery
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ExpressShipping;
