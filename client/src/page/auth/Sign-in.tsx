import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
 
import { useMutation } from "@tanstack/react-query";
import { loginMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc"; // Google logo

/* Animations */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;

    mutate(values, {
      onSuccess: (data) => {
        const user = data.user;
        const decodedUrl = returnUrl ? decodeURIComponent(returnUrl) : null;
        navigate(decodedUrl || `/workspace/${user.currentWorkspace}`);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-6 font-sans">
      <motion.div
        className="w-full max-w-sm space-y-6"
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        {/* Logo */}
        <motion.div variants={fadeUp}>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 font-semibold"
          >
            <Logo />
            Work Flow.
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div variants={fadeUp}>
          <Card className="shadow-lg border-muted/40">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl">Welcome back 👋</CardTitle>
              <CardDescription>
                Login to continue to your workspace
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Google Login Button with Logo */}
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center justify-center gap-2 w-full h-11 border-gray-300 hover:bg-gray-100"
                  >
                    <FcGoogle className="w-5 h-5" />
                    Login with Google
                  </Button>

                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t">
                    <span className="relative bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <span className="text-xs text-muted-foreground hover:underline cursor-pointer">
                            Forgot?
                          </span>
                        </div>
                        <FormControl>
                          <Input type="password" 
                            placeholder="*******"
                            className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11"
                  >
                    {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="underline">
                      Sign up
                    </Link>
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={fadeUp}
          className="text-center text-xs text-muted-foreground"
        >
          By continuing, you agree to our{" "}
          <a className="underline">Terms</a> &{" "}
          <a className="underline">Privacy Policy</a>.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignIn;
