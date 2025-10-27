import React from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Bell, LogOut } from 'lucide-react';
import navIcon from '../../../assets/Icons/expressDelivery.png';
import { Button } from '../../ui/button';
import useAuth from '@/hooks/Custom/useAuth';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import useRole from '@/hooks/Custom/useRole';

const NavbarHome = () => {
   const { user, logOut } = useAuth();
   const { role } = useRole();

   const getActiveClass = (isActive) =>
      isActive
         ? 'text-amber-300 text-base font-semibold'
         : 'text-white text-base font-normal';

   const userLink = (
      <>
         <DropdownMenuItem>
            <NavLink
               to={'/dashboard/myParcel'}
               className={
                  'flex justify-start items-center gap-1.5  font-medium'
               }
            >
               <MdOutlineSpaceDashboard className="size-5 text-black " />
               Dashboard
            </NavLink>
         </DropdownMenuItem>
      </>
   );

   const adminLink = (
      <>
         <DropdownMenuItem>
            <NavLink
               to={'/dashboard/statistics'}
               className={
                  'flex justify-start items-center gap-1.5  font-medium'
               }
            >
               <MdOutlineSpaceDashboard className="size-5 text-black " />
               Dashboard
            </NavLink>
         </DropdownMenuItem>
      </>
   );
   const DeliveryMenLink = (
      <>
         <DropdownMenuItem>
            <NavLink
               to={'/dashboard/myDeliveryList'}
               className={
                  'flex justify-start items-center gap-1.5  font-medium'
               }
            >
               <MdOutlineSpaceDashboard className="size-5 text-black " />
               Dashboard
            </NavLink>
         </DropdownMenuItem>
      </>
   );
   return (
      <nav className="px-1.5 md:px-3 lg:px-4 py-3  bg-teal-600 dark:bg-slate-900 shadow-md ">
         <div className="flex justify-between items-center ">
            <Link to={'/'} className="flex justify-start items-center gap-1">
               <img className="w-11" src={navIcon} alt="navIcon" />
               <h2 className="text-xl font-bold text-white tracking-wide">
                  Parcel<span className="text-amber-500">Pro</span>
               </h2>
            </Link>

            <ul className="list-none flex justify-end items-center gap-4 md:gap-5 lg:gap-5 text-white">
               <li>
                  <NavLink to={'/'} className={getActiveClass}>
                     Home
                  </NavLink>
               </li>

               <li className="relative">
                  <NavLink className="hover:text-gray-200">
                     <Bell className="w-5 h-5" />
                     <span className="absolute -top-1 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-600"></span>
                  </NavLink>
               </li>
               {user ? (
                  <li>
                     {/* Dropdown */}
                     <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                           <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-ghost btn-circle avatar"
                           >
                              <div className="w-12 rounded-full border-2 ">
                                 <img
                                    referrerPolicy="no-referrer"
                                    alt="user image"
                                    src={
                                       user?.photoURL ||
                                       `https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp`
                                    }
                                 />
                              </div>
                           </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           className="w-56 "
                           align="end"
                           sideOffset={4}
                        >
                           <DropdownMenuLabel className="text-sm text-gray-600">
                              {user?.email}
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           {role.role === 'Admin' && adminLink}
                           {role.role === 'User' && userLink}
                           {role.role === 'DeliveryMen' && DeliveryMenLink}

                           <Button
                              onClick={() => logOut()}
                              className={
                                 'w-full cursor-pointer mt-3 bg-red-500 hover:bg-red-400'
                              }
                           >
                              <LogOut className="size-4" /> Logout
                           </Button>
                           {/* <DropdownMenuItem>Logout</DropdownMenuItem> */}
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </li>
               ) : (
                  <li>
                     <NavLink
                        to={'/login'}
                        className="hover:text-gray-200 transition-colors"
                     >
                        <Button
                           className={
                              'cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition duration-300"'
                           }
                        >
                           Login
                        </Button>
                     </NavLink>
                  </li>
               )}
            </ul>
         </div>
      </nav>
   );
};

export default NavbarHome;
