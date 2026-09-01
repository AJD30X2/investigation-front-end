export type Role = "junior" | "senior";

export type Session = {
  name: string;
  email: string;
  role: Role;
  desk: string;
};

const KEY = "sentinel.session";

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function writeSession(session: Session) {
  window.localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("sentinel-session"));
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("sentinel-session"));
}
