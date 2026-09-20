"use client"

import { cn } from "cn"

export interface SkillListProps extends React.ComponentProps<"div"> {}

export function SkillList({ className, ...props }: SkillListProps) {
  return (
    <div
      data-slot="skill-list"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}
SkillList.displayName = "SkillList"
