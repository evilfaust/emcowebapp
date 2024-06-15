import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import AuthService from '../../services/authService';

const AdminRoute: React.FC<RouteProps> = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser || !currentUser.is_staff) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
