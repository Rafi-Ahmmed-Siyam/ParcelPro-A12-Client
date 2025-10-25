import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';

import './CheckoutStyles.css';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import useAuth from '@/hooks/Custom/useAuth';
import { successToast } from '@/Utilities/Toasts';
import { useNavigate } from 'react-router-dom';
import useLoading from '@/hooks/Custom/useLoading';
const CheckoutFrom = ({ parcelId, parcel }) => {
   const navigate = useNavigate();
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
   const { reqLoading, setReqLoading } = useLoading();
   const [clientSecret, setClientSecret] = useState('');

   useEffect(() => {
      getPaymentIntent();
   }, []);
   const getPaymentIntent = async () => {
      try {
         const { data } = await axiosSecure.post('/payment-Intent', {
            parcelId,
         });
         setClientSecret(data.clientSecret);
      } catch (err) {
         console.log('Create payment Intent ERROR', err);
      }
   };

   const stripe = useStripe();
   const elements = useElements();

   const handleCheckout = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) return;
      const card = elements.getElement(CardElement);
      if (card == null) return;
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card,
      });
      if (error) {
         console.log('Payment Error', error);
      } else {
         console.log('Payment Method', paymentMethod);
      }
      setReqLoading(true);
      // Confirm card payment
      const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: card,
            billing_details: {
               email: user?.email,
               name: user?.displayName,
            },
         },
      });

      if (confirmPayment?.paymentIntent?.status === 'succeeded') {
         const billingDetails = {
            parcelId,
            parcelType: parcel?.parcelType,
            transactionId: confirmPayment?.paymentIntent?.id,
            amount: parcel.price,
            email: parcel?.senderEmail,
            paidAt: new Date(),
         };

         // Post req in db
         try {
            const { data } = await axiosSecure.post(
               '/payments',
               billingDetails
            );

            const { data: updateResult } = await axiosSecure.patch(
               `/parcels-paid/${parcelId}`
            );

            console.log(updateResult);
            if (data.insertedId && updateResult.modifiedCount > 0) {
               successToast(
                  `Payment Successful! Transaction ID: ${confirmPayment?.paymentIntent?.id}`
               );
               card.clear();
               setReqLoading(false);
               navigate('/dashboard/paymentHistory', {
                  state: { paymentSuccess: true },
               });
            }
         } catch (err) {
            setReqLoading(false);
            console.log(err);
         }
      }

      console.log(confirmPayment.paymentIntent.status);
   };

   return (
      <div>
         <form className="max-w-[550px] mx-auto " onSubmit={handleCheckout}>
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                           color: '#aab7c4',
                        },
                     },
                     invalid: {
                        color: '#9e2146',
                     },
                  },
               }}
            />
            <div className="flex justify-center items-center">
               <Button
                  disabled={!stripe || !clientSecret}
                  className={'px-20 py-5 rounded-sm'}
                  type="submit"
               >
                  Pay
               </Button>
            </div>
         </form>
      </div>
   );
};

export default CheckoutFrom;
