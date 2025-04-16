
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gov-dark text-white py-8">
      <div className="container-gov">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 bg-white text-gov-dark rounded-md flex items-center justify-center font-display font-bold text-xl mr-3">AQ</div>
            <span className="font-display font-bold text-xl">
              አቃቂ ቃሊቲ <span className="text-gov-accent">ክ/ከተማ</span>
            </span>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="/" className="text-white hover:text-gov-accent transition-colors">መነሻ</Link>
            <Link to="/projects" className="text-white hover:text-gov-accent transition-colors">ፕሮጀክቶች</Link>
            <Link to="/sle-egna" className="text-white hover:text-gov-accent transition-colors">ስለ እኛ</Link>
            <Link to="/contact" className="text-white hover:text-gov-accent transition-colors">አግኙን</Link>
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
