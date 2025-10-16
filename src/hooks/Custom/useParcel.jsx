import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useParcel = () => {
   const axiosSecure = useAxiosSecure();
   const {
      data: parcelData = [],
      refetch,
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['parcels'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('/parcels');
         console.log(data);
         return data;
      },
   });
   return [parcelData, refetch, isPending, isLoading];
};

export default useParcel;
