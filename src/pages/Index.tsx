
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import AboutUs from "@/components/AboutUs";
import PartyVisionStructure from "@/components/PartyVisionStructure";
import Projects from "@/components/Projects";
import Principles from "@/components/Principles";
import MedemerFundamentals from "@/components/MedemerFundamentals";
import MedemerChallenges from "@/components/MedemerChallenges";
import MedemerPillars from "@/components/MedemerPillars";

const Index = () => {
  // Change page title on mount
  useEffect(() => {
    document.title = "የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ የሴቶች ክንፍ";
    
    // Apply brand colors to the body
    document.body.classList.add("bg-brand-white");
  }, []);

  return (
    <div className="min-h-screen bg-brand-white">
      <Navbar />
      <Hero />
      <PartyVisionStructure />
      <MedemerFundamentals />
      <MedemerChallenges />
      <MedemerPillars />
      <Stats />
      <Services />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
