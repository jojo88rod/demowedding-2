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
    <div className="flex flex-col min-h-screen h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <div className="snap-start"><Hero /></div>
      <div className="snap-start"><Invitation /></div>
      <div className="snap-start"><OurJourney /></div>
      <div className="snap-start"><Story /></div>
      <div className="snap-start"><Couple /></div>
      <div className="snap-start"><Venue /></div>
      <div className="snap-start"><CandleLighting /></div>
      <div className="snap-start"><Gallery /></div>
      <div className="snap-start"><RSVP /></div>
      <div className="snap-start"><Blessings /></div>
    </div>
  );
}
