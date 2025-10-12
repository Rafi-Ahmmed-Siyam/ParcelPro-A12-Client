import HomeLayout from '@/Layouts/HomeLayout';
import Login from '@/Pages/Authentication/Login';
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
]);

export default router;
