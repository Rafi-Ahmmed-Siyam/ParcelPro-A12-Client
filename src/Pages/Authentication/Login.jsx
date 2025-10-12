import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import {
   Field,
   FieldGroup,
   FieldLabel,
   FieldDescription,
   FieldSeparator,
} from '@/components/ui/field';
import { Eye, EyeOff } from 'lucide-react'; // lucide-react icon import
import { Link, NavLink } from 'react-router-dom';

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <section className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
         <div className="w-full max-w-sm md:max-w-4xl">
            <Card className="overflow-hidden p-0">
               <CardContent className="grid p-0 md:grid-cols-2">
                  <form className="p-6 md:p-8">
                     <div className="flex flex-col items-center gap-2 text-center mb-5">
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-muted-foreground text-balance">
                           Login to your Parcel account
                        </p>
                     </div>
                     {/* Inputs Container */}
                     <div className="flex flex-col gap-4">
                        <Field>
                           <FieldLabel htmlFor="email">Email</FieldLabel>
                           <Input
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              required
                           />
                        </Field>
                        <Field className="relative">
                           <FieldLabel htmlFor="password">Password</FieldLabel>
                           <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              required
                              className="pr-10" // icon space
                           />
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
                           <Button className={'cursor-pointer'} type="submit">
                              Login
                           </Button>
                        </Field>
                     </div>
                     <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-5">
                        Or continue with
                     </FieldSeparator>
                     <Field>
                        <Button
                           variant="outline"
                           type="button"
                           className="w-full flex items-center justify-center gap-2 cursor-pointer"
                        >
                           <FcGoogle className="size-6" />
                           Continue with Google
                        </Button>
                     </Field>
                     <FieldDescription className="text-center pt-3.5">
                        Don&apos;t have an account?{' '}
                        <NavLink to={'/signup'}>Signup</NavLink>
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
