"use client";

import { useState } from "react";
import stations from "@/data/stations.json";

export default function StationInput({ label, value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState(value || "");

  const handleInput = (text) => {
    setQuery(text);
    onChange(text);

    if (text.length === 0) {
      setSuggestions([]);
      return;
    }

    const lower = text.toLowerCase();

    const filtered = stations
      .filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.code.toLowerCase().includes(lower)
      )
      .slice(0, 8);

    setSuggestions(filtered);
  };

  const selectStation = (station) => {
    const formatted = `${station.name} (${station.code})`;
    setQuery(formatted);
    onChange(formatted);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <label className="text-gray-300 mb-1 block">{label}</label>

      <input
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"
        placeholder="Type station name or code"
      />

      {suggestions.length > 0 && (
        <div className="absolute z-20 w-full bg-gray-900 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((s) => (
            <div
              key={s.code}
              onClick={() => selectStation(s)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700"
            >
              <div className="text-white">{s.name}</div>
              <div className="text-gray-400 text-sm">{s.code}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

