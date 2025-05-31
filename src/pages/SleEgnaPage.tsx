import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Trophy, Users, BookOpen, Lightbulb, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import AboutUs from "@/components/AboutUs";

// Define a type for leadership data
interface Leader {
  name: string;
  position: string;
  image: string;
  message?: string;
}

const SleEgnaPage = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const youthWingLeaders = [
    {
      name: "አብዱልዋህድ ሁሴን",
      position: "የወረዳ 13 ወጣት ክንፍ ሰብሳቢ",
      image: "/images/አብዱልዋህድ ሀጅ በዳሱ.jpg"
    },
    {
      name: "ፍቅሩ ታደሰ",
      position: "የወረዳ 08 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ፍቅሩ ታደሰ.jpg"
    },
    {
      name: "ሙሉጌታ ታምሩ",
      position: "የወረዳ 03 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ሙሉጌታ አዱኛ.jpg"
    },
    {
      name: "ቅድስት አስጨናቂ",
      position: "የወረዳ 12 ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ቅድስት አስጨናቂ.jpg"
    },
    {
      name: "ሰለሞን ታደሰ",
      position: "የወረዳ 01 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ሰለሞን መኮነን.jpg"
    },
    {
      name: "ጠይብ ቃሲም",
      position: "የወረዳ 02 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ጠይብ ቃሲም.jpg"
    },
    {
      name: "ፉሪ ሮባ",
      position: "የወረዳ 05 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ፉሪ ሮባ.jpg"
    },
    {
      name: "ናትናኤል ስንታየሁ",
      position: "የወረዳ 04 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ናትናኤል ስንታየሁ.jpg"
    },
    {
      name: "ባይሳ አደሬ",
      position: "የወረዳ 07 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ባይሳ አደሬ.jpg"
    },
    {
      name: "ብርሃኑ ኩማ",
      position: "የወረዳ 06 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/ብርሃኑ ኩማ.jpg"
    },
    {
      name: "አዲሱ አባተ",
      position: "የወረዳ 09 ብልፅግና ወጣቶች ክንፍ ሰብሳቢ",
      image: "/images/አዲሱ አባተ.jpg"
    }
  ] as Leader[];

  // Function to handle modal navigation
  const navigateModal = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => 
        prev === 0 ? youthWingLeaders.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === youthWingLeaders.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Handle key presses for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      if (e.key === 'Escape') {
        setModalOpen(false);
      } else if (e.key === 'ArrowLeft') {
        navigateModal('prev');
      } else if (e.key === 'ArrowRight') {
        navigateModal('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  return (
    <>
      <Navbar />
      
      {/* Add AboutUs component at the top */}
      <AboutUs />
      
      {/* Youth Wing Leaders Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container-gov">          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-purple-100">
            <div className="text-center mb-12">
              <div className="inline-block relative mb-2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gov-dark">
                  <span className="text-gov-accent relative">
                    የወጣት ክንፍ አመራሮች
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gov-accent transform translate-y-2"></div>
                  </span>
                </h2>
              </div>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mt-6">
                የብልጽግና ወጣት ክንፍ አመራሮች በተለያዩ መስኮች በመሰማራት ለሀገራችን እድገት እየሰሩ ይገኛሉ
              </p>
            </div>
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  slidesToScroll: 1
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {youthWingLeaders.map((leader, index) => (
                    <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center items-stretch">
                      <div
                        className={`bg-gradient-to-b from-white to-purple-50 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300 border border-purple-100 flex flex-col w-full max-w-sm overflow-hidden`}
                      >
                        <div 
                          className="relative flex-shrink-0 h-80 overflow-hidden group cursor-pointer"
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setModalOpen(true);
                          }}
                        >
                          <img 
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            onError={(e: any) => {
                              e.currentTarget.src = "/images/placeholder-leader.jpg";
                              e.currentTarget.onerror = null;
                              e.currentTarget.style.objectFit = 'contain';
                              e.currentTarget.style.backgroundColor = '#f0f0f0';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                            <h4 className="font-bold text-xl mb-2 drop-shadow-md">{leader.name}</h4>
                            <p className="text-base text-purple-100 drop-shadow-md">{leader.position}</p>
                          </div>
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <div className="bg-white/80 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gov-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-8">
                  <CarouselPrevious className="static translate-y-0 mx-2 bg-gov-accent hover:bg-gov-accent/90 text-white border-none" />
                  <CarouselNext className="static translate-y-0 mx-2 bg-gov-accent hover:bg-gov-accent/90 text-white border-none" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
      
      {/* Full-size Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={() => setModalOpen(false)}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
          </div>
          
          <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="relative flex-grow flex items-center justify-center">
              <img 
                src={youthWingLeaders[currentImageIndex].image} 
                alt={youthWingLeaders[currentImageIndex].name}
                className="max-h-[80vh] max-w-full object-contain"
                onError={(e: any) => {
                  e.currentTarget.src = "/images/placeholder-leader.jpg";
                  e.currentTarget.onerror = null;
                }}
              />
              
              <button 
                className="absolute left-2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                onClick={() => navigateModal('prev')}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button 
                className="absolute right-2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                onClick={() => navigateModal('next')}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
            
            <div className="bg-black/50 p-6 mt-4 rounded-lg text-center">
              <h3 className="text-white text-2xl font-bold mb-2">
                {youthWingLeaders[currentImageIndex].name}
              </h3>
              <p className="text-purple-200 text-lg">
                {youthWingLeaders[currentImageIndex].position}
              </p>
              <div className="mt-4 flex justify-center items-center space-x-2">
                {youthWingLeaders.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default SleEgnaPage;