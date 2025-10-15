import { Button } from '@/components/ui/button';
import { errorToast, successToast } from '@/Utilities/Toasts';

import React from 'react';
import { toast } from 'sonner';

const MyParcel = () => {
   return (
      <div>
         <h2>This is my parcel Page</h2>

         <Button onClick={() => successToast('Hello world!')}>succ</Button>
         <Button onClick={() => toast.success('Hello world hay')}>ok</Button>
         <Button onClick={() => errorToast('hhjgdjhgfgh')}>err</Button>
      </div>
   );
};

export default MyParcel;
