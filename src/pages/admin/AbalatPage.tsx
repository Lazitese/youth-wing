
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AbalatSubmissions from "@/components/admin/AbalatSubmissions";
import { Button } from "@/components/ui/button";
import { Search, Download, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const AbalatPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);

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
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-0 lg:ml-64 overflow-x-hidden overflow-y-auto">
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Controls section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="በስም፣ በስልክ ቁጥር፣ ወይም በኢሜል ፈልግ..."
                  className="pl-10 pr-4 py-2 w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button variant="outline" 
                  className="text-brand-black border-gray-300 hover:bg-gray-50" 
                  onClick={handleExport}
                >
                  <Download size={18} className="mr-2" />
                  አዉርድ CSV
                </Button>
                
                <Button 
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white ml-2" 
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={18} className="mr-2" />
                  አዲስ አባል
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="mb-6 border-b border-gray-200">
              <div className="flex overflow-x-auto hide-scrollbar">
                {["all", "active", "pending", "rejected"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeFilter === filter
                        ? "border-brand-blue text-brand-blue"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {filter === "all" && "ሁሉም አባላት"}
                    {filter === "active" && "ንቁ አባላት"}
                    {filter === "pending" && "በመጠባበቅ ላይ"}
                    {filter === "rejected" && "ተቀባይነት ያላገኙ"}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Submissions Table */}
            <AbalatSubmissions 
              showAddForm={showAddForm} 
              setShowAddForm={setShowAddForm} 
              filterType={activeFilter}
              searchQuery={searchQuery}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AbalatPage;
