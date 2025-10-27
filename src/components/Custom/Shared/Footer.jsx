import React from 'react';
import { NavLink } from 'react-router-dom';
import brandIcon from '../../../assets/Icons/expressDelivery.png';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
   return (
      <div className="bg-slate-800 text-gray-300 py-10 mt-3 font-[‘Lucida Sans’,‘Lucida Grande’,sans-serif]">
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 ">
            {/* Logo & About */}
            <div className="flex flex-col items-center lg:items-start">
               <div className="flex items-center gap-2 mb-3">
                  <img
                     src={brandIcon}
                     alt="ParcelPro Logo"
                     className="w-10 h-10 object-contain"
                  />
                  <h2 className="text-2xl font-bold text-white">
                     Parcel<span className="text-amber-500">Pro</span>
                  </h2>
               </div>
               <p className="text-sm leading-relaxed text-center lg:text-start">
                  Fast, reliable and secure parcel management system. Manage,
                  track and deliver with confidence — all in one platform.
               </p>
            </div>

            {/* Quick Links */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-4 text-center lg:text-start">
                  Quick Links
               </h3>
               <ul className="space-y-2 text-sm text-center lg:text-start">
                  <li>
                     <NavLink to={'/'} className="hover:text-amber-400">
                        Home
                     </NavLink>
                  </li>
                  <li>
                     <NavLink className="hover:text-amber-400">
                        Dashboard
                     </NavLink>
                  </li>
                  <li>
                     <NavLink className="hover:text-amber-400">
                        My Parcels
                     </NavLink>
                  </li>
                  <li>
                     <NavLink className="hover:text-amber-400">
                        Contact Us
                     </NavLink>
                  </li>
               </ul>
            </div>

            {/* Contact Info */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-4 text-center lg:text-start">
                  Contact
               </h3>
               <ul className="space-y-2 text-sm text-center lg:text-start">
                  <li>Email: support@parcelpro.com</li>
                  <li>Phone: +880 1234 567890</li>
                  <li>Location: Dhaka, Bangladesh</li>
               </ul>
            </div>

            {/* Social Links */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-4 text-center lg:text-start">
                  Follow Us
               </h3>
               <div className="flex justify-center lg:justify-start items-center gap-4 ">
                  <a href="#" className="hover:text-amber-400 ">
                     <Facebook />
                  </a>
                  <a href="#" className="hover:text-amber-400">
                     <Twitter />
                  </a>

                  <a href="#" className="hover:text-amber-400">
                     <Instagram />
                  </a>
               </div>
            </div>
         </div>

         {/* Bottom Line */}
         <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} ParcelPro. All rights reserved.
         </div>
      </div>
   );
};

export default Footer;
