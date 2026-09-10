"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Invitation", href: "#invitation" },
  { name: "Our Story", href: "#story" },
  { name: "Gallery", href: "#gallery" },
  { name: "RSVP", href: "#rsvp" },
  { name: "Venue", href: "#venue" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center space-x-2 group"
        >
          <Heart className="w-6 h-6 text-primary fill-primary group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-serif font-bold tracking-tight">
            <span className="text-secondary">Elias</span>
            <span className="text-primary mx-1">&</span>
            <span className="text-secondary">Sarah</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest text-secondary/80 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="#rsvp"
            className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all gold-glow"
          >
            RSVP Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-secondary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif text-secondary hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#rsvp"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary text-white text-center py-3 rounded-lg font-serif text-xl"
            >
              RSVP Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
