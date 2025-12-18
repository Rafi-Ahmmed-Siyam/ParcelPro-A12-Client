import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import Login from '@/Pages/Authentication/Login';
import Signup from '@/Pages/Authentication/Signup';
import HomePage from '@/Pages/HomePage';
import { createBrowserRouter } from 'react-router-dom';
import PrivetRoute from './PrivetRoute';
import BookParcel from '@/Pages/Dashboard/User/BookParcel';
import MyParcel from '@/Pages/Dashboard/User/MyParcel';
import MyProfile from '@/Pages/Dashboard/MyProfile';
import UpdateParcel from '@/Pages/Dashboard/User/UpdateParcel';
import Statistics from '@/Pages/Dashboard/Admin/Statistics';
import AllParcels from '@/Pages/Dashboard/Admin/AllParcels';
import DeliveryMen from '@/Pages/Dashboard/Admin/DeliveryMen';
import AllUsers from '@/Pages/Dashboard/Admin/AllUsers';
import AdminRoute from './AdminRoute';
import DeliveryList from '@/Pages/Dashboard/DeliveryMen/DeliveryList';
import MyReviews from '@/Pages/Dashboard/DeliveryMen/MyReviews';
import DeliveryMenRoute from './DeliveryMenRoute';
import CheckOut from '@/Pages/Dashboard/User/CheckOut';
import PaymentHistory from '@/Pages/Dashboard/User/PaymentHistory';
import ErrorPage from '@/Pages/ErrorPage';

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
         {
            index: true,
            element: <HomePage />,
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
         // Users Pages
         {
            path: 'bookParcel',
            element: (
               <PrivetRoute>
                  <BookParcel />
               </PrivetRoute>
            ),
         },
         {
            path: 'myParcel',
            element: <MyParcel />,
         },
         {
            path: 'profile',
            element: (
               <PrivetRoute>
                  <MyProfile />
               </PrivetRoute>
            ),
         },
         {
            path: 'updateParcel/:id',
            element: (
               <PrivetRoute>
                  <UpdateParcel />
               </PrivetRoute>
            ),
         },
         {
            path: 'checkout/:id',
            element: (
               <PrivetRoute>
                  <CheckOut />
               </PrivetRoute>
            ),
         },
         {
            path: 'paymentHistory',
            element: (
               <PrivetRoute>
                  <PaymentHistory />
               </PrivetRoute>
            ),
         },

         // Admin pages
         {
            path: 'statistics',
            element: (
               <AdminRoute>
                  <Statistics />
               </AdminRoute>
            ),
         },
         {
            path: 'allParcels',
            element: (
               <AdminRoute>
                  <AllParcels />
               </AdminRoute>
            ),
         },
         {
            path: 'deliveryMen',
            element: (
               <AdminRoute>
                  <DeliveryMen />
               </AdminRoute>
            ),
         },
         {
            path: 'allUsers',
            element: (
               <AdminRoute>
                  <AllUsers />
               </AdminRoute>
            ),
         },
         // DeliveryMen Pages
         {
            path: 'myDeliveryList',
            element: (
               <DeliveryMenRoute>
                  <DeliveryList />
               </DeliveryMenRoute>
            ),
         },
         {
            path: 'myReviews',
            element: (
               <DeliveryMenRoute>
                  <MyReviews />
               </DeliveryMenRoute>
            ),
         },
      ],
   },
]);

export default router;
