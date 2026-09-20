import type { MetadataRoute } from "next"

const BASE_URL = "https://cobotics.vercel.app"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Authenticated and auth-flow areas shouldn't be indexed.
        disallow: ["/console", "/auth"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
