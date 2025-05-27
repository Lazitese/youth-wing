import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, FileX } from "lucide-react";

const NotFound = () => {
  useEffect(() => {
    document.title = "ገጹ አልተገኘም | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
  }, []);

  // Check if the URL contains "documents" to show a specific message
  const isDocumentsPage = window.location.pathname.includes("documents");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          {isDocumentsPage ? (
            <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-6">
              <FileX size={40} />
            </div>
          ) : (
            <div className="text-gov-blue text-8xl font-bold mb-4">404</div>
          )}
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {isDocumentsPage ? "የሰነዶች ገጽ ተወግዷል" : "ገጹ አልተገኘም"}
          </h1>
          <p className="text-gray-600 mb-8">
            {isDocumentsPage 
              ? "ይህ ገጽ አሁን የለም። እባክዎ ወደ መነሻ ገጽ ይመለሱ።" 
              : "እየፈለጉት ያለው ገጽ ሊኖር አይችልም ወይም ተወግዷል።"}
          </p>
        </div>

        <Link to="/">
          <Button className="bg-gov-blue hover:bg-gov-blue/90 text-white flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            <span>ወደ መነሻ ገጽ ተመለስ</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
