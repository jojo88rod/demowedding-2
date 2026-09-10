"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const VIDEO_CLIPS = [
  "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-a-forest-4318-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-newly-married-couple-standing-on-a-beach-4317-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-4315-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-couple-standing-on-a-cliff-4316-large.mp4"
];

const OurJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [currentClip, setCurrentClip] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  // Cycle through clips
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentClip((prev) => (prev + 1) % VIDEO_CLIPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section 
      id="journey-video"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Cinematic Background Video Montage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {VIDEO_CLIPS.map((clip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentClip ? 0.7 : 0,
              scale: index === currentClip ? 1 : 1.1 
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div style={{ scale: videoScale }} className="w-full h-full">
              <video
                src={clip}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
        
        {/* High-End Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-color" />
      </div>

      {/* Floating Content */}
      <motion.div 
        style={{ y: textY }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.95 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.5em" } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-primary text-xs md:text-sm uppercase font-bold mb-4 block"
        >
          A Lifetime of Memories
        </motion.span>
        
        <h2 className="text-5xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl leading-tight">
          Our Journey <br /> <span className="text-primary italic font-light">&</span> Story
        </h2>
        
        <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-light tracking-wide px-4">
          Capturing the beautiful chapters of our love, from the quiet moments to the grand adventures that brought us here today.
        </p>

        {/* Cinematic Clip Indicator */}
        <div className="mt-8 flex justify-center gap-3">
          {VIDEO_CLIPS.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 rounded-full transition-all duration-1000 ${
                i === currentClip ? "w-8 bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Decorative Scroll Hint */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
          <span className="text-[10px] text-primary/50 uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurJourney;
