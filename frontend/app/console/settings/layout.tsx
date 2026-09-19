"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

const settingsLinks = [
  { title: "Profile", href: "/console/settings/profile" },
  { title: "Usage", href: "/console/settings/usage" },
  { title: "Personalization", href: "/console/settings/personalization" },
  { title: "Skills", href: "/console/settings/skills" },
  { title: "Memory", href: "/console/settings/memory" },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, preferences, and workspace.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <nav className="flex flex-col gap-1">
            {settingsLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={isActive}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    "data-[active=true]:bg-muted data-[active=true]:text-foreground"
                  )}
                >
                  {link.title}
                </Link>
              )
            })}
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  )
}
