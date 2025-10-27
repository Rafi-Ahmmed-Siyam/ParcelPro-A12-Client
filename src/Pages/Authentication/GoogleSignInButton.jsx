import { Button } from '@/components/ui/button';
import { Field, FieldSeparator } from '@/components/ui/field';
import useAuth from '@/hooks/Custom/useAuth';
import useAxiosPublic from '@/hooks/Custom/useAxiosPublic';
import { errorToast, successToast } from '@/Utilities/Toasts';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = ({ from }) => {
   const { googleSignIn, setLoading } = useAuth();
   const navigate = useNavigate();
   const axiosPublic = useAxiosPublic();
   const handleGoogleLogin = async () => {
      try {
         const { user } = await googleSignIn();
         // console.log(user.email, user.photoURL);
         const { data } = await axiosPublic.post('/users', {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            role: 'User',
            createdAt: new Date(),
         });
         // console.log(data);
         successToast('Login Successful');
         navigate(from, { replace: true });
      } catch (err) {
         // console.log(err);
         errorToast(err.message || 'Something went wrong!')
         setLoading(false);
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
               className="w-full flex items-center justify-center gap-2 cursor-pointer py-5 rounded-sm"
            >
               <FcGoogle className="size-6" />
               Continue with Google
            </Button>
         </Field>
      </div>
   );
};

export default GoogleSignInButton;
