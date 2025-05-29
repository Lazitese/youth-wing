import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "ወጣ ተሳክቷል",
        description: "በተሳካ ሁኔታ ወጥተዋል",
      });
      navigate('/admin/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "ወጣ አልተሳካም",
        description: "ወጣ ላይ ችግር ተፈጥሯል",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-gov-dark text-white shadow-md">
      <div className="container-gov max-w-7xl mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/prosperity-party-logo.svg" 
              alt="Prosperity Party Logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-bold">
              <span className="text-gov-gold">ብልጽግና ፓርቲ</span> ወጣት ክንፍ
            </h1>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white/80"
              onClick={() => navigate('/')}
            >
              ዋና ገጽ
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white/80 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              ውጣ
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white/80"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white/80 w-full justify-start"
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
            >
              ዋና ገጽ
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-white/80 w-full justify-start flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              ውጣ
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
