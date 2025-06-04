import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AbalatSubmissions from "@/components/admin/AbalatSubmissions";
import MembershipLetters from "@/components/admin/MembershipLetters";

const AbalatPage = () => {
  const [activeTab, setActiveTab] = useState("registrations");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Membership Management</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="registrations">Registration Forms</TabsTrigger>
            <TabsTrigger value="letters">Application Letters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="registrations">
            <AbalatSubmissions searchQuery={searchQuery} activeFilter={activeFilter} />
          </TabsContent>
          
          <TabsContent value="letters">
            <MembershipLetters />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AbalatPage;
