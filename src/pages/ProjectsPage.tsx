
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
          return "bg-gradient-to-br from-brand-blue/10 to-brand-blue/5";
        case "social":
          return "bg-gradient-to-br from-brand-yellow/15 to-brand-red/5";
        case "economic":
          return "bg-gradient-to-br from-brand-orange/10 to-brand-yellow/10";
        default:
          return "bg-gray-50";
      }
    };

    // Different accent colors based on category
    const getAccentColor = () => {
      switch (category) {
        case "political":
          return "border-l-4 border-brand-blue";
        case "social":
          return "border-l-4 border-brand-red";
        case "economic":
          return "border-l-4 border-brand-yellow";
        default:
          return "";
      }
    };

    // Different badge colors
    const getBadgeColor = () => {
      switch (category) {
        case "political":
          return "bg-brand-blue text-white";
        case "social":
          return "bg-brand-red text-white";
        case "economic":
          return "bg-brand-yellow text-brand-black";
        default:
          return "bg-gray-200";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <Card className={`h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300 ${getAccentColor()}`}>
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
            <CardTitle className="text-lg font-semibold mb-2 text-brand-black">
              {title}
            </CardTitle>
            <div className="mt-3 flex justify-end">
              <span className={`text-xs px-3 py-1 rounded-full ${getBadgeColor()}`}>
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

  const SectionHeader = ({ title }: { title: string }) => {
    // Different colors for each section
    const getTitleColor = () => {
      switch(title) {
        case "የፖለቲካ ተሳትፎ":
          return "from-brand-blue to-brand-blue/70";
        case "ማህበራዊ ተጠቃሚነት":
          return "from-brand-red to-brand-red/70";
        case "ኢኮኖሚያዊ ተሳትፎ":
          return "from-brand-yellow to-brand-orange";
        default:
          return "from-brand-blue to-brand-blue/70";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-brand-black relative inline-block">
          {title}
          <span className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${getTitleColor()} transform translate-y-2`}></span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl">
          {title === "የፖለቲካ ተሳትፎ" && "የሴቶችን የፖለቲካ ተሳትፎ ማሳደግ እና በአመራር ደረጃ እንዲሳተፉ የሚያስችሉ ተግባራት"}
          {title === "ማህበራዊ ተጠቃሚነት" && "የሴቶችን ማህበራዊ ፍትህ እና ጤና ማረጋገጥ የሚያስችሉ ተግባራት"}
          {title === "ኢኮኖሚያዊ ተሳትፎ" && "የሴቶችን የኢኮኖሚ ተጠቃሚነት እና ተሳትፎ ማሳደግ የሚያስችሉ ተግባራት"}
        </p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-white">
      <Navbar />

      <div className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/113a8e96-472f-42b6-a819-45ac4521b7c9.png" 
            alt="Colorful Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-black/40"></div>
        </div>

        {/* Content with good contrast */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-white drop-shadow-lg">
              የፕሮጀክቶች <span className="text-brand-yellow">ማእከል</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-brand-white drop-shadow-md">
              በአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ የሚከናወኑ ፕሮጀክቶች
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="hidden md:block">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-brand-blue/20 blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-brand-yellow/20 blur-2xl"></div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Brief intro section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-brand-black">
            የሴቶች ክንፍ <span className="text-brand-red">ፕሮጀክቶች</span> ዝርዝር
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow mx-auto mb-6"></div>
          <p className="text-gray-600">
            የሴቶች ክንፍ በሶስት ዋና ዋና መስኮች የተለያዩ ፕሮጀክቶችን በመተግበር ላይ ይገኛል። እነዚህም የፖለቲካ ተሳትፎ፣ ማህበራዊ ተጠቃሚነት እና ኢኮኖሚያዊ ተሳትፎ ናቸው።
          </p>
        </motion.div>

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
