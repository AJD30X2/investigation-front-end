import { useEffect, useState } from "react";
import { Lock, FileLock2, Play, CheckCircle2 } from "lucide-react";
import { evidenceFor, pipelineFor, type CaseFile } from "@/lib/cases";
import { useSession } from "@/components/AppShell";

export function CaseInvestigation({
  caseFile,
}: {
  caseFile: CaseFile;
}) {
  const { session } = useSession();
  const [revealed, setRevealed] = useState(0);
  const role = session?.role ?? "junior";
  const steps = pipelineFor(caseFile, role);

  useEffect(() => {
    setRevealed(0);
    const total = pipelineFor(caseFile, role).length;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setRevealed(i);
      if (i >= total) clearInterval(t);
    }, 420);
    return () => clearInterval(t);
  }, [caseFile, role]);

  const evidence = evidenceFor(caseFile, role);
  const done = revealed >= steps.length;

  return (
    <div className="space-y-5">
      <div className="panel overflow-hidden">
        <div className="bg-coffee px-5 py-5">
          <p className="font-mono text-xs text-primary-foreground/70">{caseFile.id}</p>
          <h2 className="mt-1 text-xl font-semibold text-primary-foreground">
            {caseFile.client}
          </h2>
          <p className="mt-1 text-sm text-primary-foreground/75">
            {caseFile.currency} {caseFile.amount.toLocaleString()} · {caseFile.corridor} ·{" "}
            {caseFile.channel}
          </p>
          <p className="mt-3 rounded-2xl bg-primary-foreground/10 px-4 py-2.5 text-xs text-primary-foreground/85">
            Primary alert reason — {caseFile.alertReason}
          </p>
        </div>
      </div>

      <div className="panel px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Evidence bundle</h3>
          <span className="text-xs text-muted-foreground capitalize">
            {role} clearance · {evidence.length} of 5 lanes
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {evidence.map((b) => (
            <div key={b.key} className="rounded-xl border border-border bg-surface px-4 py-3">
              <p className="text-xs font-semibold tracking-wide uppercase">{b.label}</p>
              <dl className="mt-2 space-y-1.5">
                {b.rows.map((r) => (
                  <div key={r.k} className="flex gap-2 text-xs">
                    <dt className="w-32 shrink-0 text-muted-foreground">{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          {role === "junior"
            ? ["Beneficiary", "Transaction history", "KYC / CDD"].map((l) => (
                <div
                  key={l}
                  className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-xs text-muted-foreground"
                >
                  <Lock className="size-3.5" /> {l} — sealed at junior clearance
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="panel px-5 py-4">
        <div className="flex items-center gap-2">
          {done ? (
            <CheckCircle2 className="size-4 text-success" />
          ) : (
            <Play className="size-4 animate-pulse text-accent" />
          )}
          <h3 className="text-sm font-semibold">
            {done ? "Multi-agent investigation complete" : "Agents reasoning…"}
          </h3>
        </div>
        <ol className="mt-4 space-y-3">
          {steps.slice(0, revealed).map((s) => (
            <li
              key={s.id}
              className="animate-in fade-in slide-in-from-bottom-1 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{s.agent}</p>
                {s.meta ? (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {s.meta}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-accent-foreground">{s.headline}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      {done ? (
        <div className="panel px-5 py-4">
          <h3 className="text-sm font-semibold">Regulatory outcome</h3>
          <p className="mt-1.5 text-xs text-muted-foreground">{caseFile.regulatory}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="bg-crema rounded-full px-4 py-2 text-xs font-medium text-primary-foreground">
              Confirm: {caseFile.disposition}
            </button>
            <button className="rounded-full border border-border px-4 py-2 text-xs font-medium">
              Save for reference
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium">
              <FileLock2 className="size-3.5" />
              {caseFile.sarRef === "—"
                ? "Replay log (no filing)"
                : `Download ${caseFile.sarRef} (password protected)`}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
