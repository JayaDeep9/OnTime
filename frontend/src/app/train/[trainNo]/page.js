"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

export default function TrainDetailsPage() {
  const { trainNo } = useParams();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load train details (initial data)
  const loadTrainDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/trains/details/${trainNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setTrain(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch train details");
    } finally {
      setLoading(false);
    }
  };

  // Run initial load
  useEffect(() => {
    loadTrainDetails();
  }, [trainNo]);


  // REAL-TIME SOCKET.IO LISTENER
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    // listen for updates for this specific train
    socket.on(`trainUpdate:${trainNo}`, (updatedData) => {
      console.log("🔥 Live update received:", updatedData);
      setTrain(updatedData);
      toast.success("Train status updated!");
    });

    return () => {
      socket.disconnect();
    };
  }, [trainNo]);



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <div className="text-xl animate-pulse">Loading train details…</div>
      </div>
    );
  }

  if (!train) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <div className="text-xl">Train Not Found ⚠️</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* Train Header */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h1 className="text-3xl font-bold">
            {train?.train_name || "Train"} ({trainNo})
          </h1>

          {/* STATUS */}
          <div className="mt-3">
            {train.delay && train.delay > 0 ? (
              <span className="bg-yellow-600 px-3 py-1 rounded-lg">
                Delayed: {train.delay} mins
              </span>
            ) : (
              <span className="bg-green-600 px-3 py-1 rounded-lg">
                On Time
              </span>
            )}
          </div>

          <div className="mt-4 text-gray-300 space-y-1">
            <p>Departure: {train.departure_time || "-"}</p>
            <p>Arrival: {train.arrival_time || "-"}</p>
            <p>Current Location: {train.current_location || "-"}</p>
          </div>
        </div>


        {/* Route Details */}
        {train.route && (
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Route Map</h2>

            <div className="space-y-3">
              {train.route.map((station, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{station.station_name}</p>
                      <p className="text-sm text-gray-400">{station.station_code}</p>
                    </div>

                    <div className="text-right">
                      <p>Arr: {station.arrival_time}</p>
                      <p>Dep: {station.departure_time}</p>

                      {station.delay > 0 ? (
                        <p className="text-yellow-400 text-sm">
                          Delay: {station.delay} mins
                        </p>
                      ) : (
                        <p className="text-green-400 text-sm">On time</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
