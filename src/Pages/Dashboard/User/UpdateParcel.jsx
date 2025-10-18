import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useAuth from '@/hooks/Custom/useAuth';
import { useForm } from 'react-hook-form';
import { TbCurrencyTaka } from 'react-icons/tb';
import { addHours, isBefore } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import useUserParcels from '@/hooks/Custom/useUserParcels';
import { successToast } from '@/Utilities/Toasts';

const UpdateParcel = () => {
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();
   const [, refetch] = useUserParcels();
   const { user } = useAuth();
   const { id } = useParams();
   const [updateWeight, setUpdateWeight] = useState(0);
   const [updatePrice, setUpdatePrice] = useState(0);

   const { data: parcel = [] } = useQuery({
      queryKey: ['parcel', id],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/parcels/${id}`);
         return data;
      },
   });
   // console.log(parcel);
   const {
      _id,
      weight,
      senderPhone,
      senderName,
      senderEmail,
      receiverPhone,
      receiverName,
      price,
      parcelType,
      deliveryLongitude,
      deliveryLatitude,
      deliveryDate,
      deliveryAddress,
      createdAt,
      bookingStatus,
   } = parcel || {};

   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm();

   // This is for show default value
   useEffect(() => {
      if (price) setUpdatePrice(price);
      if (weight) setUpdateWeight(weight);

      if (parcel) {
         reset({
            type: parcelType,
            phone: senderPhone,
            receiverName: receiverName,
            receiverPhone: receiverPhone,
            deliveryDate: deliveryDate,
            address: deliveryAddress,
            longitude: deliveryLongitude,
            latitude: deliveryLatitude,
         });
      }
   }, [
      price,
      weight,
      reset,
      parcel,
      parcelType,
      senderPhone,
      senderName,
      receiverPhone,
      deliveryDate,
      deliveryAddress,
      deliveryLatitude,
      deliveryLongitude,
      receiverName,
   ]);

   // Thi is for update price
   useEffect(() => {
      if (!updateWeight || updateWeight < 0) return setUpdatePrice(0);

      if (updateWeight > 2) {
         return setUpdatePrice(150);
      }

      return setUpdatePrice(updateWeight * 50);
   }, [updateWeight]);

   const hanDleUpdateSubmit = async (data) => {
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

      const updateParcelData = {
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
         createdAt: createdAt,
         bookingStatus: bookingStatus,
      };

      try {
         const { data } = await axiosSecure.put(
            `/parcels/${id}`,
            updateParcelData
         );
         if (data.modifiedCount > 0) {
            refetch();
            navigate('/dashboard/myParcel');
            successToast('Your parcel Successfully updated');
         }
         // myParcel
         console.log(data);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <section className="min-h-[calc(100vh-45px)] flex items-center justify-center  p-6">
         <div className="w-full px-5 md:px-14 lg:px-0 lg:max-w-4xl">
            {/* Form container */}
            <form
               onSubmit={handleSubmit(hanDleUpdateSubmit)}
               className="space-y-5"
            >
               {/* === Heading === */}
               <h1 className="text-center text-3xl font-bold text-slate-800 mb-7">
                  Update Parcel
               </h1>
               <p className="text-sm text-muted-foreground mt-1 text-center max-w-2xl mx-auto">
                  Modify your existing parcel details if any information has
                  changed. Please ensure the updated details are correct before
                  saving the changes.
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
                        {...register('type')}
                     />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Phone Number</Label>
                     <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="py-5 rounded-sm"
                        {...register('phone')}
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
                        {...register('receiverName')}
                     />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Receiver’s Phone</Label>
                     <Input
                        type="tel"
                        placeholder="Enter receiver’s phone number"
                        className="py-5 rounded-sm"
                        {...register('receiverPhone')}
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
                              value={updateWeight}
                              onChange={(e) => setUpdateWeight(e.target.value)}
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
                                 {updatePrice.toFixed(2) || '0'}
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
                        {...register('latitude')}
                     />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                     <Label>Delivery Longitude</Label>
                     <Input
                        type="number"
                        step="any"
                        placeholder="e.g. 91.123456789"
                        className="py-5 rounded-sm"
                        {...register('longitude')}
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
                        {...register('address')}
                     />
                  </div>

                  {/* === Submit Button === */}
                  <div className="flex flex-1 justify-center mt-4 ">
                     <Button className="w-full md:w-auto lg:w-full py-6 cursor-pointer">
                        {/* {reqLoading ? (
                           <LiaSpinnerSolid className="animate-spin" />
                        ) : (
                           'Update Parcel'
                        )} */}
                        Update
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </section>
   );
};

export default UpdateParcel;
