"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, MessageCircle, Mail, Sparkles, Heart } from "lucide-react";

const Couple = () => {
  return (
    <section
      id="couple"
      className="min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-background relative overflow-hidden flex items-center scroll-mt-20"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>Two Souls, One Heart</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-secondary mb-4 font-normal"
          >
            Bride & Groom
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-secondary/70 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
          >
            Called Together in God&apos;s Perfect Timing
          </motion.p>
        </div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
          {/* Groom: Elias Kurian */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center text-center bg-white/70 backdrop-blur-md border border-primary/20 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_15px_40px_rgba(4,57,39,0.06)] hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)] transition-all duration-500 group"
          >
            {/* Portrait with Animated Orbital Shimmer */}
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 mb-8">
              {/* Outer Golden Shimmer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-primary/40 pointer-events-none"
              />
              {/* Inner Reverse Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-primary/25 pointer-events-none"
              />

              {/* Oval Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/40 shadow-2xl">
                <Image
                  src="/images/portrait.png"
                  alt="Elias Kurian - The Groom"
                  fill
                  sizes="(max-width: 768px) 250px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* Groom Details */}
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold uppercase tracking-widest mb-3">
              The Groom
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif text-secondary mb-2">
              Elias Kurian
            </h3>

            <p className="text-xs uppercase tracking-widest text-secondary/60 font-medium mb-4">
              Son of Mr. Kurian Varghese & Mrs. Aleyamma Kurian
            </p>

            <div className="w-12 h-px bg-primary/30 my-2" />

            <p className="text-secondary/75 italic text-sm sm:text-base leading-relaxed max-w-sm mt-3 mb-6 font-serif">
              &ldquo;In Sarah, I found my sanctuary, my laughter, and the missing piece of my soul. I thank God every day for the honor of walking beside her for eternity.&rdquo;
            </p>

            {/* Social Pill Links */}
            <div className="mt-auto flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm hover:scale-110"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:elias@wedding.com"
                aria-label="Email Elias"
                className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm hover:scale-110"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Bride: Sarah Mariam */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center text-center bg-white/70 backdrop-blur-md border border-primary/20 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_15px_40px_rgba(4,57,39,0.06)] hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)] transition-all duration-500 group"
          >
            {/* Portrait with Animated Orbital Shimmer */}
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 mb-8">
              {/* Outer Golden Shimmer Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-primary/40 pointer-events-none"
              />
              {/* Inner Reverse Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-primary/25 pointer-events-none"
              />

              {/* Oval Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/40 shadow-2xl">
                <Image
                  src="/images/hero.png"
                  alt="Sarah Mariam - The Bride"
                  fill
                  sizes="(max-width: 768px) 250px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* Bride Details */}
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold uppercase tracking-widest mb-3">
              The Bride
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif text-secondary mb-2">
              Sarah Mariam
            </h3>

            <p className="text-xs uppercase tracking-widest text-secondary/60 font-medium mb-4">
              Daughter of Mr. George Joseph & Mrs. Mini George
            </p>

            <div className="w-12 h-px bg-primary/30 my-2" />

            <p className="text-secondary/75 italic text-sm sm:text-base leading-relaxed max-w-sm mt-3 mb-6 font-serif">
              &ldquo;Elias is the gentle answer to my every quiet prayer. His steadfast faith and kind heart illuminate my world, and I rejoice in giving him my life and love.&rdquo;
            </p>

            {/* Social Pill Links */}
            <div className="mt-auto flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm hover:scale-110"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:sarah@wedding.com"
                aria-label="Email Sarah"
                className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm hover:scale-110"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scripture Footer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center max-w-xl mx-auto p-6 rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Heart size={14} className="fill-primary" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">Holy Matrimony</span>
            <Heart size={14} className="fill-primary" />
          </div>
          <p className="font-serif italic text-base sm:text-lg text-secondary/80">
            &ldquo;Therefore what God has joined together, let no one separate.&rdquo;
          </p>
          <p className="text-[11px] uppercase tracking-widest text-primary font-bold mt-1">
            Mark 10:9
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Couple;
