"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CINEMATIC_ASSETS = [
  { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-a-forest-4318-large.mp4" },
  { type: "image", url: "/images/portrait.png" },
  { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-newly-married-couple-standing-on-a-beach-4317-large.mp4" },
  { type: "image", url: "/images/rings.png" },
  { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-couple-standing-on-a-cliff-4316-large.mp4" },
  { type: "image", url: "/images/church.png" },
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
          {activeAsset.type === "video" ? (
            <video
              src={activeAsset.url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transform-gpu"
              preload="auto"
            />
          ) : (
            <motion.div
              animate={{ 
                scale: [1, 1.1],
                x: [0, -10],
                y: [0, -5]
              }}
              transition={{ duration: 10, ease: "linear" }}
              className="w-full h-full bg-cover bg-center transform-gpu"
              style={{ backgroundImage: `url(${activeAsset.url})` }}
            />
          )}
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
