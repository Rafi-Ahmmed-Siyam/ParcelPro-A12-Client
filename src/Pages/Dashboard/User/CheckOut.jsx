import CheckoutFrom from '@/components/Custom/CheckoutForm/CheckoutFrom';
import Container from '@/components/Custom/Shared/Container';
import LoadingSpinner from '@/components/LoadingSpinner';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckOut = () => {
   const { id } = useParams();
   const axiosSecure = useAxiosSecure();
   const {
      data: parcel = [],
      isLoading,
      isPending,
   } = useQuery({
      queryKey: ['parcel', id],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/parcels/${id}`);
         return data;
      },
      enabled: !!id,
   });
   const { _id, parcelType, price } = parcel || {};

   if (isLoading || isPending) return <LoadingSpinner />;
   return (
      <Container>
         {/* Vertical center using padding */}
         <div className="pt-[calc(50vh-300px)]">
            {' '}
            {/* 300px = approx height of all boxes + form */}
            <h1 className="text-center text-3xl font-bold text-slate-800 mb-7">
               Payment
            </h1>
            {/* Parcel Info Boxes */}
            <div className="max-w-[500px] mx-auto">
               <div className="flex gap-4 mb-5">
                  <div className="bg-slate-200 border-2 text-slate-800 py-2 rounded-sm w-1/2 text-center">
                     <span>
                        Parcel Type:{' '}
                        {parcelType?.length > 10
                           ? `Cumque sint doloremq`.slice(0, 10) + '...'
                           : `Cumque sint doloremq`}
                     </span>
                  </div>
                  <div className="bg-slate-200 border-2 text-slate-800 py-2 rounded-sm w-1/2 text-center">
                     <span>Total Price: {price} Tk</span>
                  </div>
               </div>
            </div>
            <div className="bg-slate-200 border-2 text-slate-800 py-2 rounded-sm w-full text-center mb-7 max-w-[500px] mx-auto">
               <span>Parcel ID: {_id}</span>
            </div>
            {/* Stripe Checkout */}
            <div className="max-w-[500px] mx-auto">
               <Elements stripe={stripePromise}>
                  <CheckoutFrom parcelId={_id} parcel={parcel} />
               </Elements>
            </div>
         </div>
      </Container>
   );
};

export default CheckOut;
