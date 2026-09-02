import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CaseInvestigation } from "@/components/CaseInvestigation";
import { CASES } from "@/lib/cases";

export const Route = createFileRoute("/cases/$caseId")({
  head: ({ params }) => ({
    meta: [
      { title: `Case ${params.caseId} — Sentinel Investigation Desk` },
      {
        name: "description",
        content: `Multi-agent investigation, evidence bundle and regulatory outcome for case ${params.caseId}.`,
      },
      { property: "og:title", content: `Case ${params.caseId} — Sentinel` },
      {
        property: "og:description",
        content: `Review the full agent reasoning and audit trail for case ${params.caseId}.`,
      },
    ],
  }),
  component: CasePage,
});

function CasePage() {
  const { caseId } = Route.useParams();
  const caseFile = CASES.find((c) => c.id === caseId);

  if (!caseFile) {
    throw notFound();
  }

  return (
    <AppShell
      title={caseFile.client}
      subtitle={`${caseFile.id} · ${caseFile.currency} ${caseFile.amount.toLocaleString()} · ${caseFile.corridor} · ${caseFile.channel}`}
      toolbar={
        <Link
          to="/alerts"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-3.5" /> Back to alerts
        </Link>
      }
    >
      <CaseInvestigation caseFile={caseFile} />
    </AppShell>
  );
}
