"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="py-32 px-6 bg-[#111111]"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-[520px]">
          {/* Eyebrow */}
          <p className="reveal text-[12px] font-semibold text-[#737373] uppercase tracking-widest mb-6">
            Get started
          </p>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="reveal reveal-delay-1 text-[40px] sm:text-[52px] font-semibold text-white tracking-[-0.04em] leading-[1.08] mb-6"
          >
            Spend less time
            <br />
            <span className="text-[#737373]">organizing work.</span>
          </h2>

          {/* Supporting */}
          <p className="reveal reveal-delay-2 text-[16px] text-[#a3a3a3] leading-relaxed mb-10 max-w-[400px]">
            No credit card. No onboarding call. Set up in under five minutes, and
            your team is moving faster by end of day.
          </p>

          {/* CTA buttons */}
          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="#"
              id="final-cta-primary"
              className="bg-white text-[#111111] text-[14px] font-semibold px-6 py-3 rounded-[9px] hover:bg-[#f0f0f0] transition-colors duration-150"
            >
              Start Free
            </Link>
            <Link
              href="#"
              id="final-cta-docs"
              className="text-[14px] font-medium text-[#737373] hover:text-white transition-colors duration-150 flex items-center gap-1.5 group"
            >
              Read the docs
              <ArrowIcon />
            </Link>
          </div>

          {/* Footnote */}
          <p className="reveal reveal-delay-4 text-[12px] text-[#525252] mt-8">
            Free plan includes 3 projects, unlimited teammates, and all core AI features.
          </p>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="group-hover:translate-x-0.5 transition-transform duration-150"
      aria-hidden="true"
    >
      <path
        d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
