"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hidden md:block">
      {/* Outer Glow */}
      <motion.div
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/30 z-[9999] pointer-events-none"
      />

      {/* Inner Dot with "J" branding */}
      <motion.div
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 0.8 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.2 }}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none flex items-center justify-center"
      >
         {isPointer && (
           <span className="text-[6px] text-white font-bold mb-0.5">J</span>
         )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;
