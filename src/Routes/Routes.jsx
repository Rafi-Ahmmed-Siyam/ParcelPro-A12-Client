import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import Login from '@/Pages/Authentication/Login';
import Signup from '@/Pages/Authentication/Signup';
import HomePage from '@/Pages/HomePage';
import Order from '@/Pages/Order';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
            element: <Order />,
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
      element: <DashboardLayout />,
   },
]);

export default router;
