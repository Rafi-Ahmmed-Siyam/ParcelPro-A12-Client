import React from 'react';
import navIcon from '../../assets/Icons/express-delivery.png';
import { Link, NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { LogOut } from 'lucide-react';
import useAuth from '@/hooks/Custom/useAuth';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
   const { user, logOut } = useAuth();
   return (
      <aside className="drawer-side">
         <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
         ></label>

         <nav className="menu bg-base-200 text-base-content min-h-full w-72 flex flex-col justify-between p-4">
            {/* ---------- Sidebar Header / Logo ---------- */}
            <Link to={'/'} className="flex justify-start items-center gap-1">
               <img className="w-11" src={navIcon} alt="navIcon" />
               <h2 className="text-xl font-bold text-blue-400 tracking-wide">
                  Parcel<span className="text-amber-500">Pro</span>
               </h2>
            </Link>

            {/* ---------- Middle Navigation Links ---------- */}
            <ul className="mt-6 space-y-1 flex-1">
               <li>
                  <a className="hover:bg-blue-100 rounded-lg block px-2.5 py-1.5">
                     Home
                  </a>
               </li>
               <li>
                  <a className="hover:bg-blue-100 rounded-lg block px-2.5 py-1.5">
                     My Parcels
                  </a>
               </li>
               <li>
                  <a className="hover:bg-blue-100 rounded-lg block px-2.5 py-1.5">
                     Add Parcel
                  </a>
               </li>
               <li>
                  <a className="hover:bg-blue-100 rounded-lg block px-2.5 py-1.5">
                     Settings
                  </a>
               </li>
            </ul>

            {/* ---------- Bottom Section ---------- */}
            <div className="border-t pt-4 space-y-1">
               <NavLink className="hover:bg-blue-100 rounded-lg  px-2.5 py-1.5 flex justify-start items-center gap-1">
                  <CgProfile className="size-5" /> <span>My Profile</span>
               </NavLink>
               {/* ---------- */}
               <Button
                  onClick={() => logOut()}
                  variant="ghost"
                  className="w-full cursor-pointer mt-1 justify-start hover:bg-blue-100 rounded-lg hover:text-red-600 text-red-500"
               >
                  <LogOut className="size-5" /> Logout
               </Button>
            </div>
         </nav>
      </aside>
   );
};

export default Sidebar;
