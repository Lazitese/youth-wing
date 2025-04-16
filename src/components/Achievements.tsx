
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Achievements = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const achievements = [
    {
      id: 1,
      title: "የሴቶች የገቢ ማስገኛ ስልጠና",
      description: "በአምስት ወረዳዎች ውስጥ 500+ ሴቶች በተለያዩ የገቢ ማስገኛ ስልጠናዎች ላይ ተሳትፈዋል",
      image: "/placeholder.svg",
      stats: "500+ ሴቶች"
    },
    {
      id: 2,
      title: "ለሴት ተማሪዎች የትምህርት ቁሳቁስ ድጋፍ",
      description: "ከ1000 በላይ ለሆኑ ሴት ተማሪዎች የትምህርት ቁሳቁስን በነጻ የማደል ፕሮግራም ተካሂዷል",
      image: "/placeholder.svg",
      stats: "1000+ ተማሪዎች"
    },
    {
      id: 3,
      title: "የሴቶች ጤና ግንዛቤ ማስጨበጫ",
      description: "በ10 ወረዳዎች ውስጥ የተካሄደ የሴቶችን ጤና በተመለከተ ግንዛቤ ለማስጨበጥ የተዘጋጀ ፕሮግራም",
      image: "/placeholder.svg",
      stats: "2000+ ሴቶች"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gov-gold/5"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gov-accent/5"></div>
      </div>
      
      <div className="container-gov relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4 relative inline-block">
            <span className="text-gov-accent">የእስካሁን ድርሻችን</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gov-gold to-transparent"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ቅርንጫፍ ጽ/ቤት ያስመዘገባቸው ውጤቶች
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={achievement.image} 
                  alt={achievement.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-6 border-t border-gray-100">
                <div className="bg-gov-gold/20 text-gov-dark rounded-full px-3 py-1 text-sm font-medium inline-block mb-4">
                  {achievement.stats}
                </div>
                <h3 className="text-xl font-bold text-gov-dark mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/achievements">
            <Button className="btn-primary px-8 py-6 relative overflow-hidden group" size="lg">
              <span className="relative z-10">ሁሉንም ውጤቶች ይመልከቱ</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gov-accent to-gov-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
