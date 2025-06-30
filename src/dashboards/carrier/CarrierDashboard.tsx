import React, { useState, useEffect } from 'react';
import {
  Package,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  AlertTriangle,
  Camera,
  MessageCircle,
  Navigation,
  Menu,
  X,
  User,
  Settings,
  ChevronDown,
  ChevronUp,
  Map,
  Home,
  Truck,
  Bell,
  Route,
  LogOut,
  Shield,
  Star,
  Zap
} from 'lucide-react';

interface DeliveryProps {
  id: string;
  address: string;
  customerName: string;
  phone: string;
  priority: 'high' | 'normal' | 'low';
  timeWindow: string;
  packages: number;
  notes?: string;
  coordinates?: { lat: number; lng: number };
  signatureRequired?: boolean;
  status?: 'pending' | 'in-progress' | 'delivered' | 'failed';
}

const CarrierDashboard: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryProps[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedDelivery, setExpandedDelivery] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Simulated API call
    const fetchDeliveries = () => {
      setDeliveries([
        {
          id: 'D001',
          address: '123 Oak Street, Downtown, Apt 4B',
          customerName: 'Sarah Johnson',
          phone: '+1 (555) 123-4567',
          priority: 'high',
          timeWindow: '9:00 AM - 11:00 AM',
          packages: 2,
          notes: 'Ring doorbell twice. Leave with doorman if not home.',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          signatureRequired: true,
          status: 'pending'
        },
        {
          id: 'D002',
          address: '456 Pine Avenue, Midtown, Suite 200',
          customerName: 'Mike Chen',
          phone: '+1 (555) 987-6543',
          priority: 'normal',
          timeWindow: '11:30 AM - 1:30 PM',
          packages: 1,
          coordinates: { lat: 40.7215, lng: -73.9932 },
          status: 'in-progress'
        },
        {
          id: 'D003',
          address: '789 Maple Road, Uptown',
          customerName: 'Alex Rodriguez',
          phone: '+1 (555) 456-7890',
          priority: 'low',
          timeWindow: '2:00 PM - 4:00 PM',
          packages: 3,
          notes: 'Fragile items - handle with care',
          coordinates: { lat: 40.7356, lng: -73.9801 },
          signatureRequired: false,
          status: 'pending'
        }
      ]);
    };

    fetchDeliveries();

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const markAsDelivered = (id: string) => {
    setDeliveries(prev => 
      prev.map(del => 
        del.id === id ? { ...del, status: 'delivered' } : del
      )
    );
  };

  const markAsFailed = (id: string) => {
    setDeliveries(prev => 
      prev.map(del => 
        del.id === id ? { ...del, status: 'failed' } : del
      )
    );
  };

  const startDelivery = (id: string) => {
    setDeliveries(prev => 
      prev.map(del => 
        del.id === id ? { ...del, status: 'in-progress' } : del
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'normal': return 'bg-gradient-to-r from-amber-500 to-amber-600';
      case 'low': return 'bg-gradient-to-r from-green-500 to-green-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'delivered': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'failed': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const toggleDeliveryDetails = (id: string) => {
    setExpandedDelivery(expandedDelivery === id ? null : id);
  };

  const pendingDeliveries = deliveries.filter(d => d.status !== 'delivered' && d.status !== 'failed');
  const completedDeliveries = deliveries.filter(d => d.status === 'delivered');
  const inProgressDeliveries = deliveries.filter(d => d.status === 'in-progress');

  // Sidebar overlay for mobile
  const SidebarOverlay = () => (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setSidebarOpen(false)}
    />
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SidebarOverlay />
      
      {/* Enhanced Sidebar */}
      <aside className={`fixed md:static top-0 left-0 z-50 w-72 h-full bg-gradient-to-b from-slate-900 to-slate-800 border-r border-amber-500/20 backdrop-blur-lg shadow-2xl transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-all duration-300 ease-out`}>
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-600 to-amber-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="text-amber-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">LinkaFrex</h2>
                <p className="text-amber-100 text-xs">Carrier Dashboard</p>
              </div>
            </div>
            <button 
              className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Profile Section */}
        <div className="p-6 border-b border-amber-500/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">John Carrier</p>
              <p className="text-xs text-slate-400">Driver ID: D-78945</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-amber-400" />
                <span className="text-xs text-amber-400">4.8 Rating</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button 
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'today' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            onClick={() => setActiveTab('today')}
          >
            <Home size={18} />
            <span className="font-medium">Today's Route</span>
            <div className="ml-auto w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
              {pendingDeliveries.length}
            </div>
          </button>
          
          <button 
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'upcoming' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            <Clock size={18} />
            <span className="font-medium">Upcoming</span>
          </button>
          
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200">
            <Route size={18} />
            <span className="font-medium">Route Map</span>
          </button>
          
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200">
            <Settings size={18} />
            <span className="font-medium">Settings</span>
          </button>
        </nav>
        
        {/* Quick Stats */}
        <div className="p-4 m-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-amber-500/20">
          <h3 className="text-sm font-semibold text-amber-400 mb-3">Today's Progress</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{completedDeliveries.length}</div>
              <div className="text-xs text-slate-400">Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">{pendingDeliveries.length}</div>
              <div className="text-xs text-slate-400">Remaining</div>
            </div>
          </div>
        </div>
        
        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <LogOut size={18} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-amber-500/20 p-4 shadow-lg backdrop-blur-lg sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="md:hidden p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} className="text-amber-400" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {activeTab === 'today' ? "Today's Deliveries" : "Upcoming Deliveries"}
                </h1>
                <p className="text-sm text-slate-400">
                  {activeTab === 'today' ? `${pendingDeliveries.length} stops remaining` : 'Plan your future routes'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors relative">
                  <Bell size={18} className="text-amber-400" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              <div className="text-sm text-slate-400 font-mono hidden sm:block bg-slate-800 px-3 py-2 rounded-lg">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Stats Cards */}
        <section className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-2xl border border-amber-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{pendingDeliveries.length}</p>
                  <p className="text-sm text-slate-400">Pending</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <Package className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-2xl border border-amber-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{inProgressDeliveries.length}</p>
                  <p className="text-sm text-slate-400">In Progress</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Zap className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-2xl border border-amber-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{completedDeliveries.length}</p>
                  <p className="text-sm text-slate-400">Completed</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-2xl border border-amber-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">5.3</p>
                  <p className="text-sm text-slate-400">Miles Left</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Navigation className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="flex-1 px-6 pb-6">
          {/* Enhanced Delivery Cards */}
          <div className="space-y-4">
            {activeTab === 'today' && (
              <>
                {pendingDeliveries.length === 0 ? (
                  <div className="text-center py-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-amber-500/20">
                    <CheckCircle className="w-20 h-20 text-amber-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">All Done!</h3>
                    <p className="text-slate-400">You've completed all deliveries for today</p>
                  </div>
                ) : (
                  pendingDeliveries.map(delivery => (
                    <div key={delivery.id} className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-2xl border border-amber-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-white">{delivery.customerName}</h4>
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(delivery.priority)}`}></div>
                            {delivery.signatureRequired && (
                              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
                                <Shield className="w-3 h-3 inline mr-1" />
                                Signature Required
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-amber-400" />
                            {delivery.address}
                          </p>
                        </div>
                        <div className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(delivery.status || 'pending')}`}>
                          {delivery.status?.replace('-', ' ') || 'pending'}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="w-4 h-4 text-amber-400" />
                          {delivery.timeWindow}
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Phone className="w-4 h-4 text-amber-400" />
                          {delivery.phone}
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Package className="w-4 h-4 text-amber-400" />
                          {delivery.packages} package(s)
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => toggleDeliveryDetails(delivery.id)}
                        className="text-sm text-amber-400 flex items-center gap-2 mb-4 hover:text-amber-300 transition-colors"
                      >
                        {expandedDelivery === delivery.id ? (
                          <>
                            <ChevronUp size={16} /> Hide details
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} /> Show details
                          </>
                        )}
                      </button>
                      
                      {expandedDelivery === delivery.id && (
                        <div className="mb-4 p-4 bg-slate-900/50 rounded-xl border border-amber-500/10">
                          {delivery.notes && (
                            <div className="mb-3">
                              <p className="text-amber-400 font-medium mb-1">Notes:</p>
                              <p className="text-slate-300">{delivery.notes}</p>
                            </div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-amber-400 font-medium">Coordinates:</p>
                              <p className="text-slate-300">
                                {delivery.coordinates ? 
                                  `${delivery.coordinates.lat.toFixed(4)}, ${delivery.coordinates.lng.toFixed(4)}` : 
                                  'Not available'}
                              </p>
                            </div>
                            <div>
                              <p className="text-amber-400 font-medium">Priority:</p>
                              <p className="text-slate-300 capitalize">{delivery.priority}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button 
                          onClick={() => startDelivery(delivery.id)}
                          className="py-3 px-4 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Navigation size={16} /> Start Delivery
                        </button>
                        <button
                          onClick={() => markAsDelivered(delivery.id)}
                          className="py-3 px-4 text-sm font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <CheckCircle size={16} /> Delivered
                        </button>
                        <button
                          onClick={() => markAsFailed(delivery.id)}
                          className="py-3 px-4 text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <AlertTriangle size={16} /> Failed
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
            
            {activeTab === 'upcoming' && (
              <div className="text-center py-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-amber-500/20">
                <Clock className="w-20 h-20 text-amber-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Upcoming Deliveries</h3>
                <p className="text-slate-400">Check back tomorrow for your next deliveries</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer Actions */}
        <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t border-amber-500/20 p-4 backdrop-blur-lg">
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl py-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-xs font-medium">Report Issue</span>
            </button>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl py-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Camera className="w-6 h-6" />
              <span className="text-xs font-medium">Take Photo</span>
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl">
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs font-medium">Contact</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CarrierDashboard;