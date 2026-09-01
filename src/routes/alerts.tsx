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
          <FilterBar filters={filters} onChange={setFilters} />
          <RiskSelect value={filters.severity} onChange={(severity) => setFilters({ ...filters, severity })} />
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

function RiskSelect({
  value,
  onChange,
}: {
  value: Filters["severity"];
  onChange: (value: Filters["severity"]) => void;
}) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Filters["severity"])}
        className="h-9 w-full min-w-44 cursor-pointer appearance-none rounded-full border border-input bg-card px-4 pr-10 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40 xl:w-auto"
      >
        {RISK_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
