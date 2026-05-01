import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const paths = [
    "/",
    "/how-it-works",
    "/pricing",
    "/roadmap",
    "/security",
    "/about",
    "/contact",
    "/docs",
    "/docs/getting-started",
    "/docs/personal-setup",
    "/docs/enterprise-setup",
    "/docs/output",
    "/docs/chain-of-custody",
    "/docs/troubleshooting",
  ];
  const now = new Date();
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "/" ? 1.0 : 0.7,
  }));
}
