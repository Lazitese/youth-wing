import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import AdminSidebar from "./AdminSidebar";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
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
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 