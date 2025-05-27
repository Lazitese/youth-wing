import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, FileText, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

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

const LibraryPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "ቤተመጻሕፍት | የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ሴቶች ክንፍ";
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

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Helper function to get icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('word') || fileType.includes('doc')) return 'doc';
    if (fileType.includes('excel') || fileType.includes('sheet') || fileType.includes('csv')) return 'excel';
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) return 'ppt';
    return 'generic';
  };

  const handleDownload = async (doc: Document) => {
    try {
      // For Supabase storage, we need to get a public URL
      const { data } = supabase.storage.from('library').getPublicUrl(doc.file_url);
      
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = data.publicUrl;
      link.setAttribute('download', doc.title);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "ማውረድ ተጀምሯል",
        description: `${doc.title} በ መውረድ ላይ ነው...`,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-gov-blue" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ቤተ<span className="text-gov-blue">መጻሕፍት</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                ከዚህ ቤተመጻሕፍት ውስጥ መመሪያዎች፣ ፖሊሲዎች እና ሌሎች አስፈላጊ ሰነዶችን ማግኘት ይችላሉ።
              </p>
            </motion.div>
          </div>
          
          {/* Search and filter */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="ፈልግ..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex-shrink-0">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gov-blue focus:border-transparent"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category === 'all' ? 'ሁሉም ምድቦች' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Documents grid */}
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full mt-1" />
                        <div className="flex justify-between items-center mt-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-9 w-24 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredDocuments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDocuments.map((doc) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg flex items-center justify-center bg-${getFileIcon(doc.file_type)}-100 text-${getFileIcon(doc.file_type)}-600`}>
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{doc.title}</h3>
                        <div className="inline-block px-2 py-1 bg-blue-50 rounded text-xs font-medium text-blue-600 mb-2">
                          {doc.category}
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {formatFileSize(doc.file_size)} • {new Date(doc.created_at).toLocaleDateString('am-ET')}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDownload(doc)}
                            className="flex items-center gap-1 text-gov-blue hover:text-gov-blue"
                          >
                            <Download className="h-4 w-4" />
                            <span>አውርድ</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">ምንም ሰነዶች አልተገኙም</h3>
                <p className="text-gray-600">
                  {searchQuery || selectedCategory !== 'all' 
                    ? "የፍለጋ ቃልዎን ወይም ምድብዎን ይቀይሩ እና እንደገና ይሞክሩ" 
                    : "በዚህ ወቅት ምንም ሰነዶች አልተጫኑም።"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LibraryPage; 