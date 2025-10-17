import React, { useState } from 'react';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
import { uploadImage } from '@/API/utils';

const MyProfile = () => {
   const { user, updateUserProfile, setLoading } = useAuth();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const isGoogleUser = user?.providerData[0]?.providerId === 'google.com';
   const [previewImage, setPreviewImage] = useState(null);
   const [selectedFile, setSelectedFile] = useState(null);

   const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
         setSelectedFile(e.target.files);
         const fileURL = URL.createObjectURL(file);
         setPreviewImage(fileURL);
      }
   };

   const avatarSrc = previewImage || user.photoURL;

   const handleUpdatePicture = async () => {
      if (!selectedFile) {
         alert('Please select a new picture first.');
         return;
      }

      console.log(user.displayName);
      const imgUrl = await uploadImage(selectedFile);
      console.log(imgUrl);
      await updateUserProfile(user.displayName, imgUrl);
      setIsModalOpen(false);
      setInterval(setLoading(false), 500);
   };

   return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
         <div className="p-6 md:p-10 w-full">
            <Card className="shadow-none border-none max-w-6xl mx-auto">
               <CardHeader className="border-b px-0 py-4">
                  <CardTitle className="text-3xl font-bold tracking-tight">
                     My Profile
                  </CardTitle>
                  <CardDescription className="text-md text-gray-500">
                     View and manage your account details securely.
                  </CardDescription>
               </CardHeader>

               <CardContent className="pt-8 grid md:grid-cols-3 gap-8 px-0 pb-6">
                  <div className="md:col-span-1 flex flex-col items-center p-4">
                     <div className="relative group mb-4">
                        <Avatar className="w-40 h-40 border-4 border-gray-100 ring-1 ring-gray-300">
                           <AvatarImage
                              src={user.photoURL}
                              alt={user.displayName}
                              referrerPolicy="no-referrer"
                           />
                        </Avatar>

                        <Badge
                           className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 
                                               text-xs font-semibold px-3 py-1 bg-primary text-primary-foreground 
                                               border-2 border-white shadow-md z-10"
                           variant="default"
                        >
                           {user.role || 'User'}
                        </Badge>
                     </div>

                     {!isGoogleUser && (
                        <>
                           <Button
                              onClick={() => setIsModalOpen(true)}
                              size="sm"
                              variant="outline"
                              className="font-semibold"
                           >
                              Upload Profile Picture
                           </Button>

                           <p className="text-xs text-gray-500 mt-1">
                              JPG or PNG, max 5MB
                           </p>
                        </>
                     )}

                     {isGoogleUser && (
                        <p className="text-sm text-gray-500 mt-2 text-center max-w-[160px]">
                           Profile picture managed by Google.
                        </p>
                     )}
                  </div>

                  <div className="md:col-span-2 p-4 pt-0 space-y-6 md:border-l md:pl-8">
                     {/* Full Name Field */}
                     <div>
                        <p className="text-sm font-medium text-gray-500">
                           Full Name
                        </p>
                        <h4 className="text-xl font-bold text-gray-800">
                           {user.displayName}
                        </h4>
                     </div>

                     <div>
                        <p className="text-sm font-medium text-gray-500">
                           Email Address
                        </p>
                        <p className="text-md text-gray-700">{user.email}</p>
                     </div>

                     {/* User ID (UID) */}
                     <div>
                        <p className="text-sm font-medium text-gray-500">
                           User ID
                        </p>
                        <div className="flex items-center gap-2">
                           <p className="text-sm font-mono text-gray-700 bg-gray-100 p-2 rounded">
                              {user.uid}
                           </p>
                        </div>
                     </div>

                     <Separator />

                     {/* Account data Grid */}
                     <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                           <p className="text-sm font-medium text-gray-500">
                              Phone Number
                           </p>
                           <p className="text-md text-gray-700">
                              {user.phoneNumber || 'N/A'}
                           </p>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-gray-500">
                              Last Login
                           </p>
                           <p className="text-md text-gray-700">
                              {formateDate(user.reloadUserInfo.lastLoginAt) ||
                                 'N/A'}
                           </p>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-gray-500">
                              Account Created
                           </p>
                           <p className="text-md text-gray-700">
                              {formateDate(user.reloadUserInfo.createdAt)}
                           </p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
               <DialogTitle className="text-2xl font-bold">
                  Update Profile Picture
               </DialogTitle>
               <DialogDescription>
                  Select a new profile image. JPG or PNG, max 5MB.
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
               <div className="grid gap-2">
                  <Label className="text-sm font-medium">
                     Select New Picture
                  </Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-primary transition-colors">
                     <Avatar className="w-20 h-20 mb-3">
                        <AvatarImage src={avatarSrc} alt={user.displayName} />
                     </Avatar>

                     <Label
                        htmlFor="picture-upload"
                        className="cursor-pointer text-primary font-semibold hover:underline"
                     >
                        {selectedFile
                           ? selectedFile.name
                           : 'Click to choose file'}
                     </Label>
                     <p className="text-xs text-gray-500 mt-1">
                        {selectedFile
                           ? "File selected. Click 'Update Picture' to save."
                           : 'JPG or PNG, max 5MB.'}
                     </p>

                     <Input
                        id="picture-upload"
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                     />
                  </div>
               </div>
            </div>

            <DialogFooter>
               <DialogClose asChild>
                  <Button
                     variant="outline"
                     onClick={() => {
                        setPreviewImage(null);
                        setSelectedFile(null);
                     }}
                  >
                     Cancel
                  </Button>
               </DialogClose>

               <Button
                  type="button"
                  className="font-semibold"
                  onClick={handleUpdatePicture}
                  disabled={!selectedFile}
               >
                  Update Picture
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default MyProfile;
