import LoadingSpinner from '@/components/LoadingSpinner';
import useAuth from '@/hooks/Custom/useAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({ children }) => {
   const { user, loading } = useAuth();
   const location = useLocation();

   // console.log(location);
   if (loading) return <LoadingSpinner />;
   if (user) return children;
   return <Navigate to={'/login'} state={{ from: location }} replace />;
};

export default PrivetRoute;
