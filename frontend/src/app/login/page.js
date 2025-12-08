"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { authAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const login = async () => {
    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    try {
      const res = await authAPI.login(form);

      toast.success("Logged in successfully!");
      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");
    } catch (err) {
      const serverMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Login failed";

      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative font-sans flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center relative z-10 px-4">
        <HeroHighlight className="w-full h-full flex items-center justify-center p-0 bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="w-full max-w-md bg-card/80 border-border backdrop-blur-xl shadow-2xl relative z-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">Welcome Back</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Enter your email"
                    className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-cyan-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Password</label>
                  <Input
                    type="password"
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Enter password"
                    className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-cyan-500/50"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  onClick={login}
                  disabled={loading}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  New user?
                  <Link href="/signup" className="text-cyan-400 ml-1 hover:underline">Create account</Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </HeroHighlight>
      </div>

      <BackgroundBeams className="opacity-30" />
    </div>
  );
}
