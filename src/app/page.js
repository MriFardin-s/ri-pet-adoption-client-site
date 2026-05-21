import AdoptionEvents from "@/components/Home/AdoptionEvents";
import FeaturedPets from "@/components/Home/FeaturedPets";
import HeroBanner from "@/components/Home/HeroBanner";
import StaticInfo from "@/components/Home/StaticInfo";
import Volunteer from "@/components/Home/Volunteer";



export default function HomePage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <HeroBanner />
      <FeaturedPets />
      <StaticInfo />
      <AdoptionEvents />
      <Volunteer />
    </div>
  );
}