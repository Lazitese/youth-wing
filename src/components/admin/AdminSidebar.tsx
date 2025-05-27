import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight,
  Home,
  Users, 
  FileText,
  Settings,
  LogOut,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  collapsed?: boolean;
};

const NavItem = ({ icon, label, onClick, active, collapsed }: NavItemProps) => (
  <button
    onClick={onClick}
          className={cn(
      "flex items-center gap-3 w-full p-3 rounded-lg transition-colors",
            active 
        ? "bg-gov-blue/10 text-gov-blue font-medium"
        : "text-gray-600 hover:bg-gray-100"
          )}
        >
            {icon}
    {!collapsed && <span>{label}</span>}
  </button>
);

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState) {
      setCollapsed(JSON.parse(savedState));
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      navigate("/admin/login");
      toast({
        title: "ወጥተዋል",
        description: "በተሳካ ሁኔታ ወጥተዋል",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        variant: "destructive",
        title: "ስህተት",
        description: "መውጣት አልተቻለም። እባክዎ ዳግም ይሞክሩ።",
      });
    }
  };

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("adminSidebarCollapsed", JSON.stringify(newState));
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  const sidebarItems = [
    {
      icon: <Home size={collapsed ? 22 : 20} />,
      label: "ዳሽቦርድ",
      onClick: () => navigate("/admin"),
      active: isActive("/admin"),
    },
    {
      icon: <Users size={collapsed ? 22 : 20} />,
      label: "አባላት",
      onClick: () => navigate("/admin/abalat"),
      active: isActive("/admin/abalat"),
    },
    {
      icon: <FileText size={collapsed ? 22 : 20} />,
      label: "ሪፖርቶች",
      onClick: () => navigate("/admin/reports"),
      active: isActive("/admin/reports"),
    },
    {
      icon: <BookOpen size={collapsed ? 22 : 20} />,
      label: "ቤተመጻሕፍት",
      onClick: () => navigate("/admin/library"),
      active: isActive("/admin/library"),
    },
    {
      icon: <Briefcase size={collapsed ? 22 : 20} />,
      label: "ስራዎች",
      onClick: () => navigate("/admin/jobs"),
      active: isActive("/admin/jobs"),
    },
    {
      icon: <Settings size={collapsed ? 22 : 20} />,
      label: "ቅንብሮች",
      onClick: () => navigate("/admin/settings"),
      active: isActive("/admin/settings"),
    },
  ];
  
  return (
      <aside
        className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="font-semibold text-lg text-gov-blue">
              አስተዳዳሪ
            </div>
            )}
            <Button
              variant="ghost"
              size="sm"
            onClick={toggleCollapse}
            className="hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
            </Button>
        </div>
        </div>
        
      <nav className="flex-1 p-2 space-y-1">
            {sidebarItems.map((item, index) => (
          <NavItem key={index} {...item} collapsed={collapsed} />
            ))}
          </nav>
          
      <div className="p-2 border-t border-gray-200">
            <NavItem
              icon={<LogOut size={collapsed ? 22 : 20} />}
              label="ውጣ"
              onClick={handleLogout}
              collapsed={collapsed}
            />
        </div>
      </aside>
  );
};

export default AdminSidebar; 