import React, { useState, useEffect } from 'react';
import {
  Package, TrendingUp, Search, Plus, Truck,
  FileText, Calculator, Bell, User, Menu, X, LogOut,
  MapPin, Calendar, ArrowRight, Shield, Headphones
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define color constants
const COLORS = {
  maroon: '#800000',
  lightMaroon: '#a04040',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  darkGray: '#333333'
};

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [shipments, setShipments] = useState([]);
  
  const navigate = useNavigate();

  // Load shipments from localStorage on component mount
  useEffect(() => {
    const savedShipments = localStorage.getItem('shipments');
    if (savedShipments) {
      setShipments(JSON.parse(savedShipments));
    }
  }, []);

  const handleTrackPackage = () => {
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }
    navigate(`/tracking/${trackingNumber}`);
    setTrackingNumber('');
    setShowTrackingModal(false);
  };

  const ActionCard = ({ icon: Icon, title, description, actionText, onClick, color }) => (
    <div 
      className="bg-white rounded-lg shadow-sm p-6 border hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
      style={{ borderColor: COLORS.lightGray }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="p-3 rounded-full"
          style={{ backgroundColor: `${color}20` }} // 20% opacity of the color
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
          <button 
            className="mt-3 flex items-center gap-1"
            style={{ color: COLORS.maroon }}
          >
            {actionText} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div 
      className="bg-white rounded-lg shadow-sm p-5 border"
      style={{ borderColor: COLORS.lightGray }}
    >
      <div 
        className="p-2 rounded-full w-fit mb-3"
        style={{ backgroundColor: `${color}20` }} // 20% opacity of the color
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );

  const renderShipmentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.darkGray }}>Your Shipments</h2>
        <button 
          onClick={() => navigate('/dashboard/create')}
          className="px-5 py-2.5 rounded-lg flex items-center gap-2"
          style={{ backgroundColor: COLORS.maroon, color: COLORS.white }}
        >
          <Plus className="w-5 h-5" /> New Shipment
        </button>
      </div>
      
      {shipments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center border" style={{ borderColor: COLORS.lightGray }}>
          <Package className="mx-auto w-12 h-12 mb-4" style={{ color: COLORS.maroon }} />
          <h3 className="text-lg font-medium mb-2">No shipments yet</h3>
          <p className="text-gray-600 mb-4">Create your first shipment to get started</p>
          <button
            onClick={() => navigate('/dashboard/create')}
            className="px-5 py-2.5 rounded-lg inline-flex items-center gap-2"
            style={{ backgroundColor: COLORS.maroon, color: COLORS.white }}
          >
            <Plus className="w-5 h-5" /> Create Shipment
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border" style={{ borderColor: COLORS.lightGray }}>
          <div className="grid grid-cols-12 p-4 font-medium border-b" style={{ backgroundColor: COLORS.lightGray }}>
            <div className="col-span-3">Tracking #</div>
            <div className="col-span-3">Destination</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Actions</div>
          </div>
          {shipments.map((shipment, index) => (
            <div 
              key={index} 
              className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50"
              style={{ borderColor: COLORS.lightGray }}
            >
              <div className="col-span-3 font-medium" style={{ color: COLORS.maroon }}>{shipment.trackingNumber}</div>
              <div className="col-span-3">{shipment.to.city}, {shipment.to.country}</div>
              <div className="col-span-2">
                <span className="px-2 py-1 rounded-full text-xs" 
                  style={{ 
                    backgroundColor: shipment.status === 'Delivered' ? '#e6f7e6' : '#fff8e6',
                    color: shipment.status === 'Delivered' ? '#2e7d32' : '#ff8f00'
                  }}
                >
                  {shipment.status}
                </span>
              </div>
              <div className="col-span-2 text-sm text-gray-600">{new Date(shipment.date).toLocaleDateString()}</div>
              <div className="col-span-2">
                <button 
                  onClick={() => navigate(`/tracking/${shipment.trackingNumber}`)}
                  className="text-sm hover:underline"
                  style={{ color: COLORS.maroon }}
                >
                  Track
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightGray }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 border-b" style={{ borderColor: COLORS.lightGray }}>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden hover:text-gray-900"
              style={{ color: COLORS.maroon }}
              aria-label="Toggle menu"
            >
              <Menu />
            </button>
            <h1 className="font-bold text-xl flex items-center gap-2" style={{ color: COLORS.darkGray }}>
              <Package style={{ color: COLORS.maroon }} /> ShipTrack Pro
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowTrackingModal(true)}
              className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              style={{ backgroundColor: COLORS.lightGray, color: COLORS.darkGray }}
            >
              <Search className="w-4 h-4" /> Track
            </button>
            
            <button className="relative p-1 hover:text-gray-900 transition-colors" style={{ color: COLORS.maroon }}>
              <Bell className="w-6 h-6" />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                className="flex items-center gap-2"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.maroon}20`, color: COLORS.maroon }}
                >
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden md:inline" style={{ color: COLORS.darkGray }}>Welcome</span>
              </button>
              
              {isProfileOpen && (
                <div 
                  className="absolute right-0 mt-2 shadow-md rounded-lg p-2 z-40 border"
                  style={{ backgroundColor: COLORS.white, borderColor: COLORS.lightGray }}
                >
                  <button 
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 w-full text-sm hover:bg-gray-100 p-2 rounded-md"
                    style={{ color: COLORS.darkGray }}
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('authToken');
                      navigate('/login');
                      toast.success('Logged out successfully');
                    }}
                    className="flex items-center gap-2 w-full text-sm hover:bg-gray-100 p-2 rounded-md"
                    style={{ color: COLORS.maroon }}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${isMobileMenuOpen ? 'block fixed inset-y-0 z-40' : 'hidden'} md:block bg-white shadow-sm w-64 min-h-screen`}
          style={{ borderRight: `1px solid ${COLORS.lightGray}` }}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg" style={{ color: COLORS.darkGray }}>Dashboard</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden hover:text-gray-700"
                style={{ color: COLORS.maroon }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1">
              <ul className="space-y-1">
                {[
                  { tab: 'overview', icon: Package, label: 'Overview' },
                  { tab: 'shipments', icon: Truck, label: 'Shipments' },
                  { tab: 'analytics', icon: TrendingUp, label: 'Analytics' },
                  { tab: 'invoices', icon: FileText, label: 'Invoices' },
                  { tab: 'addresses', icon: MapPin, label: 'Address Book' },
                  { tab: 'scheduled', icon: Calendar, label: 'Scheduled' }
                ].map(({ tab, icon: Icon, label }) => (
                  <li key={tab}>
                    <button
                      onClick={() => {
                        setActiveTab(tab);
                        setIsMobileMenuOpen(false);
                        if (tab !== 'overview') {
                          navigate(`/${tab}`);
                        }
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors ${
                        activeTab === tab 
                          ? 'font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: activeTab === tab ? `${COLORS.maroon}10` : 'transparent',
                        color: activeTab === tab ? COLORS.maroon : COLORS.darkGray
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-auto p-4 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
              <h3 className="text-sm font-medium mb-2" style={{ color: COLORS.darkGray }}>Need help?</h3>
              <button 
                onClick={() => navigate('/support')}
                className="w-full text-sm hover:underline flex items-center gap-2"
                style={{ color: COLORS.maroon }}
              >
                <Headphones className="w-4 h-4" /> Contact Support
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <section 
                className="bg-white rounded-lg shadow-sm p-6 md:p-8 border"
                style={{ borderColor: COLORS.lightGray }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.darkGray }}>Welcome back!</h2>
                    <p className="mt-2" style={{ color: COLORS.darkGray }}>
                      Ready to ship your next package? Get started with one of the options below.
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/dashboard/create')}
                    className="px-5 py-2.5 text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
                    style={{ backgroundColor: COLORS.maroon }}
                  >
                    <Plus className="w-5 h-5" /> New Shipment
                  </button>
                </div>
              </section>

              {/* Quick Actions */}
              <section>
                <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.darkGray }}>Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ActionCard
                    icon={Plus}
                    title="Create New Shipment"
                    description="Ship a package with our easy-to-use wizard"
                    actionText="Start shipping"
                    onClick={() => navigate('/dashboard/create')}
                    color={COLORS.maroon}
                  />
                  <ActionCard
                    icon={Search}
                    title="Track Package"
                    description="Check the status of your shipments"
                    actionText="Track now"
                    onClick={() => setShowTrackingModal(true)}
                    color={COLORS.maroon}
                  />
                  <ActionCard
                    icon={TrendingUp}
                    title="View Analytics"
                    description="See your shipping history and trends"
                    actionText="View analytics"
                    onClick={() => navigate('/analytics')}
                    color={COLORS.maroon}
                  />
                </div>
              </section>

              {/* Features */}
              <section>
                <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.darkGray }}>Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FeatureCard
                    icon={Truck}
                    title="Multiple Carriers"
                    description="Compare rates from top carriers"
                    color={COLORS.maroon}
                  />
                  <FeatureCard
                    icon={Shield}
                    title="Secure Payments"
                    description="Safe and encrypted transactions"
                    color={COLORS.maroon}
                  />
                  <FeatureCard
                    icon={MapPin}
                    title="Address Book"
                    description="Save frequent destinations"
                    color={COLORS.maroon}
                  />
                  <FeatureCard
                    icon={Calendar}
                    title="Scheduling"
                    description="Plan shipments in advance"
                    color={COLORS.maroon}
                  />
                </div>
              </section>

              {/* Getting Started */}
              <section 
                className="rounded-lg p-6 border"
                style={{ 
                  backgroundColor: `${COLORS.maroon}05`,
                  borderColor: `${COLORS.maroon}20`
                }}
              >
                <h3 className="text-xl font-semibold mb-3" style={{ color: COLORS.maroon }}>Getting Started</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium" style={{ color: COLORS.maroon }}>1. Create a shipment</h4>
                    <p className="text-sm" style={{ color: COLORS.lightMaroon }}>
                      Enter your package details and choose a carrier
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium" style={{ color: COLORS.maroon }}>2. Print label</h4>
                    <p className="text-sm" style={{ color: COLORS.lightMaroon }}>
                      Download and print your shipping label
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium" style={{ color: COLORS.maroon }}>3. Ship your package</h4>
                    <p className="text-sm" style={{ color: COLORS.lightMaroon }}>
                      Drop off or schedule a pickup
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'shipments' && renderShipmentsTab()}
        </main>
      </div>

      {/* Tracking Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 ${showTrackingModal ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg shadow-md max-w-md w-full relative animate-fade-in">
          <div 
            className="flex justify-between items-center p-4 border-b"
            style={{ borderColor: COLORS.lightGray }}
          >
            <h3 className="font-semibold text-lg" style={{ color: COLORS.darkGray }}>Track Your Package</h3>
            <button 
              onClick={() => setShowTrackingModal(false)}
              style={{ color: COLORS.maroon }}
            >
              <X />
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="tracking-number" className="block text-sm font-medium mb-1" style={{ color: COLORS.darkGray }}>
                  Enter Tracking Number
                </label>
                <input
                  id="tracking-number"
                  type="text"
                  placeholder="e.g. TRK123456789"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: COLORS.lightGray,
                    focusBorderColor: COLORS.maroon,
                    focusRingColor: COLORS.maroon
                  }}
                />
              </div>
              <button
                onClick={handleTrackPackage}
                disabled={!trackingNumber.trim()}
                className={`w-full px-4 py-2 rounded-md text-white transition-colors ${
                  !trackingNumber.trim() ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-opacity-90'
                }`}
                style={{ 
                  backgroundColor: !trackingNumber.trim() ? '#cccccc' : COLORS.maroon 
                }}
              >
                Track Package
              </button>
              <p className="text-sm" style={{ color: COLORS.darkGray }}>
                Don't know your tracking number?{' '}
                <button 
                  onClick={() => {
                    setShowTrackingModal(false);
                    navigate('/shipments');
                  }}
                  className="hover:underline"
                  style={{ color: COLORS.maroon }}
                >
                  View your shipments
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;