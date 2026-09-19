"use client"

import {
  User,
  Gauge,
  Palette,
  Sparkles,
  Brain,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

export interface SettingsSection {
  id: string
  title: string
  icon: LucideIcon
}

export const settingsSections: SettingsSection[] = [
  { id: "profile", title: "Profile", icon: User },
  { id: "usage", title: "Usage", icon: Gauge },
  { id: "personalization", title: "Personalization", icon: Palette },
  { id: "skills", title: "Skills", icon: Sparkles },
  { id: "memory", title: "Memory", icon: Brain },
]

export interface SettingsSidebarProps
  extends Omit<React.ComponentProps<"nav">, "onSelect"> {
  sections?: SettingsSection[]
  value: string
  onSelect: (id: string) => void
}

function SettingsSidebar({
  className,
  sections = settingsSections,
  value,
  onSelect,
  ...props
}: SettingsSidebarProps) {
  return (
    <nav
      data-slot="settings-sidebar"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {sections.map((section) => {
        const isActive = section.id === value
        const Icon = section.icon
        return (
          <button
            key={section.id}
            type="button"
            data-active={isActive}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onSelect(section.id)}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors",
              "hover:bg-muted hover:text-foreground",
              "data-[active=true]:bg-muted data-[active=true]:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {section.title}
          </button>
        )
      })}
    </nav>
  )
}

export { SettingsSidebar }
