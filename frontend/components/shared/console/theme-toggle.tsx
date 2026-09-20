"use client"

import { useState } from "react"
import { Check, Sun, type LucideIcon } from "lucide-react"

import { cn } from "cn"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ThemeValue = "light"

interface ThemeOption {
  value: ThemeValue
  label: string
  icon: LucideIcon
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun },
]

const menuItemClass = cn(
  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition-colors",
  "hover:bg-muted focus-visible:bg-muted outline-none"
)

export interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeValue>("light")

  const active = THEME_OPTIONS.find((o) => o.value === theme) ?? THEME_OPTIONS[0]
  const ActiveIcon = active.icon

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn(menuItemClass, className)}>
        <ActiveIcon className="size-4 shrink-0" />
        <span className="flex-1 text-left">Theme</span>
      </PopoverTrigger>

      <PopoverContent side="right" align="start" sideOffset={8} className="w-44 gap-1 p-1">
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon
          const isActive = option.value === theme
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setTheme(option.value)
                setOpen(false)
              }}
              className={menuItemClass}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 text-left">{option.label}</span>
              {isActive && <Check className="size-4 shrink-0 text-primary" />}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
