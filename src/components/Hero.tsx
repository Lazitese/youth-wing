
import { useEffect, useRef } from "react";
import { ArrowRight, CircleOff, User, Users, Heart, Award, Star, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Define the floating icon type
type FloatingIcon = {
  icon: LucideIcon;
  size: number;
  position: { x: number; y: number };
  speed: { x: number; y: number };
  color: string;
};

const Hero = () => {
  const particlesContainer = useRef<HTMLDivElement>(null);
  const floatingIconsContainer = useRef<HTMLDivElement>(null);
  const floatingIcons = useRef<FloatingIcon[]>([]);

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
    const intervalParticles = setInterval(() => {
      if (container && document.body.contains(container)) {
        createParticle(container, containerWidth, containerHeight);
      } else {
        clearInterval(intervalParticles);
      }
    }, 800);
    
    // Animate floating icons
    const iconsContainer = floatingIconsContainer.current;
    if (!iconsContainer) return;

    const icons: LucideIcon[] = [User, Users, Heart, Award, Star];
    const colors = ['#ECC94B', '#38B2AC', '#FFFFFF', '#3182CE', '#E53E3E'];

    // Initialize floating icons
    floatingIcons.current = Array(8).fill(0).map(() => ({
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: Math.random() * 24 + 16,
      position: { 
        x: Math.random() * containerWidth, 
        y: Math.random() * containerHeight * 0.7 
      },
      speed: { 
        x: (Math.random() - 0.5) * 0.5, 
        y: (Math.random() - 0.5) * 0.5 
      },
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    // Create and add icons to the DOM
    floatingIcons.current.forEach(iconData => {
      const IconComponent = iconData.icon;
      const iconElement = document.createElement('div');
      iconElement.className = 'absolute transition-transform animate-float';
      iconElement.style.left = `${iconData.position.x}px`;
      iconElement.style.top = `${iconData.position.y}px`;
      
      // Use React's createRoot to render the Lucide icon component
      const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      iconSvg.setAttribute('width', `${iconData.size}`);
      iconSvg.setAttribute('height', `${iconData.size}`);
      iconSvg.setAttribute('stroke', iconData.color);
      iconSvg.setAttribute('fill', 'none');
      iconSvg.setAttribute('stroke-width', '2');
      iconSvg.setAttribute('stroke-linecap', 'round');
      iconSvg.setAttribute('stroke-linejoin', 'round');
      
      // Add paths based on the icon type (simplified approach)
      if (IconComponent === User) {
        iconSvg.innerHTML = `
          <circle cx="${iconData.size/2}" cy="${iconData.size/3}" r="${iconData.size/4}"></circle>
          <path d="M${iconData.size/6} ${iconData.size*0.75} a${iconData.size/3} ${iconData.size/3} 0 0 1 ${iconData.size*2/3} 0"></path>
        `;
      } else if (IconComponent === Heart) {
        iconSvg.innerHTML = `
          <path d="M${iconData.size/2} ${iconData.size*0.8} C${iconData.size*0.3} ${iconData.size*0.6} ${iconData.size*0.1} ${iconData.size*0.4} ${iconData.size*0.2} ${iconData.size*0.3} C${iconData.size*0.3} ${iconData.size*0.2} ${iconData.size*0.4} ${iconData.size*0.2} ${iconData.size/2} ${iconData.size*0.4} C${iconData.size*0.6} ${iconData.size*0.2} ${iconData.size*0.7} ${iconData.size*0.2} ${iconData.size*0.8} ${iconData.size*0.3} C${iconData.size*0.9} ${iconData.size*0.4} ${iconData.size*0.7} ${iconData.size*0.6} ${iconData.size/2} ${iconData.size*0.8}z"></path>
        `;
      } else if (IconComponent === Star) {
        iconSvg.innerHTML = `
          <polygon points="${iconData.size/2},${iconData.size*0.2} ${iconData.size*0.35},${iconData.size*0.65} ${iconData.size*0.1},${iconData.size*0.4} ${iconData.size*0.4},${iconData.size*0.4} ${iconData.size*0.15},${iconData.size*0.65}"></polygon>
        `;
      } else {
        // Default shape for other icons
        iconSvg.innerHTML = `<circle cx="${iconData.size/2}" cy="${iconData.size/2}" r="${iconData.size/3}"></circle>`;
      }
      
      iconElement.appendChild(iconSvg);
      iconsContainer.appendChild(iconElement);
    });

    // Animate floating icons
    let animationFrameId: number;
    const animateIcons = () => {
      const icons = iconsContainer.querySelectorAll('div');
      
      icons.forEach((icon, index) => {
        const iconData = floatingIcons.current[index];
        
        // Update position
        iconData.position.x += iconData.speed.x;
        iconData.position.y += iconData.speed.y;
        
        // Bounce off edges
        if (iconData.position.x <= 0 || iconData.position.x >= containerWidth - iconData.size) {
          iconData.speed.x *= -1;
        }
        
        if (iconData.position.y <= 0 || iconData.position.y >= containerHeight * 0.7 - iconData.size) {
          iconData.speed.y *= -1;
        }
        
        // Apply new position
        icon.style.left = `${iconData.position.x}px`;
        icon.style.top = `${iconData.position.y}px`;
      });
      
      animationFrameId = requestAnimationFrame(animateIcons);
    };
    
    animateIcons();
    
    return () => {
      clearInterval(intervalParticles);
      cancelAnimationFrame(animationFrameId);
    };
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
    <section className="relative min-h-screen bg-gradient-to-br from-gov-dark via-gov-medium to-gov-dark flex items-center justify-center text-white overflow-hidden pt-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gov-gold blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gov-accent blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gov-light blur-3xl"></div>
        </div>
      </div>
      
      {/* Animated Particles */}
      <div ref={particlesContainer} className="particles"></div>
      
      {/* Floating Icons */}
      <div ref={floatingIconsContainer} className="absolute inset-0 pointer-events-none"></div>
      
      <div className="container-gov relative z-10 pt-16 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            የአቃቂ ቃሊቲ ክፍለ ከተማ <span className="text-gov-gold">ብልጽግና ፓርቲ</span> ሴቶች ክንፍ ቅርንጫፍ ጽ/ቤት
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            የሴቶች ኃይልን ማበረታታት፣ አቅምን ማሳደግ፣ የህዝብን ተወካይነት ማሳካት
          </p>
          
          <div className="relative">
            {/* Animated gradient border button */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gov-gold via-gov-accent to-gov-gold rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-soft"></div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/contact">
                <Button className="relative btn-gold px-8 py-6 text-lg group transition-all" size="lg">
                  <span className="relative z-10">አግኙን</span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <span className="absolute inset-0 bg-gradient-to-r from-gov-gold/80 to-gov-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/abalat-mzgeba">
                <Button variant="outline" className="border-white text-gov-accent hover:bg-white/10 px-8 py-6 text-lg relative overflow-hidden group" size="lg">
                  <span className="relative z-10">አባላት ምዝገባ</span>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex flex-wrap justify-center gap-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center space-x-4 group animate-float" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80">አኩሪ አመራር</p>
                <p className="font-semibold group-hover:text-gov-gold transition-colors">ተሳትፎ እና አጋርነት</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 group animate-float" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80">እኩልነት</p>
                <p className="font-semibold group-hover:text-gov-gold transition-colors">የሴቶች ማህበራዊ እኩልነት</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 group animate-float" style={{ animationDelay: "0.6s" }}>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80">መሰረታዊ</p>
                <p className="font-semibold group-hover:text-gov-gold transition-colors">ተጠሪነትና መረጋጋት</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-20" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L48 8.3C96 17 192 33 288 53.3C384 73.7 480 98.3 576 93.3C672 88.3 768 53.7 864 40.7C960 28 1056 37 1152 46.7C1248 56.3 1344 66.7 1392 71.3L1440 76V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
