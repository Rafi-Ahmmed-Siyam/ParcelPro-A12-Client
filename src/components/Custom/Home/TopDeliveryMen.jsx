import useAxiosPublic from '@/hooks/Custom/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import React from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import LoadingSpinner from '@/components/LoadingSpinner';

const TopDeliveryMen = () => {
   const axiosPublic = useAxiosPublic();
   const {
      data: topDeliveryMen = [],
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['topDeliveryMen'],
      queryFn: async () => {
         const { data } = await axiosPublic.get('/top-deliveryMen');
         return data;
      },
   });

   // console.log(topDeliveryMen);
   if (isLoading || isPending) return <LoadingSpinner />;

   return (
      <section className=" py-10">
         <div className="max-w-7xl mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-12">
               <h2 className="text-3xl font-extrabold text-gray-800">
                  Top Delivery Men
               </h2>
               <p className="text-gray-600 mt-2">
                  Our best performing delivery heroes who ensure safe and
                  on-time delivery every day.
               </p>
            </div>

            {/* Cards  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {topDeliveryMen.map((deliveryMan) => (
                  <div
                     key={deliveryMan._id}
                     className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
                  >
                     <img
                        src={
                           deliveryMan.image ||
                           'https://i.ibb.co.com/nNZXTcxf/delivery-man.png'
                        }
                        alt="Rahim Uddin"
                        className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                     />
                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {deliveryMan?.name}
                     </h3>
                     <p className="text-gray-600 mb-3">
                        Parcels Delivered:{' '}
                        <span className="font-semibold text-blue-600">
                           {deliveryMan.totalDelivered}
                        </span>
                     </p>
                     <div className="flex justify-center items-center gap-2">
                        <Rating
                           style={{ maxWidth: 100 }}
                           value={deliveryMan.avgRating}
                           readOnly
                        />
                        <p className="text-gray-700 font-medium">
                           {deliveryMan.avgRating.toFixed(1)} / 5
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default TopDeliveryMen;
