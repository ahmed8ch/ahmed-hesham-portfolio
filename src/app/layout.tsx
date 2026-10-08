import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AmbientTexture } from "@/components/ui/ambient-texture";
import { KobraToastProvider } from "@/components/ui/kobra-toast";

export const metadata: Metadata = {
  title: "Ahmed Hesham Lotfy — Software Developer & Systems Portfolio",
  description:
    "Industrial, high-craft single-page digital CV and interactive engineering portfolio. Specializing in Flutter mobile applications, REST APIs, and modern React web architecture.",
  keywords: [
    "Ahmed Hesham Lotfy",
    "Software Developer",
    "Flutter",
    "React",
    "TypeScript",
    "DEPI",
    "Mobile Applications",
    "Portfolio",
    "Giza, Egypt",
  ],
  authors: [{ name: "Ahmed Hesham Lotfy" }],
  openGraph: {
    title: "Ahmed Hesham Lotfy — Software Developer",
    description:
      "Specializing in Flutter mobile applications, REST API integration, and modern React frontend engineering.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-800 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-200 dark:selection:text-zinc-900">
        <KobraToastProvider>
          <AmbientTexture />
          {children}
        </KobraToastProvider>
      </body>
    </html>
  );
}
