import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react'; // lucide-react icon import
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import GoogleSignInButton from './GoogleSignInButton';
import useAuth from '@/hooks/Custom/useAuth';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { errorToast, successToast } from '@/Utilities/Toasts';

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const { signIn, loading } = useAuth();
   const location = useLocation();
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const from = location?.state?.from?.pathname || '/';
   // console.log(from);

   const handleSubmitLogin = async (data) => {
      const { email, password } = data || {};
      try {
         await signIn(email, password);
         successToast('Login Successful!');
         navigate(from, { replace: true });
      } catch (err) {
         errorToast(err.message);
      }
   };

   return (
      <section className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
         <div className="w-full max-w-sm md:max-w-4xl">
            <Card className="overflow-hidden p-0">
               <CardContent className="grid p-0 md:grid-cols-2">
                  <form
                     onSubmit={handleSubmit(handleSubmitLogin)}
                     className="p-6 md:p-8"
                  >
                     <div className="flex flex-col items-center gap-2 text-center mb-5">
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-muted-foreground text-balance">
                           Login to your ParcelPro account
                        </p>
                     </div>
                     {/* Inputs Container */}
                     <div className="flex flex-col gap-4">
                        <Field>
                           <FieldLabel htmlFor="email">Email</FieldLabel>
                           <Input
                              className={'py-5 rounded-sm'}
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              {...register('email', {
                                 required: 'Email is required',
                              })}
                           />
                           {errors.email && (
                              <p className="text-red-500 text-sm ">
                                 {errors.email.message}
                              </p>
                           )}
                        </Field>
                        <Field className="relative">
                           <FieldLabel htmlFor="password">Password</FieldLabel>
                           <Input
                              // required
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              className="pr-10 py-5 rounded-sm" // icon space
                              {...register('password', {
                                 required: 'Password is required.',
                              })}
                           />
                           {errors.password?.type === 'required' && (
                              <p className="text-red-500 text-sm ">
                                 {errors.password.message}
                              </p>
                           )}
                           <button
                              type="button"
                              className="absolute left-[270px] md:left-[275px] lg:left-[350px]  top-10"
                              onClick={() => setShowPassword(!showPassword)}
                           >
                              {showPassword ? (
                                 <EyeOff size={20} />
                              ) : (
                                 <Eye size={20} />
                              )}
                           </button>
                           <a
                              href="#"
                              className="ml-auto text-sm underline-offset-2 hover:underline"
                           >
                              Forgot your password?
                           </a>
                        </Field>
                        <Field className={'mt-2'}>
                           <Button
                              disabled={loading}
                              type="submit"
                              className="w-full cursor-pointer py-5 rounded-sm"
                           >
                              {loading ? (
                                 <LiaSpinnerSolid className="animate-spin" />
                              ) : (
                                 'Sign In'
                              )}
                           </Button>
                        </Field>
                     </div>

                     <GoogleSignInButton from={from} />

                     <FieldDescription className="text-center pt-3.5">
                        Don&apos;t have an account?{' '}
                        <Link to={'/signup'}>Signup</Link>
                     </FieldDescription>
                  </form>
                  <div className="bg-muted relative hidden md:block">
                     <img
                        src="https://i.ibb.co.com/LdFWKqZt/Google-Map-TA.webp"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                     />
                  </div>
               </CardContent>
            </Card>
            <FieldDescription className="px-6 pt-5 text-center">
               By clicking continue, you agree to our{' '}
               <a href="#">Terms of Service</a> and{' '}
               <a href="#">Privacy Policy</a>.
            </FieldDescription>
         </div>
      </section>
   );
};

export default Login;
