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
  renderSection?: (section: SettingsSection) => React.ReactNode
}

function SettingsDialog({
  sections = settingsSections,
  defaultSection,
  trigger,
  open,
  onOpenChange,
  renderSection,
}: SettingsDialogProps) {
  const [active, setActive] = useState(
    defaultSection ?? sections[0]?.id ?? ""
  )

  const activeSection =
    sections.find((section) => section.id === active) ?? sections[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={trigger as React.ReactElement} />}
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <div className="grid min-h-[24rem] grid-cols-1 sm:grid-cols-[180px_1fr]">
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
              {activeSection && renderSection?.(activeSection)}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { SettingsDialog }
