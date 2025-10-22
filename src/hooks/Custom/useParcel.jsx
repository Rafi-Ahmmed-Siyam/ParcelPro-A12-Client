import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useParcel = () => {
   const axiosSecure = useAxiosSecure();
   const {
      data: parcels = [],
      refetch: reloadParcelData,
      isLoading,
      isPending,
      isFetching,
   } = useQuery({
      queryKey: ['parcels'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('/parcels/admin');

         return data;
      },

      keepPreviousData: true,
   });

   // Get Search Data
   const getSearchData = async (fromDate, toDate) => {
      const { data } = await axiosSecure.get(
         `/parcels/admin?fromDate=${fromDate}&toDate=${toDate}`
      );
      return data;
   };

   return {
      parcels,
      reloadParcelData,
      isPending,
      isLoading,
      isFetching,
      getSearchData,
   };
};

export default useParcel;
