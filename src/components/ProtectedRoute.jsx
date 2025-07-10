import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../util/auth';

const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute; 