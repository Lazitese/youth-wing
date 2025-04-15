
import { Shield, Heart, Scale, Zap, Clock, Users } from "lucide-react";

const Principles = () => {
  const principles = [
    {
      icon: <Shield className="h-10 w-10 text-gov-accent" />,
      title: "አኩሪ አመራር",
      description: "በአርአያነት የሚመራ፣ ግልጽነት ያለው፣ ኃላፊነት የሚሰማው አመራር"
    },
    {
      icon: <Scale className="h-10 w-10 text-gov-accent" />,
      title: "የሴቶች ማህበራዊ እኩልነት",
      description: "በማህበረሰቡ ውስጥ ለሴቶች እኩል ዕድል፣ መብት እና ክብር"
    },
    {
      icon: <Clock className="h-10 w-10 text-gov-accent" />,
      title: "ተጠሪነትና መረጋጋት",
      description: "ለህዝብ ተጠሪ የሆነ፣ የሕግ የበላይነትን የሚያከብር አሰራር"
    },
    {
      icon: <Zap className="h-10 w-10 text-gov-accent" />,
      title: "የሴቶች ኃይል እና እውቀት",
      description: "የሴቶችን እውቀት፣ ሙያ እና ችሎታ ለማጎልበት የሚደረግ ጥረት"
    },
    {
      icon: <Users className="h-10 w-10 text-gov-accent" />,
      title: "የፖለቲካ ተሳትፎ",
      description: "በፖለቲካ ውሳኔ አሰጣጥ ላይ የሴቶችን ድምጽ ማሰማት"
    },
    {
      icon: <Heart className="h-10 w-10 text-gov-accent" />,
      title: "እኩልነት በቤተሰብ እና ሥራ",
      description: "በቤተሰብ እና በሥራ ቦታ ላይ እኩልነትን ማስፈን"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-gov">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
            የብልፅግና ፓርቲ <span className="text-gov-accent">መሠረታዊ መርሆች</span>
          </h2>
          <p className="text-gray-600">
            በቃሊቲ ክፍለ ከተማ ሴቶች ክንፍ ሥራዎቻችን የሚመሩባቸው መሠረታዊ እሴቶች እና አቅጣጫዎች
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="bg-gov-light/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                {principle.icon}
              </div>
              <h3 className="text-xl font-bold text-gov-dark mb-3">{principle.title}</h3>
              <p className="text-gray-600">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Principles;
