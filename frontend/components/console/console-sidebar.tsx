"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Plus,
  MessageSquare,
  Library,
  Puzzle,
  Settings,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"
import { ProfileBar } from "@/components/shared/console/profile-bar"

export interface ConsoleNavItem {
  title: string
  href: string
  icon: LucideIcon
}

const defaultNavItems: ConsoleNavItem[] = [
  { title: "New chat", href: "/console/new", icon: Plus },
  { title: "Overview", href: "/console/overview", icon: LayoutDashboard },
  { title: "Chats", href: "/console/recents", icon: MessageSquare },
  { title: "Library", href: "/console/library", icon: Library },
  { title: "Plugins", href: "/console/plugins", icon: Puzzle },
  // Hash link: opens the settings dialog over the current console page.
  { title: "Settings", href: "#settings/usage", icon: Settings },
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
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Image
          src="/icons/app/wordmark/dark.svg"
          alt="Cobotics"
          width={360}
          height={72}
          className="h-[72px] w-auto object-contain"
          priority
        />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
        {items.map((item) => {
          const isHash = item.href.startsWith("#")
          const isActive =
            !isHash &&
            (pathname === item.href || pathname.startsWith(`${item.href}/`))
          const Icon = item.icon
          const itemClassName = cn(
            "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
          )
          const content = (
            <>
              <Icon className="size-4 shrink-0" />
              {item.title}
            </>
          )

          // Hash items (e.g. settings) use a plain anchor so they update the
          // URL hash and open the dialog without navigating away.
          if (isHash) {
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={itemClassName}
              >
                {content}
              </a>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive}
              onClick={onNavigate}
              className={itemClassName}
            >
              {content}
            </Link>
          )
        })}
      </nav>

      <ProfileBar onNavigate={onNavigate} />
    </aside>
  )
}

export { ConsoleSidebar }
