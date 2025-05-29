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
  Menu,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

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
      "flex items-center gap-3 w-full py-3 px-4 rounded-lg transition-all duration-200 relative group",
      active 
        ? "text-brand-blue font-medium"
        : "text-gray-600 hover:text-brand-blue"
    )}
  >
    {/* Active indicator */}
    {active && (
      <motion.div 
        className="absolute left-0 top-1/2 w-1 h-8 -translate-y-1/2 bg-brand-blue rounded-r-full"
        layoutId="activeIndicator"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    
    {/* Icon with background */}
    <div className={cn(
      "flex items-center justify-center rounded-full transition-all duration-200",
      active ? "text-brand-blue" : "text-gray-500 group-hover:text-brand-blue"
    )}>
      {icon}
    </div>
    
    {/* Label with transition */}
    {!collapsed && (
      <span className="truncate transition-all duration-200">{label}</span>
    )}
    
    {/* Background highlight */}
    <div className={cn(
      "absolute inset-0 rounded-lg -z-10 transition-all duration-200",
      active ? "bg-brand-blue/10" : "bg-transparent group-hover:bg-gray-100/70"
    )} />
  </button>
);

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState) {
      setCollapsed(JSON.parse(savedState));
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed]);
  
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
      onClick: () => navigate("/admin/dashboard"),
      active: isActive("/admin/dashboard"),
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
    <motion.aside
      initial={isMobile ? { x: -80 } : { x: 0 }}
      animate={isMobile ? { x: 0 } : { x: 0 }}
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 fixed h-screen z-50 shadow-sm",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-brand-blue/5 to-transparent">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="font-bold text-lg text-brand-blue flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-brand-blue text-white flex items-center justify-center text-xs font-bold">YW</div>
              አስተዳዳሪ
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="rounded-full hover:bg-brand-blue/10 hover:text-brand-blue p-2 h-auto transition-colors"
          >
            {collapsed ? (
              <Menu size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </Button>
        </div>
      </div>
      
      <div className="px-2 py-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="space-y-1">
          {sidebarItems.map((item, index) => (
            <NavItem key={index} {...item} collapsed={collapsed} />
          ))}
        </div>
      </div>
      
      <div className="p-3 mt-auto border-t border-gray-200 bg-gray-50/80">
        <NavItem
          icon={<LogOut size={collapsed ? 22 : 20} className="text-red-500" />}
          label="ውጣ"
          onClick={handleLogout}
          collapsed={collapsed}
        />
      </div>
    </motion.aside>
  );
};

export default AdminSidebar; 