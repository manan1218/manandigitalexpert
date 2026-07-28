import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { useState } from "react";
import introVideo from "@/assets/intro.mp4.asset.json";
import cvAsset from "@/assets/cv.pdf.asset.json";
import { HeroVideo } from "@/components/HeroVideo";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import { CoreContributions } from "@/components/CoreContributions";
import {
  IconPaidMedia,
  IconDemandGen,
  IconAnalytics,
  IconOptimisation,
  IconLeadership,
} from "@/components/CapabilityIcons";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";

const capabilityIconMap = {
  paid: IconPaidMedia,
  demand: IconDemandGen,
  analytics: IconAnalytics,
  optim: IconOptimisation,
  lead: IconLeadership,
} as const;

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- Reusable placeholder container ---------- */
function Placeholder({
  label,
  hint,
  aspect = "aspect-video",
  className = "",
}: {
  label: string;
  hint?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden rounded-lg border border-dashed border-hairline bg-surface ${className}`}
    >
      <div className="absolute inset-0 grain" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 49.5%, var(--color-hairline) 49.5%, var(--color-hairline) 50.5%, transparent 50.5%)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          [ Placeholder ]
        </span>
        <span className="font-display text-lg text-ink">{label}</span>
        {hint ? (
          <span className="max-w-xs text-xs text-ink-muted">{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- Small primitives ---------- */
function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline justify-between border-b border-hairline pb-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-ink-muted">{n}</span>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
      </div>
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted sm:inline">
        Manan Gupta / 2026
      </span>
    </div>
  );
}

/* ---------- Data (from CV — no invented metrics) ---------- */
const experience = [
  {
    company: "Capella Hotels & Resorts",
    location: "Bangkok",
    role: "Digital Marketing Manager",
    period: "Dec 2023 — Present",
    bullets: [
      "Manages $35,000+ monthly digital budget across Google, Meta and programmatic — driving 10–15% ROAS uplift.",
      "Partners with Revenue on geo-level insights to sharpen targeting across top source markets.",
      "Optimizes full-funnel campaigns (Search, Display, PMAX, YouTube, Meta) — increasing direct bookings, reducing OTA reliance.",
      "Leads Meta/IG social advertising for Capella Bangkok and its F&B outlets.",
    ],
  },
  {
    company: "Capgemini India",
    location: "Gurugram",
    role: "Team Manager — Digital Media",
    period: "Jan 2022 — Present",
    bullets: [
      "Owns €100,000+ media budget across Capgemini Romania, UK & Germany — LinkedIn Lead Gen at < €150 CPL.",
      "Delivered ~$90 CPL for Capgemini UK through audience refinement, creative testing and bid optimization.",
      "Leads and mentors a team of 5 specialists across planning, execution and reporting.",
      "Owns full-funnel campaign lifecycle — strategy, targeting architecture, creative direction, optimization.",
    ],
  },
  {
    company: "Watermark Marketing Management",
    location: "Dubai",
    role: "Digital Marketing Manager",
    period: "Jul 2020 — Jul 2021",
    bullets: [
      "Built and executed multi-channel strategies across Google, Meta, SEO, remarketing and EDMs for diverse clients.",
      "Owned campaign lifecycle end-to-end — strategy, budgeting, optimization and reporting.",
      "Ran CRO analysis and A/B testing to improve conversion paths.",
    ],
  },
  {
    company: "Grand Millennium Al Wahda",
    location: "Abu Dhabi",
    role: "E-Commerce Specialist",
    period: "Aug 2018 — Jul 2020",
    bullets: [
      "Developed digital media strategy: Google Ads, remarketing, SEO, EDMs and website updates.",
      "Evaluated brand website performance and advised on promotion and web presence.",
      "Executed paid social across Facebook, Instagram, LinkedIn, Twitter and YouTube.",
    ],
  },
  {
    company: "Sapient Razorfish",
    location: "India",
    role: "Social Media Community Manager",
    period: "Jun 2017 — Aug 2018",
    bullets: [
      "Led social strategy, campaign management and analytics for major client accounts.",
      "Ran paid campaigns across Facebook, Twitter, Instagram and YouTube plus Search & Display.",
    ],
  },
  {
    company: "Sprinklr Solutions",
    location: "India",
    role: "Social Media Community Manager",
    period: "Jun 2015 — Jun 2017",
    bullets: [
      "Developed and managed social campaigns across Facebook, Twitter, Instagram and YouTube.",
      "Built client audience-profile databases and reported campaign impact via the Sprinklr platform.",
    ],
  },
];

const skills = [
  "Performance Marketing (PPC, SEM, Display)",
  "Social Advertising — Meta, LinkedIn, YouTube",
  "Google Analytics (GA4) & A/B Testing",
  "Conversion Rate Optimization & ROI Tracking",
  "SEO, Remarketing & Email",
  "E-Commerce & OTA Channel Management",
  "Budget Management & Campaign Optimization",
  "Team Leadership & Cross-functional Delivery",
];

const certs = [
  "Google Certified Search Advertiser",
  "Google Certified GA4 Analyst",
  "Coursera Certified Meta Advertiser",
  "HubSpot Certified Inbound Marketer",
  "Sprinklr Certified Social Listener",
  "Udemy Certified Programmatic Advertiser",
];

const impact: { k: string; v: string; highlight?: boolean }[] = [
  { k: "12+", v: "Years leading growth" },
  { k: "$35K+", v: "Monthly media budget, hospitality brand", highlight: true },
  { k: "€250K+", v: "Media budget managed, Capgemini EU" },
  { k: "10–15%", v: "ROAS uplift, hospitality" },
  { k: "$500K+", v: "Room revenue growth, Capella", highlight: true },
  { k: "<€150", v: "LinkedIn Lead Gen CPL" },
];

const companies: { name: string; location?: string }[] = [
  { name: "Capella Hotels & Resorts", location: "Bangkok" },
  { name: "Millennium Hotels", location: "Abu Dhabi" },
  { name: "Watermark Marketing Agency", location: "Dubai" },
  { name: "Capgemini", location: "Europe" },
  { name: "Publicis", location: "India" },
  { name: "Sprinklr", location: "India" },
  { name: "Sapient Razorfish", location: "India" },
];

const capabilities = [
  {
    n: "01",
    name: "Paid Media & Acquisition",
    desc: "Google Ads · Meta Ads · LinkedIn Ads",
    Icon: "paid",
  },
  {
    n: "02",
    name: "Demand Generation",
    desc: "Building qualified B2B pipeline",
    Icon: "demand",
  },
  {
    n: "03",
    name: "Analytics & Measurement",
    desc: "GA4 · GTM · Conversion Tracking",
    Icon: "analytics",
  },
  {
    n: "04",
    name: "Media Investment Optimisation",
    desc: "Improving ROAS · CPL · Budget Efficiency",
    Icon: "optim",
  },
  {
    n: "05",
    name: "Agency & Stakeholder Leadership",
    desc: "Strategy · Governance · Execution",
    Icon: "lead",
  },
] as const;

const markets = [
  { name: "APAC", desc: "Asia Pacific" },
  { name: "Middle East", desc: "GCC & Regional Markets" },
  { name: "India", desc: "Indian Subcontinent" },
  { name: "Europe", desc: "European Markets" },
];

/* ---------- Page ---------- */
function Index() {
  const [openStudy, setOpenStudy] = useState<CaseStudy | null>(null);
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="relative z-40 border-b border-hairline bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <a href="#top" className="flex items-baseline gap-3">
            <span className="font-display text-lg text-ink">Manan Gupta</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted sm:inline">
              Growth × Performance
            </span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted md:flex">
            <a href="#work" className="hover:text-ink">Work</a>
            <a href="#impact" className="hover:text-ink">Impact</a>
            <a href="#experience" className="hover:text-ink">Experience</a>
            <a href="#certifications" className="hover:text-ink">Certs</a>
            <a href="#contact" className="hover:text-ink">Contact</a>
          </nav>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-foreground transition hover:bg-accent/90"
          >
            Let's talk
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative border-b border-hairline">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-16 pt-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pt-24">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted reveal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              Available for new mandates — Q3 2026
            </div>
            <h1
              className="font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-[7.5rem] reveal"
              style={{ animationDelay: "80ms" }}
            >
              Growth,
              <br />
              <span className="italic text-accent">measured</span> in
              <br />
              bookings & pipeline.
            </h1>
            <p
              className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg reveal"
              style={{ animationDelay: "180ms" }}
            >
              I'm Manan — a Growth & Performance Marketing Leader with 12+ years
              across hospitality, global enterprise and agency. I design paid
              media systems that move real numbers: ROAS, CPL, direct bookings,
              qualified pipeline.
            </p>
            <div
              className="mt-10 flex flex-wrap items-center gap-3 reveal"
              style={{ animationDelay: "280ms" }}
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-background transition hover:bg-accent hover:text-accent-foreground"
              >
                See selected work
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink hover:border-ink"
              >
                Book an intro call
              </a>
              <a
                href={cvAsset.url}
                download
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted underline decoration-hairline underline-offset-4 transition hover:text-ink"
              >
                <Download className="h-3.5 w-3.5" />
                Download CV
              </a>
            </div>
          </div>

          {/* Portrait/Video container */}
          <div className="lg:col-span-5">
            <div className="relative reveal" style={{ animationDelay: "220ms" }}>
              <HeroVideo src={introVideo.url} />
              <div className="absolute -bottom-4 -left-4 hidden rounded-md border border-hairline bg-surface-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted sm:block">
                REEL / INTRO
              </div>
            </div>
          </div>
        </div>

        {/* Companies worked with — static showcase */}
        <div className="border-t border-hairline">
          <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
            <div className="mb-10 flex items-baseline justify-between border-b border-hairline pb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
                Companies worked with
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted sm:inline">
                Selected
              </span>
            </div>

            {/* Row 1: 3 companies */}
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {companies.slice(0, 3).map((c) => (
                <div
                  key={c.name}
                  className="group border-t border-hairline pt-6 transition"
                >
                  <div className="font-display text-2xl leading-tight text-ink-muted transition group-hover:text-ink sm:text-3xl">
                    {c.name}
                  </div>
                  {c.location ? (
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                      {c.location}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Row 2: 2 companies, centered on desktop */}
            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="hidden lg:block" aria-hidden />
              {companies.slice(3, 5).map((c) => (
                <div
                  key={c.name}
                  className="group border-t border-hairline pt-6 transition"
                >
                  <div className="font-display text-2xl leading-tight text-ink-muted transition group-hover:text-ink sm:text-3xl">
                    {c.name}
                  </div>
                  {c.location ? (
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                      {c.location}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Row 3: 2 companies, centered on desktop */}
            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="hidden lg:block" aria-hidden />
              {companies.slice(5, 7).map((c) => (
                <div
                  key={c.name}
                  className="group border-t border-hairline pt-6 transition"
                >
                  <div className="font-display text-2xl leading-tight text-ink-muted transition group-hover:text-ink sm:text-3xl">
                    {c.name}
                  </div>
                  {c.location ? (
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                      {c.location}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <SectionLabel n="01 / Impact" title="Business impact, in real numbers." />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-3">
            {impact.map((i) => (
              <div key={i.v} className="group relative bg-background p-8 transition hover:bg-surface">
                <div
                  className={`font-display text-5xl transition sm:text-6xl ${
                    i.highlight ? "text-accent" : "text-ink"
                  }`}
                >
                  {i.k}
                </div>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  {i.v}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-ink-muted">
            Figures reflect current and past engagements. Detailed case studies
            available on request or in the selected work below.
          </p>
        </div>
      </section>

      {/* WHERE I CREATE VALUE + MARKET EXPERIENCE */}
      <section id="capabilities" className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <SectionLabel n="02 / Capabilities" title="Where I create value." />
          <div className="mb-10 -mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            Core capabilities
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((c, idx) => {
              const Icon = capabilityIconMap[c.Icon];
              return (
                <div
                  key={c.n}
                  className="group relative bg-background p-8 transition hover:bg-surface reveal"
                  style={{ animationDelay: `${idx * 90}ms` }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Icon />
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                      {c.n}
                    </span>
                  </div>
                  <h3 className="font-display text-xl leading-tight text-ink transition group-hover:text-accent sm:text-2xl">
                    {c.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Market experience subsection */}
          <div className="mt-20 border-t border-hairline pt-12">
            <div className="mb-10 flex items-baseline justify-between">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
                  Market experience
                </span>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted sm:inline">
                Regions of operation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline lg:grid-cols-4">
              {markets.map((m) => (
                <div key={m.name} className="group bg-background p-8 transition hover:bg-surface">
                  <div className="font-display text-3xl leading-tight text-ink transition group-hover:text-accent sm:text-4xl">
                    {m.name}
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK / CASE STUDIES */}
      <section id="work" className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <SectionLabel n="03 / Selected work" title="Case studies." />

          <div className="space-y-24">
            {caseStudies.map((study, idx) => {
              const n = idx + 1;
              const flipped = n % 2 === 0;
              return (
                <article
                  key={study.id}
                  className="group grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  <button
                    type="button"
                    onClick={() => setOpenStudy(study)}
                    aria-label={`Open case study: ${study.title}`}
                    className={`block lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-hairline bg-surface">
                      <img
                        src={study.banner}
                        alt={`${study.title} banner`}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/0 opacity-0 transition group-hover:opacity-100" />
                      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-ink opacity-0 backdrop-blur transition group-hover:opacity-100">
                        Open case study
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </button>
                  <div
                    className={`flex flex-col justify-center lg:col-span-5 ${
                      flipped ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                      Case {String(n).padStart(2, "0")} · {study.eyebrow}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenStudy(study)}
                      className="mt-4 text-left"
                    >
                      <h3 className="font-display text-3xl leading-tight text-ink transition group-hover:text-accent sm:text-4xl">
                        {study.title}
                      </h3>
                    </button>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                      {study.summary}
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {study.highlights.map((h) => (
                        <div
                          key={h.v}
                          className="rounded-md border border-hairline bg-surface p-3"
                        >
                          <div className="font-display text-xl text-ink">{h.k}</div>
                          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                            {h.v}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenStudy(study)}
                      className="group/link mt-8 inline-flex items-center gap-2 self-start border-b border-hairline pb-1 font-mono text-[11px] uppercase tracking-[0.24em] text-ink hover:border-accent hover:text-accent"
                    >
                      Read the full study
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <SectionLabel n="04 / Experience" title="Twelve years, six companies, four countries." />

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <CoreContributions className="lg:sticky lg:top-24" />
            </div>
            <ol className="relative space-y-14 lg:col-span-8">
              {experience.map((e, idx) => (
                <li
                  key={e.company}
                  className="relative grid grid-cols-12 gap-4 border-t border-hairline pt-8"
                >
                  <div className="col-span-12 md:col-span-3">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                      {String(idx + 1).padStart(2, "0")} · {e.period}
                    </div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                      {e.location}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="font-display text-2xl text-ink sm:text-3xl">
                      {e.company}
                    </h3>
                    <div className="mt-1 text-sm text-accent">{e.role}</div>
                    <ul className="mt-5 space-y-3">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                          <span className="mt-2 h-px w-4 shrink-0 bg-hairline" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* EXPERTISE + CERTS */}
      <section id="certifications" className="border-b border-hairline">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <SectionLabel n="05 / Expertise" title="Core skills." />
            <ul className="space-y-4">
              {skills.map((s, i) => (
                <li
                  key={s}
                  className="flex items-baseline gap-4 border-b border-hairline pb-4"
                >
                  <span className="font-mono text-[10px] text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg text-ink sm:text-xl">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel n="06 / Certifications" title="Credentials." />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certs.map((c) => (
                <div
                  key={c}
                  className="group relative overflow-hidden rounded-lg border border-hairline bg-surface p-5 transition hover:border-accent"
                >
                  <div className="mb-4">
                    <Placeholder
                      aspect="aspect-[16/9]"
                      label="Cert badge"
                      hint="Drop PNG/SVG badge here."
                    />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    Certification
                  </div>
                  <div className="mt-1 font-display text-base text-ink">
                    {c}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-12 lg:px-10 lg:py-32">
          <div className="lg:col-span-7">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              07 / Contact
            </div>
            <h2 className="mt-6 font-display text-5xl leading-[1] tracking-tight text-ink sm:text-7xl lg:text-[6rem]">
              Let's build the
              <br />
              next <span className="italic text-accent">growth chapter</span>.
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-muted">
              Full-time, consulting mandates or advisory — if you're serious
              about performance, I'd love to hear about the challenge.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:mananrgupta@gmail.com?subject=Intro%20call"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-accent-foreground transition hover:bg-ink hover:text-background"
              >
                Book an intro call
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={cvAsset.url}
                download
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink transition hover:border-ink"
              >
                <Download className="h-3.5 w-3.5" />
                Download CV
              </a>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-lg border border-hairline bg-surface p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                Coordinates
              </div>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-center gap-3 text-ink">
                  <MapPin className="h-4 w-4 text-accent" />
                  New Delhi, India · Bangkok, Thailand
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-dashed border-hairline p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                Currently
              </div>
              <p className="mt-3 font-display text-lg text-ink">
                Leading digital at Capella Hotels & Resorts, Bangkok — while
                managing global performance media for Capgemini across Europe.
              </p>
            </div>
          </aside>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
        />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-10 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted lg:flex-row lg:items-center lg:px-10">
          <div>© 2026 Manan Gupta — All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-ink">Back to top ↑</a>
            <a href={cvAsset.url} download className="hover:text-ink">Download CV</a>
          </div>
        </div>
      </footer>

      <CaseStudyModal study={openStudy} onClose={() => setOpenStudy(null)} />
    </main>
  );
}
