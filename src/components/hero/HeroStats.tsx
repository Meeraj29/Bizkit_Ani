"use client";

import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "./animations";

const stats = [
  { value: "25K+", label: "Active users" },
  { value: "1.5K+", label: "Business Empowered" },
  { value: "4.8", label: "Rating" },
];

const HeroStats = () => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap items-center gap-8 md:gap-16 mt-12 bg-white/10 backdrop-blur-[96px] rounded-2xl p-6  w-max z-10"
    >
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-3xl md:text-[32px] font-bold text-gray-900">
            {stat.value}
          </span>
          <span className="text-sm md:text-[14px] text-gray-600 font-medium mt-1">
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default HeroStats;
