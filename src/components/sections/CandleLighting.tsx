"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

const CandleLighting = () => {
  const [candles, setCandles] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState("");
  const [isLighting, setIsLighting] = useState(false);

  const lightCandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsLighting(true);
    setTimeout(() => {
      setCandles([...candles, { id: Date.now(), name: name.trim() }]);
      setName("");
      setIsLighting(false);
    }, 1500);
  };

  return (
    <section id="candle" className="min-h-screen py-24 px-6 bg-[#0a1a14] relative overflow-hidden text-white flex items-center scroll-mt-20">
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-4 text-primary">Light a Prayer Candle</h2>
            <p className="text-white/60 uppercase tracking-widest text-sm max-w-lg mx-auto">
              Distance cannot separate us in spirit. Light a virtual candle and leave a prayer for our new journey.
            </p>
          </motion.div>
        </div>

        {/* Candle Altar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <form onSubmit={lightCandle} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-primary text-xs uppercase tracking-widest font-bold">Your Name / Family</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="The Thomas Family"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-all"
                  required
                />
              </div>
              <button
                disabled={isLighting}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center space-x-2"
              >
                {isLighting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Flame size={20} />
                  </motion.div>
                ) : (
                  <>
                    <Flame size={20} />
                    <span>Light Virtual Candle</span>
                  </>
                )}
              </button>
            </form>

            <div className="p-6 border border-primary/20 rounded-2xl bg-primary/5">
              <p className="text-sm font-serif italic text-primary/80">
                &ldquo;Thy word is a lamp unto my feet, and a light unto my path.&rdquo;
              </p>
              <p className="text-[10px] mt-2 uppercase tracking-widest text-primary font-bold">Psalm 119:105</p>
            </div>
          </div>

          {/* The Candles Display */}
          <div className="relative min-h-[400px] bg-black/40 rounded-[2rem] border border-white/5 p-8 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-8">
              <AnimatePresence>
                {candles.map((candle) => (
                  <motion.div
                    key={candle.id}
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="flex flex-col items-center space-y-2 group"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full blur-xl"
                      />
                      <div className="w-4 h-12 bg-white/90 rounded-t-sm rounded-b-lg shadow-[0_0_15px_rgba(212,175,55,0.5)] relative">
                        <motion.div
                          animate={{ 
                            height: [8, 12, 10, 14, 8],
                            skewX: [-2, 2, -1, 3, -2]
                          }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 bg-primary rounded-full blur-[1px]"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-tighter text-white/50 group-hover:text-primary transition-colors">
                      {candle.name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {candles.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 uppercase tracking-[0.3em] text-xs">
                  Altar is waiting for your prayers
                </div>
              )}
            </div>

            {/* Smoke/Mist effect */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandleLighting;
