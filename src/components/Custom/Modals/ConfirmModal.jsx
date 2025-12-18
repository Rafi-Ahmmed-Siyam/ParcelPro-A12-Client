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
import { Separator } from '@/components/ui/separator';

const ConfirmModal = ({
   open,
   setOpen,
   heading,
   description,
   handleConfirm,
}) => {
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className={'text-center text-2xl'}>
                  {heading}
               </DialogTitle>
               <DialogDescription className={'text-center mt-1'}>
                  {description}
               </DialogDescription>
            </DialogHeader>

            <Separator className={'my-1'} />
            <div className="flex justify-center items-center gap-6">
               <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DialogClose>

               <Button onClick={handleConfirm}>Confirm</Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default ConfirmModal;
