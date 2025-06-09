import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Library,
  Briefcase
} from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      name: "ዳሽቦርድ",
      path: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "አባላት",
      path: "/admin/abalat",
      icon: Users
    },
    {
      name: "ሪፖርቶች",
      path: "/admin/reports",
      icon: FileText
    },
    {
      name: "ቤተ-መጻሕፍት",
      path: "/admin/library",
      icon: Library
    },
    {
      name: "ለስራ ፈላጊዎች",
      path: "/admin/jobs",
      icon: Briefcase
    },
    {
      name: "ቅንብሮች",
      path: "/admin/settings",
      icon: Settings
    }
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[72px] lg:w-64 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out">
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex h-16 items-center justify-center lg:justify-start px-4 border-b border-gray-200 bg-gradient-to-r from-brand-blue/5 to-transparent">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md overflow-hidden">
                <img 
                  src="/images/Logo Beltsegena.jpg" 
                  alt="Prosperity Party Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden lg:block text-xl font-bold text-brand-blue">
                አስተዳዳሪ
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    "hover:bg-gray-100",
                    isActive && "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden lg:block">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sign Out Button */}
        <div className="p-2 mb-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden lg:block">ውጣ</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar; 