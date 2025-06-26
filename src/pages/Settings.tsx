import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-black text-gold-100 p-6">
      <h1 className="text-2xl font-bold text-gold-400 mb-6">Account Settings</h1>

      <form onSubmit={handleSave} className="max-w-lg space-y-6">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-zinc-800 text-white border border-gold-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            placeholder="Leave blank to keep current"
            className="w-full p-3 rounded bg-zinc-800 text-white border border-gold-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-gold-400 text-black font-semibold py-2 px-6 rounded hover:bg-gold-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
