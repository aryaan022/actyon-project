"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${
        scrolled
          ? "border-b border-[#e5e5e5] bg-[#fafafa]/90"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#111111] font-semibold text-[15px] tracking-tight"
          aria-label="FlowPilot home"
        >
          <FlowPilotMark />
          FlowPilot
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {["Product", "Changelog", "Pricing", "Docs"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[13.5px] text-[#737373] hover:text-[#111111] transition-colors duration-150 font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA group */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#"
            className="text-[13.5px] text-[#737373] hover:text-[#111111] transition-colors font-medium"
          >
            Log in
          </Link>
          <Link
            href="#"
            id="nav-cta"
            className="bg-[#111111] text-white text-[13.5px] font-medium px-4 py-[7px] rounded-[7px] hover:bg-[#222222] transition-colors duration-150"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 -mr-2 text-[#737373]"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e5e5e5] bg-[#fafafa] px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {["Product", "Changelog", "Pricing", "Docs", "Log in"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[14px] text-[#737373] hover:text-[#111111] transition-colors font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            href="#"
            className="bg-[#111111] text-white text-[13.5px] font-medium px-4 py-2 rounded-[7px] text-center mt-1"
            onClick={() => setMenuOpen(false)}
          >
            Start Free
          </Link>
        </div>
      )}
    </header>
  );
}

function FlowPilotMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect width="20" height="20" rx="5" fill="#0066FF" />
      <path
        d="M6 10.5L8.5 13L14 7"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
