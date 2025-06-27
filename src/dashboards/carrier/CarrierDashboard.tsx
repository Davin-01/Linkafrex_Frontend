// src/pages/dashboards/CarrierDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Delivery = {
  id: string;
  status: 'In Transit' | 'Delivered';
  destination: string;
  assigned_at: string;
};

const CarrierDashboard: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('/api/carrier/dashboard');
      setDeliveries(response.data);
    } catch (error) {
      console.error('Failed to fetch deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async (id: string) => {
    try {
      await axios.patch(`/api/shipments/${id}/mark-delivered`);
      setDeliveries((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, status: 'Delivered' } : d
        )
      );
    } catch (error) {
      console.error('Failed to update delivery status:', error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-[#FFD700] mb-6">Carrier Dashboard</h1>
      <p className="text-gray-300 mb-4">
        View assigned deliveries and mark orders as delivered.
      </p>

      {loading ? (
        <p className="text-gray-400">Loading deliveries...</p>
      ) : deliveries.length === 0 ? (
        <p className="text-gray-400">No deliveries assigned.</p>
      ) : (
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="border border-gray-800 bg-[#111] rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="font-semibold text-yellow-400">
                    {delivery.id}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Destination: {delivery.destination}
                  </p>
                  <p className="text-sm text-gray-500">
                    Assigned at:{' '}
                    {new Date(delivery.assigned_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  {delivery.status === 'Delivered' ? (
                    <span className="text-green-400 text-sm font-semibold">
                      Delivered
                    </span>
                  ) : (
                    <button
                      onClick={() => markAsDelivered(delivery.id)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded transition"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarrierDashboard;
