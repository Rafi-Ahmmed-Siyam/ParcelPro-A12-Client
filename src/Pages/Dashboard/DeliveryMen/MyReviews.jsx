import Container from '@/components/Custom/Shared/Container';
import React from 'react';

const MyReviews = () => {
   return (
      <Container>
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               My Reviews
            </h1>
         </div>
      </Container>
   );
};

export default MyReviews;
