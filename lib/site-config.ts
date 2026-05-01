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
    "Krellix collects email and documents from Microsoft 365 or IMAP, hashes every file, and RFC 3161 timestamps the collection. Built for solo attorneys, in-house counsel, and HR investigators who need a defensible chain of custody without a Purview seat or a vendor invoice.",
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
    soloAnnual: 299,
    firmAnnual: 799,
    enterpriseAnnual: 2499,
    startingFromEnterprise: true,
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
  { label: "Pricing", href: "/pricing" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Security", href: "/security" },
  { label: "Docs", href: "/docs" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Security", href: "/security" },
      { label: "Request a pilot", href: "/contact" },
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
      { label: "Contact sales", href: "mailto:sales@krellix.app" },
      { label: "Support", href: "mailto:support@krellix.app" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
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
      { label: "By-correspondent collection (Outlook-style autocomplete)", personal: true, enterprise: true },
      { label: "By-folder collection with subfolder inclusion", personal: true, enterprise: true },
      { label: "Date-range filtering", personal: true, enterprise: true },
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
      { label: "Bates numbering across email and document phases", personal: true, enterprise: true },
      { label: "Items.csv load file (machine-readable index by Bates ID)", personal: true, enterprise: true },
      { label: "Excel index workbook", personal: true, enterprise: true },
    ],
  },
  {
    group: "Chain of custody",
    rows: [
      { label: "SHA-256 + MD5 hash for every file", personal: true, enterprise: true },
      { label: "RFC 3161 timestamp (DigiCert public TSA)", personal: true, enterprise: true },
      { label: "Chain-of-custody manifest (operator, tenant, KQL query)", personal: true, enterprise: true },
      { label: "Self-running verification script (VerifyTimestamp.bat)", personal: true, enterprise: true },
      { label: "Deduplication report keyed by Message-ID", personal: true, enterprise: true },
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
      { label: "Email support, 1 business day", personal: true, enterprise: true },
      { label: "Onboarding call for Enterprise rollout", personal: false, enterprise: true },
    ],
  },
] as const;

/** Audiences used on the homepage. */
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
    body: "Preserve email surrounding a conduct investigation before custodians know they're under review. The manifest documents the chain of custody; your legal team can attest to it.",
  },
  {
    title: "Compliance officers",
    body: "Regulated industries need ad-hoc preservation for SEC, FINRA, OCC, and HIPAA responses. Krellix produces a defensible export without procurement for a full eDiscovery platform.",
  },
] as const;
