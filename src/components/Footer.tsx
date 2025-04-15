
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gov-dark text-white pt-16 pb-8">
      <div className="container-gov">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white text-gov-dark rounded-md flex items-center justify-center font-display font-bold text-xl">AQ</div>
              <span className="font-display font-bold text-xl">
                አቃቂ ቃሊቲ <span className="text-gov-accent">ክ/ከተማ</span>
              </span>
            </div>
            <p className="text-white/70 text-sm">
              የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ቅርንጫፍ ጽ/ቤት ኃላፊነትን ባለው መንገድ ህብረተሰቡን እያገለገለ ይገኛል።
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-1/2 after:bg-gov-accent">አቋራጭ ማውጫዎች</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  መነሻ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  የአባላት ምዝገባ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  ጥቆማ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  ሰነዶች
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  ስለ እኛ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  አግኙን
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-1/2 after:bg-gov-accent">መሠረታዊ መርሆዎች</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  አኩሪ አመራር
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  የሴቶች ማህበራዊ እኩልነት
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  ተጠሪነትና መረጋጋት
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  የሴቶች ኃይል እና እውቀት
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  የፖለቲካ ተሳትፎ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  እኩልነት በቤተሰብ እና ሥራ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-1/2 after:bg-gov-accent">መልዕክት ይላኩ</h3>
            <p className="text-white/70 text-sm mb-4">
              ለዜናዎች፣ መረጃዎች እና የፕሮግራም ማሳወቂያዎች ኢሜይል አድራሻዎትን ያስመዝግቡ።
            </p>
            <form className="flex mb-4">
              <input 
                type="email" 
                placeholder="የኢሜይል አድራሻዎ" 
                className="bg-white/10 border border-white/20 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gov-accent w-full"
              />
              <Button className="rounded-r-lg rounded-l-none border border-gov-gold bg-gov-gold text-gov-dark hover:bg-gov-gold-light">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
            <p className="text-white/50 text-xs">
              በመመዝገብዎ የግላዊነት ፖሊሲያችንን ተቀብለዋል እንዲሁም ከድርጅታችን ዝማኔዎችን ለመቀበል ተስማምተዋል።
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {currentYear} የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ ቅርንጫፍ ጽ/ቤት። መብቱ በህግ የተጠበቀ ነው።
          </div>
          <div className="flex space-x-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">የግላዊነት ፖሊሲ</a>
            <a href="#" className="hover:text-white transition-colors">የአገልግሎት ውሎች</a>
            <a href="#" className="hover:text-white transition-colors">ተደራሽነት</a>
            <a href="#" className="hover:text-white transition-colors">የድረ-ገጽ ካርታ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
