import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, FileText, Search, Archive, File, FileType, Table, Image as ImageIcon, Film, Music, Code, Coffee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Document = {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
  category: string;
};

// Helper function to format file size
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

// Helper function to get color based on file type
const getFileTypeColor = (fileType: string) => {
  if (fileType.includes('pdf')) return 'bg-red-100 text-red-600 border-red-200';
  if (fileType.includes('word') || fileType.includes('doc')) return 'bg-blue-100 text-blue-600 border-blue-200';
  if (fileType.includes('excel') || fileType.includes('sheet') || fileType.includes('csv')) return 'bg-green-100 text-green-600 border-green-200';
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) return 'bg-orange-100 text-orange-600 border-orange-200';
  if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return 'bg-purple-100 text-purple-600 border-purple-200';
  return 'bg-gray-100 text-gray-600 border-gray-200';
};

// File type icons mapping with larger, more colorful icons
const FileTypeIcon = ({ fileType, className = "h-10 w-10" }: { fileType: string; className?: string }) => {
  if (fileType.includes('pdf')) return <File className={`${className} text-red-600`} />;
  if (fileType.includes('word') || fileType.includes('doc')) return <FileText className={`${className} text-blue-600`} />;
  if (fileType.includes('excel') || fileType.includes('sheet') || fileType.includes('csv')) return <Table className={`${className} text-green-600`} />;
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) return <FileType className={`${className} text-orange-600`} />;
  if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return <Archive className={`${className} text-purple-600`} />;
  if (fileType.includes('image') || fileType.includes('png') || fileType.includes('jpg') || fileType.includes('jpeg')) 
    return <ImageIcon className={`${className} text-pink-500`} />;
  if (fileType.includes('video') || fileType.includes('mp4')) return <Film className={`${className} text-indigo-600`} />;
  if (fileType.includes('audio') || fileType.includes('mp3') || fileType.includes('wav')) return <Music className={`${className} text-amber-600`} />;
  if (fileType.includes('code') || fileType.includes('json') || fileType.includes('html') || fileType.includes('js')) 
    return <Code className={`${className} text-gray-700`} />;
  return <Coffee className={`${className} text-gray-600`} />;
};

// Generate a thumbnail background gradient based on file type
const getFileGradient = (fileType: string) => {
  if (fileType.includes('pdf')) return 'from-red-500 to-red-600';
  if (fileType.includes('word') || fileType.includes('doc')) return 'from-blue-500 to-blue-600';
  if (fileType.includes('excel') || fileType.includes('sheet') || fileType.includes('csv')) return 'from-green-500 to-green-600';
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) return 'from-orange-500 to-orange-600';
  if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return 'from-purple-500 to-purple-600';
  if (fileType.includes('image') || fileType.includes('png') || fileType.includes('jpg')) return 'from-pink-500 to-pink-600';
  if (fileType.includes('video') || fileType.includes('mp4')) return 'from-indigo-500 to-indigo-600';
  if (fileType.includes('audio') || fileType.includes('mp3')) return 'from-amber-500 to-amber-600';
  if (fileType.includes('code') || fileType.includes('json') || fileType.includes('html')) return 'from-gray-700 to-gray-800';
  return 'from-gray-500 to-gray-600';
};

// Document card component with improved styling
const DocumentCard = ({ doc, index, handleDownload }: { doc: Document; index: number; handleDownload: (doc: Document) => void }) => {
  const fileExtension = doc.file_url.split('.').pop()?.toUpperCase() || 'FILE';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col bg-white hover:shadow-xl transition-all duration-300">
        <div className={`w-full relative pt-[70%] bg-gradient-to-br ${getFileGradient(doc.file_type)}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-inner">
              <FileTypeIcon fileType={doc.file_type} className="h-16 w-16" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold text-white">
            {fileExtension}
          </div>
        </div>
        
        <CardContent className="p-5 flex-grow flex flex-col">
          <div className="mb-1">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-brand-blue/10 text-brand-blue">
              {doc.category}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 flex-grow">{doc.title}</h3>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{doc.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span className="font-medium">{formatFileSize(doc.file_size)}</span>
            <span>{new Date(doc.created_at).toLocaleDateString('am-ET')}</span>
          </div>
          
          <Button 
            variant="default" 
            onClick={() => handleDownload(doc)}
            className="w-full gap-2 bg-brand-blue hover:bg-brand-blue/90 mt-auto"
          >
            <Download className="w-4 h-4" />
            <span>አውርድ</span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Particle component for visual effect
const Particles = () => {
  return (
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const LibraryPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "ቤተመጻሕፍት | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ወጣት ክንፍ";
    fetchDocuments();
  }, []);
  
  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('library_documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setDocuments(data || []);
      setFilteredDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        variant: "destructive",
        title: "ሰነዶችን ማግኘት አልተቻለም",
        description: "ሰነዶችን በማውረድ ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ።",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let result = documents;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(doc => doc.category === selectedCategory);
    }
    
    setFilteredDocuments(result);
  }, [searchQuery, selectedCategory, documents]);

  // Get unique categories from documents
  const categories = ['all', ...new Set(documents.map(doc => doc.category))];

  const handleDownload = async (doc: Document) => {
    try {
      toast({
        title: "ማውረድ ተጀምሯል",
        description: `${doc.title} በ መውረድ ላይ ነው...`,
      });

      // Download the file from Supabase storage
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('library')
        .download(doc.file_url);

      if (downloadError) throw downloadError;
      if (!fileData) throw new Error('No file data received');

      // Create a blob URL for the file
      const blob = new Blob([fileData], { type: doc.file_type });
      const url = window.URL.createObjectURL(blob);

      // Create a hidden download link
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.title + '.' + doc.file_url.split('.').pop(); // Add file extension
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Trigger download and cleanup
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast({
        title: "ማውረድ ተሳክቷል",
        description: `${doc.title} በተሳካ ሁኔታ ወርዷል`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        variant: "destructive",
        title: "ማውረድ አልተቻለም",
        description: "ፋይሉን በማውረድ ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ።",
      });
    }
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section with Particles */}
      <div className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-r from-brand-blue to-gov-dark text-white">
        <Particles />
        <div className="city-skyline"></div>
        
        <div className="container relative z-10 px-4 py-16 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-brand-yellow" />
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              ቤተ<span className="text-brand-yellow">መጻሕፍት</span>
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-white text-opacity-90">
              ከዚህ ቤተመጻሕፍት ውስጥ መመሪያዎች፣ ፖሊሲዎች እና ሌሎች አስፈላጊ ሰነዶችን ማግኘት ይችላሉ።
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="flex flex-col p-2 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm md:flex-row md:p-2 gap-3">
                <div className="relative flex-1">
                  <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="ፈልግ..."
                    className="pl-10 bg-white border-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex-shrink-0 min-w-[180px]">
                  <Select 
                    value={selectedCategory} 
                    onValueChange={(value) => setSelectedCategory(value)}
                  >
                    <SelectTrigger className="h-12 bg-white text-gray-800">
                      <SelectValue placeholder="ሁሉም ምድቦች" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category, index) => (
                        <SelectItem key={index} value={category}>
                          {category === 'all' ? 'ሁሉም ምድቦች' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container px-4 py-16 mx-auto -mt-10">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow-lg h-full">
                  <Skeleton className="w-full aspect-square" />
                  <div className="p-5">
                    <Skeleton className="h-4 w-16 mb-2 rounded-full" />
                    <Skeleton className="h-6 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex justify-between mb-4">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredDocuments.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredDocuments.map((doc, index) => (
                <DocumentCard 
                  key={doc.id} 
                  doc={doc} 
                  index={index} 
                  handleDownload={handleDownload} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-10 text-center bg-white rounded-lg shadow-md"
            >
              <div className="p-4 mx-auto mb-6 bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-gray-900">ምንም ሰነዶች አልተገኙም</h3>
              <p className="text-gray-600">
                {searchQuery || selectedCategory !== 'all' 
                  ? "የፍለጋ ቃልዎን ወይም ምድብዎን ይቀይሩ እና እንደገና ይሞክሩ" 
                  : "በዚህ ወቅት ምንም ሰነዶች አልተጫኑም።"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Wavy Pattern Background Decoration */}
      <div className="relative overflow-hidden py-16 bg-white">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              fill="rgba(31, 140, 215, 0.03)" 
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <path 
              fill="rgba(249, 220, 47, 0.03)" 
              d="M0,160L48,160C96,160,192,160,288,149.3C384,139,480,117,576,144C672,171,768,245,864,245.3C960,245,1056,171,1152,133.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        
        {/* Statistics Section */}
        {!isLoading && filteredDocuments.length > 0 && (
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-6 text-center bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="mb-1 text-3xl font-bold text-brand-blue">{documents.length}</h3>
                  <p className="text-gray-600">ጠቅላላ ሰነዶች</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 text-center bg-yellow-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="mb-1 text-3xl font-bold text-brand-yellow">{categories.length - 1}</h3>
                  <p className="text-gray-600">ምድቦች</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 text-center bg-green-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="mb-1 text-3xl font-bold text-green-600">
                    {documents.reduce((acc, doc) => acc + doc.file_size, 0) > 1048576 
                      ? (documents.reduce((acc, doc) => acc + doc.file_size, 0) / 1048576).toFixed(1) + ' MB'
                      : (documents.reduce((acc, doc) => acc + doc.file_size, 0) / 1024).toFixed(1) + ' KB'}
                  </h3>
                  <p className="text-gray-600">ጠቅላላ መጠን</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="p-6 text-center bg-red-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="mb-1 text-3xl font-bold text-red-600">
                    {new Date(Math.max(...documents.map(doc => new Date(doc.created_at).getTime()))).toLocaleDateString('am-ET')}
                  </h3>
                  <p className="text-gray-600">የመጨረሻ ማዘመኛ</p>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default LibraryPage; 