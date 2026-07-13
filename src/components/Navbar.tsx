"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
        {/* Outer Floating Container */}
        <div className="mx-auto max-w-7xl">
          <nav className="relative flex items-center justify-between rounded-full border border-white/40 bg-white/50 px-4 py-2.5 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] backdrop-blur-[30px] transition-all duration-300 md:px-8">
            {/* Logo - Kept fully clickable to let users go home */}
            <Link href="/" className="flex items-center gap-2.5 group" onClick={close}>
              <Image src="/logo.svg" alt="Logo" width={30} height={30} />
              <span className="text-[38px] font-semibold tracking-wider text-zinc-900 font-sans group-hover:text-black">
                BIZKIT
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 font-sans font-medium text-black">
              {/* Modules Plain Text - Unclickable, No Dropdown */}
              <span className="text-[16px] text-black py-2 pointer-events-none select-none cursor-default">
                Modules
              </span>

              {/* Disabled Navbar Links */}
              <Link href="/team" className="text-[16px] text-black py-2 pointer-events-none select-none cursor-default">Team</Link>
              <Link href="/tutorials" className="text-[16px] text-black py-2 pointer-events-none select-none cursor-default">Tutorials</Link>
              <Link href="/about" className="text-[16px] text-black py-2 pointer-events-none select-none cursor-default">About Us</Link>
              <Link href="/contact" className="text-[16px] text-black py-2 pointer-events-none select-none cursor-default">Contact Us</Link>
            </div>

            {/* Desktop Action Buttons - Functional */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/signin"
                className=" pointer-events-none select-none cursor-default flex h-11 items-center justify-center rounded-full bg-linear-to-r from-[#4ac2cb] to-[#36aeb9] px-10 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition-all duration-300 hover:brightness-105 hover:shadow-md"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Hamburger - Functional */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 hover:text-black focus:outline-none lg:hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* ── Mobile Full-Screen Slide-Over Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              onClick={close}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full bg-white flex flex-col lg:hidden shadow-2xl"
            >
              {/* Header row inside drawer */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-100">
                <Link href="/" onClick={close} className="flex items-center gap-2">
                  <Image src="/logo.svg" alt="Logo" width={10} height={10} />
                  <span className="text-lg font-bold tracking-wider text-zinc-900">BizKit</span>
                </Link>
                <button
                  onClick={close}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:text-black"
                  aria-label="Close menu"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col px-6 pt-6 gap-1 overflow-y-auto">
                {/* Mobile Modules link - Replaced button dropdown with a flat, unclickable item */}
                <span className="py-4 text-[1.05rem] font-semibold text-black border-b border-zinc-100 pointer-events-none select-none cursor-default">
                  Modules
                </span>

                <Link href="/team" onClick={close} className="py-4 text-[1.05rem] font-semibold text-black border-b border-zinc-100 pointer-events-none select-none cursor-default">
                  Our Team
                </Link>
                <Link href="/about" onClick={close} className="py-4 text-[1.05rem] font-semibold text-black border-b border-zinc-100 pointer-events-none select-none cursor-default">
                  About Us
                </Link>
                <Link href="/contact" onClick={close} className="py-4 text-[1.05rem] font-semibold text-black border-b border-zinc-100 pointer-events-none select-none cursor-default">
                  Contact Us
                </Link>
              </nav>

              {/* Bottom CTA - Functional */}
              <div className="px-6 pb-8 pt-4">
                <Link
                  href="/signin"
                  onClick={close}
                  className="pointer-events-none select-none cursor-default flex h-14 w-full items-center justify-center rounded-full bg-[#2ec4b6] text-base font-bold text-zinc-900 shadow-md hover:brightness-105 transition-all active:scale-95"
                >
                  Get App Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}