import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ZoomIn, X, ArrowLeft, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const ProjectsPage = () => {
  const [currentZoomedImageSet, setCurrentZoomedImageSet] = useState<string[] | null>(null);
  const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState<number>(0);

  useEffect(() => {
    document.title = "በብልፅግና ወጣቶች ክንፍ የተካሄዱ ስራዎች";
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      title: "በወጣቶች የተካሄደ የህዳሴ ግድብ የቦንድ ንቅናቄ ተግባራት",
      images: ["/images/1.jpg", "/images/11.jpg", "/images/111.jpg", "/images/1111.jpg"]
    },
    {
      title: "በብልፅግና ወጣቶች ክንፍ የተካሄዱ የከተማ ግብርና ተግባራት",
      images: ["/images/2.jpg", "/images/22.jpg", "/images/222.jpg"]
    },
    {
      title: "በብልፅግና ወጣቶች ክንፍ የተካሄዱ በጎነት በሆስፒታል",
      images: ["/images/3.jpg", "/images/33.jpg"]
    },
    {
      title: "በብልፅግና ወጣቶች ክንፍ የተካሄዱ የደም ልገሳ ፕሮግራም",
      images: ["/images/4.jpg", "/images/44.jpg", "/images/444.jpg", "/images/4444.jpg", "/images/44444.jpg"]
    },
    {
      title: "በብልፅግና ወጣቶች ክንፍ የተካሄዱ ስራ የሌላቸዉ ወጣቶች የግንዛቤ መድረኮች",
      images: ["/images/5.jpg", "/images/55.jpg", "/images/555.jpg", "/images/5555.jpg", "/images/55555.jpg", "/images/555555.jpg", "/images/5555555.jpg", "/images/55555555.jpg", "/images/555555555.jpg"]
    },
    {
      title: "በብልፅግና ወጣቶች ክንፍ የችግኝ እንክብካቤ ተግባራት",
      images: ["/images/6.jpg", "/images/66.jpg", "/images/666.jpg", "/images/6666.jpg", "/images/66666.jpg", "/images/666666.jpg", "/images/6666666.jpg"]
    },
    {
      title: "በብልፅግና ወጣቶች ክንፍ ማህበራዊ ሚዲያን አጠቃቅምን አስመልክቶ ከወጣቶች ጋር የተደረገ የምክክር መድረክ",
      images: ["/images/7.jpg", "/images/77.jpg"]
    },
    {
      title: "ገዥ ትርክትን የማስረፅ ስራዎች በስፖርታዊ እንቅስቃሴ",
      images: ["/images/8.jpg", "/images/88.jpg", "/images/888.jpg"]
    },
    {
      title: "አፈፃፅምን መሰረት ያደረገ የእዉቅና መድረክ",
      images: ["/images/9.jpg", "/images/99.jpg"]
    },
    {
      title: "የገዥ ትርክት የማስረፅ መድረኮች",
      images: ["/images/10.jpg", "/images/1010.jpg", "/images/101010.jpg", "/images/10101010.jpg"]
    },
    {
      title: "የገዥ ትርክት የማስረጫ የኪነ-ጥበብ ምሽቶች",
      images: ["/images/B.jpg", "/images/BB.jpg", "/images/BBB.jpg", "/images/BBBB.jpg"]
    },
    {
      title: "ወጣቶችን ያሳተፈ የፅዳት ስራዎች",
      images: ["/images/C.jpg"]
    },
    {
      title: "ገዥ ትርክትን መሰረት ያደረገ የስራ አስፈፃሚ አመራሮች ፈተና",
      images: ["/images/D.jpg", "/images/DD.jpg", "/images/DDD.jpg", "/images/DDDD.jpg", "/images/DDDDD.jpg"]
    }
  ];

  const handleZoomImage = (images: string[], startIndex: number) => {
    setCurrentZoomedImageSet(images);
    setCurrentZoomedImageIndex(startIndex);
  };

  const navigateZoomedImage = (direction: 'next' | 'prev') => {
    if (!currentZoomedImageSet) return;
    
    if (direction === 'next') {
      setCurrentZoomedImageIndex(prevIndex => 
        prevIndex >= currentZoomedImageSet.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentZoomedImageIndex(prevIndex => 
        prevIndex <= 0 ? currentZoomedImageSet.length - 1 : prevIndex - 1
      );
    }
  };

  const ProjectCard = ({ 
    title, 
    index, 
    images = [] 
  }: { 
    title: string; 
    index: number; 
    images?: string[] 
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <div 
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
        >
          <div className="relative overflow-hidden">
            <AspectRatio ratio={16 / 9} className="bg-gray-100">
              <Carousel className="w-full h-full">
                <CarouselContent>
                  {images.map((image, idx) => (
                    <CarouselItem key={idx} className="h-full">
                      <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => handleZoomImage(images, idx)}>
                        <img 
                          src={image} 
                          alt={`${title} - slide ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e: any) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ZoomIn size={24} className="text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CarouselNext className="right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Carousel>
            </AspectRatio>
          </div>
          
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-md font-bold text-gov-dark line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gov-dark">
          በብልፅግና ወጣቶች ክንፍ የተካሄዱ ስራዎች
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              images={project.images}
              index={index}
            />
          ))}
        </div>
      </main>

      {/* Image Zoom Dialog */}
      <Dialog open={!!currentZoomedImageSet} onOpenChange={() => setCurrentZoomedImageSet(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          <DialogClose className="absolute right-4 top-4 z-50 bg-black/50 rounded-full p-2 text-white hover:bg-black/70">
            <X className="h-6 w-6" />
          </DialogClose>
          
          {currentZoomedImageSet && (
            <div className="relative w-full h-[80vh]">
              <img
                src={currentZoomedImageSet[currentZoomedImageIndex]}
                alt="Zoomed project"
                className="w-full h-full object-contain"
              />
              
              <button
                onClick={() => navigateZoomedImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => navigateZoomedImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
