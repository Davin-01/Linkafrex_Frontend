// src/pages/shipping/InternationalShipping.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Airplay, ShieldCheck, Truck } from 'lucide-react';
import Footer from '../../components/Footer';
import pic1 from '../../assets/pic1.jpg';

const InternationalShipping: React.FC = () => {
  return (
    <div className="bg-black text-white font-sans">
      {/* Hero Section */}
      <section
        className="relative px-6 md:px-20 py-24 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${pic1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="International Shipping Hero"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FFD700] mb-4">
            International Shipping
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl">
            Seamlessly ship goods across East African borders with our trusted network of air, road, and sea partners.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-20 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-4">What We Offer</h2>
          <p className="text-gray-400">
            Our international service connects Kenya, Uganda, Rwanda, Tanzania, and beyond. We ensure customs clearance, fast dispatch, and safe delivery for all cross-border needs.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Globe className="w-10 h-10 text-[#FFD700]" />}
            title="Cross-Border Reach"
            description="Covering over 5 East African countries with reliable partners."
          />
          <FeatureCard
            icon={<Truck className="w-10 h-10 text-[#FFD700]" />}
            title="Customs Support"
            description="We handle documentation and clearance at major borders."
          />
          <FeatureCard
            icon={<Airplay className="w-10 h-10 text-[#FFD700]" />}
            title="Air & Freight Logistics"
            description="Access air freight & cargo services for urgent shipments."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-10 h-10 text-[#FFD700]" />}
            title="Insured Deliveries"
            description="Every package is tracked and optionally insured end-to-end."
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Ready to ship internationally?
          </h3>
          <Link
            to="/createshipment"
            className="bg-[#FFD700] hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition shadow-lg"
            aria-label="Create international shipment"
          >
            Create International Shipment
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div
    className="bg-[#111] border border-gray-800 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:shadow-[#FFD700]/10 hover:-translate-y-2"
    aria-label={`Feature: ${title}`}
  >
    <div className="mb-4 mx-auto">{icon}</div>
    <h4 className="text-xl font-bold text-[#FFD700] mb-2">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default InternationalShipping;
