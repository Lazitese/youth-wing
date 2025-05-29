
import { Check } from "lucide-react";

const Objectives = () => {
  const objectives = [
    "የወጣቶች ኃይል እና እውቀት መሻሻል",
    "የፖለቲካ እና ማህበረሰብ ተሳትፎ ማሳደግ",
    "እኩልነት በቤተሰብ እና ሥራ ቦታ",
    "ለሴቶች የምክር እና የሥነ ልቦና ድጋፍ መስጠት",
    "ለሴቶች ምቹ የጤና ፖሊሲዎችን መተግበር",
    "የወጣቶችን የኢኮኖሚ ተሳትፎ ማሳደግ",
    "ለሴት ልጆች ትምህርት ማበረታታት",
    "የወጣቶችን መብት መጠበቅ",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-gov">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectives.map((objective, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex-shrink-0 bg-gov-accent/10 text-gov-accent rounded-full p-1 mt-0.5">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-gray-700">{objective}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-6">
              የፓርቲው <span className="text-gov-accent">ጥቅል አላማ</span>
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              የብልጽግና ፓርቲ ቀልጣፋ፣ ተጠሪነት ያለው እና ለሕዝብ አገልጋይ የሆነ የመንግስት አስተዳደር በመፍጠር ላይ ያተኮረ ነው። በዚህ የወጣት ክንፍ፣ ለሴቶች ልዩ ትኩረት በመስጠት አላማዎቻችንን በዘላቂነት ለማሳካት እንሰራለን።
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              ሴቶች በተለያዩ የህይወት መስኮች የሚያጋጥሟቸውን ተግዳሮቶች ለመቅረፍ በቁርጠኝነት እንሰራለን። ሴቶች የተሟላ የፖለቲካ፣ ኢኮኖሚያዊ እና ማህበራዊ ተሳትፎ እንዲኖራቸው የሚያስችል አካባቢ ለመፍጠር ተግተን እንሰራለን።
            </p>

            <div className="mt-8 inline-block py-2 px-4 bg-gov-dark/5 rounded-lg border border-gov-dark/10">
              <span className="text-gov-dark font-semibold">ራዕያችን:</span> <span className="text-gray-700">በሁሉም መስኮች የወጣቶች ድምጽ የሚሰማበት፣ እኩልነት የሰፈነበት ማህበረሰብ መገንባት።</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Objectives;
