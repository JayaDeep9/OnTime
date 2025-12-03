"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { userAPI } from "@/lib/api";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await userAPI.getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.log("Profile load failed:", err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            Welcome 👋 {user ? user.name : "Loading..."}
          </h1>
          <p className="text-gray-400 mt-2">
            Track your favourite routes, check train status, and monitor delays in real-time.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* CARD: Search Trains */}
          <Link
            href="/search"
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-2">🔍 Search Trains</h2>
            <p className="text-gray-400">
              Check real-time running status and delays.
            </p>
          </Link>

          {/* CARD: Saved Routes */}
          <Link
            href="/saved-routes"
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-2">⭐ Saved Routes</h2>
            <p className="text-gray-400">
              View and manage your saved travel routes.
            </p>
          </Link>

          {/* CARD: Search History */}
          <Link
            href="/history"
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-2">📜 Search History</h2>
            <p className="text-gray-400">
              Quick access to previously searched trains.
            </p>
          </Link>
        </div>

        {/* EXTRA SECTION */}
        <div className="mt-14 bg-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold">📊 Overview</h2>
          <p className="text-gray-400 mt-2">
            A summary of your account activity.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 text-center">
              <p className="text-gray-400">Saved Routes</p>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>

            <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 text-center">
              <p className="text-gray-400">Searches (24h)</p>
              <p className="text-3xl font-bold mt-1">26</p>
            </div>

            <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 text-center">
              <p className="text-gray-400">Alerts Sent</p>
              <p className="text-3xl font-bold mt-1">5</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
