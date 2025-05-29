
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "የወጣቶች ቀን በደማቅ ሁኔታ ተከበረ",
    excerpt: "የዓለም አቀፍ የወጣቶች ቀን በአቃቂ ቃሊቲ ክፍለ ከተማ ከፍተኛ ባለስልጣናት እና የማህበረሰብ መሪዎች በተገኙበት በደማቅ ሁኔታ ተከበረ።",
    date: "መጋቢት 8, 2015",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4",
    category: "ዝግጅቶች",
  },
  {
    id: 2,
    title: "የወጣቶች የገቢ ማስገኛ ትምህርት ተጀመረ",
    excerpt: "በአቃቂ ቃሊቲ ክፍለ ከተማ በሴቶች ላይ ያተኮረ አዲስ የገቢ ማስገኛ ትምህርት በ5 ወረዳዎች ተጀምሯል።",
    date: "የካቲት 25, 2015",
    imageUrl: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31",
    category: "ስልጠና",
  },
  {
    id: 3,
    title: "የወረዳ ምርጫ ለመጪው ወር ተቀጥሯል",
    excerpt: "በአቃቂ ቃሊቲ ክፍለ ከተማ የሚካሄደው የወረዳ ምርጫ ለመጪው ወር ተቀጥሯል ተብሎ ተገለፀ።",
    date: "የካቲት 15, 2015",
    imageUrl: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5",
    category: "ምርጫ",
  },
  {
    id: 4,
    title: "ለሴቶች በነፃ የህክምና አገልግሎት ተጀመረ",
    excerpt: "በአቃቂ ቃሊቲ ክፍለ ከተማ የሚገኙ ሴቶች በነፃ የጤና ምርመራ እና ክትትል እንዲያገኙ አዲስ ፕሮግራም ተጀምሯል።",
    date: "የካቲት 8, 2015",
    imageUrl: "https://images.unsplash.com/photo-1631815588090-608013186c84",
    category: "ጤና",
  },
  {
    id: 5,
    title: "የወጣቶች የኮምፒውተር ስልጠና ተጠናቀቀ",
    excerpt: "200 ሴቶች በአቃቂ ቃሊቲ ክፍለ ከተማ የተዘጋጀውን የኮምፒውተር ስልጠና በብቃት አጠናቀዋል።",
    date: "ጥር 28, 2015",
    imageUrl: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf",
    category: "ስልጠና",
  },
  {
    id: 6,
    title: "የወጣቶች አነስተኛ ብድር ፕሮግራም ተጀመረ",
    excerpt: "የወጣቶች ኢኮኖሚያዊ ተሳትፎን ለማሳደግ የተዘጋጀ የብድር ፕሮግራም አቃቂ ቃሊቲ ክፍለ ከተማ ውስጥ ተጀመረ።",
    date: "ጥር 15, 2015",
    imageUrl: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0",
    category: "ፋይናንስ",
  },
  {
    id: 7,
    title: "የህፃናት ክትባት ዘመቻ በተሳካ ሁኔታ ተጠናቀቀ",
    excerpt: "በአቃቂ ቃሊቲ ክፍለ ከተማ የተዘጋጀው የህፃናት ክትባት ዘመቻ በተሳካ ሁኔታ ተጠናቀቀ።",
    date: "ጥር 5, 2015",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    category: "ጤና",
  },
  {
    id: 8,
    title: "የወጣቶች ፖለቲካ ተሳትፎ ማሳደግ ውይይት ተካሄደ",
    excerpt: "የወጣቶችን በፖለቲካ ውሳኔ አሰጣጥ ሂደቶች ተሳትፎ ለማሳደግ የሚረዳ ውይይት ተካሄደ።",
    date: "ታህሳስ 25, 2015",
    imageUrl: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5",
    category: "ውይይት",
  },
];

const AllNews = () => {
  useEffect(() => {
    document.title = "ዜናዎች | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ወጣት ክንፍ";
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
                <span className="text-gray-600 text-sm">ዜናዎች</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
                <span className="text-gov-accent">የቅርብ ጊዜ ዜናዎች</span>
              </h1>
              <p className="text-gray-600 max-w-2xl">
                ከአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ወጣት ክንፍ ቅርንጫፍ ጽ/ቤት የቅርብ ጊዜ ዜናዎች እና ማስታወቂያዎች
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsItems.map((item, index) => (
              <div 
                key={item.id}
                className="animate-fade-in-up opacity-0 bg-white rounded-xl overflow-hidden shadow-sm group"
                style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-gov-gold text-gov-dark text-sm font-medium px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gov-dark mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                  <Button variant="ghost" className="text-gov-accent hover:text-gov-accent/80 hover:bg-gov-accent/5 px-0 group">
                    ተጨማሪ ያንብቡ
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
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

export default AllNews;
