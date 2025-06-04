import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface BackgroundDecorationProps {
  className?: string;
}

const BackgroundDecoration = ({ className }: BackgroundDecorationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create animated decorative elements
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up any existing elements
    const existingElements = containerRef.current.querySelectorAll('.decoration-element');
    existingElements.forEach(el => el.remove());
    
    // Create new decorative elements
    const count = 5; // Reduced number of decorative elements
    const colors = [
      'rgba(31, 140, 215, 0.06)', // brand-blue (more subtle)
      'rgba(249, 220, 47, 0.05)', // brand-yellow (more subtle)
      'rgba(102, 187, 106, 0.05)', // green (more subtle)
      'rgba(249, 220, 47, 0.03)', // brand-yellow lighter (more subtle)
    ];
    
    for (let i = 0; i < count; i++) {
      const element = document.createElement('div');
      element.className = 'decoration-element absolute rounded-full';
      
      // Random size between 80px and 250px (slightly smaller)
      const size = Math.floor(Math.random() * 170) + 80;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      // Random position (avoid clustering at the top)
      element.style.left = `${Math.floor(Math.random() * 100)}%`;
      element.style.top = `${Math.floor(Math.random() * 80) + 10}%`; // Keep decorations away from the very top
      
      // Random color
      const colorIndex = Math.floor(Math.random() * colors.length);
      element.style.backgroundColor = colors[colorIndex];
      
      // Random blur (increased blur for more subtlety)
      const blur = Math.floor(Math.random() * 60) + 40;
      element.style.filter = `blur(${blur}px)`;
      
      // Reduced opacity
      element.style.opacity = '0.3';
      
      // Random z-index (keeping it below content)
      element.style.zIndex = '-1';
      
      // Animation with CSS
      const duration = Math.floor(Math.random() * 20) + 20;
      element.style.animation = `float ${duration}s ease-in-out infinite`;
      
      containerRef.current.appendChild(element);
    }
    
    return () => {
      // Clean up
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.decoration-element');
        elements.forEach(el => el.remove());
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`pointer-events-none overflow-hidden absolute inset-0 z-0 ${className || ''}`}
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Grid decoration - more subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(31,140,215,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(31,140,215,0.02)_1px,transparent_1px)] bg-[size:35px_35px] z-[-1] opacity-60"></div>
      
      {/* Static decorations - smaller and more subtle */}
      <motion.div 
        className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-gradient-to-tr from-brand-blue/4 to-transparent z-[-1]"
        animate={{ 
          scale: [1, 1.04, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute -top-8 -left-8 w-64 h-64 rounded-full bg-gradient-to-br from-brand-yellow/4 to-transparent z-[-1]"
        animate={{ 
          scale: [1, 1.02, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
    </div>
  );
};

export default BackgroundDecoration; 