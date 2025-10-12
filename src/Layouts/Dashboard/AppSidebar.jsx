import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar';
import navIcon from '../../../src/assets/Icons/express-delivery.png';
// Menu items.
const items = [
   {
      title: 'Home',
      url: '#',
      icon: Home,
   },
   {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
   },
   {
      title: 'Calendar',
      url: '#',
      icon: Calendar,
   },
   {
      title: 'Search',
      url: '#',
      icon: Search,
   },
   {
      title: 'Settings',
      url: '#',
      icon: Settings,
   },
];
const AppSidebar = () => {
   return (
      <div className="max-w-7xl mx-auto border-2 border-red-400">
         <Sidebar>
            <SidebarContent>
               <SidebarGroup>
                  <SidebarGroupLabel>
                     <div className="flex justify-start items-center gap-1">
                        <img className="w-11" src={navIcon} alt="navIcon" />
                        <h2 className="text-xl font-bold text-blue-500 tracking-wide">
                           Parcel<span className="text-amber-500">Pro</span>
                        </h2>
                     </div>
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                     <SidebarMenu>
                        {items.map((item) => (
                           <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton asChild>
                                 <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                 </a>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        ))}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            </SidebarContent>
         </Sidebar>
      </div>
   );
};

export default AppSidebar;
