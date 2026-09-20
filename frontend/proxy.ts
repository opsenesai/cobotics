import { type NextRequest } from "next/server"

import { updateSession } from "@/lib/supabase/proxy"

// Next.js 16 renamed the `middleware` convention to `proxy`.
// Runs before rendering to refresh the Supabase auth session on each request.
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico and common image assets
     * Adjust as needed; auth redirect logic lives in updateSession().
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
