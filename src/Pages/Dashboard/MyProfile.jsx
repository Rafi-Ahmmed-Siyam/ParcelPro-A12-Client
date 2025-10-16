import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator'; // For visual separation
import useAuth from '@/hooks/Custom/useAuth';
import { Badge } from '@/components/ui/badge';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formateDate } from '@/Utilities/dateFormater';

// Assuming these are the props you'd receive from Firebase/state
// const user = {
//    name: 'Jane Doe',
//    email: 'jane.doe@example.com',
//    uid: 'f1r3b4s3u1d-123456789',
//    phoneNumber: '+880 1712 345678', // Example: Adding a common profile field
//    lastLogin: '2023-10-27 10:30 AM', // Example: Adding another profile field
//    accountCreated: '2022-03-15',
//    imageUrl:
//       'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=300&q=80', // Placeholder
//    initials: 'JD',
// };

const MyProfile = () => {
   const { user } = useAuth();

   return (
      <Dialog>
         <div className="p-6 md:p-10 w-full">
            {/* ======================================= */}
            {/* === 1. Profile Display Content === */}
            {/* ======================================= */}
            <Card className="shadow-none border-none max-w-6xl mx-auto">
               {/* Header Section */}
               <CardHeader className="border-b px-0 py-4">
                  <CardTitle className="text-3xl font-bold tracking-tight">
                     My Profile
                  </CardTitle>
                  <CardDescription className="text-md text-gray-500">
                     View and manage your account details securely.
                  </CardDescription>
               </CardHeader>

               <CardContent className="pt-8 grid md:grid-cols-3 gap-8 px-0 pb-6">
                  {/* Left Column: Avatar and Info */}
                  <div className="md:col-span-1 flex flex-col items-center p-4">
                     <div className="relative group mb-4">
                        {/* Avatar */}
                        <Avatar className="w-40 h-40 border-4 border-gray-100 ring-1 ring-gray-300">
                           <AvatarImage
                              src={user.photoURL}
                              alt={user.displayName}
                           />
                           <AvatarFallback className="text-4xl font-bold bg-gray-200 text-gray-700">
                              {user.initials}
                           </AvatarFallback>
                        </Avatar>

                        {/* Role Badge */}
                        <Badge
                           className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 
                                               text-xs font-semibold px-3 py-1 bg-primary text-primary-foreground 
                                               border-2 border-white shadow-md z-10"
                           variant="default"
                        >
                           {user.role || 'User'}
                        </Badge>
                     </div>

                     {/* Displayed Name */}
                     <h4 className="text-xl font-bold mt-2">
                        {user.displayName}
                     </h4>
                     <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  {/* Right Column: User Details */}
                  <div className="md:col-span-2 p-4 pt-0 space-y-6 md:border-l md:pl-8">
                     {/* User ID (UID) - Keeping relevant data visible */}
                     <div>
                        <p className="text-sm font-medium text-gray-500">
                           User ID (Firebase)
                        </p>
                        <div className="flex items-center gap-2">
                           <p className="text-sm font-mono text-gray-700 bg-gray-100 p-2 rounded">
                              {user.uid}
                           </p>
                        </div>
                     </div>

                     <Separator />

                     {/* Account Metadata Grid */}
                     <div className="grid grid-cols-2 gap-4 pt-2">
                        {/* Phone Number */}
                        <div>
                           <p className="text-sm font-medium text-gray-500">
                              Phone Number
                           </p>
                           <p className="text-md text-gray-700">
                              {user.phoneNumber || 'N/A'}
                           </p>
                        </div>

                        {/* Last Login */}
                        <div>
                           <p className="text-sm font-medium text-gray-500">
                              Last Login
                           </p>
                           <p className="text-md text-gray-700">
                              {formateDate(user.reloadUserInfo.lastLoginAt) ||
                                 'N/A'}
                           </p>
                        </div>

                        {/* Account Created */}
                        <div>
                           <p className="text-sm font-medium text-gray-500">
                              Account Created
                           </p>
                           <p className="text-md text-gray-700">
                              {formateDate(user.reloadUserInfo.createdAt)}
                           </p>
                        </div>
                     </div>

                     {user.providerData[0].providerId !== 'google.com' && (
                        <div className="pt-8 flex justify-end">
                           <DialogTrigger asChild>
                              <Button size="lg" className="px-8 font-semibold">
                                 Update Profile
                              </Button>
                           </DialogTrigger>
                        </div>
                     )}
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* ======================================= */}
         {/* === 2. Unified Update Profile Dialog === */}
         {/* ======================================= */}
         <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
               <DialogTitle className="text-2xl font-bold">
                  Edit Profile Details
               </DialogTitle>
               <DialogDescription>
                  Update your name and profile photo. Click save when you're
                  done.
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
               {/* 1. Name Update Field */}
               <div className="grid gap-2">
                  <Label htmlFor="displayName" className="text-sm font-medium">
                     Full Name
                  </Label>
                  <Input
                     id="displayName"
                     defaultValue={user.displayName || ''}
                     placeholder="Enter your full name"
                  />
               </div>

               <Separator />

               {/* 2. Profile Picture Upload */}
               <div className="grid gap-2">
                  <Label className="text-sm font-medium">Profile Picture</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-primary transition-colors">
                     {/* Current Avatar/Preview */}
                     <Avatar className="w-16 h-16 mb-3">
                        <AvatarImage
                           src={user.photoURL}
                           alt={user.displayName}
                        />
                        <AvatarFallback className="bg-gray-200">
                           {user.initials}
                        </AvatarFallback>
                     </Avatar>

                     <Label
                        htmlFor="picture-upload"
                        className="cursor-pointer text-primary font-semibold hover:underline"
                     >
                        Click to change photo
                     </Label>
                     <p className="text-xs text-gray-500 mt-1">
                        JPG or PNG, max 5MB
                     </p>

                     {/* Hidden Input for file selection */}
                     <Input
                        id="picture-upload"
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png"
                     />
                  </div>
               </div>
            </div>

            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DialogClose>
               <Button type="submit" className="font-semibold">
                  Save Changes
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default MyProfile;
