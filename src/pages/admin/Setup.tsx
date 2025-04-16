
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const setupFormSchema = z.object({
  email: z.string().email({ message: "ኢሜይል አድራሻው ትክክለኛ አይደለም" }),
  password: z.string().min(6, { message: "የይለፍ ቃሉ ቢያንስ 6 ፊደላት ሊኖረው ይገባል" }),
  confirmPassword: z.string().min(6, { message: "የይለፍ ቃሉ ቢያንስ 6 ፊደላት ሊኖረው ይገባል" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "የይለፍ ቃሎቹ አይመሳሰሉም",
  path: ["confirmPassword"],
});

type SetupFormValues = z.infer<typeof setupFormSchema>;

const Setup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupFormSchema),
    defaultValues: {
      email: "admin@womenswing.org",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SetupFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Check if this email is in the admins table
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', data.email)
        .single();
      
      if (adminError) {
        if (adminError.code === 'PGRST116') {
          throw new Error(`Email ${data.email} is not authorized as an admin`);
        }
        throw adminError;
      }

      // Create the user account
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "ተሳክቷል",
        description: "የአስተዳዳሪ መለያ በተሳካ ሁኔታ ተፈጥሯል",
      });
      
      navigate('/admin/login');
    } catch (error: any) {
      console.error("Setup error:", error);
      toast({
        title: "ስህተት",
        description: error.message || "መለያ መፍጠር አልተሳካም",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <Card className="shadow-lg animate-fade-in-up">
          <CardHeader className="bg-gov-medium text-white">
            <CardTitle className="text-2xl font-bold">አስተዳዳሪ ማዋቀር</CardTitle>
            <CardDescription className="text-white/80">
              የአስተዳዳሪ መለያ ይፍጠሩ
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>የአስተዳዳሪ ኢሜይል</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ኢሜይል ያስገቡ" 
                          {...field} 
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        ይህ ኢሜይል በመረጃ ጎታው ውስጥ ከተመዘገበው መመሳሰል አለበት
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>የይለፍ ቃል</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="የይለፍ ቃል ያስገቡ" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>የይለፍ ቃል ማረጋገጫ</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="የይለፍ ቃል እንደገና ያስገቡ" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-gov-accent hover:bg-gov-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "በመፍጠር ላይ..." : "አስተዳዳሪ ፍጠር"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
