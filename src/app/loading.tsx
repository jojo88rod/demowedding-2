"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-secondary flex items-center justify-center">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 border-2 border-primary rounded-full flex items-center justify-center mb-4">
            <span className="font-serif text-3xl text-primary italic">ES</span>
          </div>
          <h2 className="text-white font-serif text-2xl tracking-[0.2em] uppercase">
            Elias <span className="text-primary">&</span> Sarah
          </h2>
          <div className="mt-4 flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
