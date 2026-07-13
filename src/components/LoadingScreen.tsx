"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 500);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Orbit radius configuration matching your spec
  const RADIUS = 170; 

  // Generate 72 steps around the circle for a higher resolution path mapping
  const STEPS_COUNT = 72;

  // 12 message bubbles distributed around the circle
  const orbitBubbles = Array.from({ length: 12 }).map((_, i) => {
    const startAngle = (i * 2 * Math.PI) / 12; // Base angle in radians
    return { id: i, startAngle };
  });

  /**
   * Generates keyframes for a single message bubble path.
   * Modifies the step progress slightly when approaching a phone position 
   * to create a temporary slowdown/waiting effect.
   */
  const generatePathKeyframes = (startAngle: number, axis: 'x' | 'y') => {
    return Array.from({ length: STEPS_COUNT + 1 }).map((_, step) => {
      // Linear progress fraction from 0 to 1
      let progress = step / STEPS_COUNT;

      // Map progress to current angle path loop
      let targetAngle = startAngle + progress * (2 * Math.PI);
      
      // Normalize angle to the 0 -> 2*PI window range
      let normalizedAngle = targetAngle % (2 * Math.PI);
      if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;

      // Radial coordinates for the 3 phone target centers:
      // Phone 1 (Top Center): ~ 4.712 rad (270 deg)
      // Phone 2 (Bottom Left): ~ 2.443 rad (140 deg)
      // Phone 3 (Bottom Right): ~ 0.698 rad (40 deg)
      const phoneAngles = [Math.PI * 1.5, Math.PI * 0.78, Math.PI * 0.22];
      
      // Proximity threshold to detect if the bubble is entering a phone screen box
      const threshold = 0.16; 

      phoneAngles.forEach((phoneAngle) => {
        let diff = Math.abs(normalizedAngle - phoneAngle);
        if (diff > Math.PI) diff = 2 * Math.PI - diff; // Handle boundary wrapping

        if (diff < threshold) {
          // Flatten the rate of change using an ease curve to simulate a waiting state
          const intensity = (threshold - diff) / threshold;
          targetAngle -= (normalizedAngle - phoneAngle) * intensity * 0.45;
        }
      });

      return axis === 'x' ? Math.cos(targetAngle) * RADIUS : Math.sin(targetAngle) * RADIUS;
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#35C5C5] overflow-hidden"
        >
          {/* Main Layout Canvas Anchor Container */}
          <div className="relative w-[340px] h-[340px] flex items-center justify-center">

            {/* Center Map & Text */}
            <div className="absolute flex flex-col items-center justify-center z-5 text-center pointer-events-none select-none">
              <img src="/india.svg" alt="India map" className="w-[125px] h-auto object-contain mb-5" />
              <p className="text-black font-semibold text-xs tracking-wide font-sans leading-relaxed">
                Time to go DIGITAL<br />
                Time to go "Make in India"
              </p>
            </div>

            {/* ── Fixed Static Phones Background Screens ── */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              {/* Phone 1 Screen BG - Adjusted higher up to match the top: -40px frame position */}
              <div className="absolute bg-white rounded-[4px]" style={{ width: "39px", height: "58px", left: "151px", top: "-32px" }} />
              
              {/* Phone 2 Screen BG */}
              <div className="absolute bg-white rounded-[4px]" style={{ width: "39px", height: "58px", left: "10px", top: "248px" }} />
              
              {/* Phone 3 Screen BG */}
              <div className="absolute bg-white rounded-[4px]" style={{ width: "39px", height: "58px", left: "286px", top: "248px" }} />
            </div>

            {/* ── Orbiting Message Bubbles Layer with Screen Entry Delay ── */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              {orbitBubbles.map((bubble) => {
                return (
                  <motion.div
                    key={bubble.id}
                    className="absolute flex items-center justify-center"
                    animate={{
                      x: generatePathKeyframes(bubble.startAngle, 'x'),
                      y: generatePathKeyframes(bubble.startAngle, 'y'),
                    }}
                    transition={{
                      duration: 12,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    <img 
                      src="/msg.svg" 
                      alt="Message" 
                      className="w-[25.69px] h-[24px] object-contain select-none pointer-events-none"
                      style={{ transform: "rotate(0deg)" }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* ── Fixed Static Phone Outlines Layer (Top Frame Mask) ── */}
            <div className="absolute inset-0 z-20 pointer-events-none select-none">
              {/* Phone 1 Frame */}
              <img
                src="/mobile.png"
                alt="Phone Top"
                className="absolute object-contain"
                style={{ width: "51px", height: "80px", left: "145px", top: "-40px" }}
              />

              {/* Phone 2 Frame */}
              <img
                src="/mobile.png"
                alt="Phone Left"
                className="absolute object-contain"
                style={{ width: "51px", height: "80px", left: "4px", top: "240px" }}
              />

              {/* Phone 3 Frame */}
              <img
                src="/mobile.png"
                alt="Phone Right"
                className="absolute object-contain"
                style={{ width: "51px", height: "80px", left: "280px", top: "240px" }}
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;