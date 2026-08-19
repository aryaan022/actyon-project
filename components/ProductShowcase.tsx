"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  { label: "Tasks completed this week", value: 47, max: 60, unit: "", color: "#0066FF" },
  { label: "Active projects", value: 8, max: 10, unit: "", color: "#7C3AED" },
  { label: "Avg. cycle time", value: 2.4, max: null, unit: "days", color: "#059669" },
  { label: "Blocked tasks", value: 3, max: null, unit: "need attention", color: "#DC2626" },
];

const recentShips = [
  { title: "User auth refactor", date: "Aug 14", tag: "Backend", status: "Shipped" },
  { title: "Dashboard v2 redesign", date: "Aug 12", tag: "Design", status: "Shipped" },
  { title: "CSV export feature", date: "Aug 9", tag: "Feature", status: "Shipped" },
  { title: "Performance audit Q3", date: "Aug 7", tag: "Infra", status: "Shipped" },
];

const teamStatus = [
  { name: "Alex R.", role: "Backend", status: "active", task: "Auth flow", color: "#0066FF" },
  { name: "Kate L.", role: "Design", status: "reviewing", task: "Token audit", color: "#7C3AED" },
  { name: "Sam M.", role: "Content", status: "done", task: "Onboarding copy", color: "#059669" },
  { name: "Tom J.", role: "Infra", status: "active", task: "Error tracking", color: "#DC2626" },
];

const statusLabel = {
  active: { label: "In progress", dot: "#0066FF", bg: "#EBF2FF", text: "#0066FF" },
  reviewing: { label: "Reviewing", dot: "#D97706", bg: "#FFFBEB", text: "#D97706" },
  done: { label: "Wrapped", dot: "#059669", bg: "#ECFDF5", text: "#059669" },
};

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setAnimate(true);
          }
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
      id="product"
      className="py-28 px-6 bg-[#fafafa] border-t border-[#e5e5e5]"
      aria-labelledby="product-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 reveal">
          <p className="text-[12px] font-semibold text-[#0066FF] uppercase tracking-widest mb-4">
            The product
          </p>
          <h2
            id="product-heading"
            className="text-[38px] sm:text-[44px] font-semibold text-[#111111] tracking-[-0.035em] leading-[1.1] max-w-[520px]"
          >
            Everything your team needs.{" "}
            <span className="text-[#737373]">Nothing it doesn&apos;t.</span>
          </h2>
        </div>

        {/* Dashboard grid */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Metrics column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Sprint metrics card */}
            <div className="bg-white rounded-[12px] border border-[#e5e5e5] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <p className="text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-4">
                Sprint 14 · Week 2 of 2
              </p>
              <div className="space-y-4">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] text-[#525252]">{m.label}</span>
                      <span className="text-[12px] font-semibold text-[#111111]">
                        {m.value}{m.unit ? ` ${m.unit}` : ""}
                      </span>
                    </div>
                    {m.max && (
                      <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: animate ? `${(m.value / m.max) * 100}%` : "0%",
                            backgroundColor: m.color,
                          }}
                        />
                      </div>
                    )}
                    {!m.max && (
                      <div
                        className="h-1 rounded-full"
                        style={{ backgroundColor: `${m.color}20` }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Team status */}
            <div className="bg-white rounded-[12px] border border-[#e5e5e5] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <p className="text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-4">
                Team · Now
              </p>
              <div className="space-y-3">
                {teamStatus.map((member) => {
                  const s = statusLabel[member.status as keyof typeof statusLabel];
                  return (
                    <div key={member.name} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-semibold text-white shrink-0"
                          style={{ backgroundColor: member.color }}
                          aria-hidden="true"
                        >
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] font-medium text-[#111111] truncate">{member.name}</p>
                          <p className="text-[10px] text-[#a3a3a3] truncate">{member.task}</p>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
                        style={{ color: s.text, backgroundColor: s.bg }}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: shipped items */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* AI summary card */}
            <div className="bg-white rounded-[12px] border border-[#e5e5e5] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-[5px] bg-[#f0f0f0] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1.5 9L4.5 5.5L7 7.5L10.5 3" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[12px] font-semibold text-[#525252]">Sprint summary</p>
              </div>
              <p className="text-[13.5px] text-[#525252] leading-relaxed">
                Sprint 14 is on track. Auth flow is the highest risk item — blocked by OAuth config.
                Recommend unblocking before Thursday to maintain release date. Error tracking is 40% complete with 2 days remaining.
                Content work wrapped early.
              </p>
            </div>

            {/* Shipped items */}
            <div className="bg-white rounded-[12px] border border-[#e5e5e5] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <p className="text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-4">
                Recently shipped
              </p>
              <div className="space-y-0">
                {recentShips.map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex items-center justify-between py-3 gap-4 ${
                      i < recentShips.length - 1 ? "border-b border-[#f5f5f5]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0" aria-hidden="true" />
                      <p className="text-[13px] font-medium text-[#111111] truncate">{item.title}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-[#a3a3a3] font-mono">{item.date}</span>
                      <span className="text-[10px] font-medium text-[#737373] bg-[#f5f5f5] px-2 py-0.5 rounded-[4px]">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-medium text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-[4px]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Velocity sparkline card */}
            <div className="bg-white rounded-[12px] border border-[#e5e5e5] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">
                  Throughput · Last 8 sprints
                </p>
                <span className="text-[11px] font-medium text-[#059669] flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 7L5 3L8 5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +12% avg
                </span>
              </div>
              <VelocitySparkline animate={animate} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VelocitySparkline({ animate }: { animate: boolean }) {
  const data = [28, 34, 31, 38, 35, 42, 39, 47];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 56;
  const w = 100;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  });

  return (
    <div className="relative">
      <svg viewBox={`0 0 100 ${h}`} className="w-full h-14" preserveAspectRatio="none" aria-label="Velocity sparkline">
        {/* Area */}
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M0,${h} ${pts.join(" ")} ${w},${h}Z`}
          fill="url(#sparkGrad)"
        />
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke="#0066FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Last dot */}
        <circle
          cx={w}
          cy={h - ((data[data.length - 1] - min) / (max - min)) * h}
          r="2"
          fill="#0066FF"
        />
      </svg>
      {/* X axis labels */}
      <div className="flex justify-between mt-2">
        {data.map((v, i) => (
          <div key={i} className="text-center">
            <span className="text-[10px] text-[#a3a3a3] font-mono">{v}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-0.5">
        {["S7", "S8", "S9", "S10", "S11", "S12", "S13", "S14"].map((s) => (
          <span key={s} className="text-[9px] text-[#d4d4d4] font-mono">{s}</span>
        ))}
      </div>
    </div>
  );
}
