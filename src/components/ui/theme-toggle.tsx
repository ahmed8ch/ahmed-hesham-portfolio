"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export type ThemeMode = "dark" | "light" | "system";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ahmed-theme") as ThemeMode | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const handleSelect = (mode: ThemeMode) => {
    setTheme(mode);
    localStorage.setItem("ahmed-theme", mode);
    applyTheme(mode);
  };

  if (!mounted) {
    return (
      <div className={cn("h-8 w-24 rounded-full border border-zinc-200 dark:border-white/10", className)} />
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme mode selector"
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-200 bg-white/90 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/90 no-print",
        className
      )}
    >
      <button
        type="button"
        onClick={() => handleSelect("dark")}
        title="Dark theme (Image 2 style)"
        className={cn(
          "flex items-center justify-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-150",
          theme === "dark"
            ? "bg-purple-600 text-white shadow-sm font-semibold"
            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        )}
      >
        <Moon className="h-3 w-3" />
        <span>Dark</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect("light")}
        title="Light theme (Crisp contrast)"
        className={cn(
          "flex items-center justify-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-150",
          theme === "light"
            ? "bg-purple-600 text-white shadow-sm font-semibold"
            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        )}
      >
        <Sun className="h-3 w-3" />
        <span>Light</span>
      </button>
    </div>
  );
}
