import NumberInputModal from '@/components/Custom/Modals/NumberInputModal';
import Container from '@/components/Custom/Shared/Container';
import DeliveryListRow from '@/components/Custom/TableRows/DeliveryListRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import useDelivery from '@/hooks/Custom/useDelivery';
import useRole from '@/hooks/Custom/useRole';
import React, { useEffect, useState } from 'react';

const DeliveryList = () => {
   const { role, reloadRole } = useRole();
   // console.log(role.verified);
   const [modalOpen, setModalOpen] = useState(false);
   // Open modal automatically if not verified
   useEffect(() => {
      if (role && role.verified === false) {
         setModalOpen(true);
      } else {
         setModalOpen(false);
      }
   }, [role, role.verified]);
   const handleOpenChange = (open) => {
      if (role.verified) {
         setModalOpen(open);
      } else {
         setModalOpen(true);
      }
   };

   // Get deleveries data
   const { deliveries, reloadDeliveries, isLoading, isPending } = useDelivery();
   if ((isLoading, isPending)) return <LoadingSpinner />;
   return (
      <Container>
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               My Delivery List
            </h1>
         </div>

         {/* table Section */}
         <div className="border-2 border-slate-200 rounded-sm w-full px-2 lg:px-4 py-2.5 overflow-x-auto">
            <Table className="min-w-full">
               <TableHeader className="bg-slate-100">
                  <TableRow>
                     <TableHead>Sender Name</TableHead>
                     <TableHead>Receiver's Name</TableHead>
                     <TableHead>Sender Phone</TableHead>
                     <TableHead>Req. Del. Date</TableHead>
                     <TableHead>Approx. Del. Date</TableHead>
                     <TableHead>Receiver's phone</TableHead>
                     <TableHead>Receiver's Address</TableHead>
                     <TableHead>Location</TableHead>
                     <TableHead>Cancel</TableHead>
                     <TableHead>Deliver</TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {!deliveries?.length ? (
                     <TableRow>
                        <td
                           colSpan={10}
                           className="text-center py-6 text-slate-500"
                        >
                           No deliveries Assigned Today
                        </td>
                     </TableRow>
                  ) : (
                     deliveries.map((delivery) => (
                        <DeliveryListRow
                           key={delivery._id}
                           delivery={delivery}
                           reloadDeliveries={reloadDeliveries}
                        />
                     ))
                  )}
               </TableBody>
            </Table>
         </div>

         {/* This modal show, when a delivery man has no phone number in DB */}
         <NumberInputModal
            open={modalOpen}
            isOpen={handleOpenChange}
            role={role}
            reloadRole={reloadRole}
            handleOpenChange={handleOpenChange}
         />
      </Container>
   );
};

export default DeliveryList;
