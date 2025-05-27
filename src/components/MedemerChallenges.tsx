import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const challenges = [
  {
    title: "ዋልታ - ረገጥነት",
    color: "from-rose-500 to-rose-600",
    shadow: "shadow-rose-400/20",
  },
  {
    title: "ጊዜ ታካኪነት",
    color: "from-amber-500 to-amber-600",
    shadow: "shadow-amber-400/20",
  },
  {
    title: "አቅላይነት",
    color: "from-purple-500 to-purple-600",
    shadow: "shadow-purple-400/20",
  },
  {
    title: "ሙያን መናቅ",
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-400/20",
  },
  {
    title: "ሞገደኝነት፣ ፌዘኝነት እና አድርባይነት",
    color: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-400/20",
  },
];

const MedemerChallenges = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-slate-50">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(to right, #1e3a8a 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Background gradient */}
        <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-slate-100 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-slate-100 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-40 w-[40vw] h-[40vw] bg-red-500/5 rounded-full blur-[100px] opacity-60" />
        <div className="absolute -left-20 bottom-40 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px] opacity-40" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="text-center max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          viewport={{ once: true }}
              className="inline-block mb-4"
        >
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-600">
                ግንዛቤ
              </span>
            </motion.div>
          
          <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
          >
              መደመር <span className="text-red-600">የአስተሳሰብ ሳንካዎች</span>
          </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-red-500 mx-auto mb-8"
            />
          </div>
        </div>
        
        {/* Challenge Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div 
                key={challenge.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Card Header */}
                <div className="p-1">
                  <div className={`w-full h-2 bg-gradient-to-r ${challenge.color}`}></div>
                </div>
                
                <div className="p-6 md:p-8">
                  {/* Icon and Title */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-red-500/10 text-red-600 mr-4">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500 font-medium">
                        ሳንካ {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                        {challenge.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Bottom decoration */}
                  <div className="flex items-center mt-4">
                    <div className="w-full h-px bg-gray-200"></div>
                    <div className="w-2 h-2 rounded-full bg-red-500 ml-1"></div>
                    <div className="w-1 h-1 rounded-full bg-red-500 ml-1"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="inline-block py-3 px-6 rounded-full bg-gray-800/5 text-gray-700 font-medium">
            እነዚህን ሳንካዎች መረዳት የመደመር ፍልስፍና ትግበራን ያሻሽላል
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MedemerChallenges;
