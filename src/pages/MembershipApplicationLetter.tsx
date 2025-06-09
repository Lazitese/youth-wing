import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EthiopianDateInput } from "@/components/ui/ethiopian-date-input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

// Form validation schema
const letterFormSchema = z.object({
  topDate: z.string().min(1, { message: "ቀን ያስፈልጋል" }),
  woredaName: z.string().min(1, { message: "የወረዳ ስም ያስፈልጋል" }),
  fullName: z.string().min(2, { message: "ሙሉ ስም ያስፈልጋል" }),
  residenceWoreda: z.string().min(1, { message: "የመኖሪያ ወረዳ ያስፈልጋል" }),
  workplaceWoreda: z.string().optional(),
  signature: z.boolean().refine(val => val === true, { message: "ፊርማ ያስፈልጋል" }),
  bottomDate: z.string().min(1, { message: "ቀን ያስፈልጋል" }),
});

type LetterFormData = z.infer<typeof letterFormSchema>;

const MembershipApplicationLetter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Partial<Record<keyof LetterFormData, string>>>({});
  const [formData, setFormData] = useState<LetterFormData>({
    topDate: "",
    woredaName: "",
    fullName: "",
    residenceWoreda: "",
    workplaceWoreda: "",
    signature: false,
    bottomDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showWorkplaceInput, setShowWorkplaceInput] = useState(false);

  // Calculate form completion percentage
  useEffect(() => {
    let completedFields = 0;
    let totalRequiredFields = 6; // Count of required fields

    if (formData.topDate) completedFields++;
    if (formData.woredaName) completedFields++;
    if (formData.fullName) completedFields++;
    if (formData.residenceWoreda) completedFields++;
    if (formData.signature) completedFields++;
    if (formData.bottomDate) completedFields++;

    setCompletionPercentage(Math.round((completedFields / totalRequiredFields) * 100));
  }, [formData]);

  const handleInputChange = (field: keyof LetterFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckboxChange = (field: keyof LetterFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.checked }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDateChange = (field: keyof LetterFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form data
      letterFormSchema.parse(formData);
      setErrors({});
      
      // Save to Supabase
      const { error } = await supabase
        .from('membership_letters')
        .insert({
          top_date: formData.topDate,
          woreda_name: formData.woredaName,
          full_name: formData.fullName,
          residence_woreda: formData.residenceWoreda,
          workplace_woreda: formData.workplaceWoreda || null,
          signature: formData.signature,
          bottom_date: formData.bottomDate,
          status: 'pending'
        });

      if (error) throw error;
      
      // Show success message
      toast({
        title: "ማመልከቻው ተልኳል",
        description: "የአባልነት ማመልከቻዎ በተሳካ ሁኔታ ተልኳል። በቅርቡ እናገኝዎታለን።",
      });
      
      // Navigate to form page
      navigate("/abalat-mzgeba/form");
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof LetterFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LetterFormData] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "ስህተት ተፈጥሯል",
          description: "ማመልከቻውን መላክ አልተቻለም። እባክዎ ዳግም ይሞክሩ።",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="flex-grow py-4 md:py-12">
        <div className="container-gov max-w-4xl mx-auto px-3 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-8"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gov-primary font-ethiopic text-center">
              የአባልነት ማመልከቻ ቅጽ
            </h1>
            <p className="text-xs md:text-base text-gray-600 text-center mt-1 md:mt-2">
              ውድ አመልካች፣ የሚከተለውን ቅጽ በትክክል ይሙሉ
            </p>
            
            {/* Progress indicator */}
            <div className="mt-3 md:mt-6 mb-4 md:mb-8 px-0 md:px-0">
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium text-gray-700">ቅጽ ሙሌት</span>
                <span className="text-xs md:text-sm font-medium text-gov-accent">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2.5">
                <motion.div 
                  className="bg-gov-accent h-1.5 md:h-2.5 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="bg-white p-3 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4 md:space-y-8 font-ethiopic text-sm md:text-lg">
              {/* Header Section */}
              <div className="text-right space-y-2 md:space-y-4">
                <div className="flex justify-end items-center gap-1 md:gap-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <EthiopianDateInput
                      value={formData.topDate}
                      onChange={handleDateChange("topDate")}
                      error={errors.topDate}
                      className="w-32 md:w-48 text-right focus-visible:ring-gov-accent transition-all duration-200 text-xs md:text-base"
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-xs md:text-base text-gray-700 text-center font-medium mb-1 md:mb-4">የአቃቂ ቃሊቲ ክፍለ ከተማ ብልጽግና ፓርቲ ወጣት ክንፍ ቅርንጫፍ ጽ/ቤት</p>
                  <p className="text-xs md:text-base text-gray-700 text-center mb-2 md:mb-6">አዲስ አባል ለመሆን በፍቃድ የሚሞላ ማመልከቻ ቅጽ</p>
                </motion.div>
                <div className="flex flex-wrap items-center justify-end gap-1 md:gap-2 mb-2 md:mb-4">
                  <span className="text-xs md:text-base text-gray-700">ለአቃ/ቃ/ክ/ከ/ወረዳ</span>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Input
                      value={formData.woredaName}
                      onChange={handleInputChange("woredaName")}
                      placeholder="ወረዳ ቁጥር"
                      className="w-20 md:w-32 inline focus-visible:ring-gov-accent transition-all duration-200 text-xs md:text-base"
                      error={errors.woredaName}
                    />
                  </motion.div>
                  <span className="text-xs md:text-base text-gray-700">ወጣት ክንፍ ጽ/ቤት</span>
                </div>
              </div>

              {/* Letter Body */}
              <motion.div 
                className="space-y-3 md:space-y-6 text-justify leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-xs md:text-base font-semibold text-gov-primary">ጉዳዩ፡- አባል ለመሆን ማመልከትን ይመለከታል፡፡</p>
                
                <p className="text-xs md:text-base text-gray-700">
                  እኔ አመልካች አቶ ወ/ሮ ወ/ሪት{" "}
                  <motion.span 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block"
                  >
                    <Input
                      value={formData.fullName}
                      onChange={handleInputChange("fullName")}
                      placeholder="ሙሉ ስም"
                      className="w-32 xs:w-64 max-w-[200px] inline mx-1 md:mx-2 focus-visible:ring-gov-accent transition-all duration-200 text-xs md:text-base"
                      error={errors.fullName}
                    />
                  </motion.span>{" "}
                  የወረዳ{" "}
                  <motion.span 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block"
                  >
                    <Input
                      value={formData.residenceWoreda}
                      onChange={handleInputChange("residenceWoreda")}
                      placeholder="ወረዳ ቁጥር"
                      className="w-16 sm:w-28 md:w-32 inline mx-0.5 md:mx-2 focus-visible:ring-gov-accent transition-all duration-200 text-xs md:text-base"
                      error={errors.residenceWoreda}
                    />
                  </motion.span>{" "}
                  ነዋሪ{" "}
                  
                  {!showWorkplaceInput ? (
                    <motion.button
                      type="button"
                      onClick={() => setShowWorkplaceInput(true)}
                      className="inline-flex items-center text-[10px] md:text-sm text-gov-accent hover:text-gov-accent/80 ml-0.5 md:ml-2 hover:underline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      + የስራ ቦታ ወረዳ አክል
                    </motion.button>
                  ) : (
                    <motion.span 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="block md:inline mt-1 md:mt-0"
                    >
                      <span className="block md:inline mt-1 md:mt-0">
                        ወይም (የስራ ቦታዬ እዚህ ወረዳ ሲሆን) በወረዳ{" "}
                        <motion.span
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-block"
                        >
                          <Input
                            value={formData.workplaceWoreda}
                            onChange={handleInputChange("workplaceWoreda")}
                            placeholder="ወረዳ ቁጥር"
                            className="w-16 sm:w-28 md:w-32 inline mx-0.5 md:mx-2 focus-visible:ring-gov-accent transition-all duration-200 text-xs md:text-base"
                          />
                        </motion.span>{" "}
                        <motion.button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, workplaceWoreda: "" }));
                            setShowWorkplaceInput(false);
                          }}
                          className="inline-flex items-center text-[10px] text-red-500 hover:text-red-600 ml-0.5 md:ml-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          x
                        </motion.button>
                      </span>
                    </motion.span>
                  )}
                  
                  <span className="block mt-1 md:mt-0 md:inline">
                    ብልጽግና ፓርቲ ወጣት ክንፍ አባል ሆኜ ለመሳተፍ እና በፓርቲው ፕሮግራም እና ዓላማ እንዲሁም ራዕይ እና ተዕልኮን በመረዳት አባል ሆኜ ከፓርቲው ጋር ለመስራት በራሴ ፍቃድ ይህንን ማመልከቻ መሙላቴን እና ፓርቲው አባል አድርጎ እንዲቀበለኝ ስል እጠይቃለሁ፡፡
                  </span>
                </p>

                {/* Signature Section */}
                <motion.div 
                  className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 md:pt-12 mt-3 md:mt-8 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="space-y-3 md:space-y-5">
                    <div className="flex items-center gap-1 md:gap-3">
                      <span className="text-xs md:text-base text-gray-700 font-medium">የአመልካች ፊርማ:</span>
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id="signature-checkbox"
                          checked={formData.signature}
                          onChange={handleCheckboxChange("signature")}
                          className="sr-only"
                        />
                        <motion.label 
                          htmlFor="signature-checkbox"
                          className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-md border-2 cursor-pointer transition-all duration-200 ${
                            formData.signature 
                              ? "bg-gov-accent/10 border-gov-accent" 
                              : "bg-white border-gray-300 hover:border-gov-accent/50"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {formData.signature && <Check className="h-5 w-5 md:h-7 md:w-7 text-gov-accent" />}
                        </motion.label>
                        {errors.signature && (
                          <span className="absolute -bottom-4 md:-bottom-5 left-0 text-[10px] md:text-xs text-red-500">
                            {errors.signature}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-3">
                      <span className="text-xs md:text-base text-gray-700 font-medium">ቀን:</span>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EthiopianDateInput
                          value={formData.bottomDate}
                          onChange={handleDateChange("bottomDate")}
                          error={errors.bottomDate}
                          className="w-32 md:w-40 focus-visible:ring-gov-accent transition-all duration-200 text-xs md:text-base"
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="mt-4 md:mt-0 self-center w-full md:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="button"
                      size="lg"
                      onClick={() => navigate('/abalat-mzgeba/form')}
                      className={`w-full md:w-auto bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-[#fbbf24] text-sm md:text-lg px-3 md:px-8 py-1.5 md:py-2.5 
                                transition-all duration-200 rounded-md shadow-sm hover:shadow-md`}
                    >
                      <span className="flex items-center justify-center gap-1 md:gap-2">
                        <span className="text-xs md:text-base">ማመልከቻውን ያስገቡ</span>
                        <ChevronRight className="h-3 w-3 md:h-5 md:w-5" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MembershipApplicationLetter; 