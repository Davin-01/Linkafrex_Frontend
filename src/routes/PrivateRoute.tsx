// src/routes/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
