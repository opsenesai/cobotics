"use client"

import { useState } from "react"
import { Check, Languages } from "lucide-react"

import { cn } from "cn"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface LanguageOption {
  value: string
  label: string
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "en", label: "English" },
]

const menuItemClass = cn(
  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition-colors",
  "hover:bg-muted focus-visible:bg-muted outline-none"
)

export interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState("en")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn(menuItemClass, className)}>
        <Languages className="size-4 shrink-0" />
        <span className="flex-1 text-left">Language</span>
      </PopoverTrigger>

      <PopoverContent side="right" align="start" sideOffset={8} className="w-44 gap-1 p-1">
        {LANGUAGE_OPTIONS.map((option) => {
          const isActive = option.value === lang
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setLang(option.value)
                setOpen(false)
              }}
              className={menuItemClass}
            >
              <span className="flex-1 text-left">{option.label}</span>
              {isActive && <Check className="size-4 shrink-0 text-primary" />}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
