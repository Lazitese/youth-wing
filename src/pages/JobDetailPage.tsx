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
  Loader2,
  ChevronRight
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      document.title = `${data.title} | ብልጽግና ፓርቲ ወጣት ክንፍ`;
      
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!job) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{job?.title || "ስራ"} | ብልጽግና ፓርቲ ወጣት ክንፍ</title>
        <meta name="description" content={job?.description} />
      </Helmet>
      
      <Navbar />
      
      {/* Job header section with breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Button 
              variant="link" 
              className="p-0 h-auto text-gray-600 hover:text-primary"
              onClick={() => navigate("/")}
            >
              ዋና ገጽ
            </Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Button 
              variant="link" 
              className="p-0 h-auto text-gray-600 hover:text-primary"
              onClick={() => navigate("/jobs")}
            >
              ስራዎች
            </Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-primary font-medium truncate max-w-[200px]">{job.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center text-gray-700">
                <Building className="h-5 w-5 mr-2 text-primary/80" />
                <span className="font-medium">{job.department || "ብልጽግና ፓርቲ"}</span>
              </div>
            </div>
            
            {/* CTA for medium and larger screens */}
            <div className="hidden md:block">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 h-auto shadow-sm"
                onClick={() => setOpenApplyDialog(true)}
                disabled={isDeadlinePassed(job.deadline)}
              >
                {isDeadlinePassed(job.deadline) 
                  ? "የማመልከቻ ጊዜው አልፏል" 
                  : "አሁን አመልክት"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Job details card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-8 overflow-hidden">
          {/* Job metadata section */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 bg-gray-50 border-b border-gray-200">
            <div className="p-4 flex flex-col">
              <span className="text-xs uppercase text-gray-500 font-medium mb-1">ቦታ</span>
              <div className="flex items-center text-gray-800 font-medium">
                <MapPin className="h-4 w-4 mr-1.5 text-primary/70" />
                <span>{job.location || "አዲስ አበባ"}</span>
              </div>
            </div>
            <div className="p-4 flex flex-col">
              <span className="text-xs uppercase text-gray-500 font-medium mb-1">የስራ አይነት</span>
              <div className="flex items-center text-gray-800 font-medium">
                <Briefcase className="h-4 w-4 mr-1.5 text-primary/70" />
                <span>{getJobTypeText(job.job_type)}</span>
              </div>
            </div>
            <div className="p-4 flex flex-col border-t md:border-t-0">
              <span className="text-xs uppercase text-gray-500 font-medium mb-1">የመጨረሻ ቀን</span>
              <div className="flex items-center text-gray-800 font-medium">
                <Calendar className="h-4 w-4 mr-1.5 text-primary/70" />
                <span>{format(new Date(job.deadline), "MMMM d, yyyy")}</span>
              </div>
            </div>
            <div className="p-4 flex flex-col border-t md:border-t-0">
              <span className="text-xs uppercase text-gray-500 font-medium mb-1">ሁኔታ</span>
              <div>
                {isDeadlinePassed(job.deadline) ? (
                  <Badge variant="destructive" className="text-xs py-1 px-2 font-medium">
                    <Clock className="h-3 w-3 mr-1" />
                    ማመልከቻው ተዘግቷል
                  </Badge>
                ) : (
                  <Badge className="text-xs py-1 px-2 font-medium bg-primary/10 text-primary border-primary/20">
                    <Clock className="h-3 w-3 mr-1" />
                    {getDaysRemaining(job.deadline) === 0 
                      ? "ዛሬ ይዘጋል" 
                      : `${getDaysRemaining(job.deadline)} ቀናት ቀርተዋል`}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Job description */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 flex items-center">
              <ListChecks className="h-5 w-5 mr-2 text-primary" />
              የስራ ዝርዝር
            </h2>
            <div className="prose max-w-none mb-6">
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* CTA for small screens */}
            <div className="md:hidden mt-8 mb-4">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 h-auto"
                onClick={() => setOpenApplyDialog(true)}
                disabled={isDeadlinePassed(job.deadline)}
              >
                {isDeadlinePassed(job.deadline) 
                  ? "የማመልከቻ ጊዜው አልፏል" 
                  : "አሁን አመልክት"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Requirements and responsibilities cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center pb-2 border-b border-gray-100">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              መስፈርቶች
            </h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">{job.requirements}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center pb-2 border-b border-gray-100">
              <ListChecks className="h-5 w-5 mr-2 text-primary" />
              ኃላፊነቶች
            </h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">{job.responsibilities}</p>
            </div>
          </div>
        </div>
        
        {/* Application section - keeping this as is since it's already perfect */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <Briefcase className="h-6 w-6 mr-3" />
            ለዚህ ስራ ማመልከት ይፈልጋሉ?
          </h2>
          <p className="mb-6 text-white/90 text-lg">
            የራስዎን መረጃ እና የሕይወት ታሪክዎን (CV) በማስገባት አሁኑኑ ያመልክቱ።
          </p>
          <Button 
            className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-6 py-5 h-auto shadow-lg"
            onClick={() => setOpenApplyDialog(true)}
            disabled={isDeadlinePassed(job.deadline)}
          >
            {isDeadlinePassed(job.deadline) 
              ? "የማመልከቻ ጊዜው አልፏል" 
              : "አሁን አመልክት"}
          </Button>
        </div>
      </div>
      
      <Footer />
      
      {/* Application Dialog */}
      <Dialog open={openApplyDialog} onOpenChange={setOpenApplyDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogHeader className="bg-primary p-6 rounded-t-lg flex-shrink-0">
            <DialogTitle className="text-white text-xl flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              ለ{job.title} ማመልከቻ
            </DialogTitle>
            <DialogDescription className="text-white/90 mt-1">
              እባክዎ የተሟላ መረጃ ያስገቡ። ሁሉም ያስፈልጋሉ።
            </DialogDescription>
          </DialogHeader>
          
          {applicationSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                ማመልከቻዎ ተቀብሏል!
              </h3>
              <p className="text-gray-600 max-w-md mb-8 text-lg">
                ለ "{job.title}" ያስገቡት ማመልከቻ በሚገባ ተቀብሏል። ከሂደቱ ጋር በተያያዘ ለተጨማሪ መረጃ 
                ወደ {email} ኢሜይል ልንልክልዎ እንችላለን።
              </p>
              <Button 
                onClick={() => {
                  setOpenApplyDialog(false);
                  setApplicationSubmitted(false);
                }}
                className="bg-primary hover:bg-primary/90 px-6"
              >
                ፎርሙን ዝጋ
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6 p-6 overflow-y-auto flex-1 bg-gray-50">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-900 font-semibold">
                    ሙሉ ስም <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="fullName"
                      placeholder="ሙሉ ስምዎን ያስገቡ"
                      className="pl-10 bg-white border-2 border-gray-200 h-11"
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
                        className="pl-10 bg-white border-2 border-gray-200 h-11"
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
                        className="pl-10 bg-white border-2 border-gray-200 h-11"
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
                      className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                        fileError 
                          ? 'border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400' 
                          : resume 
                            ? 'border-primary bg-primary/5 hover:bg-primary/10 hover:border-primary' 
                            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {resume ? (
                          <>
                            <FileText className="w-10 h-10 mb-3 text-primary" />
                            <p className="text-sm font-medium text-gray-900">{resume.name}</p>
                            <p className="text-xs text-gray-600 mt-1">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                            <p className="text-xs text-gray-500 mt-2">ሌላ ፋይል ለመምረጥ ጠቅ ያድርጉ</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 mb-4 text-primary" />
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
              
              <DialogFooter className="flex-shrink-0 gap-3 flex-col sm:flex-row p-6 bg-white border-t border-gray-200">
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
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium h-11"
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
    </div>
  );
};

export default JobDetailPage; 