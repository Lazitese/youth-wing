
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";

const ContactPage = () => {
  useEffect(() => {
    document.title = "አግኙን | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-gov">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
              <span className="text-gov-accent">አግኙን</span>
            </h1>
            <p className="text-gray-600 text-lg">
              በማንኛውም ጥያቄ፣ አስተያየት ወይም ጥቆማ ከታች በተዘረዘሩት የመገኛ መንገዶች ሊያገኙን ይችላሉ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-gov-accent/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-gov-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gov-dark mb-2">አድራሻ</h3>
                  <p className="text-gray-600">አቃቂ ቃሊቲ ክፍለ ከተማ</p>
                  <p className="text-gray-600">አዲስ አበባ, ኢትዮጵያ</p>
                  <p className="text-gray-600 mt-1">ወረዳ 7, ቀበሌ 03</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-gov-accent/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-gov-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gov-dark mb-2">ስልክ</h3>
                  <p className="text-gray-600">ዋና መስመር: +251 111 234 567</p>
                  <p className="text-gray-600">አስቸኳይ: +251 911 234 567</p>
                  <p className="text-gray-600 mt-1">የአስተዳደር ክፍል: +251 911 987 654</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-gov-accent/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-gov-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gov-dark mb-2">ኢሜይል</h3>
                  <p className="text-gray-600">አጠቃላይ መረጃ: info@womenswing.org</p>
                  <p className="text-gray-600">ድጋፍ: support@womenswing.org</p>
                  <p className="text-gray-600 mt-1">አቤቱታ: complaint@womenswing.org</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-gov-accent/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-gov-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gov-dark mb-2">የስራ ሰዓት</h3>
                  <p className="text-gray-600">ሰኞ - አርብ: 8:30 - 5:30</p>
                  <p className="text-gray-600">ቅዳሜ: 9:00 - 1:00</p>
                  <p className="text-gray-600 mt-1">እሁድ እና በዓላት: ዝግ</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gov-dark mb-4 text-center">አድራሻችን በካርታ ላይ</h3>
              <div className="h-80 bg-gray-200 rounded-lg">
                {/* Map would go here in a real implementation */}
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  <Globe className="h-12 w-12 opacity-50 mr-3" />
                  <span className="text-lg">የካርታ መረጃ በቅርብ ጊዜ ይጨመራል</span>
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

export default ContactPage;
