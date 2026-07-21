import { useEffect, useRef, useState } from "react";

const CONTRIBUTIONS = [
  "Revenue Growth",
  "Demand Generation",
  "Marketing Attribution",
  "Analytics & Tracking",
  "Media Investment Optimisation",
  "Executive Dashboards",
  "Global Campaign Scaling",
  "OTA Dependency Reduction",
];

const STAGGER_MS = 120;
const ITEM_DUR_MS = 500;
const HIGHLIGHT_INTERVAL_MS = 2700;

export function CoreContributions({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  // Trigger entrance reveal once when in view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(entry.isIntersecting);
          if (entry.isIntersecting && !revealed) {
            setRevealed(true);
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  // Continuous highlight loop — only when revealed and section is visible
  useEffect(() => {
    if (!revealed || !visible) return;
    const entranceTotal =
      CONTRIBUTIONS.length * STAGGER_MS + ITEM_DUR_MS;
    let interval: ReturnType<typeof setInterval> | null = null;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setActive((i) => (i + 1) % CONTRIBUTIONS.length);
      }, HIGHLIGHT_INTERVAL_MS);
    }, entranceTotal);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [revealed, visible]);

  return (
    <div ref={rootRef} className={className}>
      <div
        className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted transition-opacity duration-500"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        Core Contributions
      </div>

      <ul className="mt-10 space-y-7">
        {CONTRIBUTIONS.map((item, i) => {
          const isActive = i === active;
          return (
            <li
              key={item}
              className="group relative pl-6"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(10px)",
                transition: `opacity ${ITEM_DUR_MS}ms ease-out, transform ${ITEM_DUR_MS}ms ease-out`,
                transitionDelay: revealed ? `${i * STAGGER_MS}ms` : "0ms",
              }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full transition-all duration-700 ease-out group-hover:opacity-100"
                style={{
                  background: isActive
                    ? "var(--accent, #2f5d3a)"
                    : "color-mix(in oklab, var(--ink, #111) 18%, transparent)",
                  boxShadow: isActive
                    ? "0 0 12px color-mix(in oklab, var(--accent, #2f5d3a) 55%, transparent)"
                    : "none",
                  transform: isActive ? "scaleY(1.05)" : "scaleY(1)",
                  opacity: isActive ? 1 : 0.55,
                }}
              />
              <span
                className="block font-display text-[1.35rem] leading-tight tracking-[-0.01em] transition-all duration-700 ease-out group-hover:text-ink sm:text-2xl"
                style={{
                  color: isActive
                    ? "var(--ink, #111)"
                    : "color-mix(in oklab, var(--ink, #111) 68%, transparent)",
                  fontWeight: isActive ? 500 : 400,
                  textShadow: isActive
                    ? "0 0 22px color-mix(in oklab, var(--accent, #2f5d3a) 18%, transparent)"
                    : "none",
                }}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CoreContributions;
