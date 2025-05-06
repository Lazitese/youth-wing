import { useState } from "react";
import { GlobeIcon, Users, Briefcase, Scale, Landmark, Flag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Since we're not installing framer-motion, we'll create a custom component
// that mimics the motion.div with CSS animations
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div
      className="animate-fade-in-up opacity-0"
      style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
};

const partyPrograms = [
  {
    id: 1,
    title: "የዴሞክራሲ አቅጣጫ",
    description: "ትብብርና ውድድር ላይ የተመሰረተ ለብዝሀነት እና በህብረ ብሔራዊነት የተለየ ቦታ የሚሰጥ የመግባባት ዴሞክራሲ ነው፡፡",
    icon: <Scale className="h-8 w-8 text-white" />,
    bgColor: "bg-white",
    iconBgColor: "bg-blue-500",
    borderColor: "border-blue-200",
    hoverBorder: "hover:border-blue-400",
    shadowColor: "shadow-blue-100"
  },
  {
    id: 2,
    title: "የፖለቲካ ስርአት",
    description: "በህገ መንግስታችን ላይ የተመለከተውን አውነተኛ የመድብለ ፓርቲ እና ህብረ ብሄራዊ የፌደራል ስርዓት ነው፡፡",
    icon: <Landmark className="h-8 w-8 text-white" />,
    bgColor: "bg-white",
    iconBgColor: "bg-indigo-500",
    borderColor: "border-indigo-200",
    hoverBorder: "hover:border-indigo-400",
    shadowColor: "shadow-indigo-100"
  },
  {
    id: 3,
    title: "የኢኮኖሚ ስርአት",
    description: "የዜጎች ፍትሃዊ ተጠቃሚነት ማእከል ያደረገ የመንግስት ጣልቃ ገብነት የሚፈቅድ አካታች ካፒታሊዝም ነው፡፡",
    icon: <Briefcase className="h-8 w-8 text-white" />,
    bgColor: "bg-white",
    iconBgColor: "bg-green-500",
    borderColor: "border-green-200",
    hoverBorder: "hover:border-green-400",
    shadowColor: "shadow-green-100"
  },
  {
    id: 4,
    title: "ፖሊሲዎችና ፕሮገራሞች",
    description: "የሚነደፉት ፖሊሲዎች ፕሮገራሞች እና ስትራቴጂዎች በዋናነት ሰው ተኮር ናቸው፡፡",
    icon: <Users className="h-8 w-8 text-white" />,
    bgColor: "bg-white",
    iconBgColor: "bg-purple-500",
    borderColor: "border-purple-200",
    hoverBorder: "hover:border-purple-400",
    shadowColor: "shadow-purple-100"
  },
  {
    id: 5,
    title: "የውጭ ግንኙነት",
    description: "በትብብር በፉክክር መሃል ሚዛን የሚጠብቅ ነው ለዜጎች ክብር በቅድሚያ የሚሰጥ ነው ብሄራዊ ጥቅም የሚያስጠብቅ ነው ጎረቤት ሀገራትን የሚያስቀድም ነው፡፡",
    icon: <GlobeIcon className="h-8 w-8 text-white" />,
    bgColor: "bg-white",
    iconBgColor: "bg-teal-500",
    borderColor: "border-teal-200",
    hoverBorder: "hover:border-teal-400",
    shadowColor: "shadow-teal-100"
  }
];

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="section bg-gray-50 py-20">
      <div className="container-gov">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-gov-gold/20 rounded-full">
            <Star className="h-5 w-5 text-gov-gold mr-2" />
            <span className="text-gov-dark font-medium">የብልፅግና ፓርቲ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
            <span className="text-gov-dark">የብልፅግና ፓርቲ</span>{" "}
            <span className="bg-gradient-to-r from-gov-gold to-amber-400 bg-clip-text text-transparent">
              ፕሮግራም
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-gov-gold to-transparent rounded-full mx-auto mb-8"></div>
          
          <div className="mt-8 p-8 bg-white rounded-xl border border-gov-gold/30 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gov-gold/5 to-transparent"></div>
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-gov-gold/5 rounded-full blur-xl"></div>
            
            <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-gov-gold to-amber-400 rounded-xl flex items-center justify-center shadow-md transform rotate-12 p-4">
              <Flag className="h-10 w-10 text-white transform -rotate-12" />
            </div>
            <p className="text-xl font-medium text-gray-700 relative z-10">
              የብልፅግና ፓርቲ ፕሮግራም ለሃገራችን ዕድገትና ብልጽግና የሚያተኩር የረጅም ጊዜ ራዕይን ያካተተ ነው
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partyPrograms.map((program, index) => (
            <AnimatedCard key={program.id} delay={0.1 * index}>
              <div
                className={`${program.bgColor} rounded-xl ${program.shadowColor} shadow-lg border ${program.borderColor} ${program.hoverBorder} overflow-hidden transition-all duration-300 ${
                  hoveredCard === program.id ? "shadow-xl -translate-y-2" : ""
                }`}
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full"></div>
                
                <div className="p-6 relative">
                  <div className={`w-16 h-16 ${program.iconBgColor} rounded-xl flex items-center justify-center shadow-md mb-6 relative z-10 transform -rotate-6`}>
                    <div className="transform rotate-6">{program.icon}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gov-dark mb-3 flex items-center">
                    <span className="mr-2">{program.title}</span>
                    <div className="w-2 h-2 rounded-full bg-gov-gold"></div>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                  
                  <div className="w-full h-1 bg-gray-100 rounded-full mt-4">
                    <div className={`h-full w-1/2 ${program.iconBgColor} rounded-full`}></div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
