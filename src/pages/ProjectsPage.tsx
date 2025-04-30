
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ProjectsPage = () => {
  useEffect(() => {
    document.title =
      "በ2017 በብልጽና ፓርቲ ሴቶች ክንፍ የተሰሩ ሰው ተኮር ተግባራት | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  const politicalProjects = [
    "የሴቶችን የፖለቲካ ተሳትፎ ማሳደግ",
    "የሴቶች የአመራር ብቃት ማጎልበት",
    "የፓርቲውን የፖሊሲ ማሻሻያ ላይ የሴቶችን ግብዓት ማካተት",
  ];

  const socialProjects = [
    "ጤና መድህን",
    "ድህረ ወለድ",
    "ቅድመ ወሊድ",
    "የአባላዘር እና HIV በሽታዎች ምርመራ",
    "የማህጸን ቻፍ ካንሰር ምርመራ",
  ];

  const economicProjects = [
    "በስራ እድል ፈጠራ / በ5 ዓመት ውስጥ /",
    "በንግድ የተሰማሩ ሴቶች",
    "የሌማት ትሩፋት",
  ];

  const ProjectCard = ({ title, index, category }: { title: string; index: number; category: string }) => {
    // Different background patterns based on category
    const getBgPattern = () => {
      switch (category) {
        case "political":
          return "bg-gradient-to-br from-gov-dark/5 to-gov-accent/10";
        case "social":
          return "bg-gradient-to-br from-gov-gold/10 to-gov-accent/5";
        case "economic":
          return "bg-gradient-to-br from-gov-accent/10 to-gov-gold/5";
        default:
          return "bg-gray-50";
      }
    };

    // Different accent colors based on category
    const getAccentColor = () => {
      switch (category) {
        case "political":
          return "border-l-4 border-gov-dark";
        case "social":
          return "border-l-4 border-gov-accent";
        case "economic":
          return "border-l-4 border-gov-gold";
        default:
          return "";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <Card className={`h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow ${getAccentColor()}`}>
          <CardHeader className={`${getBgPattern()} p-0`}>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="flex items-center justify-center h-full">
                <img 
                  src={`/images/project-${category}-${(index % 3) + 1}.jpg`} 
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            </AspectRatio>
          </CardHeader>
          <CardContent className="p-5">
            <CardTitle className="text-lg font-semibold mb-2 text-gov-dark">
              {title}
            </CardTitle>
            <div className="mt-3 flex justify-end">
              <span className="text-xs px-2 py-1 rounded-full bg-gov-light/10 text-gov-medium">
                {category === "political" && "የፖለቲካ ተሳትፎ"}
                {category === "social" && "ማህበራዊ ተጠቃሚነት"}
                {category === "economic" && "ኢኮኖሚያዊ ተሳትፎ"}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-3xl font-bold text-gov-dark relative inline-block">
        {title}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gov-gold to-gov-light transform translate-y-2"></span>
      </h2>
      <p className="text-gray-600 mt-3 max-w-2xl">
        {title === "የፖለቲካ ተሳትፎ" && "የሴቶችን የፖለቲካ ተሳትፎ ማሳደግ እና በአመራር ደረጃ እንዲሳተፉ የሚያስችሉ ተግባራት"}
        {title === "ማህበራዊ ተጠቃሚነት" && "የሴቶችን ማህበራዊ ፍትህ እና ጤና ማረጋገጥ የሚያስችሉ ተግባራት"}
        {title === "ኢኮኖሚያዊ ተሳትፎ" && "የሴቶችን የኢኮኖሚ ተጠቃሚነት እና ተሳትፎ ማሳደግ የሚያስችሉ ተግባራት"}
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="relative py-16 bg-gov-dark/95">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <img 
            src="/ethiopian-flag-3d-waving.jpg" 
            alt="Ethiopian Flag Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">የፕሮጀክቶች ማእከል</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              በአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ የሚከናወኑ ፕሮጀክቶች
            </p>
          </motion.div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 space-y-20">
        <section>
          <SectionHeader title="የፖለቲካ ተሳትፎ" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {politicalProjects.map((project, idx) => (
              <ProjectCard key={idx} title={project} index={idx} category="political" />
            ))}
          </div>
        </section>
        
        <section>
          <SectionHeader title="ማህበራዊ ተጠቃሚነት" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialProjects.map((project, idx) => (
              <ProjectCard key={idx} title={project} index={idx} category="social" />
            ))}
          </div>
        </section>
        
        <section>
          <SectionHeader title="ኢኮኖሚያዊ ተሳትፎ" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {economicProjects.map((project, idx) => (
              <ProjectCard key={idx} title={project} index={idx} category="economic" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
