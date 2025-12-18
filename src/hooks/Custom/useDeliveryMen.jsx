import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useDeliveryMen = () => {
   const axiosSecure = useAxiosSecure();
   const { data: deliveryMen,refetch:reloadDeliveryMen,isLoading,isPending } = useQuery({
      queryKey: ['deliveryMen'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('/users/deliveryMen');
         return data;
      },
   });
   return {deliveryMen,reloadDeliveryMen,isLoading,isPending}
};

export default useDeliveryMen;
