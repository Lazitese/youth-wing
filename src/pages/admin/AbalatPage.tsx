import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AbalatSubmissions from "@/components/admin/AbalatSubmissions";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AbalatPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    
    checkSession();
  }, [navigate]);

  const handleExport = () => {
    console.log("Exporting data to CSV...");
    // Implement export functionality
    alert("የሁሉም አባላት መረጃ ወደ CSV ተላክዋል");
  };

  if (isLoading) {
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
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 mt-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">አባላት</h1>
                  <p className="text-gray-500 mt-1">የአባላት ምዝገባ እና አስተዳደር</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="በስም፣ በስልክ ቁጥር፣ ወይም በኢሜል ፈልግ..."
                      className="pl-10 pr-4 py-2 w-full md:w-80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" 
                    className="text-brand-black border-gray-300 hover:bg-gray-50 whitespace-nowrap" 
                    onClick={handleExport}
                  >
                    <Download size={18} className="mr-2" />
                    አዉርድ CSV
                  </Button>
                </div>
              </div>
            </div>
            
            <AbalatSubmissions searchQuery={searchQuery} activeFilter={activeFilter} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AbalatPage;
