"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const GridMockups = () => {
  // Using the 4 available images
  const images = [
    "/Hero 1.png",
    "/Hero2.png",
    "/Hero3.png",
    "/Hero4.png",
  ];

  // Duplicate the array to create a seamless infinite loop
  const doubleImages = [...images, ...images];

  return (
    <section className="relative h-[800px] w-full bg-[#f6fcfb] overflow-hidden flex items-center justify-center py-10">
      {/* Background Decorative Aura Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* 3-Column Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto h-full flex justify-center gap-6 px-4">
        
        {/* Column 1: Bottom to Top */}
        <div className="w-1/3 max-w-[280px] h-full overflow-hidden relative rounded-[2.5rem]">
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {doubleImages.map((src, idx) => (
              <div key={idx} className="relative w-full aspect-9/19.5 rounded-[2.5rem] shadow-xl border-4 border-gray-900 overflow-hidden bg-white">
                <Image src={src} alt={`Mockup ${idx}`} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 2: Top to Bottom */}
        <div className="w-1/3 max-w-[280px] h-full overflow-hidden relative rounded-[2.5rem] mt-10">
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {doubleImages.map((src, idx) => (
              <div key={idx} className="relative w-full aspect-9/19.5 rounded-[2.5rem] shadow-xl border-4 border-gray-900 overflow-hidden bg-white">
                <Image src={src} alt={`Mockup ${idx}`} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 3: Bottom to Top */}
        <div className="w-1/3 max-w-[280px] h-full overflow-hidden relative rounded-[2.5rem] hidden md:block">
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 22,
            }}
          >
            {doubleImages.map((src, idx) => (
              <div key={idx} className="relative w-full aspect-9/19.5 rounded-[2.5rem] shadow-xl border-4 border-gray-900 overflow-hidden bg-white">
                <Image src={src} alt={`Mockup ${idx}`} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Fade Overlays to blend edges */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#f6fcfb] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#f6fcfb] to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default GridMockups;