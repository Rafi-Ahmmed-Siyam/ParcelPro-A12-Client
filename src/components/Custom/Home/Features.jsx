import useAxiosPublic from '@/hooks/Custom/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import {  ShieldCheck } from 'lucide-react';
import React from 'react';
import CountUp from 'react-countup';
import { FaShippingFast } from 'react-icons/fa';
import { MdManageHistory } from 'react-icons/md';

const Features = () => {
   const axiosPublic = useAxiosPublic();
   const {
      data: homeStats = [],
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['homeStats'],
      queryFn: async () => {
         const { data } = await axiosPublic.get('/home/stats');
         return data;
      },
   });
   // console.log(homeStats);
   const { totalUsers, totalParcels, totalDelivered } = homeStats || {};

   return (
      <section className="py-16">
         <div className="max-w-7xl mx-auto px-4">
            {/* Section Heading */}
            <div className="text-center mb-12">
               <h2 className="text-3xl font-extrabold text-slate-800">
                  Our Features
               </h2>
               <p className="text-slate-800 mt-2">
                  We provide reliable, fast, and secure parcel delivery
                  solutions.
               </p>
            </div>

            {/* --- Feature Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Feature 1 */}
               <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                  <ShieldCheck className="size-12 text-blue-500 mb-4" />

                  <h3 className="text-xl font-semibold mb-2">Parcel Safety</h3>
                  <p className="text-gray-600">
                     Your parcels are always protected with top-notch security
                     systems.
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                  {/* <Truck className="size-12 text-blue-500 mb-4" /> */}
                  <FaShippingFast className="text-blue-500 mb-4 size-11" />
                  <h3 className="text-xl font-semibold mb-2">
                     Super Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                     Experience lightning-fast delivery with our optimized
                     system.
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                  {/* <Package className="size-12 text-blue-500 mb-4" /> */}
                  <MdManageHistory className="size-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                     Easy Parcel Management
                  </h3>
                  <p className="text-gray-600">
                     Manage, track, and update all your parcels from one
                     dashboard.
                  </p>
               </div>
            </div>

            {/* --- Statistics Section --- */}
            <div className="max-w-7xl mx-auto  mt-16">
               <div className="bg-blue-600 text-white p-10 rounded-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                     {/* 1st Statistic */}
                     <div>
                        <h2 className="text-5xl font-extrabold">
                           {isLoading || isPending ? (
                              <span className="loading loading-ring loading-xl"></span>
                           ) : (
                              <CountUp
                                 start={0}
                                 end={totalParcels}
                                 duration={2.75}
                                 decimal="."
                                 separator=","
                              />
                           )}
                        </h2>
                        <p className="mt-2 text-blue-200 uppercase tracking-wider">
                           Parcels Booked
                        </p>
                     </div>
                     {/* 2nd Statistic */}
                     <div>
                        <h2 className="text-5xl font-extrabold">
                           {isLoading || isPending ? (
                              <span className="loading loading-ring loading-xl"></span>
                           ) : (
                              <CountUp
                                 start={0}
                                 end={totalDelivered}
                                 duration={2.75}
                                 decimal="."
                                 separator=","
                              />
                           )}
                        </h2>
                        <p className="mt-2 text-blue-200 uppercase tracking-wider">
                           Parcels Delivered
                        </p>
                     </div>
                     {/* 3rd Statistic */}
                     <div>
                        <h2 className="text-5xl font-extrabold">
                           {isLoading || isPending ? (
                              <span className="loading loading-ring loading-xl"></span>
                           ) : (
                              <CountUp
                                 start={0}
                                 end={totalUsers}
                                 duration={2.75}
                                 decimal="."
                                 separator=","
                              />
                           )}

                           {/* {totalUsers} */}
                        </h2>
                        <p className="mt-2 text-blue-200 uppercase tracking-wider">
                           Registered Users
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Features;
