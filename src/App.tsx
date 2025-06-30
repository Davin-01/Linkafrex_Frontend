// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './pages/auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized'; // ✅ Add this page

import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';

// Role-Based Dashboards
import CustomerDashboard from './dashboards/customer/CustomerDashboard';
import CarrierDashboard from './dashboards/carrier/CarrierDashboard';
import AdminDashboard from './dashboards/admin/AdminDashboard';

// Dashboard Children
import CreateShipment from './pages/CreateShipment';
import TrackShipment from './pages/TrackShipment';
import MyShipments from './pages/MyShipments';
import RegionalAgents from './pages/RegionalAgents';
import Affiliate from './pages/Affiliate';
import Settings from './pages/Settings';

// Shipping
import ShippingDetail from './pages/ShippingDetail';
import InternationalShipping from './pages/shipping/InternationalShipping';
import NationalShipping from './pages/shipping/NationalShipping';
import CountyShipping from './pages/shipping/CountyShipping';
import ExpressShipping from './pages/shipping/ExpressShipping';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-gold-100 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* Unauthorized Access */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Shipping Routes */}
            <Route path="/shipping/:level" element={<ShippingDetail />} />
            <Route path="/shipping/international" element={<InternationalShipping />} />
            <Route path="/shipping/national" element={<NationalShipping />} />
            <Route path="/shipping/county-level" element={<CountyShipping />} />
            <Route path="/shipping/express" element={<ExpressShipping />} />

            {/* Protected Role-Based Dashboards */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carrier"
              element={
                <ProtectedRoute allowedRoles={['carrier']}>
                  <CarrierDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Dashboard Subpages */}
            <Route
              path="/dashboard/create"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CreateShipment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/track"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <TrackShipment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/my-shipments"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <MyShipments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/agents"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <RegionalAgents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/affiliate"
              element={
                <ProtectedRoute allowedRoles={['carrier', 'admin']}>
                  <Affiliate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute allowedRoles={['customer', 'carrier', 'admin']}>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
