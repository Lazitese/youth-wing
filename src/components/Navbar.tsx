import { useState, useEffect } from "react";
import { Menu, X, User, FileText, Home, Users, Mail, BookOpen, Calendar, Image, Briefcase, FolderGit2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation items with icons for better visual hierarchy
  const navItems = [
    { path: "/", label: "መነሻ", icon: Home },
    { path: "/sle-egna", label: "ስለ እኛ", icon: Users },
    { path: "/abalat-mzgeba", label: "አባላት ምዝገባ", icon: FileText },
    { path: "/projects", label: "ፕሮጀክቶች", icon: FolderGit2 },
    { path: "/library", label: "ቤተመጻሕፍት", icon: BookOpen },
    { path: "/jobs", label: "ስራዎች", icon: Briefcase },
    { path: "/contact", label: "አግኙን", icon: Mail },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-6xl rounded-2xl shadow-xl transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 dark:bg-gov-dark/95 backdrop-blur-lg border border-white/40 dark:border-white/10" 
            : "bg-white/80 dark:bg-gov-dark/80 backdrop-blur-md border border-white/20 dark:border-white/5"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-white/80 dark:bg-gov-dark/80 rounded-xl shadow-md border border-white/40 dark:border-gov-dark/40 overflow-hidden"
            >
            <img
              src="/images/Logo Beltsegena.jpg"
              alt="Prosperity Party Logo"
                className="h-8 w-8 md:h-10 md:w-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>
            <div className="font-display font-extrabold text-lg md:text-xl text-gov-dark dark:text-white tracking-tight drop-shadow-sm overflow-hidden">
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gov-gold inline-block"
              >
                ብልጽግና
              </motion.span>
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-gov-gold inline-block ml-1"
              >
                ፓርቲ
              </motion.span>
          </div>
        </Link>

        {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                  className="relative"
                >
                <Link 
                    to={item.path} 
                    className={`
                      px-2 lg:px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5
                      ${isActive(item.path) 
                        ? 'text-gov-blue dark:text-gov-gold font-semibold' 
                        : 'text-gov-dark/80 dark:text-white/80 hover:text-gov-blue dark:hover:text-gov-gold'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gov-gold via-gov-gold/80 to-gov-gold rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                </Link>
                </motion.div>
              );
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="md:hidden rounded-xl p-2 text-gov-dark hover:shadow-md transition-all duration-300 bg-gradient-to-r from-gov-gold/90 to-gov-gold border border-gov-gold/40"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu - Animated */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden relative w-full bg-white/95 dark:bg-gov-dark/95 shadow-lg border-t border-gray-200 dark:border-gray-800 backdrop-blur-lg overflow-hidden z-40"
            >
              <div className="py-3 flex flex-col space-y-1 px-4">
                {/* Home and other main navigation */}
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link 
                        to={item.path} 
                        className={`
                          flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium transition-all duration-200
                          ${isActive(item.path) 
                            ? 'bg-gov-gold/20 text-gov-blue dark:text-gov-gold font-semibold' 
                            : 'text-gov-dark/90 dark:text-white/90 hover:bg-gov-gold/10 hover:text-gov-blue dark:hover:text-gov-gold'
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Contact option */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                >
                  <Link 
                    to="/contact" 
                    className={`
                      flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium transition-all duration-200
                      ${isActive('/contact') 
                        ? 'bg-gov-gold/20 text-gov-blue dark:text-gov-gold font-semibold' 
                        : 'text-gov-dark/90 dark:text-white/90 hover:bg-gov-gold/10 hover:text-gov-blue dark:hover:text-gov-gold'
                      }
                    `}
                  >
                    <Mail className="h-5 w-5" />
                    <span>አግኙን</span>
                  </Link>
                </motion.div>
        </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gov-gold/10 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gov-blue/10 rounded-full blur-lg"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      </div>
  );
};

export default Navbar;
