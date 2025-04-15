import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  // Change page title on mount
  useEffect(() => {
    document.title = "SubCity Government - Official Website";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <News />
      <Contact />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
