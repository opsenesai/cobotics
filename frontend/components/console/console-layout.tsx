"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "cn"
import { ConsoleSidebar } from "@/components/console/console-sidebar"
import { ConsoleHeader } from "@/components/console/console-header"
import {
  SettingsDialog,
  settingsSections,
} from "@/components/pages/console/settings"
import { Profile } from "@/components/pages/console/settings/account"
import { Skills } from "@/components/pages/console/settings/skills"

const SETTINGS_HASH_PREFIX = "#settings/"

function readSettingsSection(): string | null {
  if (typeof window === "undefined") return null
  const hash = window.location.hash
  if (!hash.startsWith(SETTINGS_HASH_PREFIX)) return null
  const id = hash.slice(SETTINGS_HASH_PREFIX.length)
  const match = settingsSections.find((s) => s.id === id)
  return match?.id ?? settingsSections[0]?.id ?? null
}

export interface ConsoleLayoutProps extends React.ComponentProps<"div"> {
  title?: string
}

function ConsoleLayout({
  className,
  children,
  title,
  ...props
}: ConsoleLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [settingsSection, setSettingsSection] = useState<string | null>(null)

  // Sync the settings dialog with the URL hash (e.g. #settings/profile).
  useEffect(() => {
    const sync = () => setSettingsSection(readSettingsSection())
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const openSettings = useCallback((id: string) => {
    // Updating the hash keeps the current console page mounted underneath.
    window.location.hash = `${SETTINGS_HASH_PREFIX.slice(1)}${id}`
  }, [])

  const closeSettings = useCallback(() => {
    // Clear the hash without a navigation or scroll jump, preserving the page.
    const { pathname, search } = window.location
    window.history.replaceState(null, "", pathname + search)
    setSettingsSection(null)
  }, [])

  return (
    <div
      data-slot="console-layout"
      className={cn("flex h-svh overflow-hidden bg-background", className)}
      {...props}
    >
      {/* Backdrop for the mobile drawer */}
      {sidebarOpen && (
        <div
          aria-hidden
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <ConsoleSidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        onNavigate={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <ConsoleHeader
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>

      <SettingsDialog
        open={settingsSection !== null}
        onOpenChange={(open) => {
          if (!open) closeSettings()
        }}
        section={settingsSection ?? undefined}
        onSectionChange={openSettings}
        renderSection={(section) => {
          if (section.id === "account") return <Profile />
          if (section.id === "skills") return <Skills />
          return (
            <p className="text-sm text-muted-foreground">
              {section.title} settings will appear here.
            </p>
          )
        }}
      />
    </div>
  )
}

export { ConsoleLayout }
