import NumberInputModal from '@/components/Custom/Modals/NumberInputModal';
import Container from '@/components/Custom/Shared/Container';
import useRole from '@/hooks/Custom/useRole';
import React, { useEffect, useState } from 'react';

const DeliveryList = () => {
   const { role, reloadRole } = useRole();
   // console.log(role.verified);
   const [modalOpen, setModalOpen] = useState(false);
   // Open modal automatically if not verified
   useEffect(() => {
      if (role && role.verified === false) {
         setModalOpen(true);
      } else {
         setModalOpen(false);
      }
   }, [role, role.verified]);

   
   const handleOpenChange = (open) => {
      if (role.verified) {
         setModalOpen(open); 
      } else {
         setModalOpen(true); 
      }
   };

   return (
      <Container>
         <h2>My delivery List</h2>
         <NumberInputModal
            open={modalOpen}
            isOpen={handleOpenChange}
            role={role}
            reloadRole={reloadRole}
            handleOpenChange={handleOpenChange}
         />
      </Container>
   );
};

export default DeliveryList;
