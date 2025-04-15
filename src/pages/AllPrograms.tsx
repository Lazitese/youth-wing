
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const programs = [
  {
    id: 1,
    title: "የሴቶች ማሰልጠኛ ፕሮግራሞች",
    description: "የሥራ ዕድልን ለማስፋት እና የሴቶችን ተሳትፎ ለማጎልበት የተዘጋጁ ልዩ ልዩ ስልጠናዎች። ስልጠናዎቹ የተለያዩ ሙያዎችን ያካትታሉ፣ እንደ የኮምፒውተር ክህሎት፣ የገበያ ትንታኔ፣ የሂሳብ አያያዝ፣ እና የመሪነት ጥበብ።",
    icon: "Briefcase",
    bgColor: "bg-gradient-to-br from-white to-blue-50",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 2,
    title: "የጤና አጠባበቅ ማዕከሎች",
    description: "ለሴቶች ልዩ ጥንቃቄ የሚሹ የጤና እንክብካቤ አገልግሎቶች እና የግንዛቤ ማስጨበጫ ፕሮግራሞች። የጤና ማዕከሎቹ የጤና ምርመራ፣ የቅድመ-ወሊድ ክትትል፣ የህጻናት እንክብካቤ፣ እና የአመጋገብ ምክሮችን ያቀርባሉ።",
    icon: "FileText",
    bgColor: "bg-gradient-to-br from-white to-emerald-50",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 3,
    title: "ሴቶች ለሴቶች ሥራዎች",
    description: "ሴቶች በሴቶች የሚመሩ የገቢ ማስገኛ ሥራዎችን ለመጀመር እና ለማሳደግ የተዘጋጁ አስፈላጊ ድጋፎች። የዕድገት ብድሮችን፣ የንግድ እቅድ ማዘጋጃ ድጋፍ፣ የገቢያዎች ትስስር ፈጠራ፣ እና የጋራ ንግድ ማዕከላት ገንብቷል።",
    icon: "Building",
    bgColor: "bg-gradient-to-br from-white to-amber-50",
    image: "https://images.unsplash.com/photo-1573164574472-797cdf4a583a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
  },
  {
    id: 4,
    title: "ተማሪ ልጆች ድጋፍ",
    description: "ለተማሪ ሴት ልጆች የትምህርት ቁሳቁሶች፣ የትምህርት ክፍያ እና የምክር አገልግሎቶች። ይህ ፕሮግራም በተለይ ተማሪዎች ትምህርታቸውን እንዲቀጥሉ የሚያበረታታ ሲሆን፣ ከትምህርት ውጭም የተለያዩ የክህሎት ማዳበሪያ ክፍለ ጊዜዎችን ያቀርባል።",
    icon: "Users",
    bgColor: "bg-gradient-to-br from-white to-purple-50",
    image: "https://images.unsplash.com/photo-1544717305-f9c88f2897bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1739&q=80"
  },
  {
    id: 5,
    title: "የመንገድ እና ትምህርት ፕሮጀክቶች",
    description: "በሴቶች ለሴቶች የሚመሩ የመንገድ ፅዳት፣ የኮምፒውተር ክህሎቶች እና ሌሎች ማሻሻያዎች። እነዚህ ፕሮጀክቶች ሴቶችን ለማብቃት የተዘጋጁ ሲሆኑ፣ አካባቢን የማሻሻል ሥራዎች፣ የኮምፒውተር ትምህርቶች፣ እና ሌሎች የሙያ ማሻሻያ እንቅስቃሴዎችን ያካትታሉ።",
    icon: "FileCheck",
    bgColor: "bg-gradient-to-br from-white to-red-50",
    image: "https://images.unsplash.com/photo-1517245386807-9b4d0d6b9d36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 6,
    title: "ማህበራዊ ፍትህ ፕሮግራሞች",
    description: "ለሴቶች እኩልነት እና ፍትህ የሚደረጉ ልዩ ልዩ የህግ ድጋፎች እና የመብት ተሟጋችነት ሥራዎች። የመብት ግንዛቤ ማስጨበጫ፣ የህግ ድጋፍ አገልግሎቶች፣ ለጥቃት ለተጋለጡ ሴቶች መጠለያዎች፣ እና የሴቶች መብት ተሟጋችነት ሥራዎችን ይሰራል።",
    icon: "Map",
    bgColor: "bg-gradient-to-br from-white to-indigo-50",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 7,
    title: "የሴቶች የልማት ማህበራት",
    description: "የሴቶች የልማት ማህበራት በተለያዩ ቀበሌዎች ደረጃ ተቋቁመው ሴቶችን አቅም በተለያዩ መንገዶች ለማሳደግ ይሰራሉ። እነዚህ ማህበራት የገቢ ማስገኛ ስራዎችን፣ የአነስተኛ ብድር አገልግሎቶችን፣ እና የህብረት ስራን ያበረታታሉ።",
    icon: "Users",
    bgColor: "bg-gradient-to-br from-white to-pink-50",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80"
  },
  {
    id: 8,
    title: "የሴቶች የፖለቲካ ተሳትፎ",
    description: "ሴቶች በፖለቲካ ውሳኔ አሰጣጥ ሂደቶች እንዲሳተፉ ለማበረታታት እና ለማገዝ የተዘጋጁ ልዩ ልዩ ፕሮግራሞች። የአመራር ክህሎት ስልጠናዎች፣ የምርጫ ዘመቻ አመራር ምክሮች፣ እና የፖለቲካ ግንዛቤ ማስጨበጫ ክፍለ ጊዜዎችን ያቀርባል።",
    icon: "FileText",
    bgColor: "bg-gradient-to-br from-white to-green-50",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
];

const AllPrograms = () => {
  useEffect(() => {
    document.title = "ሁሉም ፕሮግራሞች | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
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
                <span className="text-gray-600 text-sm">ፕሮግራሞች</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
                <span className="text-gov-accent">ሁሉም ፕሮግራሞች</span>
              </h1>
              <p className="text-gray-600 max-w-2xl">
                የሴቶችን ኢኮኖሚያዊ፣ ማህበራዊ እና የፖለቲካ ተሳትፎ ለማሳደግ የተዘጋጁ ልዩ ልዩ ፕሮግራሞች እና አገልግሎቶች
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div 
                key={program.id}
                className={`${program.bgColor} rounded-xl shadow-sm overflow-hidden card-hover shimmer animate-fade-in-up`}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gov-dark mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <Button variant="ghost" className="text-gov-accent hover:text-gov-accent/80 hover:bg-gov-accent/5 px-0 group">
                    ተጨማሪ ይመልከቱ
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

export default AllPrograms;
