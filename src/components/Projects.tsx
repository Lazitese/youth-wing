
import { useState } from "react";
import { ArrowRight, ZoomIn, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const Projects = () => {
  const [currentZoomedImageSet, setCurrentZoomedImageSet] = useState<string[] | null>(null);
  const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState<number>(0);

  const projectItems = [
    {
      title: "ከወረዳ እስከ ክ/ ከተማ ያሉ ሴት አመራሮች በአገልግሎት አሰጣጥና በግጭት አፈታት ዙሪያ ስልጠና ተሰጥቷል።",
      description: "የሴቶችን የፖለቲካ ተሳትፎ ለማሳደግ የሚያግዝ ስልጠና",
      images: ["/images/1.jpg", "/images/11.jpg", "/images/111.jpg"]
    },
    {
      title: "በገዢ ትርክት ዙሪያ በወረዳና በክ/ ከተማ ደረጃ ላሉ የበታች አመራሮችና ለአባላት የተሰጠ ስልጠና",
      description: "የሴቶችን የሙያ ክህሎት ለማሳደግ የሚደረግ ስልጠና",
      images: ["/images/2.jpg", "/images/22.jpg", "/images/222.jpg"]
    },
    {
      title: "ለሴት ክንፍ የሚዲያ አርሚዎች የተሰጠ ስልጠና",
      description: "የሴቶችን የንግድ እውቀት ለማሳደግ የሚያግዝ የምክር አገልግሎት",
      images: ["/images/3.jpg", "/images/33.jpg", "/images/333.jpg"]
    },
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

  const handleSlideChange = (value: number[]) => {
    if (currentZoomedImageSet && value.length > 0) {
      const slideIndex = Math.round(value[0] * (currentZoomedImageSet.length - 1) / 100);
      setCurrentZoomedImageIndex(slideIndex);
    }
  };

  return (
    <section className="py-16 bg-brand-white">
      <div className="container-gov">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            የሴቶች ክንፍ <span className="text-brand-blue">ተግባራት</span>
          </h2>
          <p className="text-gray-600 text-lg">
            የሴቶች ክንፍ በማህበረሰቡ ላይ ለውጥ ለማምጣት የተለያዩ ተግባራትን በመተግበር ላይ ይገኛል
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectItems.map((project, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border border-gray-100 flex flex-col"
            >
              {/* Card Title - Now at the top with clear styling */}
              <div className="p-5 bg-white border-b border-gray-100">
                <h3 className="text-xl font-bold text-brand-black leading-tight">{project.title}</h3>
              </div>
              
              {/* Image Carousel with clear separation */}
              <div className="relative group">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, idx) => (
                        <CarouselItem key={idx}>
                          <div className="flex items-center justify-center h-full relative">
                            <img 
                              src={image} 
                              alt={`${project.title} - slide ${idx + 1}`}
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() => handleZoomImage(project.images, idx)}
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                            <button
                              className="absolute right-2 bottom-2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleZoomImage(project.images, idx)}
                            >
                              <ZoomIn size={20} />
                            </button>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </AspectRatio>
              </div>
              
              {/* Card Description and Link */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                <div className="flex justify-end mt-auto">
                  <Link to={`/projects`}>
                    <Button variant="ghost" className="flex items-center gap-1 text-brand-blue hover:bg-blue-50">
                      ተጨማሪ <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/projects">
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-brand-white">
              ሁሉንም ተግባራት ይመልከቱ
            </Button>
          </Link>
        </div>

        {/* Enhanced Image Zoom Dialog with Better Navigation */}
        <Dialog 
          open={!!currentZoomedImageSet} 
          onOpenChange={(isOpen) => !isOpen && setCurrentZoomedImageSet(null)}
        >
          <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
            <div className="relative">
              <DialogClose className="absolute top-2 right-2 z-10 rounded-full bg-black/70 p-2 hover:bg-black/90 transition-colors">
                <X className="h-6 w-6 text-white" />
              </DialogClose>
              
              {currentZoomedImageSet && (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  {/* Main image display */}
                  <div className="relative w-full flex items-center justify-center p-4">
                    <img 
                      src={currentZoomedImageSet[currentZoomedImageIndex] || ''}
                      alt="Zoomed image" 
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </div>
                  
                  {/* Navigation controls */}
                  <div className="w-full px-6 pb-6 pt-2 flex flex-col gap-4">
                    {/* Slider for navigation */}
                    <div className="px-4 w-full">
                      <Slider 
                        value={[currentZoomedImageIndex * 100 / (currentZoomedImageSet.length - 1 || 1)]}
                        max={100}
                        step={1}
                        onValueChange={handleSlideChange}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {/* Button controls */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-black/50 border-gray-700 hover:bg-black/70 text-white"
                        onClick={() => navigateZoomedImage('prev')}
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        ቀዳሚ
                      </Button>
                      
                      {/* Image counter */}
                      <div className="text-white px-3 py-1 bg-black/50 rounded-full text-sm">
                        {currentZoomedImageIndex + 1} / {currentZoomedImageSet.length}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-black/50 border-gray-700 hover:bg-black/70 text-white"
                        onClick={() => navigateZoomedImage('next')}
                      >
                        ቀጣይ
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                    
                    {/* Thumbnails row */}
                    <div className="flex gap-2 overflow-x-auto pb-2 px-2 hide-scrollbar">
                      {currentZoomedImageSet.map((img, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setCurrentZoomedImageIndex(idx)}
                          className={cn(
                            "w-16 h-12 flex-shrink-0 cursor-pointer border-2 overflow-hidden transition-all",
                            idx === currentZoomedImageIndex 
                              ? "border-brand-blue opacity-100 scale-105" 
                              : "border-transparent opacity-70 hover:opacity-100"
                          )}
                        >
                          <img 
                            src={img} 
                            alt={`Thumbnail ${idx + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
