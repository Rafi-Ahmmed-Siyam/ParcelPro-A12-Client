import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formateDate } from '@/Utilities/dateFormater';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

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
            <Button size="sm" variant="default">
               Manage
            </Button>
         </TableCell>
      </TableRow>
   );
};

export default AllParcelsRow;
