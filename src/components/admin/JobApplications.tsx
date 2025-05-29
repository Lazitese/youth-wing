import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Eye,
  FileText,
  Loader2,
  Search,
  UserCheck,
  UserX,
  Filter,
} from "lucide-react";
import { Database } from "@/types/supabase";

type JobApplication = Database["public"]["Tables"]["job_applications"]["Row"];
type Job = Database["public"]["Tables"]["jobs"]["Row"];

// Create a new interface that extends JobApplication to include job_title
interface EnhancedJobApplication extends JobApplication {
  job_title: string;
  jobs?: {
    title: string;
  };
}

export const JobApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<EnhancedJobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewApplication, setViewApplication] = useState<EnhancedJobApplication | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [jobsList, setJobsList] = useState<{ id: string; title: string }[]>([]);
  const [selectedJob, setSelectedJob] = useState("all");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobsList(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "የስራ ማስታወቂያዎችን ማግኘት አልተቻለም",
      });
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Join jobs and applications to get job titles
      const { data, error } = await supabase
        .from("job_applications")
        .select(
          "*, jobs:job_id(title)"
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform data to include job_title
      const transformedData = data.map(app => ({
        ...app,
        job_title: app.jobs?.title || "Unknown Job"
      }));

      setApplications(transformedData);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "የስራ ማመልከቻዎችን ማግኘት አልተቻለም",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    setStatusUpdateLoading(true);
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status } : app
        )
      );

      // Close dialog if open
      if (viewDialogOpen) {
        setViewDialogOpen(false);
        setViewApplication(null);
      }

      toast({
        title: "ዝመና ተሳክቷል",
        description: `የማመልከቻ ሁኔታ ወደ ${getStatusText(status)} ተቀይሯል`,
      });
    } catch (error) {
      console.error("Error updating application status:", error);
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "የማመልከቻ ሁኔታን መቀየር አልተቻለም",
      });
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "በመጠባበቅ ላይ";
      case "reviewed":
        return "ተገምግሟል";
      case "shortlisted":
        return "አጭር ዝርዝር";
      case "rejected":
        return "ተቀባይነት አላገኘም";
      case "accepted":
        return "ተቀብሏል";
      default:
        return status;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "outline";
      case "reviewed":
        return "secondary";
      case "shortlisted":
        return "blue";
      case "rejected":
        return "destructive";
      case "accepted":
        return "success";
      default:
        return "outline";
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job_title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    const matchesJob = selectedJob === "all" || app.job_id === selectedJob;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("am-ET", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="ፈልግ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="ሁኔታ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ሁሉም ሁኔታዎች</SelectItem>
                <SelectItem value="pending">በመጠባበቅ ላይ</SelectItem>
                <SelectItem value="reviewed">ተገምግሟል</SelectItem>
                <SelectItem value="shortlisted">አጭር ዝርዝር</SelectItem>
                <SelectItem value="rejected">ተቀባይነት አላገኘም</SelectItem>
                <SelectItem value="accepted">ተቀብሏል</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="የስራ ማስታወቂያ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ሁሉም ስራዎች</SelectItem>
                {jobsList.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={fetchApplications}
          disabled={loading}
          className="w-full sm:w-auto gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> ዝምብል...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
              </svg>
              ዳግም ጫን
            </>
          )}
        </Button>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-white pb-2">
          <CardTitle className="text-xl">የስራ ማመልከቻዎች</CardTitle>
          <CardDescription>
            {filteredApplications.length > 0 
              ? `${filteredApplications.length} ማመልከቻዎች ተገኝተዋል` 
              : "ምንም ማመልከቻዎች አልተገኙም"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gov-blue" />
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">ማመልከቻዎች አልተገኙም</h3>
              <p className="mt-1 text-sm text-gray-500">
                ምንም የስራ ማመልከቻዎች አልተገኙም።
              </p>
            </div>
          ) : (
            <div className="rounded-md border-t overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">ሙሉ ስም</TableHead>
                    <TableHead className="font-medium">ኢሜይል</TableHead>
                    <TableHead className="font-medium">የስራ ማስታወቂያ</TableHead>
                    <TableHead className="font-medium">ቀን</TableHead>
                    <TableHead className="font-medium">ሁኔታ</TableHead>
                    <TableHead className="text-right font-medium">ድርጊቶች</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id} className="hover:bg-gray-50 border-b">
                      <TableCell className="font-medium">{application.full_name}</TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell>{application.job_title}</TableCell>
                      <TableCell>{formatDate(application.created_at)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(application.status) as any} className="font-normal">
                          {getStatusText(application.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setViewApplication(application);
                              setViewDialogOpen(true);
                            }}
                            className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(application.resume_url, "_blank")}
                            className="h-8 w-8 text-green-600 hover:text-green-800 hover:bg-green-50"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Application Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>የማመልከቻ ዝርዝሮች</DialogTitle>
            <DialogDescription>
              {viewApplication?.job_title ? `ለ ${viewApplication.job_title} ቀርቧል` : "የማመልከቻ መረጃ"}
            </DialogDescription>
          </DialogHeader>

          {viewApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-500">ሙሉ ስም</h4>
                  <p className="mt-1 text-sm font-medium text-gray-900">{viewApplication.full_name}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-500">ኢሜይል</h4>
                  <p className="mt-1 text-sm font-medium text-gray-900">{viewApplication.email}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-500">ስልክ</h4>
                  <p className="mt-1 text-sm font-medium text-gray-900">{viewApplication.phone}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-500">ቀን</h4>
                  <p className="mt-1 text-sm font-medium text-gray-900">{formatDate(viewApplication.created_at)}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-500">ትምህርት</h4>
                <p className="mt-1 text-sm whitespace-pre-wrap">{viewApplication.education}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-500">የስራ ልምድ</h4>
                <p className="mt-1 text-sm whitespace-pre-wrap">{viewApplication.experience}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-500">የሕይወት ታሪክ</h4>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(viewApplication.resume_url, "_blank")}
                  >
                    <Download className="h-4 w-4" /> የሕይወት ታሪክ አውርድ
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-500">ሁኔታ</h4>
                <div className="mt-2">
                  <Select
                    value={viewApplication.status}
                    onValueChange={(value) => 
                      updateApplicationStatus(viewApplication.id, value)
                    }
                    disabled={statusUpdateLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">በመጠባበቅ ላይ</SelectItem>
                      <SelectItem value="reviewed">ተገምግሟል</SelectItem>
                      <SelectItem value="shortlisted">አጭር ዝርዝር</SelectItem>
                      <SelectItem value="rejected">ተቀባይነት አላገኘም</SelectItem>
                      <SelectItem value="accepted">ተቀብሏል</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setViewDialogOpen(false)}
            >
              ዝጋ
            </Button>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => updateApplicationStatus(viewApplication?.id || "", "rejected")}
                disabled={statusUpdateLoading || viewApplication?.status === "rejected"}
                className="gap-2"
              >
                {statusUpdateLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <UserX className="h-4 w-4" /> ውድቅ አድርግ
                  </>
                )}
              </Button>
              <Button
                variant="default"
                onClick={() => updateApplicationStatus(viewApplication?.id || "", "accepted")}
                disabled={statusUpdateLoading || viewApplication?.status === "accepted"}
                className="gap-2"
              >
                {statusUpdateLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <UserCheck className="h-4 w-4" /> ተቀበል
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 