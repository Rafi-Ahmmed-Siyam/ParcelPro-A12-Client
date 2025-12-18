import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const DeleteModal = ({ openModal, setOpenModal, deleteConfirm }) => {
   return (
      <Dialog open={openModal} onOpenChange={setOpenModal}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className={'text-center text-2xl'}>
                  Are you sure?
               </DialogTitle>
               <DialogDescription className={'text-center mt-1'}>
                  Are you sure you want to delete this item? <br />
                  <span className="text-slate-600 font-medium">
                     This action cannot be undone.
                  </span>
               </DialogDescription>
            </DialogHeader>
            <Separator className={'my-1'} />
            <div className="flex justify-center items-center gap-6">
               <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DialogClose>

               <Button onClick={deleteConfirm}>Delete</Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default DeleteModal;
