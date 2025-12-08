"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    theme: "dark",
    setTheme: () => {},
    toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "dark";
        }
        return "dark";
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        root.classList.remove("light", "dark");
        root.classList.add(theme);

        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    if (!mounted) return null; 

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export { ThemeContext, ThemeProvider, useTheme };
