"use client"

import { useState } from "react"
import { cn } from "cn"
import { ConsoleSidebar } from "@/components/console/console-sidebar"
import { ConsoleHeader } from "@/components/console/console-header"

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
        onNavigate={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <ConsoleHeader
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}

export { ConsoleLayout }
