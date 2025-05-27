import { motion } from "framer-motion";
import { Target, Award, TrendingUp, Globe, Layers, Users, Heart, Sprout, UserCheck } from "lucide-react";

const PartyVisionStructure = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative">
      {/* Simple background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ 
          backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Subtle decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gov-blue/10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gov-gold/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
      {/* Vision Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block py-2 px-5 rounded-full text-sm font-medium bg-gov-blue/10 text-gov-blue mb-4">
              <Target className="inline-block w-4 h-4 mr-2" />
              የብልጽግና ራዕይ
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ለአዲሲቷ <span className="text-gov-blue">ኢትዮጵያ</span> ራዕያችን
            </h2>
            
            <div className="w-16 h-1 bg-gov-gold mx-auto mb-4"></div>
          </div>

          {/* Simplified Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline center line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gov-blue/20"></div>
            
            {[
              { 
                year: "2018", 
                text: "ከተስፋ ብርሀን ወደ ሚጨበጥ ብርሀን መሸጋገር", 
                icon: <Target className="w-5 h-5" />,
                color: "bg-blue-500"
              },
              { 
                year: "2023", 
                text: "የአፍሪካ የብልፅግና ተምሳሌት መሆን", 
                icon: <Award className="w-5 h-5" />,
                color: "bg-purple-500"
              },
              { 
                year: "2040", 
                text: "በአለም አቀፍ ደረጃ ስመጥር የሆነች የብልፅግና ተምሳሌት ሀገር መሆን", 
                icon: <TrendingUp className="w-5 h-5" />,
                color: "bg-gov-gold"
              }
                ].map((item, index) => (
              <motion.div
                    key={index}
                initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-16 sm:pl-20 mb-12 last:mb-0"
              >
                      {/* Year Circle */}
                <div className="absolute left-0 top-0 transform flex items-center justify-center">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${item.color} text-white z-10`}>
                    <span className="font-bold text-xs sm:text-sm">በ{item.year}</span>
                  </div>
                      </div>
                      
                      {/* Content Card */}
                <div className="bg-white rounded-lg p-4 sm:p-5 shadow-md border border-gray-100/80">
                        <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${item.color} text-white flex-shrink-0`}>
                            {item.icon}
                          </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">ራዕይ {index + 1}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{item.text}</p>
                    </div>
                        </div>
                        
                  {/* Simple progress indicator */}
                  <div className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden">
                          <motion.div 
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: index === 0 ? "100%" : index === 1 ? "65%" : "30%" }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                        </div>
                      </motion.div>
                ))}
          </div>
      </div>

      {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100/80">
            <div className="p-8 sm:p-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="mb-6 inline-flex">
                  <div className="px-5 py-2 bg-gov-blue/10 rounded-full">
                    <h3 className="text-lg font-semibold text-gov-blue">ተልዕኮአችን</h3>
                  </div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                  <span className="relative">
                    የበለፀገች <span className="text-gov-gold">ኢትዮጵያን</span> እውን ማድረግ
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gov-gold"></div>
                  </span>
                </h2>
                
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-white shadow-md flex items-center justify-center p-4 border border-gov-gold/20 mb-6">
                  <Globe className="w-8 h-8 text-gov-blue" />
                </div>
                
                <p className="text-gray-600 max-w-2xl mx-auto">
                  ብልፅግና ፓርቲ የሁሉም ዜጎች ተጠቃሚነት የሚረጋገጥበት፣ በአንድነት ላይ የተመሰረተች የበለፀገች ኢትዮጲያን ለመገንባት የሚተጋ ድርጅት ነው።
                </p>
            </div>
            </div>
          </div>
      </div>

      {/* Principles Section */}
        <div>
          <div className="text-center mb-12">
            <span className="inline-block py-2 px-5 rounded-full text-sm font-medium bg-gov-gold/10 text-gov-gold mb-4">
              <Layers className="inline-block w-4 h-4 mr-2" />
              መሰረታዊ መርሆች
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              የብልጽግና ፓርቲ <span className="text-gov-blue">መርሆች</span>
            </h2>
            
            <div className="w-16 h-1 bg-gov-gold mx-auto mb-4"></div>
      </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "ህዝባዊነት",
                icon: <Users className="w-5 h-5" />,
                color: "bg-blue-500",
              },
              {
                title: "ልማትና ፍትሃዊ ተጠቃሚነት",
                icon: <Sprout className="w-5 h-5" />,
                color: "bg-green-500",
              },
              {
                title: "የሴቶች ማህበራዊ ተሳትፎ",
                icon: <UserCheck className="w-5 h-5" />,
                color: "bg-purple-500",
              },
              {
                title: "የወጣቶች ተሳትፎ",
                icon: <Users className="w-5 h-5" />,
                color: "bg-orange-500",
              },
              {
                title: "የህብረተሰቡ አንደኛነት",
                icon: <Heart className="w-5 h-5" />,
                color: "bg-gov-blue",
              },
              {
                title: "የሀገር አንደኛነት",
                icon: <Globe className="w-5 h-5" />,
                color: "bg-gov-gold",
              }
            ].map((principle, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md border border-gray-100/80 overflow-hidden"
              >
                <div className={`h-1 ${principle.color}`}></div>
                <div className="p-4 sm:p-5 flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full ${principle.color} text-white flex items-center justify-center mb-3`} style={{ display: 'flex' }}>
                    {principle.icon}
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">
                    {principle.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartyVisionStructure;
