import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ProjectsPage = () => {
  useEffect(() => {
    document.title = "በ2017 በብልጽና ፓርቲ ሴቶች ክንፍ የተሰሩ ሰው ተኮር ተግባራት | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      id: 1,
      title: "የሴቶች ኢኮኖሚያዊ ብቃት ማጎልበቻ ፕሮግራም",
      description: "የሴቶችን የኢኮኖሚ ተሳትፎ ለማሳደግ የሚያግዝ የብድር አገልግሎት እና ስልጠና የሚሰጥበት ፕሮግራም ነው። ይህ ፕሮግራም ሴቶች የራሳቸውን ንግድ እንዲጀምሩ እና እንዲያሳድጉ ያስችላቸዋል።",
      image: "/images/project-1.jpg"
    },
    {
      id: 2,
      title: "የሴቶችን የሙያ ክህሎት ማሻሻያ ፕሮግራም",
      description: "ይህ ፕሮግራም የሴቶችን የሙያ ክህሎት ለማሻሻል እና በዘመናዊ ቴክኖሎጂ የመጠቀም ችሎታቸውን ለማሳደግ የሚያስችል ነው። የማኑፋክቸሪንግ፣ የአይሲቲ፣ የግብርና እና ሌሎች የሙያ ዘርፎችን ያካትታል።",
      image: "/images/project-2.jpg"
    },
    {
      id: 3,
      title: "የሴቶች የጤና እና ደህንነት ፕሮግራም",
      description: "ይህ ፕሮግራም የሴቶችን ጤና እና ደህንነት ለማሻሻል የሚያስችል ሲሆን፣ የወሊድ ጤና፣ የአመጋገብ እና የአዕምሮ ጤና ላይ ትኩረት ያደርጋል። ነፃ የጤና ምርመራ እና ምክር አገልግሎት ይሰጣል።",
      image: "/images/project-3.jpg"
    },
    {
      id: 4,
      title: "የሴቶች መብት ማስጠበቂያ ፕሮግራም",
      description: "ይህ ፕሮግራም የሴቶችን መብት ለማስጠበቅ እና በማህበረሰቡ ውስጥ ያለውን የፆታ እኩልነት ለማሻሻል ያለመ ነው። የሕግ ድጋፍ፣ የግንዛቤ ማስጨበጫ እና የአቅም ግንባታ ስልጠናዎችን ያካትታል።",
      image: "/images/project-4.jpg"
    },
    {
      id: 5,
      title: "የሴቶች ተሳትፎ ማጎልበቻ ፕሮግራም",
      description: "ይህ ፕሮግራም የሴቶችን በፖለቲካ፣ በማህበራዊ እና በኢኮኖሚያዊ እንቅስቃሴዎች ውስጥ ያላቸውን ተሳትፎ ለማሳደግ የሚያግዝ ነው። የአመራር ክህሎት ስልጠና እና የተለያዩ የውይይት መድረኮችን ያካትታል።",
      image: "/images/project-5.jpg"
    },
    {
      id: 6,
      title: "የሴቶች አካባቢ ጥበቃ ፕሮግራም",
      description: "ይህ ፕሮግራም ሴቶች በአካባቢ ጥበቃ ሂደት ውስጥ የሚኖራቸውን ሚና ለማጎልበት የሚያስችል ሲሆን፣ የአረንጓዴ ልማት ፕሮጀክቶች፣ የውሃ ጥበቃ እና የአየር ንብረት ለውጥ ጉዳዮችን ያካትታል።",
      image: "/images/project-6.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container-gov py-24">
        <h1 className="text-4xl font-bold text-center mb-4">
          በ2017 በብልጽና ፓርቲ ሴቶች ክንፍ <span className="text-gov-accent">የተሰሩ ሰው ተኮር ተግባራት</span>
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          የብልጽግና ፓርቲ የሴቶች ክንፍ የተለያዩ የተግባር ፕሮጀክቶችን በመተግበር በልቀቱ ቀዳሚ ለሆኑ ሴቶች ድጋፍ ሰጥቷል
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-64 bg-gray-200">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gov-dark mb-3">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
