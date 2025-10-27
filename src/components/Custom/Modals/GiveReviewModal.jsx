import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useAuth from '@/hooks/Custom/useAuth';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { errorToast, successToast } from '@/Utilities/Toasts';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const GiveReviewModal = ({ openReview, setOpenReview, deliveryManId }) => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const [rating, setRating] = useState(0);
   const [feedbackMessage, setFeedbackMessage] = useState('');
   // get delivery man data who delivered parcel
   const { data: deliveryMenData = [] } = useQuery({
      queryKey: ['deliveryMen', deliveryManId, openReview],
      queryFn: async () => {
         const { data } = await axiosSecure.get(
            `/deliveryMen/${deliveryManId}`
         );
         return data;
      },
      enabled: !!deliveryManId && openReview,
   });
   const { _id, phone, image, name } = deliveryMenData || {};

   const handleSubmit = async () => {
      const feedbackData = {
         userEmail: user.email,
         userName: user.displayName || 'Anonymous',
         userImg: user.photoURL || 'https://i.ibb.co.com/VYHK0CGK/user-1.png',
         rating: rating,
         feedback: feedbackMessage,
         deliveryMenId: _id,
         createdAt: new Date(),
      };
      // console.log(feedbackData);
      // send post req in DB
      try {
         // post req
         const { data } = await axiosSecure.post('/reviews', feedbackData);
         // console.log(data);
         if (data.insertedId) {
            setFeedbackMessage('');
            setRating(0);
            successToast('Review submitted successfully!');
            setOpenReview(false);
         }
      } catch (err) {
         // console.log(err);
         errorToast(err.message || 'Something went wrong');
      }
   };

   return (
      <Dialog open={openReview} onOpenChange={setOpenReview}>
         <DialogContent className="sm:max-w-md w-full p-6 flex flex-col gap-6">
            {/* Header */}
            <DialogHeader className="text-center">
               <DialogTitle className="text-2xl font-bold text-indigo-700">
                  Rate Your Delivery Experience
               </DialogTitle>
               <DialogDescription className="text-sm text-slate-500 mt-1">
                  Your feedback helps us recognize hard work and improve service
                  quality.
               </DialogDescription>
            </DialogHeader>

            {/* Delivery Man Card */}
            <div className="bg-white border border-indigo-200 rounded-lg p-4 shadow-md flex flex-col items-center gap-3">
               <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400"
                  referrerPolicy="no-referrer"
               />
               <div className="text-center">
                  <p className="text-lg font-bold text-slate-800">{name}</p>
                  <p className="text-sm text-slate-500">{phone}</p>
                  <p className="text-xs text-slate-400 mt-1">ID: {_id}</p>
               </div>
            </div>

            {/* Review Form */}
            <div className="flex flex-col gap-4 items-center">
               {/* Rating */}
               <div className="flex flex-col items-center gap-2">
                  <Label className="text-sm font-semibold text-slate-700">
                     Overall Rating (1 - 5)
                  </Label>
                  <Rating
                     style={{ maxWidth: 200 }}
                     value={rating}
                     onChange={setRating}
                  />
               </div>

               {/* Feedback */}
               <div className="w-full">
                  <Label
                     htmlFor="feedback"
                     className="text-sm font-semibold text-slate-700"
                  >
                     Your Feedback
                  </Label>
                  <Textarea
                     onChange={(e) => setFeedbackMessage(e.target.value)}
                     id="feedback"
                     rows={4}
                     placeholder="Describe your delivery experience (punctuality, attitude, service quality)."
                     className="resize-none mt-1 rounded-sm"
                  />
               </div>
            </div>

            {/* Buttons */}
            <DialogFooter className="flex justify-end gap-3 mt-2">
               <DialogClose asChild>
                  <Button
                     variant="outline"
                     className="text-slate-600 hover:bg-slate-100"
                  >
                     Cancel
                  </Button>
               </DialogClose>
               <Button
                  onClick={() => handleSubmit()}
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700"
               >
                  Submit Review
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default GiveReviewModal;
