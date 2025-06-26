import React from 'react';
import { Truck, Clock, MapPin, Globe, PackageSearch, Boxes, Route, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

const services = [
  {
    icon: <Globe className="w-8 h-8 text-[#FFD700]" />,
    title: 'International Shipping',
    desc: 'Effortless cross-border logistics across East Africa and beyond.',
  },
  {
    icon: <Truck className="w-8 h-8 text-[#FFD700]" />,
    title: 'National Courier',
    desc: 'Nationwide parcel delivery and fulfillment across Kenya.',
  },
  {
    icon: <MapPin className="w-8 h-8 text-[#FFD700]" />,
    title: 'County/State Deliveries',
    desc: 'Quick and affordable county-level logistics in 24–48 hours.',
  },
  {
    icon: <Clock className="w-8 h-8 text-[#FFD700]" />,
    title: 'Errand Services',
    desc: 'Last-mile deliveries and on-demand pickups within hours.',
  },
  {
    icon: <PackageSearch className="w-8 h-8 text-[#FFD700]" />,
    title: 'Real-Time Tracking',
    desc: 'Follow your shipment live with precision tracking tools.',
  },
  {
    icon: <Boxes className="w-8 h-8 text-[#FFD700]" />,
    title: 'Bulk Shipping',
    desc: 'Ideal for businesses needing scheduled large-scale logistics.',
  },
  {
    icon: <Route className="w-8 h-8 text-[#FFD700]" />,
    title: 'Route Optimization',
    desc: 'Smart delivery planning to minimize time and cost.',
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-[#FFD700]" />,
    title: 'Verified Delivery',
    desc: 'Secure hand-off with verification at every destination.',
  },
];

const Services = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="px-4 sm:px-12 md:px-20 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-[#FFD700] mb-4">Our Services</h1>
          <p className="text-gray-300 text-lg">
            Whether you're sending a gift across the city or managing cross-border freight, LinkaFrex has a logistics
            solution tailored for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-[#FFD700] transition-all hover:shadow-lg hover:shadow-[#FFD700]/10"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-[#FFD700] mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
