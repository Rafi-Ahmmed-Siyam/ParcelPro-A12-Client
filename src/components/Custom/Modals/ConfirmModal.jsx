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

const ConfirmModal = ({ openModal, setOpenModal, deleteConfirm }) => {
   return (
      <Dialog open={openModal} onOpenChange={setOpenModal}>
         <form>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle className={'text-center text-2xl'}>
                     Are you sure?
                  </DialogTitle>
                  <DialogDescription className={'text-center mt-1'}>
                     This action cannot be undone. Do you want to continue?
                  </DialogDescription>
               </DialogHeader>
               <Separator className={'my-2'} />
               <div className="flex justify-center items-center gap-6">
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button onClick={deleteConfirm}>Delete</Button>
               </div>
            </DialogContent>
         </form>
      </Dialog>
   );
};

export default ConfirmModal;
