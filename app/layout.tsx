import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowPilot — The workspace built for teams that ship",
  description:
    "FlowPilot automatically organizes tasks, priorities, and project updates so your team spends less time coordinating and more time building.",
  metadataBase: new URL("https://flowpilot.so"),
  openGraph: {
    title: "FlowPilot — The workspace built for teams that ship",
    description:
      "Stop managing work. Start moving it. FlowPilot keeps your team aligned and your projects on track.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
