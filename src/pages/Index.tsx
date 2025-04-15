
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import News from "@/components/News";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import AboutUs from "@/components/AboutUs";
import Principles from "@/components/Principles";
import Objectives from "@/components/Objectives";
import Achievements from "@/components/Achievements";

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
      <Principles />
      <Objectives />
      <Services />
      <Achievements />
      <Stats />
      <News />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
