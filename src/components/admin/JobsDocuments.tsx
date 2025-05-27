import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Calendar,
  Edit,
  Eye,
  Loader2,
  MapPin,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type Job = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  job_type: string;
  deadline: string;
  created_at: string;
  is_active: boolean;
};

export const JobsDocuments = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    location: "",
    job_type: "full_time",
    deadline: "",
    is_active: true,
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
      toast({
        title: "ስራዎች በተሳካ ሁኔታ ተጭነዋል",
        variant: "default",
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "ስህተት",
        description: "ስራዎችን መጫን አልተቻለም",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async () => {
    try {
      setIsFormSubmitting(true);

      // Validate form data
      if (!formData.title || !formData.description || !formData.deadline) {
        toast({
          title: "ስህተት",
          description: "እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.from("jobs").insert([
        {
          title: formData.title,
          description: formData.description,
          requirements: formData.requirements,
          responsibilities: formData.responsibilities,
          location: formData.location,
          job_type: formData.job_type,
          deadline: formData.deadline,
          is_active: formData.is_active,
        },
      ]).select();

      if (error) throw error;

      toast({
        title: "የስራ ማስታወቂያ በተሳካ ሁኔታ ተጨምሯል",
        variant: "default",
      });

      setJobs([...(data || []), ...jobs]);
      resetForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding job:", error);
      toast({
        title: "ስህተት",
        description: "የስራ ማስታወቂያ መጨመር አልተቻለም",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleUpdateJob = async () => {
    if (!selectedJob) return;
    
    try {
      setIsFormSubmitting(true);

      // Validate form data
      if (!formData.title || !formData.description || !formData.deadline) {
        toast({
          title: "ስህተት",
          description: "እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("jobs")
        .update({
          title: formData.title,
          description: formData.description,
          requirements: formData.requirements,
          responsibilities: formData.responsibilities,
          location: formData.location,
          job_type: formData.job_type,
          deadline: formData.deadline,
          is_active: formData.is_active,
        })
        .eq("id", selectedJob.id);

      if (error) throw error;

      toast({
        title: "የስራ ማስታወቂያ በተሳካ ሁኔታ ተዘምኗል",
        variant: "default",
      });

      // Update local state
      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id
          ? { ...job, ...formData }
          : job
      );
      setJobs(updatedJobs);
      
      resetForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error updating job:", error);
      toast({
        title: "ስህተት",
        description: "የስራ ማስታወቂያ ማዘመን አልተቻለም",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleDeleteJob = async () => {
    if (!selectedJob) return;
    
    try {
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", selectedJob.id);

      if (error) throw error;

      toast({
        title: "የስራ ማስታወቂያ በተሳካ ሁኔታ ተሰርዟል",
        variant: "default",
      });

      // Update local state
      setJobs(jobs.filter((job) => job.id !== selectedJob.id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast({
        title: "ስህተት",
        description: "የስራ ማስታወቂያ መሰረዝ አልተቻለም",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      requirements: "",
      responsibilities: "",
      location: "",
      job_type: "full_time",
      deadline: "",
      is_active: true,
    });
    setSelectedJob(null);
  };

  const openEditDialog = (job: Job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      requirements: job.requirements || "",
      responsibilities: job.responsibilities || "",
      location: job.location || "",
      job_type: job.job_type || "full_time",
      deadline: job.deadline,
      is_active: job.is_active,
    });
    setIsAddDialogOpen(true);
  };

  const openDeleteDialog = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteDialogOpen(true);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getJobTypeText = (type: string) => {
    switch (type) {
      case "full_time":
        return "ሙሉ ጊዜ";
      case "part_time":
        return "ትርፍ ጊዜ";
      case "contract":
        return "ኮንትራት";
      case "internship":
        return "ልምምድ";
      default:
        return type;
    }
  };

  return (
    <div className="w-full">
      {/* Header with search and add button */}
      <div className="bg-gradient-to-r from-gov-blue to-gov-blue/80 p-6 rounded-t-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Briefcase className="text-white h-6 w-6" />
            <h2 className="text-xl font-bold text-white">የስራ ማስታወቂያዎች አስተዳደር</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="ፈልግ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full md:w-64 bg-white/90 border-0 focus-visible:ring-2 focus-visible:ring-offset-1"
              />
            </div>
            
            <Button
              onClick={() => {
                resetForm();
                setIsAddDialogOpen(true);
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              አዲስ የስራ ማስታወቂያ ጨምር
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-gov-blue" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">ምንም የስራ ማስታወቂያዎች አልተገኙም</h3>
            <p className="text-gray-500 mt-1 max-w-md">
              {searchQuery
                ? `"${searchQuery}" ለሚለው ፍለጋ ምንም የስራ ማስታወቂያዎች አልተገኙም።`
                : "አሁን ምንም የስራ ማስታወቂያዎች የሉም። አዲስ የስራ ማስታወቂያ ለመጨመር ከላይ ያለውን ቁልፍ ይጠቀሙ።"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-bold">የስራ ማስታወቂያ</TableHead>
                  <TableHead className="font-bold">ቦታ</TableHead>
                  <TableHead className="font-bold">የስራ አይነት</TableHead>
                  <TableHead className="font-bold">የመጨረሻ ቀን</TableHead>
                  <TableHead className="font-bold">ሁኔታ</TableHead>
                  <TableHead className="font-bold w-[100px] text-right">ድርጊቶች</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {job.location || "ኢትዮጵያ"}
                    </TableCell>
                    <TableCell>{getJobTypeText(job.job_type)}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {formatDate(job.deadline)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.is_active ? "ነቅቶ" : "ተዘግቷል"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => openEditDialog(job)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">አርትዕ</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => openDeleteDialog(job)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">አጥፋ</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Add/Edit Job Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="bg-gov-blue text-white p-4 -mx-6 -mt-6 mb-4 flex justify-between items-center">
              <DialogTitle className="text-xl">
                {selectedJob ? "የስራ ማስታወቂያ አርትዕ" : "አዲስ የስራ ማስታወቂያ"}
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-gov-blue/90"
                onClick={() => setIsAddDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              {selectedJob
                ? "የስራ ማስታወቂያውን ዝርዝሮች ያዘምኑ"
                : "አዲስ የስራ ማስታወቂያ ለመጨመር ቅጹን ይሙሉ"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="title" className="font-medium">
                ርዕስ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="የስራ ማስታወቂያ ርዕስ"
                className="mt-1"
              />
            </div>

            <div className="col-span-1">
              <Label htmlFor="location" className="font-medium">
                ቦታ
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="የስራ ቦታ"
                className="mt-1"
              />
            </div>

            <div className="col-span-1">
              <Label htmlFor="job_type" className="font-medium">
                የስራ አይነት
              </Label>
              <Select
                value={formData.job_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, job_type: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="የስራ አይነት ይምረጡ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">ሙሉ ጊዜ</SelectItem>
                  <SelectItem value="part_time">ትርፍ ጊዜ</SelectItem>
                  <SelectItem value="contract">ኮንትራት</SelectItem>
                  <SelectItem value="internship">ልምምድ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1">
              <Label htmlFor="deadline" className="font-medium">
                የመጨረሻ ቀን <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div className="col-span-1">
              <Label htmlFor="is_active" className="font-medium">
                ሁኔታ
              </Label>
              <Select
                value={formData.is_active ? "active" : "inactive"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    is_active: value === "active",
                  })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="ሁኔታ ይምረጡ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">ነቅቶ</SelectItem>
                  <SelectItem value="inactive">ተዘግቷል</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="description" className="font-medium">
                መግለጫ <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="የስራ ማስታወቂያ ዝርዝር መግለጫ"
                className="mt-1 min-h-[120px]"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="requirements" className="font-medium">
                መስፈርቶች
              </Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) =>
                  setFormData({ ...formData, requirements: e.target.value })
                }
                placeholder="የስራው መስፈርቶች"
                className="mt-1 min-h-[120px]"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="responsibilities" className="font-medium">
                ኃላፊነቶች
              </Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    responsibilities: e.target.value,
                  })
                }
                placeholder="የስራ ኃላፊነቶች"
                className="mt-1 min-h-[120px]"
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setIsAddDialogOpen(false);
              }}
            >
              ይቅር
            </Button>
            <Button
              onClick={selectedJob ? handleUpdateJob : handleAddJob}
              disabled={isFormSubmitting}
              className="bg-gov-blue hover:bg-gov-blue/90 text-white"
            >
              {isFormSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {selectedJob ? "አዘምን" : "ጨምር"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">
              የስራ ማስታወቂያ ሰርዝ
            </DialogTitle>
            <DialogDescription>
              <div className="mt-2 text-gray-700">
                "<span className="font-medium">{selectedJob?.title}</span>" የሚለውን የስራ ማስታወቂያ መሰረዝ ይፈልጋሉ?
              </div>
              <div className="mt-2 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <div className="flex gap-2 items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-yellow-500 mt-0.5"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div className="text-sm text-yellow-800">
                    ይህ ድርጊት ማገልበስ አይቻልም። ይህንን የስራ ማስታወቂያ ከሰረዙ፣ ሁሉም መረጃዎች ይጠፋሉ።
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              ይቅር
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteJob}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              ሰርዝ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 