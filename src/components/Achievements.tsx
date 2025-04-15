
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Achievements = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const achievements = [
    {
      id: 1,
      title: "የሴቶች የገቢ ማስገኛ ስልጠና",
      description: "በአምስት ወረዳዎች ውስጥ 500+ ሴቶች በተለያዩ የገቢ ማስገኛ ስልጠናዎች ላይ ተሳትፈዋል",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1984&q=80",
      stats: "500+ ሴቶች"
    },
    {
      id: 2,
      title: "ለሴት ተማሪዎች የትምህርት ቁሳቁስ ድጋፍ",
      description: "ከ1000 በላይ ለሆኑ ሴት ተማሪዎች የትምህርት ቁሳቁስን በነጻ የማደል ፕሮግራም ተካሂዷል",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      stats: "1000+ ተማሪዎች"
    },
    {
      id: 3,
      title: "የሴቶች ጤና ግንዛቤ ማስጨበጫ",
      description: "በ10 ወረዳዎች ውስጥ የተካሄደ የሴቶችን ጤና በተመለከተ ግንዛቤ ለማስጨበጥ የተዘጋጀ ፕሮግራም",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      stats: "2000+ ሴቶች"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-gov">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
            <span className="text-gov-accent">የእስካሁን ድርሻችን</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ቅርንጫፍ ጽ/ቤት ያስመዘገባቸው ውጤቶች
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={achievement.image} 
                  alt={achievement.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="bg-gov-gold/20 text-gov-dark rounded-full px-3 py-1 text-sm font-medium inline-block mb-4">
                  {achievement.stats}
                </div>
                <h3 className="text-xl font-bold text-gov-dark mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <Button variant="ghost" className="text-gov-accent hover:text-gov-accent/80 hover:bg-gov-accent/5 px-0 group">
                  ተጨማሪ ይመልከቱ
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/achievements">
            <Button className="btn-primary px-8 py-6" size="lg">
              ሁሉንም ውጤቶች ይመልከቱ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
