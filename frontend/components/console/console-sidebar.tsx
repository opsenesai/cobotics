"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Plus,
  Clock,
  Library,
  Puzzle,
  Settings,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

export interface ConsoleNavItem {
  title: string
  href: string
  icon: LucideIcon
}

const defaultNavItems: ConsoleNavItem[] = [
  { title: "Overview", href: "/console/overview", icon: LayoutDashboard },
  { title: "New", href: "/console/new", icon: Plus },
  { title: "Recents", href: "/console/recents", icon: Clock },
  { title: "Library", href: "/console/library", icon: Library },
  { title: "Plugins", href: "/console/plugins", icon: Puzzle },
  { title: "Settings", href: "/console/settings", icon: Settings },
]

export interface ConsoleSidebarProps extends React.ComponentProps<"aside"> {
  items?: ConsoleNavItem[]
  /** Whether the mobile drawer is open. Ignored on lg+ where the sidebar is static. */
  open?: boolean
  /** Called when a nav item is clicked, so the parent can close the mobile drawer. */
  onNavigate?: () => void
}

function ConsoleSidebar({
  className,
  items = defaultNavItems,
  open = false,
  onNavigate,
  ...props
}: ConsoleSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      data-slot="console-sidebar"
      data-open={open}
      className={cn(
        // Base
        "flex h-full w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        // Mobile / tablet: fixed off-canvas drawer that slides in when open
        "fixed inset-y-0 left-0 z-50 -translate-x-full transition-transform duration-200 ease-in-out data-[open=true]:translate-x-0",
        // Desktop: static, always visible, no transform
        "lg:static lg:z-auto lg:translate-x-0",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <span className="inline-block size-6 rounded-md bg-sidebar-primary" />
        <span className="text-sm font-semibold tracking-tight">Console</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export { ConsoleSidebar }
