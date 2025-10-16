import { toast } from 'sonner';
import { CheckCircle2, XCircle } from 'lucide-react';

export const successToast = (message) => {
   toast(
      <div className="flex items-center gap-2 ">
         <CheckCircle2 className="text-white w-5 h-5" />
         <span>{message}</span>
      </div>,
      {
         className:
            'bg-green-600 text-white  border-none rounded-sm shadow-md px-3 py-2',

         unstyled: true,
      }
   );
};

export const errorToast = (message) => {
   toast(
      <div className="flex items-center gap-2 ">
         <XCircle className="text-white w-5 h-5" />
         <span>{message}</span>
      </div>,
      {
         className:
            'bg-red-500 text-white  border-none rounded-sm shadow-md px-3 py-2',

         unstyled: true,
      }
   );
};
