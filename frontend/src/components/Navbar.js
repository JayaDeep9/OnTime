"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { LuAlarmClockCheck } from "react-icons/lu";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Search", href: "/search" },
    { name: "Saved Routes", href: "/saved-routes" },
    { name: "Live", href: "/live-station" },
    { name: "History", href: "/history" },
  ];

  return (
    <>
      <nav className="fixed top-6 inset-x-0 mx-auto max-w-4xl z-50 px-4">
        <div className="relative rounded-full border border-border bg-card/90 backdrop-blur-xl shadow-lg px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full group-hover:scale-110 transition-transform shadow-md">
              <LuAlarmClockCheck />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              OnTime
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {isLoggedIn &&
              navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    pathname === item.href
                      ? "text-cyan-500 bg-cyan-500/10"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="hidden md:flex gap-2">
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="rounded-full text-red-500 hover:bg-red-500/10"
                >
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button size="sm" className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed top-24 inset-x-4 max-w-lg mx-auto z-40 p-4 rounded-3xl border border-border bg-card backdrop-blur-xl shadow-2xl flex flex-col gap-2 animate-in slide-in-from-top-4 fade-in-0 duration-200 md:hidden">
          {isLoggedIn && navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted transition-colors"
            >
              {item.name}
            </Link>
          ))}

          <div className="h-px bg-border mx-2 my-2" />

          {isLoggedIn ? (
            <button onClick={() => { logout(); setMobileOpen(false); }} className="px-4 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-500/10 text-left transition-colors">
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center transition-colors">
              Login
            </Link>
          )}
        </div>
      )}
    </>
  );
}


