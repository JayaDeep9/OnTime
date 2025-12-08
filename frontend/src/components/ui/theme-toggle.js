"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/Theme";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            className="relative h-10 w-10 rounded-full flex items-center justify-center bg-transparent border border-white/10 hover:bg-white/5 transition-colors overflow-hidden"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 1 : 0,
                    rotate: isDark ? 0 : 90,
                    opacity: isDark ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute"
            >
                <Moon className="h-5 w-5 text-cyan-400" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 0 : 1,
                    rotate: isDark ? -90 : 0,
                    opacity: isDark ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute"
            >
                <Sun className="h-5 w-5 text-yellow-400" />
            </motion.div>
        </button>
    );
}
