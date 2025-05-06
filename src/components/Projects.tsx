import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Projects = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-gov">
        {/* Enhanced header with decorative elements */}
        <div className="max-w-3xl mx-auto text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-gov-gold via-gov-accent to-gov-gold rounded-full opacity-70"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gov-dark to-gov-accent">
            የሴቶች ክንፍ <span className="text-gov-accent">ተግባራት</span>
          </h2>
          
          <p className="text-gray-600 text-lg mb-8">
            የሴቶች ክንፍ በማህበረሰቡ ላይ ለውጥ ለማምጣት የተለያዩ ተግባራትን በመተግበር ላይ ይገኛል
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-gov-gold/10 text-gov-dark border border-gov-gold/20 px-4 py-1 rounded-full text-sm font-medium">
              ሁሉም
            </span>
            <span className="bg-white border border-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-600 hover:border-gov-accent/40 hover:bg-gov-accent/5 transition-colors cursor-pointer">
              ስልጠና
            </span>
            <span className="bg-white border border-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-600 hover:border-gov-accent/40 hover:bg-gov-accent/5 transition-colors cursor-pointer">
              ኢኮኖሚ
            </span>
            <span className="bg-white border border-gray-200 px-4 py-1 rounded-full text-sm font-medium text-gray-600 hover:border-gov-accent/40 hover:bg-gov-accent/5 transition-colors cursor-pointer">
              ማህበራዊ
            </span>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full"></div>
        </div>

        {/* "Coming Soon" message */}
        <div className="text-center">
          <Link to="/projects">
            <Button className="bg-gov-accent hover:bg-gov-accent/90 text-white px-8 py-6 rounded-full h-auto shadow-md hover:shadow-lg transition-all">
              <span className="mr-2">ቅርብ ጊዜ ይጠብቁን</span>
              <ExternalLink size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
