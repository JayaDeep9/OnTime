"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import {
  FaTrain,
  FaSearch,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaHistory,
  FaHeart
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();

  const quickActions = [
    {
      title: "Track Train",
      desc: "Live running status with real-time updates.",
      icon: <FaTrain className="text-2xl text-blue-600 dark:text-blue-400" />,
      link: "/search"
    },
    {
      title: "Live Station",
      desc: "Arrivals & departures from any station.",
      icon: <FaMapMarkerAlt className="text-2xl text-green-600 dark:text-green-400" />,
      link: "/live-station"
    },
    {
      title: "PNR Status",
      desc: "Check confirmation chances.",
      icon: <FaExclamationTriangle className="text-2xl text-yellow-600 dark:text-yellow-400" />,
      link: "/pnr"
    }
  ];

  const moreTools = [
    {
      title: "Saved Trains",
      desc: "Your frequently tracked trains.",
      icon: <FaHeart className="text-xl text-pink-500 dark:text-pink-400" />,
      link: "/saved-routes"
    },
    {
      title: "Search History",
      desc: "Your previous train searches.",
      icon: <FaHistory className="text-xl text-purple-500 dark:text-purple-400" />,
      link: "/history"
    }
  ];

  return (
    <div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem]
                      bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10">

        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <main className="max-w-6xl mx-auto px-6 mt-28 pb-12">

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              w-full px-6 py-4 rounded-2xl 
              bg-white/70 border border-gray-200 shadow-lg backdrop-blur-xl
              dark:bg-[#111827]/70 dark:border-gray-700
              flex items-center justify-between
            "
          >
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Welcome to <span className="text-blue-600 dark:text-blue-400">OnTime</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Your all-in-one Indian Railways assistant.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/search")}
                className="px-4 py-2 rounded-full bg-blue-600 text-white shadow hover:scale-105 transition"
              >
                Track Train
              </button>

              <button
                onClick={() => router.push("/live-station")}
                className="
                  px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition
                  dark:bg-[#1f2937] dark:text-gray-300 dark:hover:bg-[#374151]
                "
              >
                Live Station
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10"
          >
            <div className="
              lg:col-span-2 p-6 rounded-3xl shadow-lg border backdrop-blur-xl
              bg-white/70 border-gray-200
              dark:bg-[#111827]/70 dark:border-gray-700
            ">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                🚆 Current Train Status
              </h3>

              <div className="
                border border-gray-200 rounded-2xl p-8 mt-4 flex flex-col items-center justify-center bg-gray-50/70
                dark:bg-[#1f2937]/60 dark:border-gray-700
              ">
                <FaSearch className="text-4xl mb-3 text-blue-500 dark:text-blue-400" />
                <p className="text-gray-600 dark:text-gray-300">No train selected</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Search for a train to view live details.
                </p>

                <button
                  onClick={() => router.push("/search")}
                  className="text-blue-600 dark:text-blue-400 underline mt-3 text-sm"
                >
                  Track a Train →
                </button>
              </div>

              <div className="grid grid-cols-3 text-center mt-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Speed</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-200">—</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Updated</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-200">—</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Delay</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-200">—</p>
                </div>
              </div>
            </div>

            <div className="
              p-6 rounded-3xl shadow-lg border backdrop-blur-xl
              bg-white/70 border-gray-200
              dark:bg-[#111827]/70 dark:border-gray-700
            ">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tools</h3>

              <div className="flex flex-col gap-4">
                {moreTools.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => router.push(item.link)}
                    className="
                      flex items-center gap-4 p-3 rounded-xl cursor-pointer transition
                      bg-gray-100 hover:bg-gray-200
                      dark:bg-[#1f2937] dark:hover:bg-[#374151]
                    "
                  >
                    <div className="
                      w-12 h-12 rounded-xl shadow flex items-center justify-center
                      bg-white dark:bg-[#111827]
                    ">
                      {item.icon}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => router.push(item.link)}
                  className="
                    p-6 rounded-3xl border shadow-lg backdrop-blur-xl cursor-pointer transition
                    bg-white/70 border-gray-200 hover:-translate-y-1 hover:shadow-xl
                    dark:bg-[#111827]/70 dark:border-gray-700 dark:hover:shadow-2xl
                  "
                >
                  <div className="
                    w-12 h-12 rounded-xl shadow flex items-center justify-center mb-3
                    bg-white dark:bg-[#1f2937]
                  ">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </main>
      </div>
    </div>
  );
}
