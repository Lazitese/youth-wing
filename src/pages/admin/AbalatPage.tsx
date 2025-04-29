import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AbalatSubmissions from "@/components/admin/AbalatSubmissions";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Session } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Download, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const AbalatPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddAbalatForm, setShowAddAbalatForm] = useState(false);
  
  // Handle adding new content
  const handleAddNew = () => {
    setShowAddAbalatForm(true);
  };
  
  useEffect(() => {
    document.title = "የአባላት ምዝገባዎች | አስተዳዳሪ";
    
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gov-accent mx-auto"></div>
          <p className="mt-4 text-gov-dark">በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        "lg:ml-64" // Default sidebar width
      )}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header section */}
            <div className="mb-8 mt-12 lg:mt-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">የአባላት ምዝገባዎች</h1>
                  <p className="text-gray-500 mt-1">ሁሉም የአባላት ምዝገባዎች እዚህ ይገኛሉ።</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative hidden md:flex">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      type="text" 
                      placeholder="ፈልግ..." 
                      className="pl-10 pr-4 py-2 w-[200px] rounded-lg border border-gray-200 focus:border-gov-accent"
                    />
                  </div>
                  <Button variant="outline" className="gap-2 border-gray-200">
                    <Download size={16} />
                    <span>ወርድ በCSV</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">የአባላት ምዝገባዎች</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex md:hidden w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        type="text" 
                        placeholder="ፈልግ..." 
                        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-gov-accent"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 border-gray-200">
                      <Filter size={14} />
                      <span>አጣራ</span>
                    </Button>
                    <Button 
                      className="gap-2 bg-gov-accent hover:bg-gov-accent/90"
                      onClick={handleAddNew}
                    >
                      <Plus size={14} />
                      <span>አዲስ ጨምር</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Abalat Content */}
              <div className="p-0">
                <AbalatSubmissions 
                  showAddForm={showAddAbalatForm} 
                  setShowAddForm={setShowAddAbalatForm} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AbalatPage; 