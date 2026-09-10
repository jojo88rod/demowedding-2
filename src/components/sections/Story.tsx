"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const timelineEvents = [
  {
    title: "First Meeting",
    date: "August 2022",
    description: "Our paths crossed at a mutual friend's wedding. Little did we know we were witnessing our own future.",
    image: "/images/hero.png", // Reusing for placeholder
  },
  {
    title: "The Proposal",
    date: "December 2023",
    description: "Under the starlit sky at Munnar, a simple 'Yes' changed our lives forever.",
    image: "/images/engagement.png",
  },
  {
    title: "The Engagement",
    date: "April 2024",
    description: "Officially beginning our journey with the blessings of our families and friends.",
    image: "/images/reception.png",
  },
  {
    title: "The Big Day",
    date: "December 2026",
    description: "Celebrating our union and the start of a beautiful new chapter.",
    image: "/images/hero.png",
  },
];

const Story = () => {
  return (
    <section id="story" className="min-h-screen py-24 px-6 bg-background relative overflow-hidden flex items-center">
      {/* Parallax Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 -right-20 w-60 h-60 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-4">Our Love Story</h2>
          <p className="text-secondary/60 uppercase tracking-widest text-sm">The journey to forever</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 text-center ${index % 2 === 1 ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-primary font-serif italic text-2xl mb-2 block">{event.date}</span>
                  <h3 className="text-3xl font-serif text-secondary mb-4">{event.title}</h3>
                  <p className="text-secondary/70 leading-relaxed max-w-md mx-auto md:mx-0">
                    {event.description}
                  </p>
                </div>
                
                {/* Timeline Dot (Desktop) */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
