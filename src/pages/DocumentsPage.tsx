import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Download, File, FileArchive } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DocumentsPage = () => {
  useEffect(() => {
    document.title = "ሰነዶች | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  const documents = [
    {
      id: 1,
      title: "የብልጽግና ፓርቲ መተዳደሪያ ደንብ",
      description: "የብልጽግና ፓርቲ ዋና መተዳደሪያ ደንብ እና የአሰራር ሂደቶች",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "2.4 MB",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "የሴቶች ክንፍ ዓላማዎች",
      description: "የሴቶች ክንፍ ዋና ዋና ዓላማዎች እና ግቦች ሰነድ",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "1.8 MB",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "ወርሃዊ የስብሰባ አጀንዳዎች ቅጽ",
      description: "ለወርሃዊ ስብሰባዎች የሚጠቅም ቅጽ",
      icon: <File className="h-12 w-12 text-gov-medium" />,
      fileType: "DOCX",
      fileSize: "520 KB",
      downloadUrl: "#",
    },
    {
      id: 4,
      title: "የሴቶች መብት ስትራቴጂክ እቅድ",
      description: "የሴቶች መብት ማስከበሪያ ስትራቴጂክ እቅድ ሰነድ",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "3.2 MB",
      downloadUrl: "#",
    },
    {
      id: 5,
      title: "የሴቶች ልማት ማህበራት መመሪያ",
      description: "የሴቶች ልማት ማህበራት አደረጃጀት እና አሰራር መመሪያ",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "1.5 MB",
      downloadUrl: "#",
    },
    {
      id: 6,
      title: "የሴቶች የኢኮኖሚ ተሳትፎ መረጃዎች",
      description: "የሴቶች ኢኮኖሚያዊ ተሳትፎ መረጃዎች እና ስታትስቲክስ",
      icon: <FileArchive className="h-12 w-12 text-gov-gold" />,
      fileType: "ZIP",
      fileSize: "4.7 MB",
      downloadUrl: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-20 bg-gray-50">
        <div className="container-gov max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
              <span className="text-gov-accent">ሰነዶች</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              የክንፋችን ዋና ዋና ሰነዶች እና የሚያስፈልጉ ቅጾች በዚህ ገጽ ይገኛሉ። ሰነዶቹን በነጻ ማውረድ ይችላሉ።
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow bg-white">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-gov-light/30 p-3 rounded-lg">
                      {doc.icon}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium bg-gov-gold/10 text-gov-gold px-2 py-1 rounded-full">{doc.fileType}</span>
                      <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{doc.fileSize}</span>
                    </div>
                  </div>
                  <CardTitle className="mt-4 text-xl text-gov-dark">{doc.title}</CardTitle>
                  <CardDescription className="text-gray-500">{doc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full border-gov-accent text-gov-accent hover:bg-gov-accent hover:text-white transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    ሰነዱን አውርድ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gov-dark mb-4">ጠቃሚ መረጃዎች</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <span className="font-semibold">የሰነድ ፎርማቶች:</span> ሰነዶቹ በ PDF, DOCX እና ZIP ፎርማቶች ይገኛሉ። ለመክፈት የሚያስፈልጉ ሶፍትዌሮችን እርስዎ ማዘጋጀት ይኖርብዎታል።
              </p>
              <p>
                <span className="font-semibold">ሰነዶች አዘምን:</span> ሰነዶቹ በየጊዜው ስለሚዘመኑ፣ ዘወትር ይህን ገጽ ይጎብኙ። ለመጨረሻ ጊዜ የተዘመነው የካቲት 2016 ዓ.ም ነው።
              </p>
              <p>
                <span className="font-semibold">ማንኛውም ጥያቄ ካለዎት:</span> በስልክ ቁጥር 0911-123456 ወይም በኢሜይል documents@prosperitywomen.et ያግኙን።
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocumentsPage; 