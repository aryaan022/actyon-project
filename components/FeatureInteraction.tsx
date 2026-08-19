"use client";

import { useState, useEffect, useRef } from "react";

const workflows = [
  {
    id: "prioritize",
    label: "Smart Prioritization",
    trigger: "Hover to see the logic",
    description: "FlowPilot analyzes deadlines, dependencies, and team capacity to sort what truly matters now.",
    steps: [
      { label: "Scans all open tasks", detail: "Reads titles, tags, and due dates" },
      { label: "Detects blockers", detail: "Finds tasks that unblock others" },
      { label: "Weights urgency vs. impact", detail: "Balances short-term needs with sprint goals" },
      { label: "Surfaces the top 3", detail: "Presented to each team member individually" },
    ],
    tag: "Prioritization",
    tagColor: "#0066FF",
    tagBg: "#EBF2FF",
  },
  {
    id: "automate",
    label: "Recurring Automation",
    trigger: "Hover to see automation steps",
    description: "Configure once. Let FlowPilot handle the repetitive coordination your team shouldn't be doing manually.",
    steps: [
      { label: "Trigger: sprint ends", detail: "Every two weeks, on Friday" },
      { label: "Archive completed tasks", detail: "Moves to project history" },
      { label: "Roll over incomplete work", detail: "Carries forward with new priority scores" },
      { label: "Draft sprint summary", detail: "Sent to Slack channel automatically" },
    ],
    tag: "Automation",
    tagColor: "#7C3AED",
    tagBg: "#F5F3FF",
  },
  {
    id: "standup",
    label: "Async Standups",
    trigger: "Hover to see standup flow",
    description: "No more 15-minute syncs. FlowPilot compiles each person's progress and surfaces blockers daily.",
    steps: [
      { label: "9 AM: FlowPilot checks in", detail: "Sends a 3-question Slack prompt" },
      { label: "Responses collected", detail: "Each teammate answers async" },
      { label: "Summary compiled", detail: "FlowPilot extracts blockers and wins" },
      { label: "Digest posted at 10 AM", detail: "Team-wide visibility, zero meetings" },
    ],
    tag: "Async-first",
    tagColor: "#059669",
    tagBg: "#ECFDF5",
  },
];

export default function FeatureInteraction() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
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
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = workflows[activeWorkflow];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-28 px-6 bg-[#fafafa] border-t border-[#e5e5e5]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 reveal">
          <p className="text-[12px] font-semibold text-[#0066FF] uppercase tracking-widest mb-4">
            Built to automate
          </p>
          <h2
            id="features-heading"
            className="text-[38px] sm:text-[44px] font-semibold text-[#111111] tracking-[-0.035em] leading-[1.1] max-w-[500px]"
          >
            Hover a workflow.{" "}
            <span className="text-[#737373]">See what happens.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#525252] leading-relaxed max-w-[420px]">
            Every FlowPilot workflow is transparent — you can see exactly what runs, when, and why.
          </p>
        </div>

        {/* Tab selector */}
        <div className="reveal flex gap-1 mb-10 bg-[#f0f0f0] rounded-[10px] p-1 w-fit">
          {workflows.map((wf, i) => (
            <button
              key={wf.id}
              onClick={() => { setActiveWorkflow(i); setHoveredStep(null); }}
              className={`px-4 py-2 rounded-[8px] text-[13px] font-medium transition-all duration-200 ${
                activeWorkflow === i
                  ? "bg-white text-[#111111] shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                  : "text-[#737373] hover:text-[#525252]"
              }`}
              aria-pressed={activeWorkflow === i}
            >
              {wf.label}
            </button>
          ))}
        </div>

        {/* Workflow card */}
        <div className="reveal grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: description */}
          <div className="flex flex-col gap-5">
            <div>
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ color: current.tagColor, backgroundColor: current.tagBg }}
              >
                {current.tag}
              </span>
            </div>
            <p className="text-[17px] text-[#111111] leading-[1.65] font-medium max-w-[400px]">
              {current.description}
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-[#a3a3a3] uppercase tracking-wider">
                Automation steps
              </p>
              {current.steps.map((step, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`flex items-start gap-3 p-3 rounded-[8px] cursor-default transition-all duration-200 ${
                    hoveredStep === i
                      ? "bg-white border border-[#e0e0e0] shadow-sm"
                      : "border border-transparent"
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: current.tagColor }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-medium text-[#111111] leading-snug">{step.label}</p>
                    <p
                      className={`text-[12px] text-[#737373] transition-all duration-200 overflow-hidden ${
                        hoveredStep === i ? "max-h-10 mt-0.5 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual card */}
          <div className="bg-white rounded-[12px] border border-[#e5e5e5] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[13px] font-semibold text-[#111111]">{current.label}</p>
                <p className="text-[11px] text-[#a3a3a3] mt-0.5">Active · Running on schedule</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                <span className="text-[11px] text-[#059669] font-medium">Live</span>
              </div>
            </div>

            {/* Step timeline */}
            <div className="space-y-0">
              {current.steps.map((step, i) => {
                const isActive = hoveredStep === i || (hoveredStep === null && i === 0);
                return (
                  <div key={i} className="flex gap-3">
                    {/* Timeline line + dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-semibold transition-all duration-200 ${
                          isActive
                            ? "border-[#0066FF] bg-[#0066FF] text-white"
                            : "border-[#e5e5e5] text-[#a3a3a3]"
                        }`}
                        style={isActive ? {} : {}}
                      >
                        {i + 1}
                      </div>
                      {i < current.steps.length - 1 && (
                        <div
                          className="w-px flex-1 min-h-[20px] mt-1 mb-1"
                          style={{ backgroundColor: isActive ? "#0066FF33" : "#e5e5e5" }}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-4 pt-0.5 flex-1 min-w-0">
                      <p
                        className={`text-[12.5px] font-medium transition-colors duration-200 ${
                          isActive ? "text-[#111111]" : "text-[#a3a3a3]"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p
                        className={`text-[11px] transition-all duration-200 ${
                          isActive ? "text-[#525252] mt-0.5" : "text-transparent"
                        }`}
                      >
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
