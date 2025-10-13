import React from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { Avatar, AvatarImage } from '../../ui/avatar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Bell, LayoutDashboard, LogOut } from 'lucide-react';
import navIcon from '../../../assets/icons/express-delivery.png';

import { Button } from '../../ui/button';
import useAuth from '@/hooks/Custom/useAuth';

const NavbarHome = () => {
   const { user, logOut } = useAuth();
   // console.log(user);
   return (
      <nav className="px-1.5 md:px-3 lg:px-4 py-3  bg-teal-600 shadow-md ">
         <div className="flex justify-between items-center ">
            <Link to={'/'} className="flex justify-start items-center gap-1">
               <img className="w-11" src={navIcon} alt="navIcon" />
               <h2 className="text-xl font-bold text-white tracking-wide">
                  Parcel<span className="text-amber-500">Pro</span>
               </h2>
            </Link>

            <ul className="list-none flex justify-end items-center gap-4 md:gap-5 lg:gap-5 text-white">
               <li>
                  <NavLink className="hover:text-gray-200 transition-colors">
                     Home
                  </NavLink>
               </li>
               <li className="relative">
                  <NavLink to={'/order'} className="hover:text-gray-200">
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
                              <div className="w-10 rounded-full">
                                 <img
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
                           className="w-52 "
                           align="end"
                           sideOffset={4}
                        >
                           <DropdownMenuLabel className="text-sm text-gray-600">
                              {user?.email}
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem>
                              <NavLink
                                 to={'/dashboard'}
                                 className={
                                    'flex justify-start items-center gap-1.5'
                                 }
                              >
                                 <LayoutDashboard
                                    strokeWidth={2.25}
                                    className="size-4"
                                 />{' '}
                                 Dashboard
                              </NavLink>
                           </DropdownMenuItem>
                           <Button
                              onClick={() => logOut()}
                              className={'w-full cursor-pointer mt-3'}
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
