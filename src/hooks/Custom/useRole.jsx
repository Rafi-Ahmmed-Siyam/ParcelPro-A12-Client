import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const {
      data: role = {},
      isLoading,
      isPending,
      refetch: reloadRole,
   } = useQuery({
      queryKey: ['role', user?.email],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/users/role/${user.email}`);
         console.log(data);
         return data;
      },
      enabled: !!user?.email,
   });
   return { role, isLoading, isPending, reloadRole };
};

export default useRole;
