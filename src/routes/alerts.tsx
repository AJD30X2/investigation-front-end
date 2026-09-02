import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CaseList } from "@/components/CaseList";
import { applyFilters, FilterBar, type Filters } from "@/components/FilterBar";
import { CASES } from "@/lib/cases";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Suspected Alerts — Sentinel Investigation Desk" },
      {
        name: "description",
        content:
          "Triage suspected bank alerts with primary alert reasons and launch multi-agent fraud investigation on any case.",
      },
      { property: "og:title", content: "Suspected Alerts — Sentinel" },
      {
        property: "og:description",
        content: "Live bank signals routed to the junior triage desk with agent-assisted analysis.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const [filters, setFilters] = useState<Filters>({
    disposition: "all",
    severity: "all",
    workStatus: "all",
    query: "",
  });
  const rows = applyFilters(
    CASES.filter((c) => c.status === "open" || c.status === "escalated"),
    filters,
  );

  return (
    <AppShell
      title="Suspected alerts"
      subtitle="Signals received from the bank core, each with its primary alert reason. Open a case to run the agent pipeline."
      toolbar={
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <FilterBar filters={filters} onChange={setFilters} total={rows.length} />
          <div className="flex shrink-0 flex-wrap gap-2">
            <ToolbarSelect
              value={filters.severity}
              onChange={(severity) => setFilters({ ...filters, severity })}
              options={RISK_OPTIONS}
            />
            <ToolbarSelect
              value={filters.workStatus}
              onChange={(workStatus) => setFilters({ ...filters, workStatus })}
              options={STATUS_OPTIONS}
            />
          </div>
        </div>
      }
    >
      <CaseList cases={rows} emptyLabel="No alerts match the current filters." />
    </AppShell>
  );
}

const RISK_OPTIONS: { value: Filters["severity"]; label: string }[] = [
  { value: "all", label: "All risk levels" },
  { value: "high", label: "High risk" },
  { value: "medium", label: "Medium risk" },
  { value: "low", label: "Low risk" },
];

const STATUS_OPTIONS: { value: Filters["workStatus"]; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "under_review", label: "Under review" },
  { value: "closed", label: "Closed" },
];

function ToolbarSelect<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-9 w-full min-w-44 cursor-pointer appearance-none rounded-full border border-input bg-card px-4 pr-10 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40 xl:w-auto"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
