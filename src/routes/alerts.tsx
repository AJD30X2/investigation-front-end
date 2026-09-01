import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
      toolbar={<FilterBar filters={filters} onChange={setFilters} />}
    >
      <CaseList cases={rows} emptyLabel="No alerts match the current filters." />
    </AppShell>
  );
}
