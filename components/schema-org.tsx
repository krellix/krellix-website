import { siteConfig } from "@/lib/site-config";

/**
 * Schema.org JSON-LD components. Rendered once in the root layout so
 * every page inherits the organization and website markup. Page-level
 * schemas (Article, FAQ, BreadcrumbList, etc.) should be added at the
 * page level and reference this organization via @id.
 */

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: String(siteConfig.yearFounded),
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "Defensible collection",
      "Chain of custody",
      "RFC 3161 timestamp",
      "eDiscovery",
      "Microsoft 365",
      "Microsoft Graph API",
      "Entra ID",
      "Federal Rules of Evidence",
      "Sedona Conference",
    ],
    sameAs: [siteConfig.social.linkedin].filter(Boolean),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}#organization` },
    inLanguage: "en-US",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Product schema for Krellix Mail. Three tiers (Solo, Firm, Enterprise).
 * AggregateOffer lets Google show a price range in rich results — Enterprise
 * is "starting at," so highPrice is the published floor, not a ceiling.
 */
export function SoftwareSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}#software`,
    name: siteConfig.productName,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Legal & Compliance",
    operatingSystem: "Windows 10, Windows 11",
    softwareVersion: siteConfig.appVersion,
    description: siteConfig.description,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}#organization` },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: String(siteConfig.pricing.soloAnnual),
      highPrice: String(siteConfig.pricing.enterpriseAnnual),
      offerCount: 3,
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "SHA-256 and MD5 hashing of every exported file",
      "RFC 3161 timestamping via public Time Stamp Authority",
      "Chain-of-custody manifest with operator and tenant identity",
      "Microsoft 365 and IMAP mailbox collection",
      "OneDrive and SharePoint collection (Enterprise)",
      "Per-email PDF with embedded native attachments",
      "Bates numbering across email and document phases",
      "Items.csv load file (machine-readable index)",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
