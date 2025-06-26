// src/components/ShippingLevelsSection.tsx
import React, { useState } from 'react';
import { Clock, Truck, Zap, Moon } from 'lucide-react';

const shippingOptions = {
  Local: [
    {
      icon: <Truck className="text-[#FFD700] w-6 h-6" />,
      title: 'Standard Delivery',
      time: '1–2 Days',
      desc: 'Affordable delivery within the county.',
    },
    {
      icon: <Zap className="text-[#FFD700] w-6 h-6" />,
      title: 'Express Delivery',
      time: 'Same Day',
      desc: 'Priority pickup and same-day drop-off.',
    },
    {
      icon: <Moon className="text-[#FFD700] w-6 h-6" />,
      title: 'Overnight Delivery',
      time: 'Next Morning',
      desc: 'Delivered before 9 AM next day.',
    },
  ],
  National: [
    {
      icon: <Truck className="text-[#FFD700] w-6 h-6" />,
      title: 'Standard Freight',
      time: '2–3 Days',
      desc: 'Reliable inter-county service.',
    },
    {
      icon: <Zap className="text-[#FFD700] w-6 h-6" />,
      title: 'Express Linehaul',
      time: 'Next Day',
      desc: 'Fast tracked national delivery.',
    },
    {
      icon: <Moon className="text-[#FFD700] w-6 h-6" />,
      title: 'Overnight Logistics',
      time: 'Before 9 AM',
      desc: 'Nationwide overnight express.',
    },
  ],
  International: [
    {
      icon: <Truck className="text-[#FFD700] w-6 h-6" />,
      title: 'Economy Shipping',
      time: '3–5 Days',
      desc: 'Cross-border at the best value.',
    },
    {
      icon: <Zap className="text-[#FFD700] w-6 h-6" />,
      title: 'Express Freight',
      time: '1–2 Days',
      desc: 'Speedy cross-country transport.',
    },
    {
      icon: <Moon className="text-[#FFD700] w-6 h-6" />,
      title: 'Overnight Export',
      time: 'Next Morning',
      desc: 'Overnight delivery to nearby countries.',
    },
  ],
};

const ShippingLevelsSection = () => {
  const [activeRegion, setActiveRegion] = useState<'Local' | 'National' | 'International'>('Local');

  return (
    <section className="bg-black py-16 px-6 md:px-20 text-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#FFD700]">Choose Your Shipping Level</h2>
        <p className="text-gray-400 mt-2">Tailored delivery across regions & speeds</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-10">
        {(['Local', 'National', 'International'] as const).map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-6 py-2 rounded-full font-semibold border transition ${
              activeRegion === region
                ? 'bg-[#FFD700] text-black'
                : 'border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shippingOptions[activeRegion].map(({ icon, title, time, desc }, idx) => (
          <div
            key={idx}
            className="bg-[#111] border border-gray-800 hover:border-[#FFD700] rounded-xl p-6 transition hover:shadow-lg hover:shadow-[#FFD700]/10"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-[#FFD700] mb-1">{title}</h3>
            <p className="text-sm text-gray-400 mb-2">{time}</p>
            <p className="text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShippingLevelsSection;
