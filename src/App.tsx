import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AbalatMzgebaForm from "./pages/AbalatMzgebaForm";
import MembershipApplicationLetter from "./pages/MembershipApplicationLetter";
import ReportForm from "./pages/ReportForm";
import ProjectsPage from "./pages/ProjectsPage";
import SleEgnaPage from "./pages/SleEgnaPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AbalatPage from "./pages/admin/AbalatPage";
import ReportPage from "./pages/admin/ReportPage";
import SettingsPage from "./pages/admin/SettingsPage";
import AllAchievements from "./pages/AllAchievements";
import LibraryPage from "./pages/LibraryPage";
import AdminLibraryPage from "./pages/admin/LibraryPage";
import AdminJobsPage from './pages/admin/JobsPage';
import JobsPage from './pages/JobsPage';
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/abalat-mzgeba" element={<MembershipApplicationLetter />} />
          <Route path="/abalat-mzgeba/form" element={<AbalatMzgebaForm />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/sle-egna" element={<SleEgnaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/achievements" element={<AllAchievements />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/jobs" element={<JobsPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/abalat" element={<AbalatPage />} />
          <Route path="/admin/reports" element={<ReportPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/admin/library" element={<AdminLibraryPage />} />
            <Route path="/admin/jobs" element={<AdminJobsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
