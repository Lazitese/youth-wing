import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Briefcase, Users, BriefcaseBusiness } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { JobsList } from "@/components/admin/JobsList";
import { JobApplications } from "@/components/admin/JobApplications";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const JobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("jobs");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "የስራ ማስታወቂያዎች አስተዳዳሪ | ብልጽግና ፓርቲ ወጣት ክንፍ";
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
        .from("admins")
        .select("*")
        .eq("email", session.user.email)
        .single();

      if (error || !userProfile) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    } catch (error) {
      console.error("Error checking session:", error);
      navigate("/admin/login");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand-blue" />
          </div>
          <p className="text-sm text-gray-500">በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        "pl-[72px] lg:pl-64" // Adjust padding to account for fixed sidebar
      )}>
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <BriefcaseBusiness className="h-6 w-6 text-brand-blue mr-3" />
                <h1 className="text-xl font-semibold text-gray-900">የስራ ማስታወቂያዎች</h1>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <p className="text-gray-500">የስራ ማስታወቂያዎችን እና ማመልከቻዎችን ያስተዳድሩ</p>
            </div>
            
            <Tabs 
              defaultValue="jobs" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="mb-6 grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="jobs" 
                  className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-brand-blue data-[state=active]:shadow-sm"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>ስራዎች</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="applications" 
                  className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-brand-blue data-[state=active]:shadow-sm"
                >
                  <Users className="h-4 w-4" />
                  <span>አመልካቾች</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="jobs" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <JobsList />
              </TabsContent>
              
              <TabsContent value="applications" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <JobApplications />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage; 