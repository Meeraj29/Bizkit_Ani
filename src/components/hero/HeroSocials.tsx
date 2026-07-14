"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { itemVariants } from "./animations";

const socials = [
  { href: "#", src: "/fac.svg", label: "Facebook"  },
  { href: "#", src: "/linkedin.svg", label: "LinkedIn"  },
  { href: "#", src: "/insta.svg", label: "Instagram" },
  { href: "#", src: "/logoX.svg", label: "X" },
];

const HeroSocials = () => {
  return (
    <motion.div variants={itemVariants} className="mt-8 z-10 flex">
      <div className="inline-flex items-center gap-3 rounded-full bg-[#f6f6f6]/20 p-1.5">
        {socials.map(({ href, src, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={` pointer-events-none select-none cursor-default w-9 h-9 rounded-full flex items-center justify-center hover:brightness-95 transition-all duration-200`}
          >
            <Image src={src} alt={label} width={20} height={20} />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroSocials;
