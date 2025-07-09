import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  Users, 
  DollarSign, 
  Activity, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Ban, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Clock,
  MapPin,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      totalShipments: 12458,
      activeShipments: 3247,
      totalRevenue: 1247850,
      activeCarriers: 142,
      totalCustomers: 8934,
      systemHealth: 98.5
    },
    revenueData: [
      { month: 'Jan', revenue: 145000, shipments: 1200 },
      { month: 'Feb', revenue: 158000, shipments: 1350 },
      { month: 'Mar', revenue: 162000, shipments: 1420 },
      { month: 'Apr', revenue: 178000, shipments: 1580 },
      { month: 'May', revenue: 195000, shipments: 1720 },
      { month: 'Jun', revenue: 210000, shipments: 1890 }
    ],
    shipmentStatus: [
      { name: 'Delivered', value: 45, color: '#8B0000' },
      { name: 'In Transit', value: 28, color: '#DC143C' },
      { name: 'Pending', value: 15, color: '#B22222' },
      { name: 'Delayed', value: 8, color: '#FF6B6B' },
      { name: 'Cancelled', value: 4, color: '#FFB6C1' }
    ],
    shipments: [
      { id: 'SH001', customer: 'Acme Corp', origin: 'New York', destination: 'Los Angeles', status: 'In Transit', carrier: 'FastTrack', value: 2500, created: '2024-01-15' },
      { id: 'SH002', customer: 'Tech Solutions', origin: 'Chicago', destination: 'Miami', status: 'Delivered', carrier: 'QuickMove', value: 1800, created: '2024-01-14' },
      { id: 'SH003', customer: 'Global Industries', origin: 'Seattle', destination: 'Boston', status: 'Pending', carrier: 'Reliable Express', value: 3200, created: '2024-01-13' }
    ],
    carriers: [
      { id: 'CAR001', name: 'FastTrack Logistics', status: 'Active', performance: 94.5, activeShipments: 45, totalShipments: 1250 },
      { id: 'CAR002', name: 'QuickMove Express', status: 'Active', performance: 91.2, activeShipments: 32, totalShipments: 980 },
      { id: 'CAR003', name: 'Reliable Express', status: 'Suspended', performance: 87.8, activeShipments: 0, totalShipments: 750 }
    ],
    customers: [
      { id: 'CUST001', name: 'Acme Corp', status: 'Active', totalShipments: 145, totalValue: 45000, joinDate: '2023-06-15' },
      { id: 'CUST002', name: 'Tech Solutions', status: 'Active', totalShipments: 89, totalValue: 28000, joinDate: '2023-08-22' },
      { id: 'CUST003', name: 'Global Industries', status: 'Suspended', totalShipments: 67, totalValue: 19000, joinDate: '2023-09-10' }
    ]
  });

  const [formData, setFormData] = useState({
    customer: '',
    origin: '',
    destination: '',
    carrier: '',
    value: '',
    description: '',
    carrierName: '',
    carrierContact: ''
  });

  // Mock API functions - replace with actual API calls
  const fetchDashboardData = async () => {
    // Replace with actual API call
    console.log('Fetching dashboard data...');
  };

  const createShipment = async (shipmentData) => {
    // Replace with actual API call
    console.log('Creating shipment:', shipmentData);
    // Add to local state for demo
    const newShipment = {
      id: `SH${String(dashboardData.shipments.length + 1).padStart(3, '0')}`,
      ...shipmentData,
      status: 'Pending',
      created: new Date().toISOString().split('T')[0]
    };
    setDashboardData(prev => ({
      ...prev,
      shipments: [newShipment, ...prev.shipments]
    }));
  };

  const addCarrier = async (carrierData) => {
    // Replace with actual API call
    console.log('Adding carrier:', carrierData);
    const newCarrier = {
      id: `CAR${String(dashboardData.carriers.length + 1).padStart(3, '0')}`,
      name: carrierData.carrierName,
      status: 'Active',
      performance: 0,
      activeShipments: 0,
      totalShipments: 0
    };
    setDashboardData(prev => ({
      ...prev,
      carriers: [newCarrier, ...prev.carriers]
    }));
  };

  const suspendCarrier = async (carrierId) => {
    // Replace with actual API call
    console.log('Suspending carrier:', carrierId);
    setDashboardData(prev => ({
      ...prev,
      carriers: prev.carriers.map(carrier => 
        carrier.id === carrierId ? { ...carrier, status: 'Suspended' } : carrier
      )
    }));
  };

  const suspendCustomer = async (customerId) => {
    // Replace with actual API call
    console.log('Suspending customer:', customerId);
    setDashboardData(prev => ({
      ...prev,
      customers: prev.customers.map(customer => 
        customer.id === customerId ? { ...customer, status: 'Suspended' } : customer
      )
    }));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (modalType === 'shipment') {
      await createShipment(formData);
    } else if (modalType === 'carrier') {
      await addCarrier(formData);
    }
    
    setFormData({
      customer: '',
      origin: '',
      destination: '',
      carrier: '',
      value: '',
      description: '',
      carrierName: '',
      carrierContact: ''
    });
    setShowModal(false);
  };

  const handleSuspend = async (type, id) => {
    if (type === 'carrier') {
      await suspendCarrier(id);
    } else if (type === 'customer') {
      await suspendCustomer(id);
    }
  };

  const KPICard = ({ title, value, icon: Icon, trend, color = 'text-gray-600' }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className="w-8 h-8 text-red-800" />
      </div>
      {trend && (
        <div className="flex items-center mt-2">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(trend)}% from last month
          </span>
        </div>
      )}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard 
          title="Total Shipments" 
          value={dashboardData.kpis.totalShipments.toLocaleString()} 
          icon={Package} 
          trend={12.5}
        />
        <KPICard 
          title="Active Shipments" 
          value={dashboardData.kpis.activeShipments.toLocaleString()} 
          icon={Activity} 
          trend={8.2}
        />
        <KPICard 
          title="Total Revenue" 
          value={`$${(dashboardData.kpis.totalRevenue / 1000).toFixed(0)}K`} 
          icon={DollarSign} 
          trend={15.7}
        />
        <KPICard 
          title="Active Carriers" 
          value={dashboardData.kpis.activeCarriers} 
          icon={Truck} 
          trend={-2.1}
        />
        <KPICard 
          title="Total Customers" 
          value={dashboardData.kpis.totalCustomers.toLocaleString()} 
          icon={Users} 
          trend={9.3}
        />
        <KPICard 
          title="System Health" 
          value={`${dashboardData.kpis.systemHealth}%`} 
          icon={CheckCircle} 
          color="text-green-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-800">Revenue & Shipments Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8B0000" strokeWidth={2} />
              <Line type="monotone" dataKey="shipments" stroke="#DC143C" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-800">Shipment Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.shipmentStatus}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {dashboardData.shipmentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-red-800">Recent Shipments</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Route</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Carrier</th>
                <th className="text-left p-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.shipments.slice(0, 5).map((shipment) => (
                <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium">{shipment.id}</td>
                  <td className="p-3">{shipment.customer}</td>
                  <td className="p-3">{shipment.origin} → {shipment.destination}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      shipment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="p-3">{shipment.carrier}</td>
                  <td className="p-3">${shipment.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderShipments = () => (
    <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-red-800">Shipment Management</h2>
      <Link 
        to="/dashboard/create"
        className="bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
      >
        <Plus className="w-4 h-4" />
        Create Shipment
      </Link>
    </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search shipments..."
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Shipment ID</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Origin</th>
                <th className="text-left p-4">Destination</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Carrier</th>
                <th className="text-left p-4">Value</th>
                <th className="text-left p-4">Created</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.shipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium">{shipment.id}</td>
                  <td className="p-4">{shipment.customer}</td>
                  <td className="p-4">{shipment.origin}</td>
                  <td className="p-4">{shipment.destination}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      shipment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="p-4">{shipment.carrier}</td>
                  <td className="p-4">${shipment.value}</td>
                  <td className="p-4">{shipment.created}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCarriers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-red-800">Carrier Management</h2>
        <button 
          onClick={() => { setModalType('carrier'); setShowModal(true); }}
          className="bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus className="w-4 h-4" />
          Add Carrier
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Carrier ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Performance</th>
                <th className="text-left p-4">Active Shipments</th>
                <th className="text-left p-4">Total Shipments</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.carriers.map((carrier) => (
                <tr key={carrier.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium">{carrier.id}</td>
                  <td className="p-4">{carrier.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      carrier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {carrier.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${carrier.performance}%` }}
                        />
                      </div>
                      <span className="text-sm">{carrier.performance}%</span>
                    </div>
                  </td>
                  <td className="p-4">{carrier.activeShipments}</td>
                  <td className="p-4">{carrier.totalShipments}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSuspend('carrier', carrier.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-red-800">Customer Management</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Customer ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Total Shipments</th>
                <th className="text-left p-4">Total Value</th>
                <th className="text-left p-4">Join Date</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium">{customer.id}</td>
                  <td className="p-4">{customer.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4">{customer.totalShipments}</td>
                  <td className="p-4">${customer.totalValue.toLocaleString()}</td>
                  <td className="p-4">{customer.joinDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSuspend('customer', customer.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold mb-4 text-red-800">
            {modalType === 'shipment' ? 'Create New Shipment' : 'Add New Carrier'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {modalType === 'shipment' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Customer</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.customer}
                    onChange={(e) => setFormData({...formData, customer: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Origin</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Destination</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Carrier</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.carrier}
                    onChange={(e) => setFormData({...formData, carrier: e.target.value})}
                    required
                  >
                    <option value="">Select Carrier</option>
                    {dashboardData.carriers.filter(c => c.status === 'Active').map(carrier => (
                      <option key={carrier.id} value={carrier.name}>{carrier.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Value ($)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Carrier Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.carrierName}
                    onChange={(e) => setFormData({...formData, carrierName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Information</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.carrierContact}
                    onChange={(e) => setFormData({...formData, carrierContact: e.target.value})}
                    required
                  />
                </div>
              </>
            )}
            
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 bg-red-800 text-white py-2 rounded-lg hover:bg-red-700"
              >
                {modalType === 'shipment' ? 'Create Shipment' : 'Add Carrier'}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-red-800">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
              <div className="text-sm text-gray-500">
                Last Updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: Activity },
              { key: 'shipments', label: 'Shipments', icon: Package },
              { key: 'carriers', label: 'Carriers', icon: Truck },
              { key: 'customers', label: 'Customers', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-red-800 text-red-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'shipments' && renderShipments()}
        {activeTab === 'carriers' && renderCarriers()}
        {activeTab === 'customers' && renderCustomers()}
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default AdminDashboard;