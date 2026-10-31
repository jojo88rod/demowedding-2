"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Navigation,
  Church,
  PartyPopper,
  Clock,
  Sparkles,
  Copy,
  Check,
  Calendar,
} from "lucide-react";

interface VenueItem {
  type: string;
  badge: string;
  name: string;
  address: string;
  time: string;
  date: string;
  detail: string;
  image: string;
  icon: React.ReactNode;
  mapUrl: string;
  directions: string;
}

const venues: VenueItem[] = [
  {
    type: "Ceremony",
    badge: "Holy Matrimony",
    name: "St. Mary's Cathedral Basilica",
    address: "Marine Drive, Ernakulam, Kochi, Kerala 682031",
    date: "Friday, December 25, 2026",
    time: "10:00 AM IST",
    detail: "Solemn Nuptial High Mass & Sacred Crowning Ceremony followed by light refreshments.",
    image: "/images/church.png",
    icon: <Church className="w-6 h-6 text-primary" />,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.569424687831!2d76.2730873!3d9.979148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d463e27944f%3A0xc34a813872c8332d!2sSt.%20Mary&#39;s%20Cathedral%20Basilica!5e0!3m2!1sen!2sin!4v1714571000000!5m2!1sen!2sin",
    directions:
      "https://www.google.com/maps/search/?api=1&query=St.+Mary's+Cathedral+Basilica+Marine+Drive+Kochi",
  },
  {
    type: "Reception",
    badge: "Dinner & Dance",
    name: "The Leela Kovalam, A Raviz Hotel",
    address: "Beach Road, Kovalam, Thiruvananthapuram, Kerala 695527",
    date: "Friday, December 25, 2026",
    time: "06:00 PM IST",
    detail: "Sunset cocktails, traditional Kerala banquet, live acoustic orchestra, and cake cutting.",
    image: "/images/reception.png",
    icon: <PartyPopper className="w-6 h-6 text-primary" />,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.1685324021356!2d76.97495067468165!3d8.384666391657388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05a6788e630c79%3A0xa6464f89fbff27d2!2sThe%20Leela%20Kovalam%2C%20a%20Raviz%20Hotel!5e0!3m2!1sen!2sin!4v1714572000000!5m2!1sen!2sin",
    directions:
      "https://www.google.com/maps/search/?api=1&query=The+Leela+Kovalam+A+Raviz+Hotel+Thiruvananthapuram",
  },
];

const Venue = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (address: string, index: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section
      id="venue"
      className="min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-background relative overflow-hidden flex items-center scroll-mt-20"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>Locations & Timings</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-secondary mb-4 font-normal"
          >
            Join Our Celebrations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-secondary/70 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
          >
            Two Unforgettable Venues Across Kerala&apos;s Enchanting Coast
          </motion.p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {venues.map((venue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white/80 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(4,57,39,0.06)] border border-primary/20 flex flex-col hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)] transition-all duration-500 group"
            >
              {/* Photo Banner */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />

                {/* Badge Top Left */}
                <div className="absolute top-5 left-5 backdrop-blur-md bg-secondary/80 border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span>{venue.badge}</span>
                </div>

                {/* Date Chip Top Right */}
                <div className="absolute top-5 right-5 backdrop-blur-md bg-white/90 border border-primary/25 text-secondary px-3 py-1 rounded-full text-xs font-serif italic">
                  {venue.date}
                </div>

                {/* Venue Name Overlay */}
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] block mb-1">
                    {venue.type}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal drop-shadow-md">
                    {venue.name}
                  </h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Timing & Calendar Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-secondary/80">
                    <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-primary font-bold">
                      <Clock size={14} className="text-primary" />
                      <span>{venue.time}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/5 border border-secondary/15 px-3 py-1.5 rounded-full text-secondary">
                      <Calendar size={14} className="text-secondary/70" />
                      <span>December 25, 2026</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-secondary/70 text-sm leading-relaxed font-light">
                    {venue.detail}
                  </p>

                  {/* Address Box */}
                  <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 text-secondary/80 text-xs sm:text-sm">
                      <MapPin size={17} className="mt-0.5 text-primary flex-shrink-0" />
                      <p className="leading-snug">{venue.address}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(venue.address, index)}
                      title="Copy Address"
                      className="p-2 rounded-xl bg-white border border-primary/20 hover:border-primary/50 text-secondary/70 hover:text-primary transition-all flex-shrink-0 shadow-sm"
                    >
                      {copiedIndex === index ? (
                        <Check size={15} className="text-green-600" />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={venue.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 bg-secondary text-white py-3.5 px-6 rounded-xl hover:bg-secondary/90 transition-all font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md group/btn"
                  >
                    <Navigation size={15} className="text-primary group-hover/btn:rotate-12 transition-transform" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Wedding Venue - ${venue.name}: ${venue.directions}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white border border-primary/30 text-secondary hover:text-primary hover:border-primary py-3.5 px-5 rounded-xl transition-all font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Share Location</span>
                  </a>
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="h-64 sm:h-72 w-full border-t border-primary/15 relative">
                <iframe
                  src={venue.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${venue.name} Interactive Map`}
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Venue;
