
import { useState } from "react";
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "የሴቶች ቀን በደማቅ ሁኔታ ተከበረ",
    excerpt: "የዓለም አቀፍ የሴቶች ቀን በአቃቂ ቃሊቲ ክፍለ ከተማ ከፍተኛ ባለስልጣናት እና የማህበረሰብ መሪዎች በተገኙበት በደማቅ ሁኔታ ተከበረ።",
    date: "መጋቢት 8, 2015",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4",
    category: "ዝግጅቶች",
  },
  {
    id: 2,
    title: "የሴቶች የገቢ ማስገኛ ትምህርት ተጀመረ",
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
];

const NewsCard = ({ item, index }: { item: typeof newsItems[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="animate-fade-in-up opacity-0 bg-white rounded-xl overflow-hidden shadow-sm group card-hover"
      style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
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
  );
};

const News = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container-gov">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-2">
              <span className="text-gov-accent">ዜናዎች</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              ከአቃቂ ቃሊቲ ክፍለ ከተማ ያሉ የቅርብ ጊዜ ዜናዎች እና ማስታወቂያዎች።
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/news">
            <Button className="btn-primary px-8 py-6" size="lg">
              ሁሉንም ዜናዎች ይመልከቱ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
