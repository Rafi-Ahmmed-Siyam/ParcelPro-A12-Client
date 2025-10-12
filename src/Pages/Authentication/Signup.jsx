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
import { Link } from 'react-router-dom';

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <section className="bg-muted flex min-h-screen items-center justify-center p-7">
         <Card className="w-full max-w-xl">
            <CardContent className={'px-6 md:px-8 lg:px-8 py-2.5'}>
               <form className="flex flex-col">
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
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        required
                     />
                  </Field>

                  {/* Email */}
                  <Field className="mb-4">
                     <FieldLabel htmlFor="email">Email</FieldLabel>
                     <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
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
                           className="w-full border p-2 cursor-pointer"
                        />
                     </Field>

                     {/* Role Select */}
                     <Field className="md:w-1/2 mt-4 md:mt-0">
                        <FieldLabel htmlFor="role">Select a Role</FieldLabel>
                        <Select>
                           <SelectTrigger className="w-full">
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
                        required
                        className="pr-12"
                        placeholder="Create a Password"
                     />
                     <button
                        type="button"
                        className="absolute left-[260px] md:left-[480px] lg:left-[480px]  top-10"
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
                     <Button type="submit" className="w-full">
                        Sign Up
                     </Button>
                  </Field>

                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-4">
                     Or continue with
                  </FieldSeparator>

                  <Field className="mb-4">
                     <Button
                        variant="outline"
                        type="button"
                        className="w-full flex items-center justify-center gap-2"
                     >
                        <FcGoogle className="size-6" />
                        Continue with Google
                     </Button>
                  </Field>

                  <FieldDescription className="text-center">
                     Already have an account? <Link to={'/login'}>Sign in</Link>
                  </FieldDescription>
               </form>
            </CardContent>
         </Card>
      </section>
   );
};

export default Signup;
