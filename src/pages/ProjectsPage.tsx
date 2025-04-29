import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  const ProjectCard = ({ title }: { title: string }) => {

   return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Image placeholder</span>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="flex justify-center items-center gap-3 py-2">
          <CarouselPrevious className="w-8 h-8 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full" />
          <CarouselNext className="w-8 h-8 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full" />
        </div>
      </Carousel>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
  }

  const Section = ({ title, projects }: { title: string, projects: string[] }) => {

    return (
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} title={project} />
          ))}
        </div>
      </section>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-20 space-y-24">
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">የፖለቲካ ተሳትፎ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {politicalProjects.map((project, idx) => (
              <ProjectCard key={idx} title={project} />
            ))}
          </div>
        </section>
        <Section title="ማህበራዊ ተጠቃሚነት" projects={socialProjects} />
        <Section title="ኢኮኖሚያዊ ተሳትፎ" projects={economicProjects} />
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
