import Container from '@/components/Custom/Shared/Container';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { FaBox, FaUserFriends, FaTruck } from 'react-icons/fa';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';
import LoadingSpinner from '@/components/LoadingSpinner';

const Statistics = () => {
   const axiosSecure = useAxiosSecure();
   // get stats data
   const {
      data: adminStats = [],
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['adminStats'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('/admin/stats');
         return data;
      },
   });
   // console.log(adminStats);
   const {
      totalUsers,
      totalParcels,
      totalDelivered,
      bookingPerDate,
      bookedVsDelivery,
      totalRevenue,
   } = adminStats || {};

   if (isLoading || isPending) return <LoadingSpinner />;
   return (
      <Container>
         {/* Header */}
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
               Dashboard Statistics
            </h1>
            <p className="text-slate-500 mt-1">
               Overview of your platform’s performance and activity insights.
            </p>
         </div>

         {/* Top Stats */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Total Revenue */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition">
               <div>
                  <p className="text-slate-500 text-sm">Total Revenue</p>
                  <h2 className="text-3xl font-semibold text-slate-800 mt-1">
                     ৳{totalRevenue || 0}
                  </h2>
               </div>
               <div className="bg-green-100 p-4 rounded-full">
                  <TbCurrencyTaka className="text-green-600 text-3xl" />
               </div>
            </div>

            {/* Total Parcels */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition">
               <div>
                  <p className="text-slate-500 text-sm">Total Parcels</p>
                  <h2 className="text-3xl font-semibold text-slate-800 mt-1">
                     {totalParcels || 0}
                  </h2>
               </div>
               <div className="bg-blue-100 p-4 rounded-full">
                  <FaBox className="text-blue-600 text-3xl" />
               </div>
            </div>

            {/* Delivered Parcels */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition">
               <div>
                  <p className="text-slate-500 text-sm">Delivered Parcels</p>
                  <h2 className="text-3xl font-semibold text-slate-800 mt-1">
                     {totalDelivered || 0}
                  </h2>
               </div>
               <div className="bg-yellow-100 p-4 rounded-full">
                  <FaTruck className="text-yellow-600 text-3xl" />
               </div>
            </div>

            {/* Total Users */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition">
               <div>
                  <p className="text-slate-500 text-sm">Total Users</p>
                  <h2 className="text-3xl font-semibold text-slate-800 mt-1">
                     {totalUsers || 0}
                  </h2>
               </div>
               <div className="bg-purple-100 p-4 rounded-full">
                  <FaUserFriends className="text-purple-600 text-3xl" />
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
               <h3 className="text-lg font-semibold text-slate-700 mb-4">
                  Bookings by Date
               </h3>
               <div className=" text-slate-400 border border-dashed rounded-lg">
                  <BarChart bookingPerDate={bookingPerDate} />
               </div>
            </div>

            {/* Line Chart  */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
               <h3 className="text-lg font-semibold text-slate-700 mb-4">
                  Booked vs Delivered
               </h3>
               <div className=" text-slate-400 border border-dashed rounded-lg">
                  <LineChart bookedVsDelivery={bookedVsDelivery} />
               </div>
            </div>
         </div>
      </Container>
   );
};

export default Statistics;
