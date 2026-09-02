import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CaseList } from "@/components/CaseList";
import { applyFilters, FilterBar, type Filters } from "@/components/FilterBar";
import { CASES } from "@/lib/cases";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Reference Cases — Sentinel Investigation Desk" },
      {
        name: "description",
        content:
          "Cases stored for later reference, kept for typology comparison and continuing activity review.",
      },
      { property: "og:title", content: "Reference Cases — Sentinel" },
      {
        property: "og:description",
        content: "Saved financial crime cases retained for future comparison and review.",
      },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const [filters, setFilters] = useState<Filters>({
    disposition: "all",
    severity: "all",
    workStatus: "all",
    query: "",
  });
...
      toolbar={<FilterBar filters={filters} onChange={setFilters} total={rows.length} />}
    >
      <CaseList cases={rows} emptyLabel="No saved cases match these filters." />
    </AppShell>
  );
}
