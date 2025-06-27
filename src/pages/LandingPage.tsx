import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Truck,
  MapPin,
  Clock,
  Shield,
  Package,
  Headphones,
  Map,
} from 'lucide-react';
import img1 from '../assets/img1.jpg';
import Footer from '../components/Footer';

const shippingLevels = [
  {
    title: 'International Shipping',
    icon: <Globe className="w-6 h-6 text-[#FFD700]" />,
    desc: 'Cross-border shipping across East Africa.',
    path: '/shipping/international',
  },
  {
    title: 'National Courier',
    icon: <Truck className="w-6 h-6 text-[#FFD700]" />,
    desc: 'Nationwide delivery within Kenya.',
    path: '/shipping/national',
  },
  {
    title: 'County/State Deliveries',
    icon: <MapPin className="w-6 h-6 text-[#FFD700]" />,
    desc: 'Local county deliveries in 24–48 hrs.',
    path: '/shipping/county-level',
  },
  {
    title: 'Errand Service',
    icon: <Clock className="w-6 h-6 text-[#FFD700]" />,
    desc: 'Same-day priority delivery & errands.',
    path: '/shipping/express',
  },
];

const keyFeatures = [
  {
    icon: <Shield className="w-8 h-8 text-[#FFD700]" />,
    title: 'Secure Shipping',
    desc: 'End-to-end package protection',
  },
  {
    icon: <Package className="w-8 h-8 text-[#FFD700]" />,
    title: 'Real-Time Tracking',
    desc: 'Live GPS package monitoring',
  },
  {
    icon: <Headphones className="w-8 h-8 text-[#FFD700]" />,
    title: '24/7 Support',
    desc: 'Always available customer service',
  },
  {
    icon: <Map className="w-8 h-8 text-[#FFD700]" />,
    title: 'Wide Coverage',
    desc: 'Across 5+ East African countries',
  },
];

const trustStats = [
  ['50K+', 'Happy Clients'],
  ['5+', 'Countries Served'],
  ['99%', 'On-Time Delivery'],
  ['24/7', 'Support'],
];

const testimonials = [
  {
    quote:
      'LinkaFrex transformed our supply chain with their reliable cross-border deliveries.',
    author: 'Jane Muthoni, Nairobi',
  },
  {
    quote: 'The real-time tracking gives me peace of mind for all my shipments.',
    author: 'David Omondi, Kampala',
  },
  {
    quote: 'Express delivery saved us during a critical business deadline.',
    author: 'Sarah Niyonkuru, Kigali',
  },
];

const LandingPage = () => {
  return (
    <div className="bg-black text-white font-sans antialiased">
      {/* Hero */}
      <section
        className="relative px-4 sm:px-12 md:px-20 py-24 md:py-32 flex flex-col items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#FFD700]">LinkaFrex</span> Logistics Solutions
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Revolutionizing East African logistics with seamless, secure, and transparent delivery services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-[#FFD700] hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20 flex items-center"
            >
              Start Shipping <ArrowRight className="ml-2" />
            </Link>
            <Link
              to="/about"
            className="border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
              >
              Learn More
            </Link>
            
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Stats */}
      <div className="bg-[#111] py-4 px-8 flex flex-wrap justify-center gap-6 md:gap-12 -mt-8 z-20 relative rounded-t-lg mx-4">
        {trustStats.map(([value, label], i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-bold text-[#FFD700]">{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Shipping Options */}
      <section className="bg-black px-4 sm:px-12 md:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#FFD700]">Our Shipping Solutions</h2>
          <p className="text-gray-400 text-lg">Tailored services for every delivery need across East Africa</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shippingLevels.map(({ title, icon, desc, path }, i) => (
  <Link
    to={path}
    key={i}
    className="group bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_#FFD70066] hover:border-[#FFD700] block"
  >
    <div className="relative mb-5 mx-auto w-20 h-20 rounded-full bg-[#FFD700]/10 flex items-center justify-center shadow-[0_0_20px_#FFD70033] group-hover:shadow-[0_0_25px_#FFD70099] transition-all duration-300">
      <div className="absolute -inset-1 rounded-full animate-pulse bg-[#FFD700]/10 group-hover:bg-[#FFD700]/20"></div>
      <div className="relative z-10">{icon}</div>
    </div>
    <h3 className="font-bold text-xl text-[#FFD700] group-hover:text-yellow-400 transition duration-300">
      {title}
    </h3>
    <p className="text-gray-400 group-hover:text-gray-200 transition duration-300">
      {desc}
    </p>
  </Link>
))}

        </div>
      </section>

      {/* Features */}
      <section className="bg-[#111] px-4 sm:px-12 md:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#FFD700]">Why Choose LinkaFrex?</h2>
          <p className="text-gray-400 text-lg">Innovative features designed for your logistics needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyFeatures.map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-black p-6 rounded-xl border border-gray-800 hover:border-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/10"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-black px-4 sm:px-12 md:px-20 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ quote, author }, i) => (
              <div key={i} className="bg-[#111] p-6 rounded-xl border border-gray-800">
                <div className="text-[#FFD700] text-5xl mb-2">"</div>
                <p className="text-gray-300 italic mb-4">{quote}</p>
                <p className="text-[#FFD700] font-medium">— {author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFD700]/05 px-4 sm:px-12 md:px-20 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Logistics?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses across East Africa experiencing seamless shipping with LinkaFrex.
          </p>
          <Link
            to="/register"
            className="bg-[#FFD700] hover:bg-yellow-500 text-black font-bold py-4 px-10 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
