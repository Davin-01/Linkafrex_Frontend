// src/pages/CreateShipment.tsx
import React, { useState, useEffect } from 'react';
import MapPicker from '../components/MapPicker';

const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
const countries = ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Nigeria'];

const CreateShipment: React.FC = () => {
  const [destinationType, setDestinationType] = useState<'local' | 'international'>('local');
  const [location, setLocation] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'dropoff'>('pickup');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState<[number, number]>([-1.2921, 36.8219]); // Nairobi default

  useEffect(() => {
    if (weight && location) {
      const base = destinationType === 'local' ? 500 : 1500;
      const extra = parseFloat(weight) * 50;
      setPrice(base + extra);
    } else {
      setPrice(null);
    }
  }, [weight, location, destinationType]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#FFD700] px-6 py-10 font-sans">
      <div className="max-w-4xl mx-auto bg-[#111] p-8 rounded-xl shadow-lg border border-[#333]">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          Create a Shipment
        </h1>

        {/* Step 1: Destination Type */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-sm uppercase tracking-wide">
            Destination Type
          </label>
          <div className="flex gap-4">
            {['local', 'international'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setDestinationType(type as any);
                  setLocation('');
                }}
                className={`px-4 py-2 rounded-full text-sm transition font-semibold ${
                  destinationType === type
                    ? 'bg-[#FFD700] text-black shadow-md'
                    : 'bg-transparent border border-[#FFD700] hover:bg-[#FFD700] hover:text-black'
                }`}
              >
                {type === 'local' ? 'Local (Kenya)' : 'International (EA + Nigeria)'}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: County/Country */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-sm uppercase tracking-wide">
            {destinationType === 'local' ? 'County' : 'Country'}
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-black border border-[#FFD700] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-[#FFD700]"
          >
            <option value="">Select {destinationType === 'local' ? 'County' : 'Country'}</option>
            {(destinationType === 'local' ? counties : countries).map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Delivery Mode */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-sm uppercase tracking-wide">
            Delivery Mode
          </label>
          <div className="flex gap-4">
            {['pickup', 'dropoff'].map((mode) => (
              <button
                key={mode}
                onClick={() => setDeliveryMode(mode as any)}
                className={`px-4 py-2 rounded-full text-sm transition font-semibold ${
                  deliveryMode === mode
                    ? 'bg-[#FFD700] text-black shadow-md'
                    : 'bg-transparent border border-[#FFD700] hover:bg-[#FFD700] hover:text-black'
                }`}
              >
                {mode === 'pickup' ? 'Pickup' : 'Drop-off'}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Package Details */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-sm uppercase tracking-wide">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-black border border-[#FFD700] rounded-lg px-4 py-3 text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm uppercase tracking-wide">
              Dimensions (cm)
            </label>
            <input
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              className="w-full bg-black border border-[#FFD700] rounded-lg px-4 py-3 text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="L x W x H"
            />
          </div>
        </div>

        {/* Step 5: Map Location */}
        {deliveryMode === 'pickup' && (
          <div className="mb-8">
            <label className="block mb-3 font-medium text-sm uppercase tracking-wide">
              Select Pickup Location
            </label>
            <MapPicker position={pickupCoordinates} setPosition={setPickupCoordinates} />
            <p className="text-sm mt-2 text-gray-300">
              📍 Lat: {pickupCoordinates[0].toFixed(4)} | Lng: {pickupCoordinates[1].toFixed(4)}
            </p>
          </div>
        )}

        {/* Step 6: Delivery Date */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-sm uppercase tracking-wide">
            Delivery Date
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full bg-black border border-[#FFD700] rounded-lg px-4 py-3 text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
        </div>

        {/* Price Estimation */}
        {price !== null && (
          <div className="mb-6 text-lg font-semibold text-center">
            Estimated Price:{' '}
            <span className="text-[#FFD700]">KES {price.toFixed(2)}</span>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center">
          <button className="bg-[#FFD700] text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all duration-200 shadow-md">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateShipment;
