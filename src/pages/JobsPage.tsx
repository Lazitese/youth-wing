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
import { Loader2, Search } from "lucide-react";
import { Database } from "@/types/supabase";

type Job = Database['public']['Tables']['jobs']['Row'];

export const JobsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

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
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gov-blue" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ስራዎች | ብልጽግና ፓርቲ ሴቶች ክንፍ</title>
        <meta
          name="description"
          content="የብልጽግና ፓርቲ ሴቶች ክንፍ የስራ ማስታወቂያዎች"
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">የስራ ማስታወቂያዎች</h1>
          <p className="mt-2 text-gray-600">
            የብልጽግና ፓርቲ ሴቶች ክንፍ የስራ እድሎች
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
        </div>

        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg font-medium text-gray-900">ምንም የስራ ማስታወቂያ አልተገኘም</p>
            <p className="mt-1 text-sm text-gray-500">እባክዎ ቆይተው ይሞክሩ</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{job.title}</CardTitle>
                  <CardDescription>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getJobTypeColorClass(
                        job.job_type
                      )}`}
                    >
                      {getJobTypeText(job.job_type)}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {job.description}
                  </p>
                  {job.location && (
                    <p className="mt-2 text-sm text-gray-500">📍 {job.location}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    ⏰ የመጨረሻ ቀን:{" "}
                    {new Date(job.deadline).toLocaleDateString("am-ET")}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    className="w-full"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    ዝርዝር ይመልከቱ
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default JobsPage; 