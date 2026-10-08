"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Clock, Compass } from "lucide-react";

export function LocationCard() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTimeStr(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-card bento-card-glow relative overflow-hidden rounded-2xl p-4 flex flex-col justify-between min-h-[190px]">
      {/* Background Stylized Dark Map Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 320 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="40" x2="320" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400 dark:text-zinc-700" />
          <line x1="0" y1="100" x2="320" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400 dark:text-zinc-700" />
          <line x1="0" y1="160" x2="320" y2="160" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400 dark:text-zinc-700" />
          <line x1="80" y1="0" x2="80" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400 dark:text-zinc-700" />
          <line x1="160" y1="0" x2="160" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400 dark:text-zinc-700" />
          <line x1="240" y1="0" x2="240" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400 dark:text-zinc-700" />
          
          {/* River Nile stylized curve */}
          <path
            d="M 170 0 Q 155 60 175 110 T 160 200"
            stroke="#0284c7"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-60 dark:opacity-50"
          />

          {/* Major arterial roads */}
          <path d="M 0 85 Q 120 95 320 60" stroke="currentColor" strokeWidth="1.2" className="text-zinc-300 dark:text-zinc-600" />
          <path d="M 40 200 L 220 0" stroke="currentColor" strokeWidth="1" className="text-zinc-300 dark:text-zinc-600" />
          <path d="M 120 180 Q 200 130 320 170" stroke="currentColor" strokeWidth="1" className="text-zinc-300 dark:text-zinc-600" />

          {/* Landmarks */}
          <circle cx="100" cy="115" r="3" fill="#7c3aed" />
          <text x="75" y="132" fill="#7c3aed" fontSize="9" fontFamily="monospace" fontWeight="bold">GIZA</text>

          <circle cx="190" cy="70" r="3" fill="#0284c7" />
          <text x="175" y="60" fill="#0284c7" fontSize="9" fontFamily="monospace" fontWeight="bold">CAIRO</text>
        </svg>
      </div>

      {/* Pulsing Location Beacon */}
      <div className="absolute top-[48%] left-[34%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span className="absolute h-10 w-10 rounded-full bg-purple-500/20 animate-ping" />
        <span className="absolute h-6 w-6 rounded-full bg-purple-500/40" />
        <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/50">
          <MapPin className="h-4 w-4" />
        </div>
      </div>

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-bold text-zinc-950 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-white">
          <Compass className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
          <span>Giza, Egypt</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-mono font-bold text-zinc-950 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200">
          <Clock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="tabular-nums">{timeStr || "Cairo Time"}</span>
        </div>
      </div>

      {/* Bottom Coordinates & Details */}
      <div className="relative z-10 mt-auto pt-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider font-bold text-body-muted">
              Latitude • Longitude
            </p>
            <p className="text-xs font-mono font-bold text-heading tabular-nums">
              30.0131° N, 31.2089° E
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-purple-400 bg-purple-100 text-purple-900 dark:border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-300 font-bold">
            UTC+2 (EET)
          </span>
        </div>
      </div>
    </div>
  );
}
