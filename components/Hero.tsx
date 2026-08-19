"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    // Trigger reveal after mount
    const timer = setTimeout(() => {
      el.querySelectorAll(".hero-reveal").forEach((node, i) => {
        setTimeout(() => {
          (node as HTMLElement).style.opacity = "1";
          (node as HTMLElement).style.transform = "translateY(0)";
        }, i * 80);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen pt-28 pb-20 px-6 flex items-center bg-[#fafafa]"
      aria-label="Hero"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-6 max-w-[520px]">
            {/* Label */}
            <div
              className="hero-reveal inline-flex items-center gap-2 self-start"
              style={{ opacity: 0, transform: "translateY(16px)", transition: "all 0.5s ease" }}
            >
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0066FF] bg-[#EBF2FF] px-3 py-1 rounded-full tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] inline-block animate-pulse" />
                Now in public beta
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hero-reveal text-[48px] sm:text-[56px] lg:text-[60px] font-semibold text-[#111111] leading-[1.08] tracking-[-0.04em]"
              style={{ opacity: 0, transform: "translateY(16px)", transition: "all 0.5s ease" }}
            >
              Stop managing work.
              <br />
              <span className="text-[#737373]">Start moving it.</span>
            </h1>

            {/* Supporting copy */}
            <p
              className="hero-reveal text-[17px] text-[#525252] leading-[1.65] max-w-[440px]"
              style={{ opacity: 0, transform: "translateY(16px)", transition: "all 0.5s ease" }}
            >
              FlowPilot automatically organizes tasks, priorities, and project
              updates so your team spends less time coordinating and more time
              building.
            </p>

            {/* CTAs */}
            <div
              className="hero-reveal flex items-center gap-3 flex-wrap"
              style={{ opacity: 0, transform: "translateY(16px)", transition: "all 0.5s ease" }}
            >
              <Link
                href="#"
                id="hero-cta-primary"
                className="bg-[#111111] text-white text-[14px] font-medium px-5 py-2.5 rounded-[8px] hover:bg-[#222222] transition-colors duration-150"
              >
                Start Free
              </Link>
              <Link
                href="#"
                id="hero-cta-demo"
                className="text-[14px] font-medium text-[#525252] hover:text-[#111111] transition-colors duration-150 flex items-center gap-1.5 group"
              >
                <PlayIcon />
                <span>See Demo</span>
              </Link>
            </div>

            {/* Social proof bar */}
            <div
              className="hero-reveal flex items-center gap-4 pt-2"
              style={{ opacity: 0, transform: "translateY(16px)", transition: "all 0.5s ease" }}
            >
              <div className="flex -space-x-1.5">
                {avatarColors.map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-[#fafafa] flex items-center justify-center text-[9px] font-semibold text-white"
                    style={{ backgroundColor: c }}
                    aria-hidden="true"
                  >
                    {initials[i]}
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-[#737373]">
                Trusted by engineering teams at early-stage startups
              </p>
            </div>
          </div>

          {/* Right: dashboard */}
          <div
            className="hero-reveal w-full"
            style={{ opacity: 0, transform: "translateY(16px)", transition: "all 0.6s ease" }}
          >
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

const avatarColors = ["#0066FF", "#7C3AED", "#059669", "#DC2626", "#D97706"];
const initials = ["AR", "KL", "SM", "TJ", "PW"];

function PlayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="group-hover:translate-x-0.5 transition-transform duration-150"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
    </svg>
  );
}
