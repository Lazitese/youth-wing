
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`fixed right-6 bottom-6 z-40 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Scroll to top button */}
      <Button 
        onClick={scrollToTop}
        className="h-14 w-14 rounded-full bg-gov-gold text-gov-dark shadow-lg hover:bg-gov-gold-light hover:text-gov-dark transition-all group"
        size="icon"
      >
        <ArrowUp className="h-6 w-6 transition-transform group-hover:scale-110" />
        <span className="sr-only">Scroll to Top</span>
      </Button>
    </div>
  );
};

export default FloatingActionButton;
