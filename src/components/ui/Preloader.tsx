"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-secondary flex items-center justify-center overflow-hidden"
        >
          {/* Subtle Background Animation */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]"
          />

          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="relative inline-block">
                <motion.h1 
                  className="text-4xl md:text-6xl font-serif text-white tracking-widest"
                >
                  JOJO
                </motion.h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-[1px] bg-primary mt-2 mx-auto"
                />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-primary text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold gold-shimmer"
              >
                A Love Story Crafted with Elegance
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 2 }}
                className="text-white text-[8px] uppercase tracking-[0.3em]"
              >
                Press any key to begin the experience
              </motion.p>
            </motion.div>

            {/* Circular Progress Loader */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 -rotate-90">
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                stroke="rgba(212,175,55,0.2)"
                strokeWidth="1"
                fill="none"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                stroke="#d4af37"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
