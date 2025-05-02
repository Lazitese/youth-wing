
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import AboutUs from "@/components/AboutUs";
import PartyVisionStructure from "@/components/PartyVisionStructure";
import Projects from "@/components/Projects";

const Index = () => {
  // Change page title on mount
  useEffect(() => {
    document.title = "የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    
    // Apply brand colors to the body
    document.body.classList.add("bg-brand-white");
  }, []);

  return (
    <div className="min-h-screen bg-brand-white">
      <Navbar />
      <Hero />
      <AboutUs />
      <PartyVisionStructure />
      <Services />
      <Projects />
      <Stats />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
