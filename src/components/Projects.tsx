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
      category: "ስልጠና",
      images: ["/images/1.jpg", "/images/11.jpg", "/images/111.jpg"]
    },
    {
      title: "በገዢ ትርክት ዙሪያ በወረዳና በክ/ ከተማ ደረጃ ላሉ የበታች አመራሮችና ለአባላት የተሰጠ ስልጠና",
      category: "የአቅም ግንባታ",
      images: ["/images/2.jpg", "/images/22.jpg", "/images/222.jpg"]
    },
    {
      title: "ለሴት ክንፍ የሚዲያ አርሚዎች የተሰጠ ስልጠና",
      category: "ሚዲያ",
      images: ["/images/33.jpg", "/images/3.jpg", "/images/333.jpg"]
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-gov">
        {/* Enhanced header with decorative elements */}
        <div className="max-w-3xl mx-auto text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-gov-gold via-gov-accent to-gov-gold rounded-full opacity-70"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gov-dark to-gov-accent">
            የሴቶች ክንፍ <span className="text-gov-accent">ተግባራት</span>
          </h2>
          
          <p className="text-gray-600 text-lg mb-8">
            የሴቶች ክንፍ በማህበረሰቡ ላይ ለውጥ ለማምጣት የተለያዩ ተግባራትን በመተግበር ላይ ይገኛል
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-gov-gold/10 text-gov-dark border border-gov-gold/20 px-4 py-1 rounded-full text-sm font-medium">
              ሁሉም
            </span>
            <span className="bg-white border border-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-600 hover:border-gov-accent/40 hover:bg-gov-accent/5 transition-colors cursor-pointer">
              ስልጠና
            </span>
            <span className="bg-white border border-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-600 hover:border-gov-accent/40 hover:bg-gov-accent/5 transition-colors cursor-pointer">
              ኢኮኖሚ
            </span>
            <span className="bg-white border border-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-600 hover:border-gov-accent/40 hover:bg-gov-accent/5 transition-colors cursor-pointer">
              ማህበራዊ
            </span>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full"></div>
        </div>

        {/* Simplified project cards with only essential elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projectItems.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
            >
              {/* Image Section - Main Feature */}
              <div className="relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gov-accent/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
                    {project.category}
                  </span>
                </div>
                
                <AspectRatio ratio={16 / 9} className="bg-gray-100">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, idx) => (
                        <CarouselItem key={idx}>
                          <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => handleZoomImage(project.images, idx)}>
                            <img 
                              src={image} 
                              alt={`${project.title} - slide ${idx + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div
                              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
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
              
              {/* Only the title */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-md font-bold text-gov-dark line-clamp-2">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced View All Button */}
        <div className="text-center relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>
          <Link to="/projects">
            <Button className="bg-gov-accent hover:bg-gov-accent/90 text-white px-8 py-6 rounded-full h-auto shadow-md hover:shadow-lg transition-all">
              <span className="mr-2">ሁሉንም ተግባራት ይመልከቱ</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Enhanced Image Zoom Dialog with Better Navigation and Thumbnails */}
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
                  {/* Main image display - bigger area */}
                  <div className="relative w-full h-[70vh] flex items-center justify-center p-4">
                    <img 
                      src={currentZoomedImageSet[currentZoomedImageIndex] || ''}
                      alt="Zoomed image" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  {/* Navigation controls - improved layout */}
                  <div className="w-full px-6 pb-6 pt-2 flex flex-col gap-4 bg-black/80">
                    {/* Slider for navigation - more visible */}
                    <div className="px-4 w-full">
                      <Slider 
                        value={[currentZoomedImageIndex * 100 / Math.max(1, currentZoomedImageSet.length - 1)]}
                        max={100}
                        step={1}
                        onValueChange={handleSlideChange}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {/* Button controls - more prominent */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-black/50 border-gray-700 hover:bg-black/70 text-white"
                        onClick={() => navigateZoomedImage('prev')}
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        ቀዳሚ
                      </Button>
                      
                      {/* Image counter - better visibility */}
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
                    
                    {/* Thumbnails row - larger, more visible */}
                    <div className="flex gap-2 overflow-x-auto pb-2 px-2 scrollbar-hide">
                      {currentZoomedImageSet.map((img, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setCurrentZoomedImageIndex(idx)}
                          className={cn(
                            "w-20 h-16 flex-shrink-0 cursor-pointer border-2 overflow-hidden transition-all",
                            idx === currentZoomedImageIndex 
                              ? "border-gov-accent opacity-100 scale-110" 
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
