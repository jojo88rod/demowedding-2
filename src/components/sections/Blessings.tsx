"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Send,
  MessageSquareHeart,
} from "lucide-react";
import confetti from "canvas-confetti";

interface Blessing {
  id: number;
  name: string;
  relation: string;
  message: string;
  likes: number;
  date: string;
}

const initialWishes: Blessing[] = [
  {
    id: 1,
    name: "Mr. Kurian & Mrs. Aleyamma",
    relation: "Parents of the Groom",
    message:
      "May the Almighty God who brought you together bless your home with peace, abundant health, and unending laughter. You are our pride and joy.",
    likes: 24,
    date: "Family Blessing",
  },
  {
    id: 2,
    name: "Mr. George & Mrs. Mini",
    relation: "Parents of the Bride",
    message:
      "Seeing our dearest Sarah unite with Elias fills our hearts with immense gratitude. Walk together with faith, and God will always guide your steps.",
    likes: 28,
    date: "Family Blessing",
  },
  {
    id: 3,
    name: "Rev. Fr. Mathew Varghese",
    relation: "Parish Priest",
    message:
      "A three-fold cord is not easily broken. May the holy sacramental bond of matrimony fortify your hearts in true Christian devotion.",
    likes: 19,
    date: "Priestly Blessing",
  },
  {
    id: 4,
    name: "Dr. Thomas Isaac",
    relation: "Uncle & Mentor",
    message:
      "God bless your union richly! May your marriage be a beacon of love, compassion, and warm hospitality to everyone who visits your home.",
    likes: 15,
    date: "Elder's Wish",
  },
  {
    id: 5,
    name: "Sophia George",
    relation: "Maid of Honor",
    message:
      "The most beautiful couple inside and out! Watching your love story unfold has been pure magic. Cheers to a lifetime of adventures together!",
    likes: 21,
    date: "Bridal Party",
  },
  {
    id: 6,
    name: "Anish Kurian",
    relation: "Best Man",
    message:
      "To my brother Elias and my new sister Sarah — so stoked for this epic celebration in Kochi! May your love keep growing stronger every year.",
    likes: 18,
    date: "Bridal Party",
  },
];

const Blessings = () => {
  const [wishes, setWishes] = useState<Blessing[]>(initialWishes);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relation: "Friend",
    message: "",
  });
  const [likedIds, setLikedIds] = useState<Record<number, boolean>>({});

  const handleLike = (id: number) => {
    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const isLiked = likedIds[id];
          return { ...w, likes: isLiked ? w.likes - 1 : w.likes + 1 };
        }
        return w;
      })
    );
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const newWish: Blessing = {
      id: Date.now(),
      name: formData.name.trim(),
      relation: formData.relation,
      message: formData.message.trim(),
      likes: 1,
      date: "Just Now",
    };

    setWishes((prev) => [newWish, ...prev]);
    setFormData({ name: "", relation: "Friend", message: "" });
    setShowForm(false);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#d4af37", "#043927", "#fcf6ba"],
    });
  };

  return (
    <section
      id="blessings"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30 relative overflow-hidden scroll-mt-20"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>Well Wishes & Prayers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-secondary mb-4 font-normal"
          >
            Blessings & Wishes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-secondary/70 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
          >
            Heartfelt Prayers From Our Loved Ones Near & Far
          </motion.p>

          {/* Leave Blessing Toggle Button */}
          <div className="mt-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full uppercase tracking-wider text-xs font-semibold hover:bg-secondary/90 transition-all shadow-md group"
            >
              <MessageSquareHeart size={16} className="text-primary group-hover:scale-110 transition-transform" />
              <span>{showForm ? "Close Form" : "Write a Blessing for the Couple"}</span>
            </button>
          </div>
        </div>

        {/* Interactive Add Blessing Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-16 overflow-hidden"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-xl border border-primary/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-secondary">
                    Send Your Blessings
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                    Live Guest Wall
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-secondary/70 text-xs font-semibold uppercase tracking-wider block mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John & Ancy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-muted/40 border border-primary/20 rounded-xl px-4 py-2.5 text-secondary text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-secondary/70 text-xs font-semibold uppercase tracking-wider block mb-1">
                      Relationship
                    </label>
                    <select
                      value={formData.relation}
                      onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                      className="w-full bg-muted/40 border border-primary/20 rounded-xl px-4 py-2.5 text-secondary text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="Family">Family</option>
                      <option value="Friend">Friend</option>
                      <option value="Colleague">Colleague</option>
                      <option value="Well-wisher">Well-wisher</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-secondary/70 text-xs font-semibold uppercase tracking-wider block mb-1">
                    Your Prayer / Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Write a sweet prayer, marriage wish, or blessings..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-muted/40 border border-primary/20 rounded-xl p-3 text-secondary text-sm focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Send size={15} />
                  <span>Post Blessing to Wall</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {wishes.map((wish, index) => {
            const isLiked = likedIds[wish.id];

            return (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(4,57,39,0.05)] border border-primary/15 flex flex-col justify-between relative group hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(212,175,55,0.1)] transition-all duration-400"
              >
                {/* Decorative Gold Quote Symbol */}
                <div className="text-primary text-5xl font-serif absolute top-4 right-6 opacity-20 group-hover:opacity-40 transition-opacity select-none pointer-events-none">
                  &ldquo;
                </div>

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                    {wish.relation}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-secondary/40 font-medium">
                    {wish.date}
                  </span>
                </div>

                {/* Blessing Message */}
                <p className="text-secondary/80 font-serif italic text-base sm:text-lg mb-6 leading-relaxed flex-grow">
                  &ldquo;{wish.message}&rdquo;
                </p>

                {/* Footer with Author & Heart Reaction */}
                <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-secondary text-sm sm:text-base">
                      {wish.name}
                    </h4>
                  </div>

                  {/* Amen / Heart button */}
                  <button
                    onClick={() => handleLike(wish.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      isLiked
                        ? "bg-rose-50 text-rose-600 border border-rose-200"
                        : "bg-muted/50 text-secondary/60 hover:text-primary hover:bg-primary/5 border border-transparent"
                    }`}
                    title="Send Amen / Love"
                  >
                    <Heart
                      size={13}
                      className={isLiked ? "fill-rose-500 text-rose-500" : "text-secondary/40"}
                    />
                    <span>{wish.likes}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blessings;
