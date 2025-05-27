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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="ፈልግ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
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
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          አዲስ ስራ
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getJobTypeColorClass(job.job_type)}`}>
                  {getJobTypeText(job.job_type)}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
              {job.location && (
                <p className="mt-2 text-sm text-gray-500">📍 {job.location}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                ⏰ የመጨረሻ ቀን: {new Date(job.deadline).toLocaleDateString('am-ET')}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedJob(job);
                  setFormData({
                    title: job.title,
                    description: job.description,
                    requirements: job.requirements || "",
                    responsibilities: job.responsibilities || "",
                    location: job.location || "",
                    job_type: job.job_type,
                    deadline: job.deadline,
                  });
                  setShowEditDialog(true);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                አስተካክል
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSelectedJob(job);
                  setShowDeleteDialog(true);
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                ሰርዝ
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Job Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>አዲስ የስራ ማስታወቂያ</DialogTitle>
            <DialogDescription>
              እባክዎ የስራ ማስታወቂያውን ዝርዝሮች ያስገቡ
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>የስራ ማስታወቂያ አስተካክል</DialogTitle>
            <DialogDescription>
              እባክዎ የስራ ማስታወቂያውን ዝርዝሮች ያስተካክሉ
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