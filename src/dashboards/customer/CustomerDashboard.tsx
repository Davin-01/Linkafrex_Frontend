import React, { useState, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  Clock, 
  Bell,
  Calendar,
  Truck,
  User,
  Search,
  Plus,
  CheckCircle,
  AlertCircle,
  Navigation2,
  Phone,
  Menu,
  X,
  Home,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface PackageProps {
  id: string;
  status: 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'delayed';
  vendor: string;
  description: string;
  estimatedDelivery: string;
  trackingNumber: string;
  lastUpdate: string;
  deliveryAddress: string;
  priority: 'low' | 'medium' | 'high';
}

const CustomerDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState<PackageProps | null>(null);

  const packages: PackageProps[] = [
    {
      id: 'PKG001',
      status: 'out_for_delivery',
      vendor: 'Amazon',
      description: 'Wireless Bluetooth Headphones',
      estimatedDelivery: 'Today by 6:00 PM',
      trackingNumber: 'TRK123456789',
      lastUpdate: '10:30 AM - Out for delivery',
      deliveryAddress: '123 Main St, Nairobi',
      priority: 'high'
    },
    {
      id: 'PKG002',
      status: 'delayed',
      vendor: 'Jumia',
      description: 'Gaming Keyboard',
      estimatedDelivery: 'Delayed - July 1st',
      trackingNumber: 'TRK987654321',
      lastUpdate: '8:45 AM - Weather delay',
      deliveryAddress: '123 Main St, Nairobi',
      priority: 'medium'
    },
    {
      id: 'PKG003',
      status: 'delivered',
      vendor: 'Target',
      description: 'Kitchen Utensils Set',
      estimatedDelivery: 'Delivered',
      trackingNumber: 'TRK456789123',
      lastUpdate: 'Yesterday 3:15 PM - Delivered',
      deliveryAddress: '123 Main St, Nairobi',
      priority: 'low'
    },
    {
      id: 'PKG004',
      status: 'in_transit',
      vendor: 'Shopify',
      description: 'Office Chair',
      estimatedDelivery: 'June 30th by 2:00 PM',
      trackingNumber: 'TRK789123456',
      lastUpdate: '2:20 PM - In transit',
      deliveryAddress: '456 Oak Ave, Nairobi',
      priority: 'medium'
    },
    {
      id: 'PKG005',
      status: 'shipped',
      vendor: 'eBay',
      description: 'Phone Case',
      estimatedDelivery: 'July 2nd by 5:00 PM',
      trackingNumber: 'TRK321654987',
      lastUpdate: '11:00 AM - Shipped',
      deliveryAddress: '789 Pine St, Nairobi',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shipped': return 'text-blue-400 bg-blue-500/20';
      case 'in_transit': return 'text-yellow-400 bg-yellow-500/20';
      case 'out_for_delivery': return 'text-orange-400 bg-orange-500/20';
      case 'delivered': return 'text-green-400 bg-green-500/20';
      case 'delayed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shipped': return <Package className="w-4 h-4" />;
      case 'in_transit': return <Truck className="w-4 h-4" />;
      case 'out_for_delivery': return <Navigation2 className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'delayed': return <AlertCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || pkg.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: packages.length,
    active: packages.filter(p => p.status !== 'delivered').length,
    outForDelivery: packages.filter(p => p.status === 'out_for_delivery').length,
    delivered: packages.filter(p => p.status === 'delivered').length,
    delayed: packages.filter(p => p.status === 'delayed').length
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'packages', label: 'All Packages', icon: Package },
    { id: 'tracking', label: 'Live Tracking', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Sidebar = () => (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-yellow-500/20 transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:z-auto`}>
        <div className="p-4 border-b border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-lg font-bold text-yellow-400">LogiTrack</h1>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800 rounded-lg p-3 mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Sarah Johnson</p>
                <p className="text-xs text-gray-400">Premium User</p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );

  const Header = () => (
    <header className="bg-gray-900 border-b border-yellow-500/20 px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-white capitalize">
            {activeView === 'dashboard' ? 'Dashboard Overview' : activeView.replace('_', ' ')}
          </h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );

  const StatsCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4">
        <Package className="w-6 h-6 text-yellow-500 mb-2" />
        <p className="text-2xl font-bold text-white">{stats.total}</p>
        <p className="text-sm text-gray-400">Total Packages</p>
      </div>
      <div className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4">
        <Truck className="w-6 h-6 text-blue-400 mb-2" />
        <p className="text-2xl font-bold text-white">{stats.active}</p>
        <p className="text-sm text-gray-400">Active</p>
      </div>
      <div className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4">
        <Navigation2 className="w-6 h-6 text-orange-400 mb-2" />
        <p className="text-2xl font-bold text-white">{stats.outForDelivery}</p>
        <p className="text-sm text-gray-400">Out for Delivery</p>
      </div>
      <div className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4">
        <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
        <p className="text-2xl font-bold text-white">{stats.delivered}</p>
        <p className="text-sm text-gray-400">Delivered</p>
      </div>
      <div className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4">
        <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
        <p className="text-2xl font-bold text-white">{stats.delayed}</p>
        <p className="text-sm text-gray-400">Delayed</p>
      </div>
    </div>
  );

  const SearchAndFilter = () => (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search packages, vendors, or tracking numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-yellow-500/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
          />
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
        {['all', 'shipped', 'in_transit', 'out_for_delivery', 'delivered', 'delayed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterStatus === status 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {status === 'all' ? 'All' : formatStatus(status)}
          </button>
        ))}
      </div>
    </div>
  );

  const PackageList = () => (
    <div className="space-y-4">
      {filteredPackages.map((pkg) => (
        <div 
          key={pkg.id}
          className={`bg-gray-900 border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all duration-300 cursor-pointer border-l-4 ${getPriorityColor(pkg.priority)}`}
          onClick={() => setSelectedPackage(pkg)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-400">{pkg.vendor}</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                  {getStatusIcon(pkg.status)}
                  <span className="ml-1">{formatStatus(pkg.status)}</span>
                </span>
              </div>
              <h3 className="font-semibold text-white mb-1">{pkg.description}</h3>
              <p className="text-sm text-gray-400 mb-2">#{pkg.trackingNumber}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>

          <div className="bg-black/30 rounded-lg p-3 mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-400">{pkg.estimatedDelivery}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-300">{pkg.deliveryAddress}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-3">
            Last Update: {pkg.lastUpdate}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={(e) => e.stopPropagation()}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-3 text-sm font-medium transition-colors"
            >
              Track
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-700 hover:bg-gray-600 rounded-lg py-2 px-3 text-sm font-medium transition-colors"
            >
              Reschedule
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg py-2 px-3 text-sm font-medium transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      ))}

      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No packages found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
      case 'packages':
        return (
          <div>
            <StatsCards />
            <SearchAndFilter />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-yellow-400">Recent Packages</h3>
              <span className="text-sm text-gray-400">{filteredPackages.length} items</span>
            </div>
            <PackageList />
          </div>
        );
      
      case 'tracking':
        return (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Live Tracking</h3>
            <p className="text-gray-400 mb-6">Real-time package tracking coming soon</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium transition-colors">
              Enable Live Tracking
            </button>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h3>
            <p className="text-gray-400 mb-6">Detailed insights and reports</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium transition-colors">
              View Analytics
            </button>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h3>
            <p className="text-gray-400">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-yellow-500/20 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-yellow-400">Package Details</h2>
              <button 
                onClick={() => setSelectedPackage(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white mb-1">{selectedPackage.description}</h3>
                    <p className="text-sm text-gray-400">{selectedPackage.vendor}</p>
                    <p className="text-xs text-gray-500">#{selectedPackage.trackingNumber}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPackage.status)}`}>
                    {getStatusIcon(selectedPackage.status)}
                    <span className="ml-1">{formatStatus(selectedPackage.status)}</span>
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-yellow-400 mb-3">Delivery Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span>{selectedPackage.estimatedDelivery}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-300">{selectedPackage.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Navigation2 className="w-4 h-4" />
                  <span>Track Live</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 rounded-lg py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Driver</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;