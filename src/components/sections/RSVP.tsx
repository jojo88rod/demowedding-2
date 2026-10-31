"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  MessageCircle,
  Ticket,
  Sparkles,
  Users,
  Check,
  X,
} from "lucide-react";
import InvitePassModal from "@/components/ui/InvitePassModal";
import confetti from "canvas-confetti";

const RSVP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "2",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    confetti({
      particleCount: 160,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#fcf6ba", "#043927", "#ffffff"],
    });
  };

  const handleWhatsApp = () => {
    const text = `Hi Elias & Sarah! I'm ${
      formData.name || "a guest"
    }. I'll ${
      formData.attending === "yes" ? "be joyfully attending" : "regretfully not be able to attend"
    } your wedding celebration on Dec 25, 2026. Guests: ${
      formData.guests
    }. ${formData.message ? `Message: "${formData.message}"` : ""}`;
    window.open(`https://wa.me/910000000000?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section
      id="rsvp"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-secondary relative overflow-hidden scroll-mt-20 text-white"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary rounded-full blur-[180px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>Honored Presence</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 font-normal"
          >
            Are You Coming?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium"
          >
            Kindly RSVP by November 30, 2026
          </motion.p>
        </div>

        {/* RSVP Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6 sm:space-y-8"
              >
                {/* Attending Toggle Selector */}
                <div className="space-y-3">
                  <label className="text-white/80 text-xs uppercase tracking-[0.2em] font-semibold block">
                    Will You Attend?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: "yes" })}
                      className={`py-3.5 px-5 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-center gap-2.5 ${
                        formData.attending === "yes"
                          ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                          : "bg-white/5 border-white/20 text-white/75 hover:bg-white/10 hover:border-white/40"
                      }`}
                    >
                      <Check size={16} />
                      <span>Yes, Joyfully Attending!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: "no" })}
                      className={`py-3.5 px-5 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-center gap-2.5 ${
                        formData.attending === "no"
                          ? "bg-white/20 text-white border-white/50 shadow-md"
                          : "bg-white/5 border-white/20 text-white/75 hover:bg-white/10 hover:border-white/40"
                      }`}
                    >
                      <X size={16} />
                      <span>Regretfully Declining</span>
                    </button>
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-white/80 text-xs uppercase tracking-[0.2em] font-semibold block">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                      placeholder="e.g. Dr. Thomas Isaac"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/80 text-xs uppercase tracking-[0.2em] font-semibold block">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                      placeholder="e.g. thomas@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Guests Stepper & Attending Status */}
                <div className="space-y-2">
                  <label className="text-white/80 text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                    <Users size={14} className="text-primary" />
                    <span>Number of Guests Attending</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {["1", "2", "3", "4", "5+"].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: num })}
                        className={`flex-1 min-w-[50px] py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                          formData.guests === num
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-white/80 text-xs uppercase tracking-[0.2em] font-semibold block">
                    Message / Blessings for the Couple
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
                    placeholder="Share your prayers or warm congratulations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Buttons Row */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex-1 bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(212,175,55,0.35)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit My RSVP</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#20ba5a] transition-all flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <MessageCircle size={17} />
                    <span>WhatsApp RSVP</span>
                  </button>
                </div>

                {/* Direct Pass Link Pill */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPassOpen(true)}
                    className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors uppercase tracking-wider font-semibold underline underline-offset-4"
                  >
                    <Ticket size={14} />
                    <span>Already RSVP&apos;d? Generate your VIP WhatsApp Pass here</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 sm:py-14 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto text-primary">
                  <CheckCircle2 size={44} />
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-white mb-2">
                    Thank You, {formData.name || "Dear Guest"}!
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Your response has been warmly received. We thank God for your love and cannot wait to celebrate together!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setIsPassOpen(true)}
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl uppercase tracking-widest text-xs font-bold shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:bg-primary/90 transition-all"
                  >
                    <Ticket size={16} />
                    <span>Download WhatsApp Invite Pass</span>
                  </button>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-white/60 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors py-2 px-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    Edit Response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Personalized WhatsApp Invite Pass Modal */}
      <InvitePassModal
        isOpen={isPassOpen}
        onClose={() => setIsPassOpen(false)}
        defaultName={formData.name}
      />
    </section>
  );
};

export default RSVP;
