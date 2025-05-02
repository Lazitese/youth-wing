
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardStats from "@/components/admin/DashboardStats";
import { Session } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.title = "አስተዳዳሪ ዳሽቦርድ";
    
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      // Verify admin status
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', session.user.email)
        .single();
      
      if (error || !data) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate('/admin/login');
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
          <p className="mt-4 text-brand-black">በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white flex">
      <AdminSidebar />
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        "lg:ml-64" // Default sidebar width
      )}>
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header section */}
            <div className="mb-8 mt-12 lg:mt-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-brand-black tracking-tight">አስተዳዳሪ ዳሽቦርድ</h1>
                  <p className="text-brand-black/70 mt-1.5">እንኳን ደህና መጡ፣ እዚህ ገጽ ላይ ሁሉንም ስታቲስቲክስ መመልከት ይችላሉ።</p>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="mb-10">
              <DashboardStats />
            </div>
            
            {/* Additional dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-brand-white rounded-xl shadow-sm border border-brand-blue/10 p-6 hover:shadow-md transition-all duration-300">
                <h2 className="text-lg font-semibold text-brand-black mb-4 flex items-center">
                  <span className="w-1.5 h-5 bg-brand-blue rounded-full mr-2.5 inline-block"></span>
                  የቅርብ ጊዜ እንቅስቃሴዎች
                </h2>
                <div className="text-brand-black/70 pt-2">
                  <p>ቅርብ ጊዜ እንቅስቃሴዎች የሉም።</p>
                </div>
              </div>
              
              <div className="bg-brand-white rounded-xl shadow-sm border border-brand-blue/10 p-6 hover:shadow-md transition-all duration-300">
                <h2 className="text-lg font-semibold text-brand-black mb-4 flex items-center">
                  <span className="w-1.5 h-5 bg-brand-yellow rounded-full mr-2.5 inline-block"></span>
                  ዛሬ እድሳት ያላቸው ነገሮች
                </h2>
                <div className="text-brand-black/70 pt-2">
                  <p>ዛሬ እድሳት የሚፈልጉ ነገሮች የሉም።</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
