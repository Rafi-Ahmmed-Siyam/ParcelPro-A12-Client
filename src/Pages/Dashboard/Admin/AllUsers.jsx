import Container from '@/components/Custom/Shared/Container';
import AllUsersRow from '@/components/Custom/TableRows/AllUsersRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';
import useAllUser from '@/hooks/Custom/useAllUser';
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { Button } from '@/components/ui/button';

const AllUsers = () => {
   const axiosSecure = useAxiosSecure();
   const [totalCount, setTotalCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   // Get total count
   useEffect(() => {
      getTotalCount();
   }, []);
   const getTotalCount = async () => {
      const { data } = await axiosSecure.get('/users/count');
      setTotalCount(data.totalCount);
   };
   // get page count
   const totalPage = Math.ceil(totalCount / 5);
   const buttonCount = [];
   for (let i = 1; i <= totalPage; i++) {
      buttonCount.push(i);
   }
   const { users, reloadUsers, isPending, isLoading } = useAllUser(currentPage);

   if (isLoading || isPending) return <LoadingSpinner />;
   return (
      <Container className="relative">
         {/* Header Section - Stays at the top */}
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               All Users
            </h1>
         </div>

         {/* Table Section - Occupies the remaining space/grows, pushing pagination down */}
         <div className="border-2 border-slate-200 rounded-sm w-full px-2 lg:px-4 py-2.5 overflow-x-auto flex-grow">
            <Table className="min-w-full">
               <TableHeader className="bg-slate-100">
                  {/* ... (TableHead content remains the same) ... */}
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
                        <AllUsersRow
                           key={user._id}
                           user={user}
                           reloadUsers={reloadUsers}
                        />
                     ))
                  )}
               </TableBody>
            </Table>
         </div>

         {/* Pagination button */}
         <div className="mt-[60px] md:mt-0 lg:mt-8 absolute left-1/2 top-6/12 -translate-x-1/2 lg:-translate-x-0 ">
            <Pagination className={''}>
               <PaginationContent className="flex items-center gap-2">
                  {/* Previous Btn */}
                  <PaginationItem>
                     <Button
                        onClick={() =>
                           currentPage > 1 && setCurrentPage(currentPage - 1)
                        }
                        disabled={currentPage === 1}
                        className={`px-4 py-1 rounded-full border
                                    ${
                                       currentPage === 1
                                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                          : 'bg-white text-black hover:bg-slate-100'
                                    }
                                `}
                     >
                        Previous
                     </Button>
                  </PaginationItem>

                  {/* Page Numbers */}
                  {buttonCount.map((button) => (
                     <PaginationItem key={button}>
                        <PaginationLink
                           onClick={() => setCurrentPage(button)}
                           className={`px-4 py-1 rounded-full border cursor-pointer
                                    ${
                                       currentPage === button
                                          ? 'bg-blue-500 text-white border-blue-500'
                                          : 'bg-white text-black border-gray-300 hover:bg-slate-100'
                                    }
                                `}
                        >
                           {button}
                        </PaginationLink>
                     </PaginationItem>
                  ))}

                  {/* Next Button */}
                  <PaginationItem>
                     <Button
                        onClick={() =>
                           currentPage < totalPage &&
                           setCurrentPage(currentPage + 1)
                        }
                        disabled={currentPage === totalPage}
                        className={`px-4 py-1 rounded-full border
                                    ${
                                       currentPage === totalPage
                                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                          : 'bg-white text-black hover:bg-slate-100'
                                    }
                                `}
                     >
                        Next
                     </Button>
                  </PaginationItem>
               </PaginationContent>
            </Pagination>
         </div>
      </Container>
   );
};

export default AllUsers;
