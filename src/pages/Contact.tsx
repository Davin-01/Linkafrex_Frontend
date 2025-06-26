import React, { useState } from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us. We will get back to you shortly!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="px-4 sm:px-12 md:px-20 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-[#FFD700] mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">
            Have questions, suggestions, or need help? We’re just a message away.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[#111] p-8 rounded-xl border border-gray-800 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-[#FFD700] block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border border-[#FFD700] text-white rounded-md focus:ring-2 focus:ring-[#FFD700]/50"
              />
            </div>
            <div>
              <label className="text-sm text-[#FFD700] block mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border border-[#FFD700] text-white rounded-md focus:ring-2 focus:ring-[#FFD700]/50"
              />
            </div>
            <div>
              <label className="text-sm text-[#FFD700] block mb-1">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border border-[#FFD700] text-white rounded-md focus:ring-2 focus:ring-[#FFD700]/50"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#FFD700] text-black font-semibold rounded-md hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
