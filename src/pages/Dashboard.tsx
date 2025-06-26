import React, { useState, useEffect } from 'react';
import {
  PlusCircle, Search, Clock, CreditCard, HelpCircle,
  Settings, Menu, Bell, ChevronDown, ChevronRight,
  ChevronLeft, X, Package, Truck, CheckCircle, Sun, Moon, LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [shipmentStatus, setShipmentStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock user for demonstration
  const user = { name: 'David Moenga', role: 'admin', initials: 'DM' };

  const navLinks = [
    { title: 'Book Shipment', icon: PlusCircle, path: '/dashboard/book-shipment' },
    { title: 'Track Package', icon: Search, path: '/dashboard/track-package' },
    { title: 'Shipment History', icon: Clock, path: '/dashboard/history' },
    { title: 'Billing', icon: CreditCard, path: '/dashboard/billing' },
    { title: 'Help Center', icon: HelpCircle, path: '/dashboard/help' },
    { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const recentActivities = [
    { id: 1, action: 'Booked shipment to Mombasa', time: '2h ago', read: false },
    { id: 2, action: 'Tracked package #X2345', time: '1d ago', read: true },
    { id: 3, action: 'Updated billing info', time: '3d ago', read: true },
  ];

  const unreadCount = recentActivities.filter(a => !a.read).length;

  // Simulate API call
  useEffect(() => {
    const fetch = async () => {
      await new Promise(r => setTimeout(r, 800));
      setShipmentStatus([
        { id: 1, trackingNumber: 'X2345', status: 'In Transit', destination: 'Mombasa', eta: 'Jun 28' },
        { id: 2, trackingNumber: 'X6789', status: 'Processing', destination: 'Nairobi', eta: 'Jun 30' },
        { id: 3, trackingNumber: 'X1011', status: 'Delivered', destination: 'Kisumu', eta: 'Jun 25' },
      ]);
      setLoading(false);
    };
    fetch();
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const handleLogout = () => navigate('/login');

  const iconFor = (status: string) => {
    if (status === 'In Transit') return <Truck className="w-4 h-4 text-yellow-500" />;
    if (status === 'Processing') return <Package className="w-4 h-4 text-blue-500" />;
    if (status === 'Delivered') return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <Package className="w-4 h-4 text-gray-500" />;
  };

  const isDark = theme === 'dark';
  const bgMain = isDark ? 'bg-[#111]' : 'bg-gray-100';
  const txtMain = isDark ? 'text-white' : 'text-gray-900';

  return (
    <div className={`${bgMain} ${txtMain} min-h-screen flex`}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all bg-black text-white flex flex-col justify-between`}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold text-[#FFD700]">
              {sidebarOpen ? 'LinkaFrex' : 'LF'}
            </h1>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-[#FFD700]">
              {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>

          <nav className="flex-1 px-2 space-y-1">
            {navLinks.map(({ title, icon: Icon, path }) => (
              <Link key={title} to={path}
                className="flex items-center p-2 rounded hover:bg-gray-800 transition">
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="ml-3">{title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Profile & Logout */}
        <div className="py-4 px-4 border-t border-gray-700">
          <Link to="/dashboard/profile" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold">
              {user.initials}
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="mt-4 flex items-center w-full p-2 rounded hover:bg-gray-800 transition text-red-400"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200">
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
          </div>
          <div className="relative">
            <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative p-2 rounded-full hover:bg-gray-200">
              <Bell className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full text-white w-4 h-4 flex items-center justify-center">{unreadCount}</span>}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg">
                <div className="p-2 font-semibold border-b">Notifications</div>
                {recentActivities.map(a => (
                  <div key={a.id} className={`p-2 text-sm border-b ${!a.read ? 'bg-blue-50' : ''}`}>
                    {a.action} <span className="text-xs text-gray-500">{a.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Admin stats */}
        {user.role === 'admin' && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Total Shipments', 'Weekly Deliveries', 'Billing Total', 'Delivery Rate'].map((label, i) => (
              <div key={i} className="bg-white dark:bg-[#1a1a1a] p-4 rounded shadow border">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="mt-2 text-xl font-semibold">
                  {i === 0 ? 126 : i === 1 ? 32 : i === 2 ? 'KSh 150K' : '98%'}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Recent shipments */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Shipments</h3>
            <Link to="/dashboard/history" className="text-[#FFD700]">View All</Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-10"><div className="animate-spin h-8 w-8 border-b-2 border-[#FFD700] rounded-full" /></div>
          ) : (
            <div className="space-y-3">
              {shipmentStatus.map(s => (
                <div key={s.id} className="bg-white dark:bg-[#1a1a1a] p-4 rounded shadow flex justify-between items-center border">
                  <div className="flex items-center gap-3">
                    {iconFor(s.status)}
                    <span>#{s.trackingNumber}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {s.destination} • {s.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;