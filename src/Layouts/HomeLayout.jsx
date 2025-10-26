import Footer from '@/components/Custom/Shared/Footer';
import NavbarHome from '@/components/Custom/Shared/NavbarHome';
import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
   return (
      <>
         <header className="sticky top-0 z-50">
            <NavbarHome />
         </header>

         <main className="min-h-[calc(100vh-385px)] ">
            <Outlet />
         </main>

         <footer>
            <Footer />
         </footer>
      </>
   );
};

export default HomeLayout;
