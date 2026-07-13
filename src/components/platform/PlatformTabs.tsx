import React from 'react';

const PlatformTabs = () => {
  return (
    <div className="flex gap-4 h-[400px]">
      <div className="w-16 md:w-20 lg:w-24 bg-[#a7a2cb] rounded-[40px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 hover:-translate-y-2">
        <span className="transform -rotate-90 text-gray-900 font-bold whitespace-nowrap tracking-wider text-xl">Biz Task</span>
      </div>
      <div className="w-16 md:w-20 lg:w-24 bg-[#a5d886] rounded-[40px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 hover:-translate-y-2">
        <span className="transform -rotate-90 text-gray-900 font-bold whitespace-nowrap tracking-wider text-xl">Biz Time</span>
      </div>
      <div className="w-16 md:w-20 lg:w-24 bg-[#f8e578] rounded-[40px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 hover:-translate-y-2">
        <span className="transform -rotate-90 text-gray-900 font-bold whitespace-nowrap tracking-wider text-xl">Biz Meet</span>
      </div>
      <div className="w-16 md:w-20 lg:w-24 bg-[#e8cdba] rounded-[40px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 hover:-translate-y-2">
        <span className="transform -rotate-90 text-gray-900 font-bold whitespace-nowrap tracking-wider text-xl">More</span>
      </div>
    </div>
  );
};

export default PlatformTabs;
