import React from 'react';
import { useAuth } from '../context/Auth.context';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;