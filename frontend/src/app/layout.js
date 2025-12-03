import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Train Delay Tracker",
  description: "Live train delay tracking system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const savedTheme = localStorage.getItem("theme");
              const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
              const effectiveTheme = savedTheme || systemTheme;
              if (effectiveTheme === "dark") {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            `,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-950`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
