
import { useState, useEffect } from "react";
import { MessageSquare, Headphones, Calculator, HelpCircle, X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`fixed right-6 bottom-6 z-40 flex flex-col-reverse items-end space-y-reverse space-y-2 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Floating buttons that appear when menu is open */}
      <div className={`transition-all duration-300 flex flex-col-reverse space-y-2 space-y-reverse items-end ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Button 
          onClick={scrollToTop}
          className="h-12 w-12 rounded-full bg-white text-gov-dark shadow-lg hover:bg-gov-gold hover:text-gov-dark transition-all group"
          size="icon"
          variant="outline"
        >
          <ArrowUp className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="sr-only">Scroll to Top</span>
        </Button>
        
        <Button 
          className="h-12 w-12 rounded-full bg-white text-gov-dark shadow-lg hover:bg-gov-accent hover:text-white transition-all group"
          size="icon"
          variant="outline"
        >
          <Calculator className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="sr-only">Tax Calculator</span>
          <span className="absolute right-full mr-3 bg-white text-gov-dark px-2 py-1 rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
            Tax Calculator
          </span>
        </Button>
        
        <Button 
          className="h-12 w-12 rounded-full bg-white text-gov-dark shadow-lg hover:bg-gov-accent hover:text-white transition-all group"
          size="icon"
          variant="outline"
        >
          <Headphones className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="sr-only">Support Hotline</span>
          <span className="absolute right-full mr-3 bg-white text-gov-dark px-2 py-1 rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
            Support Hotline
          </span>
        </Button>
        
        <Button 
          className="h-12 w-12 rounded-full bg-white text-gov-dark shadow-lg hover:bg-gov-accent hover:text-white transition-all group"
          size="icon"
          variant="outline"
        >
          <HelpCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="sr-only">Help Center</span>
          <span className="absolute right-full mr-3 bg-white text-gov-dark px-2 py-1 rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
            Help Center
          </span>
        </Button>
      </div>
      
      {/* Main floating button - always visible */}
      <Button 
        onClick={toggleMenu}
        className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? "bg-white text-gov-dark rotate-45 hover:bg-gray-100" 
            : "bg-gov-gold text-gov-dark hover:bg-gov-gold-light animate-pulse-soft"
        }`}
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        <span className="sr-only">{isOpen ? "Close Menu" : "Open Support Menu"}</span>
      </Button>
    </div>
  );
};

export default FloatingActionButton;
