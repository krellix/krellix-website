/**
 * Central product/brand config. Anything that references a brand name,
 * URL, price, or version should import from here — never hardcode.
 * Keeps the website in lockstep with AppInfo.cs in the Krellix app.
 */

export const siteConfig = {
  name: "Krellix",
  productName: "Krellix Mail",
  legalName: "Krellix LLC",
  tagline: "Defensible email and document collection for legal and compliance teams.",
  description:
    "Krellix collects email and documents from Microsoft 365 or IMAP, hashes every file, and RFC 3161 timestamps the collection. Built for lawyers, compliance officers, and HR investigators who need a chain of custody a court will accept.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://krellix.app",
  ogImage: "/og-default.png",
  founder: "Cole Flanders",
  founderTitle: "Founder",
  yearFounded: 2026,
  appVersion: "3.1.0",
  location: { city: "Louisville", region: "KY", country: "US" },
  contact: {
    email: "support@krellix.app",
    salesEmail: "sales@krellix.app",
    fromEmail: "noreply@krellix.app",
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  },
  pricing: {
    personalAnnual: 499,
    enterpriseAnnual: 1999,
    trialDays: 14,
  },
  parent: {
    name: "Cole Christopher Solutions LLC",
    url: "https://colecsolutions.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/krellix",
  },
} as const;

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Why defensible", href: "/why-defensible" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "Docs", href: "/docs" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Why defensible", href: "/why-defensible" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "Start a trial", href: "/trial" },
    ],
  },
  {
    heading: "Documentation",
    links: [
      { label: "Getting started", href: "/docs/getting-started" },
      { label: "Personal setup", href: "/docs/personal-setup" },
      { label: "Enterprise setup", href: "/docs/enterprise-setup" },
      { label: "Understanding output", href: "/docs/output" },
      { label: "Verify a collection", href: "/docs/chain-of-custody" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Krellix", href: "/about" },
      { label: "Contact sales", href: "mailto:sales@krellix.app" },
      { label: "Support", href: "mailto:support@krellix.app" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security.txt", href: "/.well-known/security.txt" },
    ],
  },
];

/** Feature matrix used on the Pricing and Homepage pages. */
export const featureMatrix = [
  {
    group: "Data sources",
    rows: [
      { label: "Microsoft 365 (your own mailbox)", personal: true, enterprise: true },
      { label: "IMAP — Gmail, iCloud, Yahoo, Fastmail, any IMAP", personal: true, enterprise: true },
      { label: "Another user's mailbox (custodian collection)", personal: false, enterprise: true },
      { label: "OneDrive (custodian)", personal: false, enterprise: true },
      { label: "SharePoint (custodian)", personal: false, enterprise: true },
    ],
  },
  {
    group: "Output",
    rows: [
      { label: "Per-email PDF (searchable, embedded attachments)", personal: true, enterprise: true },
      { label: "Native .eml preserved as Microsoft stored it", personal: true, enterprise: true },
      { label: "Combined thread PDF in chronological order", personal: true, enterprise: true },
      { label: "Native attachments in original format", personal: true, enterprise: true },
      { label: "Bates numbering for eDiscovery review", personal: true, enterprise: true },
    ],
  },
  {
    group: "Chain of custody",
    rows: [
      { label: "SHA-256 + MD5 hash manifest per file", personal: true, enterprise: true },
      { label: "RFC 3161 timestamp (DigiCert public TSA)", personal: true, enterprise: true },
      { label: "Chain-of-Custody manifest (operator, tenant, KQL query)", personal: true, enterprise: true },
      { label: "Deduplication report", personal: true, enterprise: true },
      { label: "Multi-custodian collection records", personal: false, enterprise: true },
    ],
  },
  {
    group: "Access & support",
    rows: [
      { label: "Single operator seat", personal: true, enterprise: true },
      { label: "Runs on Windows 10/11", personal: true, enterprise: true },
      { label: "No admin consent required", personal: true, enterprise: false },
      { label: "Tenant-wide admin consent supported", personal: false, enterprise: true },
      { label: "Priority email support (1 business day)", personal: true, enterprise: true },
      { label: "Onboarding call for Enterprise rollout", personal: false, enterprise: true },
    ],
  },
] as const;

/** Audiences used on the homepage and About page. */
export const audiences = [
  {
    title: "Solo & small-firm attorneys",
    body: "Preserve your client correspondence at the start of a matter without sending it to a vendor. Most Krellix exports cost less than one billable hour.",
  },
  {
    title: "In-house counsel",
    body: "Your company has Business Premium, not E5 Compliance. Krellix gives you the defensible collection that Purview would — without the $57/user/month license.",
  },
  {
    title: "HR investigators",
    body: "Preserve email surrounding a conduct investigation before custodians know they're under review. The manifest documents the chain of custody; your legal team can attest to it in court.",
  },
  {
    title: "Compliance officers",
    body: "Regulated industries need ad-hoc preservation for SEC, FINRA, OCC, and HIPAA responses. Krellix produces audit-ready output without procurement for a full eDiscovery platform.",
  },
] as const;
