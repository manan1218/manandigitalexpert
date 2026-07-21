import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  FRAMEWORK_NODES,
  useGrowthFramework,
  type NodeId,
} from "@/lib/growth-framework";

/**
 * Fixed side visualization of the Growth Framework.
 * Reacts to the current section / open case study via context.
 * Desktop only (>= lg) to avoid clutter on mobile.
 */
export function GrowthFramework() {
  const { state } = useGrowthFramework();
  const [collapsed, setCollapsed] = useState(false);

  const active = new Set<NodeId>(state.pathway);
  const orderIndex = new Map<NodeId, number>(
    state.pathway.map((id, i) => [id, i])
  );

  const nodeCount = FRAMEWORK_NODES.length;
  const rowH = 44; // px per node row
  const padY = 16;
  const svgH = nodeCount * rowH;

  return (
    <aside
      aria-label="Growth Framework"
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div
        className={`pointer-events-auto relative rounded-2xl border border-hairline bg-background/85 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-500 ${
          collapsed ? "w-[54px]" : "w-[240px]"
        }`}
      >
        {/* Header */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-between gap-2 border-b border-hairline px-4 py-3 text-left"
          aria-label={collapsed ? "Expand Growth Framework" : "Collapse Growth Framework"}
        >
          <div className={`min-w-0 ${collapsed ? "hidden" : "block"}`}>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
              Growth Framework
            </div>
            <div className="mt-0.5 truncate font-display text-[13px] text-ink">
              {state.label}
            </div>
          </div>
          <ChevronRight
            className={`h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300 ${
              collapsed ? "" : "rotate-180"
            }`}
          />
        </button>

        {/* Body */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            collapsed ? "max-h-0 opacity-0" : "max-h-[600px] opacity-100"
          }`}
        >
          <div
            className="relative"
            style={{ padding: `${padY}px 16px` }}
          >
            {/* SVG connectors */}
            <svg
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-full w-full"
              viewBox={`0 0 240 ${svgH + padY * 2}`}
              preserveAspectRatio="none"
            >
              {FRAMEWORK_NODES.slice(0, -1).map((n, i) => {
                const from = n.id;
                const to = FRAMEWORK_NODES[i + 1].id;
                const y1 = padY + i * rowH + rowH / 2 + 6;
                const y2 = padY + (i + 1) * rowH + rowH / 2 - 6;
                const fromIdx = orderIndex.get(from);
                const toIdx = orderIndex.get(to);
                const isPathwayLink =
                  state.mode === "sequence" &&
                  fromIdx !== undefined &&
                  toIdx !== undefined &&
                  toIdx === fromIdx + 1;
                const isActive =
                  state.mode === "all" ||
                  state.mode === "converge" ||
                  isPathwayLink;
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={26}
                    y1={y1}
                    x2={26}
                    y2={y2}
                    className={
                      isActive
                        ? "stroke-accent"
                        : "stroke-hairline"
                    }
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeDasharray={
                      state.mode === "converge" ? "3 3" : undefined
                    }
                    style={
                      state.mode === "converge"
                        ? {
                            animation: "gf-dash 1.6s linear infinite",
                          }
                        : undefined
                    }
                  />
                );
              })}
            </svg>

            <ul className="relative space-y-0">
              {FRAMEWORK_NODES.map((node, i) => {
                const isActive = active.has(node.id);
                const isGrowthNode = node.id === "growth";
                const glow =
                  state.mode === "converge" || isActive;
                const seqIndex =
                  state.mode === "sequence"
                    ? orderIndex.get(node.id)
                    : undefined;

                return (
                  <li
                    key={node.id}
                    className="relative flex items-center gap-3"
                    style={{ height: rowH }}
                  >
                    <span
                      className={`relative z-10 flex h-3 w-3 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        glow
                          ? "border-accent bg-accent"
                          : "border-hairline bg-background"
                      }`}
                      style={{
                        boxShadow: glow
                          ? "0 0 0 4px color-mix(in oklab, var(--color-accent) 18%, transparent), 0 0 16px color-mix(in oklab, var(--color-accent) 45%, transparent)"
                          : "none",
                        transitionDelay:
                          seqIndex !== undefined
                            ? `${seqIndex * 120}ms`
                            : `${i * 30}ms`,
                        animation:
                          state.mode === "converge" && isGrowthNode
                            ? "gf-pulse 1.8s ease-in-out infinite"
                            : undefined,
                      }}
                    />
                    <span
                      className={`text-[12px] leading-none transition-colors duration-500 ${
                        glow ? "text-ink" : "text-ink-muted/70"
                      } ${isGrowthNode ? "font-medium" : ""}`}
                      style={{
                        transitionDelay:
                          seqIndex !== undefined
                            ? `${seqIndex * 120}ms`
                            : `${i * 30}ms`,
                      }}
                    >
                      {node.label}
                      {seqIndex !== undefined ? (
                        <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em] text-accent/80">
                          {String(seqIndex + 1).padStart(2, "0")}
                        </span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer note */}
          <div className="border-t border-hairline px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
            {state.mode === "sequence"
              ? "Active pathway"
              : state.mode === "converge"
              ? "All roads → growth"
              : "All disciplines"}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gf-dash {
          to { stroke-dashoffset: -12; }
        }
        @keyframes gf-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.35); }
        }
      `}</style>
    </aside>
  );
}

/**
 * Hook: observe sections by id and update framework context when they enter viewport.
 */
export function useSectionSync(sectionIds: string[]) {
  const { setSection } = useGrowthFramework();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    // Track intersection ratios; pick the most-visible one.
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });
        let bestId: string | null = null;
        let bestR = 0;
        ratios.forEach((r, id) => {
          if (r > bestR) {
            bestR = r;
            bestId = id;
          }
        });
        if (bestId && bestR > 0) setSection(bestId);
      },
      {
        // Trigger around the vertical middle of the viewport
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, setSection]);
}
