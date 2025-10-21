import React from 'react';
import navIcon from '../../assets/Icons/express-delivery.png';
import { Link, NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import {
   Bike,
   Boxes,
   ChartNoAxesCombined,
   ClipboardList,
   LogOut,
   NotebookPen,
   Package,
} from 'lucide-react';
import useAuth from '@/hooks/Custom/useAuth';
import { Button } from '@/components/ui/button';
import { TbUsersGroup } from 'react-icons/tb';
import useRole from '@/hooks/Custom/useRole';
import { MdOutlineReviews } from 'react-icons/md';

const Sidebar = () => {
   const { user, logOut } = useAuth();
   const { role } = useRole();
   const getActiveClass = ({ isActive }) =>
      `rounded-sm font-medium text-base px-2.5 py-1.5 flex items-center gap-1 mb-1.5 transition-colors duration-200 
      ${
         isActive
            ? 'bg-blue-400 text-white '
            : 'hover:bg-blue-100 text-slate-700'
      }`;

   const adminLinks = (
      <>
         <li>
            <NavLink to={'/dashboard/statistics'} className={getActiveClass}>
               <ChartNoAxesCombined className="size-5" />{' '}
               <span>Statistics</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'/dashboard/allParcels'} className={getActiveClass}>
               <Boxes className="size-5" /> <span>All Parcels</span>
            </NavLink>
         </li>

         <li>
            <NavLink to={'/dashboard/deliveryMen'} className={getActiveClass}>
               <Bike className="size-5" /> <span>All Delivery Men</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'/dashboard/allUsers'} className={getActiveClass}>
               <TbUsersGroup className="size-6" /> <span>All Users</span>
            </NavLink>
         </li>
      </>
   );

   const userLinks = (
      <>
         <li>
            <NavLink to={'/dashboard/myParcel'} className={getActiveClass}>
               <Package className="size-5" /> <span>My Parcel</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'/dashboard/bookParcel'} className={getActiveClass}>
               <NotebookPen className="size-5" /> <span>Book a Parcel</span>
            </NavLink>
         </li>
      </>
   );
   const DeliveryMenLinks = (
      <>
         <li>
            <NavLink
               to={'/dashboard/myDeliveryList'}
               className={getActiveClass}
            >
               <ClipboardList className="size-5" />{' '}
               <span>My Delivery List</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'/dashboard/myReviews'} className={getActiveClass}>
               <MdOutlineReviews className="size-5" /> <span>My Reviews</span>
            </NavLink>
         </li>
      </>
   );

   return (
      <aside className="drawer-side">
         <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
         ></label>

         <nav className="menu bg-base-200 text-base-content min-h-full w-72 flex flex-col justify-between p-4">
            {/* ---------- Sidebar Header / Logo ---------- */}
            <Link
               to={'/'}
               className="flex justify-center items-center gap-1 border rounded-sm shadow-sm"
            >
               <img className="w-11" src={navIcon} alt="navIcon" />
               <h2 className="text-xl font-bold text-blue-400 tracking-wide">
                  Parcel<span className="text-amber-500">Pro</span>
               </h2>
            </Link>

            {/* User Dashboard Links */}
            <ul className="mt-10 space-y-1.5 flex-1">
               {role.role === 'User' && userLinks}
               {role.role === 'Admin' && adminLinks}
               {role.role === 'DeliveryMen' && DeliveryMenLinks}
            </ul>

            {/* ---------- Bottom Section ---------- */}
            <div className="border-t pt-4 space-y-1">
               <NavLink to={'/dashboard/profile'} className={getActiveClass}>
                  <CgProfile className="size-5" /> <span>My Profile</span>
               </NavLink>
               {/* ---------- */}
               <Button
                  onClick={() => logOut()}
                  variant="ghost"
                  className="w-full cursor-pointer mt-1 justify-start hover:bg-blue-100 text-base font-normal hover:text-red-600 text-red-500"
               >
                  <LogOut className="size-5" /> Logout
               </Button>
            </div>
         </nav>
      </aside>
   );
};

export default Sidebar;
