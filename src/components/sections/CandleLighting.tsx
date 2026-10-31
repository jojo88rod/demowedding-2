"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface Candle {
  id: number;
  name: string;
  intention?: string;
  time: string;
}

const initialCandles: Candle[] = [
  {
    id: 1,
    name: "The Kurian Family",
    intention: "Everlasting Love & Joy",
    time: "Parents' Blessing",
  },
  {
    id: 2,
    name: "The George Family",
    intention: "God's Abundant Grace",
    time: "Parents' Blessing",
  },
  {
    id: 3,
    name: "In Memory of Grandparents",
    intention: "Eternal Peace & Guiding Light",
    time: "In Loving Memory",
  },
  {
    id: 4,
    name: "St. Mary's Youth Choir",
    intention: "Harmony & Sweet Melodies",
    time: "Parish Friends",
  },
];

const intentionOptions = [
  "Everlasting Love & Joy",
  "God's Abundant Grace",
  "Health & Peace of Mind",
  "Unity & Eternal Faith",
];

const CandleLighting = () => {
  const [candles, setCandles] = useState<Candle[]>(initialCandles);
  const [name, setName] = useState("");
  const [intention, setIntention] = useState(intentionOptions[0]);
  const [isLighting, setIsLighting] = useState(false);
  const [justLit, setJustLit] = useState(false);

  const lightCandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLighting(true);
    setTimeout(() => {
      const newCandle: Candle = {
        id: Date.now(),
        name: name.trim(),
        intention: intention,
        time: "Just now",
      };
      setCandles((prev) => [newCandle, ...prev]);
      setName("");
      setIsLighting(false);
      setJustLit(true);
      setTimeout(() => setJustLit(false), 3000);

      // Warm golden confetti
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#fbf5b7", "#ffffff"],
      });
    }, 1200);
  };

  return (
    <section
      id="candle"
      className="min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-[#041a12] relative overflow-hidden text-white flex items-center scroll-mt-20"
    >
      {/* Cinematic Golden Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4"
          >
            <Flame size={13} className="text-primary animate-pulse" />
            <span>Virtual Prayer Altar</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 font-normal"
          >
            Light a Prayer Candle
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium max-w-xl mx-auto"
          >
            Distance cannot separate us in spirit. Kindle a flame of prayer for our new life.
          </motion.p>
        </div>

        {/* Altar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-serif text-white mb-1">
                Dedicate a Flame
              </h3>
              <p className="text-xs text-white/60 mb-6 uppercase tracking-wider">
                Your prayer will illuminate the virtual altar below
              </p>

              <form onSubmit={lightCandle} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-primary text-xs uppercase tracking-widest font-bold block">
                    Your Name or Family
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Thomas & Reena Family"
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-primary text-xs uppercase tracking-widest font-bold block">
                    Prayer Intention
                  </label>
                  <select
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    className="w-full bg-[#0a2318] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  >
                    {intentionOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#041a12] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLighting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isLighting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Flame size={18} />
                    </motion.div>
                  ) : (
                    <>
                      <Flame size={18} />
                      <span>Light Virtual Candle</span>
                    </>
                  )}
                </button>
              </form>

              {justLit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-emerald-950/80 border border-primary/40 rounded-xl flex items-center gap-2 text-primary text-xs font-semibold"
                >
                  <Check size={16} />
                  <span>Your candle has been placed on the altar with love!</span>
                </motion.div>
              )}
            </div>

            {/* Scripture Pill */}
            <div className="p-6 border border-primary/25 rounded-2xl bg-primary/10 backdrop-blur-sm">
              <p className="text-sm font-serif italic text-white/90 leading-relaxed">
                &ldquo;Thy word is a lamp unto my feet, and a light unto my path.&rdquo;
              </p>
              <p className="text-[11px] mt-2 uppercase tracking-[0.2em] text-primary font-bold">
                Psalm 119:105
              </p>
            </div>
          </div>

          {/* Candle Altar Display (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative min-h-[480px] bg-black/60 rounded-[2.5rem] border border-primary/20 p-6 sm:p-8 overflow-hidden shadow-2xl flex flex-col justify-between">
              {/* Altar Status Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                    Sanctuary Altar
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold">
                  <Flame size={13} className="fill-primary" />
                  <span>{candles.length} Candles Illuminated</span>
                </div>
              </div>

              {/* Candles Grid / Display */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center py-4">
                <AnimatePresence>
                  {candles.map((candle) => (
                    <motion.div
                      key={candle.id}
                      initial={{ opacity: 0, scale: 0.5, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col items-center text-center space-y-3 group"
                    >
                      {/* Burning Candle Graphic */}
                      <div className="relative pt-6">
                        {/* Radiant Flame Halo */}
                        <motion.div
                          animate={{
                            scale: [1, 1.25, 1],
                            opacity: [0.6, 0.9, 0.6],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-400/40 rounded-full blur-xl pointer-events-none"
                        />

                        {/* Animated Flame */}
                        <motion.div
                          animate={{
                            scaleY: [1, 1.15, 0.95, 1.1, 1],
                            skewX: [-3, 3, -2, 4, -3],
                          }}
                          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-1 left-1/2 -translate-x-1/2 w-3.5 h-6 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-t-full rounded-b-sm shadow-[0_0_12px_#f59e0b]"
                        />

                        {/* Candle Wick */}
                        <div className="w-0.5 h-2 bg-neutral-800 mx-auto" />

                        {/* Candle Body */}
                        <div className="w-7 h-16 sm:h-20 bg-gradient-to-b from-amber-100 via-amber-50 to-neutral-200 rounded-t-sm rounded-b-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_10px_20px_rgba(0,0,0,0.5)] border border-amber-200/50 relative overflow-hidden">
                          {/* Wax drip highlight */}
                          <div className="absolute top-0 inset-x-0 h-1.5 bg-amber-200/70 rounded-full" />
                        </div>

                        {/* Brass Pedestal */}
                        <div className="w-10 h-2 bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-800 rounded-full mx-auto -mt-1 shadow-md" />
                      </div>

                      {/* Dedication Text */}
                      <div className="space-y-0.5 max-w-[130px]">
                        <p className="text-xs font-semibold text-white/95 truncate">
                          {candle.name}
                        </p>
                        {candle.intention && (
                          <p className="text-[10px] text-primary/90 italic truncate">
                            {candle.intention}
                          </p>
                        )}
                        <p className="text-[9px] uppercase tracking-wider text-white/40">
                          {candle.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Altar Marble Step Base */}
              <div className="mt-8 pt-4 border-t border-white/10 text-center">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                  † Blessed in the Holy Name of Jesus †
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandleLighting;
