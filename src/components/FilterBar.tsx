import { FolderOpen } from "lucide-react";
import type { Disposition, WorkStatus } from "@/lib/cases";

export type Filters = {
  disposition: Disposition | "all";
  severity: "all" | "low" | "medium" | "high";
  workStatus: WorkStatus | "all";
  query: string;
};

export function FilterBar({
  filters,
  onChange,
  total,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  total: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex h-9 items-center gap-2 rounded-full bg-muted px-4 text-xs font-medium text-muted-foreground">
        <FolderOpen className="size-3.5" />
        <span className="text-sm font-semibold text-foreground">{total}</span>
        {total === 1 ? "case" : "cases"} total
      </span>

      <input
        value={filters.query}
        onChange={(e) => onChange({ ...filters, query: e.target.value })}
        placeholder="Search client, alert ID or reason"
        className="h-9 min-w-56 flex-1 rounded-full border border-input bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}

export function applyFilters<
  T extends {
    disposition: Disposition;
    severity: string;
    workStatus: WorkStatus;
    client: string;
    id: string;
    alertReason: string;
  },
>(rows: T[], f: Filters) {
  const q = f.query.trim().toLowerCase();
  return rows.filter(
    (r) =>
      (f.disposition === "all" || r.disposition === f.disposition) &&
      (f.severity === "all" || r.severity === f.severity) &&
      (f.workStatus === "all" || r.workStatus === f.workStatus) &&
      (!q ||
        r.client.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.alertReason.toLowerCase().includes(q)),
  );
}
