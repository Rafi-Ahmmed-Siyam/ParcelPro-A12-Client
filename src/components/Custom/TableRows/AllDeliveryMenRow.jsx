import { TableCell, TableRow } from '@/components/ui/table';
import { Rating } from '@smastrom/react-rating';

const AllDeliveryMenRow = ({ deliveryMan }) => {
   const { _id, image, name, email, phone, averageRating, deliveredCount } =
      deliveryMan || {};
   return (
      <TableRow>
         {/* Delivery Man's Name */}
         <TableCell>
            <div className="avatar">
               <div className="mask mask-squircle h-10 w-10">
                  <img
                     src={image || 'https://i.ibb.co.com/fYrk3K68/user-1.png'}
                     alt="Delivery Man image"
                  />
               </div>
            </div>
         </TableCell>
         {/* Delivery Man's Name */}
         <TableCell>{name || 'Not found'}</TableCell>
         {/* Delivery Man's email */}
         <TableCell>{email || 'Not found'}</TableCell>
         {/* Phone Number */}
         <TableCell>{phone || 'N/A'}</TableCell>
         {/*Number of parcels delivered
          */}
         <TableCell>{deliveredCount}</TableCell>
         {/* Average review
          */}
         <TableCell>
            <div className="flex justify-center gap-2 items-center">
               {/* Star Rating */}
               <Rating
                  style={{ maxWidth: 80 }}
                  value={averageRating}
                  readOnly
               />

               {/* Text beside stars */}
               <span className="text-sm font-medium text-slate-700">
                  {averageRating ? averageRating.toFixed(1) : 'No reviews'}
               </span>
            </div>
         </TableCell>
      </TableRow>
   );
};

export default AllDeliveryMenRow;
