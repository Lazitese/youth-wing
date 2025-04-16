
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QretaSubmissions from "@/components/admin/QretaSubmissions";
import AbalatSubmissions from "@/components/admin/AbalatSubmissions";
import ReportSubmissions from "@/components/admin/ReportSubmissions";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import { Session } from "@supabase/supabase-js";

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gov-accent mx-auto"></div>
          <p className="mt-4 text-gov-dark">በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container-gov max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gov-dark mb-8">አስተዳዳሪ ዳሽቦርድ</h1>
        
        <DashboardStats />
        
        <div className="mt-10">
          <Tabs defaultValue="qreta" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="qreta">ጥቆማዎች</TabsTrigger>
              <TabsTrigger value="abalat">የአባላት ምዝገባዎች</TabsTrigger>
              <TabsTrigger value="reports">ሪፖርቶች</TabsTrigger>
            </TabsList>
            
            <TabsContent value="qreta">
              <QretaSubmissions />
            </TabsContent>
            
            <TabsContent value="abalat">
              <AbalatSubmissions />
            </TabsContent>
            
            <TabsContent value="reports">
              <ReportSubmissions />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
