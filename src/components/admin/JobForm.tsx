import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Briefcase, Loader2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type Job = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  department: string;
  location: string;
  deadline: string;
  status: string;
  created_at?: string;
};

type JobFormProps = {
  job?: Job;
  onSubmit: (job: Omit<Job, "created_at">) => void;
  onCancel: () => void;
};

export const JobForm = ({ job, onSubmit, onCancel }: JobFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("active");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setRequirements(job.requirements);
      setResponsibilities(job.responsibilities);
      setDepartment(job.department);
      setLocation(job.location);
      // Format deadline for input date field (YYYY-MM-DD)
      setDeadline(new Date(job.deadline).toISOString().split("T")[0]);
      setStatus(job.status);
    }
  }, [job]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "የስራ ርዕስ ያስፈልጋል";
    }

    if (!description.trim()) {
      newErrors.description = "የስራ ዝርዝር ያስፈልጋል";
    }

    if (!requirements.trim()) {
      newErrors.requirements = "መስፈርቶች ያስፈልጋሉ";
    }

    if (!responsibilities.trim()) {
      newErrors.responsibilities = "ኃላፊነቶች ያስፈልጋሉ";
    }

    if (!department.trim()) {
      newErrors.department = "ዲፓርትመንት ያስፈልጋል";
    }

    if (!location.trim()) {
      newErrors.location = "ቦታ ያስፈልጋል";
    }

    if (!deadline) {
      newErrors.deadline = "የመጨረሻ ቀን ያስፈልጋል";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        id: job?.id || "",
        title,
        description,
        requirements,
        responsibilities,
        department,
        location,
        deadline: new Date(deadline).toISOString(),
        status
      };

      await onSubmit(jobData);
    } catch (error) {
      console.error("Error submitting job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="bg-gov-blue p-6 -mx-6 -mt-6 rounded-t-lg flex-shrink-0">
          <DialogTitle className="text-white text-xl flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            {job ? "የስራ ማስታወቂያ ማስተካከያ" : "አዲስ የስራ ማስታወቂያ"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4 overflow-y-auto flex-1">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-900 font-semibold">
              የስራ ርዕስ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="የስራ ርዕስ ያስገቡ"
              className={`bg-white border-2 ${
                errors.title ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-gray-900 font-semibold">
                ዲፓርትመንት <span className="text-red-500">*</span>
              </Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="ዲፓርትመንት ያስገቡ"
                className={`bg-white border-2 ${
                  errors.department ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.department && (
                <p className="text-sm text-red-500">{errors.department}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-900 font-semibold">
                ቦታ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ቦታ ያስገቡ"
                className={`bg-white border-2 ${
                  errors.location ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-gray-900 font-semibold">
                የመጨረሻ ቀን <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={`bg-white border-2 ${
                  errors.deadline ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.deadline && (
                <p className="text-sm text-red-500">{errors.deadline}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-900 font-semibold">
                ሁኔታ <span className="text-red-500">*</span>
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger
                  id="status"
                  className="bg-white border-2 border-gray-200"
                >
                  <SelectValue placeholder="ሁኔታ ይምረጡ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">ገቢር</SelectItem>
                  <SelectItem value="inactive">የተዘጋ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-900 font-semibold">
              የስራ ዝርዝር <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="የስራውን ዝርዝር ያስገቡ"
              rows={5}
              className={`bg-white border-2 ${
                errors.description ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-gray-900 font-semibold">
              መስፈርቶች <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="ለስራው የሚያስፈልጉ መስፈርቶችን ያስገቡ"
              rows={5}
              className={`bg-white border-2 ${
                errors.requirements ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.requirements && (
              <p className="text-sm text-red-500">{errors.requirements}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities" className="text-gray-900 font-semibold">
              ኃላፊነቶች <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="responsibilities"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="የስራው ኃላፊነቶችን ያስገቡ"
              rows={5}
              className={`bg-white border-2 ${
                errors.responsibilities ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.responsibilities && (
              <p className="text-sm text-red-500">{errors.responsibilities}</p>
            )}
          </div>
        </form>

        <DialogFooter className="flex-shrink-0 gap-3 flex-col sm:flex-row border-t border-gray-200 pt-6 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            ይቅር
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-gov-blue hover:bg-gov-blue/90 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                በማስገባት ላይ...
              </>
            ) : job ? (
              "ማስተካከያ አስቀምጥ"
            ) : (
              "ስራ ፍጠር"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 