"use client";

import React, { useState, useCallback } from "react";
import { cvData } from "@/data/cv";
import { Project } from "@/types/cv";
import { DotMatrix } from "@/components/ui/dot-matrix";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DiagnosticOverlay } from "@/components/ui/diagnostic-overlay";
import { GreatUIRow } from "@/components/ui/great-ui-row";
import { LocationCard } from "@/components/ui/location-card";
import { ProjectModal } from "@/components/ui/project-modal";
import { TabularCounter } from "@/components/ui/be-tabs";
import { useKobraToast } from "@/components/ui/kobra-toast";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Printer,
  Copy,
  ExternalLink,
  Terminal,
  Code2,
  Sparkles,
  Layers,
  GraduationCap,
  Award,
  ArrowUpRight,
  CheckCircle2,
  Smartphone,
  Cpu,
  Globe2,
  Boxes,
  Compass,
} from "lucide-react";

export default function PortfolioPage() {
  const { showToast } = useKobraToast();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "projects" | "experience" | "stack">("all");

  // Easter Egg #1: deploy-prod.sh Kobra Toast
  const handleDeployEasterEgg = useCallback(() => {
    showToast({
      title: "HALT // PROD_DEPLOY_FAILURE",
      code: "EXIT_CODE: 418 (I'M A TEAPOT)",
      message:
        "Execution Halted: Exit Code 418 (I'm a teapot). Rule #1: Never deploy to production on a Friday. Automatic rollback initiated.",
      level: "error",
    });
  }, [showToast]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(cvData.contact.email);
    showToast({
      title: "CLIPBOARD_SYNC",
      message: `Copied ${cvData.contact.email} to system clipboard.`,
      level: "telemetry",
    });
  }, [showToast]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* 1. TOP NAVBAR (Bento Style Navigation) */}
      <header
        id="telemetry-bar"
        className="bento-card mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl p-3.5 no-print"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-sm shadow-md shadow-purple-500/30">
            AL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">
                Ahmed Hesham Lotfy
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:text-purple-300">
                Software Dev
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Flutter • React • Mobile & Web Architecture
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Quick Filter Pills */}
          <nav aria-label="Quick navigation" className="hidden md:flex items-center gap-1 border-r border-zinc-200 dark:border-white/10 pr-2 mr-1">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === "all"
                  ? "bg-purple-600 text-white"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("projects")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === "projects"
                  ? "bg-purple-600 text-white"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("experience")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === "experience"
                  ? "bg-purple-600 text-white"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("stack")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === "stack"
                  ? "bg-purple-600 text-white"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Stack
            </button>
          </nav>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Diagnostic Wireframe (Cmd+D) */}
          <DiagnosticOverlay />

          {/* Print PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            title="Print or export resume to PDF (Cmd+P)"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm transition-all hover:border-purple-500 hover:text-purple-600 dark:border-white/10 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:text-white"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </header>

      {/* 2. BENTO ROW 1: PROFILE HERO + LIVE MAP + STATUS TELEMETRY */}
      <section className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Profile Card (Left 5 cols) */}
        <div className="bento-card bento-card-glow md:col-span-5 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-extrabold text-xl shadow-lg shadow-purple-500/30">
                    AL
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                    Ahmed Hesham Lotfy
                  </h1>
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    Software Developer
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200 font-normal">
              {cvData.summary}
            </p>

            {/* Core Attributes */}
            <div className="mt-4 space-y-2 border-t border-zinc-100 pt-3 dark:border-white/5 text-xs">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Smartphone className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>
                  <strong className="text-zinc-950 dark:text-white font-semibold">Flutter & Dart:</strong> 30+ client screens delivered
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Code2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>
                  <strong className="text-zinc-950 dark:text-white font-semibold">Web Development:</strong> React & TypeScript (DEPI MCIT)
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Globe2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>
                  <strong className="text-zinc-950 dark:text-white font-semibold">Bilingual Systems:</strong> English / Arabic Native RTL & UI
                </span>
              </div>
            </div>
          </div>

          {/* Social Quick Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-3 dark:border-white/5 no-print">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 hover:border-purple-400 dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <Copy className="h-3 w-3 text-purple-500" />
              <span>Copy Email</span>
            </button>
            <a
              href={`mailto:${cvData.contact.email}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-purple-700"
            >
              <Mail className="h-3 w-3" />
              <span>Email</span>
            </a>
            <a
              href={cvData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 transition-colors hover:border-purple-400 dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-200"
            >
              <Linkedin className="h-3 w-3 text-purple-500" />
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={cvData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 transition-colors hover:border-purple-400 dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-200"
            >
              <Github className="h-3 w-3 text-purple-500" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Live Location Card (Center 4 cols) */}
        <div className="md:col-span-4 flex flex-col">
          <LocationCard />
        </div>

        {/* Status & Telemetry Card (Right 3 cols) */}
        <div className="bento-card bento-card-glow md:col-span-3 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5 dark:border-white/5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                System Status
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400">
                  Current Availability
                </span>
                <p className="text-xs font-bold text-zinc-950 dark:text-white mt-0.5">
                  Available for Roles & Capstones
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400">
                  Active Tracks
                </span>
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 mt-0.5">
                  • DEPI React Trainee (MCIT)
                </p>
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  • FlyRank AI Intern
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5">
            <span className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 block mb-1.5">
              Dot Matrix LED [Interactive]
            </span>
            <DotMatrix initialLabel="ONLINE" />
          </div>
        </div>
      </section>

      {/* 3. BENTO ROW 2: REAL-TIME IMPACT NUMBERS */}
      <section className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3 print:hidden">
        <div className="bento-card rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Client Screens Shipped
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              <TabularCounter value={30} suffix="+" />
            </span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              Auth, Cart, Orders
            </span>
          </div>
        </div>

        <div className="bento-card rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Training & Lab Hours
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              <TabularCounter value={130} suffix="h" />
            </span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              Flutter & Cisco CCNA
            </span>
          </div>
        </div>

        <div className="bento-card rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Core Languages
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              <TabularCounter value={5} />
            </span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              TS, Dart, Python, JS, C++
            </span>
          </div>
        </div>

        <div className="bento-card rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Localization Precision
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              100%
            </span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              Arabic RTL & English
            </span>
          </div>
        </div>
      </section>

      {/* 4. BENTO ROW 3: FEATURED ENGINEERING PROJECTS */}
      {(activeFilter === "all" || activeFilter === "projects") && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Featured Engineering Projects
              </h2>
            </div>
            <span className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
              [{cvData.projects.length} PROJECTS]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cvData.projects.map((proj) => (
              <div
                key={proj.slug}
                className="bento-card bento-card-glow rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {proj.type && (
                        <span className="inline-block rounded-md border border-purple-300 bg-purple-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-900 dark:border-purple-500/40 dark:bg-purple-500/20 dark:text-purple-200 mb-1.5">
                          {proj.type}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                        {proj.subtitle}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-medium tabular-nums text-zinc-600 dark:text-zinc-400 shrink-0">
                      {proj.period}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-3.5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-200">
                    {proj.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-purple-500 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-800 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 py-1.5 text-xs font-semibold text-purple-700 transition-colors hover:bg-purple-500/20 dark:text-purple-300 no-print"
                  >
                    <span>Inspect Architecture</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. BENTO ROW 4: EXPERIENCE & TRAINING */}
      {(activeFilter === "all" || activeFilter === "experience") && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Professional Experience & Training
              </h2>
            </div>
            <span className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
              [{cvData.training.length} TRACKS]
            </span>
          </div>

          <div className="space-y-3">
            {cvData.training.map((item, idx) => (
              <GreatUIRow
                key={idx}
                title={item.role}
                subtitle={`${item.mode} • ${item.isCurrent ? "Active" : "Completed"}`}
                institution={`${item.institution} (${item.organization})`}
                location={item.location}
                period={item.period}
                highlights={item.highlights}
                upcomingModules={item.upcomingModules}
              />
            ))}
          </div>
        </section>
      )}

      {/* 6. BENTO ROW 5: TECHNICAL SKILLS MATRIX */}
      {(activeFilter === "all" || activeFilter === "stack") && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                Technical Skills & Tooling
              </h2>
            </div>
            <span className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
              [SYSTEM PROFICIENCIES]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cvData.skills.map((cat) => (
              <div key={cat.category} className="bento-card rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2.5">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-zinc-200 bg-white px-2 py-1 font-mono text-xs font-semibold text-zinc-800 dark:border-white/10 dark:bg-zinc-800/90 dark:text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. BENTO ROW 6: CERTIFICATIONS & EDUCATION */}
      {(activeFilter === "all") && (
        <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Education */}
          <div className="bento-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                Education
              </h2>
            </div>

            <div className="space-y-3">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-purple-500 pl-3">
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mt-0.5">
                    {edu.institution} • {edu.location}
                  </p>
                  <p className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
                    Graduation: {edu.graduationDate}
                  </p>
                </div>
              ))}
            </div>

            {cvData.volunteer.length > 0 && (
              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-white/5">
                <span className="text-[11px] font-mono font-bold uppercase text-zinc-500 dark:text-zinc-400 block mb-2">
                  Volunteering & Community
                </span>
                {cvData.volunteer.map((vol, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-semibold text-zinc-900 dark:text-white">{vol.role} • {vol.organization}</p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">{vol.period} • {vol.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="bento-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                Certifications & Credentials
              </h2>
            </div>

            <div className="space-y-3">
              {cvData.certifications.map((cert, idx) => (
                <div key={idx} className="border-l-2 border-purple-500 pl-3">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                      {cert.title}
                    </h3>
                    <span className="font-mono text-xs text-zinc-500 tabular-nums">
                      {cert.issuedDate}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mt-0.5">
                    {cert.issuer} {cert.hours ? `• ${cert.hours} Hours` : ""}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 hover:underline dark:text-purple-400 no-print"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. PRINT ONLY VIEW (Strict LaTeX format when pressing Cmd+P) */}
      <section className="hidden print:block space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-black">{cvData.contact.name}</h1>
          <p className="text-sm text-black">
            {cvData.contact.email} • {cvData.contact.phone} • {cvData.contact.location} • Military: {cvData.contact.militaryStatus}
          </p>
          <p className="text-xs text-black mt-1">{cvData.summary}</p>
        </div>

        <div>
          <h2 className="text-base font-bold text-black border-b border-black pb-0.5">Education</h2>
          {cvData.education.map((edu, idx) => (
            <div key={idx} className="mt-1 text-xs text-black">
              <strong>{edu.degree}</strong> — {edu.institution}, {edu.location} ({edu.graduationDate})
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-base font-bold text-black border-b border-black pb-0.5">Experience & Training</h2>
          {cvData.training.map((t, idx) => (
            <div key={idx} className="mt-1.5 text-xs text-black">
              <strong>{t.role}</strong> — {t.institution} ({t.period})
              <ul className="list-disc ml-4 mt-0.5">
                {t.highlights.map((h, hIdx) => (
                  <li key={hIdx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-base font-bold text-black border-b border-black pb-0.5">Projects</h2>
          {cvData.projects.map((p, idx) => (
            <div key={idx} className="mt-1.5 text-xs text-black">
              <strong>{p.title}</strong> — {p.subtitle} ({p.period})
              <p className="italic">Stack: {p.stack.join(", ")}</p>
              <ul className="list-disc ml-4 mt-0.5">
                {p.highlights.map((h, hIdx) => (
                  <li key={hIdx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-base font-bold text-black border-b border-black pb-0.5">Technical Skills</h2>
          {cvData.skills.map((s, idx) => (
            <div key={idx} className="text-xs text-black mt-0.5">
              <strong>{s.category}:</strong> {s.skills.join(", ")}
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-base font-bold text-black border-b border-black pb-0.5">Certifications</h2>
          {cvData.certifications.map((c, idx) => (
            <div key={idx} className="text-xs text-black mt-0.5">
              <strong>{c.title}</strong> — {c.issuer} ({c.issuedDate})
            </div>
          ))}
        </div>
      </section>

      {/* 9. TELEMETRY FOOTER & EASTER EGGS */}
      <footer
        id="telemetry-footer"
        className="bento-card mt-8 rounded-2xl p-4 no-print"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-zinc-900 dark:text-white">DEPLOYED_SYSTEM::ONLINE</span>
            <span>|</span>
            <span>GIZA_EGY::READY</span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* Easter Egg #1: deploy-prod.sh Monospace Trigger */}
            <button
              type="button"
              onClick={handleDeployEasterEgg}
              title="Execute production deployment pipeline"
              className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-1 font-mono text-[11px] font-semibold text-zinc-700 transition-all hover:border-red-500 hover:bg-red-50 hover:text-red-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-400"
            >
              <Terminal className="h-3 w-3" />
              <span>[deploy-prod.sh]</span>
            </button>

            <span className="font-mono text-zinc-500">
              © {new Date().getFullYear()} Ahmed Hesham Lotfy
            </span>
          </div>
        </div>
      </footer>

      {/* Project Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
