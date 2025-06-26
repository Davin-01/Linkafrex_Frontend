import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          token,
          role: decoded.role,
          email: decoded.email,
        });
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, [navigate]);

  // Login method
  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      setUser({
        token,
        role: decoded.role,
        email: decoded.email,
      });

      // Redirect based on role
      if (decoded.role === 'admin') navigate('/admin');
      else if (decoded.role === 'carrier') navigate('/carrier');
      else navigate('/dashboard');
    } catch (error) {
      console.error('Login failed. Invalid token.');
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  // you can handle the error much better
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

