import React, { useState } from 'react';

interface Agent {
  id: number;
  name: string;
  country: string;
  region: string;
  phone: string;
  email: string;
}

const dummyAgents: Agent[] = [
  { id: 1, name: 'James Otieno', country: 'Kenya', region: 'Nairobi', phone: '+254712345678', email: 'j.otieno@linkafrex.com' },
  { id: 2, name: 'Chinonso Umeh', country: 'Nigeria', region: 'Lagos', phone: '+2348123456789', email: 'c.umeh@linkafrex.com' },
  { id: 3, name: 'Aisha Said', country: 'Tanzania', region: 'Dar es Salaam', phone: '+255765432109', email: 'a.said@linkafrex.com' },
  { id: 4, name: 'John Mwine', country: 'Uganda', region: 'Kampala', phone: '+256701234567', email: 'j.mwine@linkafrex.com' },
];

const RegionalAgents: React.FC = () => {
  const [agents] = useState<Agent[]>(dummyAgents);

  return (
    <div className="min-h-screen bg-black text-gold-100 p-6">
      <h1 className="text-3xl font-bold text-gold-400 mb-8">Regional Agents</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gold-400 bg-zinc-900 rounded-lg overflow-hidden">
          <thead className="bg-gold-400 text-black">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Country</th>
              <th className="text-left px-4 py-3">Region</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-t border-gold-400 hover:bg-zinc-800">
                <td className="px-4 py-3">{agent.name}</td>
                <td className="px-4 py-3">{agent.country}</td>
                <td className="px-4 py-3">{agent.region}</td>
                <td className="px-4 py-3">{agent.phone}</td>
                <td className="px-4 py-3">{agent.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionalAgents;
