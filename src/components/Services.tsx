import React from "react";
import { CheckCircle, Circle } from "lucide-react";

const sectionColors = [
  "bg-blue-100 border-blue-400 text-blue-900",
  "bg-green-100 border-green-400 text-green-900",
  "bg-yellow-100 border-yellow-400 text-yellow-900",
  "bg-purple-100 border-purple-400 text-purple-900",
];

const sections = [
  {
    title: "የብልጽግና ፓርቲ የውጭ ግንኙነት ፕሮግራም ቀጣይ ግቦች",
    goals: [
      "01 ሀገራዊ ክብርን የሚያረጋግጥ የውጭ ግንኙነት",
      "02 ለትብብርና ለጋራ ተጠቃሚነት ትኩረት በመሰጠት አጋሮቻችንን ማስፋት",
      "03 የብዙዮሽ ትብብር ተቋማት ተሰሚነትን መጨመር እና ፖሊሲያዊ ነፃነትን ማስከበር",
      "04 ለጎረቤት ሀገራት ትኩረት በመስጠት ዘርፈ ብዙ የጋራ ተጠቃሚነትን ማረጋገጥ",
      "05 የኢትዮጵያውያንና ትውልደ ኢትዮጵያውያንን ተሳትፎ ማሳደግ",
      "06 ሀገራዊ ክብርን እና ሀገራዊ ጥቅምን የሚያስጠብቅ የውጭ ግንኙነት የመፈፀም አቅም መገንባት ናቸው፡፡"
    ]
  },
  {
    title: "የብልጽግና ፓርቲ የኢኮኖሚ ፕሮግራም ቀጣይ ግቦች",
    goals: [
      "01 የብዝሃ ዘርፍ የኢኮኖሚ መዋቅር መገንባት",
      "02 ሀብት ፈጠራን የሚያሳድግ እውቀት-መር ኢኮኖሚ መገንባት",
      "03 ከተሜነት እና የከተማ ልማትን ማስፋፋት ናቸው፡፡",
      "04 ጥራት ያለው የኢኮኖሚ ልማትና ምርታማነትን መሰረት ያደረገ"
    ]
  },
  {
    title: "የብልጽግና ፓርቲ የማህበራዊ ፕሮግራም ቀጣይ ግቦች",
    goals: [
      "01 ፍትሃዊነት፣ ጥራት እና አግባብነት ያለው የትምህርትና ስልጠና ስርዓት ማረጋገጥ",
      "02 መከላከልን መሰረት ያደረገ የጤና ስርዓት መዘርጋት",
      "03 የሀገራችንን አቅም ያገናዘበ የማህበራዊ ጥበቃ ስርዓት መዘርጋት",
      "04 የሴቶችና የወጣቶች የፖለትካ የኢኮኖሚና ማህበራዊ ተሳትፎና ተጠቃሚነት ማጎልበት",
      "05 ብዙሃነታችንን ማዕከል ያደረገ የቋንቋ ባህልና ቅርጽ ልማት ናቸው።"
    ]
  },
  {
    title: "የብልጽግና ፓርቲ የፖለቲካ ፕሮግራም ግቦች",
    goals: [
      "01 ዘላቂና አዎንታዊ ሰላምን ማረጋገጥ",
      "02 በተቋማዊና ሕዝባዊ ባህል ላይ የቆመ የዴሞክሪሲ ሥርዓት መገነባት",
      "03 ቅቡል ሀገረ መንግሥት ለመገነባት የሚያስችል ሀገራዊ መግባባት መፍጠር"
    ]
  }
];

const Services = () => (
  <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
    <div className="container mx-auto px-4 sm:px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gov-blue drop-shadow-sm">
        የብልጽግና ፓርቲ ፕሮግራሞች
      </h2>
      <div className="flex flex-col gap-10 md:gap-14 max-w-4xl mx-auto">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={`relative border-l-4 pl-8 py-8 bg-white shadow-lg rounded-xl ${sectionColors[idx % sectionColors.length]} transition-all`}
          >
            <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-white border-4 border-gov-blue flex items-center justify-center shadow">
              <CheckCircle className="w-5 h-5 text-gov-blue" />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gov-blue tracking-tight drop-shadow-sm">
              {section.title}
            </h3>
            <ol className="space-y-4 ml-2">
              {section.goals.map((goal, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-block mt-1">
                    <Circle className="w-4 h-4 text-gov-gold" />
                  </span>
                  <span className="text-lg text-gray-800 leading-relaxed">{goal}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
