"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 'bizcard',
    title: 'Biz Card',
    type: 'product',
    desc: "Bizcard – a digital business card app, that's loaded with many useful, innovative and first of its kind features. So no more of carrying a boring, static and outdated paper business card.",
    bg: 'linear-gradient(180deg, #3BBCBC 0%, #5DC3C3 100%)',
    image: '/Bizcard Tab.png'
  },
  {
    id: 'biztask',
    title: 'Biz Task',
    type: 'product',
    desc: "Biztask – a task management app that ensures that you never forget a task and ensure increased efficiency, accountability and transparency. In your personal and official space.",
    bg: 'linear-gradient(180deg, #7E7F9A 0%, #B0B1E5 100%)',
    image: '/BizTask.png'
  },
  {
    id: 'biztime',
    title: 'Biz Time',
    type: 'product',
    desc: "The easy to use, configurable attendance app that employees would love to login their work hours and generate reports like never before.",
    bg: 'linear-gradient(180deg, #DBFFD0 0%, #61A84C 100%)',
    image: '/Biztime.png'
  },
  {
    id: 'bizmeet',
    title: 'Biz Meet',
    type: 'product',
    desc: "Bizmeet – the first of its kind meeting management app managing various aspects of before, during and after a meeting, that will give a new dimension to your everyday meetings.",
    bg: 'linear-gradient(180deg, #F8FA90 0%, #BBBC77 100%)',
    image: '/Bizmeet.png'
  },
  {
    id: 'bizmore',
    title: 'More',
    type: 'directory',
    desc: "",
    bg: 'linear-gradient(180deg, #F9EBE0 0%, #D2B198 100%)',
    image: '/more.png'
  }
];

const TRANSITION_MS = 600;
const WHEEL_THRESHOLD = 30;
const SWIPE_THRESHOLD = 40;

const PlatformContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isTransitioning = useRef(false);
  const currentIndexRef = useRef(0);
  const cooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelAccumRef = useRef(0);
  const wheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    currentIndexRef.current = activeIndex;
  }, [activeIndex]);

  const unlockTransition = () => {
    isTransitioning.current = false;
  };

  const lockTransition = () => {
    isTransitioning.current = true;
    if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);
    cooldownTimeoutRef.current = setTimeout(unlockTransition, TRANSITION_MS);
  };

  const goTo = (direction: 1 | -1) => {
    if (isTransitioning.current) return;
    const currentIdx = currentIndexRef.current;
    const nextIdx = currentIdx + direction;
    if (nextIdx < 0 || nextIdx > slides.length - 1) return;

    lockTransition();
    setActiveIndex(nextIdx);
  };

  const goToIndex = (i: number) => {
    if (isTransitioning.current || i === currentIndexRef.current) return;
    lockTransition();
    setActiveIndex(i);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0.5;
      },
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let isScrollBlocked = false;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const isFillsScreen = Math.abs(rect.top) <= 3;

      if (!isFillsScreen) {
        // If the section is close to filling the screen, smoothly snap it to the top
        if (rect.top > 0 && rect.top < 150 && e.deltaY > 0) {
          e.preventDefault();
          if (!isScrollBlocked) {
            isScrollBlocked = true;
            container.scrollIntoView({ behavior: 'smooth' });
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              isScrollBlocked = false;
            }, 800);
          }
        }
        return;
      }

      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      const isGoingDown = e.deltaY > 0;
      const isGoingUp = e.deltaY < 0;
      const currentIdx = currentIndexRef.current;

      const canScrollDown = isGoingDown && currentIdx < slides.length - 1;
      const canScrollUp = isGoingUp && currentIdx > 0;

      if (!canScrollDown && !canScrollUp) {
        return;
      }

      e.preventDefault();

      if (isScrollBlocked) {
        return;
      }

      if (Math.abs(e.deltaY) > 15) {
        isScrollBlocked = true;
        goTo(e.deltaY > 0 ? 1 : -1);

        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrollBlocked = false;
        }, 1000); // 1 second cooldown to allow user to review the tab before scrolling again
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;

      const rect = container.getBoundingClientRect();
      const isFillsScreen = Math.abs(rect.top) <= 3;
      if (!isFillsScreen) {
        return;
      }

      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      const currentIdx = currentIndexRef.current;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      const isGoingDown = deltaY > 0;
      const isGoingUp = deltaY < 0;

      const canScrollDown = isGoingDown && currentIdx < slides.length - 1;
      const canScrollUp = isGoingUp && currentIdx > 0;

      if (!canScrollDown && !canScrollUp) return;

      e.preventDefault();

      if (isScrollBlocked) return;

      if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
        isScrollBlocked = true;
        goTo(deltaY > 0 ? 1 : -1);
        touchStartYRef.current = e.touches[0].clientY;

        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrollBlocked = false;
        }, 1000);
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const activeSlide = slides[activeIndex];
  const isDirectory = activeSlide.type === 'directory';

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center pt-12 pb-[240px] md:py-20 px-4 md:px-8 select-none transition-colors duration-500 overflow-hidden relative"
      style={{ background: activeSlide.bg }}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8 h-auto md:h-[600px] relative">

        {/* Left Vertical Pills Stack — desktop only */}
        <div className="hidden md:flex flex-row gap-3 justify-center h-full shrink-0 z-20 items-center">
          <AnimatePresence mode="popLayout">
            {slides.slice(0, activeIndex).map((slide, index) => (
              <motion.button
                key={slide.id}
                initial={{ opacity: 0, x: -30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => goToIndex(index)}
                className="w-[80px] h-[400px] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow border border-white/20 select-none relative overflow-hidden"
                style={{ background: slide.bg }}
              >
                <span className="text-zinc-900 font-extrabold text-[24px] font-poppins tracking-wider whitespace-nowrap -rotate-90 block">
                  {slide.title}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Center Content */}
        <div className="flex-1 h-full flex items-center justify-center px-4 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-0 lg:gap-8"
            >
              {/* Phone image */}
              <div className="w-full lg:w-[48%] h-[180px] sm:h-[220px] lg:h-full flex items-center justify-center shrink-0">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain select-none filter drop-shadow-2xl"
                  draggable={false}
                />
              </div>

              {/* Text content — centered on mobile, left-aligned on desktop */}
              <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start text-center lg:text-left justify-center text-zinc-900">
                {!isDirectory ? (
                  <>
                    <h3 className="text-[32px] sm:text-[38px] lg:text-[32px] font-semibold mb-3 lg:mb-6 tracking-tight text-zinc-950 ">
                      {activeSlide.title}
                    </h3>
                    <p className="text-sm lg:text-[18px] leading-relaxed font-semibold mb-5 lg:mb-8 text-zinc-900 max-w-xs sm:max-w-sm lg:max-w-lg">
                      {activeSlide.desc}
                    </p>
                    <button className=" pointer-events-none select-none cursor-default font-bold py-2.5 lg:py-3 px-8 lg:px-10 rounded-full shadow-md bg-white hover:bg-zinc-50 text-zinc-950 text-sm lg:text-base transition-all duration-200 active:scale-95">
                      Read more
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center lg:items-start">
                    <ul className="space-y-2 lg:space-y-3.5 font-sans font-semibold text-zinc-950 text-xs lg:text-[14px] leading-relaxed max-w-xl text-left">
                      <li>✦ <span className="font-bold">Bizqueue</span> – the virtual queue management app</li>
                      <li>✦ <span className="font-bold">BizBill</span> – an app that manages your the everyday bills of all kinds</li>
                      <li>✦ <span className="font-bold">Bizhealth</span> – app that interacts with your healthcare stakeholders</li>
                      <li>✦ <span className="font-bold">Bizgifts</span> – remind, track and manage your gifting thoughts and concerns</li>
                      <li>✦ <span className="font-bold">Biztrack</span> – tracking your movement by just turning on a switch</li>
                      <li>✦ <span className="font-bold">Bizpark</span> – get ready to see the innovation an app can bring to car parking</li>
                      <li>✦ <span className="font-bold">Bizhelper</span> – a digital concierge that would be required at so many places</li>
                      <li className="font-bold text-sm lg:text-[15px] pt-1">✦ And many many more....</li>
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Vertical Pills Stack — desktop only */}
        <div className="hidden md:flex flex-row gap-3 justify-center h-full shrink-0 z-20 items-center">
          <AnimatePresence mode="popLayout">
            {slides.slice(activeIndex + 1).map((slide, index) => {
              const originalIndex = activeIndex + 1 + index;
              return (
                <motion.button
                  key={slide.id}
                  initial={{ opacity: 0, x: 30, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => goToIndex(originalIndex)}
                  className="w-[80px] h-[400px] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow border border-white/20 select-none relative overflow-hidden"
                  style={{ background: slide.bg }}
                >
                  <span className="text-zinc-900 font-extrabold text-[24px] font-poppins tracking-wider whitespace-nowrap -rotate-90 block">
                    {slide.title}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile-only: colored pill tab bar at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 md:hidden flex gap-3 justify-center z-20 px-4 items-end">
        <AnimatePresence mode="popLayout">
          {slides.map((slide, i) => {
            if (i === activeIndex) return null;
            return (
              <motion.button
                key={slide.id}
                layout
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={() => goToIndex(i)}
                whileTap={{ scale: 0.95, originY: 1 }}
                className="flex-1 max-w-[80px] h-[200px] rounded-t-full flex items-center justify-center cursor-pointer shadow-lg border-t border-x border-white/20 origin-bottom"
                style={{ background: slide.bg }}
              >
                <span className="text-black font-bold text-[24px] sm:text-[24px] tracking-wide whitespace-nowrap -rotate-90 block leading-none font-poppins">
                  {slide.title}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlatformContent;