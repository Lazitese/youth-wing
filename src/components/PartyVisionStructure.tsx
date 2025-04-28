
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const sections = [
  {
    id: "vision",
    title: "የፓርቲ ራእይ",
    content: "ኢትዮጵያን በአፍሪካ ከፍተኛ ኢኮኖሚ ያላት አገር ማድረግ እና የህዝቦቿን ህይወት መለወጥ።",
    bgColor: "from-gov-dark/5 to-gov-accent/5"
  },
  {
    id: "mission",
    title: "አላማ",
    content: "የኢትዮጵያን ብልፅግና ማረጋገጥ፣ ዴሞክራሲያዊ አንድነትን ማጠናከር እና ዜጎች በእኩልነት የሚተዳደሩባትን ኢትዮጵያ መገንባት።",
    bgColor: "from-gov-dark/10 to-gov-accent/10"
  },
  {
    id: "principles",
    title: "መርሆች",
    content: "የህግ የበላይነት፣ ፍትህ፣ እኩልነት፣ ግልፅነት እና ተጠያቂነት።",
    bgColor: "from-gov-dark/5 to-gov-accent/5"
  },
  {
    id: "values",
    title: "እሴት",
    content: "ብልፅግና፣ አንድነት፣ ሰላም፣ ልማት እና ዴሞክራሲ።",
    bgColor: "from-gov-dark/10 to-gov-accent/10"
  },
  {
    id: "programs",
    title: "ፕሮግራም",
    content: "የኢኮኖሚ ማሻሻያ፣ የትምህርት ጥራት ማሻሻያ፣ የጤና አጠባበቅ ማሻሻያ እና የመሰረተ ልማት ግንባታ።",
    bgColor: "from-gov-dark/5 to-gov-accent/5"
  },
  {
    id: "medemer",
    title: "የመደመር መሰረታውያን",
    content: "አብሮ መስራት፣ አብሮ መበልፀግ፣ አብሮ ማደግ።",
    bgColor: "from-gov-dark/10 to-gov-accent/10"
  }
];

const PartyVisionStructure = () => {
  const [activeSection, setActiveSection] = useState("vision");

  return (
    <section className="py-20 bg-white">
      <div className="container-gov">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3">
            <nav className="sticky top-24 space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-right font-medium transition-all",
                    activeSection === section.id
                      ? "bg-gov-accent/10 text-gov-accent"
                      : "hover:bg-gov-accent/5"
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                  {activeSection === section.id && (
                    <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                  )}
                </Button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            {sections.map((section) => (
              <div
                key={section.id}
                className={cn(
                  "rounded-lg p-8 mb-6 transition-all duration-300 transform",
                  `bg-gradient-to-br ${section.bgColor}`,
                  activeSection === section.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-40 translate-y-4"
                )}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 
                      className={cn(
                        "h-6 w-6 transition-colors",
                        activeSection === section.id ? "text-gov-accent" : "text-gray-400"
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gov-dark mb-4">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartyVisionStructure;
