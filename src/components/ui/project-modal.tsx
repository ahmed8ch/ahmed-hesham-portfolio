"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Layers, Cpu, ShieldCheck, Calendar, ArrowRight } from "lucide-react";
import { Project } from "@/types/cv";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-motion-slow" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 border border-zinc-300 bg-white p-6 shadow-2xl transition-motion-slow dark:border-zinc-800 dark:bg-zinc-950 max-h-[90vh] overflow-y-auto">
          <div className="flex items-start justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="type-caption font-mono uppercase tracking-wider text-zinc-500">
                  SYSTEM::SPECIFICATION
                </span>
                {project.type && (
                  <span className="border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                    {project.type}
                  </span>
                )}
              </div>
              <DialogPrimitive.Title className="type-title mt-1 font-bold text-zinc-950 dark:text-zinc-50">
                {project.title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="type-caption text-zinc-500 dark:text-zinc-400">
                {project.subtitle} • {project.period}
              </DialogPrimitive.Description>
            </div>

            <DialogPrimitive.Close
              onClick={onClose}
              aria-label="Close modal (Esc)"
              className="p-1 text-zinc-400 transition-motion-fast hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>

          {/* Stack Specification */}
          <div className="mt-4">
            <span className="type-caption font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Technology Stack
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[12px] text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Execution & Impact */}
          <div className="mt-5">
            <span className="type-caption font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Engineering Highlights & Impact
            </span>
            <div className="mt-2 space-y-2">
              {project.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 border-l-2 border-zinc-300 pl-3 py-1 dark:border-zinc-800"
                >
                  <ArrowRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
                  <p className="type-body text-zinc-700 dark:text-zinc-300 text-wrap-pretty">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-3 text-[11px] text-zinc-500 dark:border-zinc-800">
            <span className="font-mono">KOBRA_DIALOG_ID: {project.slug}</span>
            <button
              type="button"
              onClick={onClose}
              className="border border-zinc-300 bg-zinc-100 px-3 py-1 font-medium text-zinc-900 transition-motion-fast hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Close [ESC]
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
