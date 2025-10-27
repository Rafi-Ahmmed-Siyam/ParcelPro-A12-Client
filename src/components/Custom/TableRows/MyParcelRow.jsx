import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formateDate } from '@/Utilities/dateFormater';
import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { errorToast, successToast } from '@/Utilities/Toasts';
import { Link } from 'react-router-dom';
import DeleteModal from '../Modals/DeleteModal';

import { Badge } from '@/components/ui/badge';
import GiveReviewModal from '../Modals/GiveReviewModal';

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
      isPaid,
   } = parcel || {};
   const axiosSecure = useAxiosSecure();
   const [open, setOpen] = useState(false);
   const [openReview, setOpenReview] = useState(false);

   // Handle delete button
   const handleDeleteParcel = async () => {
      try {
         const { data } = await axiosSecure.delete(`/parcels/${_id}`);
         // console.log(data);
         if (data.deletedCount > 0) {
            refetch();
            setOpen(false);
            successToast('Parcel Deleted Successful!');
         }
      } catch (err) {
         errorToast(err.message || 'Something Went Wrong');
         // console.log(err);
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
               <Badge
                  className={`
      px-3 py-1 text-xs font-medium capitalize rounded-full
      ${
         bookingStatus === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : bookingStatus === 'On The Way'
            ? 'bg-blue-100 text-blue-800'
            : bookingStatus === 'Delivered'
            ? 'bg-green-100 text-green-800'
            : bookingStatus === 'Returned'
            ? 'bg-gray-100 text-gray-800'
            : bookingStatus === 'Canceled'
            ? 'bg-red-100 text-red-800'
            : 'bg-slate-100 text-slate-700'
      }
   `}
               >
                  {bookingStatus}
               </Badge>
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
                     {isPaid ? (
                        <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm font-semibold rounded-full uppercase tracking-wider shadow-sm">
                           Paid
                        </Badge>
                     ) : (
                        <Button
                           size="sm"
                           variant="default"
                           className={
                              'bg-green-500 text-white px-5 hover:bg-green-600'
                           }
                        >
                           <Link to={`/dashboard/checkout/${_id}`}>Pay</Link>
                        </Button>
                     )}
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
                           bookingStatus === 'Delivered' ||
                           bookingStatus === 'Canceled'
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
         <GiveReviewModal
            openReview={openReview}
            setOpenReview={setOpenReview}
            deliveryManId={deliveryManId}
         />
      </>
   );
};

export default MyParcelRow;
