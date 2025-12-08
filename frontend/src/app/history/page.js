"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { trainAPI } from "@/lib/api";
import toast from "react-hot-toast";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await trainAPI.getHistory();
      setHistory(res.data.history);
    } catch (error) {
      toast.error("Failed to load history");
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadHistory();
    };
    init();
  }, []);

  return (

    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-extrabold mb-6">📜 Search History</h1>
        <p className="text-muted-foreground mb-10">
          Your recent train searches are displayed here.
        </p>

        {history.length === 0 ? (
          <p className="text-muted-foreground mt-20 text-center">No search history yet.</p>
        ) : (
          <div className="space-y-10">

            {history.map((item, index) => (
              <div
                key={item._id}
                className="relative pl-10 border-l border-border"
              >
                <div className="absolute -left-[10px] top-1 w-4 h-4 rounded-full bg-blue-500 shadow-lg"></div>

                <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl">

                  <h2 className="text-xl font-bold">
                    {item.sourceStation} → {item.destinationStation}
                  </h2>

                  <p className="text-muted-foreground mt-1">
                    Preferred Time: <span className="text-foreground">{item.travelTime}</span>
                  </p>

                  <p className="text-sm text-muted-foreground mt-2">
                    Searched on: {new Date(item.searchDate).toLocaleString()}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
