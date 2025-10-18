import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useParcel = () => {
   const axiosSecure = useAxiosSecure();
   const {
      data: parcels = [],
      refetch: reloadParcelData,
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['parcels'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('/parcels/admin');
         // console.log(data);
         return data;
      },
   });
   return { parcels, reloadParcelData, isPending, isLoading };
};

export default useParcel;
