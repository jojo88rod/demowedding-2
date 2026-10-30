import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import MusicPlayer from "@/components/ui/MusicPlayer";
import Branding from "@/components/ui/Branding";
import Preloader from "@/components/ui/Preloader";
import ScrollToTop from "@/components/ui/ScrollToTop";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elias-sarah-wedding.vercel.app"),
  title: "Elias & Sarah | Holy Matrimony | Kerala Christian Wedding",
  description: "Join us in celebrating the union of Elias and Sarah. December 25, 2026, Kochi, Kerala. Official Wedding Invitation and Portfolio.",
  openGraph: {
    title: "Elias & Sarah Wedding",
    description: "Join us in celebrating the union of Elias and Sarah.",
    images: ["/images/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${cormorant.variable} antialiased`}>
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <MusicPlayer />
        <ScrollToTop />
        <Branding />
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}
