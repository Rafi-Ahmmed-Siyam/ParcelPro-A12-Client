import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import Login from '@/Pages/Authentication/Login';
import Signup from '@/Pages/Authentication/Signup';
import HomePage from '@/Pages/HomePage';
import Order from '@/Pages/Order';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivetRoute from './PrivetRoute';
import BookParcel from '@/Pages/Dashboard/User/BookParcel';
import MyParcel from '@/Pages/Dashboard/User/MyParcel';

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomeLayout />,
      children: [
         {
            index: true,
            element: <HomePage />,
         },
         {
            path: 'order',
            element: (
               <PrivetRoute>
                  <Order />
               </PrivetRoute>
            ),
         },
      ],
   },
   {
      path: 'login',
      element: <Login />,
   },
   {
      path: 'signup',
      element: <Signup />,
   },
   {
      path: 'dashboard',
      element: (
         <PrivetRoute>
            <DashboardLayout />
         </PrivetRoute>
      ),
      children: [
         {
            path: 'bookParcel',
            element: <BookParcel />,
         },
         {
            path: 'myParcel',
            element: <MyParcel />,
         },
      ],
   },
]);

export default router;
