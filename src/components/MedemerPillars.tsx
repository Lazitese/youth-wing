
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MedemerPillars = () => {
  const pillars = [
    {
      amharic: "ስርዓት መፍጠር",
      english: "System",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      borderColor: "border-blue-400",
      bgColor: "bg-blue-50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      amharic: "ተባብሮ መኖር",
      english: "Symbiosis",
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      borderColor: "border-green-400",
      bgColor: "bg-green-50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      amharic: "ምሉዕ እይታ",
      english: "Synoptic",
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      borderColor: "border-purple-400",
      bgColor: "bg-purple-50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      amharic: "መሰናኘት",
      english: "Synchronization/Synergy",
      color: "from-amber-500 to-amber-600",
      textColor: "text-amber-600",
      borderColor: "border-amber-400",
      bgColor: "bg-amber-50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    },
    {
      amharic: "አስተጻምሮ",
      english: "Synthesis",
      color: "from-rose-500 to-rose-600",
      textColor: "text-rose-600",
      borderColor: "border-rose-400",
      bgColor: "bg-rose-50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-10">
      <div className="container-gov">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-2xl p-8 md:p-12 overflow-hidden shadow-lg border border-gov-gold/10"
        >
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-gov-gold/5 rounded-full blur-xl animate-float" />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-gov-gold/10 rounded-full blur-2xl animate-float-delay" />
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4 inline-block relative">
              የመደመር አምዶች <span className="text-gov-gold">/ 5S</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gov-gold via-gov-accent to-transparent"></div>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              የመደመር አምዶች ብልፅግና ፓርቲ የሚመራበት መሰረታዊ የአስተሳሰብ መዋቅር ነው
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.amharic}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={cn(
                  "flex flex-col items-center p-6 rounded-xl border-2 shadow-lg relative overflow-hidden",
                  pillar.borderColor
                )}
              >
                {/* Background gradient */}
                <div className={cn(
                  "absolute inset-0 opacity-5 bg-gradient-to-br",
                  pillar.color
                )} />
                
                {/* Top accent */}
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r",
                  pillar.color
                )} />
                
                {/* Icon */}
                <div className={cn(
                  "relative w-16 h-16 rounded-full flex items-center justify-center mb-4",
                  pillar.bgColor
                )}>
                  <div className={pillar.textColor}>{pillar.icon}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-1 tracking-tight">{pillar.amharic}</h3>
                <p className={cn("text-sm font-medium", pillar.textColor)}>{pillar.english}</p>
                
                <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-gov-gold to-transparent" />
                
                {/* 5S Badge */}
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gov-gold/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-gov-gold">S{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MedemerPillars;
