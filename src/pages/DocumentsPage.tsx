
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Download, File } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DocumentsPage = () => {
  useEffect(() => {
    document.title = "ሰነዶች | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
    window.scrollTo(0, 0);
  }, []);

  // Updated documents array to include files from public/Files folder
  const documents = [
    {
      id: 1,
      title: "የብልጽግና መተዳደሪያ ደንብ የፀደቀ መጋቢት 3 2014 ዓ.ም",
      description: "የብልጽግና ፓርቲ ዋና መተዳደሪያ ደንብ እና የአሰራር ሂደቶች",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "2.4 MB",
      downloadUrl: "/Files/የብልጽግና_መተዳደሪያ_ደንብ_የፀደቀ_መጋቢት_3_2014_ዓ_ም.pdf",
    },
    {
      id: 2,
      title: "የብልጽግና ፓርቲ አባላት ወራዊ መዋጮ ክፍያ መመሪያ",
      description: "የብልጽግና ፓርቲ አባላት ወራዊ መዋጮ ክፍያ መመሪያ ሰነድ",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "1.8 MB",
      downloadUrl: "/Files/የብልጽግና_ፓርቲ_አባላት_ወራዊ_መዋጮ_ክፍያ_መመሪያ.pdf",
    },
    {
      id: 3,
      title: "የብልፅግና ፓርቲ የአደረጃጀትና የአሠራር መመሪያ መጋቢት 02 2017 ማሻሻያ",
      description: "የብልፅግና ፓርቲ የአደረጃጀትና የአሠራር መመሪያ - የዘመነ ማሻሻያ",
      icon: <File className="h-12 w-12 text-gov-medium" />,
      fileType: "DOC",
      fileSize: "520 KB",
      downloadUrl: "/Files/የብልፅግና_ፓርቲ_የአደረጃጀትና_የአሠራር_መመሪያ_መጋቢት_02_2017_ማሻሻያ.doc",
    },
    {
      id: 4,
      title: "የአመራር ምዘና መመሪያ",
      description: "የአመራር ምዘና መመሪያ (የፀደቀ)",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "3.2 MB",
      downloadUrl: "/Files/የአመራር ምዘና መመሪያ (የፀደቀ) (1).pdf",
    },
    {
      id: 5,
      title: "የአመራር ምደባ መመሪያ የመጨረሻ ረቂቅ",
      description: "የአመራር ምደባ መመሪያ የመጨረሻ ረቂቅ መመሪያ ቁጥር 11 2015",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "1.5 MB",
      downloadUrl: "/Files/የአመራር_ምደባ_መመሪያ_የመጨረሻ_ረቂቅ_መመሪያ_ቁጥር_11_2015_13_06_2015.pdf",
    },
    {
      id: 6,
      title: "የአመራርና የአባላት ዲሲፕሊን መመሪያ",
      description: "የአመራርና የአባላት ዲሲፕሊን መመሪያ የፀደቀ ግንቦት 2015",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "1.2 MB",
      downloadUrl: "/Files/የአመራርና_የአባላት_ዲሲፕሊን_መመሪያ_የፀደቀ_ግንቦት_2015.pdf",
    },
    {
      id: 7,
      title: "የኮሚሽኑ የተሻሻለው የአደረጃጀትና የአሰራር መመሪያ",
      description: "የኮሚሽኑ የተሻሻለው የአደረጃጀትና የአሰራር መመሪያ ቁጥር 2 2016",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "980 KB",
      downloadUrl: "/Files/የኮሚሽኑ_የተሻሻለው_የአደረጃጀትና_የአሰራር_መመሪያ_ቁጥር_2_2016.pdf",
    },
    {
      id: 8,
      title: "የኮሚሽን አቤቱታ አቀራረብና አፈታት መመሪያ",
      description: "የኮሚሽን አቤቱታ አቀራረብና አፈታት መመሪያ ቁጥር 4 2016",
      icon: <FileText className="h-12 w-12 text-gov-accent" />,
      fileType: "PDF",
      fileSize: "1.1 MB",
      downloadUrl: "/Files/የኮሚሽን_አቤቱታ_አቀራረብና_አፈታት_መመሪያ_ቁጥር_4_2016.pdf",
    },
  ];

  const getFileType = (url: string) => {
    if (url.toLowerCase().endsWith('.pdf')) return "PDF";
    if (url.toLowerCase().endsWith('.doc') || url.toLowerCase().endsWith('.docx')) return "DOC";
    return "File";
  };

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
                  <a 
                    href={doc.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-gov-accent text-gov-accent hover:bg-gov-accent hover:text-white transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      ሰነዱን አውርድ
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gov-dark mb-4">ጠቃሚ መረጃዎች</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <span className="font-semibold">የሰነድ ፎርማቶች:</span> ሰነዶቹ በ PDF እና DOC ፎርማቶች ይገኛሉ። ለመክፈት የሚያስፈልጉ ሶፍትዌሮችን እርስዎ ማዘጋጀት ይኖርብዎታል።
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
