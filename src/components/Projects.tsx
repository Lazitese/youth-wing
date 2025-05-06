
import { ArrowRight } from "lucide-react";
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

const Projects = () => {
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
              <div className="h-48">
                <AspectRatio ratio={16 / 9} className="bg-muted h-full">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                      {project.images.map((image, idx) => (
                        <CarouselItem key={idx} className="h-full">
                          <div className="flex items-center justify-center h-full">
                            <img 
                              src={image} 
                              alt={`${project.title} - slide ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
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
      </div>
    </section>
  );
};

export default Projects;
