import { useEffect, useRef } from "react";
import { X, Check, TrendingUp, ArrowUpRight } from "lucide-react";
import type { CaseStudy, CaseStudySection } from "@/lib/case-studies";
import { CASE_STUDY_PATHWAYS, useGrowthFramework } from "@/lib/growth-framework";

type Props = {
  study: CaseStudy | null;
  onClose: () => void;
};

function SectionBlock({ section }: { section: CaseStudySection }) {
  return (
    <section className="border-t border-hairline pt-8">
      <h3 className="font-display text-2xl text-ink sm:text-3xl">
        {section.heading}
      </h3>

      {section.body && section.body.length > 0 ? (
        <div className="mt-5 space-y-4">
          {section.body.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-ink-muted sm:text-[17px]">
              {p}
            </p>
          ))}
        </div>
      ) : null}

      {section.items && section.items.length > 0 ? (
        section.kind === "checks" ? (
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {section.items.map((it) => (
              <li
                key={it}
                className="flex items-start gap-3 rounded-md border border-hairline bg-surface p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-ink">{it}</span>
              </li>
            ))}
          </ul>
        ) : section.kind === "impact" ? (
          <ul className="mt-6 grid grid-cols-1 gap-3">
            {section.items.map((it) => (
              <li
                key={it}
                className="flex items-start gap-4 rounded-md border border-hairline bg-surface p-5"
              >
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-base leading-relaxed text-ink">{it}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-6 space-y-3">
            {section.items.map((it) => (
              <li key={it} className="flex gap-4 text-[15px] leading-relaxed text-ink-muted">
                <span className="mt-2 h-px w-5 shrink-0 bg-accent" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        )
      ) : null}

      {section.subsections && section.subsections.length > 0 ? (
        <div className="mt-8 space-y-8">
          {section.subsections.map((sub) => (
            <div key={sub.heading} className="rounded-lg border border-hairline bg-surface p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                {sub.heading}
              </div>
              {sub.body?.map((p, i) => (
                <p key={i} className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
              {sub.items ? (
                <ul className="mt-4 space-y-3">
                  {sub.items.map((it) => (
                    <li key={it} className="flex gap-4 text-[15px] leading-relaxed text-ink-muted">
                      <span className="mt-2 h-px w-5 shrink-0 bg-accent" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function CaseStudyModal({ study, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { setOverride } = useGrowthFramework();

  useEffect(() => {
    if (!study) return;

    // Activate case-study specific pathway on the Growth Framework
    const pathway = CASE_STUDY_PATHWAYS[study.id];
    if (pathway) setOverride(pathway);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Lock body scroll while preserving position
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
      setOverride(null);
    };
  }, [study, onClose, setOverride]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[100] flex items-stretch justify-center"
    >
      {/* Backdrop */}
      <button
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-fade-in"
        style={{ animationDuration: "220ms" }}
      />

      {/* Panel */}
      <div
        ref={scrollRef}
        className="relative z-10 h-full w-full overflow-y-auto bg-background"
        style={{
          animation: "reveal 420ms cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 z-20 border-b border-hairline bg-background/85 backdrop-blur">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-10">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                {study.eyebrow}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted sm:inline">
                Case Study
              </span>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="group inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted transition hover:border-accent hover:text-accent"
              aria-label="Close (Esc)"
            >
              <span className="hidden sm:inline">Esc</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Hero */}
        <header className="border-b border-hairline">
          <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-12 lg:px-10 lg:pt-16">
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                {study.eyebrow}
              </div>
              <h1
                id="case-study-title"
                className="mt-5 font-display text-4xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]"
              >
                {study.title}
              </h1>
              <p className="mt-6 font-display text-xl italic text-ink-muted sm:text-2xl">
                {study.subtitle}
              </p>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                {study.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {study.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-xl border border-hairline bg-surface">
              <div className="relative aspect-[16/9] w-full">
                <img
                  src={study.banner}
                  alt={`${study.title} banner`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            {study.highlights.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3">
                {study.highlights.map((h) => (
                  <div key={h.v} className="bg-background p-6">
                    <div className="font-display text-3xl text-accent sm:text-4xl">{h.k}</div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                      {h.v}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                  In this study
                </div>
                <ul className="mt-4 space-y-2">
                  {study.sections.map((s) => (
                    <li
                      key={s.heading}
                      className="text-sm text-ink-muted"
                    >
                      · {s.heading}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="space-y-12 lg:col-span-9">
              {study.sections.map((s) => (
                <SectionBlock key={s.heading} section={s} />
              ))}

              {study.takeaway ? (
                <section className="border-t border-hairline pt-10">
                  <div className="rounded-xl border border-accent/40 bg-accent/5 p-8">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                      Key Takeaway
                    </div>
                    <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
                      {study.takeaway}
                    </p>
                  </div>
                </section>
              ) : null}

              <section className="border-t border-hairline pt-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                  Core Competencies
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.competencies.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </section>

              <section className="border-t border-hairline pt-10">
                <button
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-accent-foreground transition hover:bg-ink hover:text-background"
                >
                  Close case study
                  <ArrowUpRight className="h-3.5 w-3.5 rotate-90 transition group-hover:-translate-y-0.5" />
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
