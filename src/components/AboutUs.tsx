import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const leadershipData = [
    {
      name: "ሜሮን መንግስቱ ከበደ",
      position: "በአቃቂ ቃሊቲ ክ/ ከተማ የሴቶች ክንፍ ጽ ቤት ኃላፊ",
      experience: "በአመራርነት የቆይታ ግዜ 9 ዓመት",
      image: "/images/ሜሮን.jpg"
    },
    {
      name: "አያንቱ ሰጉ",
      position: "በአቃቂ ቃሊቲ ክ/ ከተማ ሴቶች ክንፍ ምክትል ኃላፊ",
      experience: "የአመራርነት የቆይታ ግዜ 5 ዓመት",
      image: "/images/አያንቱ.jpg"
    },
    {
      name: "ሰርካለም በዙ",
      position: "በአቃቂ ቃሊቲ ክ/ከተማ የሴቶች ክንፍ አደረጃጀት ዘርፍ ኃላፊ",
      experience: "የአመራርነት የቆይታ ግዜ 7 ዓመት",
      image: "/images/ሰርካለም.jpg"
    },
    {
      name: "ሀይማኖት ደገፉ",
      position: "በአቃቂ ቃሊቲ ክ/ ከተማ ሴቶች ክንፍ የስራ አስፈጻሚ አባል",
      experience: "የአመራርነት የቆይታ ግዜ 4 ዓመት",
      image: "/images/ሀይማኖት.jpg"
    },
    {
      name: "ሂሩት ወንዳፍራሽ",
      position: "በአቃቂ ቃሊቲ ክ/ ከተማ የሴቶች ክንፍ የስራ አስፈጻሚ አባል",
      experience: "የአመራርነት የቆይታ ግዜ 4 ዓመት 7 ወር",
      image: "/images/ሂሩት.jpg"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < Math.ceil(leadershipData.length / 3) - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-gov">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-6">
              ስለ <span className="text-gov-accent">እኛ</span>
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ቅርንጫፍ ጽ/ቤት በሴቶች መብቶች፣ እኩልነት እና ተሳትፎ ፊት አዋጅ ነው። ከ2013 ጀምሮ በአካባቢው ለሚገኙ ሴቶች ደህንነት፣ ዕድገት እና ተሳትፎ እንደ ድልድይ ሆኖ አገልግሏል።
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              ትምህርት፣ ስልጠና፣ የስራ ዕድል፣ የጤና እንክብካቤ እና ሌሎች አገልግሎቶችን በማቅረብ፣ አካባቢያችን ውስጥ ሴቶች በሁሉም መስኮች እንዲሳተፉ እና እንዲበረታቱ ለማድረግ ጠንክረን እንሰራለን። ሴቶችን ሲጠቀሙ ማህበረሰቦች ይበለጽጋሉ ብለን እናምናለን።
            </p>
            
            <Button className="bg-gov-accent text-white hover:bg-gov-accent/90 group">
              <span>ተጨማሪ ይወቁ</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-w-16 aspect-h-9 bg-gov-light/10">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                alt="የክፍለ ከተማው ሴቶች አመራሮች" 
                className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-gov-dark/95 via-gov-dark/70 to-transparent text-white">
              <h3 className="text-2xl font-bold mb-2">አመራር</h3>
              <p className="opacity-90 text-lg">የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ አመራሮች</p>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mt-32 relative">
          <div className="absolute inset-0 bg-gov-accent/5 -skew-y-3 transform -z-10 rounded-3xl"></div>
          <div className="text-center mb-16 relative">
            <span className="text-gov-accent text-sm font-semibold tracking-wider uppercase mb-2 block">የእኛ ቡድን</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
              የሴቶች ክንፍ <span className="text-gov-accent">አመራሮች</span>
            </h3>
            <div className="w-32 h-1.5 bg-gov-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="relative px-4">
            <div 
              ref={sliderRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {leadershipData.map((leader, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="h-72 overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gov-dark/90 via-gov-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 bg-white relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gov-accent rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h4 className="font-bold text-xl text-gov-dark mb-2 mt-4 text-center">{leader.name}</h4>
                    <p className="text-gov-accent text-sm mb-2 text-center font-medium">{leader.position}</p>
                    <div className="w-12 h-0.5 bg-gov-accent/30 mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm text-center">{leader.experience}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={cn(
                  "p-2 rounded-full bg-white shadow-lg hover:bg-gov-accent hover:text-white transition-colors",
                  currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "text-gov-accent"
                )}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(leadershipData.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      currentSlide === index ? "bg-gov-accent" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide >= Math.ceil(leadershipData.length / 3) - 1}
                className={cn(
                  "p-2 rounded-full bg-white shadow-lg hover:bg-gov-accent hover:text-white transition-colors",
                  currentSlide >= Math.ceil(leadershipData.length / 3) - 1 ? "opacity-50 cursor-not-allowed" : "text-gov-accent"
                )}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
