import type { Disposition } from "@/lib/cases";

export type Filters = {
  disposition: Disposition | "all";
  severity: "all" | "low" | "medium" | "high";
  query: string;
};

const DISPOSITIONS: { key: Disposition | "all"; label: string }[] = [
  { key: "all", label: "All actions" },
  { key: "block", label: "Block" },
  { key: "monitor", label: "Monitor" },
  { key: "escalate", label: "Escalate" },
];

const SEVERITIES: Filters["severity"][] = ["all", "low", "medium", "high"];

export function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-1.5 rounded-full bg-muted p-1">
        {DISPOSITIONS.map((d) => (
          <button
            key={d.key}
            onClick={() => onChange({ ...filters, disposition: d.key })}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filters.disposition === d.key
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 rounded-full bg-muted p-1">
        {SEVERITIES.map((s) => (
          <button
            key={s}
            onClick={() => onChange({ ...filters, severity: s })}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
              filters.severity === s
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "all" ? "Any risk" : s}
          </button>
        ))}
      </div>

      <input
        value={filters.query}
        onChange={(e) => onChange({ ...filters, query: e.target.value })}
        placeholder="Search client, alert ID or reason"
        className="h-9 min-w-56 flex-1 rounded-full border border-input bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}

export function applyFilters<T extends { disposition: Disposition; severity: string; client: string; id: string; alertReason: string }>(
  rows: T[],
  f: Filters,
) {
  const q = f.query.trim().toLowerCase();
  return rows.filter(
    (r) =>
      (f.disposition === "all" || r.disposition === f.disposition) &&
      (f.severity === "all" || r.severity === f.severity) &&
      (!q ||
        r.client.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.alertReason.toLowerCase().includes(q)),
  );
}
