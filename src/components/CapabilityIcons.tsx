/* Bespoke line-based capability icons — thin stroke, gold accent, editorial */
type IconProps = { className?: string };

const base = "h-8 w-8 text-accent transition group-hover:text-accent";

export function IconPaidMedia({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1" stroke="currentColor" className={`${base} ${className}`} aria-hidden>
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="6.5" />
      <circle cx="16" cy="16" r="2" />
      <path d="M16 3.5v3M16 25.5v3M3.5 16h3M25.5 16h3" />
      <path d="M22.5 9.5l3.5-3.5" />
      <path d="M23 9h3V6" />
    </svg>
  );
}

export function IconDemandGen({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1" stroke="currentColor" className={`${base} ${className}`} aria-hidden>
      <circle cx="6" cy="8" r="2" />
      <circle cx="6" cy="24" r="2" />
      <circle cx="16" cy="16" r="2.5" />
      <circle cx="26" cy="10" r="2" />
      <circle cx="26" cy="22" r="2" />
      <path d="M8 8.8l6 6.2M8 23.2l6-6.2M18 15l6-4.2M18 17l6 4.2" />
    </svg>
  );
}

export function IconAnalytics({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1" stroke="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M4 26h24" />
      <path d="M4 26V6" />
      <path d="M8 22v-6M14 22v-10M20 22v-4M26 22v-14" />
      <circle cx="8" cy="16" r="1" />
      <circle cx="14" cy="12" r="1" />
      <circle cx="20" cy="18" r="1" />
      <circle cx="26" cy="8" r="1" />
    </svg>
  );
}

export function IconOptimisation({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1" stroke="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M4 24C10 24 12 8 20 8" />
      <path d="M20 8h6v6" />
      <path d="M4 28h24" />
      <path d="M20 8l6 6" strokeDasharray="1 2" />
    </svg>
  );
}

export function IconLeadership({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1" stroke="currentColor" className={`${base} ${className}`} aria-hidden>
      <circle cx="16" cy="9" r="3" />
      <circle cx="7" cy="20" r="2.5" />
      <circle cx="25" cy="20" r="2.5" />
      <path d="M16 12v6" />
      <path d="M9 20h6M17 20h6" />
      <path d="M11 27c1-2 3-3 5-3s4 1 5 3" />
      <path d="M2 27c1-2 3-3 5-3M20 27c1-2 3-3 5-3" />
    </svg>
  );
}
