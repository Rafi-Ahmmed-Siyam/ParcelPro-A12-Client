import { Button } from '@/components/ui/button';
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { formateDate } from '@/Utilities/dateFormater';
import { format } from 'date-fns';

import { SquarePen, Trash } from 'lucide-react';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

const MyParcelRow = ({ parcel }) => {
   const { bookingStatus, price, parcelType, deliveryDate, createdAt } =
      parcel || {};

   return (
      <TableRow>
         {/* Parcel Type */}
         <TableCell>{parcelType}</TableCell>
         {/* req date */}
         <TableCell>{formateDate(deliveryDate)}</TableCell>
         {/* appx date */}
         <TableCell>N/A</TableCell>
         {/* booking date */}
         <TableCell>{formateDate(createdAt)}</TableCell>
         {/* price */}
         <TableCell className={'flex justify-start items-center '}>
            {price}
            <TbCurrencyTaka className="size-5" />
         </TableCell>
         {/* delivery man */}
         <TableCell>Not Assigned</TableCell>
         {/* status */}
         <TableCell>{bookingStatus}</TableCell>
         <TableCell>
            <Button size="sm" variant="default">
               Update
            </Button>
         </TableCell>
         <TableCell>
            <Button size="sm" variant="destructive">
               Delete
            </Button>
         </TableCell>
      </TableRow>
   );
};

export default MyParcelRow;
