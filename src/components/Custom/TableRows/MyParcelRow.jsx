import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formateDate } from '@/Utilities/dateFormater';
import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { errorToast, successToast } from '@/Utilities/Toasts';
import { Link } from 'react-router-dom';
import DeleteModal from '../Modals/DeleteModal';
import GiveReviewMOdal from '../Modals/GiveReviewMOdal';

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
   const [openReview, setOpenReview] = useState(false);

   // Handle delete button
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
      <>
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
            <TableCell className={'capitalize'}>
               <span
                  className={`badge px-3 py-3 font-medium text-xs capitalize
    ${
       bookingStatus === 'Pending'
          ? 'badge-warning'
          : bookingStatus === 'On The Way'
          ? 'badge-info'
          : bookingStatus === 'Delivered'
          ? 'badge-success'
          : bookingStatus === 'Returned'
          ? 'badge-secondary'
          : bookingStatus === 'Canceled'
          ? 'badge-error'
          : ''
    }`}
               >
                  {bookingStatus}
               </span>
            </TableCell>
            {bookingStatus === 'Delivered' ? (
               <>
                  <TableCell>
                     <Button
                        onClick={() => setOpenReview(true)}
                        size="sm"
                        variant="default"
                        className={'bg-blue-500 text-white  hover:bg-blue-600'}
                     >
                        Review
                     </Button>
                  </TableCell>
                  <TableCell>
                     <Button
                        size="sm"
                        variant="default"
                        className={
                           'bg-green-500 text-white px-5 hover:bg-green-600'
                        }
                     >
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
                        className={
                           'bg-yellow-400 text-white  hover:bg-yellow-500'
                        }
                        disabled={
                           bookingStatus === 'On The Way' ||
                           bookingStatus === 'Delivered'
                        }
                     >
                        <Link to={`/dashboard/updateParcel/${_id}`}>
                           {' '}
                           Update
                        </Link>
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
                  </TableCell>
               </>
            )}
         </TableRow>

         <DeleteModal
            openModal={open}
            setOpenModal={setOpen}
            deleteConfirm={handleDeleteParcel}
         />
         <GiveReviewMOdal
            openReview={openReview}
            setOpenReview={setOpenReview}
            deliveryManId={deliveryManId}
         />
      </>
   );
};

export default MyParcelRow;
