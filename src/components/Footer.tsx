
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gov-dark text-white py-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gov-accent blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gov-gold blur-3xl"></div>
      </div>
      
      <div className="container-gov relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0 animate-pulse-soft">
            <div className="w-8 h-8 bg-white text-gov-dark rounded-md flex items-center justify-center font-display font-bold text-lg mr-2">AQ</div>
            <span className="font-display font-bold text-lg">
              አቃቂ ቃሊቲ <span className="text-gov-accent">ክ/ከተማ</span>
            </span>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; {currentYear} የሴቶች ክንፍ። መብቱ በህግ የተጠበቀ ነው።
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
