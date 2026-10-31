"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
} from "lucide-react";

interface GalleryImage {
  src: string;
  title: string;
  category: string;
  aspect?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/portrait.png",
    title: "The Sacred Promise",
    category: "Portraits",
  },
  {
    src: "/images/rings.png",
    title: "Blessed Wedding Bands",
    category: "Details",
  },
  {
    src: "/images/church.png",
    title: "St. Mary's Cathedral Basilica",
    category: "Ceremony",
  },
  {
    src: "/images/engagement.png",
    title: "The Betrothal Ceremony",
    category: "Covenant",
  },
  {
    src: "/images/hero.png",
    title: "Elias & Sarah in Grace",
    category: "Couple",
  },
  {
    src: "/images/reception.png",
    title: "Coastal Kovalam Evening",
    category: "Celebration",
  },
];

const categories = ["All", "Portraits", "Ceremony", "Covenant", "Celebration"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (img) => img.category === activeCategory || (activeCategory === "Portraits" && img.category === "Couple")
        );

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : filteredImages.length - 1));
  }, [selectedIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < filteredImages.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/20 relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>Captured Memories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-secondary mb-4 font-normal"
          >
            Our Photo Gallery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-secondary/70 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
          >
            Moments of Grace, Love & Fellowship
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-secondary text-white shadow-md border border-secondary"
                  : "bg-white/80 border border-primary/20 text-secondary/70 hover:text-primary hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              layout
              key={image.src + index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(4,57,39,0.08)] border border-primary/20 bg-white/50 aspect-[4/5]"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-6" />

              {/* Hover Badge */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="backdrop-blur-md bg-secondary/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                  {image.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <Maximize2 size={16} />
                </div>
              </div>

              {/* Hover Bottom Title */}
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 text-white">
                <h4 className="font-serif text-xl sm:text-2xl drop-shadow-md">
                  {image.title}
                </h4>
                <div className="flex items-center gap-1.5 text-primary text-xs mt-1">
                  <Heart size={12} className="fill-primary" />
                  <span className="font-medium">Elias & Sarah</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-6 inset-x-6 sm:inset-x-12 flex items-center justify-between z-20 text-white/80">
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                Photo {selectedIndex + 1} of {filteredImages.length}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(null);
                }}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all shadow-md"
                aria-label="Close Lightbox"
              >
                <X size={24} />
              </button>
            </div>

            {/* Left Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all z-20 shadow-lg"
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all z-20 shadow-lg"
              aria-label="Next Image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Modal Image Box */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                <Image
                  src={filteredImages[selectedIndex].src}
                  alt={filteredImages[selectedIndex].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Bottom Caption Pill */}
              <div className="mt-4 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <p className="text-white font-serif text-lg">
                  {filteredImages[selectedIndex].title}
                </p>
                <span className="text-[11px] text-primary uppercase tracking-widest font-semibold">
                  {filteredImages[selectedIndex].category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
