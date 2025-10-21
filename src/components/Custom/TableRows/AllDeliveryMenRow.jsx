import { TableCell, TableRow } from '@/components/ui/table';

const AllDeliveryMenRow = ({ deliveryMan }) => {
   const { _id, image, role, name, phone } = deliveryMan || {};
   return (
      <TableRow>
         {/* Delivery Man's Name */}
         <TableCell>
            <div className="avatar">
               <div className="mask mask-squircle h-10 w-10">
                  <img src={image} alt="Avatar Tailwind CSS Component" />
               </div>
            </div>
         </TableCell>
         {/* Delivery Man's Name */}
         <TableCell>{name || 'Not found'}</TableCell>
         {/* Phone Number */}
         <TableCell>{phone || 'N/A'}</TableCell>
         {/*Number of parcels delivered
          */}
         <TableCell>Number of parcels delivered</TableCell>
         {/* Average review
          */}
         <TableCell>Average review</TableCell>
      </TableRow>
   );
};

export default AllDeliveryMenRow;
