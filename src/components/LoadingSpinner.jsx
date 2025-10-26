import { DotSpinner } from 'ldrs/react';
import 'ldrs/react/DotSpinner.css';

// Default values shown

const LoadingSpinner = () => {
   return (
      <div className="flex justify-center items-center min-h-screen">
         <div>
            <DotSpinner size="40" speed="0.9" color="gray" />
         </div>
      </div>
   );
};

export default LoadingSpinner;
