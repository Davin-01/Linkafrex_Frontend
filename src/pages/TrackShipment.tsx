import React, { useState } from 'react';

const TrackShipment: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tracking shipment: ${trackingId}`);
  };

  return (
    <div className="min-h-screen bg-black text-gold-100 p-6">
      <h1 className="text-2xl font-bold text-gold-400 mb-6">Track Shipment</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          type="text"
          placeholder="Enter tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white border border-gold-400"
        />
        <button
          type="submit"
          className="bg-gold-400 text-black font-semibold py-2 px-6 rounded hover:bg-gold-500"
        >
          Track
        </button>
      </form>
    </div>
  );
};

export default TrackShipment;
