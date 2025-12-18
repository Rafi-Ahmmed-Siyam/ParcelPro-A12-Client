import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useAuth from '@/hooks/Custom/useAuth';
import { useForm } from 'react-hook-form';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import useLoading from '@/hooks/Custom/useLoading';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { errorToast, successToast } from '@/Utilities/Toasts';
import { useNavigate } from 'react-router-dom';
import { addHours, isBefore } from 'date-fns';
import useParcel from '@/hooks/Custom/useParcel';
import useRole from '@/hooks/Custom/useRole';

const BookParcel = () => {
   const { user } = useAuth();
   const { role } = useRole();
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();
   const { reqLoading, setReqLoading } = useLoading();
   const { reloadParcelData } = useParcel();
   const [weight, setWeight] = useState(0);
   const [price, setPrice] = useState(0);

   // is user Admin or DeliveryMen navigate

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const handlePrice = (parcelWeight) => {
      setWeight(parcelWeight);

      if (!parcelWeight || parcelWeight < 0) return setPrice(0);

      if (parcelWeight > 2) {
         return setPrice(150);
      }

      return setPrice(parcelWeight * 50);
   };

   const handleParcelBook = async (data) => {
      setReqLoading(true);
      const {
         address,
         latitude,
         longitude,
         phone,
         receiverName,
         receiverPhone,
         type,
         deliveryDate,
      } = data || {};

      const parcelData = {
         senderName: user?.displayName || 'Unnamed User',
         senderEmail: user?.email,
         senderPhone: phone,
         parcelType: type,
         weight,
         price,
         deliveryDate,
         receiverName,
         receiverPhone,
         deliveryAddress: address,
         deliveryLatitude: latitude,
         deliveryLongitude: longitude,
         createdAt: new Date(),
         bookingStatus: 'Pending',
      };

      try {
         const { data } = await axiosSecure.post('/parcels', parcelData);
         // console.log(data);
         if (data?.insertedId) {
            reloadParcelData();
            setReqLoading(false);
            reset();
            setWeight(0);
            setPrice(0);
            successToast('Your Parcel Booked Successfully');
            navigate('/dashboard/myParcel');
         }
      } catch (err) {
         errorToast(err.message || 'Something went wrong!');
         setReqLoading(false);
      }
   };
   if (role.role === 'Admin') return navigate('/dashboard/statistics');
   if (role.role === 'DeliveryMen')
      return navigate('/dashboard/myDeliveryList');
   return (
      <section className="min-h-[calc(100vh-45px)] flex items-center justify-center  p-6">
         <div className="w-full px-5 md:px-14 lg:px-0 lg:max-w-4xl">
            {/* Form container */}
            <form
               onSubmit={handleSubmit(handleParcelBook)}
               className="space-y-5"
            >
               {/* === Heading === */}
               <h1 className="text-center text-3xl font-bold text-slate-800 mb-7">
                  Book a New Parcel
               </h1>
               <p className="text-sm text-muted-foreground mt-1 text-center max-w-2xl mx-auto">
                  Fill out the parcel details carefully to schedule your
                  delivery. Make sure all information, including address and
                  contact details, is accurate to ensure smooth delivery.
               </p>

               {/* === First row === */}
               <div className="flex flex-col md:flex-row gap-5 mt-5">
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Name</Label>
                     <Input
                        type="text"
                        value={user?.displayName || 'Unnamed User'}
                        readOnly
                        className="bg-slate-100 cursor-not-allowed py-5 rounded-sm"
                     />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Email</Label>
                     <Input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="bg-slate-100 cursor-not-allowed py-5 rounded-sm"
                     />
                  </div>
               </div>

               {/* === Second row === */}
               <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Parcel Type</Label>
                     <Input
                        type="text"
                        placeholder="e.g. Documents, Electronics"
                        className="py-5 rounded-sm"
                        {...register('type', { required: true })}
                     />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Phone Number</Label>
                     <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="py-5 rounded-sm"
                        {...register('phone', { required: true })}
                     />
                  </div>
               </div>
               {/* === Third row === */}
               <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Receiver’s Name</Label>
                     <Input
                        type="text"
                        placeholder="Enter receiver’s name"
                        className="py-5 rounded-sm"
                        {...register('receiverName', { required: true })}
                     />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Receiver’s Phone</Label>
                     <Input
                        type="tel"
                        placeholder="Enter receiver’s phone number"
                        className="py-5 rounded-sm"
                        {...register('receiverPhone', { required: true })}
                     />
                  </div>
               </div>

               {/* === Fourth row === */}
               <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 ">
                     <div className="flex items-center gap-2.5">
                        <div className="flex flex-1 flex-col gap-2.5 ">
                           <Label>Parcel Weight (kg)</Label>
                           <Input
                              onChange={(e) =>
                                 handlePrice(parseFloat(e.target.value))
                              }
                              required
                              type="number"
                              step="0.1"
                              placeholder="e.g. 2.5"
                              className="py-5 rounded-sm"
                           />
                        </div>
                        {/*Price box  */}
                        <div className="flex flex-1 flex-col gap-2.5 ">
                           <Label>Estimated Price</Label>
                           <div className="border rounded-sm h-10 flex justify-center items-center bg-[#F1F5F9]">
                              <span className="flex items-center text-slate-700 font-semibold">
                                 {price.toFixed(2) || '0'}
                                 <TbCurrencyTaka className="size-5" />{' '}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Requested Delivery Date</Label>
                     <Input
                        {...register('deliveryDate', {
                           required: true,
                           validate: (value) => {
                              const selectedDate = new Date(value);
                              const minDate = addHours(new Date(), 24);

                              return (
                                 !isBefore(selectedDate, minDate) ||
                                 'Date & time must be at least 24 hours after now'
                              );
                           },
                        })}
                        type="date"
                        className="py-5 rounded-sm"
                     />
                     {errors.deliveryDate && (
                        <p className="text-red-500 text-sm">
                           {errors.deliveryDate.message}
                        </p>
                     )}
                  </div>
               </div>

               {/* === Fifth row === */}
               <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Delivery Latitude</Label>
                     <Input
                        type="number"
                        step="any"
                        placeholder="e.g. 21.121365496"
                        className="py-5 rounded-sm"
                        {...register('latitude', { required: true })}
                     />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Delivery Longitude</Label>
                     <Input
                        type="number"
                        step="any"
                        placeholder="e.g. 91.123456789"
                        className="py-5 rounded-sm"
                        {...register('longitude', { required: true })}
                     />
                  </div>
               </div>

               {/* === Parcel Delivery Address  and submit button=== */}
               <div className="flex flex-col items-end md:flex-row gap-4">
                  <div className="grid w-full flex-2/5 gap-3 ">
                     <Label>Parcel Delivery Address</Label>
                     <Textarea
                        className={'rounded-sm h-20'}
                        placeholder="Type your parcel address."
                        id="message-2"
                        {...register('address', { required: true })}
                     />
                  </div>

                  {/* === Submit Button === */}
                  <div className="flex flex-1 justify-center mt-4 ">
                     <Button
                        disabled={
                           reqLoading ||
                           role.role === 'Admin' ||
                           role.role === 'DeliveryMen'
                        }
                        className="w-full md:w-auto lg:w-full py-6 cursor-pointer"
                     >
                        {reqLoading ? (
                           <LiaSpinnerSolid className="animate-spin" />
                        ) : (
                           'Book Parcel'
                        )}
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </section>
   );
};

export default BookParcel;
