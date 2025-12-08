import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/Theme";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Train Delay Tracker",
  description: "Track trains with real-time updates",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <ThemeProvider>
          <Toaster position="top-right" />
          <div className="pt-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}