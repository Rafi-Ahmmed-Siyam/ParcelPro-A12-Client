import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '@/Utilities/Toasts';

const axiosSecure = axios.create({ baseURL: import.meta.env.VITE_URL });
const useAxiosSecure = () => {
   const { logOut } = useAuth();
   const navigate = useNavigate();
   useEffect(() => {
      // Request interceptor
      const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
         const token = localStorage.getItem('token');
         if (token) config.headers.Authorization = `Bearer ${token}`;
         return config;
      });

      // Response Interceptor
      const responseInterceptor = axiosSecure.interceptors.response.use(
         (res) => {
            return res;
         },
         async (error) => {
            // console.log(`Error from Interceptor`, error);
            errorToast(
               error.response.data.message || error.response.statusText
            );
            const errCode = error.response.status;
            if (errCode === 401 || errCode === 403) {
               await logOut();
               navigate('/login');
            }
            return Promise.reject(error);
         }
      );
      return () => {
         axiosSecure.interceptors.request.eject(reqInterceptor);
         axiosSecure.interceptors.response.eject(responseInterceptor);
      };
   }, [logOut, navigate]);

   return axiosSecure;
};

export default useAxiosSecure;
