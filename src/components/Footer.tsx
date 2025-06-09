import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { label: "መነሻ", href: "/" },
    { label: "ስለ እኛ", href: "/sle-egna" },
    { label: "ተግባራት", href: "/projects" },
    { label: "አግኙን", href: "/contact" },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const contactInfo = [
    { icon: <Phone className="h-5 w-5 text-gov-gold" />, content: "+251 118-279-600" },
    { icon: <Mail className="h-5 w-5 text-gov-gold" />, content: "info@prosperityparty.org" },
    { icon: <MapPin className="h-5 w-5 text-gov-gold" />, content: "አቃቂ ቃሊቲ ክፍለ ከተማ" },
  ];
  
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2b4a] via-[#143a63] to-[#1f4e89]" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gov-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-gov-gold/10 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gov-gold/5 blur-[80px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Logo and info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center h-14 w-14 bg-white/15 backdrop-blur-sm rounded-xl shadow-inner border border-white/10 overflow-hidden">
              <img 
                src="/images/Logo Beltsegena.jpg" 
                  alt="Prosperity Party Logo"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div className="font-bold text-xl text-white">
                <span className="text-gov-gold">ብልጽግና</span>{" "}
                <span className="text-white">ፓርቲ</span>
              </div>
            </div>
            
            <p className="text-white/80 mb-8 leading-relaxed">
            የወጣቶችን የፖለቲካ ኢኮኖሚያዊ ተሳትፎ የማረጋገጥ ጉዳይ የብልጽግና ፓርቲ ዋነኛ ተግባር ሲሆን ለወጣቶች የወጣቶችና በወጣቶች የተገነባ ፓርቲ ከመሆኑ አንጻር ለወጣቶች ልዩ ትኩረት ይሰጣል።
            </p>
            
            <div className="mt-auto">
              <div className="h-px w-16 bg-gov-gold/40 mb-6"></div>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Column 2: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-white font-bold text-lg mb-6">
              አግኙን
            </h3>
            
            <div className="space-y-5">
              {contactInfo.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm shadow-inner border border-white/5">
                    {item.icon}
                  </div>
                  <span className="text-white/90 font-medium">{item.content}</span>
                </motion.div>
              ))}
          </div>
          </motion.div>
          
          {/* Column 3: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-white font-bold text-lg mb-6">
              ፈጣን ማገናኛዎች
            </h3>
            
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-gov-gold transition-colors duration-300 py-2 block"
                  >
                    <div className="flex items-center gap-2 group">
                      <div className="h-1 w-3 rounded-full bg-gov-gold/50 group-hover:w-5 transition-all duration-300"></div>
                      <span className="font-medium">{link.label}</span>
              </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        
        {/* Divider with gold accent */}
        <div className="relative h-px w-full bg-white/10 mb-8">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gov-gold/50 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
        </div>
        
        {/* Bottom copyright section */}
        <div className="text-center text-white/60 text-sm">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} ብልጽግና ፓርቲ - የአቃቂ ቃሊቲ ክፍለ ከተማ ወጣት ክንፍ
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
