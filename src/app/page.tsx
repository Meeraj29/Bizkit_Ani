import React from 'react'
import Hero from '../components/hero/Hero';
import PlatformFeatures from '../components/platform/PlatformFeatures';
import LoadingScreen from '../components/LoadingScreen';

const Page = () => {
  return (
    <main className="min-h-screen bg-[#f4fbfa]">
      <LoadingScreen />
      <Hero />
      <PlatformFeatures />
    </main>
  );
};  

export default Page;