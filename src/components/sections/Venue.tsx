"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Church, Wine } from "lucide-react";

const venues = [
  {
    type: "Ceremony",
    name: "St. Mary's Cathedral",
    address: "Marine Drive, Kochi, Kerala 682031",
    time: "10:00 AM",
    icon: <Church className="w-8 h-8" />,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.569424687831!2d76.2730873!3d9.979148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d463e27944f%3A0xc34a813872c8332d!2sSt.%20Mary&#39;s%20Cathedral%20Basilica!5e0!3m2!1sen!2sin!4v1714571000000!5m2!1sen!2sin",
    directions: "https://maps.app.goo.gl/..."
  },
  {
    type: "Reception",
    name: "The Leela Kovalam",
    address: "Kovalam, Thiruvananthapuram, Kerala 695527",
    time: "06:00 PM",
    icon: <Wine className="w-8 h-8" />,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.123456789!2d76.9789!3d8.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05a678!2sThe%20Leela%20Kovalam!5e0!3m2!1sen!2sin!4v1714572000000",
    directions: "https://maps.app.goo.gl/..."
  }
];

const Venue = () => {
  return (
    <section id="venue" className="min-h-screen py-24 px-6 bg-background flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-4">Location & Timing</h2>
          <p className="text-secondary/60 uppercase tracking-widest text-sm">Join us at these venues</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {venues.map((venue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-muted/30 rounded-[2rem] overflow-hidden shadow-xl border border-primary/10 flex flex-col"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    {venue.icon}
                  </div>
                  <span className="text-primary font-bold uppercase tracking-widest text-xs py-1 px-3 border border-primary/20 rounded-full">
                    {venue.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-serif text-secondary mb-2">{venue.name}</h3>
                  <div className="flex items-start space-x-2 text-secondary/70 mb-1">
                    <MapPin size={18} className="mt-1 flex-shrink-0" />
                    <p>{venue.address}</p>
                  </div>
                  <p className="text-primary font-bold">{venue.time}</p>
                </div>

                <a
                  href={venue.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all group"
                >
                  <Navigation size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Get Directions</span>
                </a>
              </div>

              <div className="flex-grow min-h-[300px] grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                  src={venue.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${venue.name} Map`}
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
