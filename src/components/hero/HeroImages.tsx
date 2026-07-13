"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroImages = () => {
  const images = [
    "/Hero 1.png",
    "/Hero2.png",
    "/Hero3.png",
    "/Hero4.png",
    "/Hero5.png",
    "/Hero6.png"
  ];

  // Duplicate for seamless infinite scrolling
  const doubleImages = [...images, ...images];

  return (
    // Mobile: teal background pill container; Desktop: transparent with blob
    <div className="relative w-full lg:max-w-[600px] overflow-hidden flex items-center justify-center">
      {/* Mobile teal background */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-[#cef3ef] lg:hidden" />

      {/* Desktop decorative blob */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-200/40 rounded-full blur-[80px] z-0 pointer-events-none" />

      {/* Phone grid - fixed height containers */}
      <div className="relative z-10 w-full flex justify-center gap-3 px-4 py-8 lg:py-0 h-[340px] sm:h-[400px] lg:h-[550px]">

        {/* Column 1: scrolls up */}
        <div className="w-1/3 h-full overflow-hidden relative">
          <motion.div
            className="flex flex-col gap-3"
            animate={{ y: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          >
            {doubleImages.map((src, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-9/19.5 rounded-2xl lg:rounded-3xl shadow-lg border-[3px] border-gray-900 overflow-hidden bg-white shrink-0"
              >
                <Image src={src} alt={`Mockup ${idx}`} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 2: scrolls down, offset */}
        <div className="w-1/3 h-full overflow-hidden relative mt-6">
          <motion.div
            className="flex flex-col gap-3"
            animate={{ y: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
          >
            {doubleImages.map((src, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-9/19.5 rounded-2xl lg:rounded-3xl shadow-lg border-[3px] border-gray-900 overflow-hidden bg-white shrink-0"
              >
                <Image src={src} alt={`Mockup ${idx}`} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 3: scrolls up — visible on ALL screens now (including mobile) */}
        <div className="w-1/3 h-full overflow-hidden relative">
          <motion.div
            className="flex flex-col gap-3"
            animate={{ y: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 11 }}
          >
            {doubleImages.map((src, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-9/19.5 rounded-2xl lg:rounded-3xl shadow-lg border-[3px] border-gray-900 overflow-hidden bg-white shrink-0"
              >
                <Image src={src} alt={`Mockup ${idx}`} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Top & bottom fog overlays */}
      <div className="absolute top-0 left-0 w-full h-16 lg:h-40 bg-linear-to-b from-white lg:from-[#f4fbfa] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-16 lg:h-40 bg-linear-to-t from-white lg:from-[#f4fbfa] to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default HeroImages;