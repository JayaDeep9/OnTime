"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Share2,
    MoreVertical,
    Calendar,
    Bell,
    Train as TrainIcon,
    MapPin,
    RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TrainTrackingPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [trainData, setTrainData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("arrival");
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    const trainNumber = params.trainNumber; // ✅ consistent slug
    const journeyDate = searchParams.get("date");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        fetchTrainStatus();

        const interval = setInterval(fetchTrainStatus, 30000);
        return () => clearInterval(interval);
    }, [trainNumber, journeyDate, isMounted]);

    const fetchTrainStatus = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please log in to view train details");
                router.push("/login");
                return;
            }

            const url = journeyDate
                ? `${process.env.NEXT_PUBLIC_API_URL}/trains/details/${trainNumber}?journeyDate=${journeyDate}`
                : `${process.env.NEXT_PUBLIC_API_URL}/trains/details/${trainNumber}`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.status === 401) {
                toast.error("Session expired. Please log in again");
                localStorage.removeItem("token");
                router.push("/login");
                return;
            }

            if (result.success) {
                setTrainData(result.data);
                setLastUpdated(new Date());
            } else {
                toast.error(result.message || "Failed to fetch train status");
            }
        } catch (error) {
            console.error("Error fetching train status:", error);
            toast.error("Error loading train data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (time) => (time ? time : "---");

    const getStationStatus = (station) => {
        if (station.currentStation) return "current";
        if (station.hasDeparted) return "departed";
        return "upcoming";
    };

    const getCurrentStation = () => {
        if (!trainData || !trainData.route) return null;
        return (
            trainData.route.find((s) => s.currentStation) ||
            trainData.route.find((s) => s.hasDeparted)
        );
    };

    if (!isMounted || loading) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-cyan-500/20 blur-[120px] rounded-full" />
                <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600" />
                </div>
            </div>
        );
    }

    const currentStation = getCurrentStation();
    const trainName = trainData?.train_name || "Train";
    const trainRoute = trainData?.route || [];

    return (
        <div className="min-h-screen relative">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-cyan-500/20 blur-[120px] rounded-full" />

            <div className="relative z-10">
                <Navbar />

                {/* HEADER */}
                <div className="pt-20 pb-6">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-900 dark:text-white bg-gray-200/20 dark:bg-white/5 hover:bg-gray-300/40 dark:hover:bg-white/10 rounded-full"
                                    onClick={() => router.back()}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>

                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {trainNumber} - {trainName}
                                </h1>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-900 dark:text-white bg-gray-200/20 dark:bg-white/5 hover:bg-gray-300/40 dark:hover:bg-white/10 rounded-full"
                                    onClick={() => toast.info("Share feature coming soon")}
                                >
                                    <Share2 className="w-5 h-5" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-900 dark:text-white bg-gray-200/20 dark:bg-white/5 hover:bg-gray-300/40 dark:hover:bg-white/10 rounded-full"
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* ACTION ROW */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {[
                                { icon: Calendar, label: "Today" },
                                { icon: Bell, label: "Alarm" },
                                { icon: TrainIcon, label: "Coach" },
                                { icon: Share2, label: "Share" },
                            ].map((item, i) => (
                                <Button
                                    key={i}
                                    variant="outline"
                                    className="bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/40 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 backdrop-blur-xl rounded-full shadow-lg"
                                    onClick={() => toast.info(`${item.label} coming soon`)}
                                >
                                    <item.icon className="mr-2 w-4 h-4" /> {item.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="max-w-6xl mx-auto px-6 pb-12">
                    {/* TABS */}
                    <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
                        {["arrival", "departure"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 font-medium transition-colors ${activeTab === tab
                                        ? "text-cyan-500 border-b-2 border-cyan-500"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* ROUTE TIMELINE */}
                    <div className="bg-white/60 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-300 dark:border-gray-700 shadow-lg">
                        {trainRoute.map((station, index) => {
                            const status = getStationStatus(station);
                            const isCurrent = status === "current";
                            const isDeparted = status === "departed";

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-4 py-3"
                                >
                                    {/* ARRIVAL */}
                                    <div className="w-20 text-right">
                                        <p
                                            className={`text-sm ${isDeparted
                                                    ? "text-gray-900 dark:text-white"
                                                    : "text-gray-500 dark:text-gray-400"
                                                }`}
                                        >
                                            {formatTime(station.arrival)}
                                        </p>
                                    </div>

                                    {/* DOT + LINE */}
                                    <div className="flex flex-col items-center">
                                        {isCurrent ? (
                                            <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center shadow">
                                                <TrainIcon className="w-4 h-4 text-white" />
                                            </div>
                                        ) : (
                                            <div
                                                className={`w-3 h-3 rounded-full ${isDeparted
                                                        ? "bg-cyan-600"
                                                        : "bg-gray-400 dark:bg-gray-600"
                                                    }`}
                                            />
                                        )}

                                        {index < trainRoute.length - 1 && (
                                            <div
                                                className={`w-0.5 h-14 ${isDeparted
                                                        ? "bg-cyan-600"
                                                        : "bg-gray-300 dark:bg-gray-600"
                                                    }`}
                                            />
                                        )}
                                    </div>

                                    {/* STATION NAME */}
                                    <div className="flex-1">
                                        <h4
                                            className={`font-semibold ${isDeparted || isCurrent
                                                    ? "text-gray-900 dark:text-white"
                                                    : "text-gray-600 dark:text-gray-400"
                                                }`}
                                        >
                                            {station.station_name}
                                        </h4>
                                    </div>

                                    {/* DEPARTURE */}
                                    <div className="w-20 text-left">
                                        <p
                                            className={`text-sm ${isDeparted
                                                    ? "text-gray-900 dark:text-white"
                                                    : "text-gray-500 dark:text-gray-400"
                                                }`}
                                        >
                                            {formatTime(station.departure)}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* STATUS FOOTER */}
                    {currentStation && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 bg-white/60 dark:bg-black/30 backdrop-blur-xl rounded-xl p-4 border border-gray-300 dark:border-gray-700 shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Current Status
                                    </p>
                                    <p className="text-base font-semibold text-red-500">
                                        Departed {currentStation.station_name}
                                    </p>

                                    {lastUpdated && (
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            Updated at {lastUpdated.toLocaleTimeString()}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-cyan-500 hover:bg-cyan-500/10 rounded-full"
                                    onClick={fetchTrainStatus}
                                >
                                    <RefreshCw className="w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
