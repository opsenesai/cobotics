"use client"

import { Search } from "lucide-react"

import { cn } from "cn"
import { Input } from "@/components/ui/input"

export interface SkillSearchProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  value: string
  onValueChange: (value: string) => void
}

export function SkillSearch({
  value,
  onValueChange,
  className,
  ...props
}: SkillSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Search skills…"
        className="h-9 pl-8"
        {...props}
      />
    </div>
  )
}
SkillSearch.displayName = "SkillSearch"
