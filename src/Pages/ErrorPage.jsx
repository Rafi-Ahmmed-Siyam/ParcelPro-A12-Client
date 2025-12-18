import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
         <div className="max-w-md">
            <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6 animate-bounce" />

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
               Oops! Something went wrong
            </h1>

            <p className="text-gray-600 mb-8">
               The page you’re looking for doesn’t exist or an unexpected error
               occurred.
            </p>

            <button
               onClick={() => navigate('/')}
               className="bg-green-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-300 transition"
            >
               ⬅ Go Back Home
            </button>
         </div>

         <p className="mt-12 text-sm text-gray-400">
            © {new Date().getFullYear()} ParcelPro. All rights reserved.
         </p>
      </div>
   );
};

export default ErrorPage;
