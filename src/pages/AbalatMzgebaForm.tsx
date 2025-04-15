
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

const abalatMzgebaFormSchema = z.object({
  fullName: z.string().min(2, { message: "ሙሉ ስም መጻፍ አለብዎት" }),
  age: z.string().refine((val) => {
    const age = parseInt(val);
    return !isNaN(age) && age >= 18 && age <= 100;
  }, { message: "እድሜዎ ከ18 አመት በላይ መሆን አለበት" }),
  phone: z.string().min(10, { message: "የሞባይል ቁጥር ትክክለኛ አይደለም" }),
  email: z.string().email({ message: "የኢሜይል አድራሻ ትክክለኛ አይደለም" }).optional(),
  woredaKebele: z.string().min(2, { message: "ወረዳ እና ቀበሌ መጻፍ አለብዎት" }),
  reason: z.string().min(10, { message: "ለምን አባል መሆን እንደሚፈልጉ ይግለጹ" }),
  photo: z.any().optional(),
});

type AbalatMzgebaFormValues = z.infer<typeof abalatMzgebaFormSchema>;

const AbalatMzgebaForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<AbalatMzgebaFormValues>({
    resolver: zodResolver(abalatMzgebaFormSchema),
    defaultValues: {
      fullName: "",
      age: "",
      phone: "",
      email: "",
      woredaKebele: "",
      reason: "",
    },
  });

  const onSubmit = async (data: AbalatMzgebaFormValues) => {
    setIsSubmitting(true);
    
    try {
      // We'll integrate with Supabase later
      console.log("Form submitted:", data);
      
      toast({
        title: "ምዝገባው ተልኳል",
        description: "የአባልነት ምዝገባዎ በተሳካ ሁኔታ ተልኳል። በቅርቡ እናገኝዎታለን።",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "ምዝገባው አልተላከም",
        description: "የአባልነት ምዝገባዎን በመላክ ላይ ችግር ተፈጥሯል። እባክዎ ዳግም ይሞክሩ።",
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
              <CardTitle className="text-2xl font-bold">የአባላት ምዝገባ ቅጽ</CardTitle>
              <CardDescription className="text-white/80">
                የብልጽግና ፓርቲ ሴቶች ክንፍ አባል ለመሆን ይህንን ቅጽ ይሙሉ
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
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
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>እድሜ</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="እድሜዎን ያስገቡ" {...field} />
                        </FormControl>
                        <FormDescription>
                          እድሜዎ ቢያንስ 18 አመት መሆን አለበት
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="woredaKebele"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ወረዳ/ቀበሌ</FormLabel>
                        <FormControl>
                          <Input placeholder="ለምሳሌ፡ ወረዳ 03 ቀበሌ 01" {...field} />
                        </FormControl>
                        <FormDescription>
                          የሚኖሩበትን ወረዳ እና ቀበሌ ያስገቡ
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>የአባልነት ምክንያት</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="ለምን አባል መሆን እንደሚፈልጉ ይግለጹ..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          ለምን የብልጽግና ፓርቲ አባል መሆን እንደሚፈልጉ ያብራሩ
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ፎቶ</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
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
                          የሁለት ወር ውስጥ የተነሳ 3x4 ወይም ፓስፖርት መጠን ያለው ፎቶ (ከ2MB ያነሰ መሆን አለበት)
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
                    {isSubmitting ? "እየተላከ ነው..." : "ምዝገባውን አጠናቅ"}
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

export default AbalatMzgebaForm;
