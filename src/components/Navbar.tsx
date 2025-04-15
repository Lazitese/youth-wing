
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <a href="#" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gov-dark text-white rounded-md flex items-center justify-center font-display font-bold text-xl">AQ</div>
          <span className={`font-display font-bold text-xl ${isScrolled ? "text-gov-dark" : "text-white"}`}>
            አቃቂ ቃሊቲ <span className="text-gov-accent">ክ/ከተማ</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <a href="#" className="nav-link nav-link-active">መነሻ</a>
          <div className="relative group">
            <button className="nav-link flex items-center">
              የአባላት ምዝገባ <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
              <a href="#" className="block px-4 py-2 text-sm text-gov-dark hover:bg-gov-light/10">አዲስ ምዝገባ</a>
              <a href="#" className="block px-4 py-2 text-sm text-gov-dark hover:bg-gov-light/10">የአባልነት መረጃ</a>
              <a href="#" className="block px-4 py-2 text-sm text-gov-dark hover:bg-gov-light/10">ምርጫዎች</a>
              <a href="#" className="block px-4 py-2 text-sm text-gov-dark hover:bg-gov-light/10">መመሪያዎች</a>
            </div>
          </div>
          <a href="#" className="nav-link">ጥቆማ</a>
          <a href="#" className="nav-link">ሰነዶች</a>
          <a href="#" className="nav-link">ስለ እኛ</a>
          <a href="#" className="nav-link">አግኙን</a>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="animate-pulse-soft">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-gov-accent rounded-full flex items-center justify-center text-[10px] text-white">3</span>
          </Button>
          <Button className="bg-gov-gold text-gov-dark hover:bg-gov-gold-light transition-colors duration-300">
            ግባ
          </Button>
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
          <a href="#" className="text-gov-dark font-medium py-2 border-b border-gray-100">መነሻ</a>
          <a href="#" className="text-gov-dark font-medium py-2 border-b border-gray-100">የአባላት ምዝገባ</a>
          <a href="#" className="text-gov-dark font-medium py-2 border-b border-gray-100">ጥቆማ</a>
          <a href="#" className="text-gov-dark font-medium py-2 border-b border-gray-100">ሰነዶች</a>
          <a href="#" className="text-gov-dark font-medium py-2 border-b border-gray-100">ስለ እኛ</a>
          <a href="#" className="text-gov-dark font-medium py-2 border-b border-gray-100">አግኙን</a>
          <Button className="w-full bg-gov-gold text-gov-dark hover:bg-gov-gold-light">
            ግባ
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
