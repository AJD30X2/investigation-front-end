import type { Role } from "./session";

export type Disposition = "block" | "monitor" | "escalate";
export type CaseStatus = "open" | "escalated" | "audit" | "saved";

export type CaseFile = {
  id: string;
  client: string;
  clientId: string;
  amount: number;
  currency: string;
  corridor: string;
  channel: string;
  openedAt: string;
  alertReason: string;
  signal: string;
  riskScore: number;
  severity: "low" | "medium" | "high";
  status: CaseStatus;
  disposition: Disposition;
  regulatory: string;
  sarRef: string;
  owner: string;
  escalatedBy?: string;
};

export const CASES: CaseFile[] = [
  {
    id: "ALT-24817",
    client: "Rhea Kapoor",
    clientId: "CL-88213",
    amount: 48250,
    currency: "USD",
    corridor: "IN → AE",
    channel: "Mobile app",
    openedAt: "2026-09-01 07:42",
    alertReason: "Structuring — 6 near-threshold transfers in 90 minutes",
    signal: "Bank core signal: velocity + threshold avoidance",
    riskScore: 82,
    severity: "high",
    status: "open",
    disposition: "escalate",
    regulatory: "FATF R.10 / AML Act §5318(g) — SAR window 30 days",
    sarRef: "SAR-2026-0912",
    owner: "Junior desk",
  },
  {
    id: "ALT-24822",
    client: "Marcus Ellery",
    clientId: "CL-41190",
    amount: 12900,
    currency: "GBP",
    corridor: "UK → UK",
    channel: "Faster payments",
    openedAt: "2026-09-01 08:15",
    alertReason: "New beneficiary paid within 4 minutes of device change",
    signal: "Bank core signal: device swap + first-time payee",
    riskScore: 64,
    severity: "medium",
    status: "open",
    disposition: "monitor",
    regulatory: "PSR APP-fraud reimbursement assessment",
    sarRef: "STR-2026-0447",
    owner: "Junior desk",
  },
  {
    id: "ALT-24830",
    client: "Nadia Osei",
    clientId: "CL-73004",
    amount: 305000,
    currency: "USD",
    corridor: "US → KY",
    channel: "Wire",
    openedAt: "2026-09-01 09:02",
    alertReason: "Offshore layering through shell beneficiary",
    signal: "Bank core signal: high-risk jurisdiction + entity mismatch",
    riskScore: 91,
    severity: "high",
    status: "escalated",
    disposition: "block",
    regulatory: "OFAC screening exposure — 314(b) info sharing eligible",
    sarRef: "SAR-2026-0918",
    owner: "Senior desk",
    escalatedBy: "J. Alvarez (junior)",
  },
  {
    id: "ALT-24841",
    client: "Tomas Lindqvist",
    clientId: "CL-55620",
    amount: 2400,
    currency: "EUR",
    corridor: "SE → SE",
    channel: "Card-not-present",
    openedAt: "2026-09-01 09:47",
    alertReason: "Merchant category anomaly against 12-month baseline",
    signal: "Bank core signal: spend-pattern deviation",
    riskScore: 31,
    severity: "low",
    status: "saved",
    disposition: "monitor",
    regulatory: "No filing obligation — retain 5 years",
    sarRef: "—",
    owner: "Junior desk",
  },
  {
    id: "ALT-24855",
    client: "Ingrid Salomé",
    clientId: "CL-20117",
    amount: 78400,
    currency: "USD",
    corridor: "US → PA",
    channel: "Wire",
    openedAt: "2026-08-31 16:20",
    alertReason: "Mule-network overlap with previously filed SAR subject",
    signal: "Bank core signal: counterparty graph overlap",
    riskScore: 88,
    severity: "high",
    status: "audit",
    disposition: "block",
    regulatory: "SAR filed — continuing activity review at 90 days",
    sarRef: "SAR-2026-0903",
    owner: "Senior desk",
  },
  {
    id: "ALT-24861",
    client: "Peter Nwosu",
    clientId: "CL-66478",
    amount: 5600,
    currency: "USD",
    corridor: "US → NG",
    channel: "Mobile app",
    openedAt: "2026-08-31 18:05",
    alertReason: "Romance-scam linguistic markers in payment memo",
    signal: "Bank core signal: memo NLP + payee recency",
    riskScore: 57,
    severity: "medium",
    status: "audit",
    disposition: "escalate",
    regulatory: "Consumer-harm review — STR discretionary",
    sarRef: "STR-2026-0451",
    owner: "Junior desk",
    escalatedBy: "K. Mehta (junior)",
  },
  {
    id: "ALT-24870",
    client: "Lucia Ferrante",
    clientId: "CL-31882",
    amount: 19800,
    currency: "EUR",
    corridor: "IT → MT",
    channel: "SEPA",
    openedAt: "2026-08-30 11:12",
    alertReason: "Dormant account reactivated with immediate outflow",
    signal: "Bank core signal: dormancy break",
    riskScore: 73,
    severity: "high",
    status: "escalated",
    disposition: "escalate",
    regulatory: "EU AMLD6 — enhanced due diligence trigger",
    sarRef: "STR-2026-0459",
    owner: "Senior desk",
    escalatedBy: "J. Alvarez (junior)",
  },
  {
    id: "ALT-24884",
    client: "Sana Rahman",
    clientId: "CL-90233",
    amount: 3100,
    currency: "USD",
    corridor: "US → US",
    channel: "P2P",
    openedAt: "2026-08-30 13:38",
    alertReason: "Repeated small refunds to a single external wallet",
    signal: "Bank core signal: refund abuse pattern",
    riskScore: 44,
    severity: "low",
    status: "saved",
    disposition: "monitor",
    regulatory: "Internal fraud policy — no regulatory filing",
    sarRef: "—",
    owner: "Junior desk",
  },
];

export type EvidenceBlock = {
  key: string;
  label: string;
  restricted: boolean;
  rows: { k: string; v: string }[];
};

export function evidenceFor(c: CaseFile, role: Role): EvidenceBlock[] {
  const base: EvidenceBlock[] = [
    {
      key: "devices",
      label: "Devices",
      restricted: false,
      rows: [
        { k: "Primary device", v: "iPhone 15 · iOS 19.2 · trusted 14 mo" },
        { k: "New device", v: `Android 16 · first seen ${c.openedAt}` },
        { k: "Device reputation", v: c.riskScore > 70 ? "Linked to 3 flagged accounts" : "No adverse linkage" },
        { k: "Session integrity", v: c.riskScore > 70 ? "Emulator markers present" : "Clean" },
      ],
    },
    {
      key: "geo",
      label: "Geo-location",
      restricted: false,
      rows: [
        { k: "Login geo", v: `${c.corridor.split(" → ")[0]} · residential ASN` },
        { k: "Transaction geo", v: `${c.corridor.split(" → ")[1]} · datacentre ASN` },
        { k: "Impossible travel", v: c.riskScore > 60 ? "Yes — 1,940 km in 22 min" : "No" },
        { k: "IP history", v: c.riskScore > 60 ? "2 VPN exits in 24h" : "Stable home IP" },
      ],
    },
  ];

  const seniorOnly: EvidenceBlock[] = [
    {
      key: "beneficiary",
      label: "Beneficiary",
      restricted: true,
      rows: [
        { k: "Payee", v: c.riskScore > 70 ? "Meridian Holdings Ltd (shell indicators)" : "T. Andersen — individual" },
        { k: "Registered", v: c.corridor.split(" → ")[1] + " · incorporated 3 months ago" },
        { k: "Adverse media", v: c.riskScore > 70 ? "2 hits — layering network" : "None" },
        { k: "Inbound concentration", v: c.riskScore > 70 ? "94% from 5 flagged payers" : "Diverse" },
      ],
    },
    {
      key: "history",
      label: "Transaction history",
      restricted: true,
      rows: [
        { k: "12-month volume", v: `${c.currency} 412,900` },
        { k: "Baseline ticket", v: `${c.currency} 1,240` },
        { k: "Deviation", v: `${Math.round(c.amount / 1240)}× baseline` },
        { k: "Prior alerts", v: c.riskScore > 70 ? "2 closed, 1 SAR filed 2024" : "None in 24 months" },
      ],
    },
    {
      key: "kyc",
      label: "KYC / CDD",
      restricted: true,
      rows: [
        { k: "Risk rating", v: c.riskScore > 70 ? "High — refreshed 2023" : "Medium — refreshed 2026" },
        { k: "Occupation", v: "Independent consultant" },
        { k: "Source of funds", v: c.riskScore > 70 ? "Unverified declaration" : "Payroll verified" },
        { k: "PEP / sanctions", v: c.riskScore > 85 ? "Associate-level PEP match" : "No match" },
      ],
    },
  ];

  return role === "senior" ? [...seniorOnly, ...base] : base;
}

export type AgentStep = {
  id: string;
  agent: string;
  headline: string;
  detail: string;
  meta?: string;
};

export function pipelineFor(c: CaseFile, role: Role): AgentStep[] {
  const fraudLeaning = c.riskScore >= 60;
  return [
    {
      id: "detection",
      agent: "Detection Agent",
      headline: fraudLeaning
        ? "Classified as likely fraudulent activity"
        : "Classified as probable false positive",
      detail: fraudLeaning
        ? `Signal "${c.alertReason}" reproduces on 4 of 5 typology rules. Behavioural delta of ${c.riskScore}/100 exceeds the desk threshold of 55.`
        : `Signal "${c.alertReason}" matches a benign seasonal pattern for this client. Behavioural delta ${c.riskScore}/100 sits under the 55 threshold.`,
      meta: `Confidence ${fraudLeaning ? 0.88 : 0.71}`,
    },
    {
      id: "evidence",
      agent: "Evidence Agent",
      headline:
        role === "senior"
          ? "Full evidence bundle retrieved (5 sources)"
          : "Restricted bundle retrieved (2 sources)",
      detail:
        role === "senior"
          ? "Beneficiary, transaction history, KYC/CDD, devices and geo-location pulled from the client record under senior clearance."
          : "Junior clearance permits devices and geo-location only. Beneficiary, history and KYC remain sealed until senior review.",
      meta: role === "senior" ? "Clearance: senior" : "Clearance: junior",
    },
    {
      id: "h-genuine",
      agent: "Hypothesis Agent A — Genuine",
      headline: "Argues legitimate customer behaviour",
      detail: `${c.client} has held the relationship for 4 years with no confirmed fraud. The ${c.channel} route is one the client already uses, and the ${c.corridor} corridor matches a declared family/business tie. Threshold proximity can follow payroll timing rather than intent.`,
      meta: "Strength 0.42",
    },
    {
      id: "h-fraud",
      agent: "Hypothesis Agent B — Fraud",
      headline: "Argues scam or laundering activity",
      detail: `Session integrity anomalies coincide with a first-use beneficiary and an unexplained ${Math.round(c.amount / 1240)}× ticket deviation. The sequencing — device change, beneficiary creation, rapid outflow — is the canonical ${fraudLeaning ? "mule-placement" : "low-grade anomaly"} pattern.`,
      meta: "Strength 0.79",
    },
    {
      id: "contradiction",
      agent: "Contradiction Agent",
      headline: "Resolved 2 conflicts between hypotheses",
      detail:
        "Conflict 1 — tenure vs. device anomaly: tenure is not exculpatory when session integrity fails; fraud branch retained. Conflict 2 — corridor familiarity vs. beneficiary novelty: corridor is familiar, beneficiary is not, so the corridor argument is downgraded, not discarded. Residual uncertainty is carried forward explicitly.",
      meta: "Residual uncertainty 0.18",
    },
    {
      id: "investigator",
      agent: "Investigator Agent",
      headline: fraudLeaning ? "Case complete — adverse finding" : "Case complete — no adverse finding",
      detail: `All mandatory evidence lanes answered${role === "junior" ? " within junior clearance (3 lanes deferred)" : ""}. Regulatory exposure: ${c.regulatory}.`,
      meta: `Completeness ${role === "senior" ? "100%" : "62%"}`,
    },
    {
      id: "nba",
      agent: "Next-Best-Action Agent",
      headline:
        c.disposition === "block"
          ? "Recommend: block the account"
          : c.disposition === "escalate"
            ? "Recommend: escalate to senior analyst"
            : "Recommend: monitor for 30 days",
      detail:
        c.disposition === "block"
          ? "Justification: confirmed layering indicators plus sanctioned-adjacent beneficiary create immediate loss and regulatory exposure. Blocking preserves funds and satisfies the freeze duty."
          : c.disposition === "escalate"
            ? "Justification: adverse indicators are material but the sealed evidence lanes prevent a defensible final call at junior clearance. Escalation is the proportionate action."
            : "Justification: indicators are explainable and customer harm is low. Continued monitoring is proportionate; a block would be a false-positive cost.",
      meta: `Disposition: ${c.disposition}`,
    },
    {
      id: "audit",
      agent: "Audit Trail / Replay Log",
      headline: `${c.sarRef === "—" ? "No filing package required" : `${c.sarRef} package generated`}`,
      detail:
        c.sarRef === "—"
          ? "Full replay log retained for 5 years. No SAR/STR document produced for this disposition."
          : `Password-protected ${c.sarRef.startsWith("SAR") ? "SAR" : "STR"} document summarising the fraud narrative, evidence chain and agent reasoning. Distribution restricted to the compliance officer.`,
      meta: "Immutable · replayable",
    },
  ];
}
