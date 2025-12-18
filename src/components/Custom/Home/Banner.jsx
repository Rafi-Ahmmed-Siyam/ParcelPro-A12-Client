import { AspectRatio } from '@/components/ui/aspect-ratio';
import React from 'react';

const Banner = () => {
   return (
      <section
         className="relative w-full h-[45vh] md:h-[50vh] lg:h-[75vh] bg-cover bg-center flex items-center justify-center rounded-lg"
         style={{
            backgroundImage:
               "url('https://i.ibb.co.com/4gXTWSbK/pexels-tima-miroshnichenko-6169002.jpg')",
         }}
      >
         {/* Overlay for darkening the image */}
         <div className="absolute inset-0 bg-black/60 rounded-lg"></div>

         {/* Content */}
         <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-8">
               Find Your Perfect Parcel Solution
            </h1>

            {/* Search Bar */}
            <div className="flex justify-center ">
               <input
                  type="text"
                  placeholder="Search parcels, locations..."
                  className="w-full bg-white max-w-lg px-4 py-3 rounded-l-full focus:outline-none text-black border placeholder:text-black"
               />
               <button className="bg-amber-500 hover:bg-amber-600 px-6 rounded-r-full font-semibold cursor-pointer">
                  Search
               </button>
            </div>
         </div>
      </section>
   );
};

export default Banner;
