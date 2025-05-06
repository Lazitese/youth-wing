import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Target, Award, TrendingUp } from "lucide-react";

const PartyVisionStructure = () => {
  return (
    <section className="py-20">
      {/* Vision Section */}
      <div className="container-gov mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-gov-dark to-gov-medium rounded-2xl p-8 md:p-12 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow" />
          </div>
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float" />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-white/5 rounded-full blur-xl animate-float-delay" />
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-8 relative flex items-center"
          >
            <span className="relative inline-block group">
              የፓርቲ ራዕይ
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gov-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
            <Target className="ml-3 w-6 h-6 text-gov-gold opacity-80" />
          </motion.h2>
          
          <div className="text-white/90 text-lg md:text-xl leading-relaxed space-y-6 animate-fade-in-up">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-semibold text-gov-gold border-l-4 border-gov-gold pl-4 transform hover:translate-x-1 transition-transform duration-300"
            >
              የብልፅግና ፓርቲ ራዕይ
            </motion.p>
            
            {/* Timeline */}
            <div className="relative pt-6 pb-2">
              {/* Timeline Line */}
              <div className="absolute left-[30px] top-8 bottom-0 w-1 bg-gov-gold/30 rounded-full"></div>
              
              <ul className="list-none space-y-12 relative">
                {[
                  {year: "2018", text: "ከተስፋ ብርሀን ወደ ሚጨበጥ ብርሀን መሸጋገር", icon: <CheckCircle2 className="w-5 h-5" />},
                  {year: "2023", text: "የአፍሪካ የብልፅግና ተምሳሌት መሆን", icon: <Award className="w-5 h-5" />},
                  {year: "2040", text: "በአለም አቀፍ ደረጃ ስመጥር የሆነች የብልፅግና ተምሳሌት ሀገር መሆን", icon: <TrendingUp className="w-5 h-5" />}
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                  >
                    {/* Timeline Connector */}
                    {index < 2 && (
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                        viewport={{ once: true }}
                        className="absolute left-[30px] top-[60px] w-1 bg-gov-gold/50 z-[1]"
                        style={{ height: "calc(100% - 30px)" }}
                      />
                    )}
                    
                    <div className="flex group">
                      {/* Year Circle */}
                      <div className="relative z-10">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-[60px] h-[60px] bg-gov-dark border-4 border-gov-gold rounded-full flex items-center justify-center shadow-lg group-hover:shadow-gov-gold/20 transition-all duration-300"
                        >
                          <span className="font-bold text-white text-sm">በ{item.year}</span>
                        </motion.div>
                      </div>
                      
                      {/* Content Card */}
                      <motion.div 
                        whileHover={{ y: -5, x: 5 }}
                        className="flex-1 ml-6 bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gov-gold/20 rounded-full text-gov-gold">
                            {item.icon}
                          </div>
                          <p className="pt-1 font-medium">{item.text}</p>
                        </div>
                        
                        <div className="w-full flex justify-end mt-3">
                          <motion.div 
                            whileHover={{ x: 5 }}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gov-gold/20 text-gov-gold cursor-pointer"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="container-gov mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-tr from-gov-gold/20 to-gov-gold/5 border border-gov-gold/20 rounded-2xl p-8 md:p-12 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-gov-gold/5 rounded-full blur-xl animate-float-delay" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gov-dark mb-6 relative inline-block group"
              >
                አጠቃላይ አላማ
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gov-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-700 text-lg md:text-2xl leading-relaxed font-semibold border-l-4 border-gov-gold pl-4 transform hover:translate-x-1 transition-transform duration-300"
              >
                የበለፀገች ኢትዮጵያን እውን ማድረግ!
              </motion.p>
            </div>
            <div className="flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-48 h-48 md:w-64 md:h-64 bg-gov-gold/10 rounded-full flex items-center justify-center shadow-lg"
              >
                <div className="w-36 h-36 md:w-48 md:h-48 bg-gov-gold/20 rounded-full pulse-animation" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Principles Section */}
      <div className="container-gov mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-gov-dark/5 to-gov-medium/5 rounded-2xl shadow-lg border border-gov-gold/10"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-gov-accent/10 rounded-bl-full" />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-gov-gold/5 rounded-full blur-xl animate-float-delay" />
          <div className="relative p-8 md:p-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gov-dark mb-6 relative inline-block group"
            >
              መርሆች
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gov-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-700 text-lg md:text-xl leading-relaxed font-semibold border-l-4 border-gov-gold pl-4 mb-8 transform hover:translate-x-1 transition-transform duration-300"
            >
              ብልፅግና ፓርቲ መርሆች
            </motion.p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                "ህዝባዊነት",
                "ልማትና ፍትሃዊ ተጠቃሚነት", 
                "ዴሞክራሲያዊነት", 
                "ተግባራዊ እውነታ", 
                "የህግ የበላይነት", 
                "ሀገራዊ አንድነት ህብረ ብሔራዊነት"
              ].map((principle, index) => (
                <motion.div 
                  key={principle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className={cn(
                    "p-6 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent",
                    index % 3 === 0 ? "bg-gov-gold/10 hover:border-gov-gold/30" : 
                    index % 3 === 1 ? "bg-gov-accent/10 hover:border-gov-accent/30" : 
                    "bg-gov-dark/10 hover:border-gov-dark/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white",
                      index % 3 === 0 ? "bg-gov-gold/80" : 
                      index % 3 === 1 ? "bg-gov-accent/80" : 
                      "bg-gov-dark/80"
                    )}>
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{principle}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="container-gov mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-gov-accent/10 to-transparent rounded-2xl p-8 md:p-12 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-gov-accent/5 rounded-full blur-xl animate-float" />
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gov-dark mb-6 relative inline-block group"
          >
            እሴቶች
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gov-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-700 text-lg md:text-xl leading-relaxed font-semibold border-l-4 border-gov-accent pl-4 mb-8 transform hover:translate-x-1 transition-transform duration-300"
          >
            የብልፅግና ፓርቲ እሴቶች
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "የዜጎች ክብር",
              "ነዓነት",
              "ፍትሃዊነት",
              "ህብረ ብሄራዊ ወንድማማችነት እህትማማችነት",
              "መከባበር መቻቻል",
              "ህብረ ብሄራዊ አንድነት",
              "አሳታፊነት",
              "ግልፀኝነትና ተጠያቂነት ናቸው፡፡"
            ].map((value, index) => (
              <motion.div 
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={cn(
                  "p-6 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent",
                  index % 4 === 0 ? "bg-gov-gold/10 hover:border-gov-gold/30" : 
                  index % 4 === 1 ? "bg-gov-accent/10 hover:border-gov-accent/30" : 
                  index % 4 === 2 ? "bg-gov-dark/10 hover:border-gov-dark/30" :
                  "bg-gov-medium/10 hover:border-gov-medium/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "min-w-8 h-8 mt-1 rounded-full flex items-center justify-center text-white",
                    index % 4 === 0 ? "bg-gov-gold/80" : 
                    index % 4 === 1 ? "bg-gov-accent/80" : 
                    index % 4 === 2 ? "bg-gov-dark/80" :
                    "bg-gov-medium/80"
                  )}>
                    <span className="font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gov-dark">{value}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Medemer Fundamentals Section */}
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
    </section>
  );
};

export default PartyVisionStructure;
