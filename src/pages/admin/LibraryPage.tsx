import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import LibraryDocuments from "@/components/admin/LibraryDocuments";
import { Session } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

const LibraryPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.title = "ቤተመጻሕፍት አስተዳዳሪ | ብልጽግና ፓርቲ ወጣት ክንፍ";
    
    const checkSession = async () => {
      // First, get the current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      // Verify admin status
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', session.user.email)
        .single();
      
      if (adminError || !adminData) {
        // Not an admin, sign out
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (!session) {
          navigate('/admin/login');
        } else {
          // Verify admin status on auth change
          const { data: adminData, error: adminError } = await supabase
            .from('admins')
            .select('*')
            .eq('email', session.user.email)
            .single();
          
          if (adminError || !adminData) {
            await supabase.auth.signOut();
            navigate('/admin/login');
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
          <p className="mt-4 text-brand-black">በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        "pl-[72px] lg:pl-64" // Adjust padding to account for fixed sidebar
      )}>
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header section */}
            <div className="mb-8 mt-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ቤተመጻሕፍት</h1>
                  <p className="text-gray-500 mt-1">የመጽሐፍት እና ሰነዶች ስብስብ</p>
                </div>
              </div>
            </div>
            
            <LibraryDocuments />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LibraryPage; 