import { Button } from '@/components/ui/button';
import { Field, FieldSeparator } from '@/components/ui/field';
import useAuth from '@/hooks/Custom/useAuth';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = ({ from }) => {
   const { googleSignIn } = useAuth();
   const navigate = useNavigate();
   const handleGoogleLogin = async () => {
      try {
         await googleSignIn();
         navigate(from, { replace: true });
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <div>
         <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-4">
            Or continue with
         </FieldSeparator>

         <Field>
            <Button
               onClick={handleGoogleLogin}
               variant="outline"
               type="button"
               className="w-full flex items-center justify-center gap-2 cursor-pointer"
            >
               <FcGoogle className="size-6" />
               Continue with Google
            </Button>
         </Field>
      </div>
   );
};

export default GoogleSignInButton;
