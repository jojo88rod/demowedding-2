"use client";

import React from "react";
import Link from "next/link";
import { Home, Heart, Image as ImageIcon, MapPin, Send } from "lucide-react";

const items = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Heart, label: "Story", href: "#story" },
  { icon: ImageIcon, label: "Gallery", href: "#gallery" },
  { icon: MapPin, label: "Venue", href: "#venue" },
  { icon: Send, label: "RSVP", href: "#rsvp" },
];

const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-[70]">
      <div className="bg-white/80 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-2xl px-6 py-4 flex justify-between items-center">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center space-y-1 group"
            >
              <div className="p-2 rounded-xl group-hover:bg-primary/10 transition-colors">
                <Icon size={20} className="text-secondary group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-tighter text-secondary/60 group-hover:text-primary transition-colors">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
