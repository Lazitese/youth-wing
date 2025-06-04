import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Download, Eye, Search, Paperclip } from "lucide-react";

interface FileAttachment {
  name: string;
  path: string;
  size: number;
  type: string;
}

interface ReportSubmission {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  woreda: string;
  kebele: string;
  report_type: string;
  report_details: string;
  created_at: string;
  attachments?: FileAttachment[];
}

const ReportSubmissions = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ReportSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ReportSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<ReportSubmission | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);

        // First get the total count
        const { count, error: countError } = await supabase
          .from('report_submissions')
          .select('*', { count: 'exact', head: true });

        if (countError) throw countError;
        setTotalCount(count || 0);

        // Then fetch the paginated data
        const { data, error: fetchError } = await supabase
          .from('report_submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .range((page - 1) * pageSize, page * pageSize - 1);

        if (fetchError) throw fetchError;

        setSubmissions(data || []);
        setFilteredSubmissions(data || []);
      } catch (error: any) {
        console.error("Error fetching submissions:", error);
        setError(error.message || "ሪፖርቶችን በማግኘት ላይ ችግር ተፈጥሯል");
        toast({
          title: "Error",
          description: error.message || "ሪፖርቶችን በማግኘት ላይ ችግር ተፈጥሯል",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [toast, page, pageSize]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSubmissions(submissions);
      return;
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = submissions.filter(item => {
      return (
        item.full_name.toLowerCase().includes(lowercasedFilter) ||
        item.woreda.toLowerCase().includes(lowercasedFilter) ||
        item.kebele.toLowerCase().includes(lowercasedFilter) ||
        item.report_type.toLowerCase().includes(lowercasedFilter) ||
        item.report_details.toLowerCase().includes(lowercasedFilter) ||
        (item.email && item.email.toLowerCase().includes(lowercasedFilter)) ||
        item.phone.includes(searchTerm)
      );
    });

    setFilteredSubmissions(filtered);
  }, [searchTerm, submissions]);

  const handleViewDetails = (submission: ReportSubmission) => {
    setSelectedSubmission(submission);
    setDetailsOpen(true);
  };

  const downloadAttachment = async (path: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('report-attachments')
        .download(path);
      
      if (error) {
        throw error;
      }

      // Create a download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "ወርዷል",
        description: `${fileName} በተሳካ ሁኔታ ወርዷል`,
      });
    } catch (error: any) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: `ፋይል ለማውረድ ችግር ተፈጥሯል: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const exportToCsv = (singleSubmission?: ReportSubmission) => {
    try {
      const dataToExport = singleSubmission ? [singleSubmission] : filteredSubmissions;
      const csvHeader = "ID,ሙሉ ስም,ስልክ,ኢሜይል,ወረዳ,ቀበሌ,የሪፖርት ዓይነት,የሪፖርት ዝርዝር,የተፈጠረበት ጊዜ\n";
      
      const csvRows = dataToExport.map(item => {
        // Format the date
        const formattedDate = format(new Date(item.created_at), "yyyy-MM-dd HH:mm:ss");
        
        // Escape values to handle commas and quotes within the data
        const escapedDetails = `"${item.report_details.replace(/"/g, '""')}"`;
        const email = item.email ? item.email : '';
        
        return `${item.id},${item.full_name},${item.phone},${email},${item.woreda},${item.kebele},${item.report_type},${escapedDetails},${formattedDate}`;
      });
      
      const csvString = csvHeader + csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", singleSubmission ? `report_${singleSubmission.id}.csv` : "report_submissions.csv");
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "ወርዷል",
        description: "CSV ፋይል በተሳካ ሁኔታ ወርዷል",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Error",
        description: "የCSV ፋይል ለማውረድ ችግር ተፈጥሯል",
        variant: "destructive",
      });
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gov-accent"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gov-dark">ሪፖርቶች</h2>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ፈልግ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Button
            onClick={() => exportToCsv()}
            className="bg-gov-accent hover:bg-gov-accent/90 gap-2 w-full md:w-auto"
            disabled={filteredSubmissions.length === 0}
          >
            <Download size={16} />
            ሁሉንም ወርድ (CSV)
          </Button>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm.trim() !== "" ? (
            <p>ምንም ሪፖርት አልተገኘም። እባክዎን ሌላ ቃል ይሞክሩ።</p>
          ) : (
            <p>ምንም ሪፖርት አልተገኘም።</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ሙሉ ስም</TableHead>
                <TableHead>ወረዳ/ቀበሌ</TableHead>
                <TableHead>የሪፖርት ዓይነት</TableHead>
                <TableHead>ቀን</TableHead>
                <TableHead className="text-right">ድርጊቶች</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {submission.full_name}
                    {submission.attachments && submission.attachments.length > 0 && (
                      <span className="ml-2 inline-flex items-center">
                        <Paperclip size={14} className="text-gray-400" />
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{submission.woreda}/{submission.kebele}</TableCell>
                  <TableCell>{submission.report_type}</TableCell>
                  <TableCell>{format(new Date(submission.created_at), "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(submission)}
                        className="gap-1"
                      >
                        <Eye size={14} />
                        ዝርዝር
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportToCsv(submission)}
                        className="gap-1"
                      >
                        <Download size={14} />
                        CSV
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">የሪፖርት ዝርዝር</DialogTitle>
                <DialogDescription>
                  የተመዘገበው በ {format(new Date(selectedSubmission.created_at), "MMMM dd, yyyy HH:mm")}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">ሙሉ ስም</p>
                  <p>{selectedSubmission.full_name}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">ስልክ</p>
                  <p>{selectedSubmission.phone}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">ኢሜይል</p>
                  <p>{selectedSubmission.email || "N/A"}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">ወረዳ/ቀበሌ</p>
                  <p>{selectedSubmission.woreda}/{selectedSubmission.kebele}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">የሪፖርት ዓይነት</p>
                  <p>{selectedSubmission.report_type}</p>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-gray-500">የሪፖርት ዝርዝር</p>
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                  {selectedSubmission.report_details}
                </div>
              </div>

              {/* Attachments section */}
              {selectedSubmission.attachments && selectedSubmission.attachments.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium text-gray-500">አባሪዎች</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <ul className="space-y-2">
                      {selectedSubmission.attachments.map((file, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Paperclip size={16} className="text-gray-500" />
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadAttachment(file.path, file.name)}
                            className="text-gov-accent hover:text-gov-accent/90"
                          >
                            <Download size={16} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setDetailsOpen(false)}
                >
                  ዝጋ
                </Button>
                
                <Button
                  onClick={() => exportToCsv(selectedSubmission)}
                  className="bg-gov-accent hover:bg-gov-accent/90 gap-2"
                >
                  <Download size={16} />
                  CSV ወርድ
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          ጠቅላላ {totalCount} ሪፖርቶች
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            ቀዳሚ
          </Button>
          <span className="px-4 py-2 text-sm">
            ገጽ {page} ከ {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
          >
            ቀጣይ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportSubmissions;
