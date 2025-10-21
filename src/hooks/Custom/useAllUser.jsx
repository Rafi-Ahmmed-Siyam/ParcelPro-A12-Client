import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllUser = () => {
   const axiosSecure = useAxiosSecure();
   const {
      data: users = [],
      refetch: reloadUsers,
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('users');
         return data;
      },
   });

   return { users, reloadUsers, isPending, isLoading };
};

export default useAllUser;
