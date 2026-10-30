"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Ticket, Calendar, Layers, Sparkles, MapPin, Clock, ArrowDown } from "lucide-react";
import Image from "next/image";
import InvitePassModal from "@/components/ui/InvitePassModal";
import confetti from "canvas-confetti";

const Invitation = () => {
  const [isVellumLifted, setIsVellumLifted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  // 3D Tilt Logic
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glintX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const glintY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (touch.clientX - rect.left) / rect.width - 0.5;
    const yPct = (touch.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Countdown Timer
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

  // Floating background sparkles (deterministic positions for purity)
  const bgParticles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: `${(i * 6.25 + 4) % 94}%`,
      top: `${(i * 11.3 + 7) % 88}%`,
      duration: (i % 4) + 4,
      delay: (i % 3) * 0.8,
    }));
  }, []);

  const toggleVellum = () => {
    const nextState = !isVellumLifted;
    setIsVellumLifted(nextState);

    if (nextState) {
      // Trigger festive gold confetti when first lifting vellum
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#d4af37", "#fcf6ba", "#043927"],
        disableForReducedMotion: true,
      });
    }
  };

  // Download .ics Calendar File
  const handleDownloadCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Elias and Sarah//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:elias-sarah-wedding-20261225",
      "DTSTAMP:20261030T120000Z",
      "DTSTART:20261225T043000Z",
      "DTEND:20261225T163000Z",
      "SUMMARY:Elias & Sarah Wedding | Holy Matrimony & Reception",
      "DESCRIPTION:Join us for the Holy Matrimony of Elias & Sarah.\\nCeremony: 10:00 AM at St. Mary's Cathedral, Kochi\\nReception: 06:00 PM at The Leela Kovalam.\\nWebsite: https://elias-sarah-wedding.vercel.app",
      "LOCATION:St. Mary's Cathedral Basilica, Marine Drive, Kochi, Kerala",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Elias & Sarah Wedding Tomorrow!",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Elias-Sarah-Wedding-Dec25.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="invitation"
      className="min-h-screen py-24 px-4 sm:px-6 bg-[#fbf9f5] relative overflow-hidden flex flex-col items-center justify-center scroll-mt-20"
    >
      {/* Editorial Ambient Background Glow & Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bgParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#d4af37]/40 blur-[1px]"
            style={{ left: p.left, top: p.top }}
          />
        ))}
      </div>

      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Vogue Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#d4af37]/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#d4af37] font-semibold">
              The Formal Invitation
            </span>
            <span className="h-px w-8 bg-[#d4af37]/60" />
          </div>

          <h2 className="text-4xl md:text-6xl font-serif text-[#043927] tracking-tight">
            Vogue Wedding Suite
          </h2>

          <p className="text-secondary/70 text-xs md:text-sm uppercase tracking-[0.25em] font-light max-w-lg mx-auto">
            Frosted Vellum &bull; Holographic 24K Gold Foil &bull; Royal Emerald
          </p>

          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              onClick={toggleVellum}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#043927] hover:text-[#d4af37] transition-colors py-1 px-3 rounded-full border border-[#043927]/20 hover:border-[#d4af37] bg-white/60 backdrop-blur-sm shadow-sm"
            >
              <Layers size={14} className="text-[#d4af37]" />
              <span>{isVellumLifted ? "Lower Frosted Vellum" : "Lift Frosted Vellum"}</span>
            </button>
          </div>
        </motion.div>

        {/* 3D Holographic Stationery Card Container */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
          style={{ perspective: 1200 }}
          className="relative w-full max-w-4xl min-h-[580px] md:min-h-[600px] flex items-center justify-center p-2 select-none"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full rounded-[2rem] bg-gradient-to-br from-[#042e20] via-[#032317] to-[#01140d] border border-[#d4af37]/40 shadow-[0_20px_70px_rgba(4,57,39,0.35)] overflow-hidden text-white p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            {/* Holographic Specular Glint Layer */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 opacity-25 mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at ${glintX} ${glintY}, rgba(255,255,255,0.9) 0%, rgba(212,175,55,0.4) 30%, transparent 60%)`,
              }}
            />

            {/* Inner Debossed Fine Gold Border */}
            <div className="absolute inset-4 rounded-[1.5rem] border border-[#d4af37]/25 pointer-events-none" />

            {/* Left Column: Couple Editorial Portrait & Crest */}
            <div className="w-full md:w-5/12 flex flex-col items-center text-center relative z-10">
              <div className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-t-[120px] rounded-b-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_35px_rgba(212,175,55,0.3)] group">
                <Image
                  src="/images/hero.png"
                  alt="Elias and Sarah"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02150e] via-transparent to-black/20" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/50 flex items-center justify-center">
                  <span className="text-[#d4af37] text-xs font-serif italic">†</span>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-bold">
                  Holy Matrimony
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              </div>
            </div>

            {/* Right Column: Base Card Details */}
            <div className="w-full md:w-7/12 flex flex-col justify-center space-y-6 relative z-10 text-center md:text-left">
              <div>
                <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em] font-bold block mb-1">
                  Together With Their Families
                </span>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white leading-tight">
                  Elias <span className="holographic-foil italic font-light">&</span> Sarah
                </h3>
              </div>

              {/* Ceremony & Reception Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-y border-[#d4af37]/25 text-left">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#d4af37]">
                    <Clock size={14} />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Ceremony &bull; 10:00 AM</span>
                  </div>
                  <p className="font-serif text-lg text-white">St. Mary&apos;s Cathedral</p>
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    <MapPin size={12} className="text-[#d4af37]" />
                    Marine Drive, Kochi
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#d4af37]">
                    <Clock size={14} />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Reception &bull; 06:00 PM</span>
                  </div>
                  <p className="font-serif text-lg text-white">The Leela Kovalam</p>
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    <MapPin size={12} className="text-[#d4af37]" />
                    Thiruvananthapuram
                  </p>
                </div>
              </div>

              {/* Scripture Verse */}
              <p className="text-sm font-serif italic text-white/80 leading-relaxed max-w-md">
                &ldquo;Love never fails. So now faith, hope, and love abide, these three; but the greatest of these is love.&rdquo;
                <span className="block text-[10px] not-italic uppercase tracking-widest text-[#d4af37] mt-1">
                  1 Corinthians 13:8, 13
                </span>
              </p>

              {/* Countdown Numbers */}
              <div className="flex justify-center md:justify-start gap-4 text-[#d4af37]">
                {[
                  { label: "Days", val: timeLeft.d },
                  { label: "Hours", val: timeLeft.h },
                  { label: "Mins", val: timeLeft.m },
                  { label: "Secs", val: timeLeft.s },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center min-w-[50px] bg-white/5 py-1.5 px-2.5 rounded-lg border border-white/10">
                    <span className="text-xl md:text-2xl font-serif text-white font-bold leading-none">
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={() => setIsPassModalOpen(true)}
                  className="bg-[#d4af37] hover:bg-[#e5c158] text-[#043927] px-6 py-3 rounded-full text-xs uppercase font-bold tracking-widest flex items-center space-x-2 transition-all shadow-lg gold-glow"
                >
                  <Ticket size={16} />
                  <span>WhatsApp Invite Pass</span>
                </button>

                <button
                  onClick={handleDownloadCalendar}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full text-xs uppercase font-medium tracking-wider flex items-center space-x-2 transition-all border border-white/20"
                >
                  <Calendar size={14} className="text-[#d4af37]" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* LAYER 2: THE TRANSLUCENT FROSTED VELLUM SHEET */}
            {/* ============================================================== */}
            <motion.div
              initial={false}
              animate={{
                y: isVellumLifted ? "-92%" : "0%",
                rotateX: isVellumLifted ? 25 : 0,
                scale: isVellumLifted ? 0.96 : 1,
                opacity: isVellumLifted ? 0.85 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24,
              }}
              onClick={toggleVellum}
              className="absolute inset-0 z-40 bg-white/35 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_15px_45px_rgba(0,0,0,0.25)] p-6 sm:p-10 md:p-12 flex flex-col justify-between items-center text-center cursor-pointer transition-shadow hover:shadow-[0_20px_60px_rgba(212,175,55,0.35)]"
              style={{
                transformOrigin: "top center",
              }}
            >
              {/* Metallic Brass Monogram Rivet at Top */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fdf6ba] via-[#d4af37] to-[#8c6d1f] shadow-lg flex items-center justify-center border border-white/60 -mt-2">
                <span className="font-serif italic text-[#043927] text-sm font-bold">ES</span>
              </div>

              {/* Vellum Holographic Typography Content */}
              <div className="space-y-4 max-w-lg my-auto py-4">
                <div className="flex items-center justify-center space-x-3 text-[#d4af37]">
                  <span className="h-px w-6 bg-[#d4af37]/60" />
                  <span className="text-xl font-serif">†</span>
                  <span className="h-px w-6 bg-[#d4af37]/60" />
                </div>

                <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#043927] font-semibold">
                  Together With Their Families
                </p>

                <div className="py-2">
                  <h3 className="text-5xl sm:text-6xl md:text-7xl font-serif holographic-foil tracking-tight leading-tight">
                    Elias &bull; Sarah
                  </h3>
                  <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-2" />
                </div>

                <p className="text-xs sm:text-sm text-[#043927]/90 font-serif italic max-w-md mx-auto leading-relaxed">
                  Request the honour of your presence to witness and bless the solemnization of their Holy Matrimony.
                </p>

                <div className="pt-2 text-[#043927]">
                  <p className="text-xs uppercase tracking-[0.3em] font-bold">
                    Friday &bull; December 25, 2026
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-[#043927]/80 mt-1">
                    St. Mary&apos;s Cathedral Basilica &bull; Kochi, Kerala
                  </p>
                </div>
              </div>

              {/* Bottom Interactive Hint on Vellum */}
              <div className="pt-2 pb-1 flex items-center gap-2 text-[#043927]/80 text-[10px] uppercase tracking-[0.25em] font-bold">
                <Sparkles size={13} className="text-[#d4af37] animate-pulse" />
                <span>{isVellumLifted ? "Click to Lay Vellum Back" : "Click / Tap to Lift Frosted Vellum"}</span>
                <ArrowDown size={13} className={`text-[#d4af37] transition-transform ${isVellumLifted ? "rotate-180" : ""}`} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Personalized WhatsApp Invite Pass Generator Modal */}
      <InvitePassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />
    </section>
  );
};

export default Invitation;
