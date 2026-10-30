"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";

const RSVP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "1",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#043927", "#ffffff"]
    });
  };

  const handleWhatsApp = () => {
    const text = `Hi Elias & Sarah, I'm ${formData.name}. I'll ${formData.attending === 'yes' ? 'be attending' : 'not be able to attend'} your wedding. Guests: ${formData.guests}. Message: ${formData.message}`;
    window.open(`https://wa.me/910000000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="rsvp" className="py-24 px-6 bg-secondary relative overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-[150px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Are You Coming?</h2>
          <p className="text-white/60 uppercase tracking-widest text-sm">Please RSVP by November 30, 2026</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm uppercase tracking-widest">Your Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm uppercase tracking-widest">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm uppercase tracking-widest">Will you attend?</label>
                    <select
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                      value={formData.attending}
                      onChange={(e) => setFormData({...formData, attending: e.target.value})}
                    >
                      <option value="yes" className="bg-secondary">Yes, I&apos;ll be there!</option>
                      <option value="no" className="bg-secondary">Regretfully, No</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm uppercase tracking-widest">Number of Guests</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm uppercase tracking-widest">Message for the Couple</label>
                  <textarea
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors h-32 resize-none"
                    placeholder="Leave a sweet note..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-4">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex-1 bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit RSVP</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#20ba5a] transition-all flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="flex justify-center mb-6">
                  <CheckCircle2 size={80} className="text-primary" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4">Thank You!</h3>
                <p className="text-white/70 text-lg">
                  Your RSVP has been received. We can&apos;t wait to celebrate with you!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-primary uppercase tracking-widest text-sm font-bold border-b border-primary"
                >
                  Edit Response
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
