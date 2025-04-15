
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const reportFormSchema = z.object({
  reportType: z.string().min(1, { message: "የሪፖርት ዓይነት መምረጥ አለብዎት" }),
  description: z.string().min(10, { message: "ቢያንስ 10 ፊደላት መጻፍ አለብዎት" }),
  location: z.string().min(1, { message: "አካባቢ ማስገባት አለብዎት" }),
  attachment: z.any().optional(),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

const ReportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reportType: "",
      description: "",
      location: "",
    },
  });

  const onSubmit = async (data: ReportFormValues) => {
    setIsSubmitting(true);
    
    try {
      // We'll integrate with Supabase later
      console.log("Form submitted:", data);
      
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
                  <FormField
                    control={form.control}
                    name="reportType"
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
                  
                  <FormField
                    control={form.control}
                    name="description"
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
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>አካባቢ</FormLabel>
                        <FormControl>
                          <Input placeholder="ለምሳሌ፡ ወረዳ 04 ከቀበሌ 02 አጠገብ" {...field} />
                        </FormControl>
                        <FormDescription>
                          ሪፖርት የሚደረገው ጉዳይ የተከሰተበት ቦታ
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
