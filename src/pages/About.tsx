import React from 'react';
import { Users, Globe, Truck, Shield, Map, Search, Clock4, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
import pic1 from '../assets/pic1.jpg'; // background image
import img1 from '../assets/img1.jpg';
// import activity2 from '../assets/activity2.jpg';
// import activity3 from '../assets/activity3.jpg';
// import activity4 from '../assets/activity4.jpg';

const aboutStats = [
  { icon: <Users className="w-6 h-6 text-[#FFD700]" />, label: '50K+', desc: 'Satisfied Customers' },
  { icon: <Globe className="w-6 h-6 text-[#FFD700]" />, label: '5+', desc: 'Countries Served' },
  { icon: <Truck className="w-6 h-6 text-[#FFD700]" />, label: '1M+', desc: 'Shipments Delivered' },
  { icon: <Shield className="w-6 h-6 text-[#FFD700]" />, label: '99%', desc: 'Delivery Success Rate' },
];

const functionalities = [
  { icon: <Map className="w-6 h-6 text-[#FFD700]" />, title: 'Route Optimization', desc: 'AI-driven routing for faster deliveries.' },
  { icon: <Search className="w-6 h-6 text-[#FFD700]" />, title: 'Real-Time Tracking', desc: 'Track your shipment live end-to-end.' },
  { icon: <Clock4 className="w-6 h-6 text-[#FFD700]" />, title: 'Scheduled Shipments', desc: 'Flexible pickup and delivery times.' },
  { icon: <CheckCircle2 className="w-6 h-6 text-[#FFD700]" />, title: 'Carrier System', desc: 'Manage agents and regional delivery.' },
];

const activityImages = [img1, img1, img1, img1];

const About = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed text-white min-h-screen"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${pic1})` }}
    >
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#FFD700]">About LinkaFrex</h1>
          <p className="text-gray-300 text-base sm:text-lg">
            LinkaFrex is a mission-driven logistics platform dedicated to transforming how goods move across Africa.
            We empower people and businesses with smart, fast, and reliable delivery solutions.
          </p>
        </div>

        {/* Vision and Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#111] border border-gray-800 p-6 rounded-lg hover:border-[#FFD700] transition">
            <h2 className="text-2xl font-bold mb-3 text-[#FFD700]">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To be Africa’s most trusted logistics partner, simplifying delivery for everyone.
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 p-6 rounded-lg hover:border-[#FFD700] transition">
            <h2 className="text-2xl font-bold mb-3 text-[#FFD700]">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To connect businesses and communities with affordable, technology-driven logistics services.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
          {aboutStats.map(({ icon, label, desc }, i) => (
            <div key={i}>
              <div className="mb-2 flex justify-center">{icon}</div>
              <h3 className="text-xl font-semibold text-[#FFD700]">{label}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* Operational Activities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FFD700]">Operational Activities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {activityImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-gray-800 hover:scale-105 transition-all">
                <img src={img} alt={`activity-${i}`} className="w-full h-48 object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Platform Functionalities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-8">Platform Features</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {functionalities.map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-[#FFD700] transition"
              >
                <div className="mb-3 flex justify-center">{icon}</div>
                <h3 className="text-xl font-bold text-[#FFD700] mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-6">Our Core Values</h2>
          <p className="text-gray-400 mb-10">
            At LinkaFrex, we empower people and communities through thoughtful logistics.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              ['Integrity', 'We build trust by doing the right thing, always.'],
              ['Innovation', 'We use technology to improve every delivery.'],
              ['Customer First', 'We care deeply about our users’ experiences.'],
              ['Collaboration', 'We work hand-in-hand with partners and communities.'],
            ].map(([title, desc], i) => (
              <div key={i} className="bg-[#111] p-5 rounded-lg border border-gray-800 hover:border-[#FFD700] transition">
                <h3 className="text-lg font-semibold text-[#FFD700] mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
