import LoadingSpinner from '@/components/LoadingSpinner';
import useAuth from '@/hooks/Custom/useAuth';
import useRole from '@/hooks/Custom/useRole';
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
   const { role, isLoading, isPending } = useRole();
   const { user, loading } = useAuth();

   if (isLoading || isPending || loading) return <LoadingSpinner />;
   if (user && role?.role === 'Admin') return children;
   return <Navigate to={'/'} />;
};

export default AdminRoute;
