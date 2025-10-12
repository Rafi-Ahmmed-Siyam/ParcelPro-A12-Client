import { Package, ShieldCheck, Truck } from 'lucide-react';
import React from 'react';

const Features = () => {
   return (
      <section className="bg-gray-50 py-16">
         <div className="max-w-7xl mx-auto px-4">
            {/* Section Heading */}
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-800">
                  Our Features
               </h2>
               <p className="text-gray-600 mt-2">
                  We provide reliable, fast, and secure parcel delivery
                  solutions.
               </p>
            </div>

            {/* --- Feature Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Feature 1 */}
               <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                  <ShieldCheck className="size-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Parcel Safety</h3>
                  <p className="text-gray-600">
                     Your parcels are always protected with top-notch security
                     systems.
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                  <Truck className="size-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                     Super Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                     Experience lightning-fast delivery with our optimized
                     system.
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                  <Package className="size-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                     Easy Parcel Management
                  </h3>
                  <p className="text-gray-600">
                     Manage, track, and update all your parcels from one
                     dashboard.
                  </p>
               </div>
            </div>

            {/* --- Statistics Section --- */}
            <div className="mt-16 bg-blue-600 text-white p-10 rounded-2xl">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                     <h2 className="text-4xl font-bold">10,245</h2>
                     <p className="mt-2 text-blue-100">Parcels Booked</p>
                  </div>
                  <div>
                     <h2 className="text-4xl font-bold">9,870</h2>
                     <p className="mt-2 text-blue-100">Parcels Delivered</p>
                  </div>
                  <div>
                     <h2 className="text-4xl font-bold">1,530</h2>
                     <p className="mt-2 text-blue-100">Registered Users</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Features;
