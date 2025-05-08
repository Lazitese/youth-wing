
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Trophy, Users, BookOpen, Lightbulb, Heart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import AboutUs from "@/components/AboutUs";

const SleEgnaPage = () => {
  useEffect(() => {
    document.title = "ስለ እኛ | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  // Leadership data
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

  // Main leader data
  const mainLeader = {
    name: "ሜሮን መንግስቱ ከበደ",
    position: "በአቃቂ ቃሊቲ ክ/ ከተማ የሴቶች ክንፍ ጽ ቤት ኃላፊ",
    experience: "በአመራርነት የቆይታ ግዜ 9 ዓመት",
    image: "/images/ሜሮን.jpg",
    message: "አመራሮቻችን በትምህርት፣ በልምድ እና በአመለካከት የበሰሉ ሆነው ለሴቶች መብት መከበር እና ተሳትፎ ዕድገት ቁርጠኛ ናቸው። እኛ በአንድነት ሆነን፣ ለሴቶች ማህበረሰብ የተሻለ ነገ እና የተሻለ ህይወት ለመፍጠር በጽናት እንሰራለን።"
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Add AboutUs component at the top */}
      <AboutUs />
      
      <div className="pt-16 pb-16">
        <div className="container-gov">
          {/* Section 1 - Introduction with Ribbon */}
          <div className="relative bg-white rounded-lg shadow-md p-8 mb-12 overflow-hidden">
            <div className="absolute -right-12 top-8 bg-gov-accent text-white px-16 py-2 transform rotate-45 z-10">
              <span className="font-bold">ከ2013 ዓ.ም ጀምሮ</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl font-bold text-gov-dark mb-4">የሴቶች ክንፍ ምንድን ነው?</h2>
                <p className="text-gray-600 mb-4">
                  የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ በአቃቂ ቃሊቲ ክፍለ ከተማ ውስጥ የሚገኙ ሴቶችን ድምፅ ለማሰማት፣ መብታቸውን ለማስከበር እና በሁሉም የህይወት ዘርፎች እንዲሳተፉ ለማድረግ የተቋቋመ ድርጅት ነው።
                </p>
                <p className="text-gray-600 mb-4">
                  ይህ ክንፍ በመላው ክፍለ ከተማ ውስጥ የሚገኙ ሴቶችን በማስተባበር፣ በሰብዓዊ መብት ዙሪያ ትምህርት በመስጠት፣ በፖለቲካ እና የማህበራዊ እንቅስቃሴዎች ውስጥ እንዲሳተፉ በማድረግ እና ለኢኮኖሚያዊ እድገታቸው በሚያስፈልጉ ነገሮች ድጋፍ በማድረግ ላይ ይገኛል።
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="bg-gov-accent/20 text-gov-accent px-3 py-1 rounded-full text-sm font-medium">የሴቶች መብት</span>
                  <span className="bg-gov-gold/20 text-gov-dark px-3 py-1 rounded-full text-sm font-medium">ፖለቲካዊ ተሳትፎ</span>
                  <span className="bg-gov-medium/20 text-gov-medium px-3 py-1 rounded-full text-sm font-medium">ኢኮኖሚያዊ አቅም</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">ማህበራዊ እኩልነት</span>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-full h-80 bg-gray-200 rounded-lg shadow-md relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-lg">የሴቶች ክንፍ ምስል</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2 - Timeline History */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gov-dark mb-6 text-center">የሴቶች ክንፍ ታሪካዊ ጉዞ</h2>
            
            <div className="relative border-l-2 border-gov-accent pl-8 ml-4 space-y-10 py-4">
              <div className="absolute w-4 h-4 bg-gov-accent rounded-full -left-[9px] top-0"></div>
              
              <div>
                <div className="absolute w-4 h-4 bg-gov-accent rounded-full -left-[9px]"></div>
                <h3 className="text-xl font-bold text-gov-dark">2013 ዓ.ም - መጀመሪያ</h3>
                <p className="text-gray-600 mt-2">
                  የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ በ2013 ዓ.ም ተመሰረተ። በዚህ ጊዜ የሴቶችን ተሳትፎ ለማሳደግ የተለያዩ ፕሮግራሞችን በማካሄድ ጀመረ።
                </p>
              </div>
              
              <div>
                <div className="absolute w-4 h-4 bg-gov-accent rounded-full -left-[9px]"></div>
                <h3 className="text-xl font-bold text-gov-dark">2014 ዓ.ም - ዕድገት</h3>
                <p className="text-gray-600 mt-2">
                  ከ1000 በላይ ሴቶች በክፍለ ከተማ ደረጃ ተደራጅተው ለሴቶች መብት ማስከበር እና ተሳትፎ ማሳደግ የሚያስችሉ ፕሮግራሞችን አዘጋጁ። በዚህ ወቅት የሴቶች የልማት ማህበራት ተመሰረቱ።
                </p>
              </div>
              
              <div>
                <div className="absolute w-4 h-4 bg-gov-accent rounded-full -left-[9px]"></div>
                <h3 className="text-xl font-bold text-gov-dark">2015 ዓ.ም - ስኬት</h3>
                <p className="text-gray-600 mt-2">
                  በ10 ወረዳዎች ውስጥ 5000+ ሴቶች በተለያዩ የልማት ስራዎች ተሳትፈዋል። የሴቶችን ፖለቲካዊ ተሳትፎ ለማሳደግ የተለያዩ ስልጠናዎች ተሰጥተዋል። በኢኮኖሚያዊ አቅም ግንባታ ዙሪያም በተለያዩ ስራዎች ተሳትፈዋል።
                </p>
              </div>
              
              <div>
                <div className="absolute w-4 h-4 bg-gov-accent rounded-full -left-[9px]"></div>
                <h3 className="text-xl font-bold text-gov-dark">አሁን - ራዕይ 2030</h3>
                <p className="text-gray-600 mt-2">
                  አሁን የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ በሁሉም የመንግስት መዋቅሮች ቢያንስ 50% የሴቶች ተሳትፎ ለማረጋገጥ በመስራት ላይ ይገኛል። በተጨማሪም ሴቶች በኢኮኖሚያዊ ዘርፎች ውስጥ ባለ ሙሉ ተሳትፎ እንዲኖራቸው ለማድረግ እየሰራ ነው።
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gov-accent w-3/4"></div>
                  </div>
                  <span className="text-sm font-semibold text-gov-accent">75%</span>
                </div>
              </div>
              
              <div className="absolute w-4 h-4 bg-gov-accent rounded-full -left-[9px] bottom-0"></div>
            </div>
          </div>
          
          {/* Section 4 - Leadership */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gov-dark mb-6 text-center">የሴቶች ክንፍ አመራሮች</h2>
            <div className="text-center mb-4">
              <p className="text-gray-600 mb-4">ለመስፋት ወደ ግራ ወይም ወደ ቀኝ ይሳቡ (Scroll left or right to see more)</p>
              <div className="w-24 h-1 bg-gov-accent mx-auto"></div>
            </div>
            
            {/* Add main leader card above the carousel */}
            <div className="max-w-4xl mx-auto mb-10">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  <div className="md:col-span-4 h-full">
                    <div className="h-full w-full overflow-hidden">
                      <img 
                        src={mainLeader.image} 
                        alt={mainLeader.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-8 p-6 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-12 bg-gov-accent mr-4"></div>
                      <div>
                        <h3 className="text-xl font-bold text-gov-dark">{mainLeader.name}</h3>
                        <p className="text-gov-accent">{mainLeader.position}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{mainLeader.message}"</p>
                    <p className="text-sm text-gray-500">{mainLeader.experience}</p>
                  </div>
                </div>
              </div>
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
                <CarouselContent>
                  {leadershipData.map((leader, index) => (
                    <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <div 
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border border-gray-100 h-full"
                      >
                        <div className="h-72 overflow-hidden">
                          <img 
                            src={leader.image} 
                            alt={leader.name}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div className="p-5">
                          <h4 className="font-bold text-lg text-gov-dark mb-1">{leader.name}</h4>
                          <p className="text-gov-accent text-sm mb-1">{leader.position}</p>
                          <p className="text-gray-600 text-xs">{leader.experience}</p>
                        </div>
                  </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-6">
                  <CarouselPrevious className="static translate-y-0 mx-2 bg-gov-accent hover:bg-gov-accent/90 text-white border-none" />
                  <CarouselNext className="static translate-y-0 mx-2 bg-gov-accent hover:bg-gov-accent/90 text-white border-none" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SleEgnaPage;
