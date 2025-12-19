import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// import { FcGoogle } from "react-icons/fc"; // Google logo
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import GoogleOauthButton from "@/components/auth/google-oauth-button";
import { useMutation } from "@tanstack/react-query";
import { registerMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { motion, Variants } from "framer-motion";

/* Animation Variants */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({ mutationFn: registerMutationFn });

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z.string().trim().email("Invalid email address").min(1, { message: "Email is required" }),
    password: z.string().trim().min(1, { message: "Password is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    mutate(values, {
      onSuccess: () => navigate("/"),
      onError: (error) =>
        toast({ title: "Error", description: error.message, variant: "destructive" }),
    });
  };

  return (
    <motion.div
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="flex w-full max-w-sm flex-col gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <Logo />
           Work Flow.
        </Link>

        {/* Card */}
        <motion.div variants={item} className="flex flex-col gap-6 w-full">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Create an account</CardTitle>
              <CardDescription>Signup with your Email or Google account</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <motion.div variants={container} className="grid gap-6">
                    {/* Google Button */}
                    <motion.div variants={item} className="flex flex-col gap-4">
                      
                       <GoogleOauthButton label="Signup" />
                      
                    </motion.div>

 

                    {/* Divider */}
                    <motion.div variants={item} className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    
                      <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </motion.div>

                    {/* Input Fields */}
                    <motion.div variants={item} className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#f1f7feb5] text-sm">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jon H" className="!h-[48px]" {...field} />
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
                            <FormLabel className="dark:text-[#f1f7feb5] text-sm">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="name@example.com" className="!h-[48px]" {...field} />
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
                            <FormLabel className="dark:text-[#f1f7feb5] text-sm">Password</FormLabel>
                            <FormControl>
                              <Input type="password" 
                              placeholder="*******"
                              className="!h-[48px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={item}>
                      <Button type="submit" disabled={isPending} className="w-full">
                        {isPending && <Loader className="animate-spin" />}
                        Sign up
                      </Button>
                    </motion.div>

                    {/* Already have account */}
                    <motion.div variants={item} className="text-center text-sm">
                      Already have an account?{" "}
                      <Link to="/" className="underline underline-offset-4">
                        Sign in
                      </Link>
                    </motion.div>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Terms */}
          <motion.div variants={item} className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
