import React from 'react';
import { Users, Globe, Truck, Shield } from 'lucide-react';
import Footer from '../components/Footer';

const aboutStats = [
  { icon: <Users className="w-6 h-6 text-[#FFD700]" />, label: '50K+', desc: 'Satisfied Customers' },
  { icon: <Globe className="w-6 h-6 text-[#FFD700]" />, label: '5+', desc: 'Countries Served' },
  { icon: <Truck className="w-6 h-6 text-[#FFD700]" />, label: '1M+', desc: 'Shipments Delivered' },
  { icon: <Shield className="w-6 h-6 text-[#FFD700]" />, label: '99%', desc: 'Delivery Success Rate' },
];

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="px-4 sm:px-12 md:px-20 py-20 bg-gradient-to-br from-[#111] to-black">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#FFD700]">About LinkaFrex</h1>
          <p className="text-lg text-gray-300">
            LinkaFrex is more than a logistics platform — it's a movement to redefine delivery across Africa.
            We are on a mission to build a smarter, faster, and more transparent logistics ecosystem.
          </p>
        </div>

        {/* Vision + Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 max-w-5xl mx-auto">
          <div className="bg-[#111] p-6 border border-gray-800 rounded-lg hover:shadow-lg hover:border-[#FFD700] transition">
            <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              To be the most trusted logistics partner in Africa, making delivery seamless for everyone—from small
              businesses to enterprise and individuals.
            </p>
          </div>
          <div className="bg-[#111] p-6 border border-gray-800 rounded-lg hover:shadow-lg hover:border-[#FFD700] transition">
            <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To connect people, businesses, and communities by offering reliable and transparent shipping,
              powered by technology and regional partnerships.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-5xl mx-auto text-center mb-20">
          {aboutStats.map(({ icon, label, desc }, i) => (
            <div key={i}>
              <div className="flex justify-center mb-2">{icon}</div>
              <div className="text-xl font-semibold text-[#FFD700]">{label}</div>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-6">Our Core Values</h2>
          <p className="text-gray-400 mb-10">
            At LinkaFrex, we believe in empowering people through logistics. Our values are the foundation of our success.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-[#111] p-5 rounded-lg border border-gray-800 hover:border-[#FFD700] transition">
              <h3 className="font-semibold text-lg text-[#FFD700] mb-2">Integrity</h3>
              <p className="text-gray-400">We build trust by doing the right thing, always.</p>
            </div>
            <div className="bg-[#111] p-5 rounded-lg border border-gray-800 hover:border-[#FFD700] transition">
              <h3 className="font-semibold text-lg text-[#FFD700] mb-2">Innovation</h3>
              <p className="text-gray-400">We leverage technology to create better experiences for our users.</p>
            </div>
            <div className="bg-[#111] p-5 rounded-lg border border-gray-800 hover:border-[#FFD700] transition">
              <h3 className="font-semibold text-lg text-[#FFD700] mb-2">Customer First</h3>
              <p className="text-gray-400">We listen, we care, and we deliver beyond expectations.</p>
            </div>
            <div className="bg-[#111] p-5 rounded-lg border border-gray-800 hover:border-[#FFD700] transition">
              <h3 className="font-semibold text-lg text-[#FFD700] mb-2">Collaboration</h3>
              <p className="text-gray-400">We grow together through teamwork and strong partnerships.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
