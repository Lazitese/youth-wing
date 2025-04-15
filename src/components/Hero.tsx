
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const particlesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create particles
    if (!particlesContainer.current) return;
    
    const container = particlesContainer.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Clear existing particles
    container.innerHTML = "";
    
    // Add particles
    for (let i = 0; i < 30; i++) {
      createParticle(container, containerWidth, containerHeight);
    }
    
    // Set up interval to continuously add particles
    const interval = setInterval(() => {
      if (container && document.body.contains(container)) {
        createParticle(container, containerWidth, containerHeight);
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  const createParticle = (container: HTMLDivElement, width: number, height: number) => {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    // Random position
    const x = Math.random() * width;
    const y = Math.random() * height * 0.7; // Keep particles in upper 70% of container
    
    // Random size
    const size = Math.random() * 8 + 2; // 2-10px
    
    // Set styles
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Add to container
    container.appendChild(particle);
    
    // Remove after animation completes
    setTimeout(() => {
      if (particle.parentNode === container) {
        container.removeChild(particle);
      }
    }, 3000);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gov-dark to-gov-medium flex items-center justify-center text-white overflow-hidden">
      {/* Animated Particles */}
      <div ref={particlesContainer} className="particles"></div>
      
      {/* City Skyline */}
      <div className="city-skyline"></div>
      
      <div className="container-gov relative z-10 pt-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          የአቃቂ ቃሊቲ ክፍለ ከተማ <span className="text-gov-gold">ብልጽግና ፓርቲ</span> ሴቶች ክንፍ ቅርንጫፍ ጽ/ቤት
        </h1>
        
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          የሴቶች ኃይልን ማበረታታት፣ አቅምን ማሳደግ፣ የህዝብን ተወካይነት ማሳካት
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button className="btn-gold px-8 py-6 text-lg group" size="lg">
            <span>አግኙን</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg" size="lg">
            አባላት ምዝገባ
          </Button>
        </div>
        
        <div className="hidden md:flex flex-wrap justify-center gap-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-white/80">አኩሪ አመራር</p>
              <p className="font-semibold">ተሳትፎ እና አጋርነት</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-white/80">እኩልነት</p>
              <p className="font-semibold">የሴቶች ማህበራዊ እኩልነት</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-white/80">መሰረታዊ</p>
              <p className="font-semibold">ተጠሪነትና መረጋጋት</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-float">
        <a href="#services" className="flex flex-col items-center text-white/80 hover:text-white">
          <span className="text-sm mb-2">ታች ይመልከቱ</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
