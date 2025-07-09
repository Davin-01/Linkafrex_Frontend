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
  Quote,
  Star,
} from 'lucide-react';
import logisticsBg from '../assets/img1.jpg';
import Footer from '../components/Footer';

const shippingLevels = [
  {
    title: 'International Shipping',
    icon: <Globe className="w-6 h-6 text-[#800000]" />,
    desc: 'Cross-border shipping across East Africa',
    path: '/shipping/international',
  },
  {
    title: 'National Courier',
    icon: <Truck className="w-6 h-6 text-[#800000]" />,
    desc: 'Nationwide delivery within Kenya',
    path: '/shipping/national',
  },
  {
    title: 'County/State Deliveries',
    icon: <MapPin className="w-6 h-6 text-[#800000]" />,
    desc: 'Local county deliveries in 24–48 hrs',
    path: '/shipping/county-level',
  },
  {
    title: 'Errand Service',
    icon: <Clock className="w-6 h-6 text-[#800000]" />,
    desc: 'Same-day priority delivery & errands',
    path: '/shipping/express',
  },
];

const keyFeatures = [
  {
    icon: <Shield className="w-8 h-8 text-[#800000]" />,
    title: 'Secure Shipping',
    desc: 'End-to-end package protection',
  },
  {
    icon: <Package className="w-8 h-8 text-[#800000]" />,
    title: 'Real-Time Tracking',
    desc: 'Live GPS package monitoring',
  },
  {
    icon: <Headphones className="w-8 h-8 text-[#800000]" />,
    title: '24/7 Support',
    desc: 'Always available customer service',
  },
  {
    icon: <Map className="w-8 h-8 text-[#800000]" />,
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
    quote: 'LinkaFrex transformed our supply chain with their reliable cross-border deliveries.',
    author: 'Jane Muthoni, Nairobi',
    role: 'Logistics Manager',
    rating: 5
  },
  {
    quote: 'The real-time tracking gives me peace of mind for all my shipments.',
    author: 'David Omondi, Kampala',
    role: 'Business Owner',
    rating: 5
  },
  {
    quote: 'Express delivery saved us during a critical business deadline.',
    author: 'Sarah Niyonkuru, Kigali',
    role: 'Operations Director',
    rating: 4
  },
];

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      {/* Hero Section */}
      <section
  className="relative flex items-center justify-center px-6 sm:px-12 md:px-20 py-24 md:py-32 min-h-[85vh]"
  style={{
    backgroundImage: `linear-gradient(rgba(128, 0, 0, 0.85), rgba(128, 0, 0, 0.85)), url(${logisticsBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="max-w-5xl mx-auto text-center text-white flex flex-col items-center space-y-6 animate-fade-in">
    <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 shadow-sm">
      <p className="text-sm font-medium tracking-wide">
        East Africa's Leading Logistics Platform
      </p>
    </div>

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
      <span className="text-white">LinkaFrex</span> Logistics Solutions
    </h1>

    <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
      Revolutionizing East African logistics with seamless, secure, and transparent delivery services.
    </p>

    <div className="flex flex-wrap justify-center gap-4 pt-4">
      <Link
        to="/register"
        className="bg-white text-[#800000] hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
      >
        Start Shipping <ArrowRight className="w-5 h-5" />
      </Link>
      <Link
        to="/about"
        className="border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        Learn More <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  </div>
</section>


      {/* Stats */}
      <div className="bg-white py-8 px-6 flex flex-wrap justify-center gap-8 md:gap-16 -mt-10 z-20 rounded-t-3xl shadow-lg mx-4">
        {trustStats.map(([value, label], i) => (
          <div key={i} className="text-center px-4 py-2">
            <div className="text-3xl font-bold text-[#800000]">{value}</div>
            <div className="text-gray-600 text-sm font-medium mt-1">{label}</div>
          </div>
        ))}
      </div>

   {/* Enhanced Maroon-themed Shipping Section */}
<section className="px-6 sm:px-12 md:px-20 py-20 bg-white">
  <div className="max-w-6xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-[#800000] mb-4">Our Shipping Solutions</h2>
      <p className="text-gray-700 max-w-2xl mx-auto text-lg">
        Tailored services for every delivery need across East Africa — fast, safe, and reliable.
      </p>
    </div>

    {/* Maroon Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {shippingLevels.map(({ title, icon, desc, path }, i) => (
        <Link
          to={path}
          key={i}
          className="group relative bg-[#800000] text-white rounded-xl p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="mb-5 mx-auto w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
            {icon}
          </div>

          <h3 className="font-bold text-lg mb-2 group-hover:underline underline-offset-4 decoration-white/50 transition-all duration-300">
            {title}
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">{desc}</p>

          {/* Decorative underline on hover */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-[2px] bg-white transition-all duration-300 rounded-full"></div>
        </Link>
      ))}
    </div>

    {/* Step-by-step Flow */}
    <div className="bg-[#800000]/5 rounded-xl shadow-md p-10 mb-20">
      <h3 className="text-2xl font-bold text-[#800000] text-center mb-10">How It Works</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {[
          { step: '1', label: 'Create Shipment', desc: 'Enter pickup and delivery details.' },
          { step: '2', label: 'Get Quote', desc: 'Review and accept shipping charges.' },
          { step: '3', label: 'Track Delivery', desc: 'Get real-time updates and status.' },
          { step: '4', label: 'Confirm Receipt', desc: 'Recipient confirms and rates service.' },
        ].map(({ step, label, desc }) => (
          <div key={step} className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#800000] text-white flex items-center justify-center font-bold">
              {step}
            </div>
            <h4 className="text-lg font-semibold text-gray-800">{label}</h4>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>




      {/* Features */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#800000]">Why Choose LinkaFrex?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Innovative features designed for your logistics needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
              >
                <div className="mb-4 w-12 h-12 rounded-full bg-[#800000]/10 flex items-center justify-center">
                  {icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#800000]">Client Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear what our customers say about our services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, author, role, rating }, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <Quote className="w-6 h-6 text-[#800000] mb-4 opacity-70" />
                <p className="text-gray-700 italic mb-4">"{quote}"</p>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < rating ? 'text-[#800000] fill-[#800000]' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <p className="font-semibold text-[#800000]">{author}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#800000] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Logistics?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses across East Africa experiencing seamless shipping with LinkaFrex.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-[#800000] font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              Contact Sales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;