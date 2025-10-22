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
      queryKey: ['users', currentPage],
      queryFn: async () => {
         const { data } = await axiosSecure.get(
            `/users?currentPage=${currentPage}&limit=5`
         );
         return data;
      },
      enabled: currentPage !== null && currentPage !== undefined,
      keepPreviousData: true,
   });

   return { users, reloadUsers, isPending, isLoading };
};

export default useAllUser;
