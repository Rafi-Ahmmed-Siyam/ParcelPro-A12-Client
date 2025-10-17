import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUserParcels = (status) => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   const {
      data: userParcels = [],
      refetch,
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['userParcels', status, user.email],
      queryFn: async () => {
         const { data } = await axiosSecure.get(
            `/parcels/?email=${user?.email}&status=${status}`
         );
         return data;
      },
      keepPreviousData: true,
   });
   return [userParcels, refetch, isLoading, isPending];
};

export default useUserParcels;
