"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Calendar, MapPin, Heart } from "lucide-react";

interface TimelineEvent {
  title: string;
  tag: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    title: "First Meeting",
    tag: "The First Spark",
    date: "August 2022",
    location: "Kochi, Kerala",
    description:
      "Our paths crossed at a mutual friend's wedding. Amidst the festive music and laughter, an accidental conversation sparked a connection that neither of us could have anticipated. Little did we know we were witnessing the prelude to our own future.",
    image: "/images/portrait.png",
  },
  {
    title: "The Proposal",
    tag: "The Sacred Yes",
    date: "December 2023",
    location: "Munnar Hills",
    description:
      "Under a breathtaking starlit sky amidst the tranquil misty hills of Munnar, Elias got down on one knee. With tears of pure joy, a heartfelt 'Yes' sealed a promise to cherish each other for all the days to come.",
    image: "/images/rings.png",
  },
  {
    title: "The Engagement",
    tag: "The Covenant",
    date: "April 2024",
    location: "Ernakulam",
    description:
      "Surrounded by our beloved parents, elders, and dear friends, our betrothal was solemnized with traditional prayers and the sacred exchange of rings, officially uniting two families in joy.",
    image: "/images/engagement.png",
  },
  {
    title: "The Big Day",
    tag: "Forever Begins",
    date: "December 25, 2026",
    location: "St. Mary's Cathedral Basilica",
    description:
      "With the solemn blessings of the Holy Church and before God and all we hold dear, we unite our souls in Holy Matrimony, stepping forth into a lifetime of unwavering love, grace, and devotion.",
    image: "/images/church.png",
  },
];

const Story = () => {
  return (
    <section
      id="story"
      className="min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-background relative overflow-hidden flex items-center scroll-mt-20"
    >
      {/* Decorative Parallax Glows */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -left-16 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 -right-16 w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>Chapter by Chapter</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-secondary mb-4 font-normal"
          >
            Our Love Story
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-secondary/70 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
          >
            The Sacred Steps That Brought Us to Forever
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Vertical Spine (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 -translate-x-1/2" />

          <div className="space-y-16 sm:space-y-24">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    !isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Photo Card */}
                  <div className="w-full md:w-1/2">
                    <div className="relative group overflow-hidden rounded-3xl p-2 bg-gradient-to-br from-primary/30 via-white/50 to-primary/10 border border-primary/20 shadow-[0_15px_40px_rgba(4,57,39,0.08)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-500">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                        
                        {/* Corner Ribbon Tag */}
                        <div className="absolute top-4 left-4 backdrop-blur-md bg-secondary/85 text-white/95 px-3.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase border border-white/20 shadow-md">
                          {event.tag}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Story Text Box */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:text-left" : "md:text-right"}`}>
                    <div className="bg-white/80 backdrop-blur-md border border-primary/20 rounded-3xl p-6 sm:p-8 shadow-lg hover:border-primary/40 transition-colors">
                      {/* Date Badge */}
                      <div
                        className={`flex items-center gap-2 mb-3 text-primary ${
                          !isEven ? "md:justify-end" : "justify-start"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-serif italic text-primary font-medium">
                          <Calendar size={13} className="text-primary" />
                          {event.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-serif text-secondary mb-2">
                        {event.title}
                      </h3>

                      {/* Location */}
                      <div
                        className={`flex items-center gap-1.5 text-xs text-secondary/60 mb-4 ${
                          !isEven ? "md:justify-end" : "justify-start"
                        }`}
                      >
                        <MapPin size={13} className="text-primary flex-shrink-0" />
                        <span className="tracking-wide">{event.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-secondary/80 text-sm sm:text-base leading-relaxed font-light">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Center Timeline Node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center bg-background border border-primary/40 shadow-md">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
                      <Heart size={10} className="fill-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
