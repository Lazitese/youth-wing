import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
// Removed the import for 'react-helmet-async' due to the error
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building, 
  Clock, 
  ArrowLeft,
  CheckCircle2,
  ListChecks,
  GraduationCap,
  Phone,
  Mail,
  User,
  FileText,
  Upload,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { differenceInDays, format, isAfter } from "date-fns";

type Job = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  department: string;
  location: string;
  deadline: string;
  job_type: string;
  created_at: string;
};

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  
  useEffect(() => {
    if (id) {
      fetchJob(id);
    }
  }, [id]);
  
  const fetchJob = async (jobId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .eq("is_active", true)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (!data) {
        navigate("/jobs");
        toast({
          variant: "destructive",
          title: "ስህተት",
          description: "የተጠየቀው የስራ ማስታወቂያ አልተገኘም።",
        });
        return;
      }
      
      setJob(data);
      document.title = `${data.title} | ብልጽግና ፓርቲ ሴቶች ክንፍ`;
      
    } catch (error) {
      console.error("Error fetching job:", error);
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "የስራ ማስታወቂያውን ለማግኘት አልተቻለም። እባክዎ ዳግም ይሞክሩ።",
      });
      navigate("/jobs");
    } finally {
      setLoading(false);
    }
  };
  
  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      setResume(null);
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("ፋይሉ ከ5MB በላይ ነው። እባክዎ ያነሰ መጠን ያለው ፋይል ይጠቀሙ።");
      return;
    }
    
    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setFileError("እባክዎ PDF ወይም Word (doc/docx) ፎርማት ያለው ፋይል ይጠቀሙ።");
      return;
    }
    
    setFileError("");
    setResume(file);
  };
  
  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setEducation("");
    setExperience("");
    setResume(null);
    setFileError("");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!fullName.trim() || !email.trim() || !phone.trim() || !education.trim() || !experience.trim() || !resume) {
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "እባክዎ ሁሉንም ግዴታ የሆኑ መረጃዎችን ያስገቡ።",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።",
      });
      return;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9+\-\s]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "እባክዎ ትክክለኛ የስልክ ቁጥር ያስገቡ።",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // 1. First create the application record
      const { data: application, error: insertError } = await supabase
        .from('applications')
        .insert([
          {
            job_id: id,
            full_name: fullName,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            status: 'pending'
          }
        ])
        .select()
        .single();
      
      if (insertError) throw insertError;

      // 2. Then upload resume with the application ID
      const fileExt = resume.name.split('.').pop();
      const fileName = `${application.id}_${Date.now()}.${fileExt}`;
      const filePath = `${id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(filePath, resume, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) throw uploadError;

      // 3. Update application with resume URL
      const { error: updateError } = await supabase
        .from('applications')
        .update({ resume_url: filePath })
        .eq('id', application.id);

      if (updateError) throw updateError;
      
      // 4. Show success message
      setApplicationSubmitted(true);
      toast({
        title: "ተሳክቷል",
        description: "ማመልከቻዎ በተሳካ ሁኔታ ተልኳል።",
      });
      
      // 5. Reset form
      resetForm();
      
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        variant: "destructive",
        title: "ማመልከቻውን ማስገባት አልተቻለም",
        description: error?.message || "ማመልከቻዎን በማስገባት ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ።",
      });
    } finally {
      setIsSubmitting(false);
    }
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
  
  const isDeadlinePassed = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return deadlineDate < now;
  };
  
  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    
    if (isAfter(now, deadlineDate)) {
      return 0;
    }
    
    return differenceInDays(deadlineDate, now);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-gov-blue animate-spin" />
        <span className="ml-3 text-gray-600">በመጫን ላይ...</span>
      </div>
    );
  }
  
  if (!job) {
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>{job?.title || "ስራ"} | ብልጽግና ፓርቲ ሴቶች ክንፍ</title>
        <meta name="description" content={job?.description} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => navigate("/jobs")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ወደ ስራዎች ይመለሱ
          </Button>
          
          <h1 className="text-3xl font-bold mb-3 text-gray-900">{job.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <Building className="h-5 w-5 mr-2 text-gov-blue" />
              <span>{job.department || "ብልጽግና ፓርቲ"}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-2 text-gov-blue" />
              <span>{job.location || "አዲስ አበባ"}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Briefcase className="h-5 w-5 mr-2 text-gov-blue" />
              <span>{getJobTypeText(job.job_type)}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-2 text-gov-blue" />
              <span>{format(new Date(job.deadline), "MMMM d, yyyy")}</span>
            </div>
          </div>
          
          {isDeadlinePassed(job.deadline) ? (
            <Badge variant="destructive" className="mb-6 text-sm py-1.5">
              <Clock className="h-4 w-4 mr-1.5" />
              ማመልከቻው ተዘግቷል
            </Badge>
          ) : (
            <Badge variant="outline" className="mb-6 text-sm py-1.5 border-gov-blue text-gov-blue">
              <Clock className="h-4 w-4 mr-1.5" />
              {getDaysRemaining(job.deadline) === 0 
                ? "ዛሬ ይዘጋል" 
                : `${getDaysRemaining(job.deadline)} ቀናት ቀርተዋል`}
            </Badge>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">የስራ ዝርዝር</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-700">{job.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">መስፈርቶች</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-gray-700">{job.requirements}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">ኃላፊነቶች</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-gray-700">{job.responsibilities}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gov-blue text-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            ለዚህ ስራ ማመልከት ይፈልጋሉ?
          </h2>
          <p className="mb-4 text-white/90">
            የራስዎን መረጃ እና የሕይወት ታሪክዎን (CV) በማስገባት አሁኑኑ ያመልክቱ።
          </p>
          <Button 
            className="bg-white text-gov-blue hover:bg-white/90"
            onClick={() => setOpenApplyDialog(true)}
            disabled={isDeadlinePassed(job.deadline)}
          >
            {isDeadlinePassed(job.deadline) 
              ? "የማመልከቻ ጊዜው አልፏል" 
              : "አሁን አመልክት"}
          </Button>
        </div>
      </div>
      
      {/* Application Dialog */}
      <Dialog open={openApplyDialog} onOpenChange={setOpenApplyDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
          <DialogHeader className="bg-gov-blue p-6 -mx-6 -mt-6 rounded-t-lg flex-shrink-0">
            <DialogTitle className="text-white text-xl flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              ለ{job.title} ማመልከቻ
            </DialogTitle>
            <DialogDescription className="text-white/90 mt-1">
              እባክዎ የተሟላ መረጃ ያስገቡ። ሁሉም ያስፈልጋሉ።
            </DialogDescription>
          </DialogHeader>
          
          {applicationSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ማመልከቻዎ ተቀብሏል!
              </h3>
              <p className="text-gray-600 max-w-md mb-6">
                ለ "{job.title}" ያስገቡት ማመልከቻ በሚገባ ተቀብሏል። ከሂደቱ ጋር በተያያዘ ለተጨማሪ መረጃ 
                ወደ {email} ኢሜይል ልንልክልዎ እንችላለን።
              </p>
              <Button 
                onClick={() => {
                  setOpenApplyDialog(false);
                  setApplicationSubmitted(false);
                }}
              >
                ፎርሙን ዝጋ
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6 py-4 overflow-y-auto flex-1">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-900 font-semibold">
                    ሙሉ ስም <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="fullName"
                      placeholder="ሙሉ ስምዎን ያስገቡ"
                      className="pl-10 bg-white border-2 border-gray-200"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 font-semibold">
                      ኢሜይል <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="የኢሜይል አድራሻዎን ያስገቡ"
                        className="pl-10 bg-white border-2 border-gray-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-900 font-semibold">
                      ስልክ ቁጥር <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="phone"
                        placeholder="የስልክ ቁጥርዎን ያስገቡ"
                        className="pl-10 bg-white border-2 border-gray-200"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-gray-900 font-semibold">
                    የትምህርት ደረጃ <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Textarea
                      id="education"
                      placeholder="የትምህርት ደረጃዎን፣ የተማሩበትን ተቋም እና ዓመት ያስገቡ"
                      className="pl-10 min-h-[100px] bg-white border-2 border-gray-200"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-gray-900 font-semibold">
                    የስራ ልምድ <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Textarea
                      id="experience"
                      placeholder="የስራ ልምድዎን፣ የሰሩበትን ድርጅት እና ዓመት ያስገቡ"
                      className="pl-10 min-h-[100px] bg-white border-2 border-gray-200"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-gray-900 font-semibold">
                    የሕይወት ታሪክ (CV) <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label 
                      htmlFor="resume-upload" 
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                        fileError 
                          ? 'border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400' 
                          : resume 
                            ? 'border-gov-blue bg-gov-blue/5 hover:bg-gov-blue/10 hover:border-gov-blue' 
                            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {resume ? (
                          <>
                            <FileText className="w-8 h-8 mb-2 text-gov-blue" />
                            <p className="text-sm font-medium text-gray-900">{resume.name}</p>
                            <p className="text-xs text-gray-600 mt-1">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                            <p className="text-xs text-gray-500 mt-2">ሌላ ፋይል ለመምረጥ ጠቅ ያድርጉ</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mb-3 text-gov-blue" />
                            <p className="mb-1 text-sm text-gray-900">
                              <span className="font-semibold">ለመጫን ጠቅ ያድርጉ</span> ወይም ፋይል ይጎትቱ
                            </p>
                            <p className="text-xs text-gray-600">
                              PDF ወይም Word (doc/docx) ፎርማት ብቻ (ከ5MB በታች)
                            </p>
                            {fileError && (
                              <p className="mt-2 text-sm text-red-600 flex items-center font-medium bg-red-50 px-3 py-1 rounded-full">
                                <AlertCircle className="w-4 h-4 mr-1.5" />
                                {fileError}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      <input
                        id="resume-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        required
                      />
                    </label>
                  </div>
                </div>
              </form>
              
              <DialogFooter className="flex-shrink-0 gap-3 flex-col sm:flex-row border-t border-gray-200 pt-6 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setOpenApplyDialog(false);
                  }}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto order-1 sm:order-none"
                >
                  ይቅር
                </Button>
                <Button
                  type="button"
                  className="w-full sm:w-auto bg-gov-blue hover:bg-gov-blue/90 text-white"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      በማስገባት ላይ...
                    </>
                  ) : (
                    "ማመልከቻ አስገባ"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobDetailPage; 