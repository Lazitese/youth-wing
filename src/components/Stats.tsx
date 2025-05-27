import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Star, Award, Shield } from "lucide-react";

const stats = [
  {
    value: 29777,
    label: "የአባላት ቁጥር",
    icon: Users,
    color: "text-gov-blue",
    bgColor: "bg-gov-blue/10",
    borderColor: "border-gov-blue/20",
  },
  {
    value: 807,
    label: "የብልፅግና ቤተሰብ",
    icon: Star,
    color: "text-gov-gold",
    bgColor: "bg-gov-gold/10",
    borderColor: "border-gov-gold/20",
  },
  {
    value: 131,
    label: "የብልፅግና ህብረት",
    icon: Award,
    color: "text-gov-blue",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    value: 42,
    label: "የሴቶች አመራር",
    icon: Shield,
    color: "text-gov-gold",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  }
];

const StatCard = ({ value, label, icon: Icon, color, bgColor, borderColor, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const duration = 1500; // 1.5 seconds

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [value, isVisible]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white backdrop-blur-md rounded-lg shadow-lg overflow-hidden border ${borderColor}`}
    >
      <div className={`h-2 ${bgColor}`}></div>
      <div className="p-6 flex flex-col items-center">
        <div className={`${color} ${bgColor} p-3 rounded-full mb-4`}>
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
        
        <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {count.toLocaleString()}
        </div>
        
        <div className="text-center text-gray-600 font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ 
          backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            የብልፅግና ፓርቲ የሴቶች ክንፍ <span className="text-gov-blue">በቁጥር</span>
          </h2>
          <div className="w-16 h-1 bg-gov-gold mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            የኛ ቁርጠኝነት ለብልፅግና ዕድገት፣ ለዜጎች እኩልነት እና ለሁሉም ዜጎች ተሳትፎ በማህበረሰባችን ውስጥ ለውጥ እያመጣ ይገኛል
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} {...stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
