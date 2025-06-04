import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { 
  Check, 
  X, 
  Eye,
  Search,
  Calendar,
  MapPin,
  User,
  Trash2,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface MembershipLetter {
  id: string;
  top_date: string;
  woreda_name: string;
  full_name: string;
  residence_woreda: string;
  workplace_woreda: string | null;
  signature: boolean;
  bottom_date: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

const MembershipLetters = () => {
  const { toast } = useToast();
  const [letters, setLetters] = useState<MembershipLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<MembershipLetter | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [letterToDelete, setLetterToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLetters = async () => {
    try {
      const { data, error } = await supabase
        .from('membership_letters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLetters(data || []);
    } catch (error) {
      console.error('Error fetching letters:', error);
      toast({
        title: "Error",
        description: "Failed to fetch membership letters",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  const updateStatus = async (id: string, status: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('membership_letters')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setLetters(letters.map(letter => 
        letter.id === id ? { ...letter, status } : letter
      ));

      toast({
        title: "Success",
        description: `Application ${status === 'accepted' ? 'accepted' : 'rejected'} successfully`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const filteredLetters = letters.filter(letter =>
    letter.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.woreda_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.residence_woreda.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rejected</Badge>;
      default:
        return null;
    }
  };

  const handleDeleteClick = (id: string) => {
    setLetterToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteApplication = async () => {
    if (!letterToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('membership_letters')
        .delete()
        .eq('id', letterToDelete);

      if (error) throw error;

      // Update the local state to remove the deleted letter
      setLetters(letters.filter(letter => letter.id !== letterToDelete));
      
      toast({
        title: "Deleted",
        description: "Application letter has been deleted successfully",
      });
      
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting application letter:', error);
      toast({
        title: "Error",
        description: "Failed to delete application letter",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setLetterToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Woreda</TableHead>
              <TableHead>Residence Woreda</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLetters.map((letter) => (
              <TableRow key={letter.id}>
                <TableCell>{letter.full_name}</TableCell>
                <TableCell>{letter.woreda_name}</TableCell>
                <TableCell>{letter.residence_woreda}</TableCell>
                <TableCell>{format(new Date(letter.created_at), 'MMM d, yyyy')}</TableCell>
                <TableCell>{getStatusBadge(letter.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedLetter(letter);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {letter.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateStatus(letter.id, 'accepted')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateStatus(letter.id, 'rejected')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(letter.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Full details of the membership application letter
            </DialogDescription>
          </DialogHeader>
          {selectedLetter && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Full Name:</span>
                  </div>
                  <p>{selectedLetter.full_name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Woreda:</span>
                  </div>
                  <p>{selectedLetter.woreda_name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Residence Woreda:</span>
                  </div>
                  <p>{selectedLetter.residence_woreda}</p>
                </div>
                {selectedLetter.workplace_woreda && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Workplace Woreda:</span>
                    </div>
                    <p>{selectedLetter.workplace_woreda}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Top Date:</span>
                  </div>
                  <p>{format(new Date(selectedLetter.top_date), 'MMM d, yyyy')}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Bottom Date:</span>
                  </div>
                  <p>{format(new Date(selectedLetter.bottom_date), 'MMM d, yyyy')}</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Signature:</span>
                  {selectedLetter.signature ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete Application Letter
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application letter? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                deleteApplication();
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MembershipLetters; 