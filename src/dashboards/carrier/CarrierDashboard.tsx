import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  Star, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Navigation, 
  User, 
  Settings, 
  BarChart3,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Save,
  X,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CarrierDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [isAvailable, setIsAvailable] = useState(true);
  const [vehicleStatus, setVehicleStatus] = useState('active');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock data - replace with actual API calls
  const [carrierData, setCarrierData] = useState({
    id: 'C001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    rating: 4.8,
    totalDeliveries: 342,
    totalEarnings: 15420.50,
    monthlyEarnings: 3240.75,
    weeklyEarnings: 856.25,
    profilePicture: null,
    vehicleType: 'Van',
    licensePlate: 'ABC-1234',
    pendingProfileUpdate: false
  });

  const [assignments, setAssignments] = useState([
    {
      id: 'A001',
      pickup: '123 Main St, City A',
      delivery: '456 Oak Ave, City B',
      distance: '15.2 miles',
      estimatedTime: '45 mins',
      payment: 45.00,
      priority: 'high',
      deadline: '2:30 PM',
      status: 'pending'
    },
    {
      id: 'A002',
      pickup: '789 Pine Rd, City C',
      delivery: '321 Elm St, City D',
      distance: '8.7 miles',
      estimatedTime: '25 mins',
      payment: 28.50,
      priority: 'medium',
      deadline: '4:00 PM',
      status: 'pending'
    },
    {
      id: 'A003',
      pickup: '555 Cedar Ln, City E',
      delivery: '777 Birch Ave, City F',
      distance: '22.1 miles',
      estimatedTime: '65 mins',
      payment: 62.00,
      priority: 'low',
      deadline: '6:15 PM',
      status: 'pending'
    }
  ]);

  const [earningsData] = useState([
    { day: 'Mon', earnings: 120 },
    { day: 'Tue', earnings: 150 },
    { day: 'Wed', earnings: 180 },
    { day: 'Thu', earnings: 90 },
    { day: 'Fri', earnings: 200 },
    { day: 'Sat', earnings: 250 },
    { day: 'Sun', earnings: 160 }
  ]);

  const [monthlyData] = useState([
    { month: 'Jan', earnings: 2800 },
    { month: 'Feb', earnings: 3200 },
    { month: 'Mar', earnings: 2950 },
    { month: 'Apr', earnings: 3400 },
    { month: 'May', earnings: 3100 },
    { month: 'Jun', earnings: 3240 }
  ]);

  const [editedProfile, setEditedProfile] = useState({
    name: carrierData.name,
    email: carrierData.email,
    phone: carrierData.phone,
    vehicleType: carrierData.vehicleType,
    licensePlate: carrierData.licensePlate
  });

  // Simulate data fetching
  const fetchData = async (endpoint) => {
    setRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    // Here you would make actual API calls to your backend
    console.log(`Fetching data from: ${endpoint}`);
  };

  // Handle assignment actions
  const handleAssignmentAction = async (assignmentId, action) => {
    try {
      const updatedAssignments = assignments.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, status: action }
          : assignment
      );
      setAssignments(updatedAssignments);
      
      // Make API call to backend
      await fetchData(`/api/assignments/${assignmentId}/${action}`);
      
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  // Handle availability toggle
  const toggleAvailability = async () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);
    
    // Make API call to update availability
    await fetchData(`/api/carrier/availability`);
  };

  // Handle vehicle status toggle
  const toggleVehicleStatus = async () => {
    const newStatus = vehicleStatus === 'active' ? 'maintenance' : 'active';
    setVehicleStatus(newStatus);
    
    // Make API call to update vehicle status
    await fetchData(`/api/carrier/vehicle-status`);
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      setCarrierData({
        ...carrierData,
        ...editedProfile,
        pendingProfileUpdate: true
      });
      
      // Make API call to submit profile update for admin approval
      await fetchData('/api/carrier/profile-update');
      
      setIsEditingProfile(false);
      alert('Profile update submitted for admin approval');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle route optimization
  const optimizeRoute = async () => {
    await fetchData('/api/carrier/optimize-route');
    alert('Route optimization completed!');
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "maroon" }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color === 'maroon' ? 'text-red-900' : 'text-gray-900'}`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color === 'maroon' ? 'bg-red-100' : 'bg-gray-100'}`}>
          <Icon className={`w-6 h-6 ${color === 'maroon' ? 'text-red-900' : 'text-gray-600'}`} />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-red-900 text-white' 
          : 'text-gray-600 hover:text-red-900 hover:bg-red-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="w-8 h-8 text-red-900 mr-3" />
              <h1 className="text-xl font-bold text-red-900">Carrier Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Refresh Button */}
              <button 
                onClick={() => fetchData('/api/carrier/refresh')}
                className="p-2 text-gray-600 hover:text-red-900 transition-colors"
                disabled={refreshing}
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              
              {/* Availability Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Available</span>
                <button
                  onClick={toggleAvailability}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAvailable ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAvailable ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {/* Vehicle Status */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Vehicle</span>
                <button
                  onClick={toggleVehicleStatus}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    vehicleStatus === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {vehicleStatus}
                </button>
              </div>
              
              {/* Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{carrierData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Update Notice */}
        {carrierData.pendingProfileUpdate && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-800">
                Your profile update is pending admin approval.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <TabButton 
                id="overview" 
                label="Overview" 
                isActive={activeTab === 'overview'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="assignments" 
                label="Assignments" 
                isActive={activeTab === 'assignments'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="earnings" 
                label="Earnings" 
                isActive={activeTab === 'earnings'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="profile" 
                label="Profile" 
                isActive={activeTab === 'profile'} 
                onClick={setActiveTab} 
              />
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={DollarSign} 
                title="Total Earnings" 
                value={`$${carrierData.totalEarnings.toLocaleString()}`}
                subtitle="All time"
              />
              <StatCard 
                icon={Package} 
                title="Deliveries" 
                value={carrierData.totalDeliveries}
                subtitle="Completed"
              />
              <StatCard 
                icon={Star} 
                title="Rating" 
                value={carrierData.rating}
                subtitle="Average rating"
              />
              <StatCard 
                icon={Calendar} 
                title="This Month" 
                value={`$${carrierData.monthlyEarnings.toLocaleString()}`}
                subtitle="Monthly earnings"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Earnings</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="earnings" stroke="#7f1d1d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assignments</h3>
                <div className="space-y-3">
                  {assignments.slice(0, 3).map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{assignment.pickup}</p>
                        <p className="text-sm text-gray-500">{assignment.distance} • {assignment.estimatedTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-900">${assignment.payment}</p>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(assignment.priority)}`}>
                          {assignment.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Available Assignments</h2>
              <button
                onClick={optimizeRoute}
                className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Optimize Route</span>
              </button>
            </div>

            <div className="grid gap-4">
              {assignments.map(assignment => (
                <div key={assignment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">Assignment #{assignment.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(assignment.priority)}`}>
                          {assignment.priority} priority
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">Pickup: {assignment.pickup}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-gray-600">Delivery: {assignment.delivery}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{assignment.distance}</span>
                          <span>{assignment.estimatedTime}</span>
                          <span>Due: {assignment.deadline}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-900">${assignment.payment}</p>
                      <p className="text-sm text-gray-500">Payment</p>
                    </div>
                  </div>
                  
                  {assignment.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAssignmentAction(assignment.id, 'accepted')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleAssignmentAction(assignment.id, 'rejected')}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                  
                  {assignment.status === 'accepted' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 font-medium">Assignment Accepted</p>
                    </div>
                  )}
                  
                  {assignment.status === 'rejected' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-gray-600">Assignment Rejected</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                icon={DollarSign} 
                title="Today's Earnings" 
                value={`$${carrierData.weeklyEarnings.toLocaleString()}`}
                subtitle="Current day"
              />
              <StatCard 
                icon={TrendingUp} 
                title="Weekly Earnings" 
                value={`$${carrierData.weeklyEarnings.toLocaleString()}`}
                subtitle="This week"
              />
              <StatCard 
                icon={BarChart3} 
                title="Monthly Earnings" 
                value={`$${carrierData.monthlyEarnings.toLocaleString()}`}
                subtitle="This month"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Earnings (This Week)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="earnings" fill="#7f1d1d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Earnings Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="earnings" stroke="#7f1d1d" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <p className="text-gray-900">{carrierData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditingProfile ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <p className="text-gray-900">{carrierData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditingProfile ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <p className="text-gray-900">{carrierData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  {isEditingProfile ? (
                    <select
                      value={editedProfile.vehicleType}
                      onChange={(e) => setEditedProfile({...editedProfile, vehicleType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Van">Van</option>
                      <option value="Truck">Truck</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Car">Car</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{carrierData.vehicleType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={editedProfile.licensePlate}
                      onChange={(e) => setEditedProfile({...editedProfile, licensePlate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <p className="text-gray-900">{carrierData.licensePlate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-900">{carrierData.rating}</span>
                    <span className="text-gray-500">({carrierData.totalDeliveries} deliveries)</span>
                  </div>
                </div>
              </div>

              {isEditingProfile && (
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={handleProfileUpdate}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarrierDashboard;