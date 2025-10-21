import Container from '@/components/Custom/Shared/Container';
import AllParcelsRow from '@/components/Custom/TableRows/AllParcelsRow';
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
   TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useParcel from '@/hooks/Custom/useParcel';
import React from 'react';

const AllParcels = () => {
   const { parcels, reloadParcelData, isPending, isLoading } = useParcel();

   if (isLoading || isPending) return <LoadingSpinner />;

   return (
      <Container>
         {/* Header Section */}
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               All Parcels
            </h1>
         </div>
         {/* Date search section */}
         <div className="border border-slate-200 rounded-md p-4 mb-6 flex flex-col md:flex-row md:items-end md:justify-start gap-4">
            <div className="flex flex-col">
               <label
                  htmlFor="fromDate"
                  className="text-sm font-medium text-slate-700 mb-1"
               >
                  From Date
               </label>
               <Input
                  id="fromDate"
                  type="date"
                  className="max-w-[220px] lg:w-[220px]"
               />
            </div>

            <div className="flex flex-col">
               <label
                  htmlFor="toDate"
                  className="text-sm font-medium text-slate-700 mb-1"
               >
                  To Date
               </label>
               <Input
                  id="toDate"
                  type="date"
                  className="max-w-[220px] lg:w-[220px]"
               />
            </div>

            <Button className="bg-primary text-white px-6 mt-2 md:mt-0">
               Search
            </Button>
         </div>

         {/* table Section */}
         <div className="border-2 border-slate-200 rounded-sm w-full px-2 lg:px-4 py-2.5 overflow-x-auto">
            <Table className="min-w-full">
               <TableHeader className="bg-slate-100">
                  <TableRow>
                     <TableHead>Sender Name</TableHead>
                     <TableHead>Sender Phone</TableHead>
                     <TableHead>Booking Date</TableHead>
                     <TableHead>Req. Del. Date</TableHead>
                     <TableHead>Cost</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead className="text-center">Manage</TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {!parcels?.length ? (
                     <TableRow>
                        <TableCell
                           colSpan={9}
                           className="text-center py-4 text-slate-500"
                        >
                           No parcels found.
                        </TableCell>
                     </TableRow>
                  ) : (
                     parcels.map((parcel) => (
                        <AllParcelsRow
                           key={parcel._id}
                           parcel={parcel}
                           refetch={reloadParcelData}
                        />
                     ))
                  )}
               </TableBody>
            </Table>
         </div>
      </Container>
   );
};

export default AllParcels;
