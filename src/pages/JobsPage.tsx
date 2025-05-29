import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
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
  Loader2, 
  Search, 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar,
  ArrowRight, 
  Filter,
  Building,
  Banknote,
  GraduationCap,
  Badge,
  ChevronRight,
  Star,
  CheckCircle
} from "lucide-react";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Database } from "@/types/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

type Job = Database['public']['Tables']['jobs']['Row'];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Particle component for visual effect
const Particles = () => {
  return (
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export const JobsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
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
      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
      
      return matchesSearch && matchesType && matchesLocation;
    });
  };

  const getLocations = () => {
    const locations = jobs.map(job => job.location).filter(Boolean) as string[];
    return [...new Set(locations)];
  };

  const filteredJobs = getFilteredJobs();
  const locations = getLocations();

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
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "part_time":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "contract":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "internship":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getJobTypeIcon = (type: string) => {
    switch (type) {
      case "full_time":
        return <Briefcase className="h-3 w-3 mr-1" />;
      case "part_time":
        return <Clock className="h-3 w-3 mr-1" />;
      case "contract":
        return <Badge className="h-3 w-3 mr-1" />;
      case "internship":
        return <GraduationCap className="h-3 w-3 mr-1" />;
      default:
        return <Briefcase className="h-3 w-3 mr-1" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("am-ET", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-brand-blue" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 font-medium"
            >
              ስራዎችን በመጫን ላይ...
            </motion.p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>ስራዎች | ብልጽግና ፓርቲ ወጣት ክንፍ</title>
        <meta
          name="description"
          content="የብልጽግና ፓርቲ ወጣት ክንፍ የስራ ማስታወቂያዎች"
        />
      </Helmet>

      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-r from-brand-blue to-gov-dark text-white">
        <div className="container relative z-10 px-4 py-16 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              <Briefcase className="w-8 h-8 text-brand-yellow" />
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              የስራ <span className="text-brand-yellow">ማስታወቂያዎች</span>
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-white text-opacity-90">
              የብልጽግና ፓርቲ ወጣት ክንፍ የስራ እድሎች እና ሙያዊ ማሻሻያ ዕድሎች
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mt-8">
              <div className="flex flex-col p-2 bg-white rounded-lg shadow-xl md:flex-row md:p-2 gap-3">
                <div className="relative flex-1">
                  <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="ፈልግ... (ኮምፒውተር ሳይንስ, ፕሮጀክት ማናጀር, ...)"
                    className="pl-10 bg-white border-0 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex-shrink-0 min-w-[180px]">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="h-12 bg-white text-gray-800">
                      <SelectValue placeholder="ሁሉም አይነት ስራዎች" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ሁሉም አይነት ስራዎች</SelectItem>
                      <SelectItem value="full_time">ሙሉ ጊዜ</SelectItem>
                      <SelectItem value="part_time">ትርፍ ጊዜ</SelectItem>
                      <SelectItem value="contract">ኮንትራት</SelectItem>
                      <SelectItem value="internship">ልምምድ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-shrink-0 min-w-[180px]">
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-12 bg-white text-gray-800">
                      <SelectValue placeholder="ሁሉም ቦታዎች" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ሁሉም ቦታዎች</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto -mt-16 px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-brand-blue"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Briefcase className="h-6 w-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{jobs.length}</h3>
                <p className="text-gray-600">ጠቅላላ የስራ ማስታወቂያዎች</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-brand-yellow"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 mr-4">
                <Star className="h-6 w-6 text-brand-yellow" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{jobs.filter(job => job.job_type === 'full_time').length}</h3>
                <p className="text-gray-600">ሙሉ ጊዜ ስራዎች</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-green-500"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{locations.length}</h3>
                <p className="text-gray-600">የተለያዩ ቦታዎች</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Filter className="h-5 w-5 mr-2 text-brand-blue" />
            የፍለጋ ውጤቶች <span className="text-brand-blue ml-2">{filteredJobs.length}</span>
          </h2>
          
          {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative"
                  onMouseEnter={() => setHoveredCardId(job.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <span className={`mb-2 inline-flex text-xs font-medium px-3 py-1 rounded-full ${getJobTypeColorClass(job.job_type)}`}>
                            <span className="flex items-center">
                              {getJobTypeIcon(job.job_type)}
                              {getJobTypeText(job.job_type)}
                            </span>
                          </span>
                          <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{job.title}</CardTitle>
                        </div>
                        
                        {job.deadline && (
                          <div className="flex items-center">
                            <UIBadge variant={getDaysLeft(job.deadline) < 5 ? "destructive" : "outline"} className="text-xs">
                              {getDaysLeft(job.deadline) <= 0 
                                ? "ጊዜው አልፏል" 
                                : `${getDaysLeft(job.deadline)} ቀናት ቀርቷል`}
                            </UIBadge>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                        {job.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                            <span>{job.location}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <span>ተለጠፈ: {formatDate(job.created_at)}</span>
                        </div>
                      </div>
                      
                      <div className="prose max-w-none">
                        <p className="text-gray-600 line-clamp-2">{job.description}</p>
                      </div>
                      
                      {job.requirements && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-brand-blue" />
                            መስፈርቶች:
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{job.requirements}</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                      <div className="flex items-center text-sm text-brand-blue">
                        <Building className="h-4 w-4 mr-1" />
                        <span>ብልጽግና ፓርቲ ወጣት ክንፍ</span>
                      </div>
                      <Button
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="bg-brand-blue hover:bg-brand-blue/90 gap-2"
                      >
                        <span>ዝርዝር አሳይ</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              className="p-10 text-center bg-white rounded-lg shadow-md border border-gray-200"
              >
                <div className="p-4 mx-auto mb-6 bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-gray-900">ምንም ስራዎች አልተገኙም</h3>
                <p className="text-gray-600">
                {searchQuery || selectedType !== "all" || selectedLocation !== "all"
                    ? "የፍለጋ ቃልዎን ወይም የስራ አይነትዎን ይቀይሩ እና እንደገና ይሞክሩ"
                    : "በዚህ ወቅት ምንም የስራ ማስታወቂያዎች አልተለጠፉም።"}
                </p>
              </motion.div>
            )}
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ለትምህርት፣ ለሙያ፣ ለቴክኖሎጂ፣ ለተሻለ መጪ ጊዜ
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              ብልጽግና ፓርቲ ወጣት ክንፍ የሙያ እና የማሻሻያ እድሎችን ያቀርባል።
              ለበለጠ መረጃ እና ለአዳዲስ የስራ እድሎች ይከታተሉን።
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 text-lg"
            >
              የስራ እድሎችን ፈልግ
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobsPage; 