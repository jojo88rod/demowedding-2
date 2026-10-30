"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const Couple = () => {
  return (
    <section id="couple" className="min-h-screen py-24 px-6 bg-background overflow-hidden flex items-center scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-4">Bride & Groom</h2>
          <p className="text-secondary/60 uppercase tracking-widest text-sm">The happy couple</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-[400px]">
              <div className="absolute -inset-4 border border-primary/20 rounded-full rotate-6" />
              <div className="absolute -inset-4 border border-primary/20 rounded-full -rotate-3" />
              <div className="relative w-full h-full rounded-full overflow-hidden gold-border shadow-2xl">
                <Image
                  src="/images/hero.png" // Placeholder
                  alt="Elias - The Groom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-serif text-secondary">Elias Kurian</h3>
              <p className="text-primary uppercase tracking-widest text-xs font-bold">The Groom</p>
            </div>
            <p className="text-secondary/70 italic max-w-sm">
              &ldquo;In her, I found the missing piece of my soul. I can&apos;t wait to start this journey with my best friend.&rdquo;
            </p>
            <div className="flex space-x-4 text-secondary/40">
              <Instagram size={20} className="hover:text-primary cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-primary cursor-pointer transition-colors" />
              <MessageCircle size={20} className="hover:text-primary cursor-pointer transition-colors" />
            </div>
          </motion.div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-[400px]">
              <div className="absolute -inset-4 border border-primary/20 rounded-full -rotate-6" />
              <div className="absolute -inset-4 border border-primary/20 rounded-full rotate-3" />
              <div className="relative w-full h-full rounded-full overflow-hidden gold-border shadow-2xl">
                <Image
                  src="/images/hero.png" // Placeholder
                  alt="Sarah Mariam"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-serif text-secondary">Sarah Mariam</h3>
              <p className="text-primary uppercase tracking-widest text-xs font-bold">The Bride</p>
            </div>
            <p className="text-secondary/70 italic max-w-sm">
              &ldquo;Elias makes every day brighter. His love is my greatest blessing, and I am honored to be his wife.&rdquo;
            </p>
            <div className="flex space-x-4 text-secondary/40">
              <Instagram size={20} className="hover:text-primary cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-primary cursor-pointer transition-colors" />
              <MessageCircle size={20} className="hover:text-primary cursor-pointer transition-colors" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Couple;
