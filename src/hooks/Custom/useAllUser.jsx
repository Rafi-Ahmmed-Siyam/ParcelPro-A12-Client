import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllUser = (currentPage) => {
   const axiosSecure = useAxiosSecure();
   const {
      data: users = [],
      refetch: reloadUsers,
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['allUsers', currentPage],
      queryFn: async () => {
         const { data } = await axiosSecure.get(
            `/users/admin?currentPage=${currentPage}&limit=5`
         );
         return data;
      },
      enabled: currentPage !== null && currentPage !== undefined,
      keepPreviousData: true,
   });

   return { users, reloadUsers, isPending, isLoading };
};

export default useAllUser;
