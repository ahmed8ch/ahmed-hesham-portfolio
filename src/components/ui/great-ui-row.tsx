"use client";

import React from "react";
import { ExternalLink, Building, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GreatUIRowProps {
  title: string;
  subtitle?: string;
  badge?: string;
  period: string;
  institution?: string;
  location?: string;
  link?: string;
  stack?: string[];
  highlights: string[];
  upcomingModules?: string[];
  onOpenDetails?: () => void;
  className?: string;
}

export function GreatUIRow({
  title,
  subtitle,
  badge,
  period,
  institution,
  location,
  link,
  stack,
  highlights,
  upcomingModules,
  onOpenDetails,
  className,
}: GreatUIRowProps) {
  return (
    <article
      className={cn(
        "bento-card group relative rounded-xl p-4 transition-all duration-200 hover:shadow-md print:border print:border-zinc-300 print:p-3 print:avoid-break",
        className
      )}
    >
      {/* Header: Title, period, subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5">
        <div className="flex items-center flex-wrap gap-2">
          {onOpenDetails ? (
            <button
              type="button"
              onClick={onOpenDetails}
              className="text-base font-extrabold text-heading transition-colors hover:text-purple-600 dark:hover:text-purple-400 text-left"
            >
              {title}
            </button>
          ) : link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-extrabold inline-flex items-center gap-1.5 text-heading transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              {title}
              <ExternalLink className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 no-print" />
            </a>
          ) : (
            <h3 className="text-base font-extrabold text-heading">
              {title}
            </h3>
          )}

          {subtitle && (
            <span className="text-xs font-bold text-body-muted">
              {subtitle}
            </span>
          )}

          {badge && (
            <span className="rounded-md border border-purple-400 bg-purple-100 dark:border-purple-500/40 dark:bg-purple-500/20 px-2 py-0.5 text-xs font-extrabold text-purple-900 dark:text-purple-200 print:border-zinc-400 print:text-black">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs font-extrabold tabular-nums text-body-muted">
            {period}
          </span>
        </div>
      </div>

      {/* Metadata: Institution, location */}
      {(institution || location) && (
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs font-bold text-body-muted">
          {institution && (
            <span className="inline-flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 shrink-0 text-purple-600 dark:text-purple-400 print:hidden" />
              <span>{institution}</span>
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-purple-600 dark:text-purple-400 print:hidden" />
              <span>{location}</span>
            </span>
          )}
        </div>
      )}

      {/* Tech Stack Pills */}
      {stack && stack.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-zinc-300 bg-zinc-100 px-2 py-0.5 font-mono text-xs font-bold text-heading dark:border-white/10 dark:bg-zinc-800 print:border-zinc-300 print:bg-transparent print:text-black"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Impact Highlights */}
      {highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-zinc-200 dark:border-white/5 pt-2.5">
          {highlights.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-body-primary leading-relaxed font-normal"
            >
              <span className="select-none text-purple-600 dark:text-purple-400 font-black">•</span>
              <span className="flex-1">{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Upcoming Modules if present */}
      {upcomingModules && upcomingModules.length > 0 && (
        <div className="mt-3 border-t border-dashed border-zinc-300 dark:border-zinc-800 pt-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            Curriculum Modules:
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {upcomingModules.map((module) => (
              <span
                key={module}
                className="rounded border border-purple-300 bg-purple-50 px-2 py-0.5 text-xs font-bold text-purple-900 dark:border-purple-500/20 dark:bg-purple-950/40 dark:text-purple-300"
              >
                {module}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
