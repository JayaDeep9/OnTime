"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import StationInput from "@/components/StationInput";
import { trainAPI, userAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import {
  Activity,
  FileText,
  Armchair,
  Search,
  MapPin,
  Navigation,
  Train,
  Utensils,
  Zap
} from "lucide-react";

const exploreFeatures = [
  {
    icon: Activity,
    title: "Running Status",
    description: "Track live train status",
    color: "from-red-500 to-red-600",
    link: "/running-status"
  },
  {
    icon: FileText,
    title: "PNR Status",
    description: "Check booking details",
    color: "from-blue-500 to-blue-600",
    link: "/pnr-status"
  },
  {
    icon: Armchair,
    title: "Seat Availability",
    description: "Find available seats",
    color: "from-purple-500 to-purple-600",
    link: "/seat-availability"
  },
  {
    icon: Search,
    title: "Search by Name",
    description: "Find trains by name/number",
    color: "from-cyan-500 to-cyan-600",
    link: "/search-train"
  },
  {
    icon: MapPin,
    title: "Search by Station",
    description: "Trains between stations",
    color: "from-green-500 to-green-600",
    link: "/search-station"
  },
  {
    icon: Navigation,
    title: "Platform Locator",
    description: "Find train platform",
    color: "from-orange-500 to-orange-600",
    link: "/platform"
  },
  {
    icon: Zap,
    title: "Vande Bharat",
    description: "Express train info",
    color: "from-yellow-500 to-yellow-600",
    link: "/vande-bharat"
  },
  {
    icon: Utensils,
    title: "Order Food",
    description: "Food delivery on train",
    color: "from-pink-500 to-pink-600",
    link: "/food-order"
  },
];

export default function SearchPage() {
  const router = useRouter();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  const searchTrains = async () => {
    if (!source || !destination) {
      return toast.error("Please select both source and destination stations");
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        await userAPI.saveRoute({
          sourceStation: source,
          destinationStation: destination,
          preferredTime: "Anytime"
        });
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
    }

    setTimeout(() => {
      setLoading(false);
      router.push(`/results?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`);
    }, 500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto px-6 py-10 pt-24 relative z-10 w-full overflow-visible">

        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
            Search Train Status
          </h1>
          <p className="text-muted-foreground text-lg">Find real-time information for your journey.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="bg-card/40 border-border/50 backdrop-blur-md shadow-2xl relative z-20 overflow-visible mb-16">
            <CardContent className="p-8 space-y-6 overflow-visible">

              <div className="grid md:grid-cols-2 gap-6 overflow-visible">
                <div className="relative z-20">
                  <StationInput label="Source Station" value={source} onChange={setSource} />
                </div>
                <div className="relative z-20">
                  <StationInput label="Destination Station" value={destination} onChange={setDestination} />
                </div>
              </div>

              <Button
                onClick={searchTrains}
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg h-14 rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all hover:scale-[1.02]"
              >
                {loading ? "Searching..." : "Search Trains"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center md:text-left">
              Explore More With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">OnTime</span>
            </h2>
            <p className="text-muted-foreground text-center md:text-left">
              Discover all the tools and features to enhance your train journey
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {exploreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  <Card
                    className="group cursor-pointer bg-card/40 border-border/50 backdrop-blur-md hover:bg-card/60 transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden"
                    onClick={() => toast.info(`${feature.title} - Coming soon!`)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3 relative z-10">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="font-bold text-foreground text-sm md:text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-xs text-muted-foreground hidden md:block">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <BackgroundBeams className="opacity-40" />
    </div>
  );
}
