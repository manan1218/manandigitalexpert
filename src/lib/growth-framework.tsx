import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type NodeId =
  | "strategy"
  | "audience"
  | "performance"
  | "measurement"
  | "optimization"
  | "growth";

export const FRAMEWORK_NODES: { id: NodeId; label: string }[] = [
  { id: "strategy", label: "Business Strategy" },
  { id: "audience", label: "Audience Strategy" },
  { id: "performance", label: "Performance Marketing" },
  { id: "measurement", label: "Measurement" },
  { id: "optimization", label: "Optimization" },
  { id: "growth", label: "Business Growth" },
];

export type FrameworkMode = "sequence" | "all" | "converge";

export type FrameworkState = {
  pathway: NodeId[];
  mode: FrameworkMode;
  label: string;
};

const DEFAULT_STATE: FrameworkState = {
  pathway: FRAMEWORK_NODES.map((n) => n.id),
  mode: "all",
  label: "Growth Framework",
};

// Per-section defaults
export const SECTION_STATES: Record<string, FrameworkState> = {
  top: DEFAULT_STATE,
  impact: {
    pathway: ["growth", "measurement", "optimization"],
    mode: "sequence",
    label: "Business Impact",
  },
  work: {
    pathway: FRAMEWORK_NODES.map((n) => n.id),
    mode: "all",
    label: "Selected Work",
  },
  experience: {
    pathway: FRAMEWORK_NODES.map((n) => n.id),
    mode: "all",
    label: "Career Journey",
  },
  certifications: {
    pathway: FRAMEWORK_NODES.map((n) => n.id),
    mode: "all",
    label: "Continuous Learning",
  },
  contact: {
    pathway: FRAMEWORK_NODES.map((n) => n.id),
    mode: "converge",
    label: "All Roads → Growth",
  },
};

// Per-case-study pathways
export const CASE_STUDY_PATHWAYS: Record<string, FrameworkState> = {
  "cs-01": {
    pathway: ["strategy", "audience", "performance", "optimization", "growth"],
    mode: "sequence",
    label: "Click-to-Book Framework",
  },
  "cs-02": {
    pathway: ["audience", "performance", "measurement", "growth"],
    mode: "sequence",
    label: "Enterprise Lead Generation",
  },
  "cs-03": {
    pathway: ["strategy", "audience", "performance", "measurement", "growth"],
    mode: "sequence",
    label: "Audience Intelligence & Full-Funnel",
  },
  "cs-04": {
    pathway: ["measurement", "optimization", "growth"],
    mode: "sequence",
    label: "Conversion Optimization",
  },
  "cs-05": {
    pathway: ["strategy", "audience", "performance", "optimization", "growth"],
    mode: "sequence",
    label: "Direct Booking Growth",
  },
};

type Ctx = {
  state: FrameworkState;
  setSection: (id: string) => void;
  setOverride: (state: FrameworkState | null) => void;
};

const FrameworkContext = createContext<Ctx | null>(null);

export function GrowthFrameworkProvider({ children }: { children: ReactNode }) {
  const [section, setSection] = useState<string>("top");
  const [override, setOverride] = useState<FrameworkState | null>(null);

  const value = useMemo<Ctx>(
    () => ({
      state: override ?? SECTION_STATES[section] ?? DEFAULT_STATE,
      setSection,
      setOverride,
    }),
    [section, override]
  );

  return <FrameworkContext.Provider value={value}>{children}</FrameworkContext.Provider>;
}

export function useGrowthFramework() {
  const ctx = useContext(FrameworkContext);
  if (!ctx) throw new Error("useGrowthFramework must be used within GrowthFrameworkProvider");
  return ctx;
}
