import { TableCell, TableRow } from '@/components/ui/table';
import { formateDate } from '@/Utilities/dateFormater';
import { BadgeCheck } from 'lucide-react';
import { TbCurrencyTaka } from 'react-icons/tb';

const PaymentHistoryRow = ({ payment }) => {
   const { _id, transactionId, parcelType, parcelId, paidAt, email, amount } =
      payment || {};
   return (
      <TableRow>
         <TableCell className={'flex justify-center items-center'}>
            <BadgeCheck className="text-center text-green-700 size-6" />
         </TableCell>
         {/* Parcel ID */}
         <TableCell>{parcelId || 0}</TableCell>
         {/* ParcelType */}
         <TableCell>{parcelType}</TableCell>
         {/* Transaction Id */}
         <TableCell>{transactionId}</TableCell>
         {/* Total Amount */}
         <TableCell className={'flex justify-center items-center '}>
            {amount}
            <TbCurrencyTaka className="size-5" />
         </TableCell>
         {/* Email */}
         <TableCell>{email}</TableCell>
         {/* Paid At */}
         <TableCell>{formateDate(paidAt)}</TableCell>
      </TableRow>
   );
};

export default PaymentHistoryRow;
