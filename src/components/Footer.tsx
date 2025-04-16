
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gov-dark text-white py-6">
      <div className="container-gov">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
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
