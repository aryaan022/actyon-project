"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    label: "Capture",
    title: "Collect tasks from anywhere.",
    description:
      "Paste a Slack link, forward an email, or type it in. FlowPilot captures tasks from wherever your team works, without changing how they communicate.",
    icon: InboxIcon,
  },
  {
    number: "02",
    label: "Organize",
    title: "FlowPilot groups and prioritizes work.",
    description:
      "FlowPilot reads context, detects dependencies, and surfaces what needs attention first. No manual triage. No weekly planning ceremonies.",
    icon: SortIcon,
  },
  {
    number: "03",
    label: "Execute",
    title: "Teams move faster, coordination overhead drops.",
    description:
      "Everyone knows what they own, what's blocked, and what ships next. Progress updates happen automatically so status meetings become optional.",
    icon: RocketIcon,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-28 px-6 bg-white border-t border-[#e5e5e5]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <p className="text-[12px] font-semibold text-[#0066FF] uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="text-[38px] sm:text-[44px] font-semibold text-[#111111] tracking-[-0.035em] leading-[1.1] max-w-[480px]"
          >
            From scattered to{" "}
            <span className="text-[#737373]">shipped.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-[22px] left-[calc(16.66%+32px)] right-[calc(16.66%+32px)] h-px bg-[#e5e5e5]"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${i + 1} flex flex-col gap-5`}
            >
              {/* Number + icon */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-[10px] bg-[#fafafa] border border-[#e5e5e5] flex items-center justify-center text-[#0066FF] relative z-10">
                  <step.icon />
                </div>
                <span className="font-mono text-[11px] text-[#a3a3a3] font-medium">
                  {step.number}
                </span>
              </div>

              {/* Copy */}
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold text-[#0066FF] uppercase tracking-widest">
                  {step.label}
                </p>
                <h3 className="text-[18px] font-semibold text-[#111111] tracking-[-0.02em] leading-snug">
                  {step.title}
                </h3>
                <p className="text-[14.5px] text-[#525252] leading-[1.7] max-w-[300px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InboxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 11.5h4l2 2h3l2-2h4" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 4h12M5 9h8M7 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 2C9 2 5 6 5 10a4 4 0 008 0c0-4-4-8-4-8z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M6.5 12.5L4 16M11.5 12.5L14 16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" />
    </svg>
  );
}
