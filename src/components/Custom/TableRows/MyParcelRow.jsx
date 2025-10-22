import Container from '@/components/Custom/Shared/Container';
import AllParcelsRow from '@/components/Custom/TableRows/AllParcelsRow';
import LoadingSpinner from '@/components/LoadingSpinner';
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
import React, { useState } from 'react';

const AllParcels = () => {
   const [fromDate, setFromDate] = useState('');
   const [toDate, setToDate] = useState('');
   const [searchClicked, setSearchClicked] = useState(false);

   const { parcels, reloadParcelData, isPending, isLoading, isFetching } =
      useParcel(fromDate, toDate, searchClicked);

   const handleSearch = () => {
      if (!fromDate || !toDate) {
         alert('দয়া করে From এবং To date নির্বাচন করুন।');
         return;
      }
      setSearchClicked((prev) => !prev); // toggle করে query run
   };

   if (isLoading && !parcels.length) return <LoadingSpinner />;

   return (
      <Container>
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               All Parcels
            </h1>
         </div>

         {/* Search Section */}
         <div className="border border-slate-200 rounded-md p-5 mb-6 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-700 mb-4">
               Search by Requested Delivery Date Range
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 gap-4">
               <div className="flex flex-col w-full md:w-[250px]">
                  <label
                     htmlFor="fromDate"
                     className="text-sm font-medium text-slate-600 mb-1"
                  >
                     From Date
                  </label>
                  <Input
                     id="fromDate"
                     type="date"
                     value={fromDate}
                     onChange={(e) => setFromDate(e.target.value)}
                     className="rounded-sm py-2 w-full"
                  />
               </div>

               <div className="flex flex-col w-full md:w-[250px]">
                  <label
                     htmlFor="toDate"
                     className="text-sm font-medium text-slate-600 mb-1"
                  >
                     To Date
                  </label>
                  <Input
                     id="toDate"
                     type="date"
                     value={toDate}
                     onChange={(e) => setToDate(e.target.value)}
                     className="rounded-sm py-2 w-full"
                  />
               </div>

               <div className="flex items-center">
                  <Button onClick={handleSearch} className="btn btn-neutral">
                     Search
                  </Button>
               </div>
            </div>
         </div>

         {/* Table Section */}
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
                           colSpan={7}
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
