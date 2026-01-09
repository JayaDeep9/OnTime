"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Share2,
    MoreVertical,
    ChevronDown,
    ArrowRight,
    Clock,
    IndianRupee,
    Bookmark,
} from "lucide-react";
import toast from "react-hot-toast";
import { userAPI } from "@/lib/api";

const mockTrains = [
    {
        number: "17243",
        name: "Guntur - Rayagada Express",
        departure: "12:10 AM",
        arrival: "9:00 AM",
        duration: "8h50m",
        price: 125,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "22204",
        name: "Visakhapatnam Duronto Express",
        departure: "1:10 AM",
        arrival: "6:30 AM",
        duration: "5h20m",
        price: null,
        runsDaily: false,
        runningDays: "S M T W T F S",
        status: "Not running today"
    },
    {
        number: "12840",
        name: "Howrah Mail",
        departure: "1:20 AM",
        arrival: "7:50 AM",
        duration: "6h30m",
        price: 140,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily",
        leftAt: "Left BZA at 01:14 AM"
    },
    {
        number: "12740",
        name: "Visakhapatnam Garib Rath Express",
        departure: "1:45 AM",
        arrival: "7:50 AM",
        duration: "6h05m",
        price: null,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily",
        leftAt: "Left BZA at 02:18 AM"
    },
    {
        number: "12253",
        name: "Anga Express",
        departure: "2:00 AM",
        arrival: "8:25 AM",
        duration: "6h25m",
        price: 140,
        runsDaily: false,
        runningDays: "S M T W T F S",
        status: "Not running today"
    },
    {
        number: "12868",
        name: "Howrah SF Express",
        departure: "2:00 AM",
        arrival: "8:25 AM",
        duration: "6h25m",
        price: 140,
        runsDaily: false,
        runningDays: "S M T W T F S",
        status: "Not running today"
    },
    {
        number: "17643",
        name: "Circar Express",
        departure: "5:30 PM",
        arrival: "8:00 AM",
        duration: "14h30m",
        price: 385,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "12711",
        name: "Pinakini Express",
        departure: "6:10 AM",
        arrival: "1:00 PM",
        duration: "6h50m",
        price: 165,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },

    {
        number: "12727",
        name: "Godavari Express",
        departure: "5:15 PM",
        arrival: "6:15 AM",
        duration: "13h00m",
        price: 445,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "12717",
        name: "Ratnachal Express",
        departure: "8:10 AM",
        arrival: "2:30 PM",
        duration: "6h20m",
        price: 180,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "17239",
        name: "Simhadri Express",
        departure: "7:00 AM",
        arrival: "1:20 PM",
        duration: "6h20m",
        price: 145,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "11019",
        name: "Konark Express",
        departure: "3:30 AM",
        arrival: "9:45 PM",
        duration: "18h15m",
        price: 520,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "12704",
        name: "Falaknuma Express",
        departure: "4:00 PM",
        arrival: "5:45 AM",
        duration: "13h45m",
        price: 495,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "18463",
        name: "Prashanti Express",
        departure: "11:30 AM",
        arrival: "1:00 PM",
        duration: "25h30m",
        price: 580,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "17015",
        name: "Visakha Express",
        departure: "4:30 PM",
        arrival: "7:30 AM",
        duration: "15h00m",
        price: 360,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "12805",
        name: "Janmabhoomi Express",
        departure: "6:20 AM",
        arrival: "1:30 PM",
        duration: "7h10m",
        price: 190,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "17225",
        name: "Amaravati Express",
        departure: "7:45 PM",
        arrival: "5:00 AM",
        duration: "9h15m",
        price: 310,
        runsDaily: false,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    },
    {
        number: "17487",
        name: "Tirumala Express",
        departure: "8:30 PM",
        arrival: "9:00 AM",
        duration: "12h30m",
        price: 410,
        runsDaily: true,
        runningDays: "S M T W T F S",
        status: "Runs Daily"
    }
];

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const source = searchParams.get("source") || "BZA - Vijayawada Junction";
    const destination = searchParams.get("destination") || "VSKP - Visakhapatnam Junction";

    const handleSaveRoute = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to save routes");
                router.push("/login");
                return;
            }

            await userAPI.saveRoute({
                sourceStation: source,
                destinationStation: destination,
                preferredTime: "Anytime",
                routeName: `${getStationName(source)} to ${getStationName(destination)}`
            });
            toast.success("Route saved successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save route");
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setTrains(mockTrains);
            setLoading(false);
        }, 800);
    }, []);

    const getSourceCode = (station) => {
        if (!station) return '';
        const match = station.match(/\(([^)]+)\)/);
        return match ? match[1] : station.split(' ')[0];
    };

    const getDestCode = (station) => {
        if (!station) return '';
        const match = station.match(/\(([^)]+)\)/);
        return match ? match[1] : station.split(' ').pop();
    };

    const getStationName = (station) => {
        if (!station) return '';
        return station.replace(/\s*\([^)]*\)\s*/g, '').trim();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = trains.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(trains.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen relative">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <Navbar />

                <div className="pt-20 pb-6">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-900 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 rounded-full"
                                    onClick={() => router.back()}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Search Results</h1>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-900 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 rounded-full"
                                    onClick={handleSaveRoute}
                                    title="Save Route"
                                >
                                    <Bookmark className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-900 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 rounded-full"
                                    onClick={() => toast.info("Share functionality coming soon!")}
                                >
                                    <Share2 className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-900 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 rounded-full"
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-white/70 dark:bg-[#111827]/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                            <div className="flex-1 text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{getSourceCode(source)}</p>
                                <p className="font-bold text-lg text-gray-900 dark:text-white">{getStationName(source)}</p>
                            </div>
                            <div className="px-4">
                                <ArrowRight className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <div className="flex-1 text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{getDestCode(destination)}</p>
                                <p className="font-bold text-lg text-gray-900 dark:text-white">{getStationName(destination)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-4">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <Button
                                className="bg-cyan-600/20 hover:bg-cyan-600/30 text-foreground border-border backdrop-blur-md rounded-full flex-shrink-0"
                                variant="outline"
                            >
                                All Dates <ChevronDown className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                className="bg-cyan-600/20 hover:bg-cyan-600/30 text-foreground border-border backdrop-blur-md rounded-full flex-shrink-0"
                                variant="outline"
                            >
                                GN - Unreserv <ChevronDown className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                className="bg-cyan-600/20 hover:bg-cyan-600/30 text-foreground border-border backdrop-blur-md rounded-full flex-shrink-0"
                                variant="outline"
                            >
                                Sort by <ChevronDown className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-6 relative z-10">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {currentItems.map((train, index) => (
                                <motion.div
                                    key={train.number}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card
                                        className="bg-card/60 border-border/50 backdrop-blur-sm hover:bg-card/80 transition-all group overflow-hidden"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                                <div className="flex items-center gap-6 flex-1">
                                                    <div className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg flex-shrink-0">
                                                        {train.number}
                                                    </div>

                                                    <div className="flex items-center gap-3 flex-1">
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold text-foreground">{train.departure}</p>
                                                        </div>

                                                        <div className="flex-1 text-center">
                                                            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{train.duration}</span>
                                                            </div>
                                                        </div>

                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold text-foreground">{train.arrival}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end md:justify-center">
                                                    {train.price ? (
                                                        <div className="text-right">
                                                            <div className="flex items-center gap-1 text-2xl font-bold text-foreground">
                                                                <IndianRupee className="w-5 h-5" />
                                                                <span>{train.price}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted-foreground font-semibold text-lg">NA</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-foreground group-hover:text-cyan-600 transition-colors">
                                                        {train.name}
                                                    </h3>
                                                    {train.leftAt && (
                                                        <p className="text-sm mt-1">
                                                            <span className="text-red-600 dark:text-red-400 font-medium">{train.leftAt}</span>
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-sm font-medium ${train.status.includes("Not") ? "text-muted-foreground" : "text-cyan-600 dark:text-cyan-400"}`}>
                                                        {train.status}
                                                    </p>
                                                    {!train.runsDaily && (
                                                        <p className="text-xs text-muted-foreground mt-1 font-mono">
                                                            {train.runningDays}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && trains.length > itemsPerPage && (
                        <div className="flex justify-center items-center gap-2 mt-8 mb-4">
                            <Button
                                variant="outline"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-card/60 backdrop-blur-sm border-border/50 text-foreground"
                            >
                                Previous
                            </Button>

                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <Button
                                        key={i + 1}
                                        variant={currentPage === i + 1 ? "default" : "ghost"}
                                        onClick={() => paginate(i + 1)}
                                        className={`w-10 h-10 rounded-lg ${currentPage === i + 1
                                            ? "bg-cyan-600 text-white"
                                            : "text-foreground hover:bg-cyan-600/10"
                                            }`}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-card/60 backdrop-blur-sm border-border/50 text-foreground"
                            >
                                Next
                            </Button>
                        </div>
                    )}


                </div>
            </div>

            <BackgroundBeams className="opacity-30" />
        </div>
    );
}
