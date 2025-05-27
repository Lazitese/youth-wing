import { GlobeIcon, Briefcase, Scale, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const partyPrograms = [
  {
    id: 1,
    title: "የዴሞክራሲ አቅጣጫ",
    description:
      "ትብብርና ውድድር ላይ የተመሰረተ ለብዝሀነት እና በህብረ ብሔራዊነት የተለየ ቦታ የሚሰጥ የመግባባት ዴሞክራሲ ነው፡፡",
    icon: Scale,
    color: "#3B82F6",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
    shadow: "shadow-blue-500/30",
  },
  {
    id: 2,
    title: "የፖለቲካ ስርአት",
    description:
      "በህገ መንግስታችን ላይ የተመለከተውን አውነተኛ የመድብለ ፓርቲ እና ህብረ ብሄራዊ የፌደራል ስርዓት ነው፡፡",
    icon: Landmark,
    color: "#7C3AED",
    gradientFrom: "from-purple-500",
    gradientTo: "to-purple-600",
    shadow: "shadow-purple-500/30",
  },
  {
    id: 3,
    title: "የኢኮኖሚ ስርአት",
    description:
      "የዜጎች ፍትሃዊ ተጠቃሚነት ማእከል ያደረገ የመንግስት ጣልቃ ገብነት የሚፈቅድ አካታች ካፒታሊዝም ነው፡፡",
    icon: Briefcase,
    color: "#10B981",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-600",
    shadow: "shadow-emerald-500/30",
  },
  {
    id: 4,
    title: "የውጭ ግንኙነት",
    description:
      "በትብብር በፉክክር መሃል ሚዛን የሚጠብቅ ነው ለዜጎች ክብር በቅድሚያ የሚሰጥ ነው ብሄራዊ ጥቅም የሚያስጠብቅ ነው ጎረቤት ሀገራትን የሚያስቀድም ነው፡፡",
    icon: GlobeIcon,
    color: "#F59E0B",
    gradientFrom: "from-amber-400",
    gradientTo: "to-amber-600",
    shadow: "shadow-amber-500/30",
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden bg-slate-50/50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Clean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50/20" />
        
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gov-blue/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gov-blue/20 to-transparent" />
        
        {/* Professional background elements */}
        <div className="absolute right-0 top-20 w-[50vw] h-[50vw] bg-gov-blue/5 rounded-full blur-[120px] opacity-60" />
        <div className="absolute -left-40 bottom-20 w-[60vw] h-[60vw] bg-gov-gold/5 rounded-full blur-[130px] opacity-50" />
        </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Single clear header */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 relative inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-gov-blue">የብልጽግና ፓርቲ</span> <span className="text-gov-dark">ፕሮግራሞች</span>
            <motion.div 
              className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-gov-blue to-gov-gold rounded-full"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.h2>
        </motion.div>
        
        {/* Professional Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {partyPrograms.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Professional Card Design */}
                <div className="relative h-full rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:translate-y-[-8px]">
                  {/* Accent Top Border */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo}`} />
                  
                  <div className="p-6 md:p-8">
                    {/* Program icon with subtle effects */}
                    <div className="mb-5 md:mb-6">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-opacity-10 border border-opacity-20`} 
                        style={{ 
                          backgroundColor: `${program.color}10`,
                          borderColor: program.color 
                        }}>
                        <Icon className="w-8 h-8" style={{ color: program.color }} />
                      </div>
                  </div>
                  
                    {/* Title - the only visible text element */}
                    <h3 className="text-xl md:text-2xl font-bold text-gov-dark mb-3 md:mb-4 group-hover:text-gov-blue transition-colors duration-300">
                      {program.title}
                  </h3>
                  
                    {/* Subtle decorative element */}
                    <div className="w-12 h-0.5 bg-gray-200 group-hover:bg-gov-gold transition-colors duration-300 mb-4" />
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
