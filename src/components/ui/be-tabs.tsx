"use client";

import React, { useState, useEffect } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface FluidTabsProps {
  tabs: TabItem[];
  value: string;
  onValueChange: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function FluidTabs({
  tabs,
  value,
  onValueChange,
  children,
  className,
}: FluidTabsProps) {
  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <div className="border-b border-zinc-200 dark:border-zinc-800 no-print">
        <TabsPrimitive.List className="flex items-center gap-1 overflow-x-auto pb-[-1px]">
          {tabs.map((tab) => {
            const isActive = tab.id === value;
            return (
              <TabsPrimitive.Trigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "relative inline-flex items-center gap-2 border-b-2 px-3.5 py-2 text-left type-caption font-medium transition-motion-moderate",
                  isActive
                    ? "border-zinc-900 text-zinc-950 dark:border-zinc-100 dark:text-zinc-50 font-semibold"
                    : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
                )}
              >
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span
                    className={cn(
                      "border px-1.5 py-0.2 text-[10px] tabular-nums transition-motion-fast",
                      isActive
                        ? "border-zinc-900/30 bg-zinc-900/5 text-zinc-900 dark:border-zinc-100/30 dark:bg-zinc-100/10 dark:text-zinc-100"
                        : "border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </TabsPrimitive.Trigger>
            );
          })}
        </TabsPrimitive.List>
      </div>

      <div className="mt-4">{children}</div>
    </TabsPrimitive.Root>
  );
}

export function FluidTabContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TabsPrimitive.Content
      value={value}
      className={cn("outline-none transition-motion-moderate", className)}
    >
      {children}
    </TabsPrimitive.Content>
  );
}

/**
 * Animated counter with tabular numbers to eliminate layout drift
 */
export function TabularCounter({
  value,
  duration = 800,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easedProgress * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span className="font-mono tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
