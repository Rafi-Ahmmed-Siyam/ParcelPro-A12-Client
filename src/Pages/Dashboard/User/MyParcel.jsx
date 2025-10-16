import MyParcelRow from '@/components/Custom/Shared/Tables/MyParcelRow';
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
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';

import React, { useState } from 'react';

const MyParcel = () => {
   return (
      <section className="py-6 px-4 md:px-6 lg:px-14">
         {/* Heading + Filter */}
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               My Parcels
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
                     <TableHead>Parcel Type</TableHead>
                     <TableHead>Req. Date</TableHead>
                     <TableHead>Appx. Date</TableHead>
                     <TableHead>Booking Date</TableHead>
                     <TableHead>Price</TableHead>
                     <TableHead>Delivery Men ID</TableHead>
                     <TableHead>Booking Status</TableHead>
                     <TableHead>Update</TableHead>
                     <TableHead>Cancel</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <MyParcelRow />

                  <TableRow>
                     <TableCell
                        colSpan={9}
                        className="text-center py-4 text-slate-500"
                     >
                        No parcels found.
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </div>
      </section>
   );
};

export default MyParcel;
