"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { X, AlertCircle, Info, CheckCircle2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export type KobraToastLevel = "info" | "warn" | "error" | "telemetry";

export interface KobraToastItem {
  id: string;
  title: string;
  message: string;
  code?: string;
  level: KobraToastLevel;
  timestamp: string;
}

interface KobraToastContextType {
  toasts: KobraToastItem[];
  showToast: (params: {
    title: string;
    message: string;
    code?: string;
    level?: KobraToastLevel;
  }) => void;
  dismissToast: (id: string) => void;
}

const KobraToastContext = createContext<KobraToastContextType | null>(null);

export function KobraToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<KobraToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      title,
      message,
      code,
      level = "info",
    }: {
      title: string;
      message: string;
      code?: string;
      level?: KobraToastLevel;
    }) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}`;

      const newToast: KobraToastItem = {
        id,
        title,
        message,
        code,
        level,
        timestamp,
      };

      setToasts((prev) => [...prev.slice(-3), newToast]);

      // Auto dismiss after 7 seconds
      setTimeout(() => {
        dismissToast(id);
      }, 7000);
    },
    [dismissToast]
  );

  // Global Escape key listener to dismiss top toast
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setToasts((prev) => {
          if (prev.length === 0) return prev;
          return prev.slice(0, prev.length - 1);
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <KobraToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <div
        id="kobra-toast-viewport"
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2 pointer-events-none p-2 sm:p-0 no-print"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={cn(
              "pointer-events-auto border bg-white p-3 shadow-lg transition-motion-fast dark:bg-zinc-950",
              toast.level === "error"
                ? "border-red-600/70 dark:border-red-500/80"
                : toast.level === "warn"
                ? "border-amber-600/70 dark:border-amber-500/80"
                : "border-zinc-300 dark:border-zinc-800"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {toast.level === "error" ? (
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                ) : toast.level === "telemetry" ? (
                  <Terminal className="h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100" />
                ) : toast.level === "warn" ? (
                  <Info className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100" />
                )}
                <span className="type-caption font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  {toast.title}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-zinc-500 tabular-nums dark:text-zinc-500">
                  {toast.timestamp}
                </span>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Dismiss toast (Esc)"
                  className="p-0.5 text-zinc-400 transition-motion-fast hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>

            {toast.code && (
              <div className="mt-1.5 border border-zinc-200 bg-zinc-100/70 px-2 py-0.5 font-mono text-[11px] text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                {toast.code}
              </div>
            )}

            <p className="mt-1.5 type-body text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              {toast.message}
            </p>

            <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-600">
              <span>SYSTEM::KOBRA_ALERT</span>
              <span>[ESC to dismiss]</span>
            </div>
          </div>
        ))}
      </div>
    </KobraToastContext.Provider>
  );
}

export function useKobraToast() {
  const context = useContext(KobraToastContext);
  if (!context) {
    throw new Error("useKobraToast must be used within KobraToastProvider");
  }
  return context;
}
