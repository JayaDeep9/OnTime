"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sun, Moon } from "lucide-react"; // icons (you already installed lucide-react)

export default function Navbar() {
  const router = useRouter();

  const [theme, setTheme] = useState("dark");

  // Load stored theme from localStorage on first mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) {
        setTheme(saved);
        document.documentElement.classList.toggle("dark", saved === "dark");
      }
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0";
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow dark:shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-black dark:text-white">

        {/* LEFT - LOGO */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          🚆 Train Delay Tracker
        </Link>

        {/* RIGHT - MENUS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <Link href="/dashboard" className="hover:text-blue-400 dark:hover:text-blue-400">
            Dashboard
          </Link>
          
          <Link href="/search" className="hover:text-blue-400 dark:hover:text-blue-400">
            Search
          </Link>

          <Link href="/saved-routes" className="hover:text-blue-400 dark:hover:text-blue-400">
            Saved Routes
          </Link>

          <Link href="/history" className="hover:text-blue-400 dark:hover:text-blue-400">
            History
          </Link>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
