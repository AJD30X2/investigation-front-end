import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Coffee, Lock, Layers } from "lucide-react";
import { writeSession, type Role } from "@/lib/session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sentinel — Financial Crime Investigation Desk Sign-in" },
      {
        name: "description",
        content:
          "Sign in as a junior or senior analyst to access the autonomous multi-agent financial crime investigation desk.",
      },
      { property: "og:title", content: "Sentinel — Investigation Desk Sign-in" },
      {
        property: "og:description",
        content:
          "Role-based access to alert triage, agent reasoning and audit-ready SAR/STR packages.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("junior");
  const [name, setName] = useState("Jordan Alvarez");
  const [email, setEmail] = useState("j.alvarez@sentinel.bank");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    writeSession({
      name,
      email,
      role,
      desk: role === "junior" ? "Triage desk 2" : "Financial crime review",
    });
    navigate({ to: "/alerts" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <section className="bg-coffee relative hidden flex-col justify-between px-12 py-14 lg:flex">
        <div className="flex items-center gap-2 text-primary-foreground">
          <Coffee className="size-5" />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">Sentinel</span>
        </div>
        <div className="max-w-md">
          <h2 className="text-3xl leading-tight font-semibold text-primary-foreground">
            Autonomous financial crime investigation, explained end to end.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
            Detection, evidence retrieval, opposing hypotheses, contradiction resolution and a
            next-best-action recommendation — every step recorded in a replayable audit trail.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-primary-foreground/80">
            {[
              { icon: Layers, t: "Seven cooperating agents per case" },
              { icon: Lock, t: "Evidence access scoped to your clearance" },
              { icon: ShieldCheck, t: "Password-protected SAR / STR packages" },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-3">
                <Icon className="size-4" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/50">
          Demonstration environment · synthetic case data
        </p>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <form onSubmit={submit} className="panel w-full max-w-md px-7 py-8">
          <h1 className="text-2xl font-semibold tracking-tight">Analyst sign-in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Identify yourself. Your clearance determines which evidence the agents may retrieve.
          </p>

          <div className="mt-7 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Full name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5 h-11 w-full rounded-full border border-input bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Work email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 h-11 w-full rounded-full border border-input bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Access key</span>
              <input
                type="password"
                defaultValue="demo-access"
                className="mt-1.5 h-11 w-full rounded-full border border-input bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className="text-xs font-medium text-muted-foreground">Clearance level</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { r: "junior", t: "Junior analyst", d: "Devices and geo-location evidence" },
                  { r: "senior", t: "Senior analyst", d: "Full beneficiary, history, KYC access" },
                ] as const
              ).map((o) => (
                <button
                  type="button"
                  key={o.r}
                  onClick={() => setRole(o.r)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                    role === o.r
                      ? "border-accent bg-secondary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <span className="text-sm font-medium">{o.t}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{o.d}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="bg-crema mt-7 h-11 w-full rounded-full text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Enter the investigation desk
          </button>
        </form>
      </section>
    </div>
  );
}
