
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const achievements = [
  {
    id: 1,
    title: "የሴቶች የገቢ ማስገኛ ስልጠና",
    description: "በአምስት ወረዳዎች ውስጥ 500+ ሴቶች በተለያዩ የገቢ ማስገኛ ስልጠናዎች ላይ የተሳተፉበት፣ የራሳቸውን ንግድ ለመጀመር የሚያስችል ክህሎት እና እውቀት የተጎናጸፉበት ፕሮግራም።",
    image: "/placeholder.svg",
    category: "ስልጠና",
    date: "2014-2015"
  },
  {
    id: 2,
    title: "ለሴት ተማሪዎች የትምህርት ቁሳቁስ ድጋፍ",
    description: "ከ1000 በላይ ለሆኑ ሴት ተማሪዎች የትምህርት ቁሳቁስን በነጻ የማደል ፕሮግራም ተካሂዷል። ይህም ተማሪዎች በትምህርታቸው ላይ ያለምንም እንቅፋት እንዲያተኩሩ አስችሏቸዋል።",
    image: "/placeholder.svg",
    category: "ትምህርት",
    date: "2014-2015"
  },
  {
    id: 3,
    title: "የሴቶች ጤና ግንዛቤ ማስጨበጫ",
    description: "በ10 ወረዳዎች ውስጥ የተካሄደ የሴቶችን ጤና በተመለከተ ግንዛቤ ለማስጨበጥ የተዘጋጀ ፕሮግራም። ይህም 2000+ ሴቶች ስለ ሴቶች ጤና ተጨማሪ ዕውቀት እንዲኖራቸው ረድቷል።",
    image: "/placeholder.svg",
    category: "ጤና",
    date: "2014-2015"
  },
  {
    id: 4,
    title: "የሴቶች የመብት ጥበቃ",
    description: "በወረዳ ደረጃ የተካሄደ የሴቶችን መብት ለመጠበቅ የተዘጋጀ የግንዛቤ ማስጨበጫ ፕሮግራም። ይህም ሴቶች መብታቸውን እንዲያውቁና እንዲጠብቁ ረድቷል።",
    image: "/placeholder.svg",
    category: "መብት",
    date: "2014-2015"
  },
  {
    id: 5,
    title: "የመንገድ ሥራ ማሻሻያ ፕሮጀክት",
    description: "በሴቶች አመራር የተካሄደ የመንገድ ማሻሻያ ፕሮጀክት። በዚህም ፕሮጀክት 5 ኪ.ሜ የሚሆን መንገድ በሴቶች አመራር ተሻሽሏል።",
    image: "/placeholder.svg",
    category: "መሰረተ ልማት",
    date: "2014-2015"
  },
  {
    id: 6,
    title: "የሴቶች የሙያ ስልጠና",
    description: "አዳዲስ ቴክኖሎጂን መሰረት ያደረገ የስልጠና ፕሮግራም ተካሂዷል። ይህም 300+ ሴቶች በኮምፒውተር እና በሌሎች አዳዲስ ቴክኖሎጂዎች ላይ ስልጠና እንዲወስዱ ረድቷል።",
    image: "/placeholder.svg",
    category: "ስልጠና",
    date: "2014-2015"
  },
  {
    id: 7,
    title: "የስራ ፈጠራ ፕሮግራም",
    description: "ለሴቶች ተብሎ የተዘጋጀ የስራ ፈጠራ ፕሮግራም ተካሂዷል። ይህም 200+ ሴቶች የራሳቸውን ንግድ እንዲጀምሩ ረድቷል።",
    image: "/placeholder.svg",
    category: "ስራ ፈጠራ",
    date: "2014-2015"
  },
  {
    id: 8,
    title: "የሴቶች የስራ ማህበራት ምስረታ",
    description: "በወረዳ ደረጃ በሴቶች የሚመሩ 25 የስራ ማህበራት ተመስርተዋል። እነዚህም ማህበራት ለበርካታ ሴቶች የስራ እድል ፈጥረዋል።",
    image: "/placeholder.svg",
    category: "ማህበራት",
    date: "2014-2015"
  },
];

const AllAchievements = () => {
  useEffect(() => {
    document.title = "ውጤቶች | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container-gov">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            <div>
              <div className="flex items-center mb-2">
                <Link to="/" className="text-gov-accent hover:underline text-sm">መነሻ</Link>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                <span className="text-gray-600 text-sm">ውጤቶች</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
                <span className="text-gov-accent">የእስካሁን ድርሻችን</span>
              </h1>
              <p className="text-gray-600 max-w-2xl">
                በአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ የተከናወኑ ሥራዎች እና የተገኙ ውጤቶች
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
              >
                <div className="relative h-56 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-gov-gold text-gov-dark text-sm font-medium px-3 py-1 rounded-full">
                    {achievement.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white text-gov-dark text-sm font-medium px-3 py-1 rounded-full">
                    {achievement.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gov-dark mb-3">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllAchievements;
