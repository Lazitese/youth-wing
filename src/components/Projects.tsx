import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ZoomIn, X, ArrowLeft, Images, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
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
import useEmblaCarousel from 'embla-carousel-react';

const Projects = () => {
  const [currentZoomedImageSet, setCurrentZoomedImageSet] = useState<string[] | null>(null);
  const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [isHovered, setIsHovered] = useState<number | null>(null);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  const projectItems = [
    {
      title: "ከወረዳ እስከ ክ/ ከተማ ያሉ ሴት አመራሮች በአገልግሎት አሰጣጥና በግጭት አፈታት ዙሪያ ስልጠና ተሰጥቷል።",
      category: "ስልጠና",
      images: ["/images/1.jpg", "/images/11.jpg", "/images/111.jpg"],
      date: "መጋቢት 15, 2016 ዓ.ም",
      location: "አቃቂ ቃሊቲ"
    },
    {
      title: "በገዢ ትርክት ዙሪያ በወረዳና በክ/ ከተማ ደረጃ ላሉ የበታች አመራሮችና ለአባላት የተሰጠ ስልጠና",
      category: "የአቅም ግንባታ",
      images: ["/images/2.jpg", "/images/22.jpg", "/images/222.jpg"],
      date: "የካቲት 20, 2016 ዓ.ም",
      location: "ቃሊቲ"
    },
    {
      title: "ለሴት ክንፍ የሚዲያ አርሚዎች የተሰጠ ስልጠና",
      category: "ሚዲያ",
      images: ["/images/33.jpg", "/images/3.jpg", "/images/333.jpg"],
      date: "ጥር 10, 2016 ዓ.ም",
      location: "አዲስ አበባ"
    },
  ];

  const categories = [
    { id: "all", label: "ሁሉም" },
    { id: "ስልጠና", label: "ስልጠና" },
    { id: "የአቅም ግንባታ", label: "የአቅም ግንባታ" },
    { id: "ሚዲያ", label: "ሚዲያ" },
    { id: "ኢኮኖሚ", label: "ኢኮኖሚ" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projectItems 
    : projectItems.filter(project => project.category === activeFilter);

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
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-white to-blue-50/30">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative patterns */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gov-blue/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gov-blue/20 to-transparent" />
        
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gov-gold/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gov-blue/5 blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'radial-gradient(#1f4e89 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>
      
      <div className="container-gov relative z-10">
        {/* Enhanced header with decorative elements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="inline-block py-2 px-5 rounded-full text-sm font-medium bg-gov-blue/10 text-gov-blue mb-4">
              <Images className="inline-block w-4 h-4 mr-2" />
              የሴቶች ክንፍ ተግባራት
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gov-blue">የሴቶች ክንፍ</span>{" "}
            <span className="text-gov-gold">ተግባራት</span>
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-gov-blue to-gov-gold rounded-full mx-auto mb-6"
          />
          
          <p className="text-gray-600 text-lg mb-12">
            የሴቶች ክንፍ በማህበረሰቡ ላይ ለውጥ ለማምጣት የተለያዩ ተግባራትን በመተግበር ላይ ይገኛል
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(category.id)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeFilter === category.id
                    ? "bg-gov-gold/90 text-gov-dark shadow-md shadow-gov-gold/20"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gov-accent/40 hover:bg-gov-accent/5"
                )}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Modern gallery layout */}
        <div ref={galleryRef} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
              key={index} 
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={cn(
                  "bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-500 group relative",
                  index === 0 ? "md:col-span-8" : "md:col-span-4"
                )}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Card with hover effects */}
                <div className="h-full flex flex-col">
                  {/* Image Section */}
              <div className="relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-gov-gold/90 backdrop-blur-sm text-gov-dark text-xs font-medium px-3 py-1.5 rounded-full shadow-md"
                      >
                    {project.category}
                      </motion.span>
                </div>
                
                <AspectRatio ratio={16 / 9} className="bg-gray-100">
                      <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => handleZoomImage(project.images, 0)}>
                        <img 
                          src={project.images[0]} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Zoom indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                              <ZoomIn size={24} className="text-white drop-shadow-lg" />
                          </div>
                        </div>
                        
                        {/* Image count indicator */}
                        {project.images.length > 1 && (
                          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            <div className="flex items-center gap-1">
                              <Images className="w-3 h-3" />
                              <span>{project.images.length}</span>
                            </div>
                          </div>
                        )}
                      </div>
                </AspectRatio>
              </div>
              
                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gov-dark mb-3 line-clamp-2 group-hover:text-gov-blue transition-colors duration-300">
                  {project.title}
                </h3>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                        <div>{project.date}</div>
                        <div>{project.location}</div>
                      </div>
                      
                      {/* Preview gallery thumbnails */}
                      {project.images.length > 1 && isHovered === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide"
                        >
                          {project.images.slice(0, 3).map((img, idx) => (
                            <div 
                              key={idx}
                              onClick={() => handleZoomImage(project.images, idx)}
                              className="w-16 h-12 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border border-gray-200"
                            >
                              <img 
                                src={img} 
                                alt={`Thumbnail ${idx + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {project.images.length > 3 && (
                            <div className="w-16 h-12 flex-shrink-0 rounded-md overflow-hidden cursor-pointer bg-gov-blue/10 flex items-center justify-center text-gov-blue font-medium">
                              +{project.images.length - 3}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
              </div>
            </div>
              </motion.div>
          ))}
          </div>
        </div>

        {/* Enhanced View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>
          <Link to="/projects">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-gov-blue hover:bg-gov-blue/90 text-white px-8 py-6 rounded-full h-auto shadow-md hover:shadow-lg transition-all">
              <span className="mr-2">ሁሉንም ተግባራት ይመልከቱ</span>
              <ArrowRight size={16} />
            </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Modern Image Zoom Dialog */}
        <Dialog 
          open={!!currentZoomedImageSet} 
          onOpenChange={(isOpen) => !isOpen && setCurrentZoomedImageSet(null)}
        >
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none rounded-2xl overflow-hidden">
            <AnimatePresence>
              {currentZoomedImageSet && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  {/* Close button */}
                  <DialogClose className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 hover:bg-black/80 transition-colors">
                    <X className="h-5 w-5 text-white" />
                  </DialogClose>
                  
                  {/* Main image display */}
                  <div className="relative w-full h-[70vh] flex items-center justify-center">
                    {/* Arrow navigation */}
                    <button 
                      onClick={() => navigateZoomedImage('prev')}
                      className="absolute left-4 z-10 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-colors text-white"
                    >
                      <ArrowLeftCircle className="h-6 w-6" />
                    </button>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentZoomedImageIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex items-center justify-center p-8"
                      >
                    <img 
                      src={currentZoomedImageSet[currentZoomedImageIndex] || ''}
                      alt="Zoomed image" 
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    <button 
                      onClick={() => navigateZoomedImage('next')}
                      className="absolute right-4 z-10 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-colors text-white"
                    >
                      <ArrowRightCircle className="h-6 w-6" />
                    </button>
                  </div>
                  
                  {/* Bottom controls */}
                  <div className="w-full p-6 bg-black/80">
                    {/* Progress indicator */}
                    <div className="w-full mb-4">
                      <Slider 
                        value={[currentZoomedImageIndex * 100 / Math.max(1, currentZoomedImageSet.length - 1)]}
                        max={100}
                        step={1}
                        onValueChange={handleSlideChange}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Thumbnails */}
                    <div className="flex justify-center gap-2 overflow-x-auto py-2 scrollbar-hide">
                      {currentZoomedImageSet.map((img, idx) => (
                        <motion.div 
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setCurrentZoomedImageIndex(idx)}
                          className={cn(
                            "w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2",
                            idx === currentZoomedImageIndex 
                              ? "border-gov-gold scale-105" 
                              : "border-transparent opacity-60 hover:opacity-100"
                          )}
                        >
                          <img 
                            src={img} 
                            alt={`Thumbnail ${idx + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
