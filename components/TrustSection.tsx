"use client";

import { useEffect, useRef } from "react";

const problems = [
  {
    problem: "Endless status meetings",
    solution:
      "Every update is captured automatically. FlowPilot surfaces progress without anyone being pulled into a 30-minute sync to say what could've been written in two sentences.",
    icon: CalendarIcon,
    tag: "Meetings → optional",
  },
  {
    problem: "Losing track of priorities",
    solution:
      "There's no universal 'top priority' — it shifts by person, by day, by context. FlowPilot models this and surfaces the right next action for each person, not a static list everyone ignores.",
    icon: ListIcon,
    tag: "Priorities → personalized",
  },
  {
    problem: "Context switching overhead",
    solution:
      "Jumping between Slack, Notion, Linear, and email to understand the state of a project costs more than most teams realize. FlowPilot is the connective layer that stops this.",
    icon: SwitchIcon,
    tag: "Context → unified",
  },
  {
    problem: "Project visibility issues",
    solution:
      "Leadership asking for updates shouldn't require a team member to spend an hour preparing a deck. FlowPilot generates live project views so anyone can see exactly where things stand.",
    icon: EyeIcon,
    tag: "Visibility → always-on",
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problems"
      className="py-28 px-6 bg-white border-t border-[#e5e5e5]"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <p className="text-[12px] font-semibold text-[#0066FF] uppercase tracking-widest mb-4">
            Built around real problems
          </p>
          <h2
            id="trust-heading"
            className="text-[38px] sm:text-[44px] font-semibold text-[#111111] tracking-[-0.035em] leading-[1.1] max-w-[560px]"
          >
            The problems every engineering team knows{" "}
            <span className="text-[#737373]">but rarely admits.</span>
          </h2>
          <p className="mt-5 text-[16px] text-[#525252] leading-relaxed max-w-[480px]">
            We didn&apos;t build FlowPilot because project management software didn&apos;t exist.
            We built it because existing tools create more coordination work, not less.
          </p>
        </div>

        {/* Problems grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((item, i) => (
            <div
              key={item.problem}
              className={`reveal reveal-delay-${(i % 2) + 1} group relative rounded-[12px] border border-[#e5e5e5] p-7 bg-[#fafafa] hover:bg-white hover:border-[#d4d4d4] hover:shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-all duration-250 cursor-default`}
            >
              {/* Problem label */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[8px] bg-white border border-[#e5e5e5] flex items-center justify-center text-[#737373] group-hover:text-[#0066FF] group-hover:border-[#0066FF]/20 transition-colors duration-200">
                    <item.icon />
                  </div>
                  <p className="text-[15px] font-semibold text-[#111111] leading-snug">{item.problem}</p>
                </div>
              </div>

              {/* Solution */}
              <p className="text-[14px] text-[#525252] leading-[1.72] mb-5">{item.solution}</p>

              {/* Tag */}
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" aria-hidden="true" />
                <span className="text-[11.5px] font-semibold text-[#0066FF] tracking-wide">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quote / philosophy */}
        <div className="mt-14 reveal">
          <blockquote className="border-l-2 border-[#0066FF] pl-6 max-w-[540px]">
            <p className="text-[17px] text-[#111111] leading-[1.7] font-medium italic">
              &ldquo;Good tools get out of your way. They make the right thing easy to do and the wrong thing hard to ignore.&rdquo;
            </p>
            <footer className="mt-3 text-[13px] text-[#737373]">
              — What we think about every time we ship a feature
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="14" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.5 1.5V4M11.5 1.5V4M1.5 7h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="3.5" cy="4.5" r="1" fill="currentColor" />
      <circle cx="3.5" cy="8.5" r="1" fill="currentColor" />
      <circle cx="3.5" cy="12.5" r="1" fill="currentColor" />
      <path d="M6.5 4.5h7M6.5 8.5h7M6.5 12.5h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function SwitchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d="M4 5h9l-2.5-2.5M13 12H4l2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d="M1.5 8.5C1.5 8.5 4 4 8.5 4S15.5 8.5 15.5 8.5 13 13 8.5 13 1.5 8.5 1.5 8.5z" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
