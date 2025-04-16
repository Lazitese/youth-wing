
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginFormSchema = z.object({
  email: z.string().email({ message: "ኢሜይል አድራሻው ትክክለኛ አይደለም" }),
  password: z.string().min(6, { message: "የይለፍ ቃሉ ቢያንስ 6 ፊደላት ሊኖረው ይገባል" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        throw error;
      }
      
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', data.email)
        .single();
      
      if (adminError || !adminData) {
        await supabase.auth.signOut();
        throw new Error('You are not authorized as an admin');
      }
      
      toast({
        title: "ግባ ተሳክቷል",
        description: "ወደ አስተዳዳሪ ዳሽቦርድ እንኳን በደህና መጡ!",
      });
      
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "ግባ አልተሳካም",
        description: error.message || "ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም",
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
            <CardTitle className="text-2xl font-bold">አስተዳዳሪ ግባ</CardTitle>
            <CardDescription className="text-white/80">
              ወደ አስተዳዳሪ ዳሽቦርድ ለመግባት የመለያ መረጃዎን ያስገቡ
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
                      <FormLabel>ኢሜይል</FormLabel>
                      <FormControl>
                        <Input placeholder="ኢሜይል አድራሻዎን ያስገቡ" {...field} />
                      </FormControl>
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
                          placeholder="የይለፍ ቃልዎን ያስገቡ" 
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
                  {isSubmitting ? "እየገባ ነው..." : "ግባ"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
