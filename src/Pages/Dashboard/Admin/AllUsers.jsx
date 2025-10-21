import Container from '@/components/Custom/Shared/Container';
import AllUsersRow from '@/components/Custom/TableRows/AllUsersRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import useAllUser from '@/hooks/Custom/useAllUser';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {
   const { users, reloadUsers, isPending, isLoading } = useAllUser();
   // console.log(users);
   if (isLoading || isPending) return <LoadingSpinner />;
   return (
      <Container>
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               All Users
            </h1>
         </div>

         <div className="border-2 border-slate-200 rounded-sm w-full px-2 lg:px-4 py-2.5 overflow-x-auto">
            <Table className="min-w-full">
               <TableHeader className="bg-slate-100">
                  <TableRow>
                     <TableHead className={'text-center'}>
                        User’s Name
                     </TableHead>
                     <TableHead className={'text-center'}>
                        User’s Email
                     </TableHead>
                     <TableHead className={'text-center'}>Phone Num.</TableHead>
                     <TableHead className={'text-center'}>Role</TableHead>
                     <TableHead className={'text-center'}>
                        Total parcels Booked
                     </TableHead>
                     <TableHead className={'text-center'}>
                        Total Spent Amount
                     </TableHead>
                     <TableHead className={'text-center'}>Action</TableHead>
                     <TableHead className={'text-center'}>Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {!users?.length ? (
                     <TableRow>
                        <TableCell
                           colSpan={9}
                           className="text-center py-4 text-slate-500"
                        >
                           No Users found.
                        </TableCell>
                     </TableRow>
                  ) : (
                     users.map((user) => (
                        <AllUsersRow key={user._id} user={user} />
                     ))
                  )}
                  {/* <AllUsersRow /> */}
               </TableBody>
            </Table>
         </div>
      </Container>
   );
};

export default AllUsers;
