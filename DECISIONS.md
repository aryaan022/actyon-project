# Decisions

## 1. Why this approach?

**Product concept.** FlowPilot is a fictional project workspace — chosen because it's specific enough to design around (tasks, sprints, team status, shipping) without needing to invent vague enterprise copy. A narrow, believable product concept makes every section easier to write honestly.

**Visual direction.** The palette is intentionally plain: `#fafafa` background, `#111111` text, one blue accent (`#0066FF`). No gradients, no glassmorphism. The reasoning is that restraint is harder to pull off than visual noise, and landing pages that earn trust tend to look like the company actually has taste. Typography (Geist, loaded via `next/font/google`) carries most of the visual weight rather than decorative elements.

**Layout.** The hero is a two-column split — copy left, interactive product right — so the product is visible immediately without scrolling. Below that, sections alternate background between `#fafafa` and `white` to create separation without borders. Each section has a single job: show the product, explain the process, demonstrate features, address real problems, or prompt signup.

**Showing the product.** `DashboardPreview` and `ProductShowcase` both render actual structured data — tasks with statuses, progress bars, a team list, a shipped-items table, and an SVG sparkline. The reasoning: marketing copy is easy to ignore; a believable interface is harder to dismiss. Clicking a task in the hero dashboard expands a detail panel, which shows the interaction is real and not cosmetic.

**Main interaction.** The feature section (`FeatureInteraction`) uses `onMouseEnter`/`onMouseLeave` on step items to reveal detail text and highlight the corresponding node in a timeline on the right. The state is simple: `hoveredStep: number | null`. One interaction, two synchronized panels. I chose this over a more complex animation because it's immediately understandable and demonstrates how the product explains itself.

**Motion.** All animation is either a scroll-triggered opacity + translateY reveal (via `IntersectionObserver` + a `.reveal` / `.reveal.visible` CSS pair) or a staggered `setTimeout` chain on the hero. No looping, no particles, no parallax. The `task-detail` expand uses `max-height` + `opacity` transition in CSS. Motion fires once, on scroll-into-view, then stops.

**Responsiveness.** The hero grid collapses to a single column below `lg:` breakpoint. The nav switches to a hamburger menu at `md:`. The dashboard sidebar hides on small screens (`hidden sm:flex`). These were handled with Tailwind's responsive prefixes, mobile-first.

**Technical choices visible in the code.** Next.js App Router with TypeScript. Tailwind v4 (`@import "tailwindcss"` + `@theme inline` CSS variables instead of a config file). All icons are inline SVGs — no icon library dependency. No state management library. The scroll reveal uses native `IntersectionObserver`, not a third-party animation package.

---

## 2. Trade-off

All product data — tasks, team members, shipped items, sprint metrics — is hardcoded as static arrays in each component. There is no backend, no API, and no real auth flow behind the CTAs.

For a homepage challenge this was the right call. The purpose of a landing page is to communicate what the product does and why it's worth trying, not to demonstrate backend architecture. Hardcoded data lets the UI look fully realized without the overhead of a data layer that visitors will never interact with directly.

In a production version, the dashboard preview would either pull from a sandboxed demo workspace via a read-only API, or use seeded fixture data served from the same API the real app uses. The CTAs would route to an actual signup flow. The sprint summary card would be generated server-side from real project data rather than a static string.

The specific thing I did not do: implement any routing, auth, or data fetching. Every `href` is `"#"`. That is acceptable here because the brief was a landing page, not a working product.

---

## 3. AI usage

Antigravity (the IDE I am working in, which uses a Gemini model) was used to generate the initial code for all components based on a detailed prompt I wrote describing the layout, color system, component structure, and interaction behavior.

What the AI produced: the React component structure, Tailwind class names, the SVG icons, the `IntersectionObserver` scroll reveal pattern, and the initial copy.

What I reviewed and changed after generation:

- Removed all AI branding from the UI (the dashboard had "AI organized", "FlowPilot AI · Sprint summary", sparkle star icons, and a `Confidence: 83%` label — all stripped out)
- Replaced the `aiNote` field name in task data with `note` and changed the expanded note style from a blue accent panel to a neutral gray one
- Changed the page `<title>` from "AI-powered workspace for teams" to "The workspace built for teams that ship"
- Verified that the metadata, component copy, and visible UI contain no fabricated numbers (user counts, conversion rates, performance benchmarks)
- Read through each component file to confirm the technical claims in this document are accurate

The decisions about what to build — the product concept, the visual restraint, the choice of a single hover-based interaction, the "Built Around Real Problems" section instead of fake testimonials — were made by me before and during prompting. The AI generated code toward a spec I defined. I understand what is in every file.
