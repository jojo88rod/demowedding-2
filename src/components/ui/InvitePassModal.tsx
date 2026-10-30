"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, Calendar, Sparkles, Check, Ticket } from "lucide-react";

interface InvitePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
}

const InvitePassModal: React.FC<InvitePassModalProps> = ({
  isOpen,
  onClose,
  defaultName = "",
}) => {
  const [guestName, setGuestName] = useState(defaultName || "Honored Guest & Family");
  const [guestType, setGuestType] = useState<"Family" | "Couple" | "Individual">("Family");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Generate Canvas Pass
  const generateCanvasImage = (): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const width = 800;
    const height = 1120;
    canvas.width = width;
    canvas.height = height;

    // Background Gradient (Deep Kerala Christian Emerald & Night)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#031d14");
    bgGradient.addColorStop(0.5, "#052d20");
    bgGradient.addColorStop(1, "#02150e");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle radial gold glow
    const radial = ctx.createRadialGradient(width / 2, 220, 10, width / 2, 220, 350);
    radial.addColorStop(0, "rgba(212, 175, 55, 0.15)");
    radial.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    // Outer Gold Double Border
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(42, 42, width - 84, height - 84);

    // Corner Ornaments
    const drawCorner = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(25, 0);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 25);
      ctx.stroke();

      ctx.fillStyle = "#d4af37";
      ctx.beginPath();
      ctx.arc(8, 8, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawCorner(50, 50, 0);
    drawCorner(width - 50, 50, Math.PI / 2);
    drawCorner(width - 50, height - 50, Math.PI);
    drawCorner(50, height - 50, -Math.PI / 2);

    // Header Latin Cross †
    ctx.textAlign = "center";
    ctx.fillStyle = "#d4af37";
    ctx.font = "28px serif";
    ctx.fillText("†", width / 2, 95);

    // Header Label
    ctx.font = "600 13px sans-serif";
    ctx.letterSpacing = "4px";
    ctx.fillStyle = "rgba(212, 175, 55, 0.9)";
    ctx.fillText("HOLY MATRIMONY • OFFICIAL GUEST PASS", width / 2, 130);

    // Monogram Crest
    ctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, 210, 48, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(width / 2, 210, 54, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = "italic 38px serif";
    ctx.fillStyle = "#d4af37";
    ctx.letterSpacing = "1px";
    ctx.fillText("E & S", width / 2, 222);

    // Couple Names
    ctx.font = "italic 54px serif";
    ctx.fillStyle = "#ffffff";
    ctx.letterSpacing = "1px";
    ctx.fillText("Elias & Sarah", width / 2, 310);

    // Gold Divider Line
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, 335);
    ctx.lineTo(width / 2 + 140, 335);
    ctx.stroke();

    ctx.fillStyle = "#d4af37";
    ctx.beginPath();
    ctx.arc(width / 2, 335, 4, 0, Math.PI * 2);
    ctx.fill();

    // Guest Banner Box
    const boxY = 370;
    const boxHeight = 180;
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.fillRect(80, boxY, width - 160, boxHeight);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(80, boxY, width - 160, boxHeight);

    ctx.font = "600 12px sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillStyle = "#d4af37";
    ctx.fillText("CORDIALLY INVITING OUR HONORED GUEST", width / 2, boxY + 40);

    // Guest Name
    ctx.font = "italic bold 36px serif";
    ctx.fillStyle = "#ffffff";
    ctx.letterSpacing = "0px";
    const displayName = guestName.trim() || "Beloved Guest";
    ctx.fillText(displayName, width / 2, boxY + 95);

    // Guest Category Badge
    ctx.font = "600 11px sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillStyle = "rgba(212, 175, 55, 0.85)";
    ctx.fillText(`CATEGORY: ${guestType.toUpperCase()} INVITATION`, width / 2, boxY + 140);

    // Date & Venue Details Section
    ctx.font = "600 14px sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillStyle = "#d4af37";
    ctx.fillText("FRIDAY, DECEMBER 25, 2026", width / 2, 600);

    // Ceremony Box
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.fillRect(80, 630, width - 160, 110);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.strokeRect(80, 630, width - 160, 110);

    ctx.font = "600 11px sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillStyle = "#d4af37";
    ctx.fillText("CHURCH CEREMONY • 10:00 AM IST", width / 2, 665);

    ctx.font = "20px serif";
    ctx.fillStyle = "#ffffff";
    ctx.letterSpacing = "0.5px";
    ctx.fillText("St. Mary's Cathedral Basilica, Marine Drive, Kochi", width / 2, 700);

    // Reception Box
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.fillRect(80, 760, width - 160, 110);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.strokeRect(80, 760, width - 160, 110);

    ctx.font = "600 11px sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillStyle = "#d4af37";
    ctx.fillText("EVENING CELEBRATION & DINNER • 06:00 PM IST", width / 2, 795);

    ctx.font = "20px serif";
    ctx.fillStyle = "#ffffff";
    ctx.letterSpacing = "0.5px";
    ctx.fillText("The Leela Kovalam, Thiruvananthapuram", width / 2, 830);

    // Scripture Quote
    ctx.font = "italic 16px serif";
    ctx.fillStyle = "rgba(212, 175, 55, 0.85)";
    ctx.fillText("“I have found the one whom my soul loves.” — Song of Solomon 3:4", width / 2, 915);

    // Barcode / Ticket Badge Footer
    const footerY = 960;
    ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(80, footerY);
    ctx.lineTo(width - 80, footerY);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Fake Barcode lines
    const barcodeX = 90;
    const barcodeY = footerY + 25;
    ctx.fillStyle = "#d4af37";
    const lineWeights = [2, 4, 1, 3, 5, 2, 1, 4, 3, 2, 5, 1, 3, 2, 4, 1, 2, 4, 3, 1, 5, 2, 3, 1, 4];
    let curX = barcodeX;
    for (let i = 0; i < lineWeights.length; i++) {
      ctx.fillRect(curX, barcodeY, lineWeights[i], 35);
      curX += lineWeights[i] + 4;
    }

    ctx.font = "11px monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.textAlign = "right";
    ctx.fillText(`PASS ID: ES-2026-KOCHI`, width - 90, barcodeY + 16);
    ctx.fillText(`VERIFIED WEDDING ACCESS`, width - 90, barcodeY + 34);

    ctx.textAlign = "center";
    ctx.font = "10px sans-serif";
    ctx.letterSpacing = "1px";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("Present this digital invitation on arrival • elias-sarah-wedding.vercel.app", width / 2, height - 55);

    return canvas.toDataURL("image/png");
  };

  // Handle Download
  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const dataUrl = generateCanvasImage();
        if (dataUrl) {
          const link = document.createElement("a");
          const safeName = (guestName || "Guest").replace(/[^a-zA-Z0-9]/g, "_");
          link.download = `Wedding-Invite-Pass_${safeName}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
        }
      } catch (err) {
        console.error("Canvas export failed:", err);
      } finally {
        setIsGenerating(false);
      }
    }, 200);
  };

  // Share to WhatsApp
  const handleWhatsAppShare = () => {
    const name = guestName.trim() || "Friend";
    const text = `✨ *Wedding Invitation Pass for ${name}* ✨\n\nYou are cordially invited to celebrate the Holy Matrimony of *Elias & Sarah*!\n\n📅 *Date:* Friday, December 25, 2026\n⛪ *Ceremony:* St. Mary's Cathedral, Marine Drive, Kochi (10:00 AM)\n🌴 *Reception:* The Leela Kovalam (06:00 PM)\n\nView the full wedding website & details here:\nhttps://elias-sarah-wedding.vercel.app\n\n_With love, prayers & blessings!_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Download .ics Calendar File
  const handleDownloadCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Elias and Sarah//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:elias-sarah-wedding-20261225",
      "DTSTAMP:20261030T120000Z",
      "DTSTART:20261225T043000Z",
      "DTEND:20261225T163000Z",
      "SUMMARY:Elias & Sarah Wedding | Holy Matrimony & Reception",
      "DESCRIPTION:Join us for the Holy Matrimony of Elias & Sarah.\\nCeremony: 10:00 AM at St. Mary's Cathedral, Kochi\\nReception: 06:00 PM at The Leela Kovalam.\\nWebsite: https://elias-sarah-wedding.vercel.app",
      "LOCATION:St. Mary's Cathedral Basilica, Marine Drive, Kochi, Kerala",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Elias & Sarah Wedding Tomorrow!",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Elias-Sarah-Wedding-Dec25.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-[#031d14] border border-[#d4af37]/40 rounded-3xl shadow-[0_0_80px_rgba(212,175,55,0.25)] overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20 bg-white/5">
              <div className="flex items-center space-x-2.5">
                <Ticket className="text-[#d4af37]" size={22} />
                <span className="font-serif text-lg md:text-xl text-white">
                  Personalized WhatsApp Invite Pass
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">
                    Create Your Official Pass
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Personalize your wedding badge with your name or family title. Download as a high-resolution keepsake card or share directly to WhatsApp.
                  </p>
                </div>

                {/* Input Name */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#d4af37] font-bold block">
                    Guest / Family Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. The Kurian Family / Dr. Thomas"
                    maxLength={40}
                    className="w-full bg-white/10 border border-[#d4af37]/40 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                  />
                </div>

                {/* Guest Type Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#d4af37] font-bold block">
                    Invitation Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Family", "Couple", "Individual"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setGuestType(type)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                          guestType === type
                            ? "bg-[#d4af37] text-[#031d14] border-[#d4af37] shadow-lg font-bold"
                            : "bg-white/5 text-white/70 border-white/10 hover:border-[#d4af37]/50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  {/* Download Image Button */}
                  <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="w-full bg-[#d4af37] hover:bg-[#e5c158] text-[#031d14] font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 text-xs uppercase tracking-widest transition-all shadow-lg gold-glow disabled:opacity-50"
                  >
                    {downloadSuccess ? (
                      <>
                        <Check size={18} />
                        <span>Pass Downloaded!</span>
                      </>
                    ) : isGenerating ? (
                      <div className="w-5 h-5 border-2 border-[#031d14] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download size={18} />
                        <span>Download Invite Pass (Image)</span>
                      </>
                    )}
                  </button>

                  {/* Share to WhatsApp */}
                  <button
                    onClick={handleWhatsAppShare}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 text-xs uppercase tracking-widest transition-all shadow-lg"
                  >
                    <Share2 size={18} />
                    <span>Share on WhatsApp</span>
                  </button>

                  {/* Add to Calendar */}
                  <button
                    onClick={handleDownloadCalendar}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-6 rounded-xl flex items-center justify-center space-x-2 text-xs uppercase tracking-wider transition-all border border-white/15"
                  >
                    <Calendar size={16} className="text-[#d4af37]" />
                    <span>Add to Calendar (.ics)</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Card Column */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#031d14] via-[#052d20] to-[#02150e] p-6 border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)] relative overflow-hidden text-center text-white">
                  {/* Subtle Shimmer background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

                  {/* Inner Dashed Border */}
                  <div className="border border-[#d4af37]/40 p-4 rounded-xl relative">
                    <span className="text-[#d4af37] text-2xl font-serif block mb-1">†</span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#d4af37] font-bold block mb-3">
                      Holy Matrimony Guest Pass
                    </span>

                    {/* Monogram */}
                    <div className="w-14 h-14 mx-auto rounded-full border border-[#d4af37]/60 flex items-center justify-center mb-3 bg-[#d4af37]/10">
                      <span className="font-serif italic text-[#d4af37] text-xl font-bold">ES</span>
                    </div>

                    <h4 className="font-serif italic text-3xl text-white mb-2">Elias & Sarah</h4>
                    <div className="w-16 h-px bg-[#d4af37]/40 mx-auto mb-4" />

                    {/* Personalized Guest Badge */}
                    <div className="bg-white/5 border border-[#d4af37]/30 rounded-lg p-3 mb-4">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#d4af37] font-bold block mb-1">
                        Cordially Inviting
                      </span>
                      <p className="font-serif italic text-xl text-white font-bold truncate">
                        {guestName.trim() || "Honored Guest"}
                      </p>
                      <span className="text-[8px] uppercase tracking-wider text-white/50 block mt-0.5">
                        {guestType} Invitation • All Events
                      </span>
                    </div>

                    {/* Date & Location */}
                    <div className="space-y-2 text-left bg-black/20 p-3 rounded-lg border border-white/5 text-[10px]">
                      <div>
                        <span className="text-[#d4af37] font-bold uppercase tracking-wider block">When:</span>
                        <span className="text-white/90">Friday, December 25, 2026</span>
                      </div>
                      <div>
                        <span className="text-[#d4af37] font-bold uppercase tracking-wider block">Ceremony:</span>
                        <span className="text-white/80">St. Mary&apos;s Cathedral, Kochi (10:00 AM)</span>
                      </div>
                      <div>
                        <span className="text-[#d4af37] font-bold uppercase tracking-wider block">Reception:</span>
                        <span className="text-white/80">The Leela Kovalam (06:00 PM)</span>
                      </div>
                    </div>

                    {/* Live Ticket Stub Footer */}
                    <div className="mt-4 pt-3 border-t border-dashed border-[#d4af37]/30 flex items-center justify-between text-[9px] text-white/50">
                      <span className="font-mono">PASS: ES-2026-KOCHI</span>
                      <span className="flex items-center gap-1 text-[#d4af37]">
                        <Sparkles size={11} />
                        <span>Verified Guest</span>
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-white/40 uppercase tracking-widest mt-3">
                  Live Preview • Generates HD Card (800 × 1120 px)
                </span>
              </div>
            </div>

            {/* Hidden canvas for PNG rendering */}
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InvitePassModal;
