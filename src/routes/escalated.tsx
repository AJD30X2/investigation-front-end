import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CaseList } from "@/components/CaseList";
import { applyFilters, FilterBar, type Filters } from "@/components/FilterBar";
import { CASES } from "@/lib/cases";

export const Route = createFileRoute("/escalated")({
  head: () => ({
    meta: [
      { title: "Escalated Cases — Sentinel Investigation Desk" },
      {
        name: "description",
        content:
          "Cases raised by junior analysts to senior review, with full evidence lanes unlocked at senior clearance.",
      },
      { property: "og:title", content: "Escalated Cases — Sentinel" },
      {
        property: "og:description",
        content: "Senior review queue for junior-escalated financial crime cases.",
      },
    ],
  }),
  component: EscalatedPage,
});

function EscalatedPage() {
  const [filters, setFilters] = useState<Filters>({
    disposition: "all",
    severity: "all",
    workStatus: "all",
    query: "",
  });
  const rows = applyFilters(
    CASES.filter((c) => c.status === "escalated" || Boolean(c.escalatedBy)),
    filters,
  );

  return (
    <AppShell
      title="Escalated to senior"
      subtitle="Every case a junior analyst raised for senior judgement, with the escalating analyst on record."
      toolbar={<FilterBar filters={filters} onChange={setFilters} total={rows.length} />}
    >
      <CaseList cases={rows} emptyLabel="Nothing has been escalated under these filters." />
    </AppShell>
  );
}
