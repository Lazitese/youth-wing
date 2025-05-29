import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Search, Plus, Pencil, Trash } from "lucide-react";
import { Database } from "@/types/supabase";

type Job = Database['public']['Tables']['jobs']['Row'];
type JobInsert = Database['public']['Tables']['jobs']['Insert'];

export const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<JobInsert>({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    location: "",
    job_type: "full_time",
    deadline: new Date().toISOString().split('T')[0],
  });
  const { toast } = useToast();

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
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "ስህተት",
        description: "የስራ ማስታወቂያዎችን መጫን አልተቻለም",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("jobs")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "ተሳክቷል",
        description: "የስራ ማስታወቂያው በተሳካ ሁኔታ ተጨምሯል",
      });

      setShowAddDialog(false);
      setFormData({
        title: "",
        description: "",
        requirements: "",
        responsibilities: "",
        location: "",
        job_type: "full_time",
        deadline: new Date().toISOString().split('T')[0],
      });
      fetchJobs();
    } catch (error) {
      console.error("Error adding job:", error);
      toast({
        title: "ስህተት",
        description: "የስራ ማስታወቂያውን መጨመር አልተቻለም",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditJob = async () => {
    if (!selectedJob) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("jobs")
        .update(formData)
        .eq("id", selectedJob.id);

      if (error) throw error;

      toast({
        title: "ተሳክቷል",
        description: "የስራ ማስታወቂያው በተሳካ ሁኔታ ተዘምኗል",
      });

      setShowEditDialog(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error);
      toast({
        title: "ስህተት",
        description: "የስራ ማስታወቂያውን ማዘመን አልተቻለም",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async () => {
    if (!selectedJob) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", selectedJob.id);

      if (error) throw error;

      toast({
        title: "ተሳክቷል",
        description: "የስራ ማስታወቂያው በተሳካ ሁኔታ ተሰርዟል",
      });

      setShowDeleteDialog(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
      toast({
        title: "ስህተት",
        description: "የስራ ማስታወቂያውን መሰረዝ አልተቻለም",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredJobs = () => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.location?.toLowerCase() || "").includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === "all" || job.job_type === selectedType;
      
      return matchesSearch && matchesType;
    });
  };

  const filteredJobs = getFilteredJobs();

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

  const getJobTypeColorClass = (type: string) => {
    switch (type) {
      case "full_time":
        return "bg-blue-100 text-blue-800";
      case "part_time":
        return "bg-purple-100 text-purple-800";
      case "contract":
        return "bg-amber-100 text-amber-800";
      case "internship":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gov-blue" />
      </div>
    );
  }

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
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="የስራ አይነት" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ሁሉም</SelectItem>
              <SelectItem value="full_time">ሙሉ ጊዜ</SelectItem>
              <SelectItem value="part_time">ትርፍ ጊዜ</SelectItem>
              <SelectItem value="contract">ኮንትራት</SelectItem>
              <SelectItem value="internship">ልምምድ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => {
            setFormData({
              title: "",
              description: "",
              requirements: "",
              responsibilities: "",
              location: "",
              job_type: "full_time",
              deadline: new Date().toISOString().split('T')[0],
            });
            setShowAddDialog(true);
          }}
          className="w-full sm:w-auto gap-2"
        >
          <Plus className="h-4 w-4" /> አዲስ ስራ
        </Button>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-white pb-2">
          <CardTitle className="text-xl">የስራ ማስታወቂያዎች</CardTitle>
          <CardDescription>
            {filteredJobs.length > 0 
              ? `${filteredJobs.length} ስራዎች ተገኝተዋል` 
              : "ምንም ስራዎች አልተገኙም"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">ምንም ስራዎች አልተገኙም</h3>
              <p className="mt-1 text-sm text-gray-500">
                ምንም የስራ ማስታወቂያዎች አልተገኙም። አዲስ የስራ ማስታወቂያ ለመጨመር "አዲስ ስራ" ቁልፉን ይጫኑ።
              </p>
            </div>
          ) : (
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="bg-gray-50 border-b p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base line-clamp-1">{job.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${getJobTypeColorClass(job.job_type)}`}>
                            {getJobTypeText(job.job_type)}
                          </span>
                          {job.is_active ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                              ነቅቷል
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                              አልነቃም
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedJob(job);
                            setFormData({
                              title: job.title,
                              description: job.description,
                              requirements: job.requirements || "",
                              responsibilities: job.responsibilities || "",
                              location: job.location || "",
                              job_type: job.job_type,
                              deadline: new Date(job.deadline).toISOString().split('T')[0],
                              is_active: job.is_active,
                            });
                            setShowEditDialog(true);
                          }}
                          className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowDeleteDialog(true);
                          }}
                          className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="line-clamp-2 text-sm text-gray-600">
                        {job.description}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        {job.location && (
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                            </svg>
                            <span>{job.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                            <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                          </svg>
                          <span>የመጨረሻ ቀን: {new Date(job.deadline).toLocaleDateString('am-ET')}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Job Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>አዲስ የስራ ማስታወቂያ</DialogTitle>
            <DialogDescription>
              አዲስ የስራ ማስታወቂያ ለመጨመር ቅጹን ይሙሉ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">የስራ መደብ</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">ስለ ስራው</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="requirements">መስፈርቶች</Label>
              <Textarea
                id="requirements"
                value={formData.requirements || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, requirements: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="responsibilities">ኃላፊነቶች</Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    responsibilities: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">አድራሻ</Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="job_type">የስራ አይነት</Label>
              <Select
                value={formData.job_type}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    job_type: value as Job['job_type'],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">ሙሉ ጊዜ</SelectItem>
                  <SelectItem value="part_time">ትርፍ ጊዜ</SelectItem>
                  <SelectItem value="contract">ኮንትራት</SelectItem>
                  <SelectItem value="internship">ልምምድ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">የመጨረሻ ቀን</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deadline: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              ይቅር
            </Button>
            <Button onClick={handleAddJob} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              ጨምር
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>የስራ ማስታወቂያ ማስተካከያ</DialogTitle>
            <DialogDescription>
              የስራ ማስታወቂያውን መረጃ ያስተካክሉ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">የስራ መደብ</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">ስለ ስራው</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-requirements">መስፈርቶች</Label>
              <Textarea
                id="edit-requirements"
                value={formData.requirements || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, requirements: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-responsibilities">ኃላፊነቶች</Label>
              <Textarea
                id="edit-responsibilities"
                value={formData.responsibilities || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    responsibilities: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">አድራሻ</Label>
              <Input
                id="edit-location"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-job_type">የስራ አይነት</Label>
              <Select
                value={formData.job_type}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    job_type: value as Job['job_type'],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">ሙሉ ጊዜ</SelectItem>
                  <SelectItem value="part_time">ትርፍ ጊዜ</SelectItem>
                  <SelectItem value="contract">ኮንትራት</SelectItem>
                  <SelectItem value="internship">ልምምድ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-deadline">የመጨረሻ ቀን</Label>
              <Input
                id="edit-deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deadline: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              ይቅር
            </Button>
            <Button onClick={handleEditJob} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              አስተካክል
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Job Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>የስራ ማስታወቂያ ሰርዝ</DialogTitle>
            <DialogDescription>
              እርግጠኛ ነዎት ይህን የስራ ማስታወቂያ መሰረዝ ይፈልጋሉ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              ይቅር
            </Button>
            <Button variant="destructive" onClick={handleDeleteJob} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              ሰርዝ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobsList; 