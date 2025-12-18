import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useRole from './useRole';

const useDelivery = () => {
   const axiosSecure = useAxiosSecure();
   const { role } = useRole();

   const {
      data: deliveries = [],
      refetch: reloadDeliveries,
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['delivery', role.id],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/deliveries/${role?.id}`);
         return data;
      },
      enabled: !!role.id,
   });
   return { deliveries, reloadDeliveries, isLoading, isPending };
};

export default useDelivery;
