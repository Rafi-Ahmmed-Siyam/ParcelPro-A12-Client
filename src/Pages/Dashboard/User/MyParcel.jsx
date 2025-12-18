import Container from '@/components/Custom/Shared/Container';
import MyParcelRow from '@/components/Custom/TableRows/MyParcelRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import useRole from '@/hooks/Custom/useRole';
import useUserParcels from '@/hooks/Custom/useUserParcels';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyParcel = () => {
   const navigate = useNavigate();
   const { role } = useRole();
   const [status, setStatus] = useState('all');
   const [userParcels, refetch, isLoading, isPending] = useUserParcels(status);

   // If any deliverymen or admin enter this page
   if (role.role === 'Admin') return navigate('/dashboard/statistics');
   if (role.role === 'DeliveryMen')
      return navigate('/dashboard/myDeliveryList');
   if (isLoading || isPending) return <LoadingSpinner />;
   return (
      <Container>
         <section className="mb-6 sticky top-0 z-10 overflow-y-auto  border px-3 py-4 rounded-sm bg-[#F1F5F9]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
               <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  My Parcels
               </h1>

               {/*  Filter by status */}
               <div className="flex items-center gap-2">
                  <label className="font-medium text-slate-700">
                     Filter by Status:
                  </label>
                  <Select value={status} onValueChange={setStatus}>
                     <SelectTrigger className="w-40 border-slate-300">
                        <SelectValue placeholder="Select status" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="On The Way">On The Way</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Returned">Returned</SelectItem>
                        <SelectItem value="Canceled">Canceled</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>
         </section>

         {/* table */}
         <div className="border-2 border-slate-200 rounded-sm w-full px-2 lg:px-4 py-2.5 overflow-x-auto">
            <Table className="min-w-full">
               <TableHeader className="bg-slate-100">
                  <TableRow>
                     <TableHead>Parcel Type</TableHead>
                     <TableHead>Req. Date</TableHead>
                     <TableHead>Appx. Date</TableHead>
                     <TableHead>Booking Date</TableHead>
                     <TableHead>Price</TableHead>
                     <TableHead>Delivery Men ID</TableHead>
                     <TableHead>Booking Status</TableHead>
                     <TableHead>Action</TableHead>
                     <TableHead>Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {!userParcels?.length ? (
                     <TableRow>
                        <td
                           colSpan={10}
                           className="text-center py-6 text-slate-500"
                        >
                           You haven’t made any payments yet.
                        </td>
                     </TableRow>
                  ) : (
                     userParcels.map((parcel) => (
                        <MyParcelRow
                           key={parcel._id}
                           parcel={parcel}
                           refetch={refetch}
                        />
                     ))
                  )}
               </TableBody>
            </Table>
         </div>
      </Container>
   );
};

export default MyParcel;
