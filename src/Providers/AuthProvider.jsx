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

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState({ name: 'siyam' });
   const [loading, setLoading] = useState(true);
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
      const unSubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user);
            setLoading(false);
            console.log('CurrentUser', user);
         } else {
            setLoading(false);
            setUser(null);
            console.log('User Logout');
         }
      });
      return () => unSubscribe();
   }, []);

   const authData = {
      user,
      loading,
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
