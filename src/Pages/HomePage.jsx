import Banner from '@/components/Custom/Home/Banner';
import Features from '@/components/Custom/Home/Features';
import TopDeliveryMen from '@/components/Custom/Home/TopDeliveryMen';
import React from 'react';

const HomePage = () => {
   return (
      <div className="bg-[#F0FDFA]">
         <Banner />
         <Features />
         <TopDeliveryMen />
      </div>
   );
};

export default HomePage;
