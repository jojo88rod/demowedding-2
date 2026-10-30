"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CinematicBackground from "@/components/ui/CinematicBackground";

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const containerRef = useRef<HTMLElement>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      initialX: (i * 37) % 1000 - 500,
      initialY: (i * 53) % 1000 - 500,
      targetY: -((i * 17) % 300 + 200),
      duration: (i % 8) + 7,
      left: `${(i * 3.33) % 100}%`,
      top: `${(i * 7.1) % 100}%`,
    }));
  }, []);
  
  // Parallax Scroll Transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yScroll = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const targetDate = new Date("2026-12-25T10:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden perspective-1000"
    >
      {/* Cinematic Background System */}
      <motion.div style={{ y: yScroll, scale: scaleScroll }} className="absolute inset-0 z-0">
        <CinematicBackground overlayOpacity={0.4} />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 0, 
              x: p.initialX, 
              y: p.initialY 
            }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [null, p.targetY],
              transition: { 
                duration: p.duration, 
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[2px]"
            style={{ 
              left: p.left, 
              top: p.top 
            }}
          />
        ))}
      </div>

      {/* 3D Tilting Content Container */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          opacity: opacityScroll,
          transformStyle: "preserve-3d" 
        }} 
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div style={{ transform: "translateZ(50px)" }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-white/90 text-sm md:text-lg uppercase font-light mb-6"
          >
            Together With Their Families
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-9xl lg:text-[10rem] text-white font-serif mb-8 drop-shadow-2xl leading-tight"
          >
            Elias <span className="text-primary italic font-light">&</span> Sarah
          </motion.h1>
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(80px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.minutes },
            { label: "Secs", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-serif text-primary mb-1 drop-shadow-lg">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/80 font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(100px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={() => document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-white px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all gold-glow group relative overflow-hidden"
          >
            <span className="relative z-10">Open Invitation</span>
            <motion.div 
              className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
            />
          </button>
          <div className="flex flex-col items-start md:items-start text-left border-l-2 border-primary/50 pl-6">
            <p className="text-white font-serif italic text-2xl md:text-3xl">
              December 25, 2026
            </p>
            <p className="text-white/70 uppercase tracking-widest text-xs font-bold mt-1">
              Kochi, Kerala
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={() => document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-white cursor-pointer transition-colors p-2"
        role="button"
        aria-label="Scroll to Invitation"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
