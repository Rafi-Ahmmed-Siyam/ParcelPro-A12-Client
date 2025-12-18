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
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { errorToast } from '@/Utilities/Toasts';

const AllParcels = () => {
   const axiosSecure = useAxiosSecure();
   const [fromDate, setFromDate] = useState('');
   const [toDate, setToDate] = useState('');
   const [filteredParcel, setFilteredParcel] = useState(null);
   const { parcels, reloadParcelData, isPending, isLoading, getSearchData } =
      useParcel();

   const handleSearch = async () => {
      if (!fromDate || !toDate) return errorToast('Please first select date!');
      const data = await getSearchData(fromDate, toDate);
      setFilteredParcel(data);
   };

   const handleReset = () => {
      setFromDate('');
      setToDate('');
      setFilteredParcel(null);
   };

   const parcelsData = filteredParcel || parcels;

   if (isLoading || isPending) return <LoadingSpinner />;
   return (
      <Container>
         {/* Header Section */}
         <section className='sticky top-0 z-10'>
            <div className="border border-slate-200 rounded-md p-5 mb-6 bg-slate-50">
               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  All Parcels
               </h1>
               <h2 className="text-base font-semibold text-slate-700 mb-2">
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
                        className="rounded-sm py-2 w-full"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
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
                        className="rounded-sm py-2 w-full"
                        onChange={(e) => setToDate(e.target.value)}
                     />
                  </div>

                  <div className="flex items-center">
                     <Button
                        onClick={handleSearch}
                        className={'bg-blue-600 text-white hover:bg-blue-700'}
                     >
                        Search
                     </Button>
                     <Button
                        onClick={handleReset}
                        className={
                           'ml-2 bg-gray-300 text-gray-800 hover:bg-gray-400'
                        }
                     >
                        Reset
                     </Button>
                  </div>
               </div>
            </div>
         </section>

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
                     <TableHead className={'text-center'}>Status</TableHead>
                     <TableHead className="text-center">Manage</TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {!parcelsData?.length ? (
                     <TableRow>
                        <TableCell
                           colSpan={9}
                           className="text-center py-4 text-slate-500"
                        >
                           No parcels found.
                        </TableCell>
                     </TableRow>
                  ) : (
                     parcelsData.map((parcel) => (
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
