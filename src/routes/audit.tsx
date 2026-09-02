import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CaseList } from "@/components/CaseList";
import { applyFilters, FilterBar, type Filters } from "@/components/FilterBar";
import { CASES } from "@/lib/cases";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit-Ready Explanations — Sentinel Investigation Desk" },
      {
        name: "description",
        content:
          "Closed cases with a complete agent replay log and password-protected SAR/STR filing package.",
      },
      { property: "og:title", content: "Audit-Ready Explanations — Sentinel" },
      {
        property: "og:description",
        content: "Replayable reasoning chains and regulatory filing packages for closed cases.",
      },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  const [filters, setFilters] = useState<Filters>({
    disposition: "all",
    severity: "all",
    workStatus: "all",
    query: "",
  });
  const rows = applyFilters(
    CASES.filter((c) => c.status === "audit"),
    filters,
  );

  return (
    <AppShell
      title="Audit-ready explanations"
      subtitle="Cases whose reasoning chain is complete and replayable, each paired with its filing reference."
      toolbar={<FilterBar filters={filters} onChange={setFilters} total={rows.length} />}
    >
      <CaseList cases={rows} emptyLabel="No audit-ready cases match these filters." />
    </AppShell>
  );
}
