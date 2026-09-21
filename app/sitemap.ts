import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/site";
import { features } from "@/lib/features";

/**
 * Built from the same two arrays the navigation is, so a page cannot exist in
 * one and be missing from the other.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = routes.map((route) => ({
    url: `${site.url}${route.href === "/" ? "/" : route.href}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const featurePages = features.map((feature) => ({
    url: `${site.url}/features/${feature.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...featurePages];
}
