// src/components/NotificationPanel.tsx
import React from 'react';

const notifications = [
  { id: 1, message: 'Shipment SH001 has been dispatched.' },
  { id: 2, message: 'New shipment SH004 pending approval.' },
  { id: 3, message: 'Payment received for SH002.' },
];

const NotificationPanel: React.FC = () => {
  return (
    <aside className="bg-[#111] text-[#FFD700] w-full sm:w-72 p-6 h-full border-l border-[#333]">
      <h3 className="text-xl font-semibold mb-4">🔔 Notifications</h3>
      <ul className="space-y-4">
        {notifications.map((note) => (
          <li key={note.id} className="bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#222] transition">
            {note.message}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NotificationPanel;
