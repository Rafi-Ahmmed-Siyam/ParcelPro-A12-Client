import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAxiosSecure from '@/hooks/Custom/useAxiosSecure'; 
import useLoading from '@/hooks/Custom/useLoading';
import { successToast } from '@/Utilities/Toasts';
import { useState } from 'react';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

const NumberInputModal = ({ open, isOpen, role, reloadRole }) => {
   const { id } = role || {};
   const axiosSecure = useAxiosSecure();
   const { reqLoading, setReqLoading } = useLoading();

   const [phone, setPhone] = useState('');
   const [error, setError] = useState('');
   // console.log(id);
   const handleVerify = async () => {
      if (phone.length !== 11) {
         setError('Phone number must be 11 digits without country code');
         return;
      }
      setError('');
      setReqLoading(true);
      // Send patch req and if success reload role
      const { data } = await axiosSecure.patch('/deliveryman', { id, phone });
      // console.log(data);
      if (data.modifiedCount > 0) {
         setReqLoading(false);
         setPhone('');
         reloadRole();
         successToast('You are now verified as a Delivery man');
      }
   };
   return (
      <Dialog open={open} onOpenChange={isOpen}>
         {/* Modal Content */}
         <DialogContent className="sm:max-w-[440px] rounded-2xl shadow-lg p-6">
            <DialogHeader>
               <DialogTitle className="text-2xl font-semibold text-red-600">
                  Verification Notice
               </DialogTitle>
               <DialogDescription className="text-gray-600 mt-2">
                  You are not verified as a delivery man because your number was
                  not found in our records. Please enter your phone number to
                  save it in our system.
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="grid gap-2">
                  <Label htmlFor="phone" className="font-medium">
                     Phone Number
                  </Label>
                  <Input
                     onChange={(e) => setPhone(e.target.value)}
                     id="phone"
                     type="number"
                     placeholder="01XXXXXXXXX"
                     className={`${error ? 'border border-red-300' : ''}`}
                  />
                  <p className="text-sm text-gray-500">
                     Enter your 11-digit number without country code.
                  </p>
                  {error && <p className="text-sm text-red-500">{error}</p>}
               </div>
            </div>

            <DialogFooter className="flex justify-end gap-3 mt-4">
               <Link to="/">
                  <Button variant="outline" className="rounded-md px-6 py-2">
                     Cancel
                  </Button>
               </Link>

               <Button
                  onClick={handleVerify}
                  disabled={reqLoading}
                  className="rounded-md px-6 py-2 bg-primary text-white hover:bg-primary/90"
               >
                  {reqLoading ? (
                     <LiaSpinnerSolid className="animate-spin" />
                  ) : (
                     'Save Number'
                  )}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default NumberInputModal;
