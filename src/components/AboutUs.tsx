import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquareQuote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const leaders = [
    {
    name: "አቶ አለማየሁ ሚጀና",
    position: "የአቃቂ ቃሊቲ ክ/ ከተማ ዋና ስራ አሰፈጻሚ",
    image: "/አቶ አለማየሁ ሚጀና.jpg",
 message: "ከተማችን አዲስ አበባ የዘመነች፣ በአለም ተመራጭና ተወዳዳሪ፣ ለነዋሪዎቿ ምቹ እንድትሆን 7/24 እየተሰራ ይገኛል።\n\nአቃቂ ቃሊቲ ክ/ከተማም ለረጅም አመታት ከምትታወቅበት የመሰረተ ልማት ችግሮች ተላቃ በሰፋፊ የአስፓልት መንገዶችና በግዙፍ ሰዉ ተኮር ፕሮጀክቶች፤ በራስ አቅም የለማ ኮሪደር ባለቤት የሆነች፣ በክብርት ከንቲባችን ወ/ሮ አዳነች አቤቤ ሀሳብ አመንጪነት ለከፍተኛ ማህበራዊና ኢኮኖሚያዊ ቀዉስ ተጋላጭ የሆኑ ሴቶችን ህይወት በመቀይር ተስፋን የሚያሰንቅ የነገዋ የሴቶች ተሃድሶና ክህሎት ማበልፀጊያ ማዕከል፣በክብር ቀዳማዊት እመቤት ዝናሽ ታያቸዉ የተገነባዉ ሼካ ፋጢማ ቤንት ሙባረክ የአይነ ስዉራን አዳሪ ት/ቤት፣ የእንስሳት የምርምርና ልህቀት ማዕከል፣ አቃቂ ኢንተርናሽናል ስታዲየም፣ አቅም የሌላቸዉ ነዋሪዎቿ በቀን 1 ጊዜ የሚመገቡበት 2 የምገባ ማዕከላት፣ የወንዶች አዳሪ ት/ቤት፣ከተማዋ ስትለማ ነዋሪዎቿም አብረዉ ይለሙ ዘንድ ወደ ገላን ጉራ የመኖርያና የተቀናጀ የልማት መንደር የመጡ ነዋሪዎችን በፍቅር ተቀብላ ያስተናገደች፣ ተካፍሎ መብላትንና እዉነተኛ ወንድማማችነት እና እህትማማችነትን ተግባራዊ በማድረግ መሰል የግዙፍ ሰዉ ተኮር የልማት ፕሮጀክቶች ማዕከል በመሆን የለዉጡ ትሩፋቶች አብነታዊ ማሳያ ለመሆን ችላለች።\n\nይህንን የተጀመረ ጥረት አመራሮች፣ ነዋሪዎች እና አጠቃላይ ማህበረሰቡን በማስተባበር አጠናክረን የምንቀጥል ይሆናል።"
    },
 {
 name: "አቶ ዮሀንስ ለገሠ",
 position: "በአቃቂ ቃሊቲ ክ/ ከተማ ብልጽግና ፓርቲ ቅርጫፍ ጽ/ ቤት ኃላፊ",
 image: "/images/አቶ ዮሀንስ ለገሠ.jpg",
 message: "ብልፅግና ፓርቲ የዜጎችን ሁለንተናዊ ተሳትፎ ያረጋገጠች ህብረ ብሔራዊት ሀገር መገንባትን አልሞ እየሰራ ያለ ፓርቲ ነው፡፡ ፓርቲያችን ብልፅግና የወጣቶች ተጠቃሚነት ያረጋገጠ በኢኮኖሚ ተጠቃሚነት ላይ አተኩሮ በመስራት ሰፊ ውጤት እያስመዘገበ ይገኛል።\nበክ/ከተማችንም ፓርቲያችን ብልፅግና ባስቀመጠው አቅጣጫ መሰረት ካሉት አመራሮች ውስጥ ከ70% በላይ የሚሆኑት አመራሮች ወጣቶች ናቸው። ይህ የሚያሳየው ብልጽግና ፓርቲ የወጣቶች ፓርቲ እየሆነ እንደመጣ  የሚያመለክት ሲሆን በቀጣይም ወጣቶች በፓርቲ ውስጥ ትልቁን ሚና የሚጫወቱ ይሆናል።\nብልፅግና ፓርቲ አካታችነትንና አቃፊነትን መርሁ ያደረገው ፓርቲያችን በትብብርና በፉክክር እንዲሁም በሀገራዊና በብሔራዊ ማንነቶች መካከል ያለውን ሚዛን እያስጠበቀ በብሔራዊነት ገዢ ትርክት በማስረፅ ረገድ ሴቶች ከፍተኛውን ሚና ይወስዳሉ።\n\nሀገራችን ኢትዮጵያን ከአፍሪካ አምስት የግዙፍ ኢኮኖሚ ባለቤቶች ተርታ የማሰለፍ ትልም አንግቦ በፍላጎት ብቻ ሳይሆን በብርቱ ጥረት ታጅቦ የተጋው ፓርቲያን ቃልን በተግባር መፈፀም ቃሉን በተግባር ያሳየ ፓርቲ ብልፅግና ነው።"
    },
 {
 name: "አቶ አበባው አዲስ",
 position: "የአቃቂ ቃሊቲ ክ/ ከተማ የብልጽግና ወጣት ክንፍ ጽ/ ቤት ኃላፊ",
      image: "/images/A3.jpg",
 message: "ሀገራችን ኢትዬጵያ ካሏት የህዝብ ቁጥር ውስጥ ከ60-70% የሚሆኑት  ወጣቶች ሲሆኑ የሀገራችነን ብልፅግና እውን ለማረግ የሚዎጡ ስትራቴጅዎችና ፖሊሲዎች  ሊፈፀሙ የሚችሉት ወጣቶችን ማዕከል ያደረገ በመሆኑና ሌሎችን እንደ ምክኒያት በመውሰድ ሀገራችን ኢትዬጵያ የወጣቶች ሀገር ናት ማለት ይቻላል።የብልፅግና ፓርቲ በመጀመሪያውም ሆነ በ2ኛው መደበኛ ጉባኤው ከወስጣዊ የአመራር አደረጃጅት ጀምሮ እስከ አባሉ ድረስ በወጣት የተገነባ ፓርቲ ለማድረግ ውሳኔዎችን በመወሰን አሁን ባለው ሁኔታ ፓርቲው የወጣቶች ፓርቲ መሆን ችሏል።የብልፅግና ወጣቶች ክንፍ ዋነኛ ዓላማው የወጣቶች ፖለቲካዊ፤ኢኮኖሚያዊና ማህበራዊ ተሳትፎ ከማረጋገጥ በዘለለ በወጣቶች ዘንድ መሰረታዊ ለውጥ ማምጣት ሲሆን ከዚህ አኳያ  በክፍለ ከተማችን ባለፉት ዓመታት ወጣቶች በሁሉም ዘርፍ ተሳትፏቸውን ለማረጋገጥ ሰፊ ስራዎች የተሰሩ ሲሆን በተለይ በክፍለ ከተማው ውስጥ ባለው የኢኮኖሚ ግንባታ የወጣቶች ድርሻና ተጠቃሚነትን ማረጋገጥ የተቻለ ሲሆን ከዚህ ባለፈ ወጣቶች በፖለቲካውና በማህበራዊ ዘርፍ ከመሳተፍ በዘለለ በበጎ ፍቃድ ስራዎችና ገዥ ትርክት በማስረፅም በኩል ሰፊ ስራዎችን መስራት ተችሏል።እነዚህንና ሌሎች ስራዎችን መስራት በመቻሉ የክፍለ ከተማችን ወጣቶች ክፍለ ከተማው ውስጥ ባሉ የፖለቲካ ኢኮኖሚ ስራዎች ላይ ድርሻቸው ትልቅ ነው።"
    }
  ];

  // Autoplay timer
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentLeaderIndex(prev => (prev + 1) % leaders.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [autoplay, leaders.length]);

  // Reset autoplay when user interacts
  const handleNavigation = (direction) => {
    setAutoplay(false);
    
    if (direction === 'prev') {
      setCurrentLeaderIndex(prev => (prev - 1 + leaders.length) % leaders.length);
    } else {
      setCurrentLeaderIndex(prev => (prev + 1) % leaders.length);
    }
  };

  // Format message with paragraphs
  const formatMessage = (message) => {
    return message.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  const currentLeader = leaders[currentLeaderIndex];

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gov-gold/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gov-blue/5 blur-3xl" />
        
        {/* Decorative pattern */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gov-blue/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gov-blue/20 to-transparent" />
      </div>
      
      <div className="container-gov relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-2 px-5 rounded-full text-sm font-medium bg-gov-blue/10 text-gov-blue mb-4">
              <Users className="inline-block w-4 h-4 mr-2" />
              አመራሮቻችን
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gov-blue">ከአመራር</span>{" "}
            <span className="text-gov-gold">መልዕክት</span>
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-gov-blue to-gov-gold rounded-full mx-auto mb-6"
          />
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            የአቃቂ ቃሊቲ ክ/ ከተማ የብልጽግና ፓርቲ አመራሮች ራዕያቸውን እና አመለካከታቸውን የሚያካፍሉበት
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute -top-6 left-0 right-0 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-gov-blue to-gov-gold"
                initial={{ width: `${(currentLeaderIndex / leaders.length) * 100}%` }}
                animate={{ width: `${((currentLeaderIndex + 1) / leaders.length) * 100}%` }}
                transition={{ duration: autoplay ? 10 : 0.5, ease: "linear" }}
              />
            </div>
            
            {/* Main content */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Leader image - with 3D hover effect */}
                <div className="md:col-span-5 h-full group perspective">
                  <div className="h-full w-full overflow-hidden bg-slate-100 transform transition-all duration-500 md:group-hover:rotate-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentLeaderIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-full"
                      >
                        <div className="relative h-full">
                <img 
                  src={currentLeader.image} 
                  alt={currentLeader.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Image credit on hover */}
                          <div className="absolute left-0 right-0 bottom-0 p-4 transform md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-300 opacity-0 md:group-hover:opacity-100">
                            <h3 className="text-white font-bold text-xl truncate">{currentLeader.name}</h3>
                            <p className="text-white/80 text-sm truncate">{currentLeader.position}</p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
              </div>
            </div>
            
                {/* Message content */}
                <div className="md:col-span-7 p-6 md:p-10 flex flex-col">
                  {/* Large decorative quote */}
                  <div className="absolute top-6 right-8 text-slate-100 z-0">
                    <MessageSquareQuote className="w-24 h-24" />
              </div>
              
                  <div className="mb-4 relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentLeaderIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-gray-700 text-lg leading-relaxed relative">
                          {formatMessage(currentLeader.message)}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <div className="mt-auto border-t border-slate-100 pt-6">
                    <div className="flex items-start justify-between">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentLeaderIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.5 }}
                          className="flex-1"
                        >
                          <h4 className="font-bold text-xl text-gov-dark">{currentLeader.name}</h4>
                          <p className="text-gov-blue">{currentLeader.position}</p>
                        </motion.div>
                      </AnimatePresence>

                {/* Navigation Arrows */}
                      <div className="flex space-x-3 items-center">
                        <div className="text-sm text-gray-500 mr-2">{currentLeaderIndex + 1} / {leaders.length}</div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleNavigation('prev')}
                          className="rounded-full border-slate-200 hover:border-gov-blue hover:text-gov-blue transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleNavigation('next')}
                          className="rounded-full border-slate-200 hover:border-gov-blue hover:text-gov-blue transition-colors"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                </div>
                </div>
              </div>
            </motion.div>
            
            {/* Pagination dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {leaders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrentLeaderIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentLeaderIndex 
                      ? "bg-gov-gold w-8" 
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`View leader ${index + 1}`}
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
