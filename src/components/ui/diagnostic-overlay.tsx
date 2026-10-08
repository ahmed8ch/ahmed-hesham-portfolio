"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Terminal, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const ASCII_SCHEMATIC = `
+-----------------------------------------------------------------------+
|  AHMED HESHAM LOTFY // INDUSTRIAL ARCHITECTURE TELEMETRY REPORT       |
+-----------------------------------------------------------------------+
|  FRAMEWORK      : Next.js 15 (App Router) + React 19 (Server + Client)|
|  TYPE GOVERNANCE: Strict TypeScript 5.7+ (Zero 'any', Pocock Rigor)   |
|  DESIGN SYSTEM  : Fluid Functionalism Scale (Inter Variable 4.0 opsz) |
|  COMPONENTS     : Radix UI Primitives + Local Scaffolds (No 3rd-party)|
|  CANVAS SHADER  : Throttled Dither Grain (IntersectionObserver Paused)|
|  STATUS MATRIX  : 8x38 Dot-Matrix LED + Conway's Cellular Automaton   |
|  NOTIFICATION   : Kobra Systems Razor-Border Mechanical Alerts        |
|  PRINT ENGINE   : LaTeX Parity High-Density Executive Media Rules     |
+-----------------------------------------------------------------------+
|  TARGET PROFILE : Giza, Egypt | Flutter Engineer & React Specialist   |
+-----------------------------------------------------------------------+
`;

export function DiagnosticOverlay() {
  const [isActive, setIsActive] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, dpr: 1 });
  const [nodeCount, setNodeCount] = useState(0);

  const toggleDiagnostic = useCallback(() => {
    setIsActive((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("diagnostic-active");
        // Print ASCII schematic to console
        console.log(
          `%c${ASCII_SCHEMATIC}`,
          "color: #10b981; font-family: monospace; font-size: 11px; font-weight: bold; line-height: 1.2;"
        );
      } else {
        document.body.classList.remove("diagnostic-active");
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const updateStats = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
      });
      setNodeCount(document.querySelectorAll("*").length);
    };

    updateStats();
    window.addEventListener("resize", updateStats);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+D on macOS or Ctrl+D on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggleDiagnostic();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updateStats);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("diagnostic-active");
    };
  }, [toggleDiagnostic]);

  return (
    <>
      {/* Corner floating HUD when active */}
      {isActive && (
        <aside
          id="diagnostic-badge"
          aria-label="Diagnostic wireframe HUD"
          className="fixed bottom-4 left-4 z-50 border border-red-500 bg-zinc-950/95 p-2 font-mono text-[11px] text-zinc-100 shadow-xl backdrop-blur-md no-print"
        >
          <div className="flex items-center gap-2 border-b border-red-900/60 pb-1">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-red-400">DIAGNOSTIC_MODE::ACTIVE</span>
          </div>
          <div className="mt-1 space-y-0.5 text-zinc-300">
            <div>
              VIEWPORT: <span className="text-zinc-100 tabular-nums">{dimensions.width}px</span> ×{" "}
              <span className="text-zinc-100 tabular-nums">{dimensions.height}px</span> @{" "}
              <span className="text-zinc-100 tabular-nums">{dimensions.dpr}x</span>
            </div>
            <div>
              DOM NODES: <span className="text-zinc-100 tabular-nums">{nodeCount}</span>
            </div>
            <div className="text-[10px] text-zinc-400">
              Schematic emitted to DevTools Console
            </div>
          </div>
        </aside>
      )}

      {/* Monospace trigger button for diagnostic */}
      <button
        type="button"
        onClick={toggleDiagnostic}
        title="Toggle Diagnostic Wireframe (Cmd+D / Ctrl+D)"
        className={cn(
          "inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[11px] transition-motion-fast no-print",
          isActive
            ? "border-red-500 bg-red-950/30 text-red-400 font-bold"
            : "border-zinc-300 bg-white/80 text-zinc-600 hover:border-zinc-500 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
        )}
      >
        <Terminal className="h-3 w-3" />
        <span>{isActive ? "[DIAG: ON]" : "[DEBUG]"}</span>
      </button>
    </>
  );
}
