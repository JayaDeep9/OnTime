"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import StationInput from "@/components/StationInput";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

export default function LiveStationPage() {
  const [station, setStation] = useState("");
  const [trains, setTrains] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLiveStation = async () => {
    if (!station) return toast.error("Select a station");

    const code = station.match(/\((.*?)\)/)?.[1] || station;

    setLoading(true);
    try {
      const res = await api.get(`/live-station/${code}`);
      setTrains(res.data.trains);
    } catch (err) {
      toast.error("Failed to fetch live station data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-6 py-10 pt-24 relative z-10 w-full">

        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
          🚉 Live Station Status
        </h1>

        <div className="bg-card/50 backdrop-blur-md p-6 rounded-2xl border border-border/50 shadow-2xl">
          <StationInput
            label="Station"
            value={station}
            onChange={setStation}
          />

          <Button
            onClick={fetchLiveStation}
            className="mt-6 w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Live Status"}
          </Button>
        </div>

        {trains && (
          <div className="mt-10 space-y-6">
            {trains.map((t, index) => (
              <div
                key={index}
                className="bg-card/70 border border-border/50 p-6 rounded-2xl shadow-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                    {t.train_name} <span className="text-muted-foreground font-mono font-normal">({t.train_number})</span>
                  </h2>

                  <span className="text-sm font-bold px-3 py-1 bg-muted rounded-full">
                    PF: {t.platform || "—"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <p className="text-muted-foreground">
                    From: <span className="text-foreground font-medium">{t.source_station_name}</span>
                  </p>
                  <p className="text-muted-foreground md:text-right">
                    To: <span className="text-foreground font-medium">{t.destination_station_name}</span>
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-xl space-y-2 border border-border/30">
                  <p className="text-muted-foreground flex justify-between">
                    <span>Expected Arrival:</span>
                    <span>
                      <b className="text-foreground">{t.expected_arrival_time}</b>
                      {t.delay_arrival > 0 && (
                        <span className="text-yellow-500 ml-2 text-xs font-bold px-2 py-0.5 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                          +{t.delay_arrival} min
                        </span>
                      )}
                    </span>
                  </p>

                  <p className="text-muted-foreground flex justify-between">
                    <span>Expected Departure:</span>
                    <span>
                      <b className="text-foreground">{t.expected_departure_time}</b>
                      {t.delay_departure > 0 && (
                        <span className="text-yellow-500 ml-2 text-xs font-bold px-2 py-0.5 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                          +{t.delay_departure} min
                        </span>
                      )}
                    </span>
                  </p>
                </div>

                <p className="text-muted-foreground mt-4 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                  Current Position: <b className="text-cyan-400">{t.position}</b>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <BackgroundBeams className="opacity-30" />
    </div>
  );
}
