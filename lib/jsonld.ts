import { site } from "./site";
import { features } from "./features";
import { readyScreenshots } from "./screenshots";

/**
 * Structured data builders.
 *
 * Every node that more than one page refers to gets a stable `@id` under
 * `site.url`, so a page can reference the application or the author instead of
 * repeating them — which is what stops the same entity being read as several
 * different ones across the site.
 */

export const ids = {
  website: `${site.url}/#website`,
  author: `${site.url}/#author`,
  app: `${site.url}/#app`,
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Node = Record<string, any>;

export function person(): Node {
  return {
    "@type": "Person",
    "@id": ids.author,
    name: site.author,
    url: site.authorUrl,
    sameAs: ["https://github.com/code4mk"],
  };
}

export function website(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    description: site.longDescription,
    inLanguage: "en-US",
    publisher: { "@id": ids.author },
  };
}

export function softwareApplication(): Node {
  return {
    "@type": "SoftwareApplication",
    "@id": ids.app,
    name: site.name,
    alternateName: ["FigyTerm Terminal", "Figy Term"],
    description: site.longDescription,
    /*
     * schema.org defines this field for exactly the problem FigyTerm has: a
     * name one letter from `figterm`, which sends engines and LLMs to the
     * discontinued Fig instead. Stating the difference in the field built for
     * it is stronger than hoping prose carries it.
     */
    disambiguatingDescription: site.disambiguation,
    keywords: site.keywords.join(", "),
    sameAs: [site.repo, site.releases],
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Terminal Emulator",
    operatingSystem: ["macOS 12 or later", "Linux", "Windows 10 1809 or later"],
    processorRequirements:
      "Apple Silicon (aarch64) or Intel/AMD (x64); Linux and Windows are x86_64",
    url: site.url,
    downloadUrl: site.releases,
    installUrl: site.releases,
    softwareHelp: site.docs,
    license: "https://opensource.org/licenses/MIT",
    isAccessibleForFree: true,
    author: { "@id": ids.author },
    publisher: { "@id": ids.author },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: features.map((f) => f.name),
    // Only captured screenshots — a placeholder has no image to cite.
    screenshot: readyScreenshots.map((shot) => ({
      "@type": "ImageObject",
      url: `${site.url}/screenshots/${shot.file}`,
      caption: shot.alt,
      width: shot.width,
      height: shot.height,
    })),
    softwareRequirements:
      "A POSIX shell (zsh, bash or fish) on macOS and Linux, or PowerShell on Windows. Oh My Zsh optional for theme switching.",
    codeRepository: site.repo,
    programmingLanguage: ["Rust", "TypeScript"],
  };
}

export function faqPage(
  faqs: readonly { q: string; a: string }[],
  id = `${site.url}/#faq`,
): Node {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbList(crumbs: Crumb[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };
}

export function webPage({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}): Node {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name,
    description,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.app },
    inLanguage: "en-US",
  };
}

export function itemList(
  name: string,
  items: { name: string; description: string; href: string }[],
): Node {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      description: item.description,
      url: `${site.url}${item.href}`,
    })),
  };
}

/** Wrap nodes into the single `@graph` a page emits. */
export function graph(...nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}
