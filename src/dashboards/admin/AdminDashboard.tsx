import React, { useEffect, useState } from 'react';
import {
  Users,
  PackageCheck,
  TrendingUp,
  BarChart3,
  ArrowRightCircle,
  Search,
  Filter,
  Download,
  Bell,
  AlertTriangle,
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  Settings,
  RefreshCw,
  Calendar,
  Package,
  Navigation,
  Activity
} from 'lucide-react';

type StatCardType = {
  title: string;
  count: string | number;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  trend: number[];
};

type ShipmentType = {
  id: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Delayed' | 'Failed';
  destination: string;
  origin: string;
  date: string;
  estimatedDelivery: string;
  driver: string;
  priority: 'High' | 'Medium' | 'Low';
  value: number;
};

type AlertType = {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<StatCardType[]>([]);
  const [shipments, setShipments] = useState<ShipmentType[]>([]);
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated API data
        const mockStats: StatCardType[] = [
          {
            title: 'Total Shipments',
            count: '2,847',
            icon: <Package size={24} />,
            change: '+12.5%',
            changeType: 'positive',
            trend: [20, 25, 22, 30, 28, 35, 32]
          },
          {
            title: 'Active ',
            count: '156',
            icon: <Users size={24} />,
            change: '+3.2%',
            changeType: 'positive',
            trend: [15, 18, 16, 20, 19, 22, 21]
          },
          {
            title: 'On-Time Delivery',
            count: '94.2%',
            icon: <Clock size={24} />,
            change: '-2.1%',
            changeType: 'negative',
            trend: [95, 96, 94, 95, 93, 94, 92]
          },
          {
            title: 'Revenue',
            count: '$847K',
            icon: <DollarSign size={24} />,
            change: '+18.7%',
            changeType: 'positive',
            trend: [70, 75, 72, 85, 82, 90, 88]
          }
        ];

        const mockShipments: ShipmentType[] = [
          {
            id: 'SH-2024-001',
            status: 'In Transit',
            destination: 'Nairobi CBD',
            origin: 'Mombasa Port',
            date: '2024-06-27',
            estimatedDelivery: '2024-06-28',
            driver: 'John Kamau',
            priority: 'High',
            value: 25000
          },
          {
            id: 'SH-2024-002',
            status: 'Delivered',
            destination: 'Kisumu',
            origin: 'Nairobi',
            date: '2024-06-26',
            estimatedDelivery: '2024-06-27',
            driver: 'Mary Wanjiku',
            priority: 'Medium',
            value: 18500
          },
          {
            id: 'SH-2024-003',
            status: 'Delayed',
            destination: 'Eldoret',
            origin: 'Nakuru',
            date: '2024-06-25',
            estimatedDelivery: '2024-06-26',
            driver: 'Peter Otieno',
            priority: 'High',
            value: 32000
          },
          {
            id: 'SH-2024-004',
            status: 'Processing',
            destination: 'Meru',
            origin: 'Nairobi',
            date: '2024-06-27',
            estimatedDelivery: '2024-06-29',
            driver: 'Sarah Akinyi',
            priority: 'Low',
            value: 12000
          }
        ];

        const mockAlerts: AlertType[] = [
          {
            id: '1',
            type: 'warning',
            message: 'Vehicle KBA 123A requires maintenance check',
            timestamp: '2 hours ago'
          },
          {
            id: '2',
            type: 'error',
            message: 'Shipment SH-2024-003 is delayed due to traffic jam',
            timestamp: '4 hours ago'
          },
          {
            id: '3',
            type: 'info',
            message: 'New driver registration approved: David Mwangi',
            timestamp: '6 hours ago'
          }
        ];

        setStats(mockStats);
        setShipments(mockShipments);
        setAlerts(mockAlerts);
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard: React.FC<StatCardType> = ({ title, count, icon, change, changeType, trend }) => {
    const changeColor = changeType === 'positive' ? 'text-green-400' : 
                      changeType === 'negative' ? 'text-red-400' : 'text-gray-400';
    
    return (
      <div className="group p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-500/30">
        <div className="flex justify-between items-start mb-4">
          <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
            {icon}
          </div>
          <div className="flex items-center space-x-1">
            {trend.map((point, idx) => (
              <div
                key={idx}
                className={`w-1 bg-blue-400 rounded-full transition-all duration-300 group-hover:bg-blue-300`}
                style={{ height: `${(point / Math.max(...trend)) * 20}px` }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</h3>
          <div className="text-3xl font-bold text-white">{count}</div>
          <p className={`text-sm ${changeColor} flex items-center gap-1`}>
            <TrendingUp size={14} />
            {change} from last month
          </p>
        </div>
      </div>
    );
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Transit': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Delayed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Failed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Logistics Admin</h1>
                <p className="text-sm text-gray-400">Dashboard & Management Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAlerts(!showAlerts)}
                className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Bell size={20} />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </button>
              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Settings size={20} />
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Alerts Panel */}
        {showAlerts && (
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="text-yellow-400" size={20} />
                System Alerts
              </h2>
              <button 
                onClick={() => setShowAlerts(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.type === 'error' ? 'bg-red-500' : 
                    alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-400">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="animate-pulse bg-gray-800 rounded-xl h-40" />
              ))
            ) : (
              stats.map((stat, idx) => <StatCard key={idx} {...stat} />)
            )}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Shipments */}
          <div className="xl:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="text-blue-400" size={20} />
                  Recent Shipments
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search shipments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Processing">Processing</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">ID</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Route</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Driver</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Priority</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Value</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          <div className="animate-spin mx-auto mb-2">
                            <RefreshCw size={24} />
                          </div>
                          Loading shipments...
                        </td>
                      </tr>
                    ) : filteredShipments.length > 0 ? (
                      filteredShipments.map((shipment) => (
                        <tr key={shipment.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <td className="py-4 px-2">
                            <div className="font-mono text-sm">{shipment.id}</div>
                            <div className="text-xs text-gray-400">{shipment.date}</div>
                          </td>
                          <td className="py-4 px-2">
                            <span className={`px-3 py-1 text-xs rounded-full border font-medium ${getStatusColor(shipment.status)}`}>
                              {shipment.status}
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="text-sm">{shipment.origin}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <ArrowRightCircle size={12} />
                              {shipment.destination}
                            </div>
                          </td>
                          <td className="py-4 px-2 text-sm">{shipment.driver}</td>
                          <td className="py-4 px-2">
                            <span className={`text-sm font-medium ${getPriorityColor(shipment.priority)}`}>
                              {shipment.priority}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-sm font-medium">
                            KSh {shipment.value.toLocaleString()}
                          </td>
                          <td className="py-4 px-2">
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          No shipments found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="text-green-400" size={18} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  <Package size={18} />
                  Create New Shipment
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Users size={18} />
                  Manage Drivers
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Truck size={18} />
                  Fleet Management
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <BarChart3 size={18} />
                  Generate Reports
                </button>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="text-purple-400" size={18} />
                Today's Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Active Shipments</span>
                  <span className="font-semibold">147</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Completed Today</span>
                  <span className="font-semibold text-green-400">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Pending Pickups</span>
                  <span className="font-semibold text-yellow-400">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Issues/Delays</span>
                  <span className="font-semibold text-red-400">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;