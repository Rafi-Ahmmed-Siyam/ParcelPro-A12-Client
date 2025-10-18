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
} from '@/components/ui/table';
import useParcel from '@/hooks/Custom/useParcel';
import React from 'react';

const AllParcels = () => {
   const { parcels, reloadParcelData, isPending, isLoading } = useParcel();
   // console.log(parcels);

   if (isLoading || isPending) return <LoadingSpinner />;
   return (
      <Container>
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               All Parcels
            </h1>

            {/* Design-only Filter */}
            <div className="flex items-center gap-2">
               <label className="font-medium text-slate-700">
                  Filter by Status:
               </label>
               <Select>
                  <SelectTrigger className="w-40 border-slate-300">
                     <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="on the way">On the Way</SelectItem>
                     <SelectItem value="delivered">Delivered</SelectItem>
                     <SelectItem value="returned">Returned</SelectItem>
                     <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>

         {/* Table */}
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
                     <TableHead>Manage</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {/* Table row */}
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
                  {/* <AllParcelsRow /> */}
               </TableBody>
            </Table>
         </div>
      </Container>
   );
};

export default AllParcels;
