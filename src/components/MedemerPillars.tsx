import { motion } from "framer-motion";

  const pillars = [
    {
      amharic: "ስርዓት መፍጠር",
      english: "System",
    icon: "⚙️",
      color: "from-blue-500 to-blue-600",
    },
    {
      amharic: "ተባብሮ መኖር",
      english: "Symbiosis",
    icon: "🤝",
    color: "from-purple-500 to-purple-600",
    },
    {
      amharic: "ምሉዕ እይታ",
      english: "Synoptic",
    icon: "👁️",
    color: "from-amber-500 to-amber-600",
    },
    {
      amharic: "መሰናኘት",
    english: "Synergy",
    icon: "🔗",
    color: "from-emerald-500 to-emerald-600",
    },
    {
      amharic: "አስተጻምሮ",
      english: "Synthesis",
    icon: "🧬",
    color: "from-red-500 to-red-600",
  },
];

const MedemerPillars = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(to right, #1e3a8a 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Subtle background shapes */}
        <div className="absolute top-20 right-0 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-20 -left-20 w-[30vw] h-[30vw] bg-purple-500/5 rounded-full blur-[80px] opacity-50" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gov-blue/10 text-gov-blue">
              መደመር 5S
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            የመደመር <span className="text-gov-blue">አምዶች</span>
          </h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-gov-blue mx-auto mb-6"
          />
          </motion.div>

        {/* Improved grid layout with connecting line */}
        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal connecting line for desktop */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gov-blue/20 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.english}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative z-10"
              >
                {/* Enhanced card with better visual hierarchy */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Top accent bar with gradient */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${pillar.color}`} />
                  
                  <div className="p-6 md:p-8 flex flex-col items-center">
                    {/* Number with step marker */}
                    <div className="relative mb-6">
                      {/* Line connector to center dot (visible on mobile) */}
                      {idx < pillars.length - 1 && (
                        <div className="absolute top-1/2 h-0.5 w-10 bg-gov-blue/20 -right-14 hidden md:block" />
                      )}
                      
                      {/* Circle with number */}
                      <div className="w-12 h-12 rounded-full border-2 border-gov-blue bg-white flex items-center justify-center text-gov-blue font-bold text-xl relative z-10">
                        S{idx + 1}
                </div>
                
                      {/* Show dot at center of connecting line for desktop */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gov-blue hidden md:block" />
                    </div>
                    
                    {/* Icon in gradient container */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} shadow-lg flex items-center justify-center text-2xl mb-6`}>
                      {pillar.icon}
                    </div>
                    
                    {/* Text content */}
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {pillar.amharic}
                    </h3>
                    <span className="text-gov-blue text-sm font-medium px-3 py-1 rounded-full bg-gov-blue/10">
                      {pillar.english}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedemerPillars;
