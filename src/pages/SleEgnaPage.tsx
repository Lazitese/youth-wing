
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SleEgnaPage = () => {
  useEffect(() => {
    document.title = "ስለ እኛ | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-gov">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
              <span className="text-gov-accent">ስለ እኛ</span>
            </h1>
            <p className="text-gray-600 text-lg">
              የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ስለ ሴቶች መብት እና ተሳትፎ የሚሰራ ድርጅት ነው
            </p>
          </div>
          
          {/* Section 1 - Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl font-bold text-gov-dark mb-4">የሴቶች ክንፍ ምንድን ነው?</h2>
                <p className="text-gray-600 mb-4">
                  የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ በአቃቂ ቃሊቲ ክፍለ ከተማ ውስጥ የሚገኙ ሴቶችን ድምፅ ለማሰማት፣ መብታቸውን ለማስከበር እና በሁሉም የህይወት ዘርፎች እንዲሳተፉ ለማድረግ የተቋቋመ ድርጅት ነው።
                </p>
                <p className="text-gray-600">
                  ይህ ክንፍ በመላው ክፍለ ከተማ ውስጥ የሚገኙ ሴቶችን በማስተባበር፣ በሰብዓዊ መብት ዙሪያ ትምህርት በመስጠት፣ በፖለቲካ እና የማህበራዊ እንቅስቃሴዎች ውስጥ እንዲሳተፉ በማድረግ እና ለኢኮኖሚያዊ እድገታቸው በሚያስፈልጉ ነገሮች ድጋፍ በማድረግ ላይ ይገኛል።
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/images/women-wing-1.jpg" 
                  alt="የሴቶች ክንፍ ምስል"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Section 2 - History */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/images/women-wing-2.jpg" 
                  alt="የሴቶች ክንፍ ታሪክ"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gov-dark mb-4">የሴቶች ክንፍ ታሪክ</h2>
                <p className="text-gray-600 mb-4">
                  የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ከዘመናት በፊት ጀምሮ የነበረ ሲሆን፣ በጊዜ ሂደት እየተጠናከረ እና እያደገ የመጣ ነው። የሴቶችን ፖለቲካዊ፣ ማህበራዊ እና ኢኮኖሚያዊ ችግሮችን ለመፍታት በጥልቀት በመስራት ላይ ይገኛል።
                </p>
                <p className="text-gray-600">
                  ማህበራችን በአመራር ቦታዎች ላይ የሴቶችን ተሳትፎ ለማሳደግ፣ በኢኮኖሚ ዘርፍ የሴቶችን አቅም ለማሳደግ እና በትምህርት ዙሪያ ያሉ የፆታ ልዩነቶችን ለማጥፋት ከፍተኛ ጥረት ሲያደርግ ቆይቷል። ይህም በክፍለ ከተማው ውስጥ ለሚታዩ ለውጦች ትልቅ አስተዋጽኦ አድርጓል።
                </p>
              </div>
            </div>
          </div>
          
          {/* Section 3 - Leadership */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gov-dark mb-6 text-center">የሴቶች ክንፍ አመራሮች</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="text-center">
                  <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={`/images/leader-${index}.jpg`} 
                      alt={`አመራር ${index}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gov-dark">
                    {index === 1 && "ወ/ሮ አበባ መኮንን"}
                    {index === 2 && "ወ/ሮ ብርሃን አሰፋ"}
                    {index === 3 && "ወ/ሮ ፍሬህይወት በቀለ"}
                  </h3>
                  <p className="text-gov-accent">
                    {index === 1 && "የሴቶች ክንፍ ሊቀመንበር"}
                    {index === 2 && "የሴቶች ክንፍ ም/ሊቀመንበር"}
                    {index === 3 && "የሴቶች ክንፍ ጸሐፊ"}
                  </p>
                  <p className="text-gray-600 mt-2">
                    {index === 1 && "ከ10 አመት በላይ የፖለቲካ ልምድ ያላቸው ሲሆን፣ በሴቶች መብት ማስከበር ዙሪያ በተለይ ይሰራሉ።"}
                    {index === 2 && "ከ8 አመት በላይ የሲቪል ማህበራት ልምድ ያላቸው ሲሆን፣ በሴቶች ትምህርት ዙሪያ በተለይ ይሰራሉ።"}
                    {index === 3 && "ከ5 አመት በላይ የሴቶች ኢኮኖሚ አቅም ግንባታ ልምድ ያላቸው ሲሆን፣ በሴቶች ኢኮኖሚያዊ ጉዳዮች ዙሪያ ይሰራሉ።"}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Section 4 - Achievements */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gov-dark mb-6 text-center">ዋና ዋና ውጤቶች</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gov-dark mb-3">የፖለቲካ ተሳትፎ</h3>
                <p className="text-gray-600 mb-4">
                  በክፍለ ከተማው ውስጥ ባሉ የመንግስት መዋቅሮች የሴቶችን ተሳትፎ ከ15% ወደ 42% ማሳደግ ተችሏል። ይህም በመላው ኢትዮጵያ ካሉ ክፍለ ከተሞች አንዱ ከፍተኛ ውጤት ነው።
                </p>
                <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src="/images/achievement-1.jpg" 
                    alt="የፖለቲካ ተሳትፎ"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gov-dark mb-3">የኢኮኖሚ አቅም ግንባታ</h3>
                <p className="text-gray-600 mb-4">
                  ባለፉት 3 አመታት ውስጥ ከ5,000 በላይ ሴቶች የራሳቸውን ንግድ እንዲጀምሩ እና ገቢያቸውን በ200% እንዲያሳድጉ ድጋፍ ተደርጓል።
                </p>
                <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src="/images/achievement-2.jpg" 
                    alt="የኢኮኖሚ አቅም ግንባታ"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SleEgnaPage;
