
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MedemerFundamentals = () => {
  return (
    <div className="container-gov">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-gov-gold/20 via-gov-gold/10 to-transparent rounded-2xl p-8 md:p-12 overflow-hidden"
      >
        <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-gov-gold/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.15),transparent_60%)] pointer-events-none" />
        
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gov-dark mb-8 relative inline-block group"
        >
          የመደመር መሰረታውያን
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gov-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {[
            {
              title: "የጋራ ግብ", 
              content: "የመደመር አንዱ መሰረታዊ ጉዳይ ነው ስንል መደመር ልዩነቱን ተሸግሮ ሰጋሪ አሳማ አና ጥቅም መሰሰፍ ስለሚመርጥ ነው፡፡"
            },
            {
              title: "አልፎ ሂያጅነት", 
              content: "መደመርን በሩቁ አይቶ ማለፍ የመደመር ዕሳቤ ሰምቶ በቸልተኝነት መዝለል በሀገር ጉዳይ የውጪ ታዛቢ መሆን ራስን አንደ መንገደኛ ወይም አንደ ባይተዋር መመልከት ነው፡፡"
            },
            {
              title: "ተነሳሽነት", 
              content: "ማለት ማንኛውም ግለሰብ ወይም ንዑስ ሥርዓት ከከባቢው ጋር በሚደረገው ግንኙነት ውስጥ የግንኙነት ስኳሽ መሆን ማሰት ነው፡፡"
            },
            {
              title: "ቤተኛነት", 
              content: "ሰዎች መደመር የራሳቸው አሳቤ የሚያደርጉበት ደረጃ ነው፡፡"
            },
          ].map((item, index) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gov-gold/20 relative overflow-hidden group"
            >
              <div className={`absolute ${index % 2 === 0 ? '-top-6 -right-6' : '-bottom-6 -left-6'} w-24 h-24 bg-gov-gold/10 rounded-full opacity-70 group-hover:scale-125 transition-transform duration-500`} />
              <div className="relative">
                <h3 className="text-xl font-bold text-gov-dark mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gov-gold flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="border-b-2 border-gov-gold pb-1">{item.title}</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
                <div className="w-full h-1 bg-gradient-to-r from-gov-gold to-transparent rounded-full mt-4 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MedemerFundamentals;
