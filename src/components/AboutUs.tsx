
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const AboutUs = () => {
  // Main leader data
  const mainLeader = {
    name: "ሜሮን መንግስቱ ከበደ",
    position: "በአቃቂ ቃሊቲ ክ/ ከተማ የሴቶች ክንፍ ጽ ቤት ኃላፊ",
    image: "/images/ሜሮን.jpg",
    message: "በአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ወደ መስመራችን እንኳን በደህና መጡ። እኛ የሴቶችን ኢኮኖሚያዊ፣ ፖለቲካዊ እና ማህበራዊ ተጠቃሚነት ለማሳደግ ቆርጠን የተነሳን ድርጅት ነን። የእኛ ዋና ዓላማ ሴቶች በሁሉም መስኮች የበላይነት እንዲኖራቸው፥ ራሳቸውን እንዲችሉ፥ እና በሀገራችን ግንባታ ውስጥ ንቁ ተሳታፊ እንዲሆኑ ማስቻል ነው። የእኛ ትልቁ ራዕይ በ2030 የሴቶችን መብት የሚያከብር፣ ተሳትፎአቸውን የሚያረጋግጥ፣ እና ሁለንተናዊ እድገታቸውን የሚያረጋግጥ ሁሉን አቀፍ ማህበረሰብ መፍጠር ነው።"
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gov-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gov-gold/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
      
      <div className="container-gov">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-2">
            <span className="text-gov-accent">ከአመራር</span> መልዕክት
          </h2>
          <div className="w-24 h-1 bg-gov-accent mx-auto"></div>
        </div>

        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto border border-gray-100">
          {/* Quote decoration */}
          <div className="absolute top-8 left-8 text-gov-accent/10 text-9xl font-serif">"</div>
          <div className="absolute bottom-8 right-8 text-gov-accent/10 text-9xl font-serif">"</div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Leader image - 5 columns on md screens */}
            <div className="md:col-span-5 h-full">
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
            
            {/* Message content - 7 columns on md screens */}
            <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                  {mainLeader.message}
                </p>
              </div>
              
              <div className="mt-auto border-t border-gray-100 pt-6">
                <div className="flex items-start">
                  <div>
                    <h4 className="font-bold text-xl text-gov-dark">{mainLeader.name}</h4>
                    <p className="text-gov-accent">{mainLeader.position}</p>
                  </div>
                </div>
                
                <div className="mt-6">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
