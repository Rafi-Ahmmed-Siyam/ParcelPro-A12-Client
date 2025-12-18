import Container from '@/components/Custom/Shared/Container';
import AllDeliveryMenRow from '@/components/Custom/TableRows/AllDeliveryMenRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import useDeliveryMen from '@/hooks/Custom/useDeliveryMen';
import React from 'react';

const DeliveryMen = () => {
   const { deliveryMen, reloadDeliveryMen, isLoading, isPending } =
      useDeliveryMen();
   
   if ((isLoading, isPending)) return <LoadingSpinner />;
   return (
      <Container>
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               All Deliverymen
            </h1>
         </div>
         <div className="border-2 border-slate-200 rounded-sm w-full px-2 lg:px-4 py-2.5 overflow-x-auto">
            <Table className="min-w-full text-center">
               <TableHeader className="bg-slate-100">
                  <TableRow>
                     <TableHead className={'text-center'}>Image</TableHead>
                     <TableHead className={'text-center'}> Name</TableHead>
                     <TableHead className={'text-center'}> Email</TableHead>
                     <TableHead className={'text-center'}>
                        Phone Number
                     </TableHead>

                     <TableHead className={'text-center'}>
                        Total parcels delivered
                     </TableHead>
                     <TableHead className={'text-center'}>
                        Average review
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {!deliveryMen?.length ? (
                     <TableRow>
                        <TableCell
                           colSpan={9}
                           className="text-center py-4 text-slate-500"
                        >
                           No Delivery Men found.
                        </TableCell>
                     </TableRow>
                  ) : (
                     deliveryMen.map((deliveryMan) => (
                        <AllDeliveryMenRow
                           key={deliveryMan._id}
                           deliveryMan={deliveryMan}
                        />
                     ))
                  )}
               </TableBody>
            </Table>
         </div>
      </Container>
   );
};

export default DeliveryMen;
