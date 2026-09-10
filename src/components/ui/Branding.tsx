"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const Branding = () => {
  return (
    <>
      {/* Floating Glass Watermark (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-[70] hidden md:block"
      >
        <a
          href="https://instagram.com/jojo_77_z"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-end group"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-2xl gold-glow transition-all duration-500 group-hover:bg-white/20">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-0.5">Designed by</p>
            <div className="flex items-center gap-2">
              <span className="font-serif text-white text-lg tracking-wider">JOJO</span>
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
              <Instagram size={14} className="text-primary" />
            </div>
          </div>
        </a>
      </motion.div>

      {/* Mobile Branding Center Bottom (Visible only on very small screens if needed) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] pointer-events-none opacity-30 whitespace-nowrap">
        <p className="text-[8px] uppercase tracking-[0.3em] text-white font-bold">
          Crafted by JOJO • @jojo_77_z
        </p>
      </div>
    </>
  );
};

export default Branding;
