
import { useState } from "react";
import { ArrowRight, ZoomIn, X } from "lucide-react";
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

const Projects = () => {
  const [currentZoomedImage, setCurrentZoomedImage] = useState<string | null>(null);

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
              className="bg-brand-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-brand-blue/10"
            >
              <div className="h-48 relative group">
                <AspectRatio ratio={16 / 9} className="bg-muted h-full">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                      {project.images.map((image, idx) => (
                        <CarouselItem key={idx} className="h-full">
                          <div className="flex items-center justify-center h-full relative">
                            <img 
                              src={image} 
                              alt={`${project.title} - slide ${idx + 1}`}
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() => setCurrentZoomedImage(image)}
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                            <button
                              className="absolute right-2 bottom-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setCurrentZoomedImage(image)}
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
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-black mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-end">
                  <Link to={`/projects`}>
                    <Button variant="ghost" className="flex items-center gap-1 text-brand-blue">
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

        {/* Image Zoom Dialog */}
        <Dialog open={!!currentZoomedImage} onOpenChange={(isOpen) => !isOpen && setCurrentZoomedImage(null)}>
          <DialogContent className="max-w-3xl p-1 bg-black/90">
            <div className="relative">
              <DialogClose className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-2">
                <X className="h-6 w-6 text-white" />
              </DialogClose>
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={currentZoomedImage || ''}
                  alt="Zoomed image" 
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
