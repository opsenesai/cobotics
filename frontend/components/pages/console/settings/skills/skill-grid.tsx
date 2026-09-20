"use client"

import { cn } from "cn"

export interface SkillGridProps extends React.ComponentProps<"div"> {}

export function SkillGrid({ className, ...props }: SkillGridProps) {
  return (
    <div
      data-slot="skill-grid"
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}
      {...props}
    />
  )
}
SkillGrid.displayName = "SkillGrid"
