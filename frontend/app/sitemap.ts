import type { MetadataRoute } from "next"

const BASE_URL = "https://cobotics.vercel.app"

// Public, indexable routes. The console and auth areas are intentionally
// excluded (see robots.ts).
const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/legal", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/legal/privacy", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/legal/terms", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/legal/cookies", priority: 0.5, changeFrequency: "yearly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
