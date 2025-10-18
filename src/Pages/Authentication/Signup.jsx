import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
   Field,
   FieldLabel,
   FieldDescription,
   FieldSeparator,
} from '@/components/ui/field';
import { Eye, EyeOff } from 'lucide-react';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/Custom/useAuth';
import { uploadImage } from '@/API/utils';
import GoogleSignInButton from './GoogleSignInButton';
import useAxiosPublic from '@/hooks/Custom/useAxiosPublic';
import useLoading from '@/hooks/Custom/useLoading';
import { successToast } from '@/Utilities/Toasts';

const Signup = () => {
   const [showPassword, setShowPassword] = useState(false);
   const { loading, createUser, updateUserProfile } = useAuth();
   const location = useLocation();
   const navigate = useNavigate();
   const axiosPublic = useAxiosPublic();
   const { reqLoading, setReqLoading } = useLoading();
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm();
   const from = location?.state?.from?.pathname || '/';

   const handleSignup = async (data) => {
      const { name, email, image, role, password } = data || {};
      setReqLoading(true);

      let imageUrl = 'https://i.ibb.co.com/PZQZ8Lc7/user.png';
      if (image && image?.length > 0) {
         const img = await uploadImage(image);
         imageUrl = img;
         console.log(img);
      }

      try {
         await createUser(email, password);
         await updateUserProfile(name, imageUrl);
         const { data } = await axiosPublic.post('/users', {
            name,
            email,
            image: imageUrl,
            role,
         });
         console.log(data);
         if (data?.insertedId) {
            navigate(from, { replace: true });
            successToast('Sign Up Successful!');
            reset();
         }
      } catch (err) {
         console.log(err);
      } finally {
         setReqLoading(false);
      }
   };

   return (
      <section className="bg-muted flex min-h-screen items-center justify-center p-7">
         <Card className="w-full max-w-xl">
            <CardContent className={'px-6 md:px-8 lg:px-8 py-2.5'}>
               <form
                  onSubmit={handleSubmit(handleSignup)}
                  className="flex flex-col"
               >
                  {/* Header */}
                  <div className="flex flex-col items-center gap-2 text-center mb-5">
                     <h1 className="text-2xl font-bold">Create an Account</h1>
                     <p className="text-muted-foreground text-balance">
                        Signup With ParcelPro
                     </p>
                  </div>

                  {/* Name */}
                  <Field className="mb-4">
                     <FieldLabel htmlFor="name">Name</FieldLabel>
                     <Input
                        className={'py-5 rounded-sm'}
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        {...register('name', { required: 'Name is required!' })}
                     />
                  </Field>

                  {/* Email */}
                  <Field className="mb-4">
                     <FieldLabel htmlFor="email">Email</FieldLabel>
                     <Input
                        className={'py-5 rounded-sm'}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email', {
                           required: 'NAme is required!',
                        })}
                     />
                  </Field>

                  {/* Image and Role Select */}
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
                     {/* Image Input */}
                     <Field className="md:w-1/2">
                        <FieldLabel htmlFor="picture">Picture</FieldLabel>
                        <Input
                           id="picture"
                           type="file"
                           className="w-full border  cursor-pointer h-[40.5px] rounded-sm"
                           {...register('image')}
                        />
                     </Field>

                     {/* Role Select */}
                     <Field className="md:w-1/2 mt-4 md:mt-0">
                        <FieldLabel htmlFor="role">Select a Role</FieldLabel>
                        <Select
                           onValueChange={(value) => setValue('role', value)}
                        >
                           <SelectTrigger className="w-full py-5 rounded-sm">
                              <SelectValue placeholder="Select a role" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 <SelectLabel>Roles</SelectLabel>
                                 <SelectItem value="User">User</SelectItem>
                                 <SelectItem value="DeliveryMen">
                                    Delivery Men
                                 </SelectItem>
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     </Field>
                  </div>

                  {/* Password */}
                  <Field className="relative mb-4">
                     <FieldLabel htmlFor="password">Password</FieldLabel>
                     <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="pr-12 py-5 rounded-sm"
                        placeholder="Create a Password"
                        {...register('password', {
                           required: 'Password is required!',
                        })}
                     />

                     <button
                        type="button"
                        className="absolute left-[260px] md:left-[480px] lg:left-[480px]  top-10 "
                        onClick={() => setShowPassword(!showPassword)}
                     >
                        {showPassword ? (
                           <EyeOff size={20} />
                        ) : (
                           <Eye size={20} />
                        )}
                     </button>
                  </Field>

                  {/* Submit Button */}
                  <Field className={'mt-2'}>
                     <Button
                        disabled={loading || reqLoading}
                        type="submit"
                        className="w-full cursor-pointer py-5 rounded-sm"
                     >
                        {loading || reqLoading ? (
                           <LiaSpinnerSolid className="animate-spin" />
                        ) : (
                           'Sign Up'
                        )}
                     </Button>
                  </Field>

                  <GoogleSignInButton from={from} />

                  <FieldDescription className="text-center pt-3.5">
                     Already have an account? <Link to={'/login'}>Sign in</Link>
                  </FieldDescription>
               </form>
            </CardContent>
         </Card>
      </section>
   );
};

export default Signup;
