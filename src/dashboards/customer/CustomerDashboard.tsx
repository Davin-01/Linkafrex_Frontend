import React, { useEffect, useState, useCallback } from 'react';
import {
  Package,
  Truck,
  MapPin,
  Clock,
  Calendar,
  Search,
  Filter,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  BarChart2,
  CreditCard,
  User,
  Settings,
  Plus,
  Download as DownloadIcon,
  Headphones,
  HelpCircle,
  FileText
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

type ShipmentStatus = 'Delivered' | 'In Transit' | 'Processing' | 'Delayed' | 'Cancelled';

interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  departureDate: string;
  estimatedDelivery: string;
  carrier: string;
  serviceType: string;
  weight: string;
  dimensions: string;
  value: number;
  lastUpdate: string;
  history: {
    date: string;
    status: ShipmentStatus;
    location: string;
    description: string;
  }[];
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'alert';
  message: string;
  date: string;
  read: boolean;
}

const CustomersDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'all'>('all');
  const [expandedShipment, setExpandedShipment] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newShipment, setNewShipment] = useState({
    origin: '',
    destination: '',
    serviceType: 'Standard',
    weight: '',
    dimensions: '',
    value: ''
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Enhanced mock data
        const mockShipments: Shipment[] = [
          {
            id: '1',
            trackingNumber: 'TRK-' + Math.floor(Math.random() * 10000000),
            status: 'In Transit',
            origin: 'Nairobi Warehouse',
            destination: 'Mombasa Port',
            departureDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            estimatedDelivery: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
            carrier: 'Swift Logistics',
            serviceType: 'Standard',
            weight: '15 kg',
            dimensions: '30×20×15 cm',
            value: 25000,
            lastUpdate: new Date().toLocaleString(),
            history: [
              {
                date: new Date().toLocaleString(),
                status: 'In Transit',
                location: 'Nairobi Distribution Center',
                description: 'Package departed from distribution center'
              },
              {
                date: new Date(Date.now() - 86400000).toLocaleString(),
                status: 'Processing',
                location: 'Nairobi Warehouse',
                description: 'Package processed and ready for shipment'
              }
            ]
          },
          // Additional mock shipments...
        ];

        const mockNotifications: Notification[] = [
          {
            id: '1',
            type: 'info',
            message: `Your shipment ${mockShipments[0].trackingNumber} has departed Nairobi Distribution Center`,
            date: new Date().toLocaleString(),
            read: false
          },
          // Additional mock notifications...
        ];

        setShipments(mockShipments);
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
        toast.error('Failed to load dashboard data');
      }
    };

    fetchData();
  }, []);

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleShipmentExpansion = (shipmentId: string) => {
    setExpandedShipment(expandedShipment === shipmentId ? null : shipmentId);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success('Notification marked as read');
  };

  const handleCreateShipment = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          const newShip: Shipment = {
            id: (shipments.length + 1).toString(),
            trackingNumber: 'TRK-' + Math.floor(Math.random() * 10000000),
            status: 'Processing',
            origin: newShipment.origin,
            destination: newShipment.destination,
            departureDate: new Date().toISOString().split('T')[0],
            estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
            carrier: ['Swift Logistics', 'Coastal Cargo', 'Highland Haulers'][Math.floor(Math.random() * 3)],
            serviceType: newShipment.serviceType,
            weight: newShipment.weight,
            dimensions: newShipment.dimensions,
            value: parseInt(newShipment.value),
            lastUpdate: new Date().toLocaleString(),
            history: [{
              date: new Date().toLocaleString(),
              status: 'Processing',
              location: newShipment.origin,
              description: 'Shipment created and awaiting processing'
            }]
          };
          setShipments([newShip, ...shipments]);
          setShowCreateModal(false);
          setNewShipment({
            origin: '',
            destination: '',
            serviceType: 'Standard',
            weight: '',
            dimensions: '',
            value: ''
          });
          resolve(true);
        }, 1500);
      }),
      {
        loading: 'Creating shipment...',
        success: 'Shipment created successfully!',
        error: 'Failed to create shipment'
      }
    );
  };

  const getStatusIcon = (status: ShipmentStatus) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="text-emerald-500" size={18} />;
      case 'In Transit': return <Truck className="text-blue-500" size={18} />;
      case 'Processing': return <RefreshCw className="text-amber-500 animate-spin" size={18} />;
      case 'Delayed': return <AlertCircle className="text-orange-500" size={18} />;
      case 'Cancelled': return <XCircle className="text-red-500" size={18} />;
      default: return <Info className="text-gray-500" size={18} />;
    }
  };

  const getStatusColor = (status: ShipmentStatus) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Delayed': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-emerald-500';
      default: return 'text-gray-500';
    }
  };

  const refreshData = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // In a real app, this would refetch from API
          setLoading(false);
          resolve(true);
        }, 1000);
      }),
      {
        loading: 'Refreshing data...',
        success: 'Data refreshed!',
        error: 'Failed to refresh data'
      }
    );
  };

  if (loading && shipments.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-lg max-w-md mx-auto mt-8 border border-red-200">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} />
          <h3 className="font-bold">Error loading dashboard</h3>
        </div>
        <p className="mt-2">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Logistics Portal</h1>
              <p className="text-sm text-gray-500">Track your shipments in real-time</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={refreshData}
                disabled={loading}
                className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Bell size={20} className="text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium">Customer</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed right-4 top-16 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-900">Notifications</h3>
            <button 
              onClick={() => setShowNotifications(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 h-3 w-3 rounded-full ${
                      notification.type === 'info' ? 'bg-blue-500' :
                      notification.type === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
          <div className="p-3 bg-gray-50 text-center border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}

      {/* Create Shipment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Create New Shipment</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                  <input
                    type="text"
                    value={newShipment.origin}
                    onChange={(e) => setNewShipment({...newShipment, origin: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nairobi Warehouse"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={newShipment.destination}
                    onChange={(e) => setNewShipment({...newShipment, destination: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mombasa Port"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    value={newShipment.serviceType}
                    onChange={(e) => setNewShipment({...newShipment, serviceType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Express">Express</option>
                    <option value="Priority">Priority</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                    <input
                      type="text"
                      value={newShipment.weight}
                      onChange={(e) => setNewShipment({...newShipment, weight: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="15 kg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                    <input
                      type="text"
                      value={newShipment.dimensions}
                      onChange={(e) => setNewShipment({...newShipment, dimensions: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="30×20×15 cm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Declared Value (KSh)</label>
                  <input
                    type="number"
                    value={newShipment.value}
                    onChange={(e) => setNewShipment({...newShipment, value: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="25000"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateShipment}
                  disabled={!newShipment.origin || !newShipment.destination}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Shipment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Shipments</p>
                <p className="text-2xl font-bold mt-1">{shipments.length}</p>
                <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="text-blue-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Transit</p>
                <p className="text-2xl font-bold mt-1">
                  {shipments.filter(s => s.status === 'In Transit').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">3 expected today</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="text-blue-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <p className="text-2xl font-bold mt-1">
                  {shipments.filter(s => s.status === 'Delivered').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">98% on-time rate</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Issues</p>
                <p className="text-2xl font-bold mt-1">
                  {shipments.filter(s => s.status === 'Delayed' || s.status === 'Cancelled').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">2 needing attention</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="text-red-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Shipments</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ShipmentStatus | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Processing">Processing</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus size={16} />
                <span>New</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {filteredShipments.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimated Delivery
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Update
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredShipments.map((shipment) => (
                    <React.Fragment key={shipment.id}>
                      <tr 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleShipmentExpansion(shipment.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-blue-600">{shipment.trackingNumber}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <span>{shipment.serviceType}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${getPriorityColor(
                              shipment.serviceType === 'Express' ? 'High' : 
                              shipment.serviceType === 'Priority' ? 'Medium' : 'Low'
                            )}`}>
                              {shipment.serviceType === 'Express' ? 'High' : 
                               shipment.serviceType === 'Priority' ? 'Medium' : 'Low'} priority
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(shipment.status)}
                            <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(shipment.status)}`}>
                              {shipment.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="truncate max-w-xs">{shipment.origin}</span>
                            <ArrowRight size={14} className="text-gray-400" />
                            <MapPin size={14} className="text-gray-400" />
                            <span className="truncate max-w-xs">{shipment.destination}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span>{shipment.estimatedDelivery}</span>
                            {shipment.status === 'Delayed' && (
                              <span className="text-xs text-amber-600">(Delayed)</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {shipment.lastUpdate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleShipmentExpansion(shipment.id);
                            }}
                          >
                            {expandedShipment === shipment.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </td>
                      </tr>
                      
                      {expandedShipment === shipment.id && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="col-span-1">
                                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                  <Info size={16} className="text-blue-500" />
                                  Shipment Details
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Carrier:</span>
                                    <span className="font-medium">{shipment.carrier}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Weight:</span>
                                    <span className="font-medium">{shipment.weight}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Dimensions:</span>
                                    <span className="font-medium">{shipment.dimensions}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Value:</span>
                                    <span className="font-mono font-medium">KSh {shipment.value.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Departure Date:</span>
                                    <span className="font-medium">{shipment.departureDate}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="col-span-2">
                                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                  <Clock size={16} className="text-blue-500" />
                                  Tracking History
                                </h4>
                                <div className="space-y-4">
                                  {shipment.history.map((event, index) => (
                                    <div key={index} className="flex gap-4">
                                      <div className="flex flex-col items-center">
                                        <div className={`h-3 w-3 rounded-full ${
                                          event.status === 'Delivered' ? 'bg-green-500' :
                                          event.status === 'In Transit' ? 'bg-blue-500' :
                                          event.status === 'Processing' ? 'bg-amber-500' :
                                          event.status === 'Delayed' ? 'bg-orange-500' :
                                          'bg-red-500'
                                        }`} />
                                        {index < shipment.history.length - 1 && (
                                          <div className="w-px h-full bg-gray-300"></div>
                                        )}
                                      </div>
                                      <div className="pb-4 flex-1">
                                        <div className="flex justify-between">
                                          <span className="font-medium">{event.status}</span>
                                          <span className="text-sm text-gray-500">{event.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                                          <MapPin size={12} className="text-gray-400" />
                                          {event.location}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No shipments found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Try adjusting your search or filter criteria."
                    : "You don't have any shipments yet."}
                </p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Create New Shipment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="text-blue-600" size={18} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Generate Reports</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Export your shipment history, invoices, and analytics</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Download Reports
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="text-green-600" size={18} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Billing & Payments</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">View invoices, make payments, and manage billing</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
              View Billing
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <HelpCircle className="text-purple-600" size={18} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Support Center</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Get help with shipments, claims, and account issues</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomersDashboard;