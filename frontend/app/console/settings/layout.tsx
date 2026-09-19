"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

/**
 * The settings UI is a hash-driven dialog rendered by the console layout
 * (e.g. `/console/overview#settings/profile`). Any direct visit to a
 * `/console/settings/*` route is redirected to the overview page with the
 * matching settings hash so the dialog opens over the console.
 */
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const segment = pathname.replace(/^\/console\/settings\/?/, "")
    const section = segment || "profile"
    router.replace(`/console/overview#settings/${section}`)
  }, [pathname, router])

  return children
}
