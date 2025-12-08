"use client";

import { useEffect, useRef, useState } from "react";
import stations from "@/data/stations.json";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

export default function StationInput({ label, value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState(value || "");
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value !== query) {
      setQuery(value || "");
    }
  }, [value]);

  const handleInput = (e) => {
    const text = e.target.value;
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
      .slice(0, 10);

    setSuggestions(filtered);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const station = suggestions[activeIndex];
      selectStation(station);
    }
  };

  const selectStation = (station) => {
    const formatted = `${station.name} (${station.code})`;
    setQuery(formatted);
    onChange(formatted);
    setSuggestions([]);
    inputRef.current?.blur();
  };

  const highlight = (name, code) => {
    const input = query.toLowerCase();
    if (!input) return name;

    const nameIdx = name.toLowerCase().indexOf(input);

    if (nameIdx !== -1) {
      return (
        <>
          {name.slice(0, nameIdx)}
          <span className="text-cyan-400 font-bold">{name.slice(nameIdx, nameIdx + input.length)}</span>
          {name.slice(nameIdx + input.length)}
        </>
      );
    }

    return name;
  };

  return (
    <div ref={containerRef} className="relative w-full space-y-2 group">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 group-focus-within:text-cyan-500 transition-colors">
        <MapPin className="w-4 h-4 text-cyan-500" />
        {label}
      </label>

      <div className="relative">
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className="bg-background/50 border-border hover:border-cyan-500/50 focus:border-cyan-500 text-foreground placeholder:text-muted-foreground focus-visible:ring-cyan-500/20 shadow-sm transition-all h-12 rounded-xl"
          placeholder="Start typing station name..."
        />
      </div>

      {suggestions.length > 0 && (
        <div
          className="absolute z-50 w-full mt-2 border border-border/50 rounded-xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
          style={{
            backgroundColor: 'rgba(240, 253, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {suggestions.map((s, index) => (
            <div
              key={s.code}
              onClick={() => selectStation(s)}
              className={cn(
                "px-4 py-3 cursor-pointer transition-all flex justify-between items-center group/item border-b border-border/50 last:border-0",
                activeIndex === index ? "bg-cyan-500/10" : "hover:bg-muted/50"
              )}
            >
              <div className="font-medium text-foreground group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                {highlight(s.name, s.code)}
              </div>
              <div className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded group-hover/item:bg-background transition-colors">
                {s.code}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
