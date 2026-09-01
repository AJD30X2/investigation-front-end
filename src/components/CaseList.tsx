import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { CaseFile } from "@/lib/cases";
import { CaseInvestigation } from "@/components/CaseInvestigation";

const sevTone: Record<CaseFile["severity"], string> = {
  low: "bg-success/15 text-success",
  medium: "bg-warning/20 text-warning",
  high: "bg-destructive/15 text-destructive",
};

const dispTone: Record<CaseFile["disposition"], string> = {
  block: "border-destructive/40 text-destructive",
  monitor: "border-warning/50 text-warning",
  escalate: "border-accent/60 text-accent-foreground",
};

export function CaseList({ cases, emptyLabel }: { cases: CaseFile[]; emptyLabel: string }) {
  const [active, setActive] = useState<CaseFile | null>(null);

  if (cases.length === 0) {
    return (
      <div className="panel px-6 py-14 text-center text-sm text-muted-foreground">{emptyLabel}</div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c)}
            className="panel group w-full px-5 py-5 text-left transition-transform hover:-translate-y-0.5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${sevTone[c.severity]}`}>
                    {c.severity} risk
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${dispTone[c.disposition]}`}>
                    {c.disposition}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold">{c.client}</h3>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{c.alertReason}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {c.signal} · {c.channel} · {c.corridor} · {c.openedAt}
                  {c.escalatedBy ? ` · raised by ${c.escalatedBy}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {c.currency} {c.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Risk score {c.riskScore}/100</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <CaseInvestigation caseFile={active} onClose={() => setActive(null)} />
    </>
  );
}
