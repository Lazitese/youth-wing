
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const achievements = [
  {
    id: 1,
    title: "የሴቶች የምክር ማዕከል",
    description: "በተለያዩ ቀበሌዎች ለ1000+ ሴቶች የምክር አገልግሎትን ማድረስ ተችሏል",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    date: "መጋቢት 2015 ዓ.ም"
  },
  {
    id: 2,
    title: "የተማሪ ልጃገረዶች የትምህርት ድጋፍ",
    description: "ለ500+ ተማሪ ልጃገረዶች የትምህርት ቁሳቁሶችን ማሟላት ተችሏል",
    image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1224&q=80",
    date: "ጥቅምት 2015 ዓ.ም"
  },
  {
    id: 3,
    title: "የሴቶች የንግድ ስልጠና",
    description: "300+ ሴቶች የንግድ ስልጠና ወስደው ራሳቸውን ችለዋል",
    image: "https://images.unsplash.com/photo-1565947933661-a1cd14e581a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    date: "ግንቦት 2014 ዓ.ም"
  },
  {
    id: 4,
    title: "የቀበሌ መንገድ እድሳት",
    description: "በሴቶች የሚመራ የ5 ኪሎ ሜትር መንገድ እድሳት ተከናውኗል",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    date: "ታህሳስ 2014 ዓ.ም"
  },
];

const Achievements = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-gov">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
            የእስካሁን <span className="text-gov-accent">ድርሻችን</span>
          </h2>
          <p className="text-gray-600">
            በክፍለ ከተማችን የሴቶችን ኑሮ ለማሻሻል ያከናወንናቸው ተግባራት እና ያገኘናቸው ውጤቶች
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {achievements.map((achievement) => (
                <div key={achievement.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-gray-100 aspect-w-16 aspect-h-9 md:aspect-auto md:h-full">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                      <span className="text-gov-accent text-sm font-medium mb-3">{achievement.date}</span>
                      <h3 className="text-2xl font-bold text-gov-dark mb-4">{achievement.title}</h3>
                      <p className="text-gray-600 mb-6">{achievement.description}</p>
                      <Button className="bg-gov-accent text-white hover:bg-gov-accent/90 w-max">
                        ተጨማሪ ይመልከቱ
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            variant="outline" 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm shadow-md border-0 h-12 w-12 rounded-full p-0"
            onClick={goToPrevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button 
            variant="outline" 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm shadow-md border-0 h-12 w-12 rounded-full p-0"
            onClick={goToNextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {achievements.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-gov-accent' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
