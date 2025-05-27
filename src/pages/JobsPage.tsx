import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  ExternalLink,
  Filter,
  MapPin,
  Search,
  Loader2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { JobsDocuments } from "@/components/admin/JobsDocuments";

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
};

export const JobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    document.title = "የስራ ማስታወቂያዎች አስተዳዳሪ | ብልጽግና ፓርቲ ሴቶች ክንፍ";
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin/login");
        return;
      }

      // Check if user is admin
      const { data: userProfile, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;

      if (!userProfile?.is_admin) {
        navigate("/admin/login");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
      fetchJobs();
    } catch (error) {
      console.error("Error checking session:", error);
      navigate("/admin/login");
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // Only fetch active jobs
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
      
      // If there are jobs, select the first one by default
      if (data && data.length > 0) {
        setSelectedJob(data[0]);
      }
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

  const getFilteredJobs = () => {
    return jobs.filter(job => {
      // Filter by search query
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by job type
      const matchesType = selectedType === "all" || job.job_type === selectedType;
      
      return matchesSearch && matchesType;
    });
  };

  const filteredJobs = getFilteredJobs();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('am-ET', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
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
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gov-blue" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <JobsDocuments />
      </div>
    </div>
  );
};

export default JobsPage; 