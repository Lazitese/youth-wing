import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const AboutUs = () => {
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

  return (
    <section className="py-20 bg-white">
      <div className="container-gov">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-6">
              ስለ <span className="text-gov-accent">እኛ</span>
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ቅርንጫፍ ጽ/ቤት በሴቶች መብቶች፣ እኩልነት እና ተሳትፎ ፊት አዋጅ ነው። ከ2013 ጀምሮ በአካባቢው ለሚገኙ ሴቶች ደህንነት፣ ዕድገት እና ተሳትፎ እንደ ድልድይ ሆኖ አገልግሏል።
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              ትምህርት፣ ስልጠና፣ የስራ ዕድል፣ የጤና እንክብካቤ እና ሌሎች አገልግሎቶችን በማቅረብ፣ አካባቢያችን ውስጥ ሴቶች በሁሉም መስኮች እንዲሳተፉ እና እንዲበረታቱ ለማድረግ ጠንክረን እንሰራለን። ሴቶችን ሲጠቀሙ ማህበረሰቦች ይበለጽጋሉ ብለን እናምናለን።
            </p>
            
            <Button className="bg-gov-accent text-white hover:bg-gov-accent/90 group">
              <span>ተጨማሪ ይወቁ</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="relative rounded-lg overflow-hidden shadow-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-w-16 aspect-h-9 bg-gov-light/10">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                alt="የክፍለ ከተማው ሴቶች አመራሮች" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-gov-dark/90 to-transparent text-white">
              <h3 className="text-xl font-bold mb-2">አመራር</h3>
              <p className="opacity-90">የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ አመራሮች</p>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gov-dark mb-4">
              የሴቶች ክንፍ <span className="text-gov-accent">አመራሮች</span>
            </h3>
            <p className="text-gray-600 mb-4">ለመስፋት ወደ ግራ ወይም ወደ ቀኝ ይሳቡ (Scroll left or right to see more)</p>
            <div className="w-24 h-1 bg-gov-accent mx-auto"></div>
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <Carousel 
              opts={{
                align: "start",
                loop: true
              }}
              className="w-full"
            >
              <CarouselContent>
                {leadershipData.map((leader, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/5">
                    <div 
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border border-gray-100 h-full"
                    >
                      <div className="h-56 overflow-hidden">
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
    </section>
  );
};

export default AboutUs;
