import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import ConfirmModal from '../Modals/ConfirmModal';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import useAllUser from '@/hooks/Custom/useAllUser';
import useRole from '@/hooks/Custom/useRole';
import { successToast } from '@/Utilities/Toasts';

const AllUsersRow = ({ user }) => {
   const { _id, email, name, phone, role, totalCost, parcelsBooked } =
      user || {};
   const axiosSecure = useAxiosSecure();
   const { reloadUsers } = useAllUser();
   const { reloadRole } = useRole();
   const [openModal, setOpenModal] = useState(false);
   const [selectedRole, setSelectedRole] = useState('');

   const hanDleUpdateRole = async () => {
      try {
         // Patch req
         const { data } = await axiosSecure.patch('/users/role', {
            id: _id,
            role: selectedRole,
         });
         if (data?.modifiedCount > 0) {
            reloadUsers();
            reloadRole();
            successToast('Role Updated Successful!');
            setOpenModal(false);
         }
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <TableRow>
         {/* User Name */}
         <TableCell className={'text-center'}>{name}</TableCell>
         {/* User email */}
         <TableCell className={'text-center'}>{email}</TableCell>
         {/* Sender Phone */}
         <TableCell className={'text-center'}>{phone || 'N/A'}</TableCell>
         {/* Role */}
         <TableCell className={'text-center'}>{role || 'N/A'}</TableCell>
         {/*Parcel Booked */}
         <TableCell className={'text-center'}>
            {parcelsBooked || 'No parcel booked'}
         </TableCell>
         {/* Spent Amount */}
         <TableCell className={'flex justify-center items-center '}>
            {totalCost || '00'}
            <TbCurrencyTaka className="size-5" />
         </TableCell>
         {/* Manage button */}
         <TableCell className={'text-center'}>
            <Button
               disabled={role === 'DeliveryMen'}
               onClick={() => {
                  setOpenModal(true);
                  setSelectedRole('DeliveryMen');
               }}
               size="sm"
               variant="default"
            >
               Make Deli. Men
            </Button>
         </TableCell>
         {/* Manage button */}
         <TableCell className={'text-center'}>
            <Button
               disabled={role === 'Admin'}
               onClick={() => {
                  setOpenModal(true);
                  setSelectedRole('Admin');
               }}
               size="sm"
               variant="default"
            >
               Make Admin
            </Button>
            {/* Confirm MOdal */}
            <ConfirmModal
               open={openModal}
               setOpen={setOpenModal}
               heading={'Set New Role'}
               description={
                  "You are making a permanent change to this user's role. Confirm to proceed."
               }
               handleConfirm={hanDleUpdateRole}
            />
         </TableCell>
      </TableRow>
   );
};

export default AllUsersRow;
