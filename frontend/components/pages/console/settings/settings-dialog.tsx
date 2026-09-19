"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  SettingsSidebar,
  settingsSections,
  type SettingsSection,
} from "./settings-sidebar"

export interface SettingsDialogProps {
  sections?: SettingsSection[]
  defaultSection?: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Controlled active section id. When provided, `onSectionChange` should update it. */
  section?: string
  /** Called when a section is selected from the sidebar. */
  onSectionChange?: (id: string) => void
  /** Rendered inside the content area. Overrides `renderSection` when provided. */
  children?: React.ReactNode
  renderSection?: (section: SettingsSection) => React.ReactNode
}

function SettingsDialog({
  sections = settingsSections,
  defaultSection,
  trigger,
  open,
  onOpenChange,
  section,
  onSectionChange,
  children,
  renderSection,
}: SettingsDialogProps) {
  const [internalActive, setInternalActive] = useState(
    defaultSection ?? sections[0]?.id ?? ""
  )

  // Controlled when `section` is provided; otherwise falls back to internal state.
  const active = section ?? internalActive

  const setActive = (id: string) => {
    if (onSectionChange) {
      onSectionChange(id)
    } else {
      setInternalActive(id)
    }
  }

  const activeSection =
    sections.find((s) => s.id === active) ?? sections[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={trigger as React.ReactElement} />}
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <div className="grid min-h-[32rem] grid-cols-1 sm:grid-cols-[240px_1fr]">
          <aside className="border-b border-border bg-muted/30 p-3 sm:border-b-0 sm:border-r">
            <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Settings
            </p>
            <SettingsSidebar
              sections={sections}
              value={active}
              onSelect={setActive}
              className="flex-row overflow-x-auto sm:flex-col sm:overflow-visible"
            />
          </aside>

          <section className="flex flex-col p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{activeSection?.title}</DialogTitle>
              <DialogDescription>
                Manage your {activeSection?.title.toLowerCase()} settings.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex-1">
              {children ??
                (activeSection && renderSection
                  ? renderSection(activeSection)
                  : (
                    <p className="text-sm text-muted-foreground">
                      {activeSection?.title} settings will appear here.
                    </p>
                  ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { SettingsDialog }
