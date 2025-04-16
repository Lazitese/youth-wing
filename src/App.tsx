
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QretaForm from "./pages/QretaForm";
import AbalatMzgebaForm from "./pages/AbalatMzgebaForm";
import ReportForm from "./pages/ReportForm";
import AllPrograms from "./pages/AllPrograms";
import AllNews from "./pages/AllNews";
import AllAchievements from "./pages/AllAchievements";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Setup from "./pages/admin/Setup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/qreta" element={<QretaForm />} />
          <Route path="/abalat-mzgeba" element={<AbalatMzgebaForm />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/programs" element={<AllPrograms />} />
          <Route path="/news" element={<AllNews />} />
          <Route path="/achievements" element={<AllAchievements />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/setup" element={<Setup />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
