import Container from '@/components/Custom/Shared/Container';
import React from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import useRole from '@/hooks/Custom/useRole';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formateDate } from '@/Utilities/dateFormater';

const MyReviews = () => {
   const axiosSecure = useAxiosSecure();
   const { role } = useRole();
   const {
      data: reviews = [],
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['reviews', role.id],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/reviews/${role.id}`);
         return data;
      },
   });
   // console.log(reviews);

   if (isLoading || isPending) return <LoadingSpinner />;
   return (
      <Container className="py-8">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 border-b pb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
               My Reviews
            </h1>
            <p className="text-lg text-slate-500 font-medium">
               Total Reviews:{' '}
               <span className="text-slate-900 font-bold">
                  {reviews?.length}
               </span>
            </p>
         </div>

         {/* Card */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reviews?.length === 0 ? (
               <div className="col-span-full py-16 text-center bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-xl font-medium text-slate-500">
                     No reviews have been submitted for you yet.
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                     Once users leave a review, it will appear here.
                  </p>
               </div>
            ) : (
               reviews?.map((review) => (
                  <div
                     key={review._id}
                     className="bg-white border border-slate-200 rounded-xl p-5 shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full"
                  >
                     
                     <div className="flex items-center border-b pb-4 mb-4">
                        <img
                           src={review.userImg}
                           alt={review.userName}
                           className="w-12 h-12 rounded-full object-cover border-2 border-slate-300"
                        />
                        <div className="ml-3">
                           <p className="text-md font-bold text-slate-800">
                              {review.userName}
                           </p>
                           <p className="text-xs text-slate-400">
                              Reviewed on: {formateDate(review.createdAt)}
                           </p>
                        </div>
                     </div>

                     {/* rating and feedback */}
                     <div className="grow space-y-3">
                        <div className="flex justify-between items-center">
                           <h4 className="text-sm font-semibold text-slate-700">
                              Service Rating:
                           </h4>
                           <Rating
                              style={{ maxWidth: 120 }}
                              value={review.rating}
                              readOnly
                           />
                        </div>

                        <p className="text-sm text-slate-600 italic border-l-4 border-slate-100 pl-3 py-1">
                           {review.feedback}
                        </p>
                     </div>

                    
                     <div className="pt-4 mt-4 border-t border-slate-100 text-right">
                        <span className="text-xs text-slate-400">
                           Parcel Delivery Agent Feedback
                        </span>
                     </div>
                  </div>
               ))
            )}
         </div>
      </Container>
   );
};

export default MyReviews;
