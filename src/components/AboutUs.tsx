
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const AboutUs = () => {
  const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);

  const leaders = [
    {
    name: "አቶ አለማየሁ ሚጀና",
    position: "የአቃቂ ቃሊቲ ክ/ ከተማ ዋና ስራ አሰፈጻሚ",
    image: "/images/አቶ አለማየሁ ሚጀና.jpg",
 message: "ከተማችን አዲስ አበባ የዘመነች፣ በአለም ተመራጭና ተወዳዳሪ፣ ለነዋሪዎቿ ምቹ እንድትሆን 7/24 እየተሰራ ይገኛል።\n\nአቃቂ ቃሊቲ ክ/ከተማም ለረጅም አመታት ከምትታወቅበት የመሰረተ ልማት ችግሮች ተላቃ በሰፋፊ የአስፓልት መንገዶችና በግዙፍ ሰዉ ተኮር ፕሮጀክቶች፤ በራስ አቅም የለማ ኮሪደር ባለቤት የሆነች፣ በክብርት ከንቲባችን ወ/ሮ አዳነች አቤቤ ሀሳብ አመንጪነት ለከፍተኛ ማህበራዊና ኢኮኖሚያዊ ቀዉስ ተጋላጭ የሆኑ ሴቶችን ህይወት በመቀይር ተስፋን የሚያሰንቅ የነገዋ የሴቶች ተሃድሶና ክህሎት ማበልፀጊያ ማዕከል፣በክብር ቀዳማዊት እመቤት ዝናሽ ታያቸዉ የተገነባዉ ሼካ ፋጢማ ቤንት ሙባረክ የአይነ ስዉራን አዳሪ ት/ቤት፣ የእንስሳት የምርምርና ልህቀት ማዕከል፣ አቃቂ ኢንተርናሽናል ስታዲየም፣ አቅም የሌላቸዉ ነዋሪዎቿ በቀን 1 ጊዜ የሚመገቡበት 2 የምገባ ማዕከላት፣ የወንዶች አዳሪ ት/ቤት፣ከተማዋ ስትለማ ነዋሪዎቿም አብረዉ ይለሙ ዘንድ ወደ ገላን ጉራ የመኖርያና የተቀናጀ የልማት መንደር የመጡ ነዋሪዎችን በፍቅር ተቀብላ ያስተናገደች፣ ተካፍሎ መብላትንና እዉነተኛ ወንድማማችነት እና እህትማማችነትን ተግባራዊ በማድረግ መሰል የግዙፍ ሰዉ ተኮር የልማት ፕሮጀክቶች ማዕከል በመሆን የለዉጡ ትሩፋቶች አብነታዊ ማሳያ ለመሆን ችላለች።\n\nይህንን የተጀመረ ጥረት አመራሮች፣ ነዋሪዎች እና አጠቃላይ ማህበረሰቡን በማስተባበር አጠናክረን የምንቀጥል ይሆናል።"
    },
 {
 name: "አቶ ዮሀንስ ለገሠ",
 position: "በአቃቂ ቃሊቲ ክ/ ከተማ ብልጽግና ፓርቲ ቅርጫፍ ጽ/ ቤት ኃላፊ",
 image: "/images/አቶ ዮሀንስ ለገሠ.jpg",
 message: "ብልፅግና ፓርቲ የዜጎችን ሁለንተናዊ ተሳትፎ ያረጋገጠች ህብረ ብሔራዊት ሀገር መገንባትን አልሞ እየሰራ ያለ ፓርቲ ነው፡፡ ፓርቲያችን ብልፅግና የሴቶች ተጠቃሚነት ያረጋገጠ በኢኮኖሚ ተጠቃሚነት ላይ አተኩሮ በመስራት ሰፊ ውጤት እያስመዘገበ ይገኛል።\nበክ/ከተማችንም ፓርቲያችን ብልፅግና ባስቀመጠው አቅጣጫ በፓርቲ ማኔጅመንት ውስጥ አንዷ ሴት እንድትሆን በመወሰን ባሉን 12 ወረዳዎች ሴቶች ከፊት ሆነው እንዲመሩ በማድረግ እንዲሁም ሴቶች ወደ አስተባባሪ ኮሚቴ እና ሴክተሮች ላይ በብቃት መምራት እንዲችሉ ፓርቲያችን አተኩሮ እየሰራ ይገኛል።\nብልፅግና ፓርቲ አካታችነትንና አቃፊነትን መርሁ ያደረገው ፓርቲያችን በትብብርና በፉክክር እንዲሁም በሀገራዊና በብሔራዊ ማንነቶች መካከል ያለውን ሚዛን እያስጠበቀ በብሔራዊነት ገዢ ትርክት በማስረፅ ረገድ ሴቶች ከፍተኛውን ሚና ይወስዳሉ።\n\nሀገራችን ኢትዮጵያን ከአፍሪካ አምስት የግዙፍ ኢኮኖሚ ባለቤቶች ተርታ የማሰለፍ ትልም አንግቦ በፍላጎት ብቻ ሳይሆን በብርቱ ጥረት ታጅቦ የተጋው ፓርቲያን ቃልን በተግባር መፈፀም ቃሉን በተግባር ያሳየ ፓርቲ ብልፅግና ነው።"
    },
 {
 name: "ወ/ ሮ ሜሮን መንግስቱ",
 position: "የአቃቂ ቃሊቲ ክ/ ከተማ የብልጽግና ሴቶች ክንፍ ጽ/ ቤት ኃላፊ",
 image: "/images/ሜሮን.jpg", // Assuming 'ሜሮን.jpg' is the correct image for ወ/ ሮ ሜሮን መንግስቱ
 message: "ብልፅግና ፓርቲ ከዚህ በፊት የነበሩ ስብራቶችን በመጠገን ህብረ ብሔራዊ እህትማማችነትና ወንድማማችነትን እያጎለበተ ያለ ፓርቲ ሲሆን በዚህ ሂደት ውስጥ የሴቶች ሚና እጅግ የጎላ ነው።\nየዲሞክራሲ ስርዓትን ከማስፈን አኳያ የሴቶች የዲሞክራሲ ስርዓት የሚጀምረው ቤትን በብቃትና በነፃነት በማስተዳደር በመሆኑ በፓርቲው የተቀመጠውን አቅጣጫ ለመተግበር አይቸገሩም።\nበፓርቲያችን 2ኛ መደበኛ ጉባኤ ከተቀመጡ አቅጣጫዎች ዋናው የዲሞክራሲ ስርዓት ግንባታን ማጎልበት ነው። በዚህ ሂደት ያላቸውን ልምድ ተጠቅመው በዲሞክራሲያዊ ስርዓት ግንባታ ላይ የበኩላቸውን ድርሻ ተወጥተዋል። በቀጣይም አጠናክረን እንቀጥላለን።\n\nበቀጣይ በአንድ በኩል ፓርቲው ያስቀመጠውን ዓበይት የጉባኤ አቅጣጫዎች በምልዓት ለመተግበር በሌላ አግባብ የሴቶችን ተጠቃሚነት ይበልጥ የሚያጎለብቱ ተግባራት ማለትም በስራ እድል ፈጠራ፣ በሌማት ትሩፋት እና በሌሎች የገቢ ማስገኛ መንገዶች ሴቶችን ተጠቃሚ በማድረግ የብልፅግናን ጉዞ ለማፋጠን በርካታ እቅዶችን ስለያዝን መላው የክፍለ ከተማችን ሴቶች እንዲሁም የክንፉ አባላትን በማስተባበር ፓርቲያችን ያሰበዉን የብልጽግና ጉዞ እዉን እንዲሆን የበኩላችንን ድርሻ እንወጣለን።"
    }
  ];

  const handlePrevious = () => {
 setCurrentLeaderIndex(
      (prevIndex) => (prevIndex - 1 + leaders.length) % leaders.length
    );
  };

  const handleNext = () => {
 setCurrentLeaderIndex(
      (prevIndex) => (prevIndex + 1) % leaders.length
    );
  };

  const currentLeader = leaders[currentLeaderIndex];

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
                  src={currentLeader.image} 
                  alt={currentLeader.name}
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
                  {currentLeader.message}
                </p>
              </div>
              
              <div className="mt-auto border-t border-gray-100 pt-6">
                <div className="flex items-start justify-between">
                  <div>
 <h4 className="font-bold text-xl text-gov-dark">{currentLeader.name}
</h4>
                    <p className="text-gov-accent">{currentLeader.position}</p>
                  </div>

                {/* Navigation Arrows */}
 <div className="flex space-x-4 items-center">
 <Button variant="ghost" size="icon" onClick={handlePrevious} className="z-20"><ChevronLeft className="h-6 w-6 text-gov-dark" /></Button>
 <Button variant="outline" size="icon" onClick={handleNext} className="z-20"><ChevronRight className="h-6 w-6 text-gov-dark" /></Button>
                </div>
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
