
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Projects = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-gov">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
            የሴቶች ክንፍ <span className="text-gov-accent">ፕሮጀክቶች</span>
          </h2>
          <p className="text-gray-600 text-lg">
            የሴቶች ክንፍ በማህበረሰቡ ላይ ለውጥ ለማምጣት የተለያዩ ፕሮጀክቶችን በመተግበር ላይ ይገኛል
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200">
                <img 
                  src={`/placeholder.svg`} 
                  alt={`የሴቶች ክንፍ ፕሮጀክት ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gov-dark mb-2">የሴቶች ክንፍ ፕሮጀክት {index}</h3>
                <p className="text-gray-600 mb-4">
                  {index === 1 && "የሴቶችን የኢኮኖሚ ተሳትፎ ለማሳደግ የሚያግዝ የብድር አገልግሎት"}
                  {index === 2 && "የሴቶችን የሙያ ክህሎት ለማሳደግ የሚደረግ ስልጠና"}
                  {index === 3 && "የሴቶችን የንግድ እውቀት ለማሳደግ የሚያግዝ የምክር አገልግሎት"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/projects">
            <Button className="bg-gov-accent hover:bg-gov-accent/90 text-white">
              ሁሉንም ፕሮጀክቶች ይመልከቱ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
