"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { trainAPI, userAPI } from "@/lib/api";
import StationInput from "@/components/StationInput";
import toast from "react-hot-toast";

export default function SearchPage() {
  const [form, setForm] = useState({
    sourceStation: "",
    destinationStation: "",
    travelTime: "",
    trainNumber: "",
    journeyDate: "",
  });

  const [results, setResults] = useState([]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const searchTrains = async () => {
    if (!form.trainNumber || !form.journeyDate) {
      toast.error("Train number and date are required");
      return;
    }

    try {
      const res = await trainAPI.search(form);
      setResults([res.data.trainStatus]);  // Wrap as array for UI
      toast.success("Train status loaded!");
    } catch (error) {
      toast.error("Search failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 px-6">
        
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-white">
            Search Train Status
          </h1>
          <p className="text-gray-400 mt-2">
            Enter train number or select stations to check live running status
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 shadow-xl space-y-5">

          <StationInput
            label="Source Station"
            value={form.sourceStation}
            onChange={(v) => updateField("sourceStation", v)}
          />

          <StationInput
            label="Destination Station"
            value={form.destinationStation}
            onChange={(v) => updateField("destinationStation", v)}
          />

          <div className="space-y-2">
            <label className="text-gray-300">Preferred Time</label>
            <input
              type="time"
              value={form.travelTime}
              onChange={(e) =>
                updateField("travelTime", e.target.value)
              }
              className="bg-gray-800 px-4 py-2 rounded-lg w-full border border-gray-700 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300">Train Number</label>
            <input
              type="number"
              value={form.trainNumber}
              placeholder="e.g., 12733"
              onChange={(e) =>
                updateField("trainNumber", e.target.value)
              }
              className="bg-gray-800 px-4 py-2 rounded-lg w-full border border-gray-700 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300">Journey Date</label>
            <input
              type="date"
              value={form.journeyDate}
              onChange={(e) =>
                updateField("journeyDate", e.target.value.replace(/-/g, ""))
              }
              className="bg-gray-800 px-4 py-2 rounded-lg w-full border border-gray-700 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            onClick={searchTrains}
            className="w-full py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-700 transition"
          >
            Search Live Status
          </button>
        </div>

        {/* RESULTS SECTION */}
        <div className="mt-10 space-y-6">
          {results.map((train, index) => (
            <div
              key={index}
              className="p-6 bg-gray-900 rounded-2xl border border-gray-800 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {train?.trainName || "Unknown Train"} ({form.trainNumber})
                </h2>

                {train?.delay && train.delay > 0 ? (
                  <span className="text-yellow-400 font-semibold">
                    Delayed • {train.delay} mins
                  </span>
                ) : (
                  <span className="text-green-400 font-semibold">
                    On Time
                  </span>
                )}
              </div>

              <p className="text-gray-400 mt-2">
                {train?.currentLocation || "Current status unavailable"}
              </p>

              {/* VIEW DETAILS BUTTON */}
              <a
                href={`/train/${form.trainNumber}`}
                className="inline-block mt-4 bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                View Full Details
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
