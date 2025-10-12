import { Star } from 'lucide-react';
import React from 'react';

const TopDeliveryMen = () => {
   return (
      <section className="bg-gray-50 py-16">
         <div className="max-w-7xl mx-auto px-4">
            {/* Section Title */}
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-800">
                  Top Delivery Men
               </h2>
               <p className="text-gray-600 mt-2">
                  Our best performing delivery heroes who ensure safe and
                  on-time delivery every day.
               </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
                  <img
                     src="https://i.ibb.co/6m6z3Jv/deliveryman1.jpg"
                     alt="Rahim Uddin"
                     className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                     Rahim Uddin
                  </h3>
                  <p className="text-gray-600 mb-3">
                     Parcels Delivered:{' '}
                     <span className="font-semibold text-blue-600">320</span>
                  </p>
                  <div className="flex justify-center items-center gap-2">
                     <Star className="size-5 text-yellow-400 fill-yellow-400" />
                     <p className="text-gray-700 font-medium">4.9 / 5</p>
                  </div>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
                  <img
                     src="https://i.ibb.co/2FfV4KY/deliveryman2.jpg"
                     alt="Abdul Karim"
                     className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                     Abdul Karim
                  </h3>
                  <p className="text-gray-600 mb-3">
                     Parcels Delivered:{' '}
                     <span className="font-semibold text-blue-600">295</span>
                  </p>
                  <div className="flex justify-center items-center gap-2">
                     <Star className="size-5 text-yellow-400 fill-yellow-400" />
                     <p className="text-gray-700 font-medium">4.8 / 5</p>
                  </div>
               </div>

               {/* Card 3 */}
               <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
                  <img
                     src="https://i.ibb.co/Q8Vc2L2/deliveryman3.jpg"
                     alt="Sabbir Hossain"
                     className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                     Sabbir Hossain
                  </h3>
                  <p className="text-gray-600 mb-3">
                     Parcels Delivered:{' '}
                     <span className="font-semibold text-blue-600">280</span>
                  </p>
                  <div className="flex justify-center items-center gap-2">
                     <Star className="size-5 text-yellow-400 fill-yellow-400" />
                     <p className="text-gray-700 font-medium">4.7 / 5</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default TopDeliveryMen;
