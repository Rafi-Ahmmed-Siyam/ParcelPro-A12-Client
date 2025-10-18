import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

const AllUsersRow = ({ user }) => {
   const { email, name, phone, totalCost, parcelsBooked } = user || {};
   return (
      <TableRow>
         {/* User Name */}
         <TableCell className={'text-center'}>{name}</TableCell>
         {/* User email */}
         <TableCell className={'text-center'}>{email}</TableCell>
         {/* Sender Phone */}
         <TableCell className={'text-center'}>{phone || 'N/A'}</TableCell>
         {/*Parcel Booked */}
         <TableCell className={'text-center'}>
            {parcelsBooked || 'No parcel booked'}
         </TableCell>
         {/* Spent Amoun */}
         <TableCell className={'flex justify-center items-center '}>
            {totalCost || '00'}
            <TbCurrencyTaka className="size-5" />
         </TableCell>
         {/* Manage button */}
         <TableCell className={'text-center'}>
            <Button size="sm" variant="default">
               Make Deli. Men
            </Button>
         </TableCell>
         {/* Manage button */}
         <TableCell className={'text-center'}>
            <Button size="sm" variant="default">
               Make Admin
            </Button>
         </TableCell>
      </TableRow>
   );
};

export default AllUsersRow;
