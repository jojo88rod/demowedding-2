"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CINEMATIC_ASSETS = [
  { url: "/images/portrait.png", panX: [0, -15], panY: [0, -10], scale: [1, 1.12] },
  { url: "/images/rings.png", panX: [10, -10], panY: [0, -5], scale: [1.12, 1.02] },
  { url: "/images/church.png", panX: [0, 0], panY: [15, -15], scale: [1.03, 1.15] },
  { url: "/images/engagement.png", panX: [-15, 10], panY: [0, -8], scale: [1, 1.12] },
  { url: "/images/hero.png", panX: [0, -15], panY: [-5, 8], scale: [1.14, 1.03] },
  { url: "/images/reception.png", panX: [10, -10], panY: [8, -8], scale: [1, 1.12] },
];

interface CinematicBackgroundProps {
  className?: string;
  overlayOpacity?: number;
  showParticles?: boolean;
}

const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ 
  className = "", 
  overlayOpacity = 0.5,
  showParticles = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CINEMATIC_ASSETS.length);
    }, 5000); // 5 seconds per scene
    return () => clearInterval(timer);
  }, []);

  const activeAsset = CINEMATIC_ASSETS[currentIndex];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.div
            animate={{ 
              scale: activeAsset.scale,
              x: activeAsset.panX,
              y: activeAsset.panY
            }}
            transition={{ duration: 7, ease: "linear" }}
            className="w-full h-full bg-cover bg-center transform-gpu"
            style={{ backgroundImage: `url(${activeAsset.url})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-black" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      
      {/* Film Grain Effect - Optimized */}
      {showParticles && (
        <div className="absolute inset-0 z-20 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      )}
    </div>
  );
};

export default CinematicBackground;
