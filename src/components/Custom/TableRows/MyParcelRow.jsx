import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formateDate } from '@/Utilities/dateFormater';
import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { errorToast, successToast } from '@/Utilities/Toasts';
import { Link } from 'react-router-dom';
import DeleteModal from '../Modals/DeleteModal';

const MyParcelRow = ({ parcel, refetch }) => {
   const {
      _id,
      bookingStatus,
      price,
      parcelType,
      deliveryDate,
      deliveryManId,
      createdAt,
      approxDeliveryDate,
   } = parcel || {};
   const axiosSecure = useAxiosSecure();
   const [open, setOpen] = useState(false);
   const handleDeleteParcel = async () => {
      try {
         const { data } = await axiosSecure.delete(`/parcels/${_id}`);
         console.log(data);
         if (data.deletedCount > 0) {
            refetch();
            successToast('Parcel Deleted Successful!');
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <TableRow>
         {/* Parcel Type */}
         <TableCell>{parcelType}</TableCell>
         {/* req date */}
         <TableCell>{formateDate(deliveryDate)}</TableCell>
         {/* appx date */}
         <TableCell>{formateDate(approxDeliveryDate) || 'N/A'}</TableCell>
         {/* booking date */}
         <TableCell>{formateDate(createdAt)}</TableCell>
         {/* price */}
         <TableCell className={'flex justify-start items-center '}>
            {price}
            <TbCurrencyTaka className="size-5" />
         </TableCell>
         {/* delivery man */}
         <TableCell>{deliveryManId || 'Not Assigned'}</TableCell>
         {/* status */}
         <TableCell className={'capitalize'}>{bookingStatus}</TableCell>
         {bookingStatus === 'Delivered' ? (
            <>
               <TableCell>
                  <Button size="sm" variant="default">
                     Review
                  </Button>
               </TableCell>
               <TableCell>
                  <Button size="sm" variant="">
                     <Link to={'/dashboard/checkout'}>Pay</Link>
                  </Button>
               </TableCell>
            </>
         ) : (
            <>
               <TableCell>
                  <Button
                     size="sm"
                     variant="default"
                     disabled={
                        bookingStatus === 'On The Way' ||
                        bookingStatus === 'Delivered'
                     }
                  >
                     <Link to={`/dashboard/updateParcel/${_id}`}> Update</Link>
                  </Button>
               </TableCell>
               <TableCell>
                  <Button
                     onClick={() => {
                        bookingStatus === 'Pending'
                           ? setOpen(true)
                           : errorToast(
                                'You cannot delete this delivery because its status is not pending.'
                             );
                     }}
                     size="sm"
                     variant="destructive"
                  >
                     Delete
                  </Button>
                  <DeleteModal
                     openModal={open}
                     setOpenModal={setOpen}
                     deleteConfirm={handleDeleteParcel}
                  />
               </TableCell>
            </>
         )}
      </TableRow>
   );
};

export default MyParcelRow;
