import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const membersPerPage = 3;
  const totalMembers = 9;
  const totalPages = Math.ceil(totalMembers / membersPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + membersPerPage >= totalMembers ? 0 : prevIndex + membersPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - membersPerPage < 0 ? Math.floor((totalMembers - 1) / membersPerPage) * membersPerPage : prevIndex - membersPerPage
    );
  };

  const getVisibleMembers = () => {
    const endIndex = Math.min(currentIndex + membersPerPage, totalMembers);
    return Array.from({ length: endIndex - currentIndex }, (_, i) => {
      const memberIndex = (currentIndex + i) % totalMembers;
      return {
        id: memberIndex + 1,
        name: getMemberName(memberIndex + 1),
        role: getMemberRole(memberIndex + 1),
        description: getMemberDescription(memberIndex + 1),
      };
    });
  };

  const getMemberName = (index: number) => {
    const names = [
      "ወ/ሮ አበባ መኮንን",
      "ወ/ሮ ብርሃን አሰፋ",
      "ወ/ሮ ፍሬህይወት በቀለ",
      "ወ/ሮ ሰናይት አሰፋ",
      "ወ/ሮ ሐና በቀለ",
      "ወ/ሮ ሰማይት ተካሉ",
      "ወ/ሮ ራህም አለሙ",
      "ወ/ሮ ሰላም ተካሉ",
      "ወ/ሮ ሐዋስ በቀለ"
    ];
    return names[index - 1] || "";
  };

  const getMemberRole = (index: number) => {
    const roles = [
      "የሴቶች ክንፍ ሊቀመንበር",
      "የሴቶች ክንፍ ም/ሊቀመንበር",
      "የሴቶች ክንፍ ጸሐፊ",
      "የሴቶች ክንፍ የገንዘብ አስተዳደር ሃላፊ",
      "የሴቶች ክንፍ የመረጃ አስተዳደር ሃላፊ",
      "የሴቶች ክንፍ የማህበራዊ አገልግሎት ሃላፊ",
      "የሴቶች ክንፍ የትምህርት አገልግሎት ሃላፊ",
      "የሴቶች ክንፍ የኢኮኖሚ አገልግሎት ሃላፊ",
      "የሴቶች ክንፍ የጤና አገልግሎት ሃላፊ"
    ];
    return roles[index - 1] || "";
  };

  const getMemberDescription = (index: number) => {
    const descriptions = [
      "ከ15 አመት በላይ የፖለቲካ ልምድ ያላቸው ሲሆን፣ በሴቶች መብት ማስከበር ዙሪያ በተለይ ይሰራሉ። የአቃቂ ቃሊቲ ክ/ከተማ ምክር ቤት አባል ናቸው።",
      "ከ12 አመት በላይ የሲቪል ማህበራት ልምድ ያላቸው ሲሆን፣ በሴቶች ትምህርት ዙሪያ በተለይ ይሰራሉ። የሴቶች ትምህርት ማስተባበሪያ ኮሚቴ አባል ናቸው።",
      "ከ10 አመት በላይ የሴቶች ኢኮኖሚ አቅም ግንባታ ልምድ ያላቸው ሲሆን፣ የሴቶች ኢኮኖሚያዊ ጉዳዮች ኮሚቴ ሰብሳቢ ናቸው። በሴቶች ኢኮኖሚያዊ ጉዳዮች ዙሪያ ይሰራሉ።",
      "ከ8 አመት በላይ የገንዘብ አስተዳደር ልምድ ያላቸው ሲሆን፣ በሴቶች የገንዘብ አስተዳደር ዙሪያ በተለይ ይሰራሉ። የሴቶች የገንዘብ አስተዳደር ኮሚቴ አባል ናቸው።",
      "ከ7 አመት በላይ የመረጃ አስተዳደር ልምድ ያላቸው ሲሆን፣ በሴቶች መረጃ አስተዳደር ዙሪያ በተለይ ይሰራሉ። የሴቶች መረጃ አስተዳደር ኮሚቴ አባል ናቸው።",
      "ከ6 አመት በላይ የማህበራዊ አገልግሎት ልምድ ያላቸው ሲሆን፣ በሴቶች ማህበራዊ አገልግሎት ዙሪያ በተለይ ይሰራሉ። የሴቶች ማህበራዊ አገልግሎት ኮሚቴ አባል ናቸው።",
      "ከ5 አመት በላይ የትምህርት አገልግሎት ልምድ ያላቸው ሲሆን፣ በሴቶች ትምህርት አገልግሎት ዙሪያ በተለይ ይሰራሉ። የሴቶች ትምህርት አገልግሎት ኮሚቴ አባል ናቸው።",
      "ከ4 አመት በላይ የኢኮኖሚ አገልግሎት ልምድ ያላቸው ሲሆን፣ በሴቶች ኢኮኖሚ አገልግሎት ዙሪያ በተለይ ይሰራሉ። የሴቶች ኢኮኖሚ አገልግሎት ኮሚቴ አባል ናቸው።",
      "ከ3 አመት በላይ የጤና አገልግሎት ልምድ ያላቸው ሲሆን፣ በሴቶች ጤና አገልግሎት ዙሪያ በተለይ ይሰራሉ። የሴቶች ጤና አገልግሎት ኮሚቴ አባል ናቸው።"
    ];
    return descriptions[index - 1] || "";
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-gov">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
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
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-w-16 aspect-h-9 bg-gov-light/10">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                alt="የክፍለ ከተማው ሴቶች አመራሮች" 
                className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-gov-dark/95 via-gov-dark/70 to-transparent text-white">
              <h3 className="text-2xl font-bold mb-2">አመራር</h3>
              <p className="opacity-90 text-lg">የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ አመራሮች</p>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mt-32 relative">
          <div className="absolute inset-0 bg-gov-accent/5 -skew-y-3 transform -z-10 rounded-3xl"></div>
          <div className="text-center mb-16 relative">
            <span className="text-gov-accent text-sm font-semibold tracking-wider uppercase mb-2 block">የእኛ ቡድን</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
              የሴቶች ክንፍ <span className="text-gov-accent">አመራሮች</span>
            </h3>
            <div className="w-32 h-1.5 bg-gov-accent mx-auto rounded-full"></div>
          </div>
          <div className="relative px-4">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(currentIndex / membersPerPage) * 100}%)`,
                  width: `calc(${getVisibleMembers().length} * 100% / ${membersPerPage})`,
                }}
              >
                {getVisibleMembers().map((member, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 px-4"
                    style={{ width: `calc(100% / ${membersPerPage})` }}
                  >
                    <div className="bg-gradient-to-b from-white to-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <span className="text-lg">የባለሃላፊ ምስል</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gov-dark text-center mb-2">{member.name}</h3>
                      <p className="text-gov-accent text-center font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 text-center text-sm">{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Slider Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-gov-dark" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-gov-dark" />
            </button>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * membersPerPage)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex === index * membersPerPage ? 'bg-gov-accent' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
