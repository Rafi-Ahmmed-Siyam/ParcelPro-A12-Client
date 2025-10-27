import Container from '@/components/Custom/Shared/Container';
import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import useAuth from '@/hooks/Custom/useAuth';
import PaymentHistoryRow from '@/components/Custom/TableRows/PaymentHistoryRow';
import useRole from '@/hooks/Custom/useRole';
import LoadingSpinner from '@/components/LoadingSpinner';

const PaymentHistory = () => {
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();
   const { user } = useAuth();
   const { role } = useRole();
   const location = useLocation();
   const paymentStatus = location?.state?.paymentSuccess;
   const { width, height } = useWindowSize();
   // get payment data
   const {
      data: payments = [],
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['payments', user?.email],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/payments/${user.email}`);
         return data;
      },
      enabled: !!user.email,
   });

   if (role.role === 'Admin') return navigate('/dashboard/statistics');
   if (role.role === 'DeliveryMen')
      return navigate('/dashboard/myDeliveryList');

   if ((isLoading, isPending)) return <LoadingSpinner />;
   return (
      <Container>
         <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Payments History
         </h1>

         {paymentStatus && (
            <Confetti
               width={width}
               height={height}
               recycle={false}
               numberOfPieces={500}
            />
         )}

         <div className="border-2 border-slate-200 rounded-sm w-full px-2 lg:px-4 py-2.5 overflow-x-auto mt-5">
            <Table className="min-w-full text-center">
               <TableHeader className="bg-slate-100">
                  <TableRow>
                     <TableHead className={'text-center'}></TableHead>
                     <TableHead className={'text-center'}>Parcel Id</TableHead>
                     <TableHead className={'text-center'}>
                        Parcel Type
                     </TableHead>
                     <TableHead className={'text-center'}>
                        Transaction Id
                     </TableHead>
                     <TableHead className={'text-center'}>
                        Total Amount
                     </TableHead>
                     <TableHead className={'text-center'}>Email</TableHead>
                     <TableHead className={'text-center'}>Paid At</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {!payments?.length ? (
                     <TableRow>
                        <td
                           colSpan={10}
                           className="text-center py-6 text-slate-500"
                        >
                           You haven’t made any payments yet.
                        </td>
                     </TableRow>
                  ) : (
                     payments.map((payment) => (
                        <PaymentHistoryRow
                           key={payment._id}
                           payment={payment}
                        />
                     ))
                  )}
               </TableBody>
            </Table>
         </div>
      </Container>
   );
};

export default PaymentHistory;
