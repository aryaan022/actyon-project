import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#1f1f1f] px-6 py-10" aria-label="Site footer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect width="20" height="20" rx="5" fill="#0066FF" />
                <path
                  d="M6 10.5L8.5 13L14 7"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-white font-semibold text-[14px] tracking-tight">FlowPilot</span>
            </div>
            <p className="text-[13px] text-[#525252] max-w-[220px] leading-relaxed">
              The workspace built for teams that ship.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((group) => (
              <div key={group.heading} className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold text-[#525252] uppercase tracking-wider">
                  {group.heading}
                </p>
                {group.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="text-[13px] text-[#737373] hover:text-white transition-colors duration-150"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-[#525252]">
            © 2025 FlowPilot, Inc. — Built with intention.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Security"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[12px] text-[#525252] hover:text-[#737373] transition-colors duration-150"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinks = [
  {
    heading: "Product",
    links: ["Features", "Changelog", "Roadmap", "Pricing"],
  },
  {
    heading: "Docs",
    links: ["Get Started", "API Reference", "Integrations", "Security"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
];
