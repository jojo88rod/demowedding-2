import Hero from "@/components/sections/Hero";
import Invitation from "@/components/sections/Invitation";
import OurJourney from "@/components/sections/OurJourney";
import Story from "@/components/sections/Story";
import Couple from "@/components/sections/Couple";
import Gallery from "@/components/sections/Gallery";
import RSVP from "@/components/sections/RSVP";
import Venue from "@/components/sections/Venue";
import Blessings from "@/components/sections/Blessings";
import CandleLighting from "@/components/sections/CandleLighting";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Invitation />
      <OurJourney />
      <Story />
      <Couple />
      <Venue />
      <CandleLighting />
      <Gallery />
      <RSVP />
      <Blessings />
    </div>
  );
}
