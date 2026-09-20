"use client"

import { type LucideIcon } from "lucide-react"

import { Field, FieldTitle } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

export interface SkillCardProps {
  title: string
  icon: LucideIcon
  defaultEnabled?: boolean
}

export function SkillCard({
  title,
  icon: Icon,
  defaultEnabled = true,
}: SkillCardProps) {
  return (
    <Field orientation="horizontal" className="items-center rounded-lg border p-3">
      <Icon className="size-5 shrink-0 text-muted-foreground" />
      <FieldTitle className="flex-1">{title}</FieldTitle>
      <Checkbox defaultChecked={defaultEnabled} aria-label={`Enable ${title}`} />
    </Field>
  )
}
SkillCard.displayName = "SkillCard"
