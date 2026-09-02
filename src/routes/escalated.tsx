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
...
      toolbar={<FilterBar filters={filters} onChange={setFilters} total={rows.length} />}
    >
      <CaseList cases={rows} emptyLabel="Nothing has been escalated under these filters." />
    </AppShell>
  );
}
