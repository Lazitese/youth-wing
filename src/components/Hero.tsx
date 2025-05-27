import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
 return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
           style={{ 
            backgroundImage: "url('/lovable-uploads/113a8e96-472f-42b6-a819-45ac4521b7c9.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gov-dark/90 via-gov-dark to-gov-blue/90" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-gov-gold/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-gov-blue/10 blur-[120px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="container-gov flex flex-col items-center justify-center text-center relative z-10 px-4 py-20">
        {/* Logo symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="mb-6 relative"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-gov-gold/30 p-1">
            <img
              src="/images/Logo Beltsegena.jpg"
              alt="Prosperity Party Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-gov-gold/30 animate-ping-slow" />
        </motion.div>
        
        {/* Main heading with staggered animation */}
        <div className="mb-6 overflow-hidden">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block overflow-hidden">
              የአቃቂ ቃሊቲ ክፍለ ከተማ
            </div>{" "}
            <div className="inline-block overflow-hidden mt-2">
              <motion.span 
                className="text-gov-gold font-extrabold inline-block" 
                style={{ textShadow: "0 2px 10px rgba(255, 215, 0, 0.4)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                ብልጽግና ፓርቲ
              </motion.span>
            </div>{" "}
            <div className="inline-block overflow-hidden mt-2">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                ሴቶች ክንፍ
              </motion.span>
            </div>
          </motion.h1>
        </div>
        
        {/* Animated underline */}
        <motion.div 
          className="h-1.5 bg-gradient-to-r from-gov-blue via-gov-gold to-gov-blue rounded-full mb-10 w-0"
          initial={{ width: 0 }}
          animate={{ width: "240px" }}
          transition={{ duration: 1, delay: 1.6 }}
        />
        
        {/* Description with animation */}
        <motion.p 
          className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 text-white/90 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          የሴቶችን ኢኮኖሚያዊ፣ ፖለቲካዊ እና ማህበራዊ ተጠቃሚነት ማረጋገጥ
        </motion.p>
        
        {/* Animated buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <Link to="/contact">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                className="bg-gradient-to-r from-gov-gold to-gov-gold/90 hover:from-gov-gold hover:to-gov-gold text-gov-dark px-8 py-7 text-lg font-semibold shadow-lg shadow-gov-gold/20 group transition-all duration-300 border border-gov-gold/20 rounded-xl"
                size="lg"
              >
              <span>አግኙን</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            </motion.div>
          </Link>
          
          <Link to="/abalat-mzgeba">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="border-2 border-white/30 text-gov-blue hover:bg-white/10 hover:border-white/50 px-8 py-7 text-lg font-semibold shadow-md shadow-black/5 group transition-all duration-300 backdrop-blur-sm rounded-xl"
                size="lg"
              >
                <span>አባላት ምዝገባ</span>
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
