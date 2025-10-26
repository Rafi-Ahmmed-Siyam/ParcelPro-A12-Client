import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formateDate } from '@/Utilities/dateFormater';
import React, { useState } from 'react';
import ConfirmModal from '../Modals/ConfirmModal';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import useUserParcels from '@/hooks/Custom/useUserParcels';
import useParcel from '@/hooks/Custom/useParcel';
import { successToast } from '@/Utilities/Toasts';
import useRole from '@/hooks/Custom/useRole';

const DeliveryListRow = ({ delivery, reloadDeliveries }) => {
   const axiosSecure = useAxiosSecure();
   const { role } = useRole();
   console.log(role)
   const {
      _id,
      deliveryDate,
      approxDeliveryDate,
      deliveryAddress,
      receiverPhone,
      receiverName,
      senderPhone,
      senderName,
      bookingStatus,
   } = delivery || {};
   const [open, setOpen] = useState(false);
   const [, refetch] = useUserParcels();
   const { reloadParcelData } = useParcel();
   const [status, setStatus] = useState('');

   const hanDleUpdateStatus = async () => {
      try {
         const { data } = await axiosSecure.patch('/deliveries', {
            parcelId: _id,
            status,
            deliveryMenId: role.id,
         });
         console.log(data);
         if (data?.modifiedCount > 0) {
            refetch();
            reloadParcelData();
            reloadDeliveries();
            setOpen(false);
            successToast('Delivery Status Updated Successful');
         }
      } catch (err) {
         // console.log(err)
         console.log(err.message || 'Something went Wrong!');
      }
   };

   return (
      <TableRow>
         {/* Sender Name */}
         <TableCell>{senderName}</TableCell>
         {/* recei Phone */}
         <TableCell>{receiverName}</TableCell>
         {/*sender phone */}
         <TableCell>{senderPhone}</TableCell>
         {/* Req. Del. Date */}
         <TableCell>{formateDate(deliveryDate)}</TableCell>
         {/* appox delevery date */}
         <TableCell>{formateDate(approxDeliveryDate)}</TableCell>
         {/* Receiver's phone */}
         <TableCell>{receiverPhone}</TableCell>
         {/* Receiver's address */}
         <TableCell>{deliveryAddress}</TableCell>

         {/* Location button */}
         <TableCell>
            <Button
               size="sm"
               variant="secondary"
               className={'bg-blue-500 hover:bg-blue-600 text-white'}
            >
               Location
            </Button>
         </TableCell>

         {/*  Cancel button */}
         <TableCell>
            <Button
               disabled={
                  bookingStatus === 'Canceled' || bookingStatus === 'Delivered'
               }
               onClick={() => {
                  setStatus('Canceled'), setOpen(true);
               }}
               size="sm"
               variant="destructive"
            >
               Cancel
            </Button>
         </TableCell>

         {/* Deliver button */}
         <TableCell>
            <Button
               disabled={bookingStatus === 'Delivered'}
               onClick={() => {
                  setStatus('Delivered'), setOpen(true);
               }}
               size="sm"
               variant="success"
               className={'bg-green-600 hover:bg-green-700 text-white'}
            >
               Delivered
            </Button>
            <ConfirmModal
               open={open}
               setOpen={setOpen}
               heading={'Confirm Status Change'}
               description={
                  'Are you sure you want to update the status of this parcel?'
               }
               handleConfirm={hanDleUpdateStatus}
            />
         </TableCell>
      </TableRow>
   );
};

export default DeliveryListRow;
