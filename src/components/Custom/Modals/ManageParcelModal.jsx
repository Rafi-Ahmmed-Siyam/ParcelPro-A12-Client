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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import useDeliveryMen from '@/hooks/Custom/useDeliveryMen';
import { useState } from 'react';

const ManageParcelModal = ({
   open,
   isOpen,
   parcel,
   setApproxDate,
   setDeliveryManId,
   handleAssign,
}) => {
   const { deliveryMen } = useDeliveryMen();

   // console.log(approxDate, deliveryMan);
   return (
      <Dialog open={open} onOpenChange={isOpen}>
         <form>
            <DialogContent className="sm:max-w-[600px]">
               <DialogHeader>
                  <DialogTitle>Manage Parcel</DialogTitle>
                  <DialogDescription>
                     View parcel details and assign delivery man here.
                  </DialogDescription>
               </DialogHeader>

               {/* 2-column grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {/* Parcel Name (display only) */}
                  <div className="grid gap-1">
                     <Label>Parcel Type</Label>
                     <div className="border rounded-sm h-10 flex justify-start items-center bg-[#F1F5F9]">
                        <span className="flex items-center text-slate-700 font-normal text-sm pl-2">
                           {parcel?.parcelType || 'Empty'}
                        </span>
                     </div>
                  </div>

                  {/* Parcel Address (display only) */}
                  <div className="grid gap-1">
                     <Label>Delivery Address</Label>
                     <div className="border rounded-sm h-10 flex justify-start items-center bg-[#F1F5F9]">
                        <span className="flex items-center text-slate-700 font-normal text-sm pl-2">
                           {parcel?.deliveryAddress}
                        </span>
                     </div>
                  </div>

                  {/* Parcel Weight */}
                  <div className="grid gap-1">
                     <Label>Weight (kg)</Label>
                     <div className="border rounded-sm h-10 flex justify-start items-center bg-[#F1F5F9]">
                        <span className="flex items-center text-slate-700 font-normal text-sm pl-2">
                           {parcel?.weight || '0'} Kg
                        </span>
                     </div>
                  </div>

                  {/* Requested Date */}
                  <div className="grid gap-1">
                     <Label>Requested Date</Label>
                     <div className="border rounded-sm h-10 flex justify-start items-center bg-[#F1F5F9]">
                        <span className="flex items-center text-slate-700 font-normal text-sm pl-2">
                           {parcel?.deliveryDate || 'N/A'}
                        </span>
                     </div>
                  </div>

                  {/* Editable fields */}

                  {/* Delivery Man */}
                  <div className="grid gap-2">
                     <Label htmlFor="delivery-man">Delivery Man</Label>
                     <Select onValueChange={(value) => setDeliveryManId(value)}>
                        <SelectTrigger
                           id="delivery-man"
                           className="w-full rounded-sm py-5"
                        >
                           <SelectValue placeholder="Select Delivery Man" />
                        </SelectTrigger>
                        <SelectContent>
                           {deliveryMen?.map((deliveryMan) => (
                              <SelectItem
                                 key={deliveryMan._id}
                                 value={deliveryMan._id}
                              >
                                 {deliveryMan.name}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  {/* Approximate Delivery Date */}
                  <div className="grid gap-2">
                     <Label htmlFor="delivery-date">
                        Approx. Delivery Date
                     </Label>
                     <Input
                        onChange={(e) => setApproxDate(e.target.value)}
                        type={'date'}
                        className={'rounded-sm py-5'}
                     />
                  </div>
               </div>

               {/* Footer buttons */}
               <DialogFooter className="mt-6 flex justify-end gap-2">
                  <div className="flex justify-center lg:justify-end gap-2.5 items-center">
                     <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                     </DialogClose>
                     <Button onClick={handleAssign} type="submit">
                        Assign
                     </Button>
                  </div>
               </DialogFooter>
            </DialogContent>
         </form>
      </Dialog>
   );
};

export default ManageParcelModal;
