import React, { useState } from 'react';

const Affiliate: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Affiliate Application:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-gold-400 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-xl border border-gold-400 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Affiliate Program</h2>
        <p className="text-center mb-8 text-gold-300">
          Join the LinkAfrex affiliate program and earn rewards for every shipment you refer.
        </p>

        {submitted ? (
          <div className="text-center text-green-400">
            🎉 Thank you for applying! We'll contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-black border border-gold-400 text-white placeholder-gold-300 focus:ring-gold-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-black border border-gold-400 text-white placeholder-gold-300 focus:ring-gold-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm mb-1">
                Website / Platform (Optional)
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-3 rounded bg-black border border-gold-400 text-white placeholder-gold-300 focus:ring-gold-500 focus:outline-none"
                placeholder="https://yourplatform.com"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold-400 text-black font-semibold rounded hover:bg-gold-300 transition"
            >
              Apply Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Affiliate;

