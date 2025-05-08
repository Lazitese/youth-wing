import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ZoomIn, X, ArrowLeft, ArrowRight, BarChart, Heart, Users, TrendingUp } from "lucide-react";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";

const ProjectsPage = () => {
  const [currentZoomedImageSet, setCurrentZoomedImageSet] = useState<string[] | null>(null);
  const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState<number>(0);

  useEffect(() => {
    document.title =
      "በ2017 በብልጽና ፓርቲ ሴቶች ክንፍ የተሰሩ ሰው ተኮር ተግባራት | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  const politicalProjects = [
    {
      title: "ከወረዳ እስከ ክ/ ከተማ ያሉ ሴት አመራሮች በአገልግሎት አሰጣጥና በግጭት አፈታት ዙሪያ ስልጠና ተሰጥቷል።",
      images: ["/images/1.jpg", "/images/11.jpg", "/images/111.jpg", "/images/1111.jpg", "/images/11111.jpg"]
    },
    {
      title: "በገዢ ትርክት ዙሪያ በወረዳና በክ/ ከተማ ደረጃ ላሉ የበታች አመራሮችና ለአባላት የተሰጠ ስልጠና",
      images: ["/images/2.jpg", "/images/22.jpg", "/images/222.jpg", "/images/2222.jpg", "/images/22222.jpg", "/images/222222.jpg", "/images/2222222.jpg", "/images/22222222.jpg", "/images/222222222.jpg", "/images/2222222222.jpg", "/images/222222222222.jpg"]
    },
    {
      title: "ለሴት ክንፍ የሚዲያ አርሚዎች የተሰጠ ስልጠና",
      images: ["/images/3.jpg", "/images/33.jpg", "/images/333.jpg", "/images/33333.jpg", "/images/333333.jpg"]
    }
  ];

  // Only keep social projects with stats
  const socialProjects = [
    { title: "ጤና መድህን", value: "72,622", label: "የጤና መድህን ተጠቃሚ ሴቶች" },
    { title: "የማህፀን ጫፍ ካንሰር ምርመራ", value: "6,351", label: "ምርመራ የተደረገላቸው ሴቶች" }
  ];

  // Keep economic projects that have stats or are በንግድ የተሰማሩ ሴቶች
  const economicProjects = [
    { title: "በንግድ የተሰማሩ ሴቶች", hasImage: true },  
    { title: "የሌማት ት��ፋት", value: "9,040", label: "ተጠቃሚ ሴቶች" },
    { title: "የብልፅግና ቤተሰብ እየቆጠቡ ያሉ", value: "807", label: "ሴቶች" }
  ];

  const leadershipStats = [
    { title: "ከአጠቃላይ ክ/ከተማ አመራር የሴቶች ድርሻ", value: "36.3%", icon: <Users className="h-10 w-10 text-brand-blue/70" /> },
    { title: "ከአጠቃላይ ወረዳ አመራር የሴቶች ድርሻ", value: "26.8%", icon: <Users className="h-10 w-10 text-brand-red/70" /> },
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
    category, 
    images = [] 
  }: { 
    title: string; 
    index: number; 
    category: string; 
    images?: string[] 
  }) => {
    // Get category display name
    const getCategoryDisplayName = () => {
      switch (category) {
        case "political":
          return "ስልጠና";
        case "social":
          return "ማህበራዊ";
        case "economic":
          return "ኢኮኖሚ";
        default:
          return "ሌላ";
      }
    };

    // Different accent colors based on category
    const getCategoryColor = () => {
      switch (category) {
        case "political":
          return "bg-gov-accent/90";
        case "social":
          return "bg-purple-500/90";
        case "economic":
          return "bg-green-500/90";
        default:
          return "bg-gov-gold/90";
      }
    };

    // Use provided images or default images
    const defaultImages = [
      `/images/project-${category}-${(index % 3) + 1}.jpg`,
    ];
    const cardImages = images.length > 0 ? images : defaultImages;

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
          {/* Image Section - Main Feature */}
          <div className="relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <span className={`${getCategoryColor()} backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md`}>
                {getCategoryDisplayName()}
              </span>
            </div>
            
            <AspectRatio ratio={16 / 9} className="bg-gray-100">
            <Carousel className="w-full">
              <CarouselContent>
                {cardImages.map((image, idx) => (
                  <CarouselItem key={idx}>
                      <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => handleZoomImage(cardImages, idx)}>
                      <img 
                        src={image} 
                        alt={`${title} - slide ${idx + 1}`}
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
              {title}
            </h3>
          </div>
            </div>
      </motion.div>
    );
  };

  const StatCard = ({ title, value, icon, color = "bg-gradient-to-br from-brand-blue/20 to-brand-blue/10" }: 
  { title: string; value: string; icon?: JSX.Element; color?: string }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className={`p-6 rounded-xl shadow-md ${color} relative overflow-hidden border border-white/20`}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-gray-700">{title}</h4>
              <p className="text-3xl font-bold text-brand-dark">{value}</p>
            </div>
            {icon && (
              <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                {icon}
              </div>
            )}
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10"></div>
        </div>
      </motion.div>
    );
  };

  const SocialStatCard = ({ title, value, label, index }: 
  { title: string; value?: string; label?: string; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full h-full"
      >
        <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col justify-between border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
          <h4 className="text-lg font-medium text-gray-700 mb-2">{title}</h4>
          
          {value && (
            <div className="mt-4">
              <p className="text-3xl font-bold text-purple-600 mb-1">{value}</p>
              {label && <p className="text-sm text-gray-500">{label}</p>}
            </div>
          )}
          
          {!value && (
            <div className="flex items-center justify-center h-full opacity-50">
              <Heart className="h-8 w-8 text-purple-400 mb-2" />
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const EconomicStatCard = ({ title, value, label, index, hasImage = false }: 
  { title: string; value?: string; label?: string; index: number; hasImage?: boolean }) => {
    if (hasImage) {
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
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
                  ኢኮኖሚ
                </span>
              </div>
              
              <AspectRatio ratio={16 / 9} className="bg-gray-100">
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/placeholder.svg" 
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </AspectRatio>
            </div>
            
            {/* Title */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-md font-bold text-gov-dark line-clamp-2">
                {title}
              </h3>
            </div>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full h-full"
      >
        <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col justify-between border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
          <h4 className="text-lg font-medium text-gray-700 mb-2">{title}</h4>
          
          <div className="mt-4">
            <p className="text-3xl font-bold text-green-600 mb-1">{value}</p>
            {label && <p className="text-sm text-gray-500">{label}</p>}
          </div>
        </div>
      </motion.div>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => {
    // Different colors for each section
    const getTitleColor = () => {
      switch(title) {
        case "የፖለቲካ ተሳትፎ":
          return "from-brand-blue to-brand-blue/70";
        case "ማህበራዊ ተጠቃሚነት":
          return "from-brand-red to-brand-red/70";
        case "ኢኮኖሚያዊ ተሳትፎ":
          return "from-brand-yellow to-brand-orange";
        default:
          return "from-brand-blue to-brand-blue/70";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-brand-black relative inline-block">
          {title}
          <span className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${getTitleColor()} transform translate-y-2`}></span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl">
          {title === "የፖለቲካ ተሳትፎ" && "የሴቶችን የፖለቲካ ተሳትፎ ማሳደግ እና በአመራር ደረጃ እንዲሳተፉ የሚያስችሉ ተግባራት"}
          {title === "ማህበራዊ ተጠቃሚነት" && "የሴቶችን ማህበራዊ ፍትህ እና ጤና ማረጋገጥ የሚያስችሉ ተግባራት"}
          {title === "ኢኮኖሚያዊ ተሳትፎ" && "የሴቶችን የኢኮኖሚ ተጠቃሚነት እና ተሳትፎ ማሳደግ የሚያስችሉ ተግባራት"}
        </p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-white">
      <Navbar />

      <div className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/113a8e96-472f-42b6-a819-45ac4521b7c9.png" 
            alt="Colorful Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-black/40"></div>
        </div>

        {/* Content with good contrast */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-white drop-shadow-lg">
              ተግባራት <span className="text-brand-yellow"></span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-brand-white drop-shadow-md">
            በ2017 በብልጽና ፓርቲ ሴቶች ክንፍ የተሰሩ ሰው ተኮር ተግባራት
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="hidden md:block">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-brand-blue/20 blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-brand-yellow/20 blur-2xl"></div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Brief intro section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-brand-black">
            የሴቶች ክንፍ <span className="text-brand-red">ተግባራት</span> ዝርዝር
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow mx-auto mb-6"></div>
          <p className="text-gray-600">
            የሴቶች ክንፍ በሶስት ዋና ዋና መስኮች የተለያ ተግባራትን በመተግበር ላይ ይገኛል። እነዚህም የፖለቲካ ተሳትፎ፣ ማህበራዊ ተጠቃሚነት እና ኢኮኖሚያዊ ተሳትፎ ናቸው።
          </p>
          
          {/* Leadership stats - new section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadershipStats.map((stat, idx) => (
              <StatCard 
                key={idx} 
                title={stat.title} 
                value={stat.value} 
                icon={stat.icon} 
                color={idx === 0 ? "bg-gradient-to-br from-brand-blue/20 to-brand-blue/5" : "bg-gradient-to-br from-brand-red/20 to-brand-red/5"}
              />
            ))}
          </div>
        </motion.div>

        <section>
          <SectionHeader title="ፖለቲካዊ ተጠቃሚነት" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {politicalProjects.map((project, idx) => (
              <ProjectCard 
                key={`political-${idx}`}
                title={project.title} 
                index={idx} 
                category="political" 
                images={project.images}
              />
            ))}
          </div>
        </section>
        
        <section>
          <SectionHeader title="ማህበራዊ ተጠቃሚነት" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {socialProjects.map((project, idx) => (
              <SocialStatCard
                key={`social-${idx}`}
                title={project.title}
                value={project.value}
                label={project.label}
                index={idx}
              />
            ))}
          </div>
        </section>
        
        <section>
          <SectionHeader title="ኢኮኖሚያዊ ተሳትፎ" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {economicProjects.map((project, idx) => (
              project.hasImage ? (
                <EconomicStatCard
                  key={`economic-${idx}`}
                  title={project.title}
                  index={idx}
                  hasImage={true}
                />
              ) : (
                <EconomicStatCard
                  key={`economic-${idx}`}
                  title={project.title}
                  value={project.value}
                  label={project.label}
                  index={idx}
                  hasImage={false}
                />
              )
            ))}
          </div>
        </section>
      </main>

      <Footer />

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
                    <input
                      type="range"
                      min="0"
                      max={currentZoomedImageSet.length - 1}
                      value={currentZoomedImageIndex}
                      onChange={(e) => setCurrentZoomedImageIndex(Number(e.target.value))}
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
                        className={`
                          w-20 h-16 flex-shrink-0 cursor-pointer border-2 overflow-hidden transition-all
                          ${idx === currentZoomedImageIndex 
                            ? "border-gov-accent opacity-100 scale-110" 
                            : "border-transparent opacity-70 hover:opacity-100"
                          }
                        `}
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
  );
};

export default ProjectsPage;
