import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex relative overflow-x-hidden">
      <AdminSidebar />
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out relative",
        "pl-[72px] lg:pl-64" // Adjust padding to account for fixed sidebar
      )}>
        <div className="p-4 lg:p-5 pt-0 lg:pt-0 relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 