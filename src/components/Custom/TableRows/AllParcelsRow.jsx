import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formateDate } from '@/Utilities/dateFormater';
import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import ManageParcelModal from '../Modals/ManageParcelModal';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import useUserParcels from '@/hooks/Custom/useUserParcels';
import { errorToast, successToast } from '@/Utilities/Toasts';
import useParcel from '@/hooks/Custom/useParcel';
import useDelivery from '@/hooks/Custom/useDelivery';

const AllParcelsRow = ({ parcel }) => {
   const {
      _id,
      senderName,
      senderPhone,
      createdAt,
      deliveryDate,
      price,
      bookingStatus,
   } = parcel || {};
   const axiosSecure = useAxiosSecure();
   const [openModal, setOpenModal] = useState(false);
   const [approxDate, setApproxDate] = useState('');
   const [deliveryManId, setDeliveryManId] = useState('');
   const [, refetch] = useUserParcels();
   const { reloadParcelData } = useParcel();
   const { reloadDeliveries } = useDelivery();

   const handleAssign = async () => {
      if (!approxDate || !deliveryManId) return;
      console.log(approxDate, 'assign btn click');
      try {
         // send Patch req
         const { data } = await axiosSecure.patch('/parcels/assign', {
            parcelId: _id,
            deliveryManId,
            approxDeliveryDate: approxDate,
         });
         console.log(data);
         if (data?.modifiedCount > 0) {
            refetch();
            reloadParcelData();
            reloadDeliveries();
            setOpenModal(false);
            successToast('Delivery man Assigned Successful');
         }
      } catch (err) {
         errorToast('Some thing went wrong! Try again');
         setOpenModal(false);
         console.log(err);
      }
   };
   return (
      <TableRow>
         {/* Sender Name */}
         <TableCell>{senderName}</TableCell>
         {/* Sender Phone */}
         <TableCell>{senderPhone}</TableCell>
         {/*Booking date */}
         <TableCell>{formateDate(createdAt)}</TableCell>
         {/* req del. date */}
         <TableCell>{formateDate(deliveryDate)}</TableCell>
         {/* Cost */}
         <TableCell className={'flex justify-start items-center '}>
            {price}
            <TbCurrencyTaka className="size-5" />
         </TableCell>
         {/* status */}
         <TableCell className={'capitalize'}>{bookingStatus}</TableCell>
         {/* Manage button */}
         <TableCell className={'text-center'}>
            <Button
               disabled={bookingStatus === 'Delivered'}
               onClick={() => setOpenModal(true)}
               size="sm"
               variant="default"
               className={
                  'bg-indigo-600 text-white   hover:bg-indigo-700'
               }
            >
               Manage
            </Button>
            <ManageParcelModal
               parcel={parcel}
               setDeliveryManId={setDeliveryManId}
               setApproxDate={setApproxDate}
               open={openModal}
               isOpen={setOpenModal}
               handleAssign={handleAssign}
            />
         </TableCell>
      </TableRow>
   );
};

export default AllParcelsRow;
