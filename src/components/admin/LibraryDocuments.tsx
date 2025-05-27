import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  File, 
  Trash2, 
  Search, 
  Plus, 
  Calendar, 
  DownloadCloud, 
  FileText,
  AlertCircle,
  Loader2,
  Eye
} from "lucide-react";

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

const DOCUMENT_CATEGORIES = [
  "መመሪያዎች",
  "ደንቦች",
  "ህጎች",
  "ቃለ ጉባኤዎች",
  "ሪፖርቶች",
  "መልእክቶች",
  "ሌሎች"
];

const LibraryDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);
  
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);
  
  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const { data: documents, error } = await supabase
        .from('library_documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Get public URLs for all documents
      const docsWithUrls = await Promise.all((documents || []).map(async (doc) => {
        const { data } = supabase.storage.from('library').getPublicUrl(doc.file_url);
        return {
          ...doc,
          file_url: data.publicUrl
        };
      }));
      
      setDocuments(docsWithUrls);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        variant: "destructive",
        title: "ሰነዶችን ማግኘት አልተቻለም",
        description: "ሰነዶችን በማግኘት ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ።",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError("ፋይል መጠን ከ10MB መብለጥ የለበትም");
      setFile(null);
      return;
    }
    
    // Clear any previous errors
    setFileError("");
    setFile(selectedFile);
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setFileError("");
  };
  
  const handleUpload = async () => {
    if (!file) {
      setFileError("እባክዎ ፋይል ይምረጡ");
      return;
    }
    
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "እባክዎ የሰነዱን ርዕስ ያስገቡ",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('library')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // 2. Create record in library_documents table
      const { error: insertError } = await supabase
        .from('library_documents')
        .insert([
          {
            title,
            description,
            file_url: filePath,
            file_type: file.type,
            file_size: file.size,
            category: "ሌሎች" // Default category
          },
        ]);
      
      if (insertError) throw insertError;
      
      // 3. Reset form and refresh documents
      resetForm();
      setOpenUploadDialog(false);
      fetchDocuments();
      
      toast({
        title: "ሰነድ በተሳካ ሁኔታ ተጭኗል",
        description: "ሰነዱ ወደ ቤተመጻሕፍት በተሳካ ሁኔታ ተጭኗል።",
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        variant: "destructive",
        title: "ሰነድ መጫን አልተቻለም",
        description: "ሰነዱን በመጫን ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ።",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDeleteDocument = async () => {
    if (!documentToDelete) return;
    
    try {
      // 1. Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('library')
        .remove([documentToDelete.file_url]);
      
      if (storageError) throw storageError;
      
      // 2. Delete record from database
      const { error: deleteError } = await supabase
        .from('library_documents')
        .delete()
        .eq('id', documentToDelete.id);
      
      if (deleteError) throw deleteError;
      
      // 3. Update local state and close dialog
      setDocuments(documents.filter(doc => doc.id !== documentToDelete.id));
      setDocumentToDelete(null);
      
      toast({
        title: "ሰነድ ተሰርዟል",
        description: "ሰነዱ በተሳካ ሁኔታ ተሰርዟል።",
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        variant: "destructive",
        title: "ሰነድ መሰረዝ አልተቻለም",
        description: "ሰነዱን በመሰረዝ ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ።",
      });
    }
  };
  
  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format file size for display
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('word') || fileType.includes('document')) return 'word';
    if (fileType.includes('sheet') || fileType.includes('excel')) return 'excel';
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) return 'ppt';
    return 'generic';
  };

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "መመሪያዎች": return "bg-purple-100 text-purple-700";
      case "ደንቦች": return "bg-blue-100 text-blue-700";
      case "ህጎች": return "bg-red-100 text-red-700";
      case "ቃለ ጉባኤዎች": return "bg-green-100 text-green-700";
      case "ሪፖርቶች": return "bg-amber-100 text-amber-700";
      case "መልእክቶች": return "bg-indigo-100 text-indigo-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gov-blue rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            የቤተመጻሕፍት ሰነዶች አስተዳደር
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="ፈልግ..."
                className="pl-9 w-full sm:w-auto bg-white border-transparent focus:border-white focus:ring-2 focus:ring-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button
              onClick={() => setOpenUploadDialog(true)}
              className="bg-gov-gold hover:bg-gov-gold/90 text-black font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              አዲስ ሰነድ
            </Button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <Loader2 className="h-8 w-8 text-gov-blue animate-spin" />
          <span className="ml-3 text-gray-600">በመጫን ላይ...</span>
        </div>
      ) : filteredDocuments.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[300px] font-semibold">ሰነድ</TableHead>
                <TableHead className="font-semibold">ምድብ</TableHead>
                <TableHead className="font-semibold">መጠን</TableHead>
                <TableHead className="font-semibold">ቀን</TableHead>
                <TableHead className="text-right font-semibold">ድርጊቶች</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-gov-blue/10 text-gov-blue">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{doc.title}</div>
                        {doc.description && (
                          <p className="text-sm text-gray-500 line-clamp-1">{doc.description}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                      {doc.category}
                    </span>
                  </TableCell>
                  <TableCell>{formatFileSize(doc.file_size)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1.5" />
                      <span className="text-sm">
                        {new Date(doc.created_at).toLocaleDateString('am-ET')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => window.open(doc.file_url, '_blank')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="text-xs">እይ</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-green-700 border-green-200 hover:bg-green-50 hover:text-green-800"
                        onClick={() => window.open(doc.file_url, '_blank')}
                      >
                        <DownloadCloud className="h-4 w-4 mr-1" />
                        <span className="text-xs">አውርድ</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-red-700 border-red-200 hover:bg-red-50 hover:text-red-800"
                        onClick={() => setDocumentToDelete(doc)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">ሰርዝ</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gov-blue/10 rounded-full flex items-center justify-center mb-4">
            <File className="h-8 w-8 text-gov-blue" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">ምንም ሰነዶች አልተገኙም</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? "የፈልጋ ቃልዎን ይቀይሩ እና እንደገና ይሞክሩ" 
              : "ወደ ቤተመጻሕፍት ሰነዶችን ለመጨመር ከላይ ያለውን 'አዲስ ሰነድ' ይጫኑ።"}
          </p>
          {!searchQuery && (
            <Button 
              onClick={() => setOpenUploadDialog(true)}
              className="bg-gov-gold hover:bg-gov-gold/90 text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              አዲስ ሰነድ
            </Button>
          )}
        </div>
      )}
      
      {/* Upload Dialog */}
      <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
          <DialogHeader className="bg-gov-blue p-6 -mx-6 -mt-6 rounded-t-lg flex-shrink-0">
            <DialogTitle className="flex items-center text-white text-xl">
              <Upload className="h-5 w-5 mr-2" />
              አዲስ ሰነድ ጫን
            </DialogTitle>
            <DialogDescription className="text-white/90 mt-1">
              ወደ ቤተመጻሕፍት የሚጨመር ሰነድ ይጫኑ። ሁሉም ተጠቃሚዎች ይህንን ሰነድ ማግኘት ይችላሉ።
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-right font-semibold text-gray-900 block">
                ርዕስ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="የሰነዱ ርዕስ"
                className="w-full bg-white text-gray-900 border-2 border-gray-200 focus:border-gov-blue focus:ring-2 focus:ring-gov-blue/20 placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold text-gray-900 block">ማብራሪያ</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ስለ ሰነዱ አጭር ማብራሪያ"
                rows={3}
                className="w-full bg-white text-gray-900 border-2 border-gray-200 focus:border-gov-blue focus:ring-2 focus:ring-gov-blue/20 placeholder:text-gray-400 min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file" className="font-semibold text-gray-900 block">
                ፋይል <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="file-upload" 
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    fileError 
                      ? 'border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400' 
                      : file 
                        ? 'border-gov-blue bg-gov-blue/5 hover:bg-gov-blue/10 hover:border-gov-blue' 
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center px-4 py-6">
                    {file ? (
                      <>
                        <FileText className="w-12 h-12 mb-3 text-gov-blue" />
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{formatFileSize(file.size)}</p>
                        <p className="text-xs text-gray-500 mt-4">ሌላ ፋይል ለመምረጥ ጠቅ ያድርጉ</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mb-3 text-gov-blue" />
                        <p className="mb-2 text-sm text-gray-900">
                          <span className="font-semibold">ለመጫን ጠቅ ያድርጉ</span> ወይም ፋይል ይጎትቱ
                        </p>
                        <p className="text-xs text-gray-600">
                          PDF, Word, Excel, PowerPoint (ከ10MB በታች)
                        </p>
                        {fileError && (
                          <p className="mt-3 text-sm text-red-600 flex items-center font-medium bg-red-50 px-3 py-1 rounded-full">
                            <AlertCircle className="w-4 h-4 mr-1.5" />
                            {fileError}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-shrink-0 gap-3 flex-col sm:flex-row border-t border-gray-200 pt-6 mt-2">
            <Button
              type="button"
              onClick={() => {
                resetForm();
                setOpenUploadDialog(false);
              }}
              disabled={isUploading}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-8 h-11"
            >
              ይቅር
            </Button>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full sm:w-auto bg-gov-gold hover:bg-gov-gold/90 text-black font-medium px-8 h-11"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  በመጫን ላይ...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  ሰነድ ጫን
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!documentToDelete} onOpenChange={(open) => !open && setDocumentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              ሰነድ መሰረዝ
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              ይህን ሰነድ መሰረዝ እንደሚፈልጉ እርግጠኛ ነዎት?<br />
              <span className="font-medium text-gray-900">"{documentToDelete?.title}"</span><br />
              ይህ ድርጊት ቋሚ ነው እና ሊቀለበስ አይችልም።
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700">ይቅር</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteDocument}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              ሰነድ ሰርዝ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LibraryDocuments; 