
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
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
            
            <Button className="bg-gov-accent text-white hover:bg-gov-accent/90 group relative overflow-hidden">
              <span className="relative z-10">ተጨማሪ ይወቁ</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gov-accent to-gov-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="relative rounded-lg overflow-hidden shadow-xl animate-fade-in-up group" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-w-16 aspect-h-9 bg-gov-light/10">
              <img 
                src="/placeholder.svg" 
                alt="የክፍለ ከተማው ሴቶች አመራሮች" 
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-gov-dark/90 to-transparent text-white transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
              <h3 className="text-xl font-bold mb-2">አመራር</h3>
              <p className="opacity-90">የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ አመራሮች</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
