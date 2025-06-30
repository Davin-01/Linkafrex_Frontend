import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { logout } from '../utils/logout';

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || !role) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded: any = jwtDecode(token);
    const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

    if (isExpired) {
      logout();
      return null;
    }

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
  } catch (err) {
    logout();
    return null;
  }
};

export default ProtectedRoute;
  