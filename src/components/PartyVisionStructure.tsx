
import { cn } from "@/lib/utils";

const PartyVisionStructure = () => {
  return (
    <section className="py-20">
      {/* Vision Section */}
      <div className="container-gov mb-20">
        <div className="relative bg-gradient-to-br from-gov-dark to-gov-medium rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">የፓርቲ ራእይ</h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            ኢትዮጵያን በአፍሪካ ከፍተኛ ኢኮኖሚ ያላት አገር ማድረግ እና የህዝቦቿን ህይወት መለወጥ።
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container-gov mb-20">
        <div className="relative bg-gradient-to-tr from-gov-gold/20 to-gov-gold/5 border border-gov-gold/20 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-6">አላማ</h2>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                የኢትዮጵያን ብልፅግና ማረጋገጥ፣ ዴሞክራሲያዊ አንድነትን ማጠናከር እና ዜጎች በእኩልነት የሚተዳደሩባትን ኢትዮጵያ መገንባት።
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-gov-gold/10 rounded-full flex items-center justify-center">
                <div className="w-36 h-36 md:w-48 md:h-48 bg-gov-gold/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principles Section */}
      <div className="container-gov mb-20">
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gov-accent/10 rounded-bl-full" />
          <div className="relative p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-8">መርሆች</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {["የህግ የበላይነት", "ፍትህ", "እኩልነት", "ግልፅነት", "ተጠያቂነት"].map((principle, index) => (
                <div 
                  key={principle}
                  className={cn(
                    "p-6 rounded-xl transition-all duration-300 hover:shadow-md",
                    index % 2 === 0 ? "bg-gov-accent/5" : "bg-gov-gold/5"
                  )}
                >
                  <h3 className="font-semibold text-lg mb-2">{principle}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container-gov mb-20">
        <div className="relative bg-gradient-to-br from-gov-accent/10 to-transparent rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-8">እሴት</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["ብልፅግና", "አንድነት", "ሰላም", "ልማት", "ዴሞክራሲ"].map((value) => (
              <div key={value} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-gov-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gov-accent">
                    {value.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gov-dark">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="container-gov mb-20">
        <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-8">ፕሮግራም</h2>
          <div className="space-y-6">
            {[
              "የኢኮኖሚ ማሻሻያ",
              "የትምህርት ጥራት ማሻሻያ",
              "የጤና አጠባበቅ ማሻሻያ",
              "የመሰረተ ልማት ግንባታ"
            ].map((program, index) => (
              <div 
                key={program}
                className="flex items-center space-x-4 p-6 rounded-xl bg-gradient-to-r from-gov-dark/5 to-transparent"
              >
                <div className="w-12 h-12 bg-gov-dark/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gov-dark">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gov-dark">{program}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medemer Fundamentals Section */}
      <div className="container-gov">
        <div className="relative bg-gradient-to-br from-gov-gold/20 via-gov-gold/10 to-transparent rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-8">የመደመር መሰረታውያን</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "አብሮ መስራት",
              "አብሮ መበልፀግ",
              "አብሮ ማደግ"
            ].map((fundamental, index) => (
              <div 
                key={fundamental}
                className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gov-gold/10 rounded-bl-full -z-10" />
                <h3 className="text-xl font-semibold text-gov-dark mb-4">{fundamental}</h3>
                <div className="w-12 h-1 bg-gov-gold rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartyVisionStructure;
