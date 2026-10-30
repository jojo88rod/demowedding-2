"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MailOpen, X, Ticket } from "lucide-react";
import CinematicBackground from "@/components/ui/CinematicBackground";
import InvitePassModal from "@/components/ui/InvitePassModal";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

const Invitation = () => {
  const [phase, setPhase] = useState(0); // 0: closed, 1: flap opening, 2: morphing, 3: doors open
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const invParticles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      initialX: (i * 23) % 300,
      targetX: (i * 23) % 300 + (i % 2 === 0 ? 50 : -50),
      duration: (i % 5) + 5,
      delay: (i % 3) * 0.7,
    }));
  }, []);

  // 3D Tilt Logic for Modal
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const target = new Date("2026-12-25T10:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    if (phase !== 0) return;
    setPhase(1); 
    
    // Play Seal Snap
    const snap = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
    snap.volume = 0.4;
    snap.play().catch(()=>{});

    setTimeout(() => {
      setPhase(2); // Morph to full screen
      const slide = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
      slide.volume = 0.6;
      slide.play().catch(()=>{});
    }, 800);

    setTimeout(() => {
      setPhase(3); // Open Book Doors
      const cheer = new Audio("https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3"); 
      cheer.volume = 0.3;
      cheer.play().catch(()=>{});
      
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#ffffff", "#043927"],
        disableForReducedMotion: true
      });
    }, 1800);
  };

  return (
    <section id="invitation" className="min-h-screen py-24 px-6 bg-muted/30 relative overflow-hidden flex items-center justify-center scroll-mt-20">
      
      <div className="max-w-4xl w-full mx-auto relative z-10">
        
        {phase === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-secondary/60 uppercase tracking-[0.3em] text-sm mb-4">You are cordially invited</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={handleOpen}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center space-x-2 gold-glow"
              >
                <MailOpen size={20} />
                <span>Open Invitation</span>
              </button>
              <button
                onClick={() => setIsPassModalOpen(true)}
                className="bg-white/95 text-secondary border border-primary/30 px-6 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:border-primary transition-all flex items-center space-x-2 shadow-lg text-xs gold-glow"
              >
                <Ticket size={18} className="text-primary" />
                <span>WhatsApp Invite Pass</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Static Envelope Container */}
        <div className={cn(
          "relative w-full max-w-2xl mx-auto aspect-[4/3] md:aspect-[3/2] perspective-1000 transition-opacity duration-1000",
          phase >= 2 ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          
          {/* Back of Envelope */}
          <div className="absolute inset-0 bg-[#043927] rounded-lg shadow-2xl overflow-hidden z-0">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(212,175,55,0.4)_0%,transparent_70%)]" />
          </div>

          {/* Hidden Card that will morph */}
          <AnimatePresence>
            {phase < 2 && (
              <motion.div
                layoutId="luxury-card"
                className="absolute inset-x-4 bottom-4 top-4 bg-[#054d35] rounded-lg z-10 border border-[#d4af37]/30"
              />
            )}
          </AnimatePresence>

          {/* Envelope Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: phase >= 1 ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className={cn(
              "absolute inset-x-0 top-0 h-1/2 bg-[#065c40] rounded-t-lg shadow-lg flex items-end justify-center pb-4",
              phase >= 1 ? "z-0" : "z-30"
            )}
          >
            <AnimatePresence>
              {phase === 0 && (
                <motion.div 
                  exit={{ scale: 0, opacity: 0 }}
                  className="w-16 h-16 bg-[#8b0000] rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                  onClick={handleOpen}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="font-serif text-white text-2xl italic">ES</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Front Body of Envelope */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#043927] rounded-b-lg z-20 border-t border-white/5 shadow-inner">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[320px] border-l-transparent border-r-[320px] border-r-transparent border-t-[100px] border-t-[#065c40]/30" />
          </div>
        </div>
      </div>

      {/* Cinematic Full Screen Reveal */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md perspective-2000"
          >
             <motion.button 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
               onClick={() => setPhase(0)}
               className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
             >
               <X size={32} />
             </motion.button>

            {/* Morphed Card Container */}
            <motion.div
              layoutId="luxury-card"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-5xl h-[90vh] md:h-[650px] bg-white rounded-xl shadow-[0_0_80px_rgba(212,175,55,0.3)] flex flex-col md:flex-row overflow-hidden gold-border"
            >
               
               {/* --- GATE DOORS --- */}
               <motion.div
                 className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-[#043927] z-50 origin-left border-r border-[#d4af37]/40 shadow-2xl flex items-center justify-center overflow-hidden"
                 initial={{ rotateY: 0 }}
                 animate={{ rotateY: phase >= 3 ? -120 : 0, opacity: phase >= 3 ? 0 : 1 }}
                 transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
               >
                 <div className="w-full h-full border-8 border-transparent border-y-[#d4af37]/20 border-l-[#d4af37]/20 m-2 rounded-l-lg flex items-center justify-center">
                    <span className="font-serif text-[#d4af37] text-6xl italic opacity-50">E</span>
                 </div>
               </motion.div>

               <motion.div
                 className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-[#043927] z-50 origin-right border-l border-[#d4af37]/40 shadow-2xl flex items-center justify-center overflow-hidden"
                 initial={{ rotateY: 0 }}
                 animate={{ rotateY: phase >= 3 ? 120 : 0, opacity: phase >= 3 ? 0 : 1 }}
                 transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
               >
                 <div className="w-full h-full border-8 border-transparent border-y-[#d4af37]/20 border-r-[#d4af37]/20 m-2 rounded-r-lg flex items-center justify-center">
                    <span className="font-serif text-[#d4af37] text-6xl italic opacity-50">S</span>
                 </div>
               </motion.div>

               {/* --- INNER CONTENT --- */}
               
               {/* Left Side: Photo */}
               <div className="w-full h-[40%] md:h-full md:w-1/2 relative bg-[#0a1a14] p-6 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl z-0" />
                  
                  {/* Floating Particles */}
                  {phase >= 3 && (
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                       {invParticles.map((p) => (
                         <motion.div
                           key={p.id}
                           initial={{ y: -50, x: p.initialX, opacity: 0, rotate: 0 }}
                           animate={{ 
                             y: 800, 
                             x: p.targetX,
                             opacity: [0, 1, 0],
                             rotate: 360
                           }}
                           transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
                           className="absolute w-3 h-3 bg-[#d4af37] rounded-sm opacity-60"
                           style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} 
                         />
                       ))}
                    </div>
                  )}

                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                    animate={{ scale: phase >= 3 ? 1 : 0.8, opacity: phase >= 3 ? 1 : 0, filter: phase >= 3 ? "blur(0px)" : "blur(10px)" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="relative z-10 w-full max-w-[200px] md:max-w-xs aspect-[3/4] border-[4px] md:border-[8px] border-[#d4af37] rounded-t-[100px] shadow-[0_0_40px_rgba(212,175,55,0.4)] p-1 md:p-2 bg-[#0a1a14]/50"
                  >
                     <div className="w-full h-full relative overflow-hidden rounded-t-[90px]">
                        <CinematicBackground overlayOpacity={0.2} showParticles={false} />
                     </div>
                  </motion.div>
               </div>

               {/* Right Side: Details */}
               <div className="w-full h-[60%] md:h-full md:w-1/2 relative bg-[#faf9f6] p-6 md:p-12 flex flex-col justify-center text-center overflow-y-auto custom-scrollbar">
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: phase >= 3 ? 0 : 20, opacity: phase >= 3 ? 1 : 0 }}
                    transition={{ delay: 1 }}
                    className="text-[#d4af37] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-2"
                  >
                    With Blessings From Our Families
                  </motion.p>
                  
                  <motion.h2 
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: phase >= 3 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                    transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                    className="text-4xl md:text-6xl font-serif text-[#043927] mb-2 md:mb-6 leading-tight drop-shadow-sm"
                  >
                    Elias <br className="hidden md:block"/><span className="text-[#d4af37] italic font-light">&</span><br className="hidden md:block"/> Sarah
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="flex justify-center gap-4 text-[#d4af37] text-[10px] uppercase font-bold tracking-widest">
                       <div className="flex flex-col"><span>{timeLeft.d}</span><span>Days</span></div>
                       <div className="flex flex-col"><span>{timeLeft.h}</span><span>Hrs</span></div>
                       <div className="flex flex-col"><span>{timeLeft.m}</span><span>Min</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-[#d4af37]/30 py-4 max-w-sm mx-auto">
                       <div>
                          <p className="text-[#d4af37] text-[9px] md:text-[10px] uppercase tracking-widest font-bold">When</p>
                          <p className="font-serif text-base md:text-lg text-[#043927]">Dec 25, 2026</p>
                       </div>
                       <div>
                          <p className="text-[#d4af37] text-[9px] md:text-[10px] uppercase tracking-widest font-bold">Where</p>
                          <p className="font-serif text-base md:text-lg text-[#043927]">St. Mary&apos;s Cathedral</p>
                       </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="font-serif italic text-[#043927]/80 text-xs md:text-sm max-w-[250px] mx-auto">
                         &ldquo;Love is patient, love is kind. It always protects, always trusts, always hopes...&rdquo;
                      </p>
                    </div>
                    
                    <div className="flex flex-row justify-center gap-4 pt-2">
                       <button 
                         onClick={() => setIsPassModalOpen(true)}
                         className="flex items-center space-x-2 bg-[#043927] text-white px-6 py-2.5 md:py-3 rounded-full hover:bg-[#065c40] transition-all text-xs uppercase tracking-widest shadow-lg gold-glow font-bold"
                       >
                          <Ticket size={15} className="text-[#d4af37]" />
                          <span>Get WhatsApp Pass</span>
                       </button>
                    </div>
                  </motion.div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personalized WhatsApp Invite Pass Modal */}
      <InvitePassModal 
        isOpen={isPassModalOpen} 
        onClose={() => setIsPassModalOpen(false)} 
      />
    </section>
  );
};

export default Invitation;
