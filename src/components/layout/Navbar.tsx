"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Invitation", href: "#invitation" },
  { name: "Our Story", href: "#story" },
  { name: "Couple", href: "#couple" },
  { name: "Venue", href: "#venue" },
  { name: "Gallery", href: "#gallery" },
  { name: "RSVP", href: "#rsvp" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionIds = ["hero", "invitation", "journey", "story", "couple", "venue", "candle", "gallery", "rsvp", "blessings"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4",
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm py-3 border-b border-primary/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#hero" 
          onClick={(e) => scrollTo(e, "#hero")}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <Heart className="w-6 h-6 text-primary fill-primary group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-serif font-bold tracking-tight">
            <span className="text-secondary">Elias</span>
            <span className="text-primary mx-1">&</span>
            <span className="text-secondary">Sarah</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors relative py-1",
                  isActive ? "text-primary font-semibold" : "text-secondary/80 hover:text-primary"
                )}
              >
                {link.name}
                {isActive ? (
                  <motion.span
                    layoutId="desktopActiveNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                )}
              </a>
            );
          })}
          <a
            href="#rsvp"
            onClick={(e) => scrollTo(e, "#rsvp")}
            className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all gold-glow"
          >
            RSVP Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-secondary p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl p-6 md:hidden flex flex-col space-y-4 border-b border-primary/20"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={cn(
                    "text-lg font-serif transition-colors flex items-center justify-between py-1",
                    isActive ? "text-primary font-bold pl-2 border-l-2 border-primary" : "text-secondary hover:text-primary"
                  )}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </a>
              );
            })}
            <a
              href="#rsvp"
              onClick={(e) => scrollTo(e, "#rsvp")}
              className="bg-primary text-white text-center py-3 rounded-xl font-serif text-xl gold-glow mt-2"
            >
              RSVP Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
