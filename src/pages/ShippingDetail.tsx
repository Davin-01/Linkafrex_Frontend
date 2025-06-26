import React from 'react';
import { useParams } from 'react-router-dom';

const shippingInfo = {
  international: {
    title: 'International Shipping',
    description: 'Cross-border logistics across East African countries with efficient customs handling and secure delivery.',
    image: 'https://source.unsplash.com/featured/?global,shipping'
  },
  national: {
    title: 'National Shipping',
    description: 'Reliable delivery within the country, supporting bulk and individual shipping solutions.',
    image: 'https://source.unsplash.com/featured/?truck,kenya'
  },
  'county-level': {
    title: 'County-Level Delivery',
    description: 'Fast and efficient delivery within counties, including remote areas.',
    image: 'https://source.unsplash.com/featured/?county,logistics'
  },
  express: {
    title: 'Express Shipping',
    description: 'Same-day delivery service for your most urgent shipments.',
    image: 'https://source.unsplash.com/featured/?express,delivery'
  }
};

const ShippingDetail: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const shipping = level ? shippingInfo[level.toLowerCase()] : null;

  if (!shipping) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Shipping level not found.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-6">{shipping.title}</h1>
        <img
          src={shipping.image}
          alt={shipping.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-md shadow-[#FFD700]/20"
        />
        <p className="text-lg text-gray-300">{shipping.description}</p>
      </div>
    </div>
  );
};

export default ShippingDetail;
