
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const reportFormSchema = z.object({
  full_name: z.string().min(2, { message: "ሙሉ ስም መጻፍ አለብዎት" }),
  phone: z.string().min(10, { message: "የሞባይል ቁጥር ትክክለኛ አይደለም" }),
  email: z.string().email({ message: "የኢሜይል አድራሻ ትክክለኛ አይደለም" }).optional().or(z.literal('')),
  report_type: z.string().min(1, { message: "የሪፖርት ዓይነት መምረጥ አለብዎት" }),
  woreda: z.string().min(1, { message: "ወረዳ ማስገባት አለብዎት" }),
  kebele: z.string().min(1, { message: "ቀበሌ ማስገባት አለብዎት" }),
  report_details: z.string().min(10, { message: "ቢያንስ 10 ፊደላት መጻፍ አለብዎት" }),
  attachment: z.any().optional(),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

const ReportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      report_type: "",
      woreda: "",
      kebele: "",
      report_details: "",
    },
  });

  const onSubmit = async (data: ReportFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Insert into Supabase
      const { error } = await supabase
        .from('report_submissions')
        .insert({
          full_name: data.full_name,
          phone: data.phone,
          email: data.email || null,
          woreda: data.woreda,
          kebele: data.kebele,
          report_type: data.report_type,
          report_details: data.report_details,
        });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "ሪፖርትዎ ተልኳል",
        description: "ሪፖርትዎ በተሳካ ሁኔታ ተልኳል። እናመሰግናለን!",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "ሪፖርቱ አልተላከም",
        description: "ሪፖርትዎን በመላክ ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ።",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-20 bg-gray-50">
        <div className="container-gov max-w-3xl mx-auto">
          <Card className="shadow-lg animate-fade-in-up">
            <CardHeader className="bg-gov-medium text-white">
              <CardTitle className="text-2xl font-bold">የሪፖርት ማቅረቢያ ቅጽ</CardTitle>
              <CardDescription className="text-white/80">
                ለአስፈላጊ ጉዳዮች ሪፖርት ለማድረግ ይህንን ቅጽ ይሙሉ
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ሙሉ ስም</FormLabel>
                          <FormControl>
                            <Input placeholder="ሙሉ ስምዎን ያስገቡ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ስልክ ቁጥር</FormLabel>
                          <FormControl>
                            <Input placeholder="የሞባይል ስልክ ቁጥርዎን ያስገቡ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ኢሜይል (አማራጭ)</FormLabel>
                        <FormControl>
                          <Input placeholder="ኢሜይል አድራሻዎን ያስገቡ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="report_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>የሪፖርት ዓይነት</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="የሪፖርት ዓይነት ይምረጡ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="incident">አደጋ</SelectItem>
                            <SelectItem value="security">የደህንነት ጉዳይ</SelectItem>
                            <SelectItem value="health">የጤና ችግር</SelectItem>
                            <SelectItem value="infrastructure">የመሰረተ ልማት ችግር</SelectItem>
                            <SelectItem value="other">ሌላ</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          የሪፖርትዎን ዓይነት ይምረጡ
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="woreda"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ወረዳ</FormLabel>
                          <FormControl>
                            <Input placeholder="ለምሳሌ፡ ወረዳ 04" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="kebele"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ቀበሌ</FormLabel>
                          <FormControl>
                            <Input placeholder="ለምሳሌ፡ ቀበሌ 02" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="report_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ዝርዝር መግለጫ</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="ሪፖርትዎን በዝርዝር ይጻፉ..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          ሁኔታውን በዝርዝር ይግለፁ
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="attachment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>አባሪ ፋይል (አማራጭ)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              field.onChange(e.target.files?.[0] || null);
                            }}
                            className="file:mr-4 file:py-2 file:px-4
                                      file:rounded-md file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-gov-light file:text-gov-dark
                                      hover:file:bg-gov-light/80"
                          />
                        </FormControl>
                        <FormDescription>
                          ፎቶ ወይም ሰነድ ካለዎት ያስገቡ (ከ5MB ያነሰ መሆን አለበት)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-gov-accent hover:bg-gov-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "እየተላከ ነው..." : "ሪፖርቱን ላክ"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportForm;
