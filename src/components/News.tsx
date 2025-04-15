
import { useState } from "react";
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    title: "New Public Park Opening in Downtown",
    excerpt: "The city is proud to announce the grand opening of our newest public park located in the heart of downtown.",
    date: "May 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Community",
  },
  {
    id: 2,
    title: "Digital Services Portal Gets Major Upgrade",
    excerpt: "Our online services portal has been redesigned with an improved user interface and additional services.",
    date: "May 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Technology",
  },
  {
    id: 3,
    title: "City Budget Hearing Scheduled for Next Month",
    excerpt: "Residents are invited to participate in the upcoming city budget hearing to share their feedback and priorities.",
    date: "May 5, 2025",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Government",
  },
  {
    id: 4,
    title: "New Recycling Program Launches Next Week",
    excerpt: "A new city-wide recycling initiative will begin next week aiming to reduce waste and promote sustainability.",
    date: "April 30, 2025",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Environment",
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
          Read More
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
              Latest <span className="text-gov-accent">News</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Stay informed with the latest updates, announcements, and stories from around our city.
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
          <Button className="btn-primary px-8 py-6" size="lg">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default News;
