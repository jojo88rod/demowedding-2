import React from "react";
import { Heart, Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-28 md:py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
        <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center">
          <Heart className="text-primary fill-primary w-6 h-6" />
        </div>

        <div className="space-y-4">
          <p className="font-serif italic text-2xl md:text-3xl text-primary/80">
            &ldquo;I have found the one whom my soul loves.&rdquo;
          </p>
          <p className="text-xs uppercase tracking-[0.3em] font-bold">Song of Solomon 3:4</p>
        </div>

        <div className="h-px w-24 bg-primary/30" />

        <div className="flex flex-col md:flex-row items-center gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-primary transition-colors flex items-center space-x-2">
            <Instagram size={18} />
            <span>@eliasandsarah</span>
          </a>
          <a href="tel:+910000000000" className="hover:text-primary transition-colors flex items-center space-x-2">
            <Phone size={18} />
            <span>+91 98765 43210</span>
          </a>
        </div>

        <div className="pt-8 border-t border-white/5 w-full max-w-lg mx-auto flex flex-col items-center space-y-4">
           <div className="flex items-center gap-4 text-primary/40">
              <div className="h-[1px] w-8 bg-primary/20" />
              <span className="text-sm">†</span>
              <div className="h-[1px] w-8 bg-primary/20" />
           </div>
           <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-white/60">
             DESIGNED & DEVELOPED BY <span className="text-white font-bold">JOJO</span>
           </p>
           <a 
             href="https://instagram.com/jojo_77_z" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all gold-glow group"
           >
             <Instagram size={14} className="text-primary group-hover:scale-110 transition-transform" />
             <span className="text-[9px] uppercase tracking-widest font-bold">@jojo_77_z</span>
           </a>
        </div>

        <p className="text-white/20 text-[9px] uppercase tracking-widest">
          &copy; 2026 Elias & Sarah Wedding. All Rights Reserved.
        </p>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-6 gap-8 h-full">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="border-r border-white/10 h-full" />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
