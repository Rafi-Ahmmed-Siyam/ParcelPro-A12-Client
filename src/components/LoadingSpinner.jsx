import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';

// Default values shown

const LoadingSpinner = () => {
   return (
      <div className="flex justify-center items-center min-h-screen">
         <div>
            <Spiral size="40" speed="0.8" color="green" />;
         </div>
      </div>
   );
};

export default LoadingSpinner;
