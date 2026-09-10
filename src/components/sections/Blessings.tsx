"use client";

import React from "react";
import { motion } from "framer-motion";

const wishes = [
  { name: "John & Mary", message: "So happy for both of you! Wishing you a lifetime of love and happiness.", relation: "Family" },
  { name: "Anish Kurian", message: "Congratulations! Looking forward to the big day in Kochi.", relation: "Friend" },
  { name: "Dr. Thomas Isaac", message: "God bless your union. May your home be filled with laughter.", relation: "Uncle" },
  { name: "Sophia George", message: "The most beautiful couple I know! Can't wait to celebrate.", relation: "Best Friend" },
];

const Blessings = () => {
  return (
    <section className="py-24 px-6 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-4">Blessings & Wishes</h2>
          <p className="text-secondary/60 uppercase tracking-widest text-sm">Notes from our loved ones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 relative group hover:shadow-xl transition-shadow"
            >
              <div className="text-primary text-4xl font-serif absolute top-4 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                &ldquo;
              </div>
              <p className="text-secondary/80 font-serif italic mb-6 leading-relaxed">
                {wish.message}
              </p>
              <div>
                <h4 className="font-bold text-secondary">{wish.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-primary">{wish.relation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blessings;
