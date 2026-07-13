"use client";

import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "./animations";
import HeroText from "./HeroText";
import HeroStats from "./HeroStats";
import HeroSocials from "./HeroSocials";
import HeroImages from "./HeroImages";

const Hero = () => {
  return (
    <section className="bizkit-hero-bg relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 lg:pt-40 lg:pb-20">


      <div className="w-full px-4 md:px-8">
        <div className="mx-auto max-w-7xl px-0 md:px-4 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
          >
            {/* ── Left Column ── */}
            <div className="flex flex-col w-full lg:w-[50%] xl:w-1/2 items-center lg:items-start">
              <HeroText />

              {/* Stats & Socials visible on desktop only */}
              <div className="hidden lg:block w-full">
                <HeroStats />
                <HeroSocials />
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="w-full lg:w-[50%] xl:w-1/2 flex flex-col items-center justify-center lg:justify-end gap-6">
              <HeroImages />

              {/* Mobile-only CTA buttons — rendered BELOW the phone grid */}
              <div className="flex items-center justify-center gap-4 w-full max-w-[340px] lg:hidden">
                <button className="flex-1 bg-[#2ec4b6] hover:bg-[#25a99c] text-gray-900 font-semibold py-4 rounded-full transition-colors text-sm shadow-sm">
                  Get Started
                </button>
                <button className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-full transition-colors text-sm shadow-sm">
                  Download App
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;