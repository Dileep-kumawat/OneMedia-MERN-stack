import React from 'react';
import { useAuth } from '../context/Auth.context.jsx';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" />;
  return children;
};

export default PublicRoute;