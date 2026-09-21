import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * The whole site is public and meant to be indexed, so `*` already permits
 * everything below.
 *
 * The AI crawlers are then named explicitly anyway. Not because the wildcard
 * misses them — it doesn't — but because several of them are increasingly
 * blocked by default at the CDN or by copied-in boilerplate, and an assistant
 * asked "what is FigyTerm?" currently answers about Fig. Being retrievable is
 * the whole point here, so the permission is stated rather than implied.
 */
const aiCrawlers = [
  // OpenAI: training, search index, and live user-initiated fetches
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / Vertex grounding
  "Google-Extended",
  // Apple Intelligence
  "Applebot-Extended",
  // Meta AI
  "meta-externalagent",
  // Common Crawl — the corpus most open models are trained on
  "CCBot",
  // Amazon, Mistral, You.com, Cohere, DuckDuckGo
  "Amazonbot",
  "MistralAI-User",
  "YouBot",
  "cohere-ai",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
