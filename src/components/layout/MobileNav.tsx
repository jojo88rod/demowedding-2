"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Heart, MapPin, Image as ImageIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Home, label: "Home", href: "#hero", id: "hero" },
  { icon: Heart, label: "Story", href: "#story", id: "story" },
  { icon: MapPin, label: "Venue", href: "#venue", id: "venue" },
  { icon: ImageIcon, label: "Gallery", href: "#gallery", id: "gallery" },
  { icon: Send, label: "RSVP", href: "#rsvp", id: "rsvp" },
];

const MobileNav = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["hero", "invitation", "journey", "story", "couple", "venue", "candle", "gallery", "rsvp", "blessings"];
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            // Map sub-sections to nearest nav items
            if (id === "invitation" || id === "journey") {
              setActiveSection("hero");
            } else if (id === "couple") {
              setActiveSection("story");
            } else if (id === "candle") {
              setActiveSection("venue");
            } else if (id === "blessings") {
              setActiveSection("rsvp");
            } else {
              setActiveSection(id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-5 left-4 right-4 z-[70] pointer-events-none">
      <div className="bg-white/90 backdrop-blur-2xl border border-primary/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] px-4 py-2.5 flex justify-between items-center pointer-events-auto max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              whileTap={{ scale: 0.88 }}
              className="flex flex-col items-center py-1 px-2.5 rounded-xl transition-all relative group"
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-all duration-300",
                  isActive ? "bg-primary/15 text-primary scale-110" : "text-secondary/70 group-hover:text-primary"
                )}
              >
                <Icon size={19} className="transition-transform" />
              </div>
              <span
                className={cn(
                  "text-[9px] uppercase font-bold tracking-tight transition-colors mt-0.5",
                  isActive ? "text-primary font-black" : "text-secondary/60 group-hover:text-primary"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileActiveDot"
                  className="w-1 h-1 rounded-full bg-primary mt-0.5 shadow-[0_0_6px_rgba(212,175,55,0.8)]"
                />
              )}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
