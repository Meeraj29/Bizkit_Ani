"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { itemVariants } from "./animations";

const HeroText = () => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 w-full z-10"
    >
      {/* Mobile: centered bold title */}
      <h1 className="font-bold text-gray-900 leading-tight tracking-tight text-center lg:text-left">
        {/* Mobile title */}
        <span className="block lg:hidden text-[2rem] sm:text-4xl leading-snug">
          All Your Business Tools.<br />One Smart App.
        </span>

        {/* Desktop title */}
        <span className="hidden lg:block text-[40px] md:text-[40px]">
          Many Business Tools <br />
          <span className="flex items-center gap-4 mt-2">
            <ArrowRight
              className="w-10 h-10 md:w-12 md:h-12 text-gray-900 shrink-0"
              strokeWidth={1.5}
            />
            <span className="relative inline-block">
              One Smart App.
              <div
                  className="absolute -bottom-2 left-0 right-0 h-[6px]"
                  style={{ background: "linear-gradient(90deg, #1B5757 0%, #3BBDBD 41%, rgba(43, 138, 138, 0) 85%)" }}
                />
            </span>
          </span>
        </span>
      </h1>

      <p className="text-black text-sm font-poppins sm:text-[16px] lg:text-[18px] max-w-sm sm:max-w-md lg:max-w-lg leading-relaxed text-center lg:text-left px-1 lg:px-0">
        Simplify how you manage your business with Bizkit — a single platform
        that helps you connect, collaborate, and stay productive with smart
        modules like Biz Card, Biz Task, Biz Meet, and Biz Time.
      </p>

      {/* Desktop-only buttons (mobile buttons live below HeroImages in Hero.tsx) */}
      <div className="hidden lg:flex flex-wrap items-center gap-4 mt-6">
        <button className="bg-[#2ec4b6] hover:bg-teal-600 text-black font-medium py-3.5 px-10 rounded-full transition-colors shadow-md">
          Get Started
        </button>
        <button className="bg-black hover:bg-gray-800 text-white font-medium py-3.5 px-10 rounded-full transition-colors shadow-md">
          Download App
        </button>
      </div>
    </motion.div>
  );
};

export default HeroText;