import { Button } from '@/components/ui/button';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
const DashboardLayout = () => {
   return (
      <div className="drawer lg:drawer-open  bg-base-100 max-w-full  mx-auto">
         <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

         <main className="drawer-content flex flex-col">
            {/* Header / Navbar */}
            <header className="w-full bg-base-200 shadow-sm px-4 py-2 flex items-center justify-between">
               {/* Page title */}
               <h1 className="text-lg font-semibold text-slate-700">
                  Dashboard
               </h1>
               {/* Drawer open button for mobile */}
               <label
                  htmlFor="my-drawer-3"
                  className="btn btn-ghost btn-circle lg:hidden"
                  aria-label="open sidebar"
               >
                  <FaBars className="size-5" />
               </label>
            </header>

            {/* Main dashboard area */}
            <section className="flex-1  bg-base-100 ">
               <article className="min-h-[calc(100vh-44px)] border ">
                  <Outlet />
               </article>
            </section>
         </main>

         {/* ---------- Sidebar ---------- */}
         <Sidebar />
      </div>
   );
};

export default DashboardLayout;
