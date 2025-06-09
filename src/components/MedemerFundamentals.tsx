import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, AlertTriangle, AlertCircle } from "lucide-react";

const fundamentals = [
            {
              title: "የጋራ ግብ", 
              content: "የመደመር አንዱ መሰረታዊ ጉዳይ ነው ስንል መደመር ልዩነቱን ተሻግሮ ለጋራ አላማ እና ጥቅም መሰለፍ ስለሚመርጥ ነው፡፡"
            },
            {
              title: "አልፎ ሂያጅነት", 
              content: "መደመርን በሩቁ አይቶ ማለፍ የመደመር ዕሳቤ ሰምቶ በቸልተኝነት መዝለል በሀገር ጉዳይ የውጪ ታዛቢ መሆን ራስን እንደ መንገደኛ ወይም አንደ ባይተዋር መመልከት ነው፡፡"
            },
            {
              title: "ተነሳሽነት", 
              content: "ማለት ማንኛውም ግለሰብ ወይም ንዑስ ሥርዓት ከአካባቢው ጋር በሚደረገው ግንኙነት ውስጥ የግንኙነት ለኳሽ መሆን ማለት ነው፡፡"
            },
            {
              title: "ቤተኛነት", 
              content: " ሰዎች መደመር የራሳቸው እሳቤ የሚያደርጉበት ደረጃ ነው፡፡"
            },
];

const challenges = [
  {
    title: "ህሊና ቢስነት",
    content: "ለጋራ ጥቅም ማሰብ እና መስራት ከሌለ የመደመር ፍልስፍና ተግባራዊ ማድረግ አስቸጋሪ ይሆናል። ግለሰባዊ ፍላጎትን ከጋራ ዓላማ በላይ ማስቀደም የመደመርን መንፈስ ይጻረራል።"
  },
  {
    title: "ልግመኝነት",
    content: "ለጋራ አላማ የሚደረግ ጥረት ውጤታማ እንዳይሆን እንቅፋት የሚሆን ባህሪ ነው። የግል ጥቅምን ብቻ በማሰብ ሌሎችን ችላ ማለት የመደመርን መሰረታዊ አላማ ያሰናክላል።"
  }
];

const MedemerFundamentals = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(to right, #1e3a8a 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
        
        {/* Background gradient */}
        <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-gov-blue/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-gov-gold/5 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-40 w-[30vw] h-[30vw] bg-gov-blue/5 rounded-full blur-[80px] opacity-60" />
        <div className="absolute -left-20 bottom-40 w-[40vw] h-[40vw] bg-gov-gold/5 rounded-full blur-[100px] opacity-40" />
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
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gov-blue/10 text-gov-blue">
                መሰረታዊ መርሆዎች
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gov-dark mb-6"
            >
              <span className="text-gov-blue">የመደመር</span> መሰረታውያን
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-gov-gold mx-auto mb-8"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 text-lg"
            >
              የመደመር ፍልስፍና የሚመሰረትባቸው ዋና ዋና መሰረታዊ ጉዳዮች
            </motion.p>
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {fundamentals.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 relative group hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Number indicator */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gov-blue flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 border-t-[24px] border-r-[24px] border-t-gov-gold/20 border-r-transparent" />
              
              <div className="mb-4 flex items-center">
                <div className="p-2.5 rounded-lg bg-gov-blue/10 mr-4">
                  <CheckCircle className="w-6 h-6 text-gov-blue" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gov-dark group-hover:text-gov-blue transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                {item.content}
              </p>
              
              {/* Animated border bottom */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gov-blue to-gov-gold"
              />
            </motion.div>
          ))}
        </div>
        
        {/* Challenges Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 md:mt-40"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-600">
                ሳንካዎች
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gov-dark mb-6"
            >
              የመደመር <span className="text-red-600">የግብር ሳንካዎች</span>
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-red-500 mx-auto mb-8"
            />
          </div>
          
          {/* Challenges Cards */}
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex-1 bg-white rounded-lg shadow-lg relative overflow-hidden group"
              >
                {/* Top accent bar */}
                <div className="h-2 bg-gradient-to-r from-red-500 to-red-600 w-full" />
                
                <div className="p-8">
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-600 font-bold">{index + 1}</span>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="p-3 rounded-full bg-red-500/10 mr-4 flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-red-700 mt-2">
                      {challenge.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 mb-6 pl-16">
                    {challenge.content}
                  </p>
                  
                  {/* Decorative element */}
                  <div className="w-full h-0.5 bg-red-100" />
                  
                  <div className="mt-4 flex justify-end">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="py-1.5 px-4 rounded-full text-xs font-medium bg-red-500/10 text-red-600 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>መጠንቀቂያ</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-red-500/5 rounded-full blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-red-500/5 rounded-full blur-lg" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </section>
  );
};

export default MedemerFundamentals;
