import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { 
  Check, 
  Download, 
  Eye, 
  Search, 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Briefcase 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AbalatSubmission {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  woreda: string;
  kebele: string;
  age: number;
  education_level: string;
  occupation: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

interface AbalatSubmissionsProps {
  searchQuery: string;
  activeFilter: string;
}

const AbalatSubmissions: React.FC<AbalatSubmissionsProps> = ({ searchQuery, activeFilter }) => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<AbalatSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, [activeFilter]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('abalat_mzgeba_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filter
      if (activeFilter !== 'all') {
        query = query.eq('status', activeFilter);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "ስህተት",
        description: "መረጃዎችን ማግኘት አልተቻለም",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter submissions based on search query
  const filteredSubmissions = submissions.filter(submission => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      submission.full_name?.toLowerCase().includes(searchLower) ||
      submission.email?.toLowerCase().includes(searchLower) ||
      submission.phone?.includes(searchQuery)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ሙሉ ስም
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ኢሜይል
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ስልክ ቁጥር
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ሁኔታ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                የተመዘገበበት ቀን
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.map((submission) => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{submission.full_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{submission.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{submission.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    submission.status === 'active' ? 'bg-green-100 text-green-800' :
                    submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {submission.status === 'active' ? 'ንቁ' :
                     submission.status === 'pending' ? 'በመጠባበቅ ላይ' :
                     'ተቀባይነት አላገኘም'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(submission.created_at).toLocaleDateString('am-ET')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AbalatSubmissions;
