
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-gov flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gov-dark text-white rounded-md flex items-center justify-center font-display font-bold text-xl">AQ</div>
          <span className={`font-display font-bold text-xl ${isScrolled ? "text-gov-dark" : "text-white"}`}>
            አቃቂ ቃሊቲ <span className="text-gov-accent">ክ/ከተማ</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`nav-link ${isScrolled ? "text-gov-gold" : "text-white"} nav-link-active hover:text-gov-gold-light`}>መነሻ</Link>
          <Link to="/abalat-mzgeba" className={`nav-link ${isScrolled ? "text-gov-gold" : "text-white"} hover:text-gov-gold-light`}>የአባላት ምዝገባ</Link>
          <Link to="/qreta" className={`nav-link ${isScrolled ? "text-gov-gold" : "text-white"} hover:text-gov-gold-light`}>ጥቆማ</Link>
          <Link to="/projects" className={`nav-link ${isScrolled ? "text-gov-gold" : "text-white"} hover:text-gov-gold-light`}>ፕሮጀክቶች</Link>
          <Link to="/sle-egna" className={`nav-link ${isScrolled ? "text-gov-gold" : "text-white"} hover:text-gov-gold-light`}>ስለ እኛ</Link>
          <Link to="/contact" className={`nav-link ${isScrolled ? "text-gov-gold" : "text-white"} hover:text-gov-gold-light`}>አግኙን</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden rounded-md p-2 bg-gov-dark text-white hover:bg-gov-medium transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white absolute w-full left-0 shadow-md transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <div className="container-gov py-4 flex flex-col space-y-4">
          <Link to="/" className="text-gov-gold font-medium py-2 border-b border-gray-100">መነሻ</Link>
          <Link to="/abalat-mzgeba" className="text-gov-gold font-medium py-2 border-b border-gray-100">የአባላት ምዝገባ</Link>
          <Link to="/qreta" className="text-gov-gold font-medium py-2 border-b border-gray-100">ጥቆማ</Link>
          <Link to="/projects" className="text-gov-gold font-medium py-2 border-b border-gray-100">ፕሮጀክቶች</Link>
          <Link to="/sle-egna" className="text-gov-gold font-medium py-2 border-b border-gray-100">ስለ እኛ</Link>
          <Link to="/contact" className="text-gov-gold font-medium py-2 border-b border-gray-100">አግኙን</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
