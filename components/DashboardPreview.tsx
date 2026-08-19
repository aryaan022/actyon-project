"use client";

import { useState } from "react";

const tasks = [
  {
    id: 1,
    title: "Finalize API authentication flow",
    assignee: "AR",
    assigneeColor: "#0066FF",
    priority: "high",
    status: "in-progress",
    progress: 65,
    tag: "Backend",
    note: "Blocked by OAuth provider config — suggest unblocking before sprint end.",
    detail: "OAuth2 PKCE flow needs testing across all client types. Pending sign-off from security team.",
  },
  {
    id: 2,
    title: "Design token audit — spacing system",
    assignee: "KL",
    assigneeColor: "#7C3AED",
    priority: "medium",
    status: "todo",
    progress: 0,
    tag: "Design",
    note: "Related to 3 open Figma comments. Auto-grouped with design tasks.",
    detail: "Review spacing scale against component library. Update 8pt grid compliance.",
  },
  {
    id: 3,
    title: "Write onboarding copy — v2",
    assignee: "SM",
    assigneeColor: "#059669",
    priority: "low",
    status: "done",
    progress: 100,
    tag: "Content",
    note: "Completed. Shipped with last deploy.",
    detail: "All onboarding copy reviewed and merged. Localization strings queued.",
  },
  {
    id: 4,
    title: "Set up error tracking in prod",
    assignee: "TJ",
    assigneeColor: "#DC2626",
    priority: "high",
    status: "in-progress",
    progress: 40,
    tag: "Infra",
    note: "Sentry DSN configured. Sourcemaps pending upload.",
    detail: "Sentry integration done. Need to configure alert thresholds and assign owners.",
  },
];

const activity = [
  { user: "AR", userColor: "#0066FF", action: "pushed a commit to", target: "feat/auth-flow", time: "2m ago" },
  { user: "KL", userColor: "#7C3AED", action: "commented on", target: "Design token audit", time: "11m ago" },
  { user: "SM", userColor: "#059669", action: "closed", target: "Onboarding copy v2", time: "34m ago" },
];

const statusConfig = {
  done: { label: "Done", bg: "bg-[#ECFDF5]", text: "text-[#059669]", dot: "#059669" },
  "in-progress": { label: "In Progress", bg: "bg-[#EFF6FF]", text: "text-[#0066FF]", dot: "#0066FF" },
  todo: { label: "To Do", bg: "bg-[#F5F5F5]", text: "text-[#737373]", dot: "#a3a3a3" },
};

const priorityDots = { high: "#DC2626", medium: "#D97706", low: "#a3a3a3" };

export default function DashboardPreview() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  return (
    <div className="w-full rounded-[14px] border border-[#e5e5e5] bg-white shadow-[0_2px_40px_rgba(0,0,0,0.06)] overflow-hidden select-none">
      {/* Window chrome */}
      <div className="px-4 py-3 border-b border-[#f0f0f0] bg-[#fafafa] flex items-center gap-2">
        <div className="flex gap-1.5">
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} aria-hidden="true" />
          ))}
        </div>
        <div className="flex-1 text-center">
          <span className="text-[11px] text-[#a3a3a3] font-mono">flowpilot.so/workspace/acme-co</span>
        </div>
      </div>

      <div className="flex h-[440px] overflow-hidden">
        {/* Sidebar */}
        <div className="hidden sm:flex w-[156px] border-r border-[#f0f0f0] bg-[#fafafa] flex-col p-3 gap-0.5 shrink-0">
          <p className="text-[10px] font-semibold text-[#a3a3a3] uppercase tracking-wider px-2 pt-1 pb-2">Workspace</p>
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-2 px-2 py-[5px] rounded-[6px] text-[12px] font-medium transition-colors ${
                item.active
                  ? "bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-[#737373] hover:text-[#111111]"
              }`}
            >
              <span className="text-[13px]" aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
          
          <div className="mt-auto pt-3 border-t border-[#e5e5e5]">
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center text-[8px] font-semibold text-white shrink-0">AR</div>
              <div>
                <p className="text-[11px] font-medium text-[#111111] leading-none">Alex R.</p>
                <p className="text-[10px] text-[#a3a3a3] mt-0.5">Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 overflow-y-auto">
          {/* Toolbar */}
          <div className="px-4 py-3 border-b border-[#f0f0f0] flex items-center justify-between gap-4 sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-[13px] font-semibold text-[#111111]">Sprint 14</h2>
              <p className="text-[11px] text-[#a3a3a3] mt-0.5">4 tasks · 2 in progress</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill />
            </div>
          </div>

          {/* Task list */}
          <div className="p-3 space-y-1.5">
            {tasks.map((task) => {
              const status = statusConfig[task.status as keyof typeof statusConfig];
              const isSelected = selectedTask === task.id;

              return (
                <button
                  key={task.id}
                  onClick={() => setSelectedTask(isSelected ? null : task.id)}
                  className={`w-full text-left rounded-[8px] border transition-all duration-200 ${
                    isSelected
                      ? "border-[#0066FF]/30 bg-[#EBF2FF]/40 shadow-sm"
                      : "border-[#f0f0f0] bg-white hover:border-[#e0e0e0] hover:shadow-sm"
                  }`}
                  aria-expanded={isSelected}
                  aria-label={`Task: ${task.title}`}
                >
                  <div className="px-3 py-2.5 flex items-start gap-3">
                    {/* Priority dot */}
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: priorityDots[task.priority as keyof typeof priorityDots] }}
                      aria-label={`${task.priority} priority`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-[12.5px] font-medium leading-snug ${task.status === "done" ? "text-[#a3a3a3] line-through" : "text-[#111111]"}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Tags + assignee */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-[#a3a3a3] bg-[#f5f5f5] px-1.5 py-0.5 rounded-[4px] font-medium">
                          {task.tag}
                        </span>
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-semibold text-white"
                          style={{ backgroundColor: task.assigneeColor }}
                          aria-label={`Assigned to ${task.assignee}`}
                        >
                          {task.assignee}
                        </div>
                        {task.status !== "todo" && task.status !== "done" && (
                          <div className="flex-1 max-w-[80px]">
                            <div className="h-1 bg-[#f0f0f0] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0066FF] rounded-full transition-all duration-700"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {task.status === "done" && (
                          <CheckIcon />
                        )}
                      </div>

                      {/* Expanded detail */}
                      <div className={`task-detail ${isSelected ? "open" : ""}`}>
                        <div className="pt-2.5 space-y-2">
                          <p className="text-[11px] text-[#525252] leading-relaxed">{task.detail}</p>
                          <div className="flex items-start gap-1.5 bg-[#f5f5f5] rounded-[6px] px-2.5 py-2">
                            <FlagIcon />
                            <p className="text-[10.5px] text-[#525252] leading-relaxed">{task.note}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Activity strip */}
          <div className="px-3 pb-3 pt-1">
            <p className="text-[10px] font-semibold text-[#a3a3a3] uppercase tracking-wider px-1 pb-2">Recent Activity</p>
            <div className="space-y-2">
              {activity.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-semibold text-white shrink-0"
                    style={{ backgroundColor: a.userColor }}
                    aria-hidden="true"
                  >
                    {a.user}
                  </div>
                  <p className="text-[11px] text-[#525252] flex-1 min-w-0 truncate">
                    <span className="font-medium text-[#111111]">{a.user}</span>{" "}
                    {a.action}{" "}
                    <span className="text-[#0066FF]">{a.target}</span>
                  </p>
                  <span className="text-[10px] text-[#a3a3a3] shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill() {
  return (
    <div className="flex items-center gap-1.5 bg-[#f0f0f0] px-2.5 py-1 rounded-full">
      <SortIcon />
      <span className="text-[11px] font-medium text-[#525252]">Auto-sorted</span>
    </div>
  );
}

function SortIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0" aria-hidden="true">
      <path d="M2 3.5h8M3.5 6h5M5 8.5h2" stroke="#737373" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
      <path d="M2 1.5v9M2 1.5h7L7.5 5H2" stroke="#a3a3a3" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5.5" stroke="#059669" strokeWidth="1" />
      <path d="M3.5 6l1.75 1.75L8.5 4.5" stroke="#059669" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const sidebarItems = [
  { label: "Overview", icon: "◈", active: false },
  { label: "Tasks", icon: "☑", active: true },
  { label: "Roadmap", icon: "⊟", active: false },
  { label: "Docs", icon: "◻", active: false },
  { label: "Team", icon: "◉", active: false },
];
