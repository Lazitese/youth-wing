
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const MedemerChallenges = () => {
  return (
    <section className="py-10">
      <div className="container-gov">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-gov-medium/10 to-transparent rounded-2xl p-8 md:p-12 overflow-hidden border border-gov-medium/10 shadow-lg"
        >
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-gov-accent/5 rounded-full blur-xl animate-float-delay" />
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gov-dark mb-8 relative inline-block group"
          >
            መደመር የአስተሳሰብ ሳንካዎች
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gov-medium transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {[
              "ዋልታ - ረገጥነት",
              "ጊዜ ታካኪነት",
              "አቅላይነት",
              "ሙያን መናቅ",
              "ሞገደኝነት፣ ፌዘኝነት እና አድርባይነት"
            ].map((challenge, index) => (
              <motion.div 
                key={challenge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gov-medium/10 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gov-medium/5 rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-110 transition-all duration-500" />
                
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 bg-gov-medium/10 p-3 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-gov-medium" />
                  </div>
                  <h3 className="font-semibold text-lg text-gov-dark">{challenge}</h3>
                  <div className="w-12 h-1 bg-gov-medium/40 rounded-full mt-4 group-hover:w-16 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MedemerChallenges;
