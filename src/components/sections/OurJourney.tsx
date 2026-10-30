"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, Film, Sparkles } from "lucide-react";

interface JourneyScene {
  id: number;
  title: string;
  tagline: string;
  image: string;
  panX: number[];
  panY: number[];
  scaleRange: number[];
}

const JOURNEY_SCENES: JourneyScene[] = [
  {
    id: 1,
    title: "The First Chapter",
    tagline: "Where our paths first crossed in faith and love",
    image: "/images/portrait.png",
    panX: [0, -25],
    panY: [0, -15],
    scaleRange: [1, 1.16],
  },
  {
    id: 2,
    title: "The Sacred Promise",
    tagline: "Blessed rings bound by God's eternal grace",
    image: "/images/rings.png",
    panX: [15, -15],
    panY: [0, -8],
    scaleRange: [1.15, 1.03],
  },
  {
    id: 3,
    title: "Holy Sanctuary",
    tagline: "St. Mary's Cathedral Basilica, Marine Drive, Kochi",
    image: "/images/church.png",
    panX: [0, 0],
    panY: [20, -20],
    scaleRange: [1.05, 1.18],
  },
  {
    id: 4,
    title: "The Engagement",
    tagline: "United with the prayers and blessings of our families",
    image: "/images/engagement.png",
    panX: [-20, 15],
    panY: [0, -12],
    scaleRange: [1, 1.15],
  },
  {
    id: 5,
    title: "Together Forever",
    tagline: "Elias & Sarah — Bound by prayer, guided by grace",
    image: "/images/hero.png",
    panX: [0, -20],
    panY: [-10, 10],
    scaleRange: [1.16, 1.04],
  },
  {
    id: 6,
    title: "The Celebration",
    tagline: "Feast & joy at The Leela Kovalam, Thiruvananthapuram",
    image: "/images/reception.png",
    panX: [15, -15],
    panY: [10, -10],
    scaleRange: [1, 1.15],
  },
];

const OurJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  // Floating Golden Particles (deterministic positions for purity)
  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${(i * 4.17 + 2) % 96}%`,
      top: `${(i * 7.9 + 5) % 90}%`,
      duration: (i % 5) + 6,
      delay: (i % 4) * 0.7,
      size: (i % 3) + 2,
    }));
  }, []);

  // Scene Progression Timer
  useEffect(() => {
    if (!isInView || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSceneIndex((prev) => (prev + 1) % JOURNEY_SCENES.length);
    }, 6000); // 6 seconds per cinematic chapter

    return () => clearInterval(timer);
  }, [isInView, isPlaying]);

  const activeScene = JOURNEY_SCENES[currentSceneIndex];

  const handleNext = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % JOURNEY_SCENES.length);
  };

  const handlePrev = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + JOURNEY_SCENES.length) % JOURNEY_SCENES.length);
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center bg-black scroll-mt-20"
    >
      {/* ============================================================== */}
      {/* ANIMATED CINEMATIC COUPLE BACKGROUND VIDEO SYSTEM */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSceneIndex}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Animated Photo-To-Video Canvas with Slow-Motion Ken Burns Effect */}
            <motion.div
              animate={{
                scale: activeScene.scaleRange,
                x: activeScene.panX,
                y: activeScene.panY,
              }}
              transition={{
                duration: 7,
                ease: "linear",
              }}
              className="w-full h-full bg-cover bg-center transform-gpu"
              style={{
                backgroundImage: `url(${activeScene.image})`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Light Leak Flare */}
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            x: ["-10%", "10%", "-10%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.3)_0%,rgba(255,183,77,0.15)_35%,transparent_70%)] mix-blend-screen pointer-events-none"
        />

        {/* 35mm Film Grain Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

        {/* Floating Golden Dust Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -180],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute rounded-full bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>

        {/* Cinematic Vignette & Color Gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/45 to-black/85" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* ============================================================== */}
      {/* FLOATING EDITORIAL CONTENT */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: textY }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.95 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Active Scene Pill Badge */}
        <motion.div
          key={`badge-${currentSceneIndex}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-md border border-[#d4af37]/40 px-4 py-1.5 rounded-full mb-6 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold shadow-lg"
        >
          <Film size={13} className="text-[#d4af37]" />
          <span>Scene 0{activeScene.id} of 06 &bull; {activeScene.title}</span>
        </motion.div>

        {/* Section Heading */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.45em" } : {}}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-[#d4af37] text-xs md:text-sm uppercase font-bold mb-4 block"
        >
          A Lifetime of Memories
        </motion.span>

        <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)] leading-tight">
          Our Journey <br /> <span className="holographic-foil italic font-light">&</span> Story
        </h2>

        {/* Subtitle / Active Tagline */}
        <motion.p
          key={`desc-${currentSceneIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white/85 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-light tracking-wide px-4 drop-shadow-md"
        >
          {activeScene.tagline}
        </motion.p>

        {/* Interactive Cinematic Controls & Chapter Navigation */}
        <div className="mt-8 flex flex-col items-center gap-4 z-30">
          {/* Chapter Capsule Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            {JOURNEY_SCENES.map((scene, i) => {
              const isActive = i === currentSceneIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => setCurrentSceneIndex(i)}
                  className={`group relative h-2.5 rounded-full transition-all duration-700 flex items-center ${
                    isActive ? "w-12 bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.9)]" : "w-3 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Jump to scene ${scene.id}: ${scene.title}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSceneIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#fcf6ba] via-[#d4af37] to-[#aa771c]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Playback Controls (Previous / Pause / Play / Next) */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-xl mt-2">
            <button
              onClick={handlePrev}
              className="text-white/70 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Previous scene"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-[#d4af37] hover:text-white p-1.5 rounded-full transition-colors"
              aria-label={isPlaying ? "Pause cinematic background" : "Play cinematic background"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={handleNext}
              className="text-white/70 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Next scene"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Decorative Scroll Hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-10 flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 opacity-80 transition-opacity group"
          role="button"
          aria-label="Scroll to Our Story"
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#d4af37] to-transparent" />
          <span className="text-[10px] text-[#d4af37]/80 uppercase tracking-[0.3em] font-bold group-hover:text-[#d4af37] flex items-center gap-1.5">
            <Sparkles size={11} className="text-[#d4af37]" />
            <span>Scroll to Explore Story</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurJourney;
