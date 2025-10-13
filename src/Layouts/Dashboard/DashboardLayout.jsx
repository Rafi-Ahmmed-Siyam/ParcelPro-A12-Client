import { Button } from '@/components/ui/button';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
const DashboardLayout = () => {
   return (
      <div className="drawer lg:drawer-open  bg-base-100 max-w-full lg:container mx-auto">
         {/* Drawer toggle (for mobile) */}
         <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

         {/* ---------- Main Content ---------- */}
         <main className="drawer-content flex flex-col">
            {/* Header / Navbar */}
            <header className="w-full bg-base-200 shadow-sm px-4 py-2 flex items-center justify-between">
               {/* Drawer open button for mobile */}
               <label
                  htmlFor="my-drawer-3"
                  className="btn btn-ghost btn-circle lg:hidden"
                  aria-label="open sidebar"
               >
                  <FaBars className="size-5" />
               </label>

               {/* Page title */}
               <h1 className="text-lg font-semibold text-slate-700">
                  Dashboard
               </h1>
            </header>

            {/* Main dashboard area */}
            <section className="flex-1 p-6 bg-base-100 ">
               <article>
                  <h2 className="text-2xl font-bold mb-4">
                     Welcome to Dashboard
                  </h2>
                  <p className="text-slate-600">
                     Here you can manage your parcels, view stats, and more.
                  </p>
               </article>
            </section>
         </main>

         {/* ---------- Sidebar ---------- */}
         <Sidebar />
      </div>
   );
};

export default DashboardLayout;
