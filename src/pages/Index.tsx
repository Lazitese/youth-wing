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

const Index = () => {
  // Change page title on mount
  useEffect(() => {
    document.title = "የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
  }, []);

  return (
    <div className="min-h-screen">
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
