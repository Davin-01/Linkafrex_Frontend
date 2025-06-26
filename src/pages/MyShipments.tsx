import React from 'react';

const dummyShipments = [
  { id: '001', from: 'Nairobi', to: 'Kampala', status: 'In Transit' },
  { id: '002', from: 'Lagos', to: 'Dar es Salaam', status: 'Delivered' },
];

const MyShipments: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gold-100 p-6">
      <h1 className="text-2xl font-bold text-gold-400 mb-6">My Shipments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gold-400 text-left">
          <thead className="bg-gold-400 text-black">
            <tr>
              <th className="p-3">Shipment ID</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyShipments.map((shipment) => (
              <tr key={shipment.id} className="border-b border-gold-400">
                <td className="p-3">{shipment.id}</td>
                <td className="p-3">{shipment.from}</td>
                <td className="p-3">{shipment.to}</td>
                <td className="p-3">{shipment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyShipments;
