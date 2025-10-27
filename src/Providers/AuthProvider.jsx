import React, { createContext, useEffect, useState } from 'react';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   GoogleAuthProvider,
   signInWithPopup,
   sendPasswordResetEmail,
   updateProfile,
   signOut,
} from 'firebase/auth';
import { auth } from '@/Firebase.config';
import useAxiosPublic from '@/hooks/Custom/useAxiosPublic';

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState({ name: 'siyam' });
   const [loading, setLoading] = useState(true);
   const axiosPublic = useAxiosPublic();

   const googleProvider = new GoogleAuthProvider();
   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   const updateUserProfile = (name, photoURL) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
         displayName: name,
         photoURL: photoURL,
      });
   };

   const forgetPassword = (email) => {
      setLoading(true);
      return sendPasswordResetEmail(auth, email);
   };

   const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };

   const logOut = () => {
      setLoading(true);
      return signOut(auth);
   };

   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, async (user) => {
         if (user) {
            // create a post req for get token
            const { data } = await axiosPublic.post('/jwt', {
               email: user?.email,
            });
            // console.log(data);
            localStorage.setItem('token', data.token);

            setUser(user);
            setLoading(false);
            // console.log('CurrentUser', user);
         } else {
            localStorage.removeItem('token');
            setLoading(false);
            setUser(null);
            // console.log('User Logout');
         }
      });
      return () => unSubscribe();
   }, [axiosPublic]);

   const authData = {
      user,
      loading,
      setLoading,
      createUser,
      updateUserProfile,
      signIn,
      googleSignIn,
      forgetPassword,
      logOut,
   };
   return (
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
   );
};

export default AuthProvider;
