import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ShieldAlert,
  ArrowUpRight,
  FileCheck2,
  Bookmark,
  LogOut,
  Coffee,
} from "lucide-react";
import { clearSession, readSession, type Session } from "@/lib/session";

const NAV = [
  { to: "/alerts", label: "Suspected alerts", icon: ShieldAlert, hint: "Live bank signals" },
  { to: "/escalated", label: "Escalated to senior", icon: ArrowUpRight, hint: "Raised by juniors" },
  { to: "/audit", label: "Audit-ready cases", icon: FileCheck2, hint: "Explanation complete" },
  { to: "/saved", label: "Reference cases", icon: Bookmark, hint: "Saved for later" },
] as const;

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSession(readSession());
    sync();
    setReady(true);
    window.addEventListener("sentinel-session", sync);
    return () => window.removeEventListener("sentinel-session", sync);
  }, []);

  return { session, ready };
}

export function AppShell({
  title,
  subtitle,
  toolbar,
  children,
}: {
  title: string;
  subtitle: string;
  toolbar?: ReactNode;
  children: ReactNode;
}) {
  const { session, ready } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !session) navigate({ to: "/" });
  }, [ready, session, navigate]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <aside className="panel h-fit shrink-0 overflow-hidden lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-72">
          <div className="bg-coffee px-5 py-6">
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Coffee className="size-5" />
              <span className="text-sm font-semibold tracking-[0.18em] uppercase">Sentinel</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-primary-foreground/70">
              Autonomous financial crime investigation desk
            </p>
          </div>

          <nav className="flex flex-col gap-1 p-3">
            {NAV.map(({ to, label, icon: Icon, hint }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-start gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              >
                <Icon className="mt-0.5 size-4 shrink-0" />
                <span className="flex flex-col">
                  <span className="font-medium text-foreground">{label}</span>
                  <span className="text-xs text-muted-foreground">{hint}</span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="bg-crema grid size-9 place-items-center rounded-full text-sm font-semibold text-primary-foreground">
                {session.name.slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{session.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {session.role} analyst · {session.desk}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                clearSession();
                navigate({ to: "/" });
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-5">
          <header className="panel px-6 py-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground capitalize">
                Clearance: {session.role}
              </span>
            </div>
            {toolbar ? <div className="mt-5 border-t border-border pt-4">{toolbar}</div> : null}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
